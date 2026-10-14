import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { figures } from '@/lib/diagrams';
import { Markdown } from '@/lib/markdown';

afterEach(cleanup);

describe('Markdown <Figure /> marker', () => {
  it('renders an allow-listed standalone marker as an accessible, caption-linked figure', () => {
    const { container } = render(<Markdown source={'Before\n\n<Figure id="backup-set-map" />\n\nAfter'} />);

    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();

    const figure = screen.getByRole('figure');
    expect(figure).toHaveTextContent(figures['backup-set-map'].caption);

    const viewport = screen.getByRole('region', { name: /horizontal scrolling on small screens/i });
    expect(viewport).toHaveClass('doc-figure-viewport');
    expect(screen.getByText('Swipe sideways to read the full diagram.')).toBeInTheDocument();

    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('role', 'img');
    expect(screen.getByRole('img')).toHaveAccessibleName(figures['backup-set-map'].alt);

    const source = screen.getByRole('link', { name: /Official Immich backup guidance/ });
    expect(source).toHaveAttribute('href', figures['backup-set-map'].sourceHref);
    expect(source).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('uses only inline vector shapes, with no raster or external image references', () => {
    const { container } = render(<Markdown source={'<Figure id="update-route-map" />'} />);
    const markup = container.querySelector('svg')!.innerHTML;

    expect(markup).toContain('<title');
    expect(markup).toContain('<desc');
    expect(markup).not.toMatch(/<image\b|<img\b/i);
    expect(markup).not.toMatch(/href="https?:/i);
    expect(markup).not.toMatch(/<foreignObject\b/i);
  });

  it('leaves a marker with trailing text as literal paragraph content', () => {
    render(<Markdown source={'<Figure id="backup-set-map" /> trailing text'} />);

    expect(screen.queryByRole('figure')).not.toBeInTheDocument();
    expect(screen.getByText('<Figure id="backup-set-map" /> trailing text')).toBeInTheDocument();
  });

  it('does not render an unregistered id as a figure', () => {
    render(<Markdown source={'<Figure id="not-a-figure" />'} />);

    expect(screen.queryByRole('figure')).not.toBeInTheDocument();
    expect(screen.getByText('<Figure id="not-a-figure" />')).toBeInTheDocument();
  });
});
