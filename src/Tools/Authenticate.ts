import { XeroClientSession } from "../XeroApiClient.js";
import { IMcpServerTool } from "./IMcpServerTool.js";
import { z } from "zod";
import http from "http";
import open from "open";
import { Result } from "@modelcontextprotocol/sdk/types.js";

export const AuthenticateTool: IMcpServerTool = {
  requestSchema: {
    name: "authenticate",
    description: "Authenticate with Xero using OAuth2",
    inputSchema: { type: "object", properties: {} },
    output: { content: [{ type: "text", text: z.string() }] },
  },
  requestHandler: async () => {
    const consentUrl = await XeroClientSession.xeroClient.buildConsentUrl();
    const server = http.createServer();
    server.listen(process.env.PORT || 5000);
    const authTask = new Promise<Result>((resolve, reject) => {
      server.on("request", async (req) => {
        if (req.url && req.url.includes("/callback")) {
          try {
            const tokenSet = await XeroClientSession.xeroClient.apiCallback(
              req.url
            );
            XeroClientSession.xeroClient.setTokenSet(tokenSet);
            await XeroClientSession.xeroClient.updateTenants();
            XeroClientSession.setActiveTenantId(
              XeroClientSession.xeroClient.tenants[0].tenantId
            );

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
          }
        }
      });
    });

    open(consentUrl);
    return authTask;
  },
};
