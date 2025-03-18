import { Account } from "xero-node";
import { XeroClientSession } from "../XeroApiClient.js";
import { IMcpServerTool } from "./IMcpServerTool.js";
import { z } from "zod";

function formatAccountsResponse(accounts: Account[]): string {
  const results = [];
  results.push(`${accounts.length} accounts found:`);
  for (const account of accounts) {
    results.push(
      `- ${account.name} ${account.code || ""} ${account.status || ""} ${
        account.description || ""
      }`
    );
  }
  return results.join("\n");
}

export const ListAccountsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_accounts",
    description: "List all accounts",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const tenantId = XeroClientSession.activeTenantId();
    if (!tenantId) {
      throw new Error("No tenant selected");
    }
    const response =
      await XeroClientSession.xeroClient.accountingApi.getAccounts(tenantId);
    const accounts = response.body.accounts || [];
    return {
      content: [
        {
          type: "text",
          text: formatAccountsResponse(accounts),
        },
      ],
    };
  },
};
