import { describe, expect, it } from 'vitest';
import { getDocument, getPublishedDocuments } from '@/lib/content';
import { getRelatedGuideLinks, ArticleJsonLd } from '@/components/article-layout';
import { renderToStaticMarkup } from 'react-dom/server';

const routes = new Set([
  '/guides', '/setup', '/platforms', '/backup', '/troubleshooting',
  ...getPublishedDocuments().map((doc) => `/${doc.slug}`),
]);

describe('article SEO and contextual internal links', () => {
  const slugs = [
    'setup/how-to-update-immich',
    'troubleshooting/immich-error-loading-image',
    'backup/immich-backup',
  ];

  it('links prominent guides to useful published follow-up pages', () => {
    for (const slug of slugs) {
      const doc = getDocument(slug);
      expect(doc).toBeDefined();
      const links = getRelatedGuideLinks(doc!);
      expect(links.length).toBeGreaterThanOrEqual(3);
      expect(new Set(links.map((link) => link.href)).size).toBe(links.length);
      for (const item of links) {
        expect(routes.has(item.href), `${slug}: ${item.href} should exist`).toBe(true);
        expect(item.href).not.toBe(`/${slug}`);
      }
    }
  });

  it('adds real author logo and valid modification dates without inventing publication dates', () => {
    const doc = getDocument('setup/how-to-update-immich');
    expect(doc).toBeDefined();
    const html = renderToStaticMarkup(<ArticleJsonLd doc={doc!} />);
    const article = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)]
      .map((match) => JSON.parse(match[1]))
      .find((value) => value['@type'] === 'Article');
    expect(article.dateModified).toBe('2026-10-02');
    expect(article.author).toMatchObject({
      name: 'Immich Help',
      url: 'https://immichhelp.wiki/',
      logo: 'https://immichhelp.wiki/android-chrome-512x512.png',
    });
    expect(article).not.toHaveProperty('datePublished');
    expect(article).not.toHaveProperty('image');
  });
});
