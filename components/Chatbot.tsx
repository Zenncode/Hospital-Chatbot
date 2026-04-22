"use client";

import { FormEvent, useEffect, useState } from "react";

import { getChatbotReply, type ChatbotKnowledgeBase } from "@/lib/chatbot";
import { getChatbotSettings, getFaqs, getTriageRules } from "@/lib/data";
import { demoChatbotSettings, demoFaqs, demoTriageRules, sampleQuestions } from "@/lib/demo-content";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  content: string;
  variant?: "default" | "triage";
}

function buildWelcomeMessage(settingsName: string): ChatMessage {
  return {
    id: "welcome-message",
    role: "bot",
    content: `${settingsName} uses fixed FAQ responses only. Ask about appointments, departments, visiting rules, hospital hours, or symptom safety guidance.`,
    variant: "default"
  };
}

export function Chatbot() {
  const [message, setMessage] = useState("");
  const [knowledgeBase, setKnowledgeBase] = useState<ChatbotKnowledgeBase>({
    faqs: demoFaqs,
    triageRules: demoTriageRules,
    settings: demoChatbotSettings
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    buildWelcomeMessage(demoChatbotSettings.name)
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFaqs(), getTriageRules(), getChatbotSettings()])
      .then(([faqs, triageRules, settings]) => {
        setKnowledgeBase({ faqs, triageRules, settings });
        setMessages([buildWelcomeMessage(settings.name)]);
      })
      .finally(() => setLoading(false));
  }, []);

  function askQuestion(question: string) {
    const trimmed = question.trim();

    if (!trimmed) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed
    };

    const response = getChatbotReply(trimmed, knowledgeBase);
    const botMessage: ChatMessage = {
      id: `bot-${Date.now()}`,
      role: "bot",
      content: response.answer,
      variant: response.type === "triage" ? "triage" : "default"
    };

    setMessages((current) => [...current, userMessage, botMessage]);
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askQuestion(message);
  }

  return (
    <div className="panel flex h-full flex-col overflow-hidden">
      <div className="border-b border-ink/10 px-5 py-4">
        <p className="eyebrow">Fixed FAQ Chatbot</p>
        <h3 className="mt-2 text-2xl font-semibold text-ink">
          Ask the hospital assistant
        </h3>
        <p className="mt-2 text-sm leading-7 text-slate">
          Replies come only from approved FAQ records and triage rules. No freeform
          AI responses are generated.
        </p>
      </div>

      <div className="space-y-4 px-5 py-5">
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question) => (
            <button
              key={question}
              type="button"
              className="rounded-full border border-ink/10 bg-white/70 px-3 py-2 text-xs font-semibold text-slate transition hover:border-teal/30 hover:text-teal"
              onClick={() => askQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>

        <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
          {messages.map((item) => (
            <div
              key={item.id}
              className={cn(
                "rounded-3xl px-4 py-3 text-sm leading-7",
                item.role === "user"
                  ? "ml-auto max-w-[90%] bg-ink text-white"
                  : item.variant === "triage"
                    ? "max-w-[95%] border border-accent/20 bg-accent/10 text-ink"
                    : "max-w-[95%] border border-ink/10 bg-white/80 text-ink"
              )}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>

      <form className="mt-auto border-t border-ink/10 p-5" onSubmit={handleSubmit}>
        <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="chat-input">
          Enter your question
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="chat-input"
            className="field"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Example: What are the visiting hours?"
          />
          <button className="button-primary shrink-0" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chatbot;
