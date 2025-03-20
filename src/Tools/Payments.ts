import { XeroClientSession } from "../XeroApiClient.js";
import { IMcpServerTool } from "./IMcpServerTool.js";
import { z } from "zod";

export const ListPaymentsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_payments",
    description: "Retrieves payments for invoices and credit notes",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const response =
      await XeroClientSession.xeroClient.accountingApi.getPayments(
        XeroClientSession.activeTenantId()!!
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
