# Tagesphasen: saisonales Akkordeon mit 32 Ankerzeiten

Stand: 2026-11-17 · Integration `benni_core_state` 0.12.0 · Modell
`seasonal-anchor-accordion-v3` · Konfigurationsvertrag 1.0.0

## 1. Ziel und Abgrenzung

Der bisherige Algorithmus `calendar-seasonal-accordion-v2` legt den Beginn von
`early_night` je nach Jahreszeit zwischen 00:00 und 01:49. Verbraucher, die an
`early_night` hängen (z. B. die Subwoofer-Freigabe der Media Policy), schalten
dadurch erst gegen 00:20–00:30 bzw. im Sommer noch später.

Das neue Modell ersetzt die Berechnung **funktional**, bleibt aber hinter einem
Schalter: Default ist `legacy`. Bis zur kontrollierten Umschaltung liefert
`sensor.benni_core_state_day_state` unverändert den bisherigen Algorithmus.

Nicht Teil dieser Änderung: Migration von Verbrauchern auf vier Phasen,
Kalender-Umstrukturierung (Urlaub/Krankheit als eigene Typen), Astronomie.

## 2. Fachmodell (verbindlich)

| Element | Festlegung |
| --- | --- |
| Hauptphasen | Morgen (`morning`), Tag (`day`), Abend (`evening`), Nacht (`night`) |
| Stichtage | 21.03. Frühling · 21.06. Sommer · 23.09. Herbst · 21.12. Winter |
| Tagesprofile | Werktag (`workday`), Freier Tag (`free_day`) |
| Referenzzeiten | 2 × 4 × 4 = **32** unabhängig editierbare Beginnzeiten |
| Interpolation | linear über die tatsächlichen Kalendertage zwischen zwei Stichtagen |
| Ausgeschlossen | Astronomie, Sonnenkorrekturen, saisonale Zuschläge, feste Profil-Offsets |

Jede Grenze wird für jedes Datum direkt aus den beiden umgebenden Ankern
berechnet (`Anker_a + (Anker_b − Anker_a) · k / n`, exakt rational, einmalig auf
ganze Sekunden gerundet). Es gibt keine Fortschreibung von Tag zu Tag und damit
keine schleichenden Rundungsfehler. Am Stichtag selbst gilt exakt der Ankerwert.
Das Intervall 21.12. → 21.03. hat 90 bzw. im Schaltjahr 91 Tage.

Ein Nacht-Beginn, der auf oder vor dem Abend-Beginn liegt (z. B. `00:00`),
gehört zum Folgetag (+24 h). So sind Nachtbeginne nach Mitternacht möglich.

### Startwerte (Vorschlag, editierbar)

| Profil | Stichtag | Morgen | Tag | Abend | Nacht |
| --- | --- | --- | --- | --- | --- |
| Werktag | Frühling 21.03. | 05:45 | 09:00 | 18:30 | 23:00 |
| Werktag | Sommer 21.06. | 05:30 | 09:00 | 19:00 | 23:30 |
| Werktag | Herbst 23.09. | 05:45 | 09:00 | 18:30 | 23:00 |
| Werktag | Winter 21.12. | 06:00 | 09:00 | 18:00 | 22:30 |
| Freier Tag | Frühling 21.03. | 07:30 | 10:00 | 18:30 | 23:30 |
| Freier Tag | Sommer 21.06. | 07:00 | 10:00 | 19:00 | 00:00 |
| Freier Tag | Herbst 23.09. | 07:30 | 10:00 | 18:30 | 23:30 |
| Freier Tag | Winter 21.12. | 08:00 | 10:00 | 18:00 | 23:00 |

Werktag-Tag beginnt bewusst um 09:00 und fällt damit mit dem 09:00-Floor der
Subwoofer-Freigabe zusammen. Die Werte sind ein Vorschlag und vor der
Umschaltung in der Maske „Tagesphasen“ zu prüfen.

### Ableitung der neun bisherigen Zustände

