import { describe, expect, it } from 'vitest';
import { getPublishedDocuments } from '@/lib/content';
import sitemap, { parseLastModified } from '@/app/sitemap';
import { site } from '@/src/config/site';

describe('sitemap', () => {
  it('uses real article update dates and omits dates for fixed routes', () => {
    const entries = sitemap();
    const fixedRoutes = ['', 'guides', 'setup', 'troubleshooting', 'platforms', 'backup', 'about', 'privacy', 'terms'];
    for (const route of fixedRoutes) {
      expect(entries.find((entry) => entry.url === `https://${site.domain}/${route}`)).not.toHaveProperty('lastModified');
    }
    for (const doc of getPublishedDocuments()) {
      const entry = entries.find((item) => item.url === `https://${site.domain}/${doc.slug}`);
      expect(entry).toBeDefined();
      if (doc.updated) expect(entry?.lastModified).toEqual(new Date(`${doc.updated}T00:00:00.000Z`));
      else expect(entry).not.toHaveProperty('lastModified');
    }
  });

  it('omits invalid dates and emits unique absolute URLs on the existing routes', () => {
    expect(parseLastModified(undefined)).toBeUndefined();
    expect(parseLastModified('not-a-date')).toBeUndefined();
    expect(parseLastModified('2026-02-30')).toBeUndefined();
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith(`https://${site.domain}/`))).toBe(true);
    expect(urls).not.toContain(`https://${site.domain}/setup/how-to-update-immich/`);
    expect(urls).not.toContain(`https://${site.domain}/troubleshooting/immich-error-loading-image/`);
  });
});
