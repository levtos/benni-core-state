"""Seasonal anchor accordion: four main day phases from 32 editable anchors.

Model (binding, see ``docs/architecture/2026-11-17-day-phase-accordion.md``):

* four main phases ``morning`` (Morgen), ``day`` (Tag), ``evening`` (Abend)
  and ``night`` (Nacht); each anchor is the *start* of one main phase;
* four seasonal reference dates 21.03., 21.06., 23.09. and 21.12.;
* two day profiles ``workday`` (Werktag) and ``free_day`` (Freier Tag);
* 2 x 4 x 4 = 32 independently editable wall-clock anchors;
* between two reference dates every boundary is interpolated linearly over
  the real calendar days (leap years included).  No astronomy, no sun
  correction, no seasonal surcharge.

Every value is recomputed from the anchors for each date with exact integer /
rational arithmetic and rounded once to whole seconds, so there is no drift.

Operating cycle ("Betriebstag"): cycle *D* starts with Morgen(D) and ends with
Morgen(D+1).  The night therefore belongs to the cycle in which it started and
ends with the morning computed from the *new* date's profile.  From 00:00 the
new calendar date (and its profile) is authoritative for that morning; the
night interval is identical whether it is evaluated before or after midnight,
so midnight itself never causes a transition.

The nine legacy states are derived deterministically from the four main
phases with fixed weights (identical to the historic nine-phase durations):

* Morgen -> early_morning
* Tag    -> forenoon 3 : midday 2 : afternoon 2 : late_afternoon 2
* Abend  -> evening 1 : late_evening 1
* Nacht  -> early_night 2 : late_night 1

A persisted monotonic guard (cycle date, sub-phase index) prevents any
backward step, e.g. after a profile change during a running day, a
configuration change or the repeated hour at the end of daylight saving time.

This module is pure Python and free of Home Assistant imports.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, datetime, time, timedelta, tzinfo
from fractions import Fraction
import re
from typing import Any, Callable, Iterable, Mapping

from .const import (
    DAY_AFTERNOON,
    DAY_EARLY_MORNING,
    DAY_EARLY_NIGHT,
    DAY_EVENING,
    DAY_FORENOON,
    DAY_LATE_AFTERNOON,
    DAY_LATE_EVENING,
    DAY_LATE_NIGHT,
    DAY_MIDDAY,
)
from .day_profile import (
    DAY_PROFILE_LABELS,
    DAY_PROFILES,
    PROFILE_FREE_DAY,
    PROFILE_WORKDAY,
    DayProfileResolution,
)

MODEL_VERSION = "seasonal-anchor-accordion-v3"
MODEL_REASON = "seasonal_anchor_accordion"
CONFIG_STORAGE_VERSION = 1
CONFIG_CONTRACT_VERSION = "1.0.0"

MODEL_LEGACY = "legacy"
MODEL_ACCORDION = "accordion"
MODELS = (MODEL_LEGACY, MODEL_ACCORDION)
DEFAULT_MODEL = MODEL_LEGACY
MODEL_LABELS = {
    MODEL_LEGACY: "Bisheriger Algorithmus (calendar-seasonal-accordion-v2)",
    MODEL_ACCORDION: "Saisonales Akkordeon (32 Ankerzeiten)",
}

MAIN_MORNING = "morning"
MAIN_DAY = "day"
MAIN_EVENING = "evening"
MAIN_NIGHT = "night"
MAIN_PHASES = (MAIN_MORNING, MAIN_DAY, MAIN_EVENING, MAIN_NIGHT)
MAIN_PHASE_LABELS = {
    MAIN_MORNING: "Morgen",
    MAIN_DAY: "Tag",
    MAIN_EVENING: "Abend",
    MAIN_NIGHT: "Nacht",
}

SEASON_SPRING = "spring"
SEASON_SUMMER = "summer"
SEASON_AUTUMN = "autumn"
SEASON_WINTER = "winter"
SEASONS = (SEASON_SPRING, SEASON_SUMMER, SEASON_AUTUMN, SEASON_WINTER)
SEASON_DATES = {
    SEASON_SPRING: (3, 21),
    SEASON_SUMMER: (6, 21),
    SEASON_AUTUMN: (9, 23),
    SEASON_WINTER: (12, 21),
}
SEASON_LABELS = {
    SEASON_SPRING: "Frühling · 21.03.",
    SEASON_SUMMER: "Sommer · 21.06.",
    SEASON_AUTUMN: "Herbst · 23.09.",
    SEASON_WINTER: "Winter · 21.12.",
}

MIN_PHASE_MINUTES = 30
_DAY_SECONDS = 24 * 60 * 60
_DAY_MINUTES = 24 * 60

# Fixed derivation of the nine legacy states.  The weights reproduce the
# historic nine-phase base durations (3h:2h:2h:2h day, 3h:3h evening, 2:1 night).
SUB_PHASE_WEIGHTS: dict[str, tuple[tuple[str, int], ...]] = {
    MAIN_MORNING: ((DAY_EARLY_MORNING, 1),),
    MAIN_DAY: (
        (DAY_FORENOON, 3),
        (DAY_MIDDAY, 2),
        (DAY_AFTERNOON, 2),
        (DAY_LATE_AFTERNOON, 2),
    ),
    MAIN_EVENING: ((DAY_EVENING, 1), (DAY_LATE_EVENING, 1)),
    MAIN_NIGHT: ((DAY_EARLY_NIGHT, 2), (DAY_LATE_NIGHT, 1)),
}
CYCLE_ORDER: tuple[str, ...] = tuple(
    sub for main in MAIN_PHASES for sub, _ in SUB_PHASE_WEIGHTS[main]
)
MAIN_OF_SUB: dict[str, str] = {
    sub: main for main in MAIN_PHASES for sub, _ in SUB_PHASE_WEIGHTS[main]
}

# Proposed start values (editable).  Werktag: Tag from 09:00 so the existing
# 09:00 subwoofer floor and the forenoon start coincide; Nacht 22:30-23:30.
# Freier Tag: later Morgen/Tag, Nacht 23:00-00:00.  All 32 values are
# independent; no fixed offset links the two profiles.
DEFAULT_ANCHORS: dict[str, dict[str, dict[str, str]]] = {
    PROFILE_WORKDAY: {
        SEASON_SPRING: {MAIN_MORNING: "05:45", MAIN_DAY: "09:00", MAIN_EVENING: "18:30", MAIN_NIGHT: "23:00"},
        SEASON_SUMMER: {MAIN_MORNING: "05:30", MAIN_DAY: "09:00", MAIN_EVENING: "19:00", MAIN_NIGHT: "23:30"},
        SEASON_AUTUMN: {MAIN_MORNING: "05:45", MAIN_DAY: "09:00", MAIN_EVENING: "18:30", MAIN_NIGHT: "23:00"},
        SEASON_WINTER: {MAIN_MORNING: "06:00", MAIN_DAY: "09:00", MAIN_EVENING: "18:00", MAIN_NIGHT: "22:30"},
    },
    PROFILE_FREE_DAY: {
        SEASON_SPRING: {MAIN_MORNING: "07:30", MAIN_DAY: "10:00", MAIN_EVENING: "18:30", MAIN_NIGHT: "23:30"},
        SEASON_SUMMER: {MAIN_MORNING: "07:00", MAIN_DAY: "10:00", MAIN_EVENING: "19:00", MAIN_NIGHT: "00:00"},
        SEASON_AUTUMN: {MAIN_MORNING: "07:30", MAIN_DAY: "10:00", MAIN_EVENING: "18:30", MAIN_NIGHT: "23:30"},
        SEASON_WINTER: {MAIN_MORNING: "08:00", MAIN_DAY: "10:00", MAIN_EVENING: "18:00", MAIN_NIGHT: "23:00"},
    },
}

_TIME_RE = re.compile(r"^(\d{1,2}):(\d{2})(?::(\d{2}))?$")


# ----------------------------------------------------------------- errors


@dataclass(frozen=True, slots=True)
class ValidationIssue:
    """One user-facing validation finding for the anchor matrix."""

    path: str
    code: str
    message: str

    def as_dict(self) -> dict[str, str]:
        return {"path": self.path, "code": self.code, "message": self.message}


class DayPhaseConfigError(ValueError):
    """Raised when an anchor matrix cannot be accepted."""

    def __init__(self, issues: Iterable[ValidationIssue]) -> None:
        self.issues = tuple(issues)
        super().__init__("day_phase_config_invalid")


def _fmt_minutes(value: int) -> str:
    value %= _DAY_MINUTES
    return f"{value // 60:02d}:{value % 60:02d}"


def parse_hhmm(value: Any) -> int | None:
    """Parse ``HH:MM`` (or ``HH:MM:00``) into minutes after midnight."""

    if not isinstance(value, str):
        return None
    match = _TIME_RE.fullmatch(value.strip())
    if match is None:
        return None
    hours, minutes, seconds = int(match.group(1)), int(match.group(2)), match.group(3)
    if hours > 23 or minutes > 59 or (seconds is not None and int(seconds) != 0):
        return None
    return hours * 60 + minutes


# ----------------------------------------------------------------- config


@dataclass(frozen=True, slots=True)
class AnchorSet:
    """Four main-phase starts of one profile at one reference date (minutes).

    ``night`` is stored *effective*: a night start at or before the evening
    start belongs to the following calendar day and carries ``+1440``.
    """

    morning: int
    day: int
    evening: int
    night: int

    def value(self, phase: str) -> int:
        return int(getattr(self, phase))


def _effective_set(raw: Mapping[str, Any], path: str) -> tuple[AnchorSet | None, list[ValidationIssue]]:
    issues: list[ValidationIssue] = []
    parsed: dict[str, int] = {}
    for phase in MAIN_PHASES:
        minutes = parse_hhmm(raw.get(phase)) if isinstance(raw, Mapping) else None
        if minutes is None:
            issues.append(
                ValidationIssue(
                    f"{path}.{phase}",
                    "time_invalid",
                    f"{MAIN_PHASE_LABELS[phase]}: Bitte eine Uhrzeit im Format HH:MM eingeben.",
                )
            )
        else:
            parsed[phase] = minutes
    if issues:
        return None, issues
    morning, day, evening, night = (parsed[p] for p in MAIN_PHASES)
    night_eff = night if night > evening else night + _DAY_MINUTES
    if day - morning < MIN_PHASE_MINUTES:
        issues.append(
            ValidationIssue(
                f"{path}.{MAIN_DAY}",
                "order_invalid",
                f"Tag muss mindestens {MIN_PHASE_MINUTES} Minuten nach Morgen beginnen.",
            )
        )
    if evening - day < MIN_PHASE_MINUTES:
        issues.append(
            ValidationIssue(
                f"{path}.{MAIN_EVENING}",
                "order_invalid",
                f"Abend muss mindestens {MIN_PHASE_MINUTES} Minuten nach Tag beginnen.",
            )
        )
    if night_eff - evening < MIN_PHASE_MINUTES:
        issues.append(
            ValidationIssue(
                f"{path}.{MAIN_NIGHT}",
                "order_invalid",
                f"Nacht muss mindestens {MIN_PHASE_MINUTES} Minuten nach Abend beginnen.",
            )
        )
    if morning + _DAY_MINUTES - night_eff < MIN_PHASE_MINUTES:
        issues.append(
            ValidationIssue(
                f"{path}.{MAIN_NIGHT}",
                "night_overlaps_morning",
                "Die Nacht muss mindestens "
                f"{MIN_PHASE_MINUTES} Minuten vor dem nächsten Morgen ({_fmt_minutes(morning)}) beginnen.",
            )
        )
    if issues:
        return None, issues
    return AnchorSet(morning, day, evening, night_eff), []


@dataclass(frozen=True, slots=True)
class DayPhaseConfig:
    """Versioned, persisted accordion configuration."""

    model: str = DEFAULT_MODEL
    anchors: Mapping[str, Mapping[str, Mapping[str, str]]] = field(
        default_factory=lambda: _copy_anchors(DEFAULT_ANCHORS)
    )
    previous_anchors: Mapping[str, Mapping[str, Mapping[str, str]]] | None = None
    updated_at: str | None = None
    model_changed_at: str | None = None
    version: int = CONFIG_STORAGE_VERSION

    # Parsed effective anchors; filled by ``validated``.
    _sets: Mapping[str, Mapping[str, AnchorSet]] = field(default_factory=dict, compare=False, repr=False)

    def anchor_set(self, profile: str, season: str) -> AnchorSet:
        return self._sets[profile][season]

    def to_dict(self) -> dict[str, Any]:
        return {
            "version": self.version,
            "contract_version": CONFIG_CONTRACT_VERSION,
            "model": self.model,
            "anchors": _copy_anchors(self.anchors),
            "previous_anchors": (
                _copy_anchors(self.previous_anchors) if self.previous_anchors else None
            ),
            "updated_at": self.updated_at,
            "model_changed_at": self.model_changed_at,
        }


def _copy_anchors(raw: Mapping[str, Any] | None) -> dict[str, dict[str, dict[str, str]]]:
    out: dict[str, dict[str, dict[str, str]]] = {}
    for profile in DAY_PROFILES:
        profile_raw = raw.get(profile, {}) if isinstance(raw, Mapping) else {}
        out[profile] = {}
        for season in SEASONS:
            season_raw = profile_raw.get(season, {}) if isinstance(profile_raw, Mapping) else {}
            out[profile][season] = {
                phase: (
                    str(season_raw.get(phase)).strip()
                    if isinstance(season_raw, Mapping) and season_raw.get(phase) is not None
                    else ""
                )
                for phase in MAIN_PHASES
            }
    return out


def _normalise_text(raw: Mapping[str, Any]) -> dict[str, dict[str, dict[str, str]]]:
    """Canonicalise valid times to ``HH:MM``; keep invalid text for messages."""

    copied = _copy_anchors(raw)
    for profile in DAY_PROFILES:
        for season in SEASONS:
            for phase in MAIN_PHASES:
                minutes = parse_hhmm(copied[profile][season][phase])
                if minutes is not None:
                    copied[profile][season][phase] = _fmt_minutes(minutes)
    return copied


def validate_anchors(raw: Mapping[str, Any] | None) -> tuple[dict[str, dict[str, AnchorSet]] | None, list[ValidationIssue]]:
    """Validate the full 32-value matrix including every calendar transition."""

    anchors = _copy_anchors(raw or {})
    issues: list[ValidationIssue] = []
    sets: dict[str, dict[str, AnchorSet]] = {}
    for profile in DAY_PROFILES:
        sets[profile] = {}
        for season in SEASONS:
            parsed, found = _effective_set(anchors[profile][season], f"{profile}.{season}")
            issues.extend(found)
            if parsed is not None:
                sets[profile][season] = parsed
    if issues:
        return None, issues
    issues.extend(_cross_day_issues(sets))
    if issues:
        return None, issues
    return sets, []


def _cross_day_issues(sets: Mapping[str, Mapping[str, AnchorSet]]) -> list[ValidationIssue]:
    """Night(D, p1) must end >= MIN before Morgen(D+1, p2) for all profile pairs.

    Linear interpolation keeps the in-day order of valid anchor sets, but a
    profile change at midnight combines two different profiles.  The check
    walks two consecutive years (one leap year) so every interval length is
    covered.
    """

    issues: list[ValidationIssue] = []
    seen: set[tuple[str, str]] = set()
    current = date(2027, 1, 1)
    end = date(2029, 1, 1)
    while current < end:
        following = current + timedelta(days=1)
        for profile in DAY_PROFILES:
            night = _interpolate_seconds(sets, profile, current, MAIN_NIGHT)
            for next_profile in DAY_PROFILES:
                morning_next = _interpolate_seconds(sets, next_profile, following, MAIN_MORNING)
                if morning_next + _DAY_SECONDS - night < MIN_PHASE_MINUTES * 60:
                    key = (profile, next_profile)
                    if key not in seen:
                        seen.add(key)
                        issues.append(
                            ValidationIssue(
                                f"{profile}.{MAIN_NIGHT}",
                                "cross_day_overlap",
                                "Am "
                                f"{current.strftime('%d.%m.')} würde die Nacht "
                                f"({DAY_PROFILE_LABELS[profile]}) zu spät vor dem Morgen "
                                f"des Folgetags ({DAY_PROFILE_LABELS[next_profile]}) beginnen.",
                            )
                        )
        current = following
    return issues


def config_from_dict(raw: Mapping[str, Any] | None) -> DayPhaseConfig:
    """Build and validate a persisted configuration (raises on invalid data)."""

    raw = raw or {}
    version = int(raw.get("version", CONFIG_STORAGE_VERSION))
    if version != CONFIG_STORAGE_VERSION:
        raise DayPhaseConfigError(
            [ValidationIssue("version", "config_version_unsupported", "Unbekannte Konfigurationsversion.")]
        )
    model = str(raw.get("model", DEFAULT_MODEL))
    if model not in MODELS:
        raise DayPhaseConfigError(
            [ValidationIssue("model", "model_invalid", "Unbekanntes Berechnungsmodell.")]
        )
    anchors_raw = raw.get("anchors") if isinstance(raw.get("anchors"), Mapping) else DEFAULT_ANCHORS
    sets, issues = validate_anchors(anchors_raw)
    if sets is None:
        raise DayPhaseConfigError(issues)
    previous_raw = raw.get("previous_anchors")
    previous = None
    if isinstance(previous_raw, Mapping):
        previous_sets, _ = validate_anchors(previous_raw)
        previous = _normalise_text(previous_raw) if previous_sets is not None else None
    return DayPhaseConfig(
        model=model,
        anchors=_normalise_text(anchors_raw),
        previous_anchors=previous,
        updated_at=_optional_text(raw.get("updated_at")),
        model_changed_at=_optional_text(raw.get("model_changed_at")),
        version=CONFIG_STORAGE_VERSION,
        _sets=sets,
    )


def default_config() -> DayPhaseConfig:
    return config_from_dict({"model": DEFAULT_MODEL, "anchors": DEFAULT_ANCHORS})


def with_anchors(config: DayPhaseConfig, patch: Mapping[str, Any], *, now_iso: str | None = None) -> DayPhaseConfig:
    """Return a validated copy with a (partial) anchor patch applied."""

    merged = _copy_anchors(config.anchors)
    for profile, seasons in (patch or {}).items():
        if profile not in DAY_PROFILES or not isinstance(seasons, Mapping):
            raise DayPhaseConfigError(
                [ValidationIssue(str(profile), "profile_invalid", "Unbekanntes Tagesprofil.")]
            )
        for season, phases in seasons.items():
            if season not in SEASONS or not isinstance(phases, Mapping):
                raise DayPhaseConfigError(
                    [ValidationIssue(f"{profile}.{season}", "season_invalid", "Unbekannter Stichtag.")]
                )
            for phase, value in phases.items():
                if phase not in MAIN_PHASES:
                    raise DayPhaseConfigError(
                        [ValidationIssue(f"{profile}.{season}.{phase}", "phase_invalid", "Unbekannte Hauptphase.")]
                    )
                merged[profile][season][phase] = "" if value is None else str(value).strip()
    sets, issues = validate_anchors(merged)
    if sets is None:
        raise DayPhaseConfigError(issues)
    return DayPhaseConfig(
        model=config.model,
        anchors=_normalise_text(merged),
        previous_anchors=_copy_anchors(config.anchors),
        updated_at=now_iso,
        model_changed_at=config.model_changed_at,
        _sets=sets,
    )


def with_model(config: DayPhaseConfig, model: str, *, now_iso: str | None = None) -> DayPhaseConfig:
    if model not in MODELS:
        raise DayPhaseConfigError(
            [ValidationIssue("model", "model_invalid", "Unbekanntes Berechnungsmodell.")]
        )
    return DayPhaseConfig(
        model=model,
        anchors=config.anchors,
        previous_anchors=config.previous_anchors,
        updated_at=config.updated_at,
        model_changed_at=now_iso if model != config.model else config.model_changed_at,
        _sets=config._sets,
    )


def rollback(config: DayPhaseConfig, *, now_iso: str | None = None) -> DayPhaseConfig:
    if not config.previous_anchors:
        raise DayPhaseConfigError(
            [ValidationIssue("anchors", "rollback_unavailable", "Es gibt keinen vorherigen Stand.")]
        )
    restored = with_anchors(config, config.previous_anchors, now_iso=now_iso)
    return restored


def reset_defaults(config: DayPhaseConfig, *, now_iso: str | None = None) -> DayPhaseConfig:
    return with_anchors(config, DEFAULT_ANCHORS, now_iso=now_iso)


def _optional_text(value: Any) -> str | None:
    text = str(value).strip() if value is not None else ""
    return text or None


# ----------------------------------------------------------- interpolation


def _anchor_points(year: int) -> list[tuple[date, str]]:
    points = [(date(year - 1, *SEASON_DATES[SEASON_WINTER]), SEASON_WINTER)]
    for season in SEASONS:
        points.append((date(year, *SEASON_DATES[season]), season))
    points.append((date(year + 1, *SEASON_DATES[SEASON_SPRING]), SEASON_SPRING))
    return points


@dataclass(frozen=True, slots=True)
class SeasonPosition:
    """Where a calendar date sits between two reference dates."""

    start: date
    start_season: str
    end: date
    end_season: str
    elapsed_days: int
    interval_days: int

    def as_attributes(self) -> dict[str, Any]:
        return {
            "from": self.start_season,
            "from_date": self.start.isoformat(),
            "to": self.end_season,
            "to_date": self.end.isoformat(),
            "elapsed_days": self.elapsed_days,
            "interval_days": self.interval_days,
        }


def season_position(day: date) -> SeasonPosition:
    points = _anchor_points(day.year)
    for (start, start_season), (end, end_season) in zip(points, points[1:]):
        if start <= day < end:
            return SeasonPosition(
                start, start_season, end, end_season,
                (day - start).days, (end - start).days,
            )
    raise AssertionError(f"No seasonal interval for {day.isoformat()}")  # pragma: no cover


def _interpolate_seconds(
    sets: Mapping[str, Mapping[str, AnchorSet]], profile: str, day: date, phase: str
) -> int:
    position = season_position(day)
    start = sets[profile][position.start_season].value(phase) * 60
    end = sets[profile][position.end_season].value(phase) * 60
    if position.elapsed_days == 0:
        return start
    return start + round(Fraction((end - start) * position.elapsed_days, position.interval_days))


def main_starts_for(config: DayPhaseConfig, profile: str, day: date) -> dict[str, int]:
    """Interpolated main-phase starts in seconds after ``day`` 00:00."""

    return {
        phase: _interpolate_seconds(config._sets, profile, day, phase)
        for phase in MAIN_PHASES
    }


# ------------------------------------------------------------------ cycle


@dataclass(frozen=True, slots=True)
class CycleBoundaries:
    """One operating cycle from Morgen(D) to Morgen(D+1)."""

    cycle_date: date
    profile: str
    next_profile: str
    main_starts: Mapping[str, int]
    end: int
    sub_starts: tuple[tuple[str, int], ...]
    clamped: bool = False

    def sub_index_at(self, seconds: float) -> int:
        index = 0
        for position, (_, start) in enumerate(self.sub_starts):
            if seconds >= start:
                index = position
        return index

    def wall(self, seconds: int, tz: tzinfo | None) -> datetime:
        naive = datetime.combine(self.cycle_date, time()) + timedelta(seconds=seconds)
        return naive.replace(tzinfo=tz)

    def main_end(self, phase: str) -> int:
        index = MAIN_PHASES.index(phase)
        if index + 1 < len(MAIN_PHASES):
            return int(self.main_starts[MAIN_PHASES[index + 1]])
        return self.end

    def sub_end(self, index: int) -> int:
        if index + 1 < len(self.sub_starts):
            return self.sub_starts[index + 1][1]
        return self.end


def compute_cycle(
    config: DayPhaseConfig, cycle_date: date, profile: str, next_profile: str
) -> CycleBoundaries:
    starts = main_starts_for(config, profile, cycle_date)
    end = _interpolate_seconds(config._sets, next_profile, cycle_date + timedelta(days=1), MAIN_MORNING) + _DAY_SECONDS
    clamped = False
    latest_night = end - MIN_PHASE_MINUTES * 60
    if starts[MAIN_NIGHT] > latest_night:
        # Validation forbids this; keep a defensive, deterministic clamp.
        starts[MAIN_NIGHT] = max(starts[MAIN_EVENING] + 60, latest_night)
        clamped = True
    ordered = [starts[p] for p in MAIN_PHASES] + [end]
    if any(later <= earlier for earlier, later in zip(ordered, ordered[1:])):
        raise ValueError("day_phase_boundaries_unordered")
    subs: list[tuple[str, int]] = []
    for index, main in enumerate(MAIN_PHASES):
        segment_start = ordered[index]
        segment_end = ordered[index + 1]
        span = segment_end - segment_start
        weights = SUB_PHASE_WEIGHTS[main]
        total = sum(weight for _, weight in weights)
        cumulative = 0
        for sub, weight in weights:
            subs.append((sub, segment_start + round(Fraction(span * cumulative, total))))
            cumulative += weight
    return CycleBoundaries(
        cycle_date=cycle_date,
        profile=profile,
        next_profile=next_profile,
        main_starts=dict(starts),
        end=end,
        sub_starts=tuple(subs),
        clamped=clamped,
    )


# ----------------------------------------------------------------- guard


def apply_guard(
    cycle_date: date,
    index: int,
    guard: Mapping[str, Any] | None,
    now_iso: str,
) -> tuple[date, int, bool, dict[str, Any]]:
    """Never step backwards in (cycle date, sub-phase index).

    A guard that is more than one cycle ahead of the computed position is
    treated as stale (clock reset / corrupted storage) and discarded.
    """

    held_date: date | None = None
    held_index: int | None = None
    since = now_iso
    if isinstance(guard, Mapping):
        try:
            held_date = date.fromisoformat(str(guard.get("cycle")))
            held_index = int(guard.get("index"))
            since = str(guard.get("since") or now_iso)
        except (TypeError, ValueError):
            held_date = None
            held_index = None
        if held_index is not None and not 0 <= held_index < len(CYCLE_ORDER):
            held_date = None
            held_index = None
    if held_date is not None and held_index is not None:
        computed = (cycle_date, index)
        held = (held_date, held_index)
        if computed < held and (held_date - cycle_date).days <= 1:
            return held_date, held_index, True, {
                "cycle": held_date.isoformat(),
                "index": held_index,
                "since": since,
            }
        if computed == held:
            return cycle_date, index, False, {
                "cycle": cycle_date.isoformat(),
                "index": index,
                "since": since,
            }
    return cycle_date, index, False, {
        "cycle": cycle_date.isoformat(),
        "index": index,
        "since": now_iso,
    }


# ------------------------------------------------------------- evaluation


ProfileLookup = Callable[[date], DayProfileResolution]


@dataclass(frozen=True, slots=True)
class DayPhaseEvaluation:
    """Result of one guarded accordion evaluation."""

    local_now: datetime
    cycle: CycleBoundaries
    computed_index: int
    published_cycle_date: date
    published_index: int
    held: bool
    guard: Mapping[str, Any]
    profile: DayProfileResolution
    next_profile: DayProfileResolution
    season: SeasonPosition

    @property
    def sub_phase(self) -> str:
        return CYCLE_ORDER[self.published_index]

    @property
    def main_phase(self) -> str:
        return MAIN_OF_SUB[self.sub_phase]

    @property
    def computed_sub_phase(self) -> str:
        return CYCLE_ORDER[self.computed_index]

    def next_change(self) -> tuple[str, datetime]:
        """Next sub-phase and wall-clock start in the computed cycle."""

        tz = self.local_now.tzinfo
        if self.held:
            target = self.published_index
            if self.published_cycle_date == self.cycle.cycle_date and target + 1 < len(CYCLE_ORDER):
                nxt = target + 1
                return CYCLE_ORDER[nxt], self.cycle.wall(self.cycle.sub_starts[nxt][1], tz)
            return CYCLE_ORDER[(target + 1) % len(CYCLE_ORDER)], self.cycle.wall(self.cycle.end, tz)
        nxt = self.computed_index + 1
        if nxt < len(self.cycle.sub_starts):
            return self.cycle.sub_starts[nxt][0], self.cycle.wall(self.cycle.sub_starts[nxt][1], tz)
        return CYCLE_ORDER[0], self.cycle.wall(self.cycle.end, tz)

    def degraded_reasons(self) -> list[str]:
        reasons: list[str] = []
        if self.cycle.clamped:
            reasons.append("night_clamped_before_next_morning")
        for resolution in (self.profile, self.next_profile):
            if resolution.quality == "degraded":
                reasons.append(f"day_profile_degraded:{resolution.day.isoformat()}")
        return reasons

    def phase_starts_iso(self) -> dict[str, str]:
        tz = self.local_now.tzinfo
        return {sub: self.cycle.wall(start, tz).isoformat() for sub, start in self.cycle.sub_starts}

    def main_starts_iso(self) -> dict[str, str]:
        tz = self.local_now.tzinfo
        out = {
            phase: self.cycle.wall(int(self.cycle.main_starts[phase]), tz).isoformat()
            for phase in MAIN_PHASES
        }
        out["next_morning"] = self.cycle.wall(self.cycle.end, tz).isoformat()
        return out

    def timeline_rows(self) -> list[tuple[str, datetime, datetime]]:
        tz = self.local_now.tzinfo
        return [
            (
                sub,
                self.cycle.wall(start, tz),
                self.cycle.wall(self.cycle.sub_end(index), tz),
            )
            for index, (sub, start) in enumerate(self.cycle.sub_starts)
        ]

    def day_phase_attributes(self, *, active_model: str) -> dict[str, Any]:
        next_phase, next_at = self.next_change()
        reasons = self.degraded_reasons()
        return {
            "main_phase": self.main_phase,
            "main_phase_label": MAIN_PHASE_LABELS[self.main_phase],
            "sub_phase": self.sub_phase,
            "computed_sub_phase": self.computed_sub_phase,
            "guard_hold": self.held,
            "guard_since": self.guard.get("since"),
            "cycle_date": self.cycle.cycle_date.isoformat(),
            "day_profile": self.profile.profile,
            "day_profile_label": DAY_PROFILE_LABELS[self.profile.profile],
            "day_profile_reason": self.profile.reason,
            "day_profile_source": self.profile.source,
            "next_day_profile": self.next_profile.profile,
            "main_phase_starts": self.main_starts_iso(),
            "sub_phase_starts": self.phase_starts_iso(),
            "next_phase": next_phase,
            "next_phase_at": next_at.isoformat(),
            "season": self.season.as_attributes(),
            "model_version": MODEL_VERSION,
            "config_contract_version": CONFIG_CONTRACT_VERSION,
            "day_phase_model": active_model,
            "drives_day_state": active_model == MODEL_ACCORDION,
            "degraded": bool(reasons),
            "degraded_reasons": reasons,
        }

    def legacy_sensor_attributes(self) -> dict[str, Any]:
        """Attributes for the compatible nine-state sensor.

        Deliberately no ``degraded``/``quality``/``source_quality``/
        ``quality_status``/``master_phase`` keys: blind_control reads the
        generic quality keys of every input and light_policy reads
        ``master_phase`` (R10); adding them would change consumer behaviour.
        """

        reasons = self.degraded_reasons()
        return {
            "active_phase": self.sub_phase,
            "date": self.local_now.date().isoformat(),
            "source": "date",
            "version": MODEL_VERSION,
            "model_version": MODEL_VERSION,
            "reason": MODEL_REASON,
            "day_phase_model": MODEL_ACCORDION,
            "phase_starts": self.phase_starts_iso(),
            "main_phase": self.main_phase,
            "day_profile": self.profile.profile,
            "cycle_date": self.cycle.cycle_date.isoformat(),
            "guard_hold": self.held,
            "day_phase_degraded": bool(reasons),
            "day_phase_degraded_reasons": reasons,
        }


# Attribute keys that must never appear on the compatible nine-state sensor.
RESERVED_LEGACY_ATTRIBUTE_KEYS = frozenset(
    {"degraded", "degraded_reason", "quality", "quality_status", "source_quality", "master_phase"}
)


def evaluate(
    config: DayPhaseConfig,
    local_now: datetime,
    profile_for: ProfileLookup,
    *,
    guard: Mapping[str, Any] | None = None,
    now_iso: str | None = None,
) -> DayPhaseEvaluation:
    """Resolve the guarded main/sub phase for a local wall-clock instant."""

    wall = local_now.replace(tzinfo=None)
    today = wall.date()
    seconds = (wall - datetime.combine(today, time())).total_seconds()
    today_profile = profile_for(today)
    morning_today = _interpolate_seconds(config._sets, today_profile.profile, today, MAIN_MORNING)
    if seconds < morning_today:
        cycle_date = today - timedelta(days=1)
        relative = seconds + _DAY_SECONDS
        cycle_profile = profile_for(cycle_date)
        next_profile = today_profile
    else:
        cycle_date = today
        relative = seconds
        cycle_profile = today_profile
        next_profile = profile_for(today + timedelta(days=1))
    cycle = compute_cycle(config, cycle_date, cycle_profile.profile, next_profile.profile)
    index = cycle.sub_index_at(relative)
    published_date, published_index, held, new_guard = apply_guard(
        cycle_date, index, guard, now_iso or local_now.isoformat()
    )
    return DayPhaseEvaluation(
        local_now=local_now,
        cycle=cycle,
        computed_index=index,
        published_cycle_date=published_date,
        published_index=published_index,
        held=held,
        guard=new_guard,
        profile=cycle_profile,
        next_profile=next_profile,
        season=season_position(cycle_date),
    )


# ---------------------------------------------------------------- preview


def preview(
    config: DayPhaseConfig,
    day: date,
    *,
    tz: tzinfo | None,
    applied: DayProfileResolution | None = None,
    next_applied: DayProfileResolution | None = None,
) -> dict[str, Any]:
    """Both profiles' phases for one date plus the profile that applies."""

    profiles: dict[str, Any] = {}
    for profile in DAY_PROFILES:
        cycle = compute_cycle(config, day, profile, profile)
        profiles[profile] = _cycle_rows(cycle, tz, label=DAY_PROFILE_LABELS[profile])
    result: dict[str, Any] = {
        "date": day.isoformat(),
        "season": season_position(day).as_attributes(),
        "profiles": profiles,
        "applied": None,
    }
    if applied is not None:
        nxt = next_applied.profile if next_applied is not None else applied.profile
        cycle = compute_cycle(config, day, applied.profile, nxt)
        result["applied"] = {
            **applied.as_attributes(),
            "next_profile": nxt,
            **_cycle_rows(cycle, tz, label=DAY_PROFILE_LABELS[applied.profile]),
        }
    return result


