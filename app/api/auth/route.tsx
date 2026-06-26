import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().set("auth", "token123", { httpOnly: true });
  return NextResponse.json({ message: "Cookie Set" });
}
