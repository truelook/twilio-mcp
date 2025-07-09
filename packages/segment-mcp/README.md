# Segment MCP Server

A Model Context Protocol server that exposes all of Segment Public APIs, enabling AI models to manage Segment Workspaces and resources including Sources, Destinations, Warehouses, Tracking Plans, and the Segment Destinations and Sources Catalogs.

## Installation

```bash
npm install @twilio-alpha/segment-mcp
```

## Usage

### Basic Usage

```bash
segment-mcp-server --token <your-segment-api-token>
```

### With Service Filtering

```bash
segment-mcp-server --token <your-token> --services=workspaces,sources,destinations
```

### With Tag Filtering

```bash
segment-mcp-server --token <your-token> --tags=Analytics,Marketing
```

## Configuration

### Getting Your API Token

1. Navigate to your Segment workspace settings
2. Go to **Settings > Workspace settings > Access Management > Tokens**
3. Click **+ Create Token**
4. Select appropriate permissions (Workspace Owner or Workspace Member)
5. Copy the generated token

### Command Line Options

| Option | Alias | Description | Required |
|--------|-------|-------------|----------|
| `--token` | `-t` | Your Segment API token | Yes |
| `--services` | `-s` | Filter by specific services (comma-separated) | No |
| `--tags` | `-g` | Filter by specific tags (comma-separated) | No |

### Environment

The server uses the appropriate Segment API endpoint based on your workspace:
- **US Workspaces**: `https://api.segmentapis.com`
- **EU Workspaces**: `https://eu1.api.segmentapis.com`

## MCP Client Configuration

Add this to your MCP client configuration:

```json
{
  "mcpServers": {
    "segment": {
      "command": "segment-mcp-server",
      "args": ["--token", "your-segment-api-token"]
    }
  }
}
```

## Available APIs

This server provides access to all Segment Public APIs including:

- **Workspaces**: Manage workspace settings and configuration
- **Sources**: Create and manage data sources
- **Destinations**: Configure data destinations
- **Warehouses**: Manage data warehouses
- **Tracking Plans**: Define and manage tracking plans
- **Audiences**: Work with audience definitions
- **Computed Traits**: Manage computed traits
- **Transformations**: Handle data transformations

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run lint

# Start development server
npm start
```

## Security

- API tokens are scoped to your Segment workspace
- Workspace context is implicit in the token - no explicit workspace ID required
- All API calls use Bearer token authentication
- Tokens should be kept secure and rotated regularly

## License

MIT