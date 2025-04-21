import { eq } from "drizzle-orm";
import { db } from "@/db";
import { UsersTable, type UserEntity } from "@/db/user";

export type AddUserParams = Pick<UserEntity, "email" | "password">;

export async function addUser(params: AddUserParams) {
  return await db
    .insert(UsersTable)
    .values({ email: params.email, password: params.password })
    .returning();
}

export async function getUserByEmail(email: string): Promise<UserEntity | null> {
  const user = await db.select().from(UsersTable).where(eq(UsersTable.email, email));
  return user[0] || null;
}
