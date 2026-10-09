import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { UpdatePreflight } from '@/components/update-preflight';
import { getDocument } from '@/lib/content';
import { articleHeadings } from '@/lib/headings';
import { Markdown } from '@/lib/markdown';

afterEach(cleanup);

describe('update preflight checklist', () => {
  it('records reviews without claiming that the update or backups were verified', () => {
    render(<UpdatePreflight />);

    const checklist = screen.getByRole('region', { name: 'Docker Compose update preflight checklist' });
    const checkboxes = within(checklist).getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4);
    expect(within(checklist).getByRole('status')).toHaveTextContent('0 of 4 checks recorded.');
    expect(checklist).toHaveTextContent(/do not inspect your system, test a restore, or certify/i);
    expect(checklist).toHaveTextContent(/Not using Docker Compose/i);

    checkboxes.forEach((checkbox) => fireEvent.click(checkbox));

    const result = within(checklist).getByRole('status');
    expect(result).toHaveTextContent('Checks recorded; follow the detailed steps below.');
    expect(result).not.toHaveTextContent(/safe to update|update is safe/i);
  });

  it('links every check to existing detailed guidance', () => {
    render(<UpdatePreflight />);

    expect(screen.getByRole('link', { name: 'Review version guidance' })).toHaveAttribute('href', '#step-1-check-your-current-release-and-release-notes');
    expect(screen.getByRole('link', { name: 'Open the backup guide' })).toHaveAttribute('href', '/backup/immich-backup');
    expect(screen.getByRole('link', { name: 'Review media backup details' })).toHaveAttribute('href', '#step-2-back-up-the-database-and-actual-media');
    expect(screen.getByRole('link', { name: 'Review compatibility checks' })).toHaveAttribute('href', '#step-3-update-mobile-clients-and-check-immichversion');
  });
});

describe('update article rendering', () => {
  it('places the checklist after the initial answer and resolves every fragment link to a generated heading ID', () => {
    const document = getDocument('setup/how-to-update-immich');
    expect(document).toBeDefined();

    const { container } = render(<Markdown source={document!.body} />);
    const preflightHeading = screen.getByRole('heading', { name: 'Before You Update Immich' });
    const firstStepHeading = screen.getByRole('heading', { name: 'Step 1: Check your current release and release notes' });
    const checklist = screen.getByRole('region', { name: 'Docker Compose update preflight checklist' });
    const headingIds = new Set(articleHeadings(document!.body).map((heading) => heading.id));
    const fragmentLinks = within(checklist).getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('#'));

    expect(preflightHeading.compareDocumentPosition(firstStepHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(fragmentLinks).not.toHaveLength(0);
    fragmentLinks.forEach((link) => expect(headingIds.has(link.getAttribute('href')!.slice(1))).toBe(true));
    expect(container).toHaveTextContent('docker compose pull && docker compose up -d');
    expect(screen.getByRole('heading', { name: 'Updating packaged NAS and LXC installations' })).toBeInTheDocument();
  });

  it('recognizes only a standalone preflight marker and preserves surrounding content', () => {
    const { rerender } = render(<Markdown source={'Before\n\n<UpdatePreflight />\n\nAfter'} />);

    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Docker Compose update preflight checklist' })).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();

    rerender(<Markdown source={'<UpdatePreflight /> with trailing text'} />);
    expect(screen.queryByRole('region', { name: 'Docker Compose update preflight checklist' })).not.toBeInTheDocument();
    expect(screen.getByText('<UpdatePreflight /> with trailing text')).toBeInTheDocument();
  });
});
