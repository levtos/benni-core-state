"""Seasonal anchor accordion: 4 main phases from 32 anchors, 9 legacy states."""
from __future__ import annotations

from datetime import date, datetime, timedelta
from fractions import Fraction
from zoneinfo import ZoneInfo

import pytest

from custom_components.benni_core_state import day_phase as dp
from custom_components.benni_core_state import day_profile, wake_config, wake_planning
from custom_components.benni_core_state.const import DAY_STATES

BERLIN = ZoneInfo("Europe/Berlin")
CONFIG = dp.default_config()


def _weekday_profile(day: date) -> day_profile.DayProfileResolution:
    return day_profile.resolve_day_profile(day, {})


def _fixed(profile: str):
    def lookup(day: date) -> day_profile.DayProfileResolution:
        return day_profile.DayProfileResolution(day, profile, "test", "test")

    return lookup


def _at(year, month, day, hour=0, minute=0, second=0) -> datetime:
    return datetime(year, month, day, hour, minute, second, tzinfo=BERLIN)


def _hhmmss(seconds: int) -> str:
    seconds %= 86400
    return f"{seconds // 3600:02d}:{seconds % 3600 // 60:02d}:{seconds % 60:02d}"


def _cycle(day: date, profile: str = "workday", next_profile: str | None = None):
    return dp.compute_cycle(CONFIG, day, profile, next_profile or profile)


# ------------------------------------------------------------------- model


def test_model_has_four_main_phases_four_reference_dates_two_profiles_32_anchors():
    assert dp.MAIN_PHASES == ("morning", "day", "evening", "night")
    assert dp.SEASON_DATES == {
        "spring": (3, 21),
        "summer": (6, 21),
        "autumn": (9, 23),
        "winter": (12, 21),
    }
    assert day_profile.DAY_PROFILES == ("workday", "free_day")
    values = [
        CONFIG.anchors[profile][season][phase]
        for profile in day_profile.DAY_PROFILES
        for season in dp.SEASONS
        for phase in dp.MAIN_PHASES
    ]
    assert len(values) == 32
    assert all(dp.parse_hhmm(value) is not None for value in values)


def test_nine_legacy_states_are_derived_exactly_once_and_in_cycle_order():
    assert sorted(dp.CYCLE_ORDER) == sorted(DAY_STATES)
    assert len(set(dp.CYCLE_ORDER)) == 9
    assert dp.CYCLE_ORDER == (
        "early_morning", "forenoon", "midday", "afternoon", "late_afternoon",
        "evening", "late_evening", "early_night", "late_night",
    )
    assert {sub: dp.MAIN_OF_SUB[sub] for sub in dp.CYCLE_ORDER} == {
        "early_morning": "morning",
        "forenoon": "day", "midday": "day", "afternoon": "day", "late_afternoon": "day",
        "evening": "evening", "late_evening": "evening",
        "early_night": "night", "late_night": "night",
    }


def test_anchor_dates_return_the_configured_values_exactly():
    for day, season in (
        (date(2026, 3, 21), "spring"),
        (date(2026, 6, 21), "summer"),
        (date(2026, 9, 23), "autumn"),
        (date(2026, 12, 21), "winter"),
    ):
        for profile in day_profile.DAY_PROFILES:
            starts = dp.main_starts_for(CONFIG, profile, day)
            for phase in dp.MAIN_PHASES:
                expected = dp.parse_hhmm(CONFIG.anchors[profile][season][phase]) * 60
                if phase == "night" and expected <= starts["evening"]:
                    expected += 86400
                assert starts[phase] == expected, (day, profile, phase)


def test_linear_interpolation_over_real_calendar_days_without_drift():
    # 23.09. -> 21.12. = 89 days; 07.11. is day 45.  Werktag Morgen 05:45 -> 06:00.
    starts = dp.main_starts_for(CONFIG, "workday", date(2026, 11, 7))
    expected = 345 * 60 + round(Fraction(15 * 60 * 45, 89))
    assert starts["morning"] == expected == 21155  # 05:52:35
    # every date is computed from the anchors only: no accumulated rounding
    current = date(2026, 9, 23)
    while current <= date(2026, 12, 21):
        k = (current - date(2026, 9, 23)).days
        assert dp.main_starts_for(CONFIG, "workday", current)["morning"] == 20700 + round(
            Fraction(900 * k, 89)
        )
        current += timedelta(days=1)


