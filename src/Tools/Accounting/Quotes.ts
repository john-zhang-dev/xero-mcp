import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";

export const ListQuotesTool: IMcpServerTool = {
  requestSchema: {
    name: "list_quotes",
    description: "Retrieves sales quotes",
    inputSchema: {
      type: "object",
      properties: {
        dateFrom: {
          type: "string",
          description: "Filter for quotes after a particular date (YYYY-MM-DD)",
          example: "2019-10-31",
        },
        dateTo: {
          type: "string",
          description: "Filter for quotes before a particular date (YYYY-MM-DD)",
          example: "2019-10-31",
        },
        expiryDateFrom: {
          type: "string",
          description:
            "Filter for quotes expiring after a particular date (YYYY-MM-DD)",
          example: "2019-10-31",
        },
        expiryDateTo: {
          type: "string",
          description:
            "Filter for quotes expiring before a particular date (YYYY-MM-DD)",
          example: "2019-10-31",
        },
        contactID: {
          type: "string",
          description: "Filter for quotes belonging to a particular contact",
          example: "00000000-0000-0000-0000-000000000000",
        },
        status: {
          type: "string",
          description:
            "Filter for quotes of a particular status (DRAFT, SENT, DECLINED, ACCEPTED, INVOICED)",
          example: "DRAFT",
        },
        quoteNumber: {
          type: "string",
          description: "Filter by quote number",
          example: "QU-0001",
        },
        order: {
          type: "string",
          description: "Order by any element",
          example: "Status ASC",
        },
        page: {
          type: "integer",
          description: "Up to 100 quotes will be returned in a single API call",
          example: 1,
        },
      },
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const dateFrom = request.params.arguments?.dateFrom as string | undefined;
    const dateTo = request.params.arguments?.dateTo as string | undefined;
    const expiryDateFrom = request.params.arguments?.expiryDateFrom as
      | string
      | undefined;
    const expiryDateTo = request.params.arguments?.expiryDateTo as
      | string
      | undefined;
    const contactID = request.params.arguments?.contactID as string | undefined;
    const status = request.params.arguments?.status as string | undefined;
    const page = request.params.arguments?.page as number | undefined;
    const order = request.params.arguments?.order as string | undefined;
    const quoteNumber = request.params.arguments?.quoteNumber as
      | string
      | undefined;
    const response = await XeroClientSession.xeroClient.accountingApi.getQuotes(
      XeroClientSession.activeTenantId()!!,
      undefined,
      dateFrom,
      dateTo,
      expiryDateFrom,
      expiryDateTo,
      contactID,
      status,
      page,
      order,
      quoteNumber
    );
    const quotes = response.body.quotes || [];
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(quotes),
        },
      ],
    };
  },
};
