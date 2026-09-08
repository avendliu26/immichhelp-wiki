import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
describe('responsive foundations', () => {
  it('includes mobile overflow protection and responsive shell rules', () => {
    const css = readFileSync('app/globals.css', 'utf8');
    expect(css).toContain('overflow-x: hidden');
    expect(css).toContain('.docs-shell');
    expect(css).toContain('@media');
  });
});
