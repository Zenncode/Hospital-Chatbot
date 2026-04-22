import type { ChatbotSettings } from "@/types/chatbot-settings";
import type { FAQ } from "@/types/faq";
import type { TriageRule } from "@/types/triage-rule";

export interface ChatbotKnowledgeBase {
  faqs: FAQ[];
  triageRules: TriageRule[];
  settings: ChatbotSettings;
}

export interface ChatbotResponse {
  answer: string;
  type: "faq" | "triage" | "fallback";
  matchedId?: string;
  urgency?: TriageRule["urgency"];
  emergencyFlag?: boolean;
}

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "do",
  "for",
  "how",
  "i",
  "if",
  "in",
  "is",
  "me",
  "my",
  "of",
  "or",
  "the",
  "to",
  "what",
  "where",
  "who"
]);

export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token && !STOP_WORDS.has(token));
}

function getKeywordScore(message: string, keywords: string[]) {
  return keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalizeText(keyword);

    if (!normalizedKeyword) {
      return score;
    }

    if (message.includes(normalizedKeyword)) {
      return score + Math.max(12, normalizedKeyword.split(" ").length * 10);
    }

    return score;
  }, 0);
}

function getQuestionTokenScore(messageTokens: string[], question: string) {
  const questionTokens = tokenize(question);
  return questionTokens.reduce((score, token) => {
    return messageTokens.includes(token) ? score + 4 : score;
  }, 0);
}

function getBestTriageMatch(
  normalizedMessage: string,
  triageRules: TriageRule[]
) {
  const activeRules = triageRules.filter((rule) => rule.status === "active");

  return activeRules
    .map((rule) => {
      const keyword = normalizeText(rule.symptomKeyword);
      const keywordWords = keyword.split(" ");
      const urgencyWeight =
        rule.urgency === "emergency" ? 30 : rule.urgency === "moderate" ? 20 : 10;

      return {
        rule,
        score: normalizedMessage.includes(keyword)
          ? keywordWords.length * 15 + urgencyWeight
          : 0
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)[0];
}

function getBestFaqMatch(normalizedMessage: string, faqs: FAQ[]) {
  const messageTokens = tokenize(normalizedMessage);
  const activeFaqs = faqs.filter((faq) => faq.status === "active");

  return activeFaqs
    .map((faq) => {
      const normalizedQuestion = normalizeText(faq.question);
      let score = 0;

      if (normalizedMessage === normalizedQuestion) {
        score += 100;
      }

      if (
        normalizedQuestion.includes(normalizedMessage) ||
        normalizedMessage.includes(normalizedQuestion)
      ) {
        score += 35;
      }

      score += getKeywordScore(normalizedMessage, faq.keywords);
      score += getQuestionTokenScore(messageTokens, faq.question);

      if (normalizedMessage.includes(normalizeText(faq.category))) {
        score += 8;
      }

      score -= faq.priority;

      return { faq, score };
    })
    .sort((left, right) => right.score - left.score)[0];
}

function buildTriageAnswer(rule: TriageRule, settings: ChatbotSettings) {
  const parts: string[] = [];

  if (rule.emergencyFlag) {
    parts.push(
      "Emergency warning: Please go to the emergency department or contact local emergency services immediately."
    );
  }

  parts.push(rule.guidance);
  parts.push(rule.disclaimer || settings.disclaimerMessage);

  return parts.join(" ");
}

export function getChatbotReply(
  message: string,
  knowledgeBase: ChatbotKnowledgeBase
): ChatbotResponse {
  const normalizedMessage = normalizeText(message);

  if (!normalizedMessage) {
    return {
      answer: "Please enter a hospital-related question so I can return a fixed answer.",
      type: "fallback"
    };
  }

  const triageMatch = getBestTriageMatch(
    normalizedMessage,
    knowledgeBase.triageRules
  );

  if (triageMatch) {
    return {
      answer: buildTriageAnswer(triageMatch.rule, knowledgeBase.settings),
      type: "triage",
      matchedId: triageMatch.rule.id,
      urgency: triageMatch.rule.urgency,
      emergencyFlag: triageMatch.rule.emergencyFlag
    };
  }

  const faqMatch = getBestFaqMatch(normalizedMessage, knowledgeBase.faqs);

  if (faqMatch && faqMatch.score >= 20) {
    return {
      answer: faqMatch.faq.answer,
      type: "faq",
      matchedId: faqMatch.faq.id
    };
  }

  return {
    answer: knowledgeBase.settings.fallbackMessage,
    type: "fallback"
  };
}
