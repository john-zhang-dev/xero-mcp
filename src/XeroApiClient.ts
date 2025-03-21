import { XeroClient } from "xero-node";
import "dotenv/config";

const client_id = process.env.XERO_CLIENT_ID;
const client_secret = process.env.XERO_CLIENT_SECRET;
const redirectUrl = process.env.XERO_REDIRECT_URI;
const scopes =
  "offline_access openid profile accounting.transactions.read accounting.contacts.read accounting.journals.read accounting.reports.read";

if (!client_id || !client_secret || !redirectUrl) {
  throw Error(
    "Environment Variables not all set - please check your .env file in the project root or create one!"
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
}

export const XeroClientSession = new XeroApiClient({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUrl: redirectUrl,
  scopes: scopes.split(" "),
});
