'use client';

import { useId, useState } from 'react';

export function MigrationReadiness() {
  const id = useId();
  const [os, setOs] = useState('macos');
  const [source, setSource] = useState('google');
  const [checked, setChecked] = useState<string[]>([]);
  const checks = [
    { key: 'backup', label: 'I have an independent copy of the originals and a server backup.', href: '/backup/immich-backup' },
    { key: 'server', label: 'I can sign in to the destination account and have checked free storage.', href: '#prepare-the-immich-server' },
    { key: 'key', label: 'I created a temporary API key for the intended library owner.', href: '#create-an-api-key' },
    { key: 'source', label: source === 'google' ? 'I have every ZIP part from one Takeout export, including JSON metadata.' : 'I have a readable source folder or export, with its original sidecars.', href: source === 'google' ? '#export-google-photos-with-takeout' : '#import-other-photo-libraries' },
    { key: 'trial', label: 'I selected a small representative album or folder for a trial.', href: '#run-a-preview-and-a-small-trial' },
  ];
  return <section className="update-preflight" aria-label="Migration preparation checker">
    <p><strong>Plan your first import</strong></p>
    <p>No key, server address, or photo is requested. Choices stay in this component until you leave or reload.</p>
    <div className="update-preflight-selectors">
      <label htmlFor={`${id}-os`}>Operating system
        <select id={`${id}-os`} value={os} onChange={(event) => setOs(event.target.value)}>
          <option value="macos">macOS</option><option value="windows">Windows</option><option value="linux">Linux</option>
        </select>
      </label>
      <label htmlFor={`${id}-source`}>Photo source
        <select id={`${id}-source`} value={source} onChange={(event) => { setSource(event.target.value); setChecked([]); }}>
          <option value="google">Google Photos Takeout</option><option value="folder">Local folder / NAS</option><option value="icloud">iCloud export</option>
        </select>
      </label>
    </div>
    <p>{os === 'windows' ? 'Use PowerShell and .\\immich-go.exe from the extracted folder. Keep the Takeout wildcard inside quotes.' : 'Use ./immich-go from the extracted folder, or immich-go after adding it to PATH.'}</p>
    <p>{source === 'google' ? 'Use from-google-photos with every archive part together; keep JSON files.' : source === 'folder' ? 'Use from-folder for a managed copy. For files that should stay on the NAS, consider an external library instead.' : 'Use from-icloud for the Apple export; retain its CSV metadata.'}</p>
    <ul className="update-preflight-list">{checks.map((check) => <li key={check.key}>
      <input id={`${id}-${check.key}`} type="checkbox" checked={checked.includes(check.key)} onChange={(event) => setChecked((current) => event.target.checked ? [...current, check.key] : current.filter((key) => key !== check.key))} />
      <div><label htmlFor={`${id}-${check.key}`}>{check.label}</label><a href={check.href}>Review this step</a></div>
    </li>)}</ul>
    <p role="status" className={`update-preflight-result${checked.length === checks.length ? ' complete' : ''}`}>
      {checked.length === checks.length ? 'Ready for a small trial' : `${checked.length} of ${checks.length} preparation checks complete`}. This checklist does not verify your server or migration. <a href="#verify-your-migration">Verify results after importing.</a>
    </p>
  </section>;
}
