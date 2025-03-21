import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";

export const ListInvoicesTool: IMcpServerTool = {
  requestSchema: {
    name: "list_invoices",
    description: "Retrieves sales invoices or purchase bills",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const response =
      await XeroClientSession.xeroClient.accountingApi.getInvoices(
        XeroClientSession.activeTenantId()!!
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
