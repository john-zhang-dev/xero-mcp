import { Request, Result, Tool } from "@modelcontextprotocol/sdk/types.js";

export interface IMcpServerTool {
  requestSchema: Tool;
  requestHandler: (request: Request) => Promise<Result>;
}
