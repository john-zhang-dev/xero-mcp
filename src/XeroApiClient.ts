import { XeroClient, TokenSet } from "xero-node";
import "dotenv/config";
import { Auditor } from "./Auditor.js";

const client_id = process.env.XERO_CLIENT_ID;
const client_secret = process.env.XERO_CLIENT_SECRET;
const redirectUrl = process.env.XERO_REDIRECT_URI;
const scopes =
  "offline_access openid profile accounting.settings accounting.contacts accounting.invoices accounting.banktransactions accounting.payments.read accounting.reports.balancesheet.read";

if (!client_id || !client_secret || !redirectUrl) {
  throw Error(
    "Environment Variables not all set - please check your .env file in the project root or create one!",
  );
}

type XeroClientConfig = {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  scopes: string[];
};

class XeroApiClient {
  xeroClient: XeroClient;
  private _activeTenantId: string | undefined;
  private _refreshTimer: ReturnType<typeof setTimeout> | undefined;
  private static readonly INACTIVITY_MS = 30 * 60 * 1000; // 30 minutes
  private static readonly REFRESH_BUFFER_S = 2 * 60; // 2 minutes

  constructor(config: XeroClientConfig) {
    this.xeroClient = new XeroClient({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUris: [config.redirectUrl],
      scopes: config.scopes,
    });
  }

  isAuthenticated() {
    return this.xeroClient.readTokenSet() ? true : false;
  }

  activeTenantId() {
    return this._activeTenantId;
  }

  setActiveTenantId(tenantId: string) {
    this._activeTenantId = tenantId;
  }

  scheduleTokenRefresh(tokenSet: TokenSet): void {
    if (this._refreshTimer) clearTimeout(this._refreshTimer);
    if (!tokenSet.expires_at) return;

    const now = Math.floor(Date.now() / 1000);
    if (tokenSet.expires_at <= now) return; // token already expired

    let delaySeconds = tokenSet.expires_at - now;
    if (delaySeconds > XeroApiClient.REFRESH_BUFFER_S) {
      delaySeconds -= XeroApiClient.REFRESH_BUFFER_S; // refresh a bit before expiry
    }

    this._refreshTimer = setTimeout(async () => {
      if (
        Date.now() - Auditor.lastRecordTime() >
        XeroApiClient.INACTIVITY_MS
      ) {
        console.error(
          `No tool calls in the last ${XeroApiClient.INACTIVITY_MS / 60000} minutes, stop token refresh`,
        );
        return;
      }

      console.error("Refreshing Xero token...");
      try {
        const newTokenSet = await this.xeroClient.refreshToken();
        this.xeroClient.setTokenSet(newTokenSet);
        console.error("Xero token refreshed successfully");
        this.scheduleTokenRefresh(newTokenSet);
      } catch (error) {
        console.error("Error refreshing Xero token: ", error);
      }
    }, delaySeconds * 1000);
  }
}

export const XeroClientSession = new XeroApiClient({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUrl: redirectUrl,
  scopes: scopes.split(" "),
});
