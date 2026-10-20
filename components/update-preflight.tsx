'use client';

import { useState } from 'react';

type Version = 'v3' | 'v1-v2' | 'very-old-v1' | 'unknown';
type Deployment = 'compose' | 'synology' | 'truenas' | 'unraid' | 'proxmox' | 'lxc-other' | 'unknown';

type Check = { title: string; description: string; href: string; linkLabel: string };

const versionOptions: { value: Version; label: string }[] = [
  { value: 'v3', label: 'Current v3' },
  { value: 'v1-v2', label: 'Older v1 / v2' },
  { value: 'very-old-v1', label: 'Very old v1' },
  { value: 'unknown', label: 'I’m not sure' },
];

const deploymentOptions: { value: Deployment; label: string }[] = [
  { value: 'compose', label: 'Official Docker Compose' },
  { value: 'synology', label: 'Synology Container Manager' },
  { value: 'truenas', label: 'TrueNAS Apps' },
  { value: 'unraid', label: 'Unraid' },
  { value: 'proxmox', label: 'Proxmox VM + Docker' },
  { value: 'lxc-other', label: 'LXC or another setup' },
  { value: 'unknown', label: 'I’m not sure' },
];

const composeChecks: Check[] = [
  { title: 'Release notes and breaking changes reviewed', description: 'Compare every release note from your current server version through the intended target release.', href: '#step-1-check-your-current-release-and-release-notes', linkLabel: 'Review version guidance' },
  { title: 'Database recovery reviewed', description: 'Confirm that a current, recoverable database backup and a compatible restore method are available.', href: '/backup/immich-backup', linkLabel: 'Open the backup guide' },
  { title: 'Original media and filesystem backup reviewed', description: 'Separately cover original media, external-library roots, and private copies of your .env, Compose file, and custom configuration.', href: '#step-2-back-up-the-database-and-actual-media', linkLabel: 'Review media backup details' },
  { title: 'Current configuration and compatibility reviewed', description: 'Record the active server and mobile versions, then compare the current .env and Compose file with target-release requirements before upgrading.', href: '#step-3-update-mobile-clients-and-check-immichversion', linkLabel: 'Review compatibility checks' },
];

function getVersionGuidance(version: Version) {
  if (version === 'v1-v2') return <><strong>Before v3:</strong> Review the official <a href="https://immich.app/blog/v3-migration">v3 migration checklist</a>, especially the database extension (pgvecto.rs is not supported in v3), compatibility requirements, removed configuration, and backup/restore requirements. Complete any required database migration before changing the server major version.</>;
  if (version === 'very-old-v1') return <><strong>Very old v1 needs extra care:</strong> Check the source version and migration error against the official <a href="https://docs.immich.app/errors/">upgrade-path guidance</a>. If you see “Invalid upgrade path,” Immich documents an intermediate upgrade to v1.132.3; the required path depends on your actual version. Read release notes and verify restore compatibility before continuing.</>;
  if (version === 'unknown') return <>First identify the <strong>running server version</strong> in Immich’s Administration settings or startup logs; a configured image tag alone may not match the running server. If you cannot identify it, pause before upgrading and compare your install with the <a href="https://docs.immich.app/install/upgrading/">official upgrade guide</a>.</>;
  return <>For v3 on official Docker Compose, keep the existing backup, release-note, configuration-validation, and verification steps below. Recheck the target release notes before each update.</>;
}

function getDeploymentGuidance(deployment: Deployment) {
  if (deployment === 'compose') return <>Use the Compose commands in this guide only from the directory containing the active Compose file and its environment configuration. The checklist records your review; it does not inspect your server or test a restore.</>;
  if (deployment === 'unknown') return <>Identify what manages the Immich server and database before acting. Check the interface or documentation you use to start and update the app, and compare it with <a href="https://docs.immich.app/install/upgrading/">Immich’s deployment-specific upgrade guidance</a>. Do not paste Compose commands until you confirm this is a Compose deployment.</>;
  const platform = deploymentOptions.find((option) => option.value === deployment)?.label;
  return <><strong>{platform}:</strong> Use that platform’s supported update controls and documentation. This guide’s Docker Compose commands may not match how your app, database, or storage is managed. Review <a href="#updating-packaged-nas-and-lxc-installations">the platform notes below</a> and the <a href="https://docs.immich.app/install/upgrading/">official deployment guidance</a> before proceeding.</>;
}

