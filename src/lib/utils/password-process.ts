import { pbkdf2Sync } from "node:crypto";

const saltKey = process.env.SALT_KEY || "salt-key";

export function hashPassword(password: string) {
  return pbkdf2Sync(password, saltKey, 10000, 64, "sha512").toString("hex");
}

export function verifyPassword(password: string, correctHash: string) {
  const hash = hashPassword(password);
  return hash === correctHash;
}