Jede Hauptphase wird mit festen Gewichten geteilt. Die Gewichte entsprechen den
historischen Grunddauern des alten Modells (3 h : 2 h : 2 h : 2 h, 3 h : 3 h,
Nacht 2 : 1):

| Hauptphase | abgeleitete Zustände (Gewicht) |
| --- | --- |
| Morgen | `early_morning` (1) |
| Tag | `forenoon` (3) · `midday` (2) · `afternoon` (2) · `late_afternoon` (2) |
| Abend | `evening` (1) · `late_evening` (1) |
| Nacht | `early_night` (2) · `late_night` (1) |

Jeder der neun Zustände kommt pro Zyklus genau einmal und immer in derselben
Reihenfolge vor (`early_morning → … → late_night → early_morning`). Die
Mindestdauer jeder Hauptphase beträgt 30 Minuten; damit ist jeder abgeleitete
Zustand mindestens rund 6,7 Minuten lang.

## 3. Betriebstag, Mitternacht und Profilwechsel

* Ein **Zyklus D** läuft von Morgen(D) bis Morgen(D+1).
* Die Nacht gehört zu dem Zyklus, in dem sie begonnen hat. Ihr Ende ist der
  Morgen des **neuen Kalenderdatums**, berechnet mit dessen Tagesprofil.
* Ab 00:00 gilt das neue Datum. Weil das Nacht-Intervall vor und nach
  Mitternacht identisch berechnet wird (Look-ahead auf das Profil von D+1),
  erzeugt Mitternacht selbst **nie** einen Phasenwechsel.
* **Profil-Journal:** Das Profil des laufenden Tages wird jede Aktualisierung
  persistiert (`day_profile_journal`, nur D−1 und D). Nach Mitternacht verwendet
  der laufende Zyklus das eingefrorene Profil des Vortags. Ein Kalender, der nur
  das *aktuelle* Ereignis meldet, kann die laufende Nacht nicht umschreiben.
* **Profilwechsel während des Tages** (z. B. Krankmeldung um 09:30): künftige
  Grenzen folgen sofort dem neuen Profil, bereits erreichte Zustände werden
  nicht zurückgenommen (siehe Guard).

### Monotonie-Guard

Persistiert wird `(Zyklusdatum, Index des Unterzustands)`. Ein berechneter Wert,
der lexikografisch kleiner wäre, wird gehalten (`guard_hold = true`), bis die
Berechnung ihn wieder erreicht. Damit gibt es keine Rücksprünge und keine
doppelten Übergänge durch

* Profilwechsel während eines laufenden Tages,
* Änderungen der Ankerzeiten,
* die doppelte Stunde am Ende der Sommerzeit (Wandzeit springt 03:00 → 02:00).

Ein Guard, der mehr als einen Zyklus vor der Berechnung liegt (Uhr-Reset,
defekte Speicherung), wird verworfen. Der Guard überlebt Neustarts.

### Sommer-/Winterzeit

Alle Grenzen sind lokale Wandzeit. Beim Wechsel auf Sommerzeit werden Grenzen in
der fehlenden Stunde beim Sprung auf 03:00 erreicht; beim Wechsel auf Winterzeit
verhindert der Guard den doppelten Durchlauf.

## 4. Kalender und Tagesprofil (eine Quelle)

`day_profile.resolve_day_profile` ist die einzige Entscheidung Werktag/Freier
Tag. Sie nutzt die bestehende Core-State-Holiday-Map (manuelle Intervalle aus
der Wake-Konfiguration + konfigurierter Feiertags-/Urlaubskalender), es entsteht
keine zweite Kalenderverwaltung.

| Fall | Profil | `reason` |
| --- | --- | --- |
| Samstag/Sonntag | Freier Tag | `weekend` |
| Feiertag (Kalender-State) | Freier Tag | `holiday` |
| Urlaub / manuelles Intervall / Kalenderereignis | Freier Tag | `vacation` |
| sonst | Werktag | `workday` |

