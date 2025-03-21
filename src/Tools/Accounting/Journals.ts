import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";

export const ListJournalsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_journals",
    description: "Retrieves journals",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const response =
      await XeroClientSession.xeroClient.accountingApi.getJournals(
        XeroClientSession.activeTenantId()!!
      );
    const journals = response.body.journals || [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(journals),
        },
      ],
    };
  },
};