function getChecks(version: Version, deployment: Deployment): Check[] {
  if (version === 'v3' && deployment === 'compose') return composeChecks;
  const oldVersion = version === 'v1-v2' || version === 'very-old-v1';
  return [
    { title: 'Running version and deployment method identified', description: 'Confirm the running server version and which tool manages the server, database, and storage.', href: '#step-1-check-your-current-release-and-release-notes', linkLabel: 'Review version guidance' },
    { title: oldVersion ? 'Major-version migration and recovery requirements reviewed' : 'Release notes and recovery requirements reviewed', description: oldVersion ? 'Check the official migration notes, database requirements, compatibility, and a matching restore path before changing major versions.' : 'Read all applicable release notes and confirm that a recoverable database backup and restore method are available.', href: oldVersion ? '#how-to-upgrade-to-immich-v3' : '/backup/immich-backup', linkLabel: oldVersion ? 'Review migration checks' : 'Open the backup guide' },
    { title: 'Database, media, and configuration backups reviewed', description: 'Confirm the backup covers the database and actual media, plus the platform-specific configuration and storage mappings.', href: '#step-2-back-up-the-database-and-actual-media', linkLabel: 'Review backup details' },
    { title: 'Platform-supported update path confirmed', description: 'Verify the update steps for the selected deployment instead of assuming the standard Compose command applies.', href: '#updating-packaged-nas-and-lxc-installations', linkLabel: 'Review platform guidance' },
  ];
}

export function UpdatePreflight() {
  const [version, setVersion] = useState<Version>('v3');
  const [deployment, setDeployment] = useState<Deployment>('compose');
  const checks = getChecks(version, deployment);
  const [recorded, setRecorded] = useState<boolean[]>(() => checks.map(() => false));
  const completed = recorded.filter(Boolean).length;
  const allRecorded = completed === checks.length;

  function setCheck(index: number, checked: boolean) {
    setRecorded((current) => current.map((value, itemIndex) => itemIndex === index ? checked : value));
  }

  function changeVersion(next: Version) {
    setVersion(next);
    setRecorded(checks.map(() => false));
  }

  function changeDeployment(next: Deployment) {
    setDeployment(next);
    setRecorded(checks.map(() => false));
  }

  return <section className="update-preflight" aria-label="Immich update preflight checklist">
    <p className="update-preflight-intro">Choose the server version and deployment method to see relevant checks. This helper does not connect to or inspect your server, and cannot guarantee an update will succeed. Do not enter passwords, tokens, .env contents, or personal files.</p>
    <div className="update-preflight-selectors">
      <div>
        <label htmlFor="update-preflight-version">Current Immich server version</label>
        <select id="update-preflight-version" value={version} onChange={(event) => changeVersion(event.currentTarget.value as Version)}>
          {versionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="update-preflight-deployment">Deployment method</label>
        <select id="update-preflight-deployment" value={deployment} onChange={(event) => changeDeployment(event.currentTarget.value as Deployment)}>
          {deploymentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </div>
    </div>
    <div className="update-preflight-guidance" aria-live="polite">
      <p>{getVersionGuidance(version)}</p>
      <p>{getDeploymentGuidance(deployment)}</p>
    </div>
    <ul className="update-preflight-list">
      {checks.map((check, index) => {
        const id = `update-preflight-${index + 1}`;
        return <li key={check.title}>
          <input id={id} type="checkbox" checked={recorded[index] ?? false} onChange={(event) => setCheck(index, event.currentTarget.checked)} />
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
      <strong>Safety note:</strong> Checkboxes only record your review. They do not inspect your system, verify backups, or certify that an update is safe.
    </aside>
  </section>;
}
