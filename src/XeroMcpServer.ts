import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListAccountsTool } from "./Tools/ListAccounts.js";
import { AuthenticateTool } from "./Tools/Authenticate.js";
import { XeroClientSession } from "./XeroApiClient.js";

export class XeroMcpServer {
  private server: Server;

  constructor() {
    this.server = new Server(
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
    this.setupTools();
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Xero MCP server running on stdio");
  }

  private setupTools() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [AuthenticateTool.requestSchema, ListAccountsTool.requestSchema],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name } = request.params;
      try {
        if (name === AuthenticateTool.requestSchema.name) {
          return await AuthenticateTool.requestHandler(request);
        } else if (!XeroClientSession.isAuthenticated()) {
          return {
            content: [
              {
                type: "text",
                text: "You must authenticate with Xero first",
              },
            ],
          };
        }
        switch (name) {
          case ListAccountsTool.requestSchema.name:
            return await ListAccountsTool.requestHandler(request);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });
  }
}
