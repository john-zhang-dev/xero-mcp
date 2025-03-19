import {
  CallToolRequestSchema,
  Result,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

type Request = z.infer<typeof CallToolRequestSchema>;

export interface IMcpServerTool {
  requestSchema: Tool;
  requestHandler: (request: Request) => Promise<Result>;
}
