import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { TokenSet } from "xero-node";

export type PersistedSession = {
  tokenSet: TokenSet;
  activeTenantId?: string;
};

const STORE_DIR = join(homedir(), ".xero-mcp");
const STORE_PATH = join(STORE_DIR, "tokens.enc");

function getKey(): string | undefined {
  const k = process.env.TOKEN_ENCRYPTION_KEY;
  return k && k.length > 0 ? k : undefined;
}

function deriveKey(passphrase: string, salt: Buffer): Buffer {
  return scryptSync(passphrase, salt, 32);
}

function encrypt(plaintext: string, passphrase: string): string {
  const salt = randomBytes(16);
  const key = deriveKey(passphrase, salt);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  let enc = cipher.update(plaintext, "utf8", "hex");
  enc += cipher.final("hex");
  const tag = cipher.getAuthTag();
  return [salt.toString("hex"), iv.toString("hex"), tag.toString("hex"), enc].join(":");
}

function decrypt(payload: string, passphrase: string): string {
  const [saltHex, ivHex, tagHex, enc] = payload.split(":");
  const salt = Buffer.from(saltHex, "hex");
  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const key = deriveKey(passphrase, salt);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  let out = decipher.update(enc, "hex", "utf8");
  out += decipher.final("utf8");
  return out;
}

export const TokenStore = {
  isEnabled(): boolean {
    return !!getKey();
  },

  save(session: PersistedSession): void {
    const key = getKey();
    if (!key) return;
    if (!existsSync(STORE_DIR)) {
      mkdirSync(STORE_DIR, { recursive: true, mode: 0o700 });
    }
    const payload = encrypt(JSON.stringify(session), key);
    writeFileSync(STORE_PATH, payload, { encoding: "utf-8", mode: 0o600 });
  },

  load(): PersistedSession | undefined {
    const key = getKey();
    if (!key) return undefined;
    if (!existsSync(STORE_PATH)) return undefined;
    try {
      const payload = readFileSync(STORE_PATH, "utf-8");
      const json = decrypt(payload, key);
      return JSON.parse(json) as PersistedSession;
    } catch (err) {
      console.error("TokenStore: failed to load persisted session:", (err as Error).message);
      return undefined;
    }
  },

  storePath(): string {
    return STORE_PATH;
  },
};
