import { z } from "zod";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { XeroClientSession } from "../../XeroApiClient.js";

export const ListBankTransactionsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_bank_transactions",
    description: "Retrieves any spent or received money transactions",
    inputSchema: {
      type: "object",
      properties: {
        where: {
          type: "string",
          description: "Filter bank transactions. See example",
          example:
            "Date >= DateTime(2015, 01, 01) && Date < DateTime(2015, 12, 31)",
        },
      },
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const whereClause = request.params.arguments
      ? (request.params.arguments.where as string)
      : undefined;
    const response =
      await XeroClientSession.xeroClient.accountingApi.getBankTransactions(
        XeroClientSession.activeTenantId()!!,
        undefined,
        whereClause
      );
    const bankTransactions = response.body.bankTransactions || [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(bankTransactions),
        },
      ],
    };
  },
};
