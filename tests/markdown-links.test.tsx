import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Markdown } from '@/lib/markdown';

describe('Markdown links', () => {
  it('keeps parentheses in the label separate from the destination', () => {
    const html = renderToStaticMarkup(<Markdown source="[Cloudflare Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/)" />);
    expect(html).toContain('href="https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/"');
    expect(html).not.toContain('href="strict"');
  });
});
