import { describe, expect, it } from 'vitest';
import { getDocument, getPublishedDocuments, searchDocuments } from '@/lib/content';
import { home } from '@/src/data/home';

describe('content index', () => {
  it('only exposes published documents', () => {
    expect(getPublishedDocuments().every((doc) => doc.status === 'published')).toBe(true);
  });

  it('searches headings and keywords as well as titles', () => {
    const results = searchDocuments('proxmox');
    expect(results.some((doc) => doc.slug === 'platforms/immich-proxmox')).toBe(true);
  });

  it('keeps the image troubleshooting page direct, current, and connected to recovery guides', () => {
    const doc = getDocument('troubleshooting/immich-error-loading-image');
    expect(doc).toBeDefined();
    expect(doc?.title).toBe('Immich Error Loading Image: Causes & Safe Fixes');
    expect(doc?.verifiedVersion).toBe('v3.2.1');
    expect(doc?.lastReviewed).toBe('2026-09-15');
    expect(doc?.body).toContain('If the original loads but the thumbnail or preview fails');
    expect(doc?.body).toContain('If the original also fails');
    expect(doc?.body).toContain('Thumbnail regeneration cannot recover a missing original');
    expect(doc?.body).toContain('/setup/how-to-update-immich');
    expect(doc?.body).toContain('/backup/immich-backup');
    expect(doc?.body).toContain('/storage/immich-external-library');
    expect(doc?.body).not.toContain('stable v3.1.0');
  });

  it('puts the modern v3 update flow before the labeled v1/v2 migration material', () => {
    const doc = getDocument('setup/how-to-update-immich');
    expect(doc).toBeDefined();
    expect(doc?.title).toBe('How to Update Immich Safely (Docker Compose)');
    expect((doc as { heading?: string } | undefined)?.heading).toBe('How to Update Immich Safely');
    expect(doc?.verifiedVersion).toBe('v3.2.1');
    expect(doc?.lastReviewed).toBe('2026-09-15');
    expect(doc?.body).toContain('v3.2.1');
    expect(doc?.body).toContain('released on September 14, 2026');
    expect(doc?.body).toContain('v3.2.0');
    expect(doc?.body).toContain('released on September 10, 2026');
    expect(doc?.body).toContain('docker compose pull && docker compose up -d');
    expect(doc?.body).toContain('## Updating from Immich v1 or v2');
    expect(doc?.body).toContain('/backup/immich-backup');
    expect(doc?.body).toContain('/setup/immich-docker-compose');
    expect(doc?.body).toContain('/storage/immich-external-library');
    expect(doc?.body).not.toContain('stable is v3.1.0');
  });

  it('does not advertise an obsolete stable release in the homepage updates feed', () => {
    expect(home.latestUpdates[0]).toMatchObject({
      date: 'Sep 14, 2026',
      title: 'Stable release: Immich v3.2.1',
    });
  });
});
