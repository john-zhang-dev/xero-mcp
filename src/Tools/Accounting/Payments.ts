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
          description: "Filter payments by any element",
          example: 'Status=="AUTHORISED"',
        },
        order: {
          type: "string",
          description: "Order by any element",
          example: "Amount ASC",
        },
        page: {
          type: "integer",
          description: "Up to 100 payments will be returned in a single API call",
          example: 1,
        },
      },
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const where = request.params.arguments?.where as string | undefined;
    const order = request.params.arguments?.order as string | undefined;
    const page = request.params.arguments?.page as number | undefined;
    const response =
      await XeroClientSession.xeroClient.accountingApi.getPayments(
        XeroClientSession.activeTenantId()!!,
        undefined,
        where,
        order,
        page
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
