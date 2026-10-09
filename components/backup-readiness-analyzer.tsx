'use client';

import { useState } from 'react';

type Intent = 'prepare' | 'restore';
type Evidence = 'verified' | 'missing' | 'unknown';
type EvidenceKey = 'database' | 'media' | 'external' | 'configuration' | 'independent' | 'restoreTest';
type ExternalUse = 'yes' | 'no' | 'unknown';

type EvidenceItem = {
  key: EvidenceKey;
  label: string;
  description: string;
  href: string;
  linkLabel: string;
};

const evidenceOptions: { value: Evidence; label: string }[] = [
  { value: 'verified', label: 'Verified' },
  { value: 'missing', label: 'Missing' },
  { value: 'unknown', label: 'Unknown' },
];

const primaryItems: EvidenceItem[] = [
  {
    key: 'database',
    label: 'Database dump',
    description: 'A completed, dated dump you can retrieve. It contains Immich metadata and file paths—not photo or video bytes.',
    href: '#step-1-establish-the-recovery-point',
    linkLabel: 'Review database dump steps',
  },
  {
    key: 'media',
    label: 'Original media',
    description: 'The entire upload location, or at minimum the actual originals under upload, library where used, and profile.',
    href: '#what-belongs-in-the-backup-set',
    linkLabel: 'Review required media',
  },
];

const recoveryItems: EvidenceItem[] = [
  {
    key: 'configuration',
    label: 'Mappings and configuration',
    description: 'Private copies of .env, Compose/overrides, custom config, and the host-to-container mount map.',
    href: '#what-belongs-in-the-backup-set',
    linkLabel: 'Review configuration coverage',
  },
  {
    key: 'independent',
    label: 'Independent copy',
    description: 'A separate or offsite copy you can access if the Immich server or its primary storage fails.',
    href: '#step-3-verify-the-saved-copy-before-relying-on-it',
    linkLabel: 'Review saved-copy checks',
  },
  {
    key: 'restoreTest',
    label: 'Isolated restore test',
    description: 'A restore rehearsal on a disposable target that cannot write to the live production database or media.',
    href: '#step-3-verify-the-saved-copy-before-relying-on-it',
    linkLabel: 'Review safe restore testing',
  },
];

const allItems = [...primaryItems, ...recoveryItems];

function EvidenceOptions({ item, value, onChange }: { item: EvidenceItem; value?: Evidence; onChange: (value: Evidence) => void }) {
  return <div className="backup-readiness-evidence-options">
    {evidenceOptions.map((option) => <label key={option.value}>
      <input
        type="radio"
        name={`backup-readiness-${item.key}`}
        value={option.value}
        checked={value === option.value}
        onChange={() => onChange(option.value)}
      />
      <span>{option.label}</span>
    </label>)}
  </div>;
}

function EvidenceField({ item, value, onChange, compact = false }: { item: EvidenceItem; value?: Evidence; onChange: (value: Evidence) => void; compact?: boolean }) {
  const helpId = `backup-readiness-${item.key}-help`;
  const labelId = `backup-readiness-${item.key}-label`;

  if (compact) {
    return <div className="backup-readiness-evidence compact" role="group" aria-labelledby={labelId} aria-describedby={helpId}>
      <span className="backup-readiness-evidence-label" id={labelId}>{item.label}</span>
      <p id={helpId}>{item.description}</p>
      <EvidenceOptions item={item} value={value} onChange={onChange} />
    </div>;
  }

  return <fieldset className="backup-readiness-evidence" aria-describedby={helpId}>
    <legend>{item.label}</legend>
    <p id={helpId}>{item.description}</p>
    <EvidenceOptions item={item} value={value} onChange={onChange} />
  </fieldset>;
}

type Result = {
  tone: 'neutral' | 'warning' | 'danger' | 'complete';
  title: string;
  body: string;
  item?: EvidenceItem;
};

