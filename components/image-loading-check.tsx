'use client';

import { useState } from 'react';

type OriginalStatus = 'works' | 'fails' | 'unknown';
type Context = 'thumbnail' | 'upload' | 'external' | 'move' | 'proxy' | 'checksum' | 'general';

type ContextOption = {
  value: Context;
  label: string;
};

type Guidance = {
  observation: string;
  nextCheck: string;
  articleHref: string;
  articleLabel: string;
  sourceHref: string;
  sourceLabel: string;
  caution?: string;
};

const statusOptions: { value: OriginalStatus; label: string }[] = [
  { value: 'works', label: 'Yes, the server original downloads' },
  { value: 'fails', label: 'No, the server original is missing or fails' },
  { value: 'unknown', label: 'Not sure yet' },
];

const contextOptions: Record<Exclude<OriginalStatus, 'unknown'>, ContextOption[]> = {
  works: [
    { value: 'thumbnail', label: 'Only the tile or preview fails' },
    { value: 'upload', label: 'It started immediately after upload' },
    { value: 'external', label: 'It affects an external library or NAS' },
    { value: 'move', label: 'It started after moving storage or updating' },
    { value: 'proxy', label: 'It fails only through the public reverse proxy' },
    { value: 'checksum', label: 'There is a checksum mismatch or format-specific failure' },
  ],
  fails: [
    { value: 'general', label: 'No clear pattern / other original download failure' },
    { value: 'upload', label: 'It happened immediately after upload' },
    { value: 'external', label: 'It affects an external library or NAS' },
    { value: 'move', label: 'It started after moving storage or updating' },
    { value: 'checksum', label: 'There is a checksum mismatch or format-specific failure' },
  ],
};

