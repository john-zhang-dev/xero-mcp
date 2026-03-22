import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourceTemplatesRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpToolsFactory } from "./Tools/McpToolsFactory.js";
import { XeroAuthMiddleware } from "./Middlewares/XeroAuthMiddleware.js";
import { ErrorMiddleware } from "./Middlewares/ErrorMiddleware.js";
import { XeroAccountingApiSchema } from "./Resources/xero_accounting.js";

const ACCOUNTING_OPENAPI_RESOURCE_URI = "xero-mcp://accounting/openapi.json";

export class XeroMcpServer {
  private mcpServer: Server;

  constructor() {
    this.mcpServer = new Server(
      {
        name: "Xero-MCP-Server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );
  }

  async start(): Promise<void> {
    this.configureTools();
    this.configureResources();
    const transport = new StdioServerTransport();
    await this.mcpServer.connect(transport);
    console.error("Xero MCP server running on stdio");
  }

  private configureTools() {
    this.mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: McpToolsFactory.getAllTools().map((tool) => tool.requestSchema),
      };
    });

    this.mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
      return await ErrorMiddleware(request, async (request) => {
        return await XeroAuthMiddleware(request, async (request) => {
          const { name } = request.params;
          const mcpTool = McpToolsFactory.findToolByName(name);
          if (mcpTool) {
            return await mcpTool.requestHandler(request);
          } else {
            return {
              content: [
                {
                  type: "text",
                  text: `Error: Tool not found: ${name}`,
                },
              ],
            };
          }
        });
      });
    });
  }

  private configureResources() {
    this.mcpServer.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: ACCOUNTING_OPENAPI_RESOURCE_URI,
          name: "Xero Accounting API (OpenAPI)",
          description:
            "OpenAPI 3.0 document for the Xero Accounting API (paths, operations, schemas). Use when you need request/response shapes or endpoint details beyond the bundled tools.",
          mimeType: "application/json",
        },
      ],
    }));

    this.mcpServer.setRequestHandler(
      ListResourceTemplatesRequestSchema,
      async () => ({ resourceTemplates: [] })
    );

    this.mcpServer.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      if (request.params.uri !== ACCOUNTING_OPENAPI_RESOURCE_URI) {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Resource not found: ${request.params.uri}`
        );
      }
      return {
        contents: [
          {
            uri: ACCOUNTING_OPENAPI_RESOURCE_URI,
            mimeType: "application/json",
            text: JSON.stringify(XeroAccountingApiSchema),
          },
        ],
      };
    });
  }
}