function resultFor(intent: Intent | undefined, evidence: Partial<Record<EvidenceKey, Evidence>>, externalUse: ExternalUse | undefined): Result {
  const database = evidence.database;
  const media = evidence.media;

  if (database === 'missing' && media === 'verified') {
    return {
      tone: 'danger',
      title: 'Media only is not a restorable Immich backup',
      body: 'The photo and video files are present, but Immich cannot reconstruct users, albums, asset metadata, or their database relationships from the directory alone.',
      item: primaryItems[0],
    };
  }

  if (database === 'verified' && media === 'missing') {
    return {
      tone: 'danger',
      title: 'A database dump alone is not a complete backup',
      body: 'The dump contains metadata and file paths, not the photo or video bytes. A database-only restore cannot recreate missing originals.',
      item: primaryItems[1],
    };
  }

  const activeItems = externalUse === 'yes'
    ? [...primaryItems, {
      key: 'external' as const,
      label: 'External libraries',
      description: 'Every external-library root, source mount, and relevant sidecar is included in the saved set.',
      href: '#what-belongs-in-the-backup-set',
      linkLabel: 'Review external-library coverage',
    }, ...recoveryItems]
    : allItems;

  const missingItem = activeItems.find((item) => evidence[item.key] === 'missing');
  if (missingItem) {
    const bodies: Partial<Record<EvidenceKey, string>> = {
      database: 'Without a usable database dump, the set lacks Immich users, albums, asset metadata, and the paths that connect records to files.',
      media: 'Without saved originals, database records cannot recover the missing photo and video bytes.',
      external: 'This set is incomplete for this installation because files read from external libraries are absent.',
      configuration: 'Record the deployment files and mount mappings needed to reconnect the database to the same storage layout.',
      independent: 'A copy stored only with the live server can be lost in the same storage or host failure.',
      restoreTest: 'The components may be present, but recoverability has not been demonstrated. Test only on an isolated target.',
    };
    return {
      tone: missingItem.key === 'restoreTest' ? 'warning' : 'danger',
      title: `${missingItem.label} is missing`,
      body: bodies[missingItem.key]!,
      item: missingItem,
    };
  }

  const unknownItem = activeItems.find((item) => evidence[item.key] === 'unknown');
  if (unknownItem) {
    return {
      tone: 'warning',
      title: `${unknownItem.label} is unverified`,
      body: `Unknown cannot be counted as protected. Locate and inspect the saved ${unknownItem.label.toLowerCase()} evidence before relying on this set.`,
      item: unknownItem,
    };
  }

  if (externalUse === 'unknown') {
    return {
      tone: 'warning',
      title: 'External-library use is unknown',
      body: 'Check the installation for external libraries and custom source mounts. Until that is known, this set cannot be called complete.',
      item: {
        key: 'external',
        label: 'External libraries',
        description: '',
        href: '#what-belongs-in-the-backup-set',
        linkLabel: 'Review external-library coverage',
      },
    };
  }

  const unansweredItem = activeItems.find((item) => evidence[item.key] === undefined);
  if (unansweredItem || externalUse === undefined) {
    const item = unansweredItem ?? {
      key: 'external' as const,
      label: 'External-library use',
      description: '',
      href: '#what-belongs-in-the-backup-set',
      linkLabel: 'Review external-library coverage',
    };
    return {
      tone: 'neutral',
      title: 'Evidence is still unrecorded',
      body: `Nothing is assumed verified. Record ${item.label.toLowerCase()} as verified, missing, or unknown before drawing a conclusion.`,
      item,
    };
  }

  if (!intent) {
    return {
      tone: 'neutral',
      title: 'Choose what you are preparing to do',
      body: 'The component evidence is recorded. Select backup preparation or restore/replacement to see the relevant safe next step.',
    };
  }

  return {
    tone: 'complete',
    title: 'Coverage recorded—recoverability is not guaranteed',
    body: intent === 'prepare'
      ? 'Every required item is marked verified, including an isolated restore test. Keep the recovery point consistent: stop immich-server during the coordinated backup, or if it must remain live, capture the database first and media second.'
      : 'Every required item is marked verified, including an isolated restore test. Confirm version compatibility and use the workflow for the selected target; never use the live production instance as a rehearsal target.',
  };
}

export function BackupReadinessAnalyzer() {
  const [intent, setIntent] = useState<Intent>();
  const [externalUse, setExternalUse] = useState<ExternalUse>();
  const [evidence, setEvidence] = useState<Partial<Record<EvidenceKey, Evidence>>>({});
  const result = resultFor(intent, evidence, externalUse);

  function setEvidenceValue(key: EvidenceKey, value: Evidence) {
    setEvidence((current) => ({ ...current, [key]: value }));
  }

  function setExternalLibraryUse(value: ExternalUse) {
    setExternalUse(value);
    setEvidence((current) => {
      if (current.external === undefined) return current;
      const { external: _previousExternal, ...remaining } = current;
      return remaining;
    });
  }

  return <section className="backup-readiness" aria-labelledby="backup-readiness-title">
    <header className="backup-readiness-header">
      <p className="backup-readiness-kicker">Local evidence analyzer</p>
      <h2 id="backup-readiness-title">Backup Completeness &amp; Restore Readiness</h2>
      <p>This browser-only guide does not inspect your server, files, dumps, or backups. Nothing starts as verified; record only evidence you checked yourself.</p>
    </header>

    <div className="backup-readiness-fields">
      <fieldset className="backup-readiness-intent">
        <legend><span aria-hidden="true">1</span> What are you preparing to do?</legend>
        <div className="backup-readiness-intent-options">
          <label>
            <input aria-label="Prepare a backup" type="radio" name="backup-readiness-intent" checked={intent === 'prepare'} onChange={() => setIntent('prepare')} />
            <span><strong>Prepare a backup</strong><small>Assess the set before relying on it.</small></span>
          </label>
          <label>
            <input aria-label="Restore or replace" type="radio" name="backup-readiness-intent" checked={intent === 'restore'} onChange={() => setIntent('restore')} />
            <span><strong>Restore or replace</strong><small>Assess a saved set before recovery.</small></span>
          </label>
        </div>
      </fieldset>

      {primaryItems.map((item, index) => <div className="backup-readiness-numbered" key={item.key}>
        <span aria-hidden="true">{index + 2}</span>
        <EvidenceField item={item} value={evidence[item.key]} onChange={(value) => setEvidenceValue(item.key, value)} />
      </div>)}

      <fieldset className="backup-readiness-external" aria-describedby="backup-readiness-external-use-help">
        <legend><span aria-hidden="true">4</span> Does this installation use external libraries?</legend>
        <p id="backup-readiness-external-use-help">Include folders Immich reads outside its upload storage, including their source mounts.</p>
        <div className="backup-readiness-evidence-options">
          {(['yes', 'no', 'unknown'] as const).map((value) => <label key={value}>
            <input aria-label={`External libraries: ${value === 'yes' ? 'Yes' : value === 'no' ? 'No' : 'Unknown'}`} type="radio" name="backup-readiness-external-use" checked={externalUse === value} onChange={() => setExternalLibraryUse(value)} />
            <span>{value === 'yes' ? 'Yes' : value === 'no' ? 'No' : 'Unknown'}</span>
          </label>)}
        </div>
        {externalUse === 'yes' ? <div className="backup-readiness-external-evidence">
          <EvidenceField
            compact
            item={{
              key: 'external',
              label: 'External-library files and mounts',
              description: 'Every external root, source mount, and relevant sidecar is present in the saved set.',
              href: '#what-belongs-in-the-backup-set',
              linkLabel: 'Review external-library coverage',
            }}
            value={evidence.external}
            onChange={(value) => setEvidenceValue('external', value)}
          />
        </div> : null}
      </fieldset>

      <fieldset className="backup-readiness-recovery">
        <legend><span aria-hidden="true">5</span> Recovery evidence</legend>
        <div className="backup-readiness-recovery-grid">
          {recoveryItems.map((item) => <EvidenceField
            compact
            key={item.key}
            item={item}
            value={evidence[item.key]}
            onChange={(value) => setEvidenceValue(item.key, value)}
          />)}
        </div>
      </fieldset>
    </div>

    <div className={`backup-readiness-result ${result.tone}`} role="status" aria-live="polite" aria-atomic="true">
      <p className="backup-readiness-result-label">Priority result</p>
      <strong>{result.title}</strong>
      <p>{result.body}</p>
      {result.item ? <a href={result.item.href}>{result.item.linkLabel}</a> : null}
    </div>

    {intent === 'restore' ? <aside className="backup-readiness-paths" aria-label="Current restore paths">
      <strong>Choose the current workflow</strong>
      <div>
        <a href="#step-4-choose-the-correct-restore-workflow">Existing installation: Administration → Maintenance</a>
        <a href="#step-4-choose-the-correct-restore-workflow">New or fresh installation: onboarding Restore from backup</a>
      </div>
      <p>These paths do not establish compatibility for a pre-v2.5 backup. Use older version-selected documentation, and do not assume a downgrade will work.</p>
    </aside> : null}

    <footer className="backup-readiness-footer">
      <span>No data leaves this page and no backup or restore command is run.</span>
      <a href="https://docs.immich.app/administration/backup-and-restore/" target="_blank" rel="noopener noreferrer">Official Backup and Restore documentation ↗</a>
    </footer>
  </section>;
}
