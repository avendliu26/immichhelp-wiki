import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ImageLoadingCheck } from '@/components/image-loading-check';
import { getDocument } from '@/lib/content';
import { articleHeadings } from '@/lib/headings';
import { Markdown } from '@/lib/markdown';

afterEach(cleanup);

function select(label: string) {
  fireEvent.click(screen.getByRole('radio', { name: label }));
}

describe('image loading next-check guide', () => {
  it('keeps an unknown result uncertain and requires a server-original test', () => {
    render(<ImageLoadingCheck />);

    select('Not sure yet');

    expect(screen.getByText(/Do not diagnose from the tile or phone copy yet/i)).toBeInTheDocument();
    expect(screen.getByText(/test its original download/i)).toBeInTheDocument();
    expect(screen.queryByText(/Which context matches/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Protect the original and recovery state/i)).not.toBeInTheDocument();
  });

  it('shows only contexts supported by an original that downloads and orders thumbnail checks safely', () => {
    render(<ImageLoadingCheck />);

    select('Yes, the server original downloads');

    expect(screen.getAllByRole('radio')).toHaveLength(9);
    expect(screen.getByRole('radio', { name: 'Only the tile or preview fails' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'It fails only through the public reverse proxy' })).toBeInTheDocument();

    select('Only the tile or preview fails');

    const result = screen.getByText('Next check').closest<HTMLElement>('.image-loading-check-next');
    expect(result).not.toBeNull();
    expect(result).toHaveTextContent(/job queue state first, then confirm the derived-media mount.*server logs.*Only then consider selective regeneration/i);
    expect(within(result!).getByRole('link', { name: 'Jump to thumbnail and preview checks' })).toHaveAttribute('href', '#fix-thumbnail-and-preview-errors');
  });

  it('protects unavailable originals and omits contexts that require a working original', () => {
    render(<ImageLoadingCheck />);

    select('No, the server original is missing or fails');

    const warning = screen.getByRole('complementary', { name: 'Protect missing or unavailable originals' });
    expect(warning).toHaveTextContent(/Do not regenerate thumbnails to “recover” originals/i);
    expect(warning).toHaveTextContent(/Do not clean Trash, delete database rows, reset the stack, or mass chmod\/chown/i);
    expect(screen.queryByRole('radio', { name: 'Only the tile or preview fails' })).not.toBeInTheDocument();
    expect(screen.queryByRole('radio', { name: 'It fails only through the public reverse proxy' })).not.toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(8);
  });

  it('provides a safe general path when an original fails without a clear pattern', () => {
    render(<ImageLoadingCheck />);

    select('No, the server original is missing or fails');
    select('No clear pattern / other original download failure');

    expect(screen.getByText(/exact original path and request time.*server logs.*mount and its permissions without changing them/i)).toBeInTheDocument();
    expect(screen.getByText(/Preserve the database, storage and backups; do not regenerate thumbnails/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Jump to original file and storage checks' })).toHaveAttribute('href', '#check-original-files-storage-paths-and-permissions');
    expect(screen.queryByRole('radio', { name: 'Only the tile or preview fails' })).not.toBeInTheDocument();
  });

  it('grounds external-library guidance in container paths and does not claim rescanning recovers files', () => {
    render(<ImageLoadingCheck />);

    select('No, the server original is missing or fails');
    select('It affects an external library or NAS');

    expect(screen.getByText(/same container-visible path in every relevant container/i)).toBeInTheDocument();
    expect(screen.getByText(/Do not treat rescanning as recovery/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Official External Libraries documentation/i })).toHaveAttribute('href', 'https://docs.immich.app/features/libraries/');
  });

  it('checks original integrity before interpreting a checksum mismatch', () => {
    render(<ImageLoadingCheck />);

    select('No, the server original is missing or fails');
    select('There is a checksum mismatch or format-specific failure');

    expect(screen.getByText(/verify the original file and its integrity against a trusted copy before interpreting the checksum/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Official System Integrity documentation/i })).toHaveAttribute('href', 'https://docs.immich.app/administration/system-integrity/');
  });

  it('routes public-host-only failures to existing reverse-proxy guidance', () => {
    render(<ImageLoadingCheck />);

    select('Yes, the server original downloads');
    select('It fails only through the public reverse proxy');

    expect(screen.getByText(/does not by itself prove a proxy fault/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Jump to reverse-proxy checks' })).toHaveAttribute('href', '#images-work-locally-but-fail-through-the-reverse-proxy');
  });

  it('offers no controls that execute commands or imply server access', () => {
    render(<ImageLoadingCheck />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.getByText(/does not inspect your server or make changes/i)).toBeInTheDocument();
  });
});

describe('image loading article integration', () => {
  it('places the guide before the unchanged symptom table and resolves every article fragment', () => {
    const document = getDocument('troubleshooting/immich-error-loading-image');
    expect(document).toBeDefined();

    const { container } = render(<Markdown source={document!.body} />);
    const guide = screen.getByRole('region', { name: 'Image loading error next-check guide' });
    const symptomHeading = screen.getByRole('heading', { name: 'Choose the matching symptom' });
    const table = screen.getByRole('table');
    const headingIds = new Set(articleHeadings(document!.body).map((heading) => heading.id));

    expect(guide.compareDocumentPosition(symptomHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(symptomHeading.compareDocumentPosition(table) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(table).toHaveTextContent('Original downloads, tile fails');
    expect(container).toHaveTextContent('Inspect server logs and integrity findings');

    select('Yes, the server original downloads');
    for (const option of [
      'Only the tile or preview fails',
      'It started immediately after upload',
      'It affects an external library or NAS',
      'It started after moving storage or updating',
      'It fails only through the public reverse proxy',
      'There is a checksum mismatch or format-specific failure',
    ]) {
      select(option);
      const fragment = within(guide).getByRole('link', { name: /^Jump to / }).getAttribute('href');
      expect(fragment).toMatch(/^#/);
      expect(headingIds.has(fragment!.slice(1))).toBe(true);
    }

    select('No, the server original is missing or fails');
    for (const option of [
      'No clear pattern / other original download failure',
      'It happened immediately after upload',
      'It affects an external library or NAS',
      'It started after moving storage or updating',
      'There is a checksum mismatch or format-specific failure',
    ]) {
      select(option);
      const fragment = within(guide).getByRole('link', { name: /^Jump to / }).getAttribute('href');
      expect(fragment).toMatch(/^#/);
      expect(headingIds.has(fragment!.slice(1))).toBe(true);
    }
  });

  it('recognizes only the standalone allow-listed marker', () => {
    const { rerender } = render(<Markdown source={'Before\n\n<ImageLoadingCheck />\n\nAfter'} />);

    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Image loading error next-check guide' })).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();

    rerender(<Markdown source={'<ImageLoadingCheck /> with trailing text'} />);
    expect(screen.queryByRole('region', { name: 'Image loading error next-check guide' })).not.toBeInTheDocument();
    expect(screen.getByText('<ImageLoadingCheck /> with trailing text')).toBeInTheDocument();
  });
});