def test_leap_year_and_year_change_use_actual_interval_lengths():
    normal = dp.season_position(date(2027, 1, 15))
    leap = dp.season_position(date(2028, 1, 15))
    assert (normal.start, normal.end, normal.interval_days) == (
        date(2026, 12, 21), date(2027, 3, 21), 90,
    )
    assert (leap.start, leap.end, leap.interval_days) == (
        date(2027, 12, 21), date(2028, 3, 21), 91,
    )
    assert dp.season_position(date(2028, 2, 29)).elapsed_days == 70
    # Monotone, gap-free movement across 31.12. -> 01.01. and through 29.02.
    for first, second in (
        (date(2026, 12, 31), date(2027, 1, 1)),
        (date(2028, 2, 28), date(2028, 2, 29)),
        (date(2028, 2, 29), date(2028, 3, 1)),
    ):
        a = dp.main_starts_for(CONFIG, "free_day", first)
        b = dp.main_starts_for(CONFIG, "free_day", second)
        for phase in dp.MAIN_PHASES:
            assert abs(a[phase] - b[phase]) <= 60, (first, phase)


def test_every_day_of_two_years_has_nine_ordered_states_for_all_profile_pairs():
    current = date(2027, 1, 1)
    while current < date(2029, 1, 1):
        for profile in day_profile.DAY_PROFILES:
            for next_profile in day_profile.DAY_PROFILES:
                cycle = _cycle(current, profile, next_profile)
                values = [start for _, start in cycle.sub_starts] + [cycle.end]
                assert all(b > a for a, b in zip(values, values[1:])), current
                assert [sub for sub, _ in cycle.sub_starts] == list(dp.CYCLE_ORDER)
                assert not cycle.clamped
        current += timedelta(days=1)


def test_derivation_weights_split_each_main_phase():
    cycle = _cycle(date(2026, 12, 21))
    starts = dict(cycle.sub_starts)
    assert _hhmmss(starts["forenoon"]) == "09:00:00"
    assert _hhmmss(starts["midday"]) == "12:00:00"  # Tag 9h -> 3:2:2:2
    assert _hhmmss(starts["afternoon"]) == "14:00:00"
    assert _hhmmss(starts["late_afternoon"]) == "16:00:00"
    assert _hhmmss(starts["evening"]) == "18:00:00"
    assert _hhmmss(starts["late_evening"]) == "20:15:00"  # Abend 4.5h -> 1:1
    assert _hhmmss(starts["early_night"]) == "22:30:00"
    night = cycle.end - starts["early_night"]
    assert starts["late_night"] - starts["early_night"] == round(Fraction(night * 2, 3))


# --------------------------------------------------------- evaluation/time


def test_boundaries_are_inclusive_and_each_state_is_reached():
    cycle = _cycle(date(2026, 11, 17), "workday", "workday")
    for index, (sub, start) in enumerate(cycle.sub_starts):
        at = cycle.wall(start, BERLIN)
        assert dp.evaluate(CONFIG, at, _weekday_profile).sub_phase == sub
        before = dp.evaluate(CONFIG, at - timedelta(seconds=1), _weekday_profile)
        assert before.sub_phase == dp.CYCLE_ORDER[index - 1]


def test_midnight_keeps_the_running_night_without_a_transition():
    before = dp.evaluate(CONFIG, _at(2026, 11, 17, 23, 59, 59), _weekday_profile)
    after = dp.evaluate(CONFIG, _at(2026, 11, 18, 0, 0, 0), _weekday_profile)
    assert before.sub_phase == after.sub_phase == "early_night"
    assert before.cycle.cycle_date == after.cycle.cycle_date == date(2026, 11, 17)
    assert before.cycle.sub_starts == after.cycle.sub_starts
    # Nacht ends at Morgen of the new calendar date
    assert dp.evaluate(CONFIG, _at(2026, 11, 18, 5, 54, 0), _weekday_profile).sub_phase == "late_night"
    assert dp.evaluate(CONFIG, _at(2026, 11, 18, 6, 0, 0), _weekday_profile).sub_phase == "early_morning"


