import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";
import { Contacts } from "xero-node";
import { XeroAccountingApiSchema } from "../../Resources/xero_accounting.js";
import { parseArrayValues } from "../../Utils/parseArrayValues.js";
import { convertToCamelCase } from "../../Utils/convertToCamelCase.js";
import { sanitizeObject } from "../../Utils/sanitizeValues.js";

export const ListContactsTool: IMcpServerTool = {
  requestSchema: {
    name: "list_contacts",
    description: "Retrieves all contacts in a Xero organisation",
    inputSchema: {
      type: "object",
      properties: {
        where: {
          type: "string",
          description: "Filter by any element",
          example: 'ContactStatus=="ACTIVE"',
        },
        order: {
          type: "string",
          description: "Order by any element",
          example: "Name ASC",
        },
        page: {
          type: "integer",
          description: "Up to 100 contacts will be returned in a single API call",
          example: 1,
        },
        includeArchived: {
          type: "boolean",
          description:
            "Contacts with a status of ARCHIVED will be included in the response",
          example: true,
        },
        searchTerm: {
          type: "string",
          description:
            "Case-insensitive text search across Name, FirstName, LastName, ContactNumber and EmailAddress",
          example: "Joe Bloggs",
        },
      },
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const where = request.params.arguments?.where as string | undefined;
    const order = request.params.arguments?.order as string | undefined;
    const page = request.params.arguments?.page as number | undefined;
    const includeArchived = request.params.arguments?.includeArchived as
      | boolean
      | undefined;
    const searchTerm = request.params.arguments?.searchTerm as
      | string
      | undefined;
    const response =
      await XeroClientSession.xeroClient.accountingApi.getContacts(
        XeroClientSession.activeTenantId()!!,
        undefined,
        where,
        order,
        undefined,
        page,
        includeArchived,
        undefined,
        searchTerm
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

export const CreateContactsTool: IMcpServerTool = {
  requestSchema: {
    name: "create_contacts",
    description:
      "Creates one or multiple contacts in a Xero organisation. Only use this tool when user has directly and explicitly ask you to create contact.",
    inputSchema: {
      type: "object",
      description: "Contacts with an array of Contact objects to create",
      properties:
        XeroAccountingApiSchema.components.schemas.Contacts.properties,
      example: '{ contacts: [{ name: "John Doe" }]}',
    },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async (request) => {
    const rawInputData = request.params.arguments;
    const parsedData = parseArrayValues(rawInputData);
    const contacts: Contacts = convertToCamelCase(parsedData);
    const response =
      await XeroClientSession.xeroClient.accountingApi.createContacts(
        XeroClientSession.activeTenantId()!!,
        sanitizeObject(contacts)
      );
    return { content: [{ type: "text", text: JSON.stringify(response.body) }] };
  },
};
