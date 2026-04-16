import crypto from "crypto";

export function verifyPkceS256(verifier: string, challenge: string): boolean {
  const hash = crypto.createHash("sha256").update(verifier).digest();
  const b64url = hash
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  if (b64url.length !== challenge.length) return false;
  return crypto.timingSafeEqual(Buffer.from(b64url), Buffer.from(challenge));
}