def _cycle_rows(cycle: CycleBoundaries, tz: tzinfo | None, *, label: str) -> dict[str, Any]:
    def _hhmm(seconds: int) -> str:
        return cycle.wall(seconds, tz).strftime("%H:%M")

    return {
        "label": label,
        "main": [
            {
                "id": phase,
                "label": MAIN_PHASE_LABELS[phase],
                "start": _hhmm(int(cycle.main_starts[phase])),
                "end": _hhmm(cycle.main_end(phase)),
                "start_iso": cycle.wall(int(cycle.main_starts[phase]), tz).isoformat(),
                "duration_minutes": round((cycle.main_end(phase) - int(cycle.main_starts[phase])) / 60, 1),
            }
            for phase in MAIN_PHASES
        ],
        "sub": [
            {
                "id": sub,
                "main": MAIN_OF_SUB[sub],
                "start": _hhmm(start),
                "end": _hhmm(cycle.sub_end(index)),
                "start_iso": cycle.wall(start, tz).isoformat(),
            }
            for index, (sub, start) in enumerate(cycle.sub_starts)
        ],
    }


def draft_config(config: DayPhaseConfig, draft: Mapping[str, Any] | None) -> tuple[DayPhaseConfig | None, list[dict[str, str]]]:
    """Validate unsaved anchors for preview without persisting anything."""

    if not draft:
        return config, []
    try:
        return with_anchors(config, draft), []
    except DayPhaseConfigError as err:
        return None, [issue.as_dict() for issue in err.issues]
