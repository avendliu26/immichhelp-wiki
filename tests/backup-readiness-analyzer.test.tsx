import fs from 'node:fs';
import path from 'node:path';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { BackupReadinessAnalyzer } from '@/components/backup-readiness-analyzer';
import { getDocument, getDocuments } from '@/lib/content';
import { articleHeadings } from '@/lib/headings';
import { Markdown } from '@/lib/markdown';

afterEach(cleanup);

function choose(groupName: string, option: string) {
  const group = screen.getByRole('group', { name: groupName });
  fireEvent.click(within(group).getByRole('radio', { name: option }));
}

function chooseExternalUse(option: 'Yes' | 'No' | 'Unknown') {
  fireEvent.click(screen.getByRole('radio', { name: `External libraries: ${option}` }));
}

function result() {
  return screen.getByRole('status');
}

const evidenceCases = [
  ['Database dump', 'Database dump'],
  ['Original media', 'Original media'],
  ['Mappings and configuration', 'Mappings and configuration'],
  ['Independent copy', 'Independent copy'],
  ['Isolated restore test', 'Isolated restore test'],
] as const;

describe('backup completeness and restore readiness analyzer', () => {
  it('starts with every control unselected and makes no verification claim', () => {
    render(<BackupReadinessAnalyzer />);

    const analyzer = screen.getByRole('region', { name: 'Backup Completeness & Restore Readiness' });
    const radios = within(analyzer).getAllByRole('radio');
    expect(radios).toHaveLength(20);
    radios.forEach((radio) => expect(radio).not.toBeChecked());
    expect(result()).toHaveTextContent('Evidence is still unrecorded');
    expect(analyzer).toHaveTextContent(/does not inspect your server, files, dumps, or backups/i);
    expect(analyzer).toHaveTextContent(/no backup or restore command is run/i);
    expect(within(analyzer).queryByRole('button')).not.toBeInTheDocument();
  });

  it.each(evidenceCases)('treats %s missing as a blocking priority', (groupName, expectedTitle) => {
    render(<BackupReadinessAnalyzer />);

    choose(groupName, 'Missing');

    expect(result()).toHaveTextContent(`${expectedTitle} is missing`);
    expect(result()).not.toHaveTextContent('Coverage recorded');
  });

  it.each(evidenceCases)('does not count unknown %s evidence as protected', (groupName, expectedTitle) => {
    render(<BackupReadinessAnalyzer />);

    choose(groupName, 'Unknown');

    expect(result()).toHaveTextContent(`${expectedTitle} is unverified`);
    expect(result()).toHaveTextContent(/Unknown cannot be counted as protected/i);
  });

  it('explains why neither a database-only nor media-only set is complete', () => {
    render(<BackupReadinessAnalyzer />);

    choose('Database dump', 'Verified');
    choose('Original media', 'Missing');
    expect(result()).toHaveTextContent('A database dump alone is not a complete backup');
    expect(result()).toHaveTextContent(/not the photo or video bytes/i);

    choose('Database dump', 'Missing');
    choose('Original media', 'Verified');
    expect(result()).toHaveTextContent('Media only is not a restorable Immich backup');
    expect(result()).toHaveTextContent(/cannot reconstruct users, albums, asset metadata/i);
  });

  it('requires external-library evidence only when the installation uses it', () => {
    render(<BackupReadinessAnalyzer />);

    expect(screen.queryByRole('group', { name: 'External-library files and mounts' })).not.toBeInTheDocument();
    chooseExternalUse('Yes');
    expect(screen.getByRole('group', { name: 'External-library files and mounts' })).toBeInTheDocument();

    choose('External-library files and mounts', 'Missing');
    expect(result()).toHaveTextContent('External libraries is missing');
    expect(result()).toHaveTextContent(/incomplete for this installation/i);

    chooseExternalUse('Unknown');
    expect(screen.queryByRole('group', { name: 'External-library files and mounts' })).not.toBeInTheDocument();
    expect(result()).toHaveTextContent('External-library use is unknown');
    expect(result()).not.toHaveTextContent('Coverage recorded');
  });

  it('clears stale external-library evidence across yes → no → yes', () => {
    render(<BackupReadinessAnalyzer />);

    chooseExternalUse('Yes');
    choose('External-library files and mounts', 'Verified');
    expect(within(screen.getByRole('group', { name: 'External-library files and mounts' })).getByRole('radio', { name: 'Verified' })).toBeChecked();

    chooseExternalUse('No');
    expect(screen.queryByRole('group', { name: 'External-library files and mounts' })).not.toBeInTheDocument();
    chooseExternalUse('Yes');

    const externalEvidence = screen.getByRole('group', { name: 'External-library files and mounts' });
    within(externalEvidence).getAllByRole('radio').forEach((radio) => expect(radio).not.toBeChecked());
    expect(result()).toHaveTextContent('Evidence is still unrecorded');
    expect(result()).not.toHaveTextContent('Coverage recorded');
  });

  it('prioritizes configuration and independent-copy gaps after database and media are verified', () => {
    render(<BackupReadinessAnalyzer />);

    choose('Database dump', 'Verified');
    choose('Original media', 'Verified');
    choose('Mappings and configuration', 'Missing');
    choose('Independent copy', 'Missing');
    expect(result()).toHaveTextContent('Mappings and configuration is missing');
    expect(result()).not.toHaveTextContent('recoverability is not guaranteed');

    choose('Mappings and configuration', 'Verified');
    expect(result()).toHaveTextContent('Independent copy is missing');
    expect(result()).toHaveTextContent(/same storage or host failure/i);
    expect(result()).not.toHaveTextContent('Coverage recorded');
  });

  it('only reaches a cautious completion after all applicable evidence is verified', () => {
    render(<BackupReadinessAnalyzer />);

    choose('What are you preparing to do?', 'Prepare a backup');
    choose('Database dump', 'Verified');
    choose('Original media', 'Verified');
    chooseExternalUse('No');
    choose('Mappings and configuration', 'Verified');
    choose('Independent copy', 'Verified');
    choose('Isolated restore test', 'Verified');

    expect(result()).toHaveTextContent('Coverage recorded—recoverability is not guaranteed');
    expect(result()).toHaveTextContent(/stop immich-server.*database first and media second/i);
  });

  it('shows current restore routes with compatibility and production-isolation cautions', () => {
    render(<BackupReadinessAnalyzer />);

    choose('What are you preparing to do?', 'Restore or replace');

    const paths = screen.getByRole('complementary', { name: 'Current restore paths' });
    expect(paths).toHaveTextContent('Administration → Maintenance');
    expect(paths).toHaveTextContent('onboarding Restore from backup');
    expect(paths).toHaveTextContent(/pre-v2.5 backup/i);
    expect(paths).toHaveTextContent(/do not assume a downgrade will work/i);
  });

  it('renders substantive caution and controls during SSR', () => {
    const html = renderToStaticMarkup(<BackupReadinessAnalyzer />);

    expect(html).toContain('Backup Completeness &amp; Restore Readiness');
    expect(html).toContain('Nothing starts as verified');
    expect(html).toContain('Database dump');
    expect(html).toContain('Original media');
    expect(html).toContain('Evidence is still unrecorded');
    expect(html).not.toContain('checked=""');
  });
});

