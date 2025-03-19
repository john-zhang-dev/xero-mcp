import {
  CallToolRequestSchema,
  Result,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

type Request = z.infer<typeof CallToolRequestSchema>;

export interface IRequestMiddleware {
  (
    request: Request,
    next: (request: Request) => Promise<Result>
  ): Promise<Result>;
}
