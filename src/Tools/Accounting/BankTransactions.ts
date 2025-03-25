import { z } from "zod";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { XeroClientSession } from "../../XeroApiClient.js";
import { XeroAccountingApiSchema } from "../../Resources/xero_accounting.js";
import { parseArrayValues } from "../Utils/parseArrayValues.js";
import { convertToCamelCase } from "../Utils/convertToCamelCase.js";
import { BankTransactions } from "xero-node";
import { sanitizeObject } from "../Utils/sanitizeValues.js";

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

export const CreateBankTransactionsTool: IMcpServerTool = {
  requestSchema: {
    name: "create_bank_transactions",
    description:
      "Creates one or more spent or received money transaction. Only use this tool when user has directly and explicitly ask you to create transactions.",
    inputSchema: {
      type: "object",
      description:
        "Transactions with an array of BankTransaction objects to create",
      properties:
        XeroAccountingApiSchema.components.schemas.BankTransactions.properties,
      example:
        '{ bankTransactions: [{ type: "SPEND", date: "2023-01-01", reference: "INV-001", subTotal: "100", total: "115", totalTax: "15", lineItems: [{ accountCode: "401", description: "taxi fare", lineAmount: "115" }], contact: { contactId: "00000000-0000-0000-0000-000000000000", name: "John Doe" }, "bankAccount": { "accountID": "6f7594f2-f059-4d56-9e67-47ac9733bfe9", "Code": "088", "Name": "Business Wells Fargo" } }]}',
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const rawInputData = request.params.arguments;
    const parsedData = parseArrayValues(rawInputData);
    const bankTransactions: BankTransactions = convertToCamelCase(parsedData);
    const response =
      await XeroClientSession.xeroClient.accountingApi.createBankTransactions(
        XeroClientSession.activeTenantId()!!,
        sanitizeObject(bankTransactions)
      );
    return { content: [{ type: "text", text: JSON.stringify(response.body) }] };
  },
};
