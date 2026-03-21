import { z } from "zod";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { XeroClientSession } from "../../XeroApiClient.js";
import { XeroAccountingApiSchema } from "../../Resources/xero_accounting.js";
import { parseArrayValues } from "../../Utils/parseArrayValues.js";
import { convertToCamelCase } from "../../Utils/convertToCamelCase.js";
import { BankTransactions } from "xero-node";
import { sanitizeObject } from "../../Utils/sanitizeValues.js";

export const GetBankTransactionTool: IMcpServerTool = {
  requestSchema: {
    name: "get_bank_transaction",
    description:
      "Retrieves a single spent or received money transaction by its Xero bank transaction ID",
    inputSchema: {
      type: "object",
      properties: {
        bankTransactionID: {
          type: "string",
          description: "Xero-generated unique identifier for the bank transaction (UUID)",
        },
        unitdp: {
          type: "number",
          description:
            "Optional. Unit decimal places (e.g. 4) for unit amounts on line items",
        },
      },
      required: ["bankTransactionID"],
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const bankTransactionID = request.params.arguments
      ?.bankTransactionID as string;
    const unitdp = request.params.arguments?.unitdp as number | undefined;
    const response =
      await XeroClientSession.xeroClient.accountingApi.getBankTransaction(
        XeroClientSession.activeTenantId()!!,
        bankTransactionID,
        unitdp
      );
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.body.bankTransactions ?? []),
        },
      ],
    };
  },
};

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

export const UpdateBankTransactionTool: IMcpServerTool = {
  requestSchema: {
    name: "update_bank_transaction",
    description:
      "Updates an existing spent or received money transaction by its Xero bank transaction ID",
    inputSchema: {
      type: "object",
      properties: {
        bankTransactionID: {
          type: "string",
          description:
            "Xero generated unique identifier for the bank transaction (UUID)",
        },
        bankTransactions: {
          type: "object",
          description:
            "BankTransactions payload containing an array of bank transaction objects",
          properties:
            XeroAccountingApiSchema.components.schemas.BankTransactions.properties,
          example:
            '{ bankTransactions: [{ type: "SPEND", date: "2026-01-01", reference: "Expense Update", subTotal: 100, total: 115, totalTax: 15, lineItems: [{ accountCode: "401", description: "Taxi fare", lineAmount: 115 }], contact: { contactID: "00000000-0000-0000-0000-000000000000" }, bankAccount: { accountID: "6f7594f2-f059-4d56-9e67-47ac9733bfe9" }, status: "AUTHORISED" }]}',
        },
        unitdp: {
          type: "number",
          description:
            "Optional. Unit decimal places (e.g. 4) for unit amounts on line items",
        },
        idempotencyKey: {
          type: "string",
          description:
            "Optional idempotency key. Allows safe retries without duplicating processing",
        },
      },
      required: ["bankTransactionID", "bankTransactions"],
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const rawInputData = request.params.arguments;
    const parsedData = parseArrayValues(rawInputData);

    const bankTransactionID = parsedData?.bankTransactionID as string | undefined;
    const unitdp = parsedData?.unitdp as number | undefined;
    const idempotencyKey = parsedData?.idempotencyKey as string | undefined;

    const rawBankTransactionsPayload = parsedData?.bankTransactions;
    const bankTransactionsPayload: BankTransactions = sanitizeObject(
      convertToCamelCase(rawBankTransactionsPayload)
    );

    if (!bankTransactionID) {
      // Should be prevented by request schema, but keep a hard guard.
      throw new Error("Missing required parameter: bankTransactionID");
    }

    const response =
      await XeroClientSession.xeroClient.accountingApi.updateBankTransaction(
        XeroClientSession.activeTenantId()!!,
        bankTransactionID,
        bankTransactionsPayload,
        unitdp,
        idempotencyKey
      );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.body ?? response.response?.status),
        },
      ],
    };
  },
};
