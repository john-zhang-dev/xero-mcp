import { z } from "zod";
import { IMcpServerTool } from "./IMcpServerTool.js";
import { XeroClientSession } from "../XeroApiClient.js";

export const ListBankTransactionsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_bank_transactions",
    description: "List all bank transactions",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const response =
      await XeroClientSession.xeroClient.accountingApi.getBankTransactions(
        XeroClientSession.activeTenantId()!!
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
