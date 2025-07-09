# Segment MCP Server

A Model Context Protocol server that exposes all of Segment Public APIs.

## Installation

```bash
npm install @twilio-alpha/segment-mcp
```

## Usage

```bash
segment-mcp-server --token <your-segment-api-token>
```

## Configuration

The server requires a Segment API token for authentication. You can obtain this from your Segment workspace settings.

### Required Parameters

- `--token`: Your Segment API token

### Optional Parameters

- `--services`: Filter by specific services (comma-separated)
- `--tags`: Filter by specific tags (comma-separated)

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Start development server
npm start
```

## License

MIT