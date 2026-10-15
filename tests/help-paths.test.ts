import { describe, expect, it } from 'vitest';
import { getPublishedDocuments } from '@/lib/content';
import { helpPathIcons, helpPaths } from '@/src/data/help-paths';

const staticRoutes = ['/', '/guides', '/setup', '/troubleshooting', '/platforms', '/backup', '/about', '/privacy', '/terms', '/compare', '/features'];
const routeSet = new Set([...staticRoutes, ...getPublishedDocuments().map((doc) => `/${doc.slug}`)]);

describe('homepage help paths', () => {
  it('exposes six ordered task-based cards', () => {
    expect(helpPaths.map((path) => path.id)).toEqual([
      'install-setup',
      'fix-a-problem',
      'back-up-restore',
      'nas-platforms',
      'storage-libraries',
      'updates-migration',
    ]);
  });

  it('gives every card a distinct id', () => {
    const ids = helpPaths.map((path) => path.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('assigns every card an icon key from the declared icon set', () => {
    expect(helpPathIcons.length).toBeGreaterThan(0);
    for (const path of helpPaths) {
      expect(helpPathIcons, `${path.id} icon ${path.icon}`).toContain(path.icon);
    }
  });

  it('uses a root-relative href on every card and start-here link', () => {
    const hrefs = helpPaths.flatMap((path) => [path.href, ...(path.startHere ?? []).map((link) => link.href)]);
    for (const href of hrefs) {
      expect(href.startsWith('/')).toBe(true);
      expect(href).not.toMatch(/\s/);
      if (href !== '/') expect(href.endsWith('/')).toBe(false);
    }
  });

  it('points every card at a route that already exists', () => {
    for (const path of helpPaths) {
      expect(routeSet.has(path.href), `${path.id} href ${path.href} should resolve`).toBe(true);
    }
  });

  it('points every start-here link at a route that already exists', () => {
    for (const path of helpPaths) {
      for (const link of path.startHere ?? []) {
        expect(routeSet.has(link.href), `${path.id} link ${link.href} should resolve`).toBe(true);
        expect(link.title.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('keeps at most two start-here links per card', () => {
    for (const path of helpPaths) {
      expect((path.startHere ?? []).length).toBeLessThanOrEqual(2);
    }
  });

  it('writes a non-empty distinct title and description for each card', () => {
    for (const path of helpPaths) {
      expect(path.title.trim().length).toBeGreaterThan(0);
      expect(path.description.trim().length).toBeGreaterThan(0);
    }
    expect(new Set(helpPaths.map((path) => path.title)).size).toBe(helpPaths.length);
  });
});
