import {
  CallToolRequest,
  CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";

export interface IRequestMiddleware {
  (
    request: CallToolRequest,
    next: (request: CallToolRequest) => Promise<CallToolResult>
  ): Promise<CallToolResult>;
}
