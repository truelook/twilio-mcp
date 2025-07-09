import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { logger } from '@twilio-alpha/openapi-mcp-server';

import SegmentOpenAPIMCPServer from '@app/server';
import { args, type AccountCredentials } from '@app/utils';

export default async function main() {
  let credentials: AccountCredentials | null;
  const { services, apiToken, tags } = await args(process.argv);

  if (apiToken) {
    credentials = { apiToken };
  } else {
    logger.error('Error: Please provide API token.');
    process.exit(1);
  }

  const server = new SegmentOpenAPIMCPServer({
    server: {
      name: 'segment-server',
      version: '0.1.0',
    },
    filters: {
      services,
      tags,
    },
    credentials: {
      apiToken: credentials.apiToken,
    },
  });

  const transport = new StdioServerTransport();
  await server.start(transport);
  logger.info('Segment MCP Server running on stdio');
}
