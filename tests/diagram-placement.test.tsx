import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { getDocument } from '@/lib/content';
import { figures, type FigureId } from '@/lib/diagrams';
import { Markdown } from '@/lib/markdown';

afterEach(cleanup);

const pages: { slug: string; id: FigureId; marker: string }[] = [
  { slug: 'backup/immich-backup', id: 'backup-set-map', marker: '<Figure id="backup-set-map" />' },
  { slug: 'troubleshooting/immich-error-loading-image', id: 'original-download-split', marker: '<Figure id="original-download-split" />' },
  { slug: 'setup/how-to-update-immich', id: 'update-route-map', marker: '<Figure id="update-route-map" />' },
];

function follows(node: Node | null, other: Node | null) {
  return Boolean(node && other && node.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_FOLLOWING);
}

describe('figure placement in articles', () => {
  it.each(pages)('$slug uses its marker exactly once as a standalone line', ({ slug, marker }) => {
    const document = getDocument(slug);
    expect(document).toBeDefined();
    const markers = document!.body.split('\n').filter((line) => line.trim().startsWith('<Figure'));
    expect(markers).toHaveLength(1);
    expect(markers[0].trim()).toBe(marker);
  });

  it.each(pages)('$slug cites a source that the article already links', ({ slug, id }) => {
    const document = getDocument(slug);
    expect(document!.body).toContain(figures[id].sourceHref);
  });

  it.each(pages)('$slug renders the registered figure with a responsive, labelled SVG', ({ slug, id }) => {
    const document = getDocument(slug);
    const { container } = render(<Markdown source={document!.body} />);

    const svg = screen.getByRole('img');
    expect(svg).toHaveAccessibleName(figures[id].alt);
    expect(svg).toHaveAttribute('viewBox');
    expect(svg).not.toHaveAttribute('width');
    expect(svg).not.toHaveAttribute('height');
    expect(container.querySelectorAll('figure.doc-figure')).toHaveLength(1);

    const source = screen.getByRole('link', { name: new RegExp(figures[id].sourceLabel) });
    expect(source).toHaveAttribute('href', figures[id].sourceHref);
  });

  it('does not make unsupported claims in any figure caption or description', () => {
    for (const fig of Object.values(figures)) {
      const text = `${fig.caption} ${fig.desc}`;
      expect(text).not.toMatch(/fixed in v\d/i);
      expect(text).not.toMatch(/\bguarantee/i);
      expect(text).not.toMatch(/100%/);
    }
  });
});

describe('figure position within each article', () => {
  it('places the backup map inside "What belongs in the backup set"', () => {
    const document = getDocument('backup/immich-backup')!;
    render(<Markdown source={document.body} />);

    const section = screen.getByRole('heading', { name: 'What belongs in the backup set' });
    const figure = screen.getByRole('figure');
    const nextSection = screen.getByRole('heading', { name: 'Step 1: Establish the recovery point' });

    expect(follows(section, figure)).toBe(true);
    expect(follows(figure, nextSection)).toBe(true);
  });

  it('places the original-download split after the first check and before the next-check guide', () => {
    const document = getDocument('troubleshooting/immich-error-loading-image')!;
    render(<Markdown source={document.body} />);

    const section = screen.getByRole('heading', { name: 'First check: can you download the original?' });
    const figure = screen.getByRole('figure');
    const guide = screen.getByRole('region', { name: 'Image loading error next-check guide' });

    expect(follows(section, figure)).toBe(true);
    expect(follows(figure, guide)).toBe(true);
  });

  it('places the update route map between the preflight checklist and Step 1', () => {
    const document = getDocument('setup/how-to-update-immich')!;
    render(<Markdown source={document.body} />);

    const preflight = screen.getByRole('region', { name: 'Docker Compose update preflight checklist' });
    const figure = screen.getByRole('figure');
    const firstStep = screen.getByRole('heading', { name: 'Step 1: Check your current release and release notes' });

    expect(follows(preflight, figure)).toBe(true);
    expect(follows(figure, firstStep)).toBe(true);
  });
});

// JSDOM has no SVG getBBox. Check composed coordinates here; real Chrome
// additionally checks glyph bounding boxes and collisions during visual QA.
function svgPoint(node: Element, x: number, y: number) {
  let ancestor = node.parentElement;
  while (ancestor && ancestor.tagName.toLowerCase() !== 'svg') {
    const transform = ancestor.getAttribute('transform');
    if (transform) {
      const translate = transform.match(/^translate\(([-\d.]+)[ ,]+([-\d.]+)\)$/);
      if (!translate) throw new Error(`Unsupported geometry in figure: ${transform}`);
      x += Number(translate[1]);
      y += Number(translate[2]);
    }
    ancestor = ancestor.parentElement;
  }
  return { x, y };
}
function containingPanel(node: Element): Element | undefined {
  let ancestor = node.parentElement;
  while (ancestor && ancestor.tagName.toLowerCase() !== 'svg') {
    const panel = [...ancestor.children].find(child => child.matches('rect.fig-panel'));
    if (panel) return panel;
    ancestor = ancestor.parentElement;
  }
}
function panelBounds(panel: Element) {
  const point = svgPoint(panel, Number(panel.getAttribute('x')), Number(panel.getAttribute('y')));
  return { ...point, right: point.x + Number(panel.getAttribute('width')), bottom: point.y + Number(panel.getAttribute('height')) };
}

describe('figure coordinate containment', () => {
  it.each(pages)('$id keeps every label and nested panel inside its owning box and viewBox', ({ id }) => {
    const { container } = render(<>{figures[id].svg}</>);
    const svg = container.querySelector('svg')!;
    const [, , width, height] = svg.getAttribute('viewBox')!.split(' ').map(Number);
    for (const text of svg.querySelectorAll('text')) {
      const point = svgPoint(text, Number(text.getAttribute('x')), Number(text.getAttribute('y')));
      const label = text.textContent || '';
      expect(point.x, label).toBeGreaterThanOrEqual(0);
      expect(point.x, label).toBeLessThanOrEqual(width);
      expect(point.y, label).toBeGreaterThanOrEqual(0);
      expect(point.y, label).toBeLessThanOrEqual(height);
      const panel = containingPanel(text);
      if (panel) {
        const box = panelBounds(panel);
        expect(point.x, label).toBeGreaterThanOrEqual(box.x + 10);
        expect(point.x, label).toBeLessThanOrEqual(box.right - 10);
        expect(point.y, label).toBeGreaterThanOrEqual(box.y + 10);
        expect(point.y, label).toBeLessThanOrEqual(box.bottom - 4);
      }
    }
    for (const panel of svg.querySelectorAll('rect.fig-panel')) {
      const box = panelBounds(panel);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(width);
      expect(box.bottom).toBeLessThanOrEqual(height);
      const parent = containingPanel(panel.parentElement!);
      if (parent) {
        const outer = panelBounds(parent);
        expect(box.x).toBeGreaterThanOrEqual(outer.x + 8);
        expect(box.y).toBeGreaterThanOrEqual(outer.y + 8);
        expect(box.right).toBeLessThanOrEqual(outer.right - 8);
        expect(box.bottom).toBeLessThanOrEqual(outer.bottom - 8);
      }
    }
  });
});
