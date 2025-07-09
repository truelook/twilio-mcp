import { describe, expect, it } from 'vitest';

import SegmentOpenAPIMCPServer from '@app/server';

describe('SegmentOpenAPIMCPServer', () => {
  const mockConfig = {
    server: {
      name: 'test-server',
      version: '1.0.0',
    },
    credentials: {
      apiToken: 'test-token-1234567890',
    },
  };

  it('should create server instance', () => {
    const server = new SegmentOpenAPIMCPServer(mockConfig);
    expect(server).toBeDefined();
  });

  it('should have server property', () => {
    const server = new SegmentOpenAPIMCPServer(mockConfig);
    expect(server.server).toBeDefined();
  });

  it('should throw error for any resource request', async () => {
    const server = new SegmentOpenAPIMCPServer(mockConfig);

    const request = {
      params: {
        uri: 'text://unknown',
        name: 'Unknown Resource',
      },
    };

    await expect(server.handleReadResource(request)).rejects.toThrow(
      'Resource Unknown Resource not found',
    );
  });
});
