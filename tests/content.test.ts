import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { getDocument, getPublishedDocuments, searchDocuments } from '@/lib/content';
import { home } from '@/src/data/home';

describe('content index', () => {
  it('only exposes published documents', () => {
    expect(getPublishedDocuments().every((doc) => doc.status === 'published')).toBe(true);
  });

  it('keeps the SEO batch summaries consistent with the published articles', () => {
    const stored = JSON.parse(readFileSync('content/index.json', 'utf8'));
    const targets = ['setup/how-to-update-immich', 'troubleshooting/immich-error-loading-image'];
    for (const summary of getPublishedDocuments().filter((doc) => targets.includes(doc.slug))) {
      expect(stored.find((doc: { slug: string }) => doc.slug === summary.slug)).toMatchObject(summary);
    }
  });

  it('searches headings and keywords as well as titles', () => {
    const results = searchDocuments('proxmox');
    expect(results.some((doc) => doc.slug === 'platforms/immich-proxmox')).toBe(true);
  });

  it('keeps the image troubleshooting page direct, current, and connected to recovery guides', () => {
    const doc = getDocument('troubleshooting/immich-error-loading-image');
    expect(doc).toBeDefined();
    expect(doc?.title).toBe('Immich Error Loading Image: Causes & Safe Fixes');
    expect(doc?.heading).toBe('Immich Error Loading Image');
    expect(doc?.verifiedVersion).toBe('v3.2.4');
    expect(doc?.lastReviewed).toBe('2026-10-02');
    expect(doc?.body).toContain('If the original loads but the thumbnail or preview fails');
    expect(doc?.body).toContain('If the original also fails');
    expect(doc?.body).toContain('Thumbnail regeneration cannot recover a missing original');
    expect(doc?.body).toContain('## Error loading image after upload');
    expect(doc?.body).toContain('### Regenerate missing thumbnails after checking the cause');
    expect(doc?.body).toContain('/setup/how-to-update-immich');
    expect(doc?.body).toContain('/backup/immich-backup');
    expect(doc?.body).toContain('/storage/immich-external-library');
    expect(doc?.body).not.toContain('stable v3.1.0');
  });

  it('puts the modern v3 update flow before the labeled v1/v2 migration material', () => {
    const doc = getDocument('setup/how-to-update-immich');
    expect(doc).toBeDefined();
    expect(doc?.title).toBe('How to Update Immich: Docker Compose & v3');
    expect((doc as { heading?: string } | undefined)?.heading).toBe('How to Update Immich Safely');
    expect(doc?.verifiedVersion).toBe('v3.2.4');
    expect(doc?.lastReviewed).toBe('2026-10-02');
    expect(doc?.body).toContain('https://github.com/immich-app/immich/releases');
    expect(doc?.body).toContain('v3.2.4');
    expect(doc?.body).toContain('docker compose pull && docker compose up -d');
    expect(doc?.body).toContain('## How to upgrade to Immich v3');
    expect(doc?.body).toContain('DB_VECTOR_EXTENSION=pgvecto.rs');
    expect(doc?.body).toContain('x86-64-v2');
    expect(doc!.body.indexOf('docker compose pull && docker compose up -d')).toBeLessThan(doc!.body.indexOf('## How to upgrade to Immich v3'));
    expect(doc?.body).toContain('/backup/immich-backup');
    expect(doc?.body).toContain('/setup/immich-docker-compose');
    expect(doc?.body).toContain('/storage/immich-external-library');
    expect(doc?.body).not.toContain('stable is v3.1.0');
  });

  it('matches the homepage review link to a published guide and its verified version', () => {
    expect(home.latestUpdates[0]).toMatchObject({
      date: 'Sep 16, 2026',
      title: 'Guide review: Immich v3.2.2',
      href: '/setup/immich-reverse-proxy',
    });
    expect(getDocument('setup/immich-reverse-proxy')?.verifiedVersion).toBe('v3.2.2');
  });
});

describe('homepage internal links', () => {
  const staticRoutes = ['/', '/guides', '/setup', '/troubleshooting', '/platforms', '/backup', '/about', '/privacy', '/terms'];
  const routes = new Set([...staticRoutes, ...getPublishedDocuments().map((doc) => `/${doc.slug}`)]);
  const pageSource = readFileSync('app/page.tsx', 'utf8');
  const pageHrefs = [...pageSource.matchAll(/href="(\/[^"]*)"/g)].map((match) => match[1]);
  const dataHrefs = [
    ...home.popularHelp.map((card) => card.href),
    ...home.troubleshooting.items.map((item) => item.href),
    ...home.gettingStarted.items.map((item) => item.href),
    ...home.latestUpdates.map((item) => item.href),
    home.platforms.href,
    home.backup.href,
    home.finalCta.href,
  ];

  it('points every homepage link at a real route', () => {
    for (const href of [...pageHrefs, ...dataHrefs]) {
      expect(routes.has(href), `${href} should resolve to a real route`).toBe(true);
    }
  });

  it('gives each troubleshooting item its own destination', () => {
    const hrefs = home.troubleshooting.items.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(home.troubleshooting.items.map((item) => item.title)).toEqual([
      'Error loading image',
      'Version and update mismatches',
      'Storage and permission issues',
    ]);
  });

  it('links to the update guide from Popular Help and a Setup section', () => {
    expect(getDocument('setup/how-to-update-immich')).toBeDefined();
    expect(home.popularHelp.some((card) => card.href === '/setup/how-to-update-immich')).toBe(true);
    expect(pageHrefs.filter((href) => href === '/setup/how-to-update-immich').length).toBeGreaterThanOrEqual(1);
    expect(dataHrefs.filter((href) => href === '/setup/how-to-update-immich').length).toBeGreaterThanOrEqual(1);
  });
});
