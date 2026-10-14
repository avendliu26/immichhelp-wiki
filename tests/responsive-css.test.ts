import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
describe('responsive foundations', () => {
  it('keeps technical diagrams legible on small screens without shrinking labels', () => {
    const css = readFileSync('app/globals.css', 'utf8');
    expect(css).toContain('.doc-figure-viewport svg { width:420px; min-width:420px; max-width:none; }');
    expect(css).toContain('overflow-x:auto');
    expect(css).toContain('.doc-figure-hint { display:block');
  });

  it('includes mobile overflow protection and responsive shell rules', () => {
    const css = readFileSync('app/globals.css', 'utf8');
    expect(css).toContain('overflow-x: hidden');
    expect(css).toContain('.docs-shell');
    expect(css).toContain('@media');
  });
});