const guidance: Record<Exclude<OriginalStatus, 'unknown'>, Partial<Record<Context, Guidance>>> = {
  works: {
    thumbnail: {
      observation: 'Observed: the server can return the original, while a derived image fails. This narrows the next check but does not identify the cause.',
      nextCheck: 'Review thumbnail job queue state first, then confirm the derived-media mount is available and read the matching server logs. Only then consider selective regeneration for the affected asset or missing derived files.',
      articleHref: '#fix-thumbnail-and-preview-errors',
      articleLabel: 'Jump to thumbnail and preview checks',
      sourceHref: 'https://docs.immich.app/administration/jobs-workers/',
      sourceLabel: 'Official Jobs and Workers documentation',
    },
    upload: {
      observation: 'Observed: the new original downloads, but processing may not have produced a usable preview. Upload completion alone does not identify a processing failure.',
      nextCheck: 'Review whether thumbnail jobs for the upload are progressing or failing, then match the asset and request time to the server logs before retrying any processing.',
      articleHref: '#error-loading-image-after-upload',
      articleLabel: 'Jump to after-upload checks',
      sourceHref: 'https://docs.immich.app/administration/jobs-workers/',
      sourceLabel: 'Official Jobs and Workers documentation',
    },
    external: {
      observation: 'Observed: this server original downloads, but the failure is associated with an external-library context. That does not prove the NAS or mount caused it.',
      nextCheck: 'Compare the library import path with the path visible inside every relevant container, and confirm the same mounted file is readable there before running another scan.',
      articleHref: '#if-only-external-library-images-fail',
      articleLabel: 'Jump to external-library checks',
      sourceHref: 'https://docs.immich.app/features/libraries/',
      sourceLabel: 'Official External Libraries documentation',
      caution: 'A rescan is not a recovery method for external files that were deleted or became unavailable. Preserve the files, mount, database and current evidence.',
    },
    move: {
      observation: 'Observed: the original is currently reachable, and the timing follows a storage move or update. Timing alone does not prove a version defect.',
      nextCheck: 'Compare the active host-to-container mappings, media-location settings and container destinations with the previously working configuration; then match any path error in the logs.',
      articleHref: '#errors-after-an-update-or-storage-move',
      articleLabel: 'Jump to update and storage-move checks',
      sourceHref: 'https://docs.immich.app/administration/system-integrity/',
      sourceLabel: 'Official System Integrity documentation',
    },
    proxy: {
      observation: 'Observed: the same server original works locally and fails only on the public route. This isolates the request path, but it does not by itself prove a proxy fault.',
      nextCheck: 'Retest the same original and preview through local and public URLs, then compare the failed request status with the reverse-proxy log from that time.',
      articleHref: '#images-work-locally-but-fail-through-the-reverse-proxy',
      articleLabel: 'Jump to reverse-proxy checks',
      sourceHref: 'https://docs.immich.app/administration/reverse-proxy/',
      sourceLabel: 'Official Reverse Proxy documentation',
    },
    checksum: {
      observation: 'Observed: the original downloads, while an integrity or format-specific signal differs. A checksum mismatch, a missing file and an untracked file are different findings.',
      nextCheck: 'Preserve the original and verify its integrity against a trusted copy or backup first. Then inspect the exact integrity finding or decoder error before considering any asset replacement or format-specific action.',
      articleHref: '#if-one-file-format-fails-or-checksums-differ',
      articleLabel: 'Jump to format and checksum checks',
      sourceHref: 'https://docs.immich.app/administration/system-integrity/',
      sourceLabel: 'Official System Integrity documentation',
    },
  },
  fails: {
    general: {
      observation: 'Observed: the server cannot return the original, with no clearer pattern yet. This establishes that the original is unavailable through the server, not why.',
      nextCheck: 'Record the exact original path and request time, then read the matching server logs and check that path, its mount and its permissions without changing them. Preserve the database, storage and backups; do not regenerate thumbnails while the original is unavailable.',
      articleHref: '#check-original-files-storage-paths-and-permissions',
      articleLabel: 'Jump to original file and storage checks',
      sourceHref: 'https://docs.immich.app/administration/system-integrity/',
      sourceLabel: 'Official System Integrity documentation',
    },
    upload: {
      observation: 'Observed: the server original fails immediately after upload. A local phone copy does not show that the server stored a readable original.',
      nextCheck: 'Record the asset and request time, inspect the first matching server error, and verify the exact original path and its storage mount before retrying processing.',
      articleHref: '#error-loading-image-after-upload',
      articleLabel: 'Jump to after-upload checks',
      sourceHref: 'https://docs.immich.app/administration/system-integrity/',
      sourceLabel: 'Official System Integrity documentation',
    },
    external: {
      observation: 'Observed: the server cannot return an external-library original. This may reflect path, mount, access or file availability; the observation is not a diagnosis.',
      nextCheck: 'Verify that the configured import path is the same container-visible path in every relevant container, then confirm the NAS mount and expected file are present and readable there.',
      articleHref: '#if-only-external-library-images-fail',
      articleLabel: 'Jump to external-library checks',
      sourceHref: 'https://docs.immich.app/features/libraries/',
      sourceLabel: 'Official External Libraries documentation',
      caution: 'Do not treat rescanning as recovery for an external file that is absent. Restore visibility or recover the file while preserving the database and evidence.',
    },
    move: {
      observation: 'Observed: the server original fails after a storage move or update. The timing does not distinguish a changed mount from a missing file or access problem.',
      nextCheck: 'Compare the old and active host-to-container mappings, media-location settings and container destinations, then inspect the exact original path reported in the logs.',
      articleHref: '#errors-after-an-update-or-storage-move',
      articleLabel: 'Jump to update and storage-move checks',
      sourceHref: 'https://docs.immich.app/administration/system-integrity/',
      sourceLabel: 'Official System Integrity documentation',
    },
    checksum: {
      observation: 'Observed: the server original fails and there is an integrity or format-specific signal. That does not establish whether the original is missing, changed or unreadable.',
      nextCheck: 'Preserve storage and backups, then verify the original file and its integrity against a trusted copy before interpreting the checksum or decoder result. Do not batch-replace assets.',
      articleHref: '#if-one-file-format-fails-or-checksums-differ',
      articleLabel: 'Jump to format and checksum checks',
      sourceHref: 'https://docs.immich.app/administration/system-integrity/',
      sourceLabel: 'Official System Integrity documentation',
    },
  },
};