Der Wake Planner verwendet dieselbe Entscheidung
(`wake_config.profile_id_for_date` delegiert an `day_profile`). Krankheit hat
noch keinen eigenen Typ und wird bis zur Kalender-Umstrukturierung als
manuelles Von-bis-Intervall eingetragen.

Ist ein konfigurierter Feiertagskalender `unknown`/`unavailable`, wird das Profil
nach Wochentag + manuellen Intervallen bestimmt und als `degraded` markiert.
Ein Zustand `unknown` entsteht dadurch nicht.

## 5. Ausgaben

### `sensor.benni_core_state_day_state` (bestehend, unverändert kompatibel)

* Entity-ID, Unique-ID und die neun Zustandswerte bleiben gleich.
* Modell `legacy` (Default): Zustand und Attribute wie bisher, zusätzlich
  `day_phase_model`, `configured_day_phase_model`, `day_phase_fallback_reason`
  und `accordion_shadow` (Vorschau des Akkordeons).
* Modell `accordion`: Zustand aus dem Akkordeon; Attribute `active_phase`,
  `date`, `source`, `version`, `model_version`, `reason`, `phase_starts`
  (Zyklus-Reihenfolge) plus `main_phase`, `day_profile`, `cycle_date`,
  `guard_hold`, `day_phase_degraded(_reasons)`, `legacy_shadow_state`.
* **Bewusst nicht** am Sensor: `degraded`, `degraded_reason`, `quality`,
  `quality_status`, `source_quality`, `master_phase` (siehe Audit,
  blind_control und light_policy).

### `sensor.benni_core_state_day_phase` (neu)

Zustände `morning`, `day`, `evening`, `night`; rechnet immer (auch im Modell
`legacy` als Vorschau). Attribute: `main_phase(_label)`, `sub_phase`,
`computed_sub_phase`, `guard_hold`, `cycle_date`, `day_profile(_label|_reason|_source)`,
`next_day_profile`, `main_phase_starts` (inkl. `next_morning`),
`sub_phase_starts`, `next_phase(_at)`, `season`, `model_version`,
`day_phase_model`, `drives_day_state`, `degraded`, `degraded_reasons`.
Die Entity-ID wird explizit gesetzt, damit der neue Registry-Eintrag nicht das
`system_`-Präfix des umbenannten Geräts erbt.

## 6. Konfiguration, Persistenz, Rückfall

* Speicher: `.storage/benni_core_state_day_phase_<entry_id>` (Version 1) mit
  `model`, `anchors`, `previous_anchors` (ein Rückschritt), Zeitstempeln.
* Jede Änderung wird vollständig validiert: Format `HH:MM`, Reihenfolge
  Morgen < Tag < Abend < Nacht mit je ≥ 30 min, Nacht ≥ 30 min vor dem nächsten
  Morgen, sowie für **alle Kalendertage zweier Jahre (inkl. Schaltjahr) und alle
  vier Profilkombinationen** an Mitternacht.
* Ungültiges gespeichertes Dokument → Fehler im Log, Modell `legacy`,
  Startwerte, `load_error` sichtbar in Panel und `day_phase`-Sensor.
* Fehler in der Berechnung zur Laufzeit → `day_state` fällt auf `legacy`
  zurück, `day_phase` wird aus dem neunstufigen Zustand projiziert und als
  `degraded` markiert. Kein `unknown`.
* Umschaltung: Panel „Tagesphasen“ (Admin), Service
  `benni_core_state.set_day_phase_model` (`legacy` | `accordion`).

## 7. Verbraucher-Audit (Breaking-Change-Prüfung)

Geprüft wurden `origin/main` der Repositories sowie die live installierten
Versionen (Diagnostics der Light Policy, 2026-11-17). Der Combined-Sensor
`sensor.benni_combined_context_day_state` (Core Devices) ist ein reiner
Passthrough von `sensor.benni_core_state_day_state` (`reason:
core_state_passthrough`) und überträgt jede Änderung 1:1.

