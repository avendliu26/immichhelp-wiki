// Metadata depends only on repository content and build-time site configuration.
export const dynamic = 'force-static';

import type { MetadataRoute } from 'next';
import { getPublishedDocuments } from '@/lib/content';
import { site } from '@/src/config/site';

const rootPaths = ['', 'guides', 'setup', 'troubleshooting', 'platforms', 'backup', 'about', 'privacy', 'terms'];

export function parseLastModified(value?: string): Date | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? undefined : date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const root = rootPaths.map((path) => ({ url: `https://${site.domain}/${path}` }));
  const docs = getPublishedDocuments().map((doc) => {
    const lastModified = parseLastModified(doc.updated);
    return { url: `https://${site.domain}/${doc.slug}`, ...(lastModified ? { lastModified } : {}) };
  });
  return [...root, ...docs];
}
