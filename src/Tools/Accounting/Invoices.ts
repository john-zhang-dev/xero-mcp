import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";
import { XeroAccountingApiSchema } from "../../Resources/xero_accounting.js";
import { parseArrayValues } from "../../Utils/parseArrayValues.js";
import { convertToCamelCase } from "../../Utils/convertToCamelCase.js";
import { sanitizeObject } from "../../Utils/sanitizeValues.js";

export const ListInvoicesTool: IMcpServerTool = {
  requestSchema: {
    name: "list_invoices",
    description: "Retrieves sales invoices or purchase bills",
    inputSchema: {
      type: "object",
      properties: {
        where: {
          type: "string",
          description: "Filter invoices. See example",
          example:
            "Date >= DateTime(2015, 01, 01) && Date < DateTime(2015, 12, 31), DueDate < DateTime(2015, 12, 31)",
        },
        searchTerm: {
          type: "string",
          description:
            "Search parameter that performs a case-insensitive text search across InvoiceNumber, Reference, ContactName",
        },
      },
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const whereClause = request.params.arguments
      ? (request.params.arguments.where as string)
      : undefined;
    const searchTerm = request.params.arguments?.searchTerm as
      | string
      | undefined;
    const response =
      await XeroClientSession.xeroClient.accountingApi.getInvoices(
        XeroClientSession.activeTenantId()!!,
        undefined, // ifModifiedSince
        whereClause,
        undefined, // order
        undefined, // iDs
        undefined, // invoiceNumbers
        undefined, // contactIDs
        undefined, // statuses
        undefined, // page
        undefined, // includeArchived
        undefined, // createdByMyApp
        undefined, // unitdp
        undefined, // summaryOnly
        undefined, // pageSize
        searchTerm
      );
    const invoices = response.body.invoices || [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(invoices),
        },
      ],
    };
  },
};

export const GetInvoiceTool: IMcpServerTool = {
  requestSchema: {
    name: "get_invoice",
    description:
      "Retrieves a single sales invoice or purchase bill by its Xero invoice ID",
    inputSchema: {
      type: "object",
      properties: {
        invoiceID: {
          type: "string",
          description: "Xero-generated unique identifier for the invoice (UUID)",
        },
        unitdp: {
          type: "number",
          description:
            "Optional. Unit decimal places (e.g. 4) for unit amounts on line items",
        },
      },
      required: ["invoiceID"],
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const invoiceID = request.params.arguments?.invoiceID as string;
    const unitdp = request.params.arguments?.unitdp as number | undefined;

    const response = await XeroClientSession.xeroClient.accountingApi.getInvoice(
      XeroClientSession.activeTenantId()!!,
      invoiceID,
      unitdp
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response.body.invoices ?? []),
        },
      ],
    };
  },
};

export const UpdateInvoiceTool: IMcpServerTool = {
  requestSchema: {
    name: "update_invoice",
    description:
      "Updates an existing sales invoice or purchase bill (typically a draft) to change fields like line items and account codes",
    inputSchema: {
      type: "object",
      properties: {
        invoiceID: {
          type: "string",
          description: "Xero generated unique identifier for the invoice (UUID)",
        },
        invoices: {
          type: "object",
          description:
            "Invoices payload containing an array of invoice objects",
          properties: XeroAccountingApiSchema.components.schemas.Invoices.properties,
          example:
            '{ invoices: [{ type: "ACCREC", contact: { contactId: "00000000-0000-0000-0000-000000000000" }, date: "2026-01-01", dueDate: "2026-01-15", lineItems: [{ description: "Service", quantity: 1, unitAmount: 100, accountCode: "400", tracking: [] }], reference: "Website Design", status: "DRAFT" }]}',
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
      required: ["invoiceID", "invoices"],
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const rawInputData = request.params.arguments;
    const parsedData = parseArrayValues(rawInputData);

    const invoiceID = parsedData?.invoiceID as string | undefined;
    const unitdp = parsedData?.unitdp as number | undefined;
    const idempotencyKey = parsedData?.idempotencyKey as string | undefined;

    const rawInvoicesPayload = parsedData?.invoices;
    const invoicesPayload = sanitizeObject(
      convertToCamelCase(rawInvoicesPayload)
    );

    if (!invoiceID) {
      // Should be prevented by request schema, but keep a hard guard.
      throw new Error("Missing required parameter: invoiceID");
    }

    const response = await XeroClientSession.xeroClient.accountingApi.updateInvoice(
      XeroClientSession.activeTenantId()!!,
      invoiceID,
      invoicesPayload,
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
