import { UsersTable } from "@/models/user";
import { db } from "@/repositories/db";
import { RegisterRequest } from "@/types/requests/auth-request";

export async function addUser(request: RegisterRequest) {
  return await db
    .insert(UsersTable)
    .values({ username: request.username, password: request.password })
    .returning();
}
