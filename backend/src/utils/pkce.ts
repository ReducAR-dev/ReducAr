import crypto from "node:crypto";

/** Genera un code_verifier aleatorio (43-128 chars, base64url). */
export function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString("base64url");
}

/** Deriva el code_challenge = base64url(sha256(verifier)). */
export function generateCodeChallenge(verifier: string): string {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

/** Genera un state aleatorio para asociar la request al callback. */
export function generateState(): string {
  return crypto.randomBytes(16).toString("base64url");
}