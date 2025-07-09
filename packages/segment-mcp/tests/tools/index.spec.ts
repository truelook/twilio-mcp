import { describe, expect, it } from 'vitest';

import loadAdditionalTools from '@app/tools';

describe('loadAdditionalTools', () => {
  it('should return empty map when no filters provided', () => {
    const result = loadAdditionalTools();
    expect(result.size).toBe(0);
  });

  it('should return empty map when filters provided', () => {
    const result = loadAdditionalTools({
      services: ['service1'],
      tags: ['tag1'],
    });
    expect(result.size).toBe(0);
  });

  it('should return a Map instance', () => {
    const result = loadAdditionalTools();
    expect(result).toBeInstanceOf(Map);
  });
});