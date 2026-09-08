import { describe, expect, it } from 'vitest';
import { navigation } from '@/src/config/navigation';
describe('navigation config', () => {
  it('contains the reusable documentation groups', () => {
    expect(navigation.map((group) => group.title)).toEqual(expect.arrayContaining(['Getting Started', 'Troubleshooting', 'Reference']));
  });
});
