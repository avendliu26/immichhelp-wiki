import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ImageLoadingCheck } from '@/components/image-loading-check';
import { Markdown } from '@/lib/markdown';
import { getDocument } from '@/lib/content';
import { articleHeadings } from '@/lib/headings';

afterEach(cleanup);
const choose = (name: string) => fireEvent.click(screen.getByRole('radio', { name }));
const evidence = (value: string) => fireEvent.change(screen.getByRole('combobox', { name: /failed image request/i }), { target: { value } });

describe('image request evidence routing', () => {
  it('does not infer missing storage from an authentication response', () => {
    render(<ImageLoadingCheck />);
    choose('No, the server original is missing or fails');
    choose('No clear pattern / other original download failure');
    evidence('401');
    expect(screen.getByRole('region', { name: 'Request evidence next check' })).toHaveTextContent(/sign in again/i);
    expect(screen.queryByText(/Record the exact original path and request time/)).not.toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: /No clear pattern/ })).not.toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Protect missing or unavailable originals' })).toBeInTheDocument();
  });

  it.each([
    ['403', /access rules/i],
    ['404', /does not prove.*deleted/i],
    ['429', /Retry-After/i],
    ['5xx', /same time.*server.*proxy logs/i],
    ['network', /DNS.*TLS/i],
    ['2xx', /content type.*response body/i],
    ['other', /exact status.*request time/i],
  ])('routes %s evidence without suggesting file regeneration', (value, expected) => {
    render(<ImageLoadingCheck />);
    choose('Yes, the server original downloads');
    evidence(value);
    const result = screen.getByRole('region', { name: 'Request evidence next check' });
    expect(result).toHaveTextContent(expected);
    expect(result).not.toHaveTextContent(/selective regeneration/i);
  });

  it('clears evidence and context when the original observation changes', () => {
    render(<ImageLoadingCheck />);
    choose('Yes, the server original downloads');
    choose('Only the tile or preview fails');
    evidence('401');
    evidence('unknown');
    expect(screen.getByRole('radio', { name: 'Only the tile or preview fails' })).not.toBeChecked();
    evidence('404');
    choose('No, the server original is missing or fails');
    expect(screen.getByRole('combobox')).toHaveValue('unknown');
    expect(screen.queryByRole('region', { name: 'Request evidence next check' })).not.toBeInTheDocument();
    choose('Not sure yet');
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('provides a fallback for a working original without a recognizable pattern', () => {
    render(<ImageLoadingCheck />);
    choose('Yes, the server original downloads');
    choose('No clear pattern / other preview failure');
    expect(screen.getByText(/Compare one failing preview.*known-good asset/i)).toBeInTheDocument();
  });

  it('does not claim the original was tested locally when only a preview fails publicly', () => {
    render(<ImageLoadingCheck />);
    choose('Yes, the server original downloads');
    choose('It fails only through the public reverse proxy');
    expect(screen.queryByText(/same server original works locally and fails only/)).not.toBeInTheDocument();
    expect(screen.getByText(/Retest the same original and preview/)).toBeInTheDocument();
  });

  it('resolves new guidance links to rendered article sections', () => {
    const article = getDocument('troubleshooting/immich-error-loading-image')!;
    render(<Markdown source={article.body} />);
    const ids = new Set(articleHeadings(article.body).map(h => h.id));
    choose('No, the server original is missing or fails');
    for (const value of ['401', '403', '404', '429', '5xx', 'network', '2xx', 'other']) {
      evidence(value);
      const result = screen.getByRole('region', { name: 'Request evidence next check' });
      for (const link of within(result).getAllByRole('link')) {
        const href = link.getAttribute('href')!;
        if (href.startsWith('#')) expect(ids.has(href.slice(1))).toBe(true);
      }
    }
  });
});
