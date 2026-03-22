import { ListAccountsTool } from "./Accounting/Accounts.js";
import { AuthenticateTool } from "./Authenticate.js";
import {
  CreateBankTransactionsTool,
  GetBankTransactionTool,
  ListBankTransactionsTool,
  UpdateBankTransactionTool,
} from "./Accounting/BankTransactions.js";
import { CreateContactsTool, ListContactsTool } from "./Accounting/Contacts.js";
import { IMcpServerTool } from "./IMcpServerTool.js";
import {
  GetInvoiceTool,
  ListInvoicesTool,
  UpdateInvoiceTool,
} from "./Accounting/Invoices.js";
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
    GetBankTransactionTool,
    GetInvoiceTool,
    ListAccountsTool,
    ListBankTransactionsTool,
    ListContactsTool,
    ListInvoicesTool,
    ListOrganisationsTool,
    ListPaymentsTool,
    ListQuotesTool,
    UpdateBankTransactionTool,
    UpdateInvoiceTool,
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
