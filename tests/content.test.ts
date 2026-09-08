import { describe, expect, it } from 'vitest';
import { getPublishedDocuments, searchDocuments } from '@/lib/content';

describe('content index', () => {
  it('only exposes published documents', () => {
    expect(getPublishedDocuments().every((doc) => doc.status === 'published')).toBe(true);
  });

  it('searches headings and keywords as well as titles', () => {
    const results = searchDocuments('proxmox');
    expect(results.some((doc) => doc.slug === 'platforms/immich-proxmox')).toBe(true);
  });
});
