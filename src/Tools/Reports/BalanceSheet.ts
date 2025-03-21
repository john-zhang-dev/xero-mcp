import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";

export const GetBalanceSheetTool: IMcpServerTool = {
  requestSchema: {
    name: "get_balance_sheet",
    description: "Returns a balance sheet for the end of the month of the specified date. It also returns the value at the end of the same month for the previous year.",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const response =
      await XeroClientSession.xeroClient.accountingApi.getReportBalanceSheet(
        XeroClientSession.activeTenantId()!!
      );
    const reports = response.body.reports || [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(reports),
        },
      ],
    };
  },
};
