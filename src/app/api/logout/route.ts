import { endUserSession } from "@/utils/auth-utils";
import { NextResponse } from "next/server";

export async function POST() {
  await endUserSession();
  return NextResponse.json({ message: "User logged out" });
}