def test_evening_carries_past_midnight_when_the_night_starts_after_midnight():
    # Freier Tag 21.06.: Nacht 00:00 -> 20.06. (Sa) late_evening runs to 00:00.
    lookup = _fixed("free_day")
    assert dp.evaluate(CONFIG, _at(2026, 6, 20, 23, 59), lookup).sub_phase == "late_evening"
    early = dp.evaluate(CONFIG, _at(2026, 6, 21, 0, 1), lookup)
    assert early.sub_phase == "early_night"
    assert early.cycle.cycle_date == date(2026, 6, 20)


def test_profile_change_at_midnight_uses_the_new_dates_profile_for_the_morning():
    # Fr 20.11.2026 Werktag -> Sa 21.11.2026 Freier Tag.
    lookup = _weekday_profile
    friday_night = dp.evaluate(CONFIG, _at(2026, 11, 20, 23, 30), lookup)
    after_midnight = dp.evaluate(CONFIG, _at(2026, 11, 21, 1, 0), lookup)
    assert friday_night.profile.profile == "workday"
    assert friday_night.next_profile.profile == "free_day"
    assert friday_night.cycle.sub_starts == after_midnight.cycle.sub_starts
    free_morning = dp.main_starts_for(CONFIG, "free_day", date(2026, 11, 21))["morning"]
    assert friday_night.cycle.end == free_morning + 86400
    # 06:30 is no longer morning on the free day, the night continues
    assert dp.evaluate(CONFIG, _at(2026, 11, 21, 6, 30), lookup).sub_phase == "late_night"


def test_profile_change_during_the_day_never_jumps_back():
    workday = dp.evaluate(CONFIG, _at(2026, 11, 17, 9, 30), _fixed("workday"))
    assert workday.sub_phase == "forenoon"
    # Sickness entered at 09:30: free day -> Tag starts 10:00 -> computed Morgen.
    sick = dp.evaluate(CONFIG, _at(2026, 11, 17, 9, 31), _fixed("free_day"), guard=workday.guard)
    assert sick.computed_sub_phase == "early_morning"
    assert sick.sub_phase == "forenoon"
    assert sick.held is True
    later = dp.evaluate(CONFIG, _at(2026, 11, 17, 10, 0), _fixed("free_day"), guard=sick.guard)
    assert later.sub_phase == "forenoon" and later.held is False
    # Future boundaries follow the new profile
    evening = dp.main_starts_for(CONFIG, "free_day", date(2026, 11, 17))["evening"]
    assert later.cycle.main_starts["evening"] == evening


def test_repeated_dst_hour_cannot_cause_a_double_transition():
    cycle = _cycle(date(2026, 10, 24), "free_day", "free_day")
    late_night = dict(cycle.sub_starts)["late_night"]
    first = dp.evaluate(CONFIG, cycle.wall(late_night + 600, BERLIN), _fixed("free_day"))
    assert first.sub_phase == "late_night"
    repeated = cycle.wall(late_night - 3000, BERLIN)  # wall clock steps back 1h
    second = dp.evaluate(CONFIG, repeated, _fixed("free_day"), guard=first.guard)
    assert second.computed_sub_phase == "early_night"
    assert second.sub_phase == "late_night" and second.held


def test_spring_forward_day_keeps_ordered_wall_clock_boundaries():
    cycle = _cycle(date(2026, 3, 28), "free_day", "free_day")
    walls = [cycle.wall(start, BERLIN).replace(tzinfo=None) for _, start in cycle.sub_starts]
    assert walls == sorted(walls)
    at = dp.evaluate(CONFIG, _at(2026, 3, 29, 3, 0), _fixed("free_day"))
    assert at.sub_phase in {"early_night", "late_night"}


