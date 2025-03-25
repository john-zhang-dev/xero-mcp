import { XeroClientSession } from "../../XeroApiClient.js";
import { IMcpServerTool } from "../IMcpServerTool.js";
import { z } from "zod";
import { Contacts } from "xero-node";
import { XeroAccountingApiSchema } from "../../Schemas/xero_accounting.js";
import { parseArrayValues } from "../Utils/parseArrayValues.js";
import { convertToCamelCase } from "../Utils/convertToCamelCase.js";
import { sanitizeObject } from "../Utils/sanitizeValues.js";

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
    console.error("handling request to create contacts");
    const rawInputData = request.params.arguments;
    console.error("raw input data: ", rawInputData);
    const parsedData = parseArrayValues(rawInputData);
    const contacts: Contacts = sanitizeObject(convertToCamelCase(parsedData));
    console.error("request contacts object: ", contacts);
    const response =
      await XeroClientSession.xeroClient.accountingApi.createContacts(
        XeroClientSession.activeTenantId()!!,
        contacts
      );
    return { content: [{ type: "text", text: JSON.stringify(response.body) }] };
  },
};
