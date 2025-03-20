import { z } from "zod";
import { XeroClientSession } from "../XeroApiClient.js";
import { IMcpServerTool } from "./IMcpServerTool.js";

export const ListOrganisationsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_organisations",
    description: "Retrieves Xero organisation details",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const response =
      await XeroClientSession.xeroClient.accountingApi.getOrganisations(
        XeroClientSession.activeTenantId()!!
      );
    const organisations = response.body.organisations || [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(organisations),
        },
      ],
    };
  },
};