def test_restart_restores_the_guard_and_discards_stale_or_broken_guards():
    first = dp.evaluate(CONFIG, _at(2026, 11, 17, 23, 0), _weekday_profile)
    restored = dict(first.guard)  # JSON round trip in .storage
    again = dp.evaluate(CONFIG, _at(2026, 11, 17, 23, 0, 30), _weekday_profile, guard=restored)
    assert again.sub_phase == first.sub_phase and again.guard["since"] == first.guard["since"]
    stale = {"cycle": "2026-11-25", "index": 3, "since": "x"}
    assert dp.evaluate(CONFIG, _at(2026, 11, 17, 12), _weekday_profile, guard=stale).held is False
    for broken in ({"cycle": "nope"}, {"cycle": "2026-11-17", "index": 99}, ["x"], None):
        assert dp.evaluate(CONFIG, _at(2026, 11, 17, 12), _weekday_profile, guard=broken).held is False


def test_new_cycle_resets_the_guard():
    night = dp.evaluate(CONFIG, _at(2026, 11, 18, 5, 0), _weekday_profile)
    morning = dp.evaluate(CONFIG, _at(2026, 11, 18, 6, 0), _weekday_profile, guard=night.guard)
    assert morning.sub_phase == "early_morning"
    assert morning.guard["cycle"] == "2026-11-18" and morning.guard["index"] == 0


# -------------------------------------------------------------- validation


def test_config_round_trip_and_restore():
    updated = dp.with_anchors(CONFIG, {"workday": {"winter": {"night": "23:15"}}}, now_iso="t")
    restored = dp.config_from_dict(updated.to_dict())
    assert restored.anchors["workday"]["winter"]["night"] == "23:15"
    assert restored.previous_anchors["workday"]["winter"]["night"] == "22:30"
    assert dp.rollback(restored).anchors["workday"]["winter"]["night"] == "22:30"
    assert dp.reset_defaults(restored).anchors == dp._copy_anchors(dp.DEFAULT_ANCHORS)
    switched = dp.config_from_dict(dp.with_model(restored, "accordion", now_iso="m").to_dict())
    assert switched.model == "accordion" and switched.model_changed_at == "m"


def test_all_32_values_are_independent():
    updated = dp.with_anchors(CONFIG, {"free_day": {"spring": {"morning": "07:41"}}})
    assert updated.anchors["free_day"]["spring"]["morning"] == "07:41"
    assert updated.anchors["workday"]["spring"]["morning"] == "05:45"
    assert updated.anchors["free_day"]["autumn"]["morning"] == "07:30"


@pytest.mark.parametrize(
    ("patch", "code"),
    [
        ({"workday": {"winter": {"day": "9:7"}}}, "time_invalid"),
        ({"workday": {"winter": {"day": "24:00"}}}, "time_invalid"),
        ({"workday": {"winter": {"day": ""}}}, "time_invalid"),
        ({"workday": {"winter": {"day": "06:10"}}}, "order_invalid"),
        ({"workday": {"winter": {"evening": "08:59"}}}, "order_invalid"),
        ({"workday": {"winter": {"night": "05:50"}}}, "night_overlaps_morning"),
        ({"free_day": {"summer": {"night": "05:30"}}}, "cross_day_overlap"),
    ],
)
def test_invalid_anchor_matrices_are_rejected_with_understandable_messages(patch, code):
    with pytest.raises(dp.DayPhaseConfigError) as err:
        dp.with_anchors(CONFIG, patch)
    issue = next(item for item in err.value.issues if item.code == code)
    assert issue.message and not issue.message.startswith(code)


@pytest.mark.parametrize(
    "patch",
    [
        {"weekend": {"winter": {"day": "09:00"}}},
        {"workday": {"monsoon": {"day": "09:00"}}},
        {"workday": {"winter": {"noon": "12:00"}}},
    ],
)
def test_unknown_profiles_seasons_and_phases_are_rejected(patch):
    with pytest.raises(dp.DayPhaseConfigError):
        dp.with_anchors(CONFIG, patch)


def test_invalid_stored_documents_raise_for_the_coordinator_fallback():
    for raw in (
        {"version": 2},
        {"model": "astro"},
        {"anchors": {"workday": {"winter": {"night": "05:59"}}}},
    ):
        with pytest.raises(ValueError):
            dp.config_from_dict(raw)
    assert dp.default_config().model == "legacy"


