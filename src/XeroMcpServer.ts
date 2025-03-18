import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { getAccounts } from "./XeroApi/Account.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

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

  setupTools() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "list_accounts",
            description: "List all accounts",
            inputSchema: { type: "object", properties: {} },
            output: { content: [{ type: "text", text: z.string() }] },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name } = request.params;
      try {
        switch (name) {
          case "list_accounts":
            const accounts = (await getAccounts()).accounts || [];
            return {
              content: [
                {
                  type: "text",
                  text: `${accounts.length} accounts found\n${accounts.map(
                    (account) => `${account.name} (${account.code})`
                  )}`,
                },
              ],
            };
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
