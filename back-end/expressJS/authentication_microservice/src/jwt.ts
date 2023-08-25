import crypto from "crypto";

// Change this to your actual secret key
const secretKey = "yourSecretKey";

type JwtHeader = {
  alg: string;
  typ: string;
};

type JwtPayload = {
  sub?: string; // (subject) = Entity to whom the token belongs, usually the user ID;
  iss?: string; // (issuer) = Token issuer;
  exp?: string; // (expiration) = Timestamp of when the token will expire;
  iat?: Date; // (issued at) = Timestamp of when the token was created;
  aud?: string; // (audience) = Token recipient, represents the application that will use it.
  name?: string;
  roles?: string;
  permissions?: string;
};

export function generateJwtToken(jwtPayload: JwtPayload): string {
  const jwtHeader: JwtHeader = { alg: "HS256", typ: "JWT" };

  const header = Buffer.from(JSON.stringify(jwtHeader)).toString("base64");

  const payload = Buffer.from(JSON.stringify(jwtPayload)).toString("base64");

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(header + "." + payload)
    .digest("base64");

  return header + "." + payload + "." + signature;
}
