'use client';

import { useState } from 'react';

const checks = [
  {
    title: 'Release notes and breaking changes reviewed',
    description: 'Compare every release note from your current server version through the intended target release.',
    href: '#step-1-check-your-current-release-and-release-notes',
    linkLabel: 'Review version guidance',
  },
  {
    title: 'Database recovery reviewed',
    description: 'Confirm that a current, recoverable database backup and a compatible restore method are available.',
    href: '/backup/immich-backup',
    linkLabel: 'Open the backup guide',
  },
  {
    title: 'Original media and filesystem backup reviewed',
    description: 'Separately cover original media, external-library roots, and private copies of your .env, Compose file, and custom configuration.',
    href: '#step-2-back-up-the-database-and-actual-media',
    linkLabel: 'Review media backup details',
  },
  {
    title: 'Current configuration and compatibility reviewed',
    description: 'Record the active server and mobile versions, then compare the current .env and Compose file with target-release requirements before upgrading.',
    href: '#step-3-update-mobile-clients-and-check-immichversion',
    linkLabel: 'Review compatibility checks',
  },
] as const;

export function UpdatePreflight() {
  const [recorded, setRecorded] = useState(() => checks.map(() => false));
  const completed = recorded.filter(Boolean).length;
  const allRecorded = completed === checks.length;

  function setCheck(index: number, checked: boolean) {
    setRecorded((current) => current.map((value, itemIndex) => itemIndex === index ? checked : value));
  }

  return <section className="update-preflight" aria-label="Docker Compose update preflight checklist">
    <p className="update-preflight-intro">For Docker Compose installations, record each review before you run an upgrade. These checkboxes do not inspect your system, test a restore, or certify that an update is safe.</p>
    <ul className="update-preflight-list">
      {checks.map((check, index) => {
        const id = `update-preflight-${index + 1}`;
        return <li key={check.title}>
          <input
            id={id}
            type="checkbox"
            checked={recorded[index]}
            onChange={(event) => setCheck(index, event.currentTarget.checked)}
          />
          <div>
            <label htmlFor={id}>{check.title}</label>
            <p>{check.description}</p>
            <a href={check.href}>{check.linkLabel}</a>
          </div>
        </li>;
      })}
    </ul>
    <p className={`update-preflight-result${allRecorded ? ' complete' : ''}`} role="status" aria-live="polite">
      {allRecorded ? 'Checks recorded; follow the detailed steps below.' : `${completed} of ${checks.length} checks recorded.`}
    </p>
    <aside className="update-preflight-platform-note">
      <strong>Not using Docker Compose?</strong> Do not copy Compose commands into another packaging method. Follow your platform or distribution&apos;s supported update method in <a href="#updating-packaged-nas-and-lxc-installations">the platform guidance below</a>.
    </aside>
  </section>;
}
