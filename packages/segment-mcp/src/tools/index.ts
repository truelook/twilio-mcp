import { Tool } from '@modelcontextprotocol/sdk/types';
import { API, ToolFilters } from '@twilio-alpha/openapi-mcp-server';

type Additional = {
  tool: Tool;
  api: API;
};

export default function loadAdditionalTools(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filters?: ToolFilters,
): Map<string, Additional> {
  const tools: Map<string, Additional> = new Map();

  // Currently no additional tools are needed for Segment Public API
  // All functionality is covered by OpenAPI-generated tools for CRUD operations
  // Future tools can be added here as needed

  return tools;
}
