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

const SUCCESS_HTML = `<!doctype html><html><head><meta charset="utf-8"><title>Xero MCP authenticated</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem;color:#111}</style>
</head><body><h1>Authenticated</h1><p>You can close this tab and return to Claude.</p></body></html>`;

const escapeHtml = (s: string) =>
  s.replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;",
  );

const ERROR_HTML = (msg: string) =>
  `<!doctype html><html><head><meta charset="utf-8"><title>Xero MCP error</title></head>
<body><h1>Authentication failed</h1><pre>${escapeHtml(msg)}</pre></body></html>`;

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
      server.on("request", async (req, res) => {
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
            XeroClientSession.persist();

            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(SUCCESS_HTML);

            resolve({
              content: [
                {
                  type: "text",
                  text: "Authenticated successfully",
                },
              ],
            });
          } catch (error: any) {
            try {
              res.writeHead(500, {
                "Content-Type": "text/html; charset=utf-8",
              });
              res.end(ERROR_HTML(error?.message ?? "unknown error"));
            } catch {
              // response may have been closed already
            }
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
            try {
              oauth2Process?.kill();
            } catch {
              // open() child may already be detached
            }
          }
        }
      });
    });

    return authTask;
  },
};
