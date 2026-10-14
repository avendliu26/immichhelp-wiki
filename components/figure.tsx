import { figures, type FigureId } from '@/lib/diagrams';

// Server-rendered, no client JavaScript. `id` is restricted to the figure
// registry union, so an unknown or misspelled id fails type-checking rather
// than rendering an empty box.
export function Figure({ id }: { id: FigureId }) {
  const fig = figures[id];
  const external = /^https?:/.test(fig.sourceHref);
  return <figure className="doc-figure">
    <div className="doc-figure-viewport" role="region" aria-label="Diagram with horizontal scrolling on small screens" tabIndex={0}>{fig.svg}</div>
    <p className="doc-figure-hint">Swipe sideways to read the full diagram.</p>
    <figcaption>
      {fig.caption}{' '}
      <a
        href={fig.sourceHref}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {fig.sourceLabel}{external ? ' ↗' : ''}
      </a>
    </figcaption>
  </figure>;
}
