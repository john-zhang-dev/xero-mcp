import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";

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
      },
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const whereClause = request.params.arguments
      ? (request.params.arguments.where as string)
      : undefined;
    const response =
      await XeroClientSession.xeroClient.accountingApi.getInvoices(
        XeroClientSession.activeTenantId()!!,
        undefined,
        whereClause
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
