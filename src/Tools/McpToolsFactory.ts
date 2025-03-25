import { ListAccountsTool } from "./Accounting/Accounts.js";
import { AuthenticateTool } from "./Authenticate.js";
import { CreateBankTransactionsTool, ListBankTransactionsTool } from "./Accounting/BankTransactions.js";
import { CreateContactsTool, ListContactsTool } from "./Accounting/Contacts.js";
import { IMcpServerTool } from "./IMcpServerTool.js";
import { ListInvoicesTool } from "./Accounting/Invoices.js";
import { ListJournalsTool } from "./Accounting/Journals.js";
import { ListOrganisationsTool } from "./Accounting/Organisations.js";
import { ListPaymentsTool } from "./Accounting/Payments.js";
import { ListQuotesTool } from "./Accounting/Quotes.js";
import { GetBalanceSheetTool } from "./Reports/BalanceSheet.js";

export const McpToolsFactory = (function () {
  const tools: IMcpServerTool[] = [
    AuthenticateTool,
    CreateBankTransactionsTool,
    CreateContactsTool,
    GetBalanceSheetTool,
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
