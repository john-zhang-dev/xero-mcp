import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";

export const ListContactsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_contacts",
    description: "Retrieves all contacts in a Xero organisation",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const response =
      await XeroClientSession.xeroClient.accountingApi.getContacts(
        XeroClientSession.activeTenantId()!!
      );
    const contacts = response.body.contacts || [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(contacts),
        },
      ],
    };
  },
};
