import { XeroClientSession } from "../XeroApiClient.js";
import { IMcpServerTool } from "./IMcpServerTool.js";
import http from "http";
import open from "open";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const REDIRECT_PORT =
  process.env.PORT ??
  (process.env.XERO_REDIRECT_URI
    ? new URL(process.env.XERO_REDIRECT_URI).port
    : undefined) ??
  5000;

export const AuthenticateTool: IMcpServerTool = {
  requestSchema: {
    name: "authenticate",
    description: "Authenticate with Xero using OAuth2",
    inputSchema: { type: "object", properties: {} },
  },
  requestHandler: async () => {
    const consentUrl = await XeroClientSession.xeroClient.buildConsentUrl();
    const server = http.createServer();
    server.listen(REDIRECT_PORT);
    const oauth2Process = await open(consentUrl);

    const authTask = new Promise<CallToolResult>((resolve, reject) => {
      server.on("request", async (req) => {
        if (req.url && req.url.includes("/callback")) {
          try {
            const tokenSet = await XeroClientSession.xeroClient.apiCallback(
              req.url,
            );
            XeroClientSession.xeroClient.setTokenSet(tokenSet);
            await XeroClientSession.xeroClient.updateTenants();
            XeroClientSession.setActiveTenantId(
              XeroClientSession.xeroClient.tenants[0].tenantId,
            );
            XeroClientSession.scheduleTokenRefresh(tokenSet);

            resolve({
              content: [
                {
                  type: "text",
                  text: "Authenticated successfully",
                },
              ],
            });
          } catch (error: any) {
            reject({
              content: [
                {
                  type: "text",
                  text: `Error authenticating user: ${error.message}`,
                },
              ],
            });
          } finally {
            server.close();
            oauth2Process.kill();
          }
        }
      });
    });

    return authTask;
  },
};
