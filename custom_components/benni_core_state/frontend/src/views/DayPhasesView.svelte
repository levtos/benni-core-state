<svelte:options runes={true} />

<script lang="ts">
  import { CalendarClock, RotateCcw, Save, Undo2 } from "@lucide/svelte";
  import type {
    AnchorMatrix,
    DayPhaseIssue,
    DayPhasePreview,
    DayProfileId,
    MainPhaseId,
    SeasonId,
    Snapshot,
  } from "../lib/contracts";
  import { displayMainPhase, displayPhase, formatTime } from "../lib/contracts";

  interface Props {
    snapshot: Snapshot | null;
    pendingCommand: string | null;
    onCommand: (command: string, payload?: Record<string, unknown>) => Promise<void>;
    onPreview: (date: string, anchors: AnchorMatrix | null) => Promise<DayPhasePreview | null>;
  }

  let { snapshot, pendingCommand, onCommand, onPreview }: Props = $props();

  const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

  function todayIso(): string {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 10);
  }

  function clone(matrix: AnchorMatrix): AnchorMatrix {
    return JSON.parse(JSON.stringify(matrix)) as AnchorMatrix;
  }

  const contract = $derived(snapshot?.day_phase ?? null);
  const savedKey = $derived(contract ? JSON.stringify(contract.anchors) : null);
  const canEdit = $derived(Boolean(snapshot?.capabilities.edit_day_phases));

  let draft = $state<AnchorMatrix | null>(null);
  let loadedKey = $state<string | null>(null);
  let previewDate = $state(todayIso());
  let preview = $state<DayPhasePreview | null>(null);
  let issues = $state<DayPhaseIssue[]>([]);
  let previewError = $state<string | null>(null);
  let confirmActivation = $state(false);

  const draftKey = $derived(draft ? JSON.stringify(draft) : null);
  const dirty = $derived(draftKey !== null && savedKey !== null && draftKey !== savedKey);
  const savedChangedElsewhere = $derived(dirty && loadedKey !== null && savedKey !== loadedKey);

  $effect(() => {
    if (!contract || savedKey === null) return;
    if (draft === null || (!dirty && savedKey !== loadedKey)) {
      draft = clone(contract.anchors);
      loadedKey = savedKey;
    }
  });

  function formatIssues(): DayPhaseIssue[] {
    if (!draft || !contract) return [];
    const found: DayPhaseIssue[] = [];
    for (const profile of contract.profiles) {
      for (const season of contract.seasons) {
        for (const phase of contract.main_phases) {
          const value = draft[profile.id][season.id][phase.id];
          if (!TIME_PATTERN.test(value ?? "")) {
            found.push({
              path: `${profile.id}.${season.id}.${phase.id}`,
              code: "time_invalid",
              message: `${phase.label}: Bitte eine Uhrzeit im Format HH:MM eingeben.`,
            });
          }
        }
      }
    }
    return found;
  }

  let previewTimer: ReturnType<typeof setTimeout> | null = null;
  let previewSequence = 0;

  async function runPreview(date: string, anchors: AnchorMatrix | null): Promise<void> {
    const sequence = ++previewSequence;
    try {
      const result = await onPreview(date, anchors);
      if (sequence !== previewSequence || !result) return;
      issues = result.errors ?? [];
      previewError = null;
      if (result.valid) preview = result;
    } catch (error) {
      if (sequence !== previewSequence) return;
      previewError = error instanceof Error ? error.message : "Vorschau nicht verfügbar.";
    }
  }

  $effect(() => {
    const key = draftKey;
    const date = previewDate;
    const isDirty = dirty;
    if (key === null || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
    const local = formatIssues();
    if (local.length) {
      issues = local;
      return;
    }
    if (previewTimer) clearTimeout(previewTimer);
    previewTimer = setTimeout(() => {
      void runPreview(date, isDirty ? (JSON.parse(key) as AnchorMatrix) : null);
    }, 350);
    return () => {
      if (previewTimer) clearTimeout(previewTimer);
    };
  });

  function fieldIssue(profile: DayProfileId, season: SeasonId, phase: MainPhaseId): DayPhaseIssue | undefined {
    return issues.find((issue) => issue.path === `${profile}.${season}.${phase}`);
  }

  function profileIssues(profile: DayProfileId): DayPhaseIssue[] {
    return issues.filter((issue) => issue.path.startsWith(`${profile}.`));
  }

  async function save(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    if (!draft || issues.length) return;
    await onCommand("day_phase.config.update", { anchors: draft });
  }

  function discard(): void {
    if (!contract) return;
    draft = clone(contract.anchors);
    loadedKey = savedKey;
  }

  function loadDefaults(): void {
    if (!contract) return;
    draft = clone(contract.defaults);
  }

  async function setModel(model: "legacy" | "accordion"): Promise<void> {
    await onCommand("day_phase.model.set", { model });
    confirmActivation = false;
  }

  function seasonLabel(id: string | undefined): string {
    return contract?.seasons.find((season) => season.id === id)?.label ?? "–";
  }
</script>

<div class="view-heading">
  <div>
    <p class="section-kicker">Tagesphasen</p>
    <h2>Saisonales Akkordeon · 32 Ankerzeiten</h2>
    <p class="muted">
      Vier Hauptphasen je Tagesprofil und Stichtag. Dazwischen wird linear über die Kalendertage interpoliert.
      Die neun bisherigen Tageszustände werden daraus abgeleitet.
    </p>
  </div>
  <CalendarClock size={24} color="var(--cyan)" />
</div>

{#if contract && draft}
  <section class="form-card" aria-labelledby="day-phase-model-heading">
    <div class="card-header">
      <div>
        <p class="section-kicker">Berechnungsmodell für sensor.*_day_state</p>
        <h3 id="day-phase-model-heading">
          {contract.active_model === "accordion" ? "Akkordeon aktiv" : "Bisheriger Algorithmus aktiv"}
        </h3>
      </div>
      <span class="chip" class:cyan={contract.active_model === "accordion"} class:orange={contract.active_model !== "accordion"}>
        {contract.models.find((model) => model.id === contract.active_model)?.label ?? contract.active_model}
      </span>
    </div>
    {#if contract.load_error}
      <div class="callout" role="alert">
        Die gespeicherte Tagesphasen-Konfiguration war ungültig. Core State nutzt sicher den bisherigen Algorithmus und
        die Startwerte, bis eine gültige Konfiguration gespeichert wird.
      </div>
    {/if}
    {#if contract.model === "accordion" && contract.active_model !== "accordion"}
      <div class="callout" role="alert">
        Das Akkordeon ist eingestellt, konnte aber nicht berechnet werden. Der bisherige Algorithmus bleibt als Rückfall aktiv.
      </div>
    {/if}
    {#if contract.current}
      <dl class="diagnostic-list" style="margin-top: 12px;">
        <dt>Hauptphase (Akkordeon)</dt>
        <dd>{displayMainPhase(contract.current.main_phase)} · {displayPhase(contract.current.sub_phase)}{contract.current.guard_hold ? " · gehalten (kein Rücksprung)" : ""}</dd>
        <dt>Tagesprofil des laufenden Zyklus</dt>
        <dd>{contract.current.day_profile_label ?? "–"} ({contract.current.cycle_date ?? "–"})</dd>
        <dt>Nächster Wechsel</dt>
        <dd>{displayPhase(contract.current.next_phase)} um {formatTime(contract.current.next_phase_at)}</dd>
        {#if contract.current.degraded}
          <dt>Eingeschränkt</dt>
          <dd>{(contract.current.degraded_reasons ?? []).join(", ")}</dd>
        {/if}
      </dl>
    {/if}
    <div class="action-row" style="margin-top: 14px;">
      {#if contract.model === "accordion"}
        <button class="button secondary" type="button" disabled={pendingCommand !== null || !canEdit} onclick={() => setModel("legacy")}>
          <Undo2 size={16} /> Zurück zum bisherigen Algorithmus
        </button>
      {:else}
        <label class="inline-meta">
          <input type="checkbox" bind:checked={confirmActivation} disabled={!canEdit} />
          <span>Kompatibilitätsprüfung der Verbraucher ist abgeschlossen</span>
        </label>
        <button class="button" type="button" disabled={pendingCommand !== null || !canEdit || !confirmActivation || dirty} onclick={() => setModel("accordion")}>
          Akkordeon für day_state aktivieren
        </button>
      {/if}
      <span class="helper">Der Vier-Phasen-Sensor rechnet immer mit; umgeschaltet wird nur der bestehende Neun-Phasen-Sensor.</span>
    </div>
  </section>

  <form onsubmit={save} aria-label="Ankerzeiten bearbeiten">
    {#each contract.profiles as profile (profile.id)}
      <section class="table-card" style="margin-top: 14px;" aria-labelledby={`anchors-${profile.id}`}>
        <div class="section-header">
          <div>
            <p class="section-kicker">Tagesprofil</p>
            <h3 id={`anchors-${profile.id}`}>{profile.label}</h3>
          </div>
          <span class="helper">Beginn der Hauptphase · Nacht nach Mitternacht (z. B. 00:30) gehört zum Vorabend</span>
        </div>
        <div class="table-wrap">
          <table class="rules-table anchor-table">
            <thead>
              <tr>
                <th scope="col">Stichtag</th>
                {#each contract.main_phases as phase (phase.id)}<th scope="col">{phase.label}</th>{/each}
              </tr>
            </thead>
            <tbody>
              {#each contract.seasons as season (season.id)}
                <tr>
                  <th scope="row"><strong>{season.label}</strong></th>
                  {#each contract.main_phases as phase (phase.id)}
                    {@const issue = fieldIssue(profile.id, season.id, phase.id)}
                    <td>
                      <input
                        class="anchor-input"
                        type="time"
                        step="60"
                        required
                        disabled={!canEdit}
                        bind:value={draft[profile.id][season.id][phase.id]}
                        aria-label={`${profile.label} · ${season.label} · Beginn ${phase.label}`}
                        aria-invalid={issue ? "true" : undefined}
                        title={issue?.message}
                      />
                      {#if issue}<small class="anchor-error">{issue.message}</small>{/if}
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        {#each profileIssues(profile.id).filter((issue) => issue.path.split(".").length < 3) as issue (issue.path + issue.code)}
          <div class="validation-error" role="alert">{issue.message}</div>
        {/each}
      </section>
    {/each}

    {#if issues.length}
      <div class="validation-error" role="alert">
        {issues.length === 1 ? "Eine Eingabe ist ungültig." : `${issues.length} Eingaben sind ungültig.`}
        Gespeichert wird erst, wenn alle Ankerzeiten zusammenpassen.
      </div>
    {/if}
    {#if savedChangedElsewhere}
      <div class="callout info" role="status">Der gespeicherte Stand wurde zwischenzeitlich geändert. „Verwerfen“ lädt ihn neu.</div>
    {/if}

    <div class="action-row" style="margin-top: 14px;">
      <button class="button" type="submit" disabled={pendingCommand !== null || !canEdit || !dirty || issues.length > 0}>
        <Save size={16} /> Ankerzeiten speichern
      </button>
      <button class="button secondary" type="button" disabled={!dirty} onclick={discard}>Verwerfen</button>
      <button class="button secondary" type="button" disabled={!canEdit} onclick={loadDefaults}>Startwerte ins Formular laden</button>
      <button class="button secondary" type="button" disabled={pendingCommand !== null || !canEdit || !contract.rollback_available || dirty} onclick={() => onCommand("day_phase.config.rollback")}>
        <RotateCcw size={16} /> Vorherigen Stand wiederherstellen
      </button>
      <span class="helper">Gespeichert wird versioniert in Core State; ein Neustart stellt den Stand wieder her.</span>
    </div>
  </form>

  <section class="table-card" style="margin-top: 14px;" aria-labelledby="day-phase-preview-heading">
    <div class="section-header">
      <div>
        <p class="section-kicker">{dirty ? "Vorschau mit ungespeicherten Änderungen" : "Vorschau"}</p>
        <h3 id="day-phase-preview-heading">Berechnete Phasen für ein Datum</h3>
      </div>
      <label class="field" style="min-width: 180px;">
        <span class="field-label">Datum</span>
        <input type="date" bind:value={previewDate} />
      </label>
    </div>
    {#if previewError}
      <div class="inline-error" role="alert">{previewError}</div>
    {:else if preview?.profiles}
      {#if preview.applied}
        <p class="muted">
          Gilt an diesem Datum: <strong>{preview.applied.label}</strong> ({preview.applied.reason_label}).
          Lage: {seasonLabel(preview.season?.from)} → {seasonLabel(preview.season?.to)}, Tag {preview.season?.elapsed_days} von {preview.season?.interval_days}.
        </p>
      {/if}
      <div class="table-wrap">
        <table class="rules-table">
          <thead>
            <tr><th scope="col">Hauptphase</th>{#each contract.profiles as profile (profile.id)}<th scope="col">{profile.label}</th>{/each}</tr>
          </thead>
          <tbody>
            {#each contract.main_phases as phase, index (phase.id)}
              <tr>
                <th scope="row"><strong>{phase.label}</strong></th>
                {#each contract.profiles as profile (profile.id)}
                  {@const row = preview.profiles[profile.id]?.main[index]}
                  <td class:active-profile={preview.applied?.profile === profile.id}>
                    {row ? `${row.start} – ${row.end}` : "–"}
                    {#if row?.duration_minutes !== undefined}<small class="helper"> · {Math.floor(row.duration_minutes / 60)} h {Math.round(row.duration_minutes % 60)} min</small>{/if}
                  </td>
                {/each}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      {#if preview.applied}
        <details style="margin-top: 12px;">
          <summary>Abgeleitete neun Tageszustände ({preview.applied.label})</summary>
          <div class="table-wrap">
            <table class="rules-table">
              <thead><tr><th scope="col">Zustand</th><th scope="col">Hauptphase</th><th scope="col">Von</th><th scope="col">Bis</th></tr></thead>
              <tbody>
                {#each preview.applied.sub as row (row.id)}
                  <tr><td><strong>{displayPhase(row.id)}</strong> <small class="helper">{row.id}</small></td><td>{displayMainPhase(row.main)}</td><td>{row.start}</td><td>{row.end}</td></tr>
                {/each}
              </tbody>
            </table>
          </div>
        </details>
      {/if}
    {:else}
      <div class="skeleton" aria-busy="true"></div>
    {/if}
  </section>
{:else if snapshot && !snapshot.day_phase}
  <div class="empty-state">Diese Core-State-Version liefert noch keine Tagesphasen-Konfiguration.</div>
{:else}
  <div class="skeleton" aria-busy="true"></div>
{/if}
