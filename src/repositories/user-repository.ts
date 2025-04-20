import { UserEntity, UsersTable } from "@/models/user";
import { db } from "@/repositories/db";
import { RegisterRequest } from "@/types/requests/auth-request";
import { eq } from "drizzle-orm";

export async function addUser(request: RegisterRequest) {
  return await db
    .insert(UsersTable)
    .values({ email: request.email, password: request.password })
    .returning();
}

export async function getUserByEmail(email: string): Promise<UserEntity | null> {
  const user = await db.select().from(UsersTable).where(eq(UsersTable.email, email));
  return user[0] || null;
}
