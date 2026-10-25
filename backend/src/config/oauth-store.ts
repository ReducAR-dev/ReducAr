import crypto from "node:crypto";

// --------------------------------------------
// PKCE: state -> code_verifier
// --------------------------------------------
interface PkceEntry {
  codeVerifier: string;
  provider: string;
  expiresAt: number;
}

const pkceStore = new Map<string, PkceEntry>();
const PKCE_TTL_MS = 10 * 60 * 1000; // 10 minutos

export function savePkce(
  state: string,
  codeVerifier: string,
  provider: string,
): void {
  pkceStore.set(state, {
    codeVerifier,
    provider,
    expiresAt: Date.now() + PKCE_TTL_MS,
  });
}

export function consumePkce(state: string): PkceEntry | null {
  const entry = pkceStore.get(state);
  if (!entry) return null;
  pkceStore.delete(state); // un solo uso
  if (entry.expiresAt < Date.now()) return null;
  return entry;
}

// --------------------------------------------
// Código de un solo uso: code -> tokens
// --------------------------------------------
export interface OAuthSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number | undefined;
  user: { id: string; email: string };
}

interface CodeEntry {
  session: OAuthSession;
  expiresAt: number;
}

const codeStore = new Map<string, CodeEntry>();
const CODE_TTL_MS = 2 * 60 * 1000; // 2 minutos

export function issueOAuthCode(session: OAuthSession): string {
  const code = crypto.randomUUID();
  codeStore.set(code, {
    session,
    expiresAt: Date.now() + CODE_TTL_MS,
  });
  return code;
}

export function consumeOAuthCode(code: string): OAuthSession | null {
  const entry = codeStore.get(code);
  if (!entry) return null;
  codeStore.delete(code); // un solo uso
  if (entry.expiresAt < Date.now()) return null;
  return entry.session;
}

// --------------------------------------------
// Limpieza periódica (cada minuto)
// --------------------------------------------
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of pkceStore) {
    if (entry.expiresAt < now) pkceStore.delete(key);
  }
  for (const [key, entry] of codeStore) {
    if (entry.expiresAt < now) codeStore.delete(key);
  }
}, 60_000).unref(); // unref: no mantiene el proceso vivo