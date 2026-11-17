"""Shared calendar day profile for Core State (Werktag / Freier Tag).

One owner-local decision that both the day-phase accordion and the wake
planner read.  It deliberately reuses the existing Core-State holiday map
(manual intervals plus the configured holiday calendar) instead of creating a
second calendar administration.

Precedence (first match wins):

1. Saturday/Sunday            -> free day (``weekend``)
2. holiday/vacation day input -> free day (``holiday`` or ``vacation``)
3. otherwise                  -> workday (``workday``)

Sickness has no separate input yet; until the calendar restructure it is
entered as a manual free interval and therefore reported as ``vacation``.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from typing import Any, Mapping

PROFILE_WORKDAY = "workday"
PROFILE_FREE_DAY = "free_day"
DAY_PROFILES = (PROFILE_WORKDAY, PROFILE_FREE_DAY)
DAY_PROFILE_LABELS = {PROFILE_WORKDAY: "Werktag", PROFILE_FREE_DAY: "Freier Tag"}

REASON_WORKDAY = "workday"
REASON_WEEKEND = "weekend"
REASON_HOLIDAY = "holiday"
REASON_VACATION = "vacation"
DAY_PROFILE_REASON_LABELS = {
    REASON_WORKDAY: "Regulärer Werktag",
    REASON_WEEKEND: "Wochenende",
    REASON_HOLIDAY: "Feiertag",
    REASON_VACATION: "Urlaub / freies Intervall",
}

QUALITY_FRESH = "fresh"
QUALITY_DEGRADED = "degraded"
QUALITY_JOURNAL = "journal"


@dataclass(frozen=True, slots=True)
class DayProfileResolution:
    """Resolved profile for one calendar date."""

    day: date
    profile: str
    reason: str
    source: str
    quality: str = QUALITY_FRESH

    @property
    def is_free(self) -> bool:
        return self.profile == PROFILE_FREE_DAY

    def as_attributes(self) -> dict[str, Any]:
        return {
            "date": self.day.isoformat(),
            "profile": self.profile,
            "label": DAY_PROFILE_LABELS.get(self.profile, self.profile),
            "reason": self.reason,
            "reason_label": DAY_PROFILE_REASON_LABELS.get(self.reason, self.reason),
            "source": self.source,
            "quality": self.quality,
        }


def resolve_day_profile(
    day: date,
    holidays: Mapping[date, Any] | None,
    *,
    quality: str = QUALITY_FRESH,
) -> DayProfileResolution:
    """Return the shared Werktag/Freier-Tag decision for ``day``."""

    if day.weekday() >= 5:
        return DayProfileResolution(
            day=day,
            profile=PROFILE_FREE_DAY,
            reason=REASON_WEEKEND,
            source="calendar_weekday",
            quality=QUALITY_FRESH,
        )
    entry = (holidays or {}).get(day)
    if entry is not None and bool(getattr(entry, "is_holiday", False)):
        return DayProfileResolution(
            day=day,
            profile=PROFILE_FREE_DAY,
            reason=(
                REASON_VACATION
                if bool(getattr(entry, "is_vacation", False))
                else REASON_HOLIDAY
            ),
            source=str(getattr(entry, "source", "holiday_input") or "holiday_input"),
            quality=quality,
        )
    return DayProfileResolution(
        day=day,
        profile=PROFILE_WORKDAY,
        reason=REASON_WORKDAY,
        source="calendar_weekday",
        quality=quality,
    )


def resolution_from_journal(day: date, profile: str) -> DayProfileResolution | None:
    """Rebuild a frozen resolution persisted while ``day`` was today."""

    if profile not in DAY_PROFILES:
        return None
    return DayProfileResolution(
        day=day,
        profile=profile,
        reason="journal",
        source="core_state:day_profile_journal",
        quality=QUALITY_JOURNAL,
    )
