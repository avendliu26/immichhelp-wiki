import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import Home from '@/app/page';
import { ArticleLayout } from '@/components/article-layout';
import { getDocument } from '@/lib/content';
import { Markdown } from '@/lib/markdown';
import { helpPaths } from '@/src/data/help-paths';

function dom(html: string) {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

describe('task and reading navigation', () => {
  it('renders all six task entries as independent links and preserves search', () => {
    const page = dom(renderToStaticMarkup(Home()));
    const tasks = page.querySelectorAll('.task-card');
    expect(tasks).toHaveLength(6);
    helpPaths.forEach((path, index) => {
      expect(tasks[index].querySelector('h3')?.textContent).toBe(path.title);
      expect(tasks[index].querySelector('p')?.textContent).toBe(path.description);
      expect(tasks[index].querySelector('.task-icon svg')).not.toBeNull();
      expect(tasks[index].querySelector('a')?.getAttribute('href')).toBe(path.href);
      expect(tasks[index].querySelector('a a')).toBeNull();
    });
    expect(page.querySelector('.hero button[aria-haspopup="dialog"]')).not.toBeNull();
  });

  it.each(['backup/immich-backup', 'troubleshooting/immich-error-loading-image'])('marks the actual current guide and keeps evidence metadata for %s', (slug) => {
    const doc = getDocument(slug)!;
    const page = dom(renderToStaticMarkup(<ArticleLayout doc={doc}><Markdown source={doc.body}/></ArticleLayout>));
    const active = page.querySelectorAll('.sidebar a[aria-current="page"]');
    expect(active).toHaveLength(1);
    expect(active[0].getAttribute('href')).toBe(`/${slug}`);
    expect(page.querySelector('nav[aria-label="Breadcrumb"] [aria-current="page"]')?.textContent).toBe(doc.title);
    expect(page.querySelector('.article-meta')?.textContent).toContain(doc.verifiedVersion);
    expect(page.querySelector('time')?.getAttribute('dateTime')).toBe(doc.lastReviewed);
    expect(page.querySelectorAll('figure.doc-figure')).toHaveLength(1);
  });

  it('provides keyboard access to overflowing tables and semantic column headers', () => {
    const page = dom(renderToStaticMarkup(<Markdown source={'| Component | Includes |\n|---|---|\n| Media | Originals |'}/>));
    const region = page.querySelector('[role="region"]');
    expect(region?.getAttribute('tabindex')).toBe('0');
    expect(region?.getAttribute('aria-label')).toBe('Table: Component, Includes');
    expect(page.querySelectorAll('thead th[scope="col"]')).toHaveLength(2);
    expect(page.querySelectorAll('tbody tr')).toHaveLength(1);
  });
});
