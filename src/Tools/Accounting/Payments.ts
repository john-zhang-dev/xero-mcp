import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";

export const ListPaymentsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_payments",
    description: "Retrieves payments for invoices and credit notes",
    inputSchema: {
      type: "object",
      properties: {
        where: {
          type: "string",
          description: "Filter payments. See example",
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
      await XeroClientSession.xeroClient.accountingApi.getPayments(
        XeroClientSession.activeTenantId()!!,
        undefined,
        whereClause
      );
    const payments = response.body.payments || [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(payments),
        },
      ],
    };
  },
};