def test_draft_preview_reports_errors_without_persisting():
    config, errors = dp.draft_config(CONFIG, {"workday": {"winter": {"night": "05:50"}}})
    assert config is None
    assert errors[0] == {
        "path": "workday.winter.night",
        "code": "night_overlaps_morning",
        "message": "Die Nacht muss mindestens 30 Minuten vor dem nächsten Morgen (06:00) beginnen.",
    }
    preview = dp.preview(
        CONFIG,
        date(2026, 11, 17),
        tz=BERLIN,
        applied=_weekday_profile(date(2026, 11, 17)),
        next_applied=_weekday_profile(date(2026, 11, 18)),
    )
    assert [row["id"] for row in preview["profiles"]["workday"]["main"]] == list(dp.MAIN_PHASES)
    assert preview["applied"]["profile"] == "workday"
    assert [row["start"] for row in preview["applied"]["main"]] == ["05:54", "09:00", "18:11", "22:41"]
    assert len(preview["applied"]["sub"]) == 9


# ------------------------------------------------------- consumer contract


def test_legacy_sensor_attributes_never_add_consumer_reserved_keys():
    evaluation = dp.evaluate(CONFIG, _at(2026, 11, 17, 12), _weekday_profile)
    attrs = evaluation.legacy_sensor_attributes()
    assert not dp.RESERVED_LEGACY_ATTRIBUTE_KEYS & set(attrs)
    assert attrs["active_phase"] in DAY_STATES
    assert set(attrs["phase_starts"]) == set(DAY_STATES)
    main = evaluation.day_phase_attributes(active_model="legacy")
    assert main["main_phase"] == "day" and main["drives_day_state"] is False


def test_documented_behaviour_changes_for_consumers_on_17_11_2026():
    """Workday 17.11.2026 with the proposed start values (vs. legacy model).

    Media subwoofer window (forenoon..late_evening) now ends with Nacht at
    22:41 instead of early_night 00:20 (legacy).  Light TMC reset / blind
    morning (early_morning) at 05:54 instead of 05:46.  Forenoon (subwoofer
    09:00 floor) starts exactly at 09:00.
    """

    cycle = _cycle(date(2026, 11, 17))
    starts = {sub: _hhmmss(start)[:5] for sub, start in cycle.sub_starts}
    assert starts == {
        "early_morning": "05:54",
        "forenoon": "09:00",
        "midday": "12:03",
        "afternoon": "14:06",
        "late_afternoon": "16:08",
        "evening": "18:11",
        "late_evening": "20:26",
        "early_night": "22:41",
        "late_night": "03:30",
    }


# ------------------------------------------------------------- day profile


def test_shared_day_profile_rules_and_wake_planner_reuse():
    holiday = wake_planning.WakeHoliday(is_holiday=True, source="core_state:holiday_calendar")
    vacation = wake_planning.WakeHoliday(is_holiday=True, is_vacation=True, source="manual_holiday_dates")
    holidays = {date(2026, 11, 18): holiday, date(2026, 11, 19): vacation}
    cases = {
        date(2026, 11, 17): ("workday", "workday"),
        date(2026, 11, 18): ("free_day", "holiday"),
        date(2026, 11, 19): ("free_day", "vacation"),
        date(2026, 11, 21): ("free_day", "weekend"),
    }
    for day, (profile, reason) in cases.items():
        resolution = day_profile.resolve_day_profile(day, holidays)
        assert (resolution.profile, resolution.reason) == (profile, reason)
        expected_wake = "weekend" if profile == "free_day" else "weekday"
        assert wake_config.profile_id_for_date(day, holidays) == expected_wake


def test_day_profile_quality_and_journal():
    degraded = day_profile.resolve_day_profile(date(2026, 11, 17), {}, quality="degraded")
    assert degraded.profile == "workday" and degraded.quality == "degraded"
    frozen = day_profile.resolution_from_journal(date(2026, 11, 17), "free_day")
    assert frozen.profile == "free_day" and frozen.quality == "journal"
    assert day_profile.resolution_from_journal(date(2026, 11, 17), "bogus") is None
