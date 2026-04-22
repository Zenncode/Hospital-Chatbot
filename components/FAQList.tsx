"use client";

import { useEffect, useState } from "react";

import { getFaqs } from "@/lib/data";
import { demoFaqs } from "@/lib/demo-content";
import type { FAQ } from "@/types/faq";

interface FAQListProps {
  limit?: number;
  compact?: boolean;
}

export function FAQList({ limit, compact = false }: FAQListProps) {
  const [faqs, setFaqs] = useState<FAQ[]>(demoFaqs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFaqs()
      .then((items) => setFaqs(items))
      .finally(() => setLoading(false));
  }, []);

  const visibleFaqs = limit ? faqs.slice(0, limit) : faqs;
  const groupedFaqs = visibleFaqs.reduce<Record<string, FAQ[]>>((groups, faq) => {
    groups[faq.category] = [...(groups[faq.category] ?? []), faq];
    return groups;
  }, {});

  if (loading && faqs.length === 0) {
    return (
      <div className="panel px-6 py-8">
        <p className="text-sm text-slate">Loading FAQ entries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedFaqs).map(([category, items]) => (
        <section key={category} className="panel px-6 py-6 sm:px-7">
          {!compact ? <p className="eyebrow">{category}</p> : null}
          <div className="mt-4 space-y-4">
            {items.map((faq) => (
              <article
                key={faq.id}
                className="rounded-3xl border border-ink/10 bg-white/70 p-5"
              >
                <h3 className="text-lg font-semibold text-ink">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate">{faq.answer}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {faq.keywords.slice(0, compact ? 3 : faq.keywords.length).map((keyword) => (
                    <span
                      key={`${faq.id}-${keyword}`}
                      className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-teal"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default FAQList;
