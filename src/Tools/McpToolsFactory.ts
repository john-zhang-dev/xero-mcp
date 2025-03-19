import { ListAccountsTool } from "./Accounts.js";
import { AuthenticateTool } from "./Authenticate.js";
import { ListBankTransactionsTool } from "./BankTransactions.js";
import { ListContactsTool } from "./Contacts.js";
import { IMcpServerTool } from "./IMcpServerTool.js";
import { ListInvoicesTool } from "./Invoices.js";
import { ListJournalsTool } from "./Journals.js";
import { ListOrganisationsTool } from "./Organisations.js";
import { ListPaymentsTool } from "./Payments.js";
import { ListQuotesTool } from "./Quotes.js";

export const McpToolsFactory = (function () {
  const tools: IMcpServerTool[] = [
    AuthenticateTool,
    ListAccountsTool,
    ListBankTransactionsTool,
    ListContactsTool,
    ListInvoicesTool,
    ListJournalsTool,
    ListOrganisationsTool,
    ListPaymentsTool,
    ListQuotesTool,
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
