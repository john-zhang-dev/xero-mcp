import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpToolsFactory } from "./Tools/McpToolsFactory.js";
import { XeroAuthMiddleware } from "./Middlewares/XeroAuthMiddleware.js";
import { ErrorMiddleware } from "./Middlewares/ErrorMiddleware.js";

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
        },
      }
    );
  }

  async start(): Promise<void> {
    this.configureTools();
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
}
