import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";

export const ListAccountsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_accounts",
    description: "Retrieves the full chart of accounts",
    inputSchema: {
      type: "object",
      properties: {
        where: {
          type: "string",
          description: "Filter by an any element",
          example: 'Status=="ACTIVE" AND Type=="BANK"',
        },
        order: {
          type: "string",
          description: "Order by any element",
          example: "Name ASC",
        },
      },
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const where = request.params.arguments?.where as string | undefined;
    const order = request.params.arguments?.order as string | undefined;
    const response =
      await XeroClientSession.xeroClient.accountingApi.getAccounts(
        XeroClientSession.activeTenantId()!!,
        undefined,
        where,
        order
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
