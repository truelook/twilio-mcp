import { logger } from '@twilio-alpha/openapi-mcp-server';
import minimist from 'minimist';

interface ParsedArgs {
  services: string[];
  tags: string[];
  apiToken?: string;
  baseUrl?: string;
}

const sanitizeArgs = (args: string): string[] => {
  return args
    ? args
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)
    : [];
};

const parsedArgs = async (argv: string[]): Promise<ParsedArgs> => {
  const parsed = minimist(argv, {
    alias: {
      t: 'token',
      s: 'services',
      g: 'tags',
      u: 'baseUrl',
    },
    string: ['token', 'services', 'tags', 'baseUrl'],
  });

  const { services: sArgs, token: apiToken, tags: tArgs, baseUrl } = parsed;

  if (!apiToken) {
    logger.error('Error: API token is required. Use --token or -t flag.');
    process.exit(1);
  }

  // Basic validation - Segment API tokens are typically long strings
  if (typeof apiToken !== 'string' || apiToken.length < 10) {
    logger.error('Error: Invalid API token format.');
    process.exit(1);
  }

  const services = sanitizeArgs(sArgs);
  const tags = sanitizeArgs(tArgs);

  return {
    services,
    tags,
    apiToken,
    baseUrl,
  };
};

export default parsedArgs;
export type { ParsedArgs };
export type AccountCredentials = {
  apiToken: string;
};
