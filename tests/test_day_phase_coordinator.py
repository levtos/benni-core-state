"""Coordinator wiring of the day-phase accordion (HA runtime stubbed).

Covers the fallback chain (legacy default, accordion active, evaluation error,
invalid stored document), the per-date profile journal, calendar degradation,
restart persistence of the guard and the preview endpoint.
"""
from __future__ import annotations

import asyncio
from dataclasses import replace
from datetime import date, datetime
from types import SimpleNamespace
from zoneinfo import ZoneInfo

from test_coordinator_helpers import BenniCoreStateCoordinator  # seeds HA stubs

from custom_components.benni_core_state import coordinator as coordinator_module
from custom_components.benni_core_state import day_phase as dp
from custom_components.benni_core_state import logic, wake_config
from custom_components.benni_core_state.models import PersistentState

BERLIN = ZoneInfo("Europe/Berlin")
LEGACY_KEYS = set(logic.compute_day_phase_diagnostics(datetime(2026, 11, 17, 12, tzinfo=BERLIN), "midday"))
ALLOWED_EXTRA_LEGACY_KEYS = {
    "day_phase_model",
    "configured_day_phase_model",
    "day_phase_fallback_reason",
    "accordion_shadow",
    "legacy_shadow_state",
    "main_phase",
    "day_profile",
    "cycle_date",
    "guard_hold",
    "day_phase_degraded",
    "day_phase_degraded_reasons",
}


class _States:
    def __init__(self, states: dict[str, str] | None = None) -> None:
        self._states = states or {}

    def get(self, entity_id: str):
        if entity_id not in self._states:
            return None
        return SimpleNamespace(state=self._states[entity_id], attributes={})


class _Store:
    def __init__(self, raw=None) -> None:
        self.raw = raw
        self.saved = []

    async def async_load(self):
        return self.raw

    async def async_save(self, data) -> None:
        self.saved.append(data)
        self.raw = data


def _coord(*, model: str = "legacy", states: dict[str, str] | None = None, holiday_entity: str | None = None):
    coord = object.__new__(BenniCoreStateCoordinator)
    coord.hass = SimpleNamespace(states=_States(states))
    coord.entry = SimpleNamespace(entry_id="entry1", data={}, options={})
    coord._wake_config = replace(wake_config.default_config(), holiday_calendar_entity=holiday_entity)
    coord._wake_config_ready = True
    coord._day_phase_config = dp.with_model(dp.default_config(), model)
    coord._day_phase_load_error = None
    coord._day_phase_eval_error = None
    coord._day_phase_evaluation = None
    coord._persistent = PersistentState()
    coord._day_phase_store = _Store()

    async def _refresh() -> None:
        return None

    coord.async_request_refresh = _refresh
    return coord


def _outputs(coord, local_now: datetime):
    holidays = coord._configured_holidays(local_now, start=local_now.date())
    return coord._day_state_outputs(local_now, local_now, holidays)


def test_default_model_keeps_the_legacy_day_state_and_runs_the_accordion_as_shadow():
    coord = _coord()
    now = datetime(2026, 11, 17, 23, 30, tzinfo=BERLIN)
    day_state, attrs, main, phase_attrs, model = _outputs(coord, now)
    assert model == "legacy"
    assert day_state == logic.compute_day_state(now) == "late_evening"
    assert attrs["accordion_shadow"]["state"] == "early_night"
    assert main == "night" and phase_attrs["drives_day_state"] is False
    assert set(attrs) - LEGACY_KEYS <= ALLOWED_EXTRA_LEGACY_KEYS
    assert not dp.RESERVED_LEGACY_ATTRIBUTE_KEYS & set(attrs)


def test_accordion_model_drives_the_nine_state_sensor():
    coord = _coord(model="accordion")
    now = datetime(2026, 11, 17, 23, 30, tzinfo=BERLIN)
    day_state, attrs, main, phase_attrs, model = _outputs(coord, now)
    assert model == "accordion"
    assert day_state == "early_night"
    assert attrs["legacy_shadow_state"] == "late_evening"
    assert attrs["day_phase_model"] == "accordion"
    assert phase_attrs["drives_day_state"] is True
    assert set(attrs) - LEGACY_KEYS <= ALLOWED_EXTRA_LEGACY_KEYS
    assert not dp.RESERVED_LEGACY_ATTRIBUTE_KEYS & set(attrs)
    assert coord._persistent.day_phase_guard["cycle"] == "2026-11-17"


def test_evaluation_error_falls_back_to_the_legacy_algorithm_and_never_unknown():
    coord = _coord(model="accordion")
    coord._day_phase_config = replace(coord._day_phase_config, _sets={})
    now = datetime(2026, 11, 17, 12, 0, tzinfo=BERLIN)
    day_state, attrs, main, phase_attrs, model = _outputs(coord, now)
    assert model == "legacy"
    assert day_state == logic.compute_day_state(now)
    assert attrs["day_phase_fallback_reason"] == "accordion_evaluation_failed"
    assert main == dp.MAIN_OF_SUB[day_state]
    assert phase_attrs["degraded"] is True


