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

    const checklist = screen.getByRole('region', { name: 'Immich update preflight checklist' });
    const checkboxes = within(checklist).getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4);
    expect(within(checklist).getByRole('status')).toHaveTextContent('0 of 4 checks recorded.');
    expect(checklist).toHaveTextContent(/does not connect to or inspect your server/i);
    expect(checklist).toHaveTextContent(/Do not enter passwords, tokens, .env contents, or personal files/i);
    expect(screen.getByLabelText('Current Immich server version')).toHaveValue('v3');
    expect(screen.getByLabelText('Deployment method')).toHaveValue('compose');

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

  it('updates version guidance and applicable checklist when selections change', () => {
    render(<UpdatePreflight />);
    const version = screen.getByLabelText('Current Immich server version');

    fireEvent.change(version, { target: { value: 'v1-v2' } });
    expect(screen.getByText(/pgvecto\.rs is not supported in v3/i)).toBeInTheDocument();
    expect(screen.getByText('Major-version migration and recovery requirements reviewed')).toBeInTheDocument();

    fireEvent.change(version, { target: { value: 'very-old-v1' } });
    expect(screen.getByText(/intermediate upgrade to v1\.132\.3/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /upgrade-path guidance/i })).toHaveAttribute('href', 'https://docs.immich.app/errors/');

    fireEvent.change(version, { target: { value: 'unknown' } });
    expect(screen.getByRole('region', { name: 'Immich update preflight checklist' })).toHaveTextContent(/identify the running server version/i);
    expect(screen.getByRole('status')).toHaveTextContent('0 of 4 checks recorded.');
  });

  it('shows deployment-specific guidance and never gives non-Compose users a direct Compose update command', () => {
    render(<UpdatePreflight />);
    const deployment = screen.getByLabelText('Deployment method');
    const cases = [
      ['synology', 'Synology Container Manager'], ['truenas', 'TrueNAS Apps'], ['unraid', 'Unraid'],
      ['proxmox', 'Proxmox VM + Docker'], ['lxc-other', 'LXC or another setup'], ['unknown', 'Identify what manages the Immich server'],
    ];
    for (const [value, message] of cases) {
      fireEvent.change(deployment, { target: { value } });
      const checklist = screen.getByRole('region', { name: 'Immich update preflight checklist' });
      expect(checklist).toHaveTextContent(message);
      expect(checklist).not.toHaveTextContent('docker compose pull && docker compose up -d');
      expect(within(checklist).getAllByRole('checkbox')).toHaveLength(4);
    }
  });

  it('keeps the four review checkboxes usable and resets them when the environment changes', () => {
    render(<UpdatePreflight />);
    const checklist = screen.getByRole('region', { name: 'Immich update preflight checklist' });
    const checkboxes = within(checklist).getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(within(checklist).getByRole('status')).toHaveTextContent('1 of 4 checks recorded.');
    fireEvent.change(screen.getByLabelText('Deployment method'), { target: { value: 'unraid' } });
    expect(within(checklist).getByRole('status')).toHaveTextContent('0 of 4 checks recorded.');
    within(checklist).getAllByRole('checkbox').forEach((checkbox) => fireEvent.click(checkbox));
    expect(within(checklist).getByRole('status')).toHaveTextContent('Checks recorded; follow the detailed steps below.');
  });
});

describe('update article rendering', () => {
  it('places the checklist after the initial answer and resolves every fragment link to a generated heading ID', () => {
    const document = getDocument('setup/how-to-update-immich');
    expect(document).toBeDefined();

    const { container } = render(<Markdown source={document!.body} />);
    const preflightHeading = screen.getByRole('heading', { name: 'Before You Update Immich' });
    const firstStepHeading = screen.getByRole('heading', { name: 'Step 1: Check your current release and release notes' });
    const checklist = screen.getByRole('region', { name: 'Immich update preflight checklist' });
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
    expect(screen.getByRole('region', { name: 'Immich update preflight checklist' })).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();

    rerender(<Markdown source={'<UpdatePreflight /> with trailing text'} />);
    expect(screen.queryByRole('region', { name: 'Immich update preflight checklist' })).not.toBeInTheDocument();
    expect(screen.getByText('<UpdatePreflight /> with trailing text')).toBeInTheDocument();
  });
});