| Verbraucher (live) | Bindung | Auswertung von `day_state` | Ergebnis |
| --- | --- | --- | --- |
| **Core State intern** | intern | PS-Eintritt nur in `early_night`/`late_night`; Fenster-Wake nur außerhalb der Nacht; Live-Status-Text | kompatibel; **Verhalten verschoben**: PS bei Entertainment ab Nacht-Beginn (Werktag Winter 22:30 statt 00:00) |
| **benni_media_policy** 0.18.5 | Core-Sensor (Prefill + Migration vom Combined) | Lautstärke-Basis, Phasen-Max, Boost-Phasen je Zustand; Subwoofer erlaubt `forenoon … late_evening` + 09:00-Wanduhr-Floor | kompatibel (alle neun Werte bekannt); **gewolltes Verhalten**: Subwoofer endet mit Nacht-Beginn (z. B. 17.11. 22:41 statt 00:20). Lautstärkebasen der Nachtphasen greifen entsprechend früher |
| **benni_light_policy** 0.3.12 | Core-Sensor | Helligkeit/Look je Zustand; TMC-Reset bei Eintritt `early_morning` (prev persistiert); R16 Bettgeh-Signal in `early_night`/`late_night`; Lux-Gate „day_state bekannt“; R10 liest Attribut `master_phase` | kompatibel; **Verhalten verschoben**: R16 und Nacht-Helligkeit (150) ab Nacht-Beginn; TMC-Reset zum Morgen-Beginn. `master_phase` wird weiterhin nicht geliefert (R10 bleibt wie bisher inaktiv) |
| **blind_control** 0.7.5 | Core-Sensor | strenge Neun-Werte-Validierung; Tageslicht `early_morning … late_afternoon`, Privacy ab `evening`; generische Qualitätsattribute `degraded`/`quality`/`source_quality` jedes Eingangs | kompatibel; Privacy-Beginn praktisch unverändert (Abend-Beginn ≈ bisheriger `evening`); reservierte Attributnamen werden nicht gesetzt |
| **benni_climate_policy** 0.1.14 | Combined (Passthrough) | Nachtrampe `late_evening`/`early_night`/`late_night` (außer Sommer); Freizeit-Komforthalt in `early_night`; Vorheiz-Boost bei Flanke auf `early_night` (`_last_day_state` nur im Speicher); Bad: Werktag `early_morning`, frei `forenoon`, `late_evening`; Lüfter nachts gesperrt | kompatibel; **Verhalten verschoben**: Rampe beginnt mit der zweiten Abendhälfte (17.11. 20:26 statt 21:15), Nacht-Ziel ab 22:41 statt 00:20, Boost-Flanke entsprechend früher |
| **plug_policy_engine** 0.3.7 | Combined (Passthrough) | Alias-Faltung auf morning/day/evening/night; wirksam nur `night` (`early_night`/`late_night`) | kompatibel; Nachtlogik greift ab Nacht-Beginn. Vorbestehend: `midday`, `late_afternoon`, `evening` sind nicht in den Aliasen |
| **benni_core_devices** 0.5.6 | Core-Sensor | Combined-Passthrough; `import.yaml`-Ausdrücke (Rollo-Kandidaten) | Passthrough kompatibel. Vorbestehend: Ausdrücke referenzieren `late_morning` (existiert seit #24 nicht mehr) |
| **benni_media_state** 0.14.6 | Core-Sensor | nur Echo im Kontext-Attribut | kompatibel |
| YAML `living_light_mark_daylight_seen` | Combined | Trigger `to: forenoon`; Bedingung „nicht Nacht“ | kompatibel; Trigger zum Tag-Beginn (Werktag 09:00, frei 10:00) |
| YAML `toolbox_readiness` | Core-Sensor | nur Verfügbarkeit | kompatibel |
| benni_blind_policy | — | Privacy-Latch bei Flanke `early_night`/dunklem `late_evening`; Heat-Phasen | **nicht installiert** (ersetzt durch blind_control); Code geprüft, kompatibel |

### Breaking Changes

Keine. Entity-ID, Zustandsnamen, Reihenfolge, Unique-ID, Verfügbarkeit und alle
bisher gelesenen Attribute bleiben erhalten; alle neun Zustände treten je Zyklus
genau einmal auf.

### Verhaltensänderungen (Beispiele mit Startwerten)

Werktag 17.11.2026 (Zustand ab … Uhr):

| Zustand | bisher (v2) | Akkordeon |
| --- | --- | --- |
| `early_morning` | 05:46 | 05:54 |
| `forenoon` | 08:51 | 09:00 |
| `midday` | 11:56 | 12:03 |
| `afternoon` | 14:00 | 14:06 |
| `late_afternoon` | 16:05 | 16:08 |
| `evening` | 18:10 | 18:11 |
| `late_evening` | 21:15 | 20:26 |
| `early_night` | 00:20 (Folgetag) | 22:41 |
| `late_night` | 03:57 | 03:30 |

Weitere Stichproben: Werktag 21.12. `early_night` 22:30 (bisher 00:00);
Werktag 22.06. 23:29 (bisher 01:48); Freier Tag Sa 24.10. `early_morning`
07:40 (bisher 05:36), `early_night` 23:19 (bisher 00:35).

### Restore/Neustart und Umschaltmoment

* Light Policy (`prev_day_state` persistiert) und Climate Policy
  (`_last_day_state` nur im Speicher) reagieren auf Flanken. Ein Modellwechsel
  in einem Moment, in dem beide Modelle **verschiedene** Zustände liefern, kann
  eine einmalige Flanke erzeugen (z. B. TMC-Reset, Vorheiz-Boost). Deshalb nur
  umschalten, wenn `accordion_shadow.state` gleich dem aktuellen Zustand ist
  (Werktag z. B. 09:00–11:57 `forenoon`).
* Climate erkennt nach jedem HA-Neustart in `early_night` eine Flanke, weil
  `_last_day_state` nicht persistiert ist (vorbestehend, unabhängig vom Modell).

### Offene Prüfungen (nicht einsehbar)

* Optionen von Media-, Climate- und Plug-Policy ohne Options-Flow nicht lesbar;
  Bindung aus Code-Prefill, Migration und Debug-Attributen abgeleitet.
* 8 YAML-Automationen und 7 YAML-Skripte sind über die REST-API nicht
  inhaltlich durchsuchbar; die `einhornzentrale`-Quellen wurden per Git geprüft.
* Light Policy (live): `brightness_profile`/`look_map` in den Optionen enthalten
  teils alte Phasennamen (`late_morning`, `early_evening`) und keine Einträge
  für `evening` in einigen Themes; fehlende Schlüssel fallen auf Default bzw.
  den Schlüssel selbst zurück. Vorbestehend und modellunabhängig.

## 8. Kontrollierte Aktivierung

1. Release installieren, HA neu starten. Prüfen: `day_state` unverändert,
   `sensor.benni_core_state_day_phase` vorhanden, `accordion_shadow` gefüllt.
2. Panel „Tagesphasen“: 32 Werte prüfen/anpassen, Vorschau für mehrere Daten
   (Werktag, Wochenende, Feiertag, Sommer/Winter) kontrollieren, speichern.
3. Mindestens einen Tag im Schatten beobachten (`accordion_shadow` vs. Ziel).
4. Umschalten zu einem Zeitpunkt, an dem beide Modelle denselben Zustand
   liefern (siehe 7), per Panel oder
   `benni_core_state.set_day_phase_model: {model: accordion}`.
5. Abend/Nacht beobachten: Subwoofer, Nachtrampe, Licht, Rollo-Privacy.
6. Rückfall jederzeit: `set_day_phase_model: {model: legacy}` – ebenfalls zu
   einem Zeitpunkt mit gleichem Zustand.