def test_invalid_stored_document_loads_legacy_and_a_valid_save_recovers():
    coord = _coord()
    coord._store = _Store()
    coord._wake_config_store = _Store()
    coord._ux_command_store = _Store()
    coord._day_phase_store = _Store({"version": 1, "model": "accordion", "anchors": {"workday": {}}})
    asyncio.run(coord.async_load_stored())
    assert coord.day_phase_load_error == "stored_day_phase_config_invalid"
    assert coord.active_day_phase_model == "legacy"
    asyncio.run(coord.async_set_day_phase_model("accordion"))
    assert coord.day_phase_load_error is None
    assert coord.active_day_phase_model == "accordion"
    assert coord._day_phase_store.saved[-1]["model"] == "accordion"


def test_missing_document_is_initialised_with_legacy_defaults_and_restored():
    coord = _coord()
    coord._store = _Store()
    coord._wake_config_store = _Store()
    coord._ux_command_store = _Store()
    asyncio.run(coord.async_load_stored())
    stored = coord._day_phase_store.saved[-1]
    assert stored["model"] == "legacy"
    restarted = _coord()
    restarted._store = _Store()
    restarted._wake_config_store = _Store()
    restarted._ux_command_store = _Store()
    edited = dp.with_anchors(dp.config_from_dict(stored), {"workday": {"winter": {"night": "23:10"}}})
    restarted._day_phase_store = _Store(edited.to_dict())
    asyncio.run(restarted.async_load_stored())
    assert restarted.day_phase_config.anchors["workday"]["winter"]["night"] == "23:10"


def test_guard_and_journal_survive_a_restart_round_trip():
    coord = _coord(model="accordion")
    _outputs(coord, datetime(2026, 11, 17, 23, 30, tzinfo=BERLIN))
    restored = PersistentState.from_dict(coord._persistent.to_dict())
    assert restored.day_phase_guard == coord._persistent.day_phase_guard
    assert restored.day_profile_journal == {"2026-11-17": "workday"}


def test_journal_freezes_yesterdays_profile_for_the_running_night():
    coord = _coord(model="accordion")
    # Yesterday (Tue 17.11.) was recorded as a free day while it was today.
    coord._persistent.day_profile_journal = {"2026-11-17": "free_day", "2026-11-10": "workday"}
    now = datetime(2026, 11, 18, 0, 10, tzinfo=BERLIN)
    day_state, attrs, *_ = _outputs(coord, now)
    evaluation = coord.day_phase_evaluation
    assert evaluation.profile.profile == "free_day" and evaluation.profile.quality == "journal"
    assert evaluation.cycle.cycle_date == date(2026, 11, 17)
    assert coord._persistent.day_profile_journal == {
        "2026-11-17": "free_day",
        "2026-11-18": "workday",
    }
    assert day_state in {"late_evening", "early_night"}


def test_unavailable_holiday_calendar_marks_the_profile_degraded_not_unknown():
    coord = _coord(model="accordion", holiday_entity="calendar.feiertage", states={"calendar.feiertage": "unavailable"})
    day_state, _attrs, main, phase_attrs, model = _outputs(coord, datetime(2026, 11, 17, 12, tzinfo=BERLIN))
    assert model == "accordion" and day_state == "forenoon" and main == "day"
    assert phase_attrs["degraded"] is True
    assert any(reason.startswith("day_profile_degraded") for reason in phase_attrs["degraded_reasons"])
    healthy = _coord(model="accordion", holiday_entity="calendar.feiertage", states={"calendar.feiertage": "off"})
    assert _outputs(healthy, datetime(2026, 11, 17, 12, tzinfo=BERLIN))[3]["degraded"] is False


def test_preview_for_dates_drafts_and_invalid_input(monkeypatch):
    coord = _coord()
    fixed = datetime(2026, 11, 17, 12, tzinfo=BERLIN)
    monkeypatch.setattr(coordinator_module.dt_util, "utcnow", lambda: fixed)
    monkeypatch.setattr(coordinator_module.dt_util, "as_local", lambda value: value.astimezone(BERLIN))
    result = coord.day_phase_preview("2026-11-21")
    assert result["valid"] is True
    assert result["applied"]["profile"] == "free_day" and result["applied"]["reason"] == "weekend"
    draft = coord.day_phase_preview("2026-11-17", {"workday": {"winter": {"night": "23:30"}}})
    assert draft["valid"] is True and draft["draft"] is True
    assert coord.day_phase_config.anchors["workday"]["winter"]["night"] == "22:30"
    invalid = coord.day_phase_preview("2026-11-17", {"workday": {"winter": {"night": "05:50"}}})
    assert invalid["valid"] is False and invalid["errors"][0]["code"] == "night_overlaps_morning"
    assert coord.day_phase_preview("17.11.2026")["errors"][0]["code"] == "date_invalid"


def test_projection_rows_expose_main_phase_starts_per_profile():
    coord = _coord()
    holidays = coord._configured_holidays(datetime(2026, 11, 17, tzinfo=BERLIN))
    workday = coord._projection_day_phases(date(2026, 11, 17), holidays, datetime(2026, 11, 17, tzinfo=BERLIN))
    weekend = coord._projection_day_phases(date(2026, 11, 21), holidays, datetime(2026, 11, 17, tzinfo=BERLIN))
    assert workday["starts"] == {"morning": "05:54", "day": "09:00", "evening": "18:11", "night": "22:41"}
    assert weekend["profile"] == "free_day" and weekend["starts"]["day"] == "10:00"
