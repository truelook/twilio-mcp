import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import parsedArgs from '@app/utils/args';

const originalExit = process.exit;

describe('parsedArgs', () => {
  const validApiToken = 'seg_1234567890abcdef';

  beforeEach(() => {
    process.exit = vi.fn() as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
    process.exit = originalExit;
  });

  it('should parse basic API token', async () => {
    const args = ['node', 'script.js', `--token=${validApiToken}`];

    const result = await parsedArgs(args);

    expect(result).toEqual({
      services: [],
      tags: [],
      apiToken: validApiToken,
    });
  });

  it('should parse API token using -t alias', async () => {
    const args = ['node', 'script.js', '-t', validApiToken];

    const result = await parsedArgs(args);

    expect(result.apiToken).toBe(validApiToken);
  });

  it('should parse services from command line arguments', async () => {
    const args = [
      'node',
      'script.js',
      `--token=${validApiToken}`,
      '--services=service1,service2',
    ];

    const result = await parsedArgs(args);

    expect(result).toEqual({
      services: ['service1', 'service2'],
      tags: [],
      apiToken: validApiToken,
    });
  });

  it('should parse services using the -s alias', async () => {
    const args = [
      'node',
      'script.js',
      `--token=${validApiToken}`,
      '-s',
      'service1,service2',
    ];

    const result = await parsedArgs(args);

    expect(result.services).toEqual(['service1', 'service2']);
  });

  it('should sanitize and parse tags', async () => {
    const args = [
      'node',
      'script.js',
      `--token=${validApiToken}`,
      '--tags=tag1, tag2,tag3, ,tag4',
    ];

    const result = await parsedArgs(args);

    expect(result.tags).toEqual(['tag1', 'tag2', 'tag3', 'tag4']);
  });

  it('should parse tags using the -g alias', async () => {
    const args = [
      'node',
      'script.js',
      `--token=${validApiToken}`,
      '-g',
      'tag1,tag2',
    ];

    const result = await parsedArgs(args);

    expect(result.tags).toEqual(['tag1', 'tag2']);
  });

  it('should call process.exit if token is missing', async () => {
    const args = ['node', 'script.js'];

    try {
      await parsedArgs(args);
    } catch (error) {
      /* no-ops */
    }

    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('should call process.exit if token is too short', async () => {
    const args = ['node', 'script.js', '--token=short'];

    try {
      await parsedArgs(args);
    } catch (error) {
      /* no-ops */
    }

    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it('should handle multiple aliases in one call', async () => {
    const args = [
      'node',
      'script.js',
      `-t=${validApiToken}`,
      '-g',
      'tag1,tag2',
      '-s',
      'service1',
    ];

    const result = await parsedArgs(args);

    expect(result).toEqual({
      services: ['service1'],
      tags: ['tag1', 'tag2'],
      apiToken: validApiToken,
    });
  });

  it('should ignore empty strings in tags list', async () => {
    const args = [
      'node',
      'script.js',
      `--token=${validApiToken}`,
      '--tags=,,tag1,,tag2,,',
    ];

    const result = await parsedArgs(args);

    expect(result.tags).toEqual(['tag1', 'tag2']);
  });

  it('should ignore empty strings in services list', async () => {
    const args = [
      'node',
      'script.js',
      `--token=${validApiToken}`,
      '--services=,,service1,,service2,,',
    ];

    const result = await parsedArgs(args);

    expect(result.services).toEqual(['service1', 'service2']);
  });
});
