import { pbkdf2Sync } from "node:crypto";
import * as UserRepo from "@repositories/user-repository";

const saltKey = process.env.SALT_KEY || "salt-key";

function hashPassword(password: string) {
  return pbkdf2Sync(password, saltKey, 10000, 64, "sha512").toString("hex");
}

type RegisterRequest = {
  // name?: string;
  email: string;
  password: string;
};

export async function register(request: RegisterRequest) {
  return await UserRepo.addUser({
    ...request,
    password: hashPassword(request.password),
  });
}

type LoginRequest = {
  email: string;
  password: string;
};

export async function login(request: LoginRequest) {
  const user = await UserRepo.getUserByEmail(request.email);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.password !== hashPassword(request.password)) {
    throw new Error("Invalid password");
  }

  return user;
}