export function ImageLoadingCheck() {
  const [status, setStatus] = useState<OriginalStatus | null>(null);
  const [context, setContext] = useState<Context | null>(null);
  const selectedGuidance = status && status !== 'unknown' && context ? guidance[status][context] : undefined;

  function selectStatus(nextStatus: OriginalStatus) {
    setStatus(nextStatus);
    setContext(null);
  }

  return <section className="image-loading-check" aria-label="Image loading error next-check guide">
    <p className="image-loading-check-kicker">Guided check · observation only</p>
    <p className="image-loading-check-intro">This guide does not inspect your server or make changes. Choose only what you directly observed.</p>

    <fieldset aria-describedby="original-download-help">
      <legend><span>1</span> Can the original be downloaded from the server web app?</legend>
      <p className="image-loading-check-help" id="original-download-help">Do not count a cached or local image displayed by the mobile app as a server original.</p>
      <div className="image-loading-check-options">
        {statusOptions.map((option) => {
          const id = `original-status-${option.value}`;
          return <label key={option.value} htmlFor={id}>
            <input
              id={id}
              type="radio"
              name="original-status"
              value={option.value}
              checked={status === option.value}
              onChange={() => selectStatus(option.value)}
            />
            <span>{option.label}</span>
          </label>;
        })}
      </div>
    </fieldset>

    <div className="image-loading-check-result" aria-live="polite">
      {status === 'unknown' ? <div className="image-loading-check-next">
        <strong>Next check</strong>
        <p>Do not diagnose from the tile or phone copy yet. In the server web app, open one affected asset and test its original download; if possible, repeat from another device. Then return and choose Yes or No.</p>
        <a href="#first-check-can-you-download-the-original">Review how to test the server original</a>
      </div> : null}

      {status === 'fails' ? <aside className="image-loading-check-danger" aria-label="Protect missing or unavailable originals">
        <strong>Protect the original and recovery state</strong>
        <p>Do not regenerate thumbnails to “recover” originals. Do not clean Trash, delete database rows, reset the stack, or mass chmod/chown. Preserve the database, storage and backups while you identify whether the original is missing or inaccessible.</p>
      </aside> : null}

      {status && status !== 'unknown' ? <fieldset className="image-loading-check-context" aria-describedby="loading-context-help">
        <legend><span>2</span> Which context matches?</legend>
        <p className="image-loading-check-help" id="loading-context-help">Choose the closest observed context. The result is a next check, not a definitive diagnosis.</p>
        <div className="image-loading-check-options image-loading-check-options-context">
          {contextOptions[status].map((option) => {
            const id = `loading-context-${status}-${option.value}`;
            return <label key={option.value} htmlFor={id}>
              <input
                id={id}
                type="radio"
                name="loading-context"
                value={option.value}
                checked={context === option.value}
                onChange={() => setContext(option.value)}
              />
              <span>{option.label}</span>
            </label>;
          })}
        </div>
      </fieldset> : null}

      {selectedGuidance ? <div className="image-loading-check-next">
        <strong>Next check</strong>
        <p>{selectedGuidance.observation}</p>
        <p>{selectedGuidance.nextCheck}</p>
        {selectedGuidance.caution ? <p className="image-loading-check-caution">{selectedGuidance.caution}</p> : null}
        <div className="image-loading-check-links">
          <a href={selectedGuidance.articleHref}>{selectedGuidance.articleLabel}</a>
          <a href={selectedGuidance.sourceHref} target="_blank" rel="noopener noreferrer">{selectedGuidance.sourceLabel} ↗</a>
        </div>
      </div> : null}
    </div>
  </section>;
}
