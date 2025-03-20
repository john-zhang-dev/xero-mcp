import { XeroClientSession } from "../XeroApiClient.js";
import { IMcpServerTool } from "./IMcpServerTool.js";
import { z } from "zod";

export const ListAccountsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_accounts",
    description: "Retrieves the full chart of accounts",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const response =
      await XeroClientSession.xeroClient.accountingApi.getAccounts(
        XeroClientSession.activeTenantId()!!
      );
    const accounts = response.body.accounts || [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(accounts),
        },
      ],
    };
  },
};