describe('backup analyzer article integration', () => {
  it('places the analyzer after the initial danger callout and before the existing backup-set section', () => {
    const document = getDocument('backup/immich-backup');
    expect(document).toBeDefined();

    render(<Markdown source={document!.body} />);
    const callout = screen.getByText('Restore replaces data').closest('.callout');
    const analyzer = screen.getByRole('region', { name: 'Backup Completeness & Restore Readiness' });
    const nextHeading = screen.getByRole('heading', { name: 'What belongs in the backup set' });

    expect(callout).not.toBeNull();
    expect(callout!.compareDocumentPosition(analyzer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(analyzer.compareDocumentPosition(nextHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'FAQ' })).toBeInTheDocument();
  });

  it('keeps every analyzer fragment tied to an actual generated article heading', () => {
    const document = getDocument('backup/immich-backup');
    expect(document).toBeDefined();
    const headingIds = new Set(articleHeadings(document!.body).map((heading) => heading.id));
    const componentSource = fs.readFileSync(path.join(process.cwd(), 'components/backup-readiness-analyzer.tsx'), 'utf8');
    const fragments = [...componentSource.matchAll(/(?:href:\s*'|href=")(#[-a-z0-9]+)(?:'|")/g)].map((match) => match[1]);

    expect(fragments.length).toBeGreaterThan(0);
    fragments.forEach((fragment) => expect(headingIds.has(fragment.slice(1)), fragment).toBe(true));
  });

  it('allow-lists only the standalone marker and uses it only in the target article', () => {
    const { rerender } = render(<Markdown source={'Before\n\n<BackupReadinessAnalyzer />\n\nAfter'} />);

    expect(screen.getByText('Before')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Backup Completeness & Restore Readiness' })).toBeInTheDocument();
    expect(screen.getByText('After')).toBeInTheDocument();

    rerender(<Markdown source={'<BackupReadinessAnalyzer /> with trailing text'} />);
    expect(screen.queryByRole('region', { name: 'Backup Completeness & Restore Readiness' })).not.toBeInTheDocument();
    expect(screen.getByText('<BackupReadinessAnalyzer /> with trailing text')).toBeInTheDocument();

    expect(getDocuments().filter((document) => document.body.includes('<BackupReadinessAnalyzer />')).map((document) => document.slug)).toEqual(['backup/immich-backup']);
  });
});
