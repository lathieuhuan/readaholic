import * as jose from "jose";
import { cookies } from "next/headers";

const secret = jose.base64url.decode(process.env.JWT_SECRET_KEY!);
const issuer = "urn:readaholic:issuer";
const audience = "urn:readaholic:audience";

export const encodeUserSession = async (userId: string) => {
  const jwt = await new jose.EncryptJWT({ user: userId })
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime("2h")
    .encrypt(secret);
  return jwt;
};

export const decodeUserSession = async (jwt: string) => {
  try {
    const { payload } = await jose.jwtDecrypt(jwt, secret, {
      issuer,
      audience,
    });
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setUserSession = async (userId: string) => {
  const jwt = await encodeUserSession(userId);
  const cookieStore = await cookies();

  cookieStore.set("session_id", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 60 * 60,
  });
};

export const getUserSession = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id");
  return sessionId ? await decodeUserSession(sessionId.value) : null;
};
