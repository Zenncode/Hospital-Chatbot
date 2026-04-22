import { NextResponse } from "next/server";

import { getChatbotReply } from "@/lib/chatbot";
import { demoChatbotSettings, demoFaqs, demoTriageRules } from "@/lib/demo-content";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { message?: string } | null;
  const message = body?.message?.trim();

  if (!message) {
    return NextResponse.json(
      { error: "A message is required." },
      { status: 400 }
    );
  }

  const response = getChatbotReply(message, {
    faqs: demoFaqs,
    triageRules: demoTriageRules,
    settings: demoChatbotSettings
  });

  return NextResponse.json(response);
}
