import {
  CallToolRequest,
  CallToolResult,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

export interface IMcpServerTool {
  requestSchema: Tool;
  requestHandler: (request: CallToolRequest) => Promise<CallToolResult>;
}
