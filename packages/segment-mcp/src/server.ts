import { join } from 'path';

import {
  ReadResourceRequest,
  ReadResourceResult,
} from '@modelcontextprotocol/sdk/types.js';
import {
  API,
  OpenAPIMCPServer,
  ToolFilters,
} from '@twilio-alpha/openapi-mcp-server';

import { Credentials } from '@app/types';
import loadAdditionalTools from '@app/tools';

type Configuration = {
  server: {
    name: string;
    version: string;
  };
  filters?: ToolFilters;
  credentials: Credentials;
  baseUrl?: string;
};

const ROOT_DIR = join(__dirname, '..');

export default class SegmentOpenAPIMCPServer extends OpenAPIMCPServer {
  private readonly baseUrl: string;

  constructor(config: Configuration) {
    super({
      server: {
        name: config.server.name,
        version: config.server.version,
        capabilities: {
          tools: {},
          prompts: {},
        },
        instructions: SegmentOpenAPIMCPServer.systemPrompt(),
      },
      openAPIDir: join(ROOT_DIR, 'segment-oai', 'spec'),
      filters: config.filters,
      authorization: {
        type: 'Bearer',
        token: config.credentials.apiToken,
      },
    });
    
    this.baseUrl = config.baseUrl || 'https://api.segmentapis.com';
  }

  /**
   * Sets the system prompt for the server
   * @returns
   */
  private static systemPrompt(): string {
    return `You are an agent to call Segment Public APIs. You have access to manage Segment Workspaces and resources including Sources, Destinations, Warehouses, Tracking Plans, and the Segment Destinations and Sources Catalogs.`;
  }

  /**
   * Override makeRequest to prepend base URL for relative paths
   * @param id
   * @param api
   * @param body
   * @protected
   */
  protected async makeRequest(
    id: string,
    api: API,
    body?: Record<string, unknown>,
  ) {
    // If the API path is relative, prepend the base URL
    const url = api.path.startsWith('http')
      ? api.path
      : `${this.baseUrl}${api.path.startsWith('/') ? '' : '/'}${api.path}`;

    const modifiedApi = {
      ...api,
      path: url,
    };

    return super.makeRequest(id, modifiedApi, body);
  }

  /**
   * Handles read resource requests
   * @param request
   * @returns
   */
  // eslint-disable-next-line class-methods-use-this
  protected async handleReadResource(
    request: ReadResourceRequest,
  ): Promise<ReadResourceResult> {
    const { name } = request.params;

    throw new Error(`Resource ${name} not found`);
  }

  /**
   * Loads resources for the server
   * @returns
   */
  protected async loadCapabilities(): Promise<void> {
    const additionalTools = loadAdditionalTools(this.configuration?.filters);
    for (const [id, { tool, api }] of additionalTools) {
      this.tools.set(id, tool);
      this.apis.set(id, api);
    }
  }
}
