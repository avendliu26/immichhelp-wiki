import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Markdown } from '@/lib/markdown';
import { getDocument, getPublishedDocuments } from '@/lib/content';
import { generateMetadata } from '../app/[...slug]/page';
import sitemap from '@/app/sitemap';

describe('Immich-Go migration guide', () => {
  it('publishes one canonical guide with a sitemap entry and real internal destinations', async () => {
    const doc = getDocument('guides/immich-go');
    expect(doc).toBeDefined();
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: ['guides', 'immich-go'] }) });
    expect(metadata.alternates?.canonical).toBe('/guides/immich-go');
    expect(sitemap().some((entry) => entry.url === 'https://immichhelp.wiki/guides/immich-go')).toBe(true);
    const routes = new Set(['/guides', '/setup', '/backup', ...getPublishedDocuments().map((item) => `/${item.slug}`)]);
    for (const match of doc!.body.matchAll(/\]\((\/[^)#\s]+)(?:#[^)]*)?\)/g)) {
      expect(routes.has(match[1]), match[1]).toBe(true);
    }
  });

  it('renders source-specific readiness steps and never treats ticks as a successful migration', () => {
    render(<Markdown source={'<MigrationReadiness />'} />);
    expect(screen.getByLabelText('Operating system')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Photo source'), { target: { value: 'folder' } });
    expect(screen.getByText(/Use from-folder/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Operating system'), { target: { value: 'windows' } });
    expect(screen.getByText(/PowerShell/)).toHaveTextContent('.\\immich-go.exe');
    for (const box of screen.getAllByRole('checkbox')) fireEvent.click(box);
    expect(screen.getByRole('status')).toHaveTextContent('Ready for a small trial');
    expect(screen.getByRole('status')).toHaveTextContent('does not verify your server or migration');
    fireEvent.change(screen.getByLabelText('Photo source'), { target: { value: 'google' } });
    expect(screen.getAllByRole('checkbox').some((box) => !(box as HTMLInputElement).checked)).toBe(true);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
