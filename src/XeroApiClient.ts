import { XeroClient, TokenSet } from "xero-node";
import "dotenv/config";
import { Auditor } from "./Auditor.js";
import { TokenStore } from "./TokenStore.js";

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
    this.persist();
  }

  persist(): void {
    if (!TokenStore.isEnabled()) return;
    const tokenSet = this.xeroClient.readTokenSet();
    if (!tokenSet) return;
    TokenStore.save({
      tokenSet,
      activeTenantId: this._activeTenantId,
    });
  }

  async bootstrapFromDisk(): Promise<void> {
    if (!TokenStore.isEnabled()) return;
    const persisted = TokenStore.load();
    if (!persisted) return;

    try {
      this.xeroClient.setTokenSet(persisted.tokenSet);

      const now = Math.floor(Date.now() / 1000);
      const expired =
        !persisted.tokenSet.expires_at || persisted.tokenSet.expires_at <= now;

      let active = persisted.tokenSet;
      if (expired) {
        console.error("Persisted Xero access token expired, refreshing...");
        active = await this.xeroClient.refreshToken();
        this.xeroClient.setTokenSet(active);
      }

      await this.xeroClient.updateTenants();
      const wantedTenantId = persisted.activeTenantId;
      const match = wantedTenantId
        ? this.xeroClient.tenants.find((t: any) => t.tenantId === wantedTenantId)
        : undefined;
      this._activeTenantId =
        match?.tenantId ?? this.xeroClient.tenants[0]?.tenantId;

      this.scheduleTokenRefresh(active);
      this.persist();
      console.error(
        `Xero session restored from disk (tenant=${this._activeTenantId}).`,
      );
    } catch (err) {
      console.error(
        "Failed to restore Xero session from disk; re-auth required:",
        (err as Error).message,
      );
    }
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
        this.persist();
        console.error("Xero token refreshed successfully");
        this.scheduleTokenRefresh(newTokenSet);
      } catch (error) {
        console.error("Error refreshing Xero token: ", error);
      }
    }, delaySeconds * 1000).unref();
  }
}

export const XeroClientSession = new XeroApiClient({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUrl: redirectUrl,
  scopes: scopes.split(" "),
});
