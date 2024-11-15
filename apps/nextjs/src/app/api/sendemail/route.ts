// pages/api/send-email.js
import { NextRequest, NextResponse } from "next/server";
import { sendEmailVerification } from "@/app/lib/email";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  console.log(email, code);

  if (!email || !code) {
    return NextResponse.json(
      { error: "email and code required" },
      { status: 400 },
    );
  }

  try {
    const reponse = await sendEmailVerification(email, code);

    return NextResponse.json(reponse);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
