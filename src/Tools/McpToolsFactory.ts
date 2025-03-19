import { ListAccountsTool } from "./Accounts.js";
import { AuthenticateTool } from "./Authenticate.js";
import { IMcpServerTool } from "./IMcpServerTool.js";
import { ListOrganisationsTool } from "./Organisations.js";

export const McpToolsFactory = (function () {
  const tools: IMcpServerTool[] = [
    AuthenticateTool,
    ListAccountsTool,
    ListOrganisationsTool,
    // register new tools here
  ];

  return {
    getAllTools: function () {
      return tools.slice();
    },
    findToolByName: function (name: string) {
      return tools.find((tool) => tool.requestSchema.name === name);
    },
  };
})();
