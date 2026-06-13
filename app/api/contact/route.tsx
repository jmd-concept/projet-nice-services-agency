import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("Message reçu :", data);

  return NextResponse.json({
    success: true,
    message: "Message envoyé avec succès",
  });
}
