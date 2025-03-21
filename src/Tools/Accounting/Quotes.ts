import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";

export const ListQuotesTool: IMcpServerTool = {
  requestSchema: {
    name: "list_quotes",
    description: "Retrieves sales quotes",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const response = await XeroClientSession.xeroClient.accountingApi.getQuotes(
      XeroClientSession.activeTenantId()!!
    );
    const quotes = response.body.quotes || [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(quotes),
        },
      ],
    };
  },
};
