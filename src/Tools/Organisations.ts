import { z } from "zod";
import { XeroClientSession } from "../XeroApiClient.js";
import { IMcpServerTool } from "./IMcpServerTool.js";

export const ListOrganisationsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_organisations",
    description: "List all organisations",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const tenantId = XeroClientSession.activeTenantId();
    if (!tenantId) {
      throw new Error("No tenant selected");
    }
    const response =
      await XeroClientSession.xeroClient.accountingApi.getOrganisations(
        tenantId
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
