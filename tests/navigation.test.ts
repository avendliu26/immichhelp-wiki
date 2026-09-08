import { describe, expect, it } from 'vitest';
import { navigation } from '@/src/config/navigation';
describe('navigation config', () => {
  it('contains only groups with published entry points', () => {
    expect(navigation.map((group) => group.title)).toEqual(['Guides', 'Install & Setup', 'Platforms', 'Backup & Storage', 'Troubleshooting']);
    expect(navigation.every((group) => group.items.length > 0)).toBe(true);
    expect(navigation.flatMap((group) => group.items).some((item) => item.href.includes('compare') || item.href.includes('unraid'))).toBe(false);
  });
});
