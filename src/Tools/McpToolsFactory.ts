import { ListAccountsTool } from "./Accounts.js";
import { AuthenticateTool } from "./Authenticate.js";
import { ListBankTransactionsTool } from "./BankTransactions.js";
import { ListContactsTool } from "./Contacts.js";
import { IMcpServerTool } from "./IMcpServerTool.js";
import { ListOrganisationsTool } from "./Organisations.js";

export const McpToolsFactory = (function () {
  const tools: IMcpServerTool[] = [
    AuthenticateTool,
    ListAccountsTool,
    ListBankTransactionsTool,
    ListContactsTool,
    ListOrganisationsTool,
    // register new tools here alphabetically
  ];

  return {
    getAllTools: function () {
      return tools.slice();
    },
    findToolByName: function (name: string) {
      return tools.find((tool) => tool.requestSchema.name === name);
    },
  };
})();
