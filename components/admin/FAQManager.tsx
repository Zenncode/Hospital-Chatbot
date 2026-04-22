"use client";

import { useState } from "react";

import { AdminSectionShell } from "@/components/admin/AdminSectionShell";
import { deleteFaq, saveFaq } from "@/lib/data";
import { createId } from "@/lib/utils";
import type { FAQ, FAQCategory } from "@/types/faq";

const categories: FAQCategory[] = [
  "General Information",
  "Appointments",
  "Departments",
  "Visitors",
  "Emergency",
  "Billing and Insurance",
  "Laboratory",
  "Pharmacy",
  "Contact and Location",
  "Symptom Guidance"
];

const emptyForm = {
  id: "",
  question: "",
  answer: "",
  category: "General Information" as FAQCategory,
  keywords: "",
  status: "active" as FAQ["status"],
  priority: 1
};

interface FAQManagerProps {
  items: FAQ[];
  onRefresh: () => Promise<void>;
}

export function FAQManager({ items, onRefresh }: FAQManagerProps) {
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");

  function editItem(item: FAQ) {
    setForm({
      id: item.id,
      question: item.question,
      answer: item.answer,
      category: item.category,
      keywords: item.keywords.join(", "),
      status: item.status,
      priority: item.priority
    });
    setFeedback("");
  }

  async function handleSave() {
    setBusy(true);
    setFeedback("");

    try {
      const now = new Date().toISOString();
      const existing = items.find((item) => item.id === form.id);
      const payload: FAQ = {
        id: form.id || createId("faq"),
        question: form.question.trim(),
        answer: form.answer.trim(),
        category: form.category,
        keywords: form.keywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean),
        status: form.status,
        priority: Number(form.priority),
        createdAt: existing?.createdAt ?? now,
        updatedAt: now
      };

      await saveFaq(payload);
      setForm(emptyForm);
      setFeedback("FAQ saved.");
      await onRefresh();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to save FAQ.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    setBusy(true);
    setFeedback("");

    try {
      await deleteFaq(id);
      if (form.id === id) {
        setForm(emptyForm);
      }
      setFeedback("FAQ deleted.");
      await onRefresh();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to delete FAQ.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminSectionShell
      eyebrow="FAQ Management"
      title="Manage approved chatbot answers"
      description="Create or edit the exact fixed answers the chatbot is allowed to return."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Question</label>
            <input
              className="field"
              value={form.question}
              onChange={(event) => setForm((current) => ({ ...current, question: event.target.value }))}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Answer</label>
            <textarea
              className="field min-h-[150px]"
              value={form.answer}
              onChange={(event) => setForm((current) => ({ ...current, answer: event.target.value }))}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Category</label>
              <select
                className="field"
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    category: event.target.value as FAQCategory
                  }))
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Priority</label>
              <input
                className="field"
                type="number"
                min={1}
                value={form.priority}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    priority: Number(event.target.value)
                  }))
                }
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">
                Keywords
              </label>
              <input
                className="field"
                value={form.keywords}
                onChange={(event) => setForm((current) => ({ ...current, keywords: event.target.value }))}
                placeholder="appointment, book, schedule"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Status</label>
              <select
                className="field"
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as FAQ["status"]
                  }))
                }
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="button-primary" type="button" disabled={busy} onClick={handleSave}>
              {busy ? "Saving..." : form.id ? "Update FAQ" : "Create FAQ"}
            </button>
            <button
              className="button-secondary"
              type="button"
              onClick={() => setForm(emptyForm)}
            >
              Clear form
            </button>
          </div>
          {feedback ? (
            <div className="rounded-3xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-slate">
              {feedback}
            </div>
          ) : null}
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-3xl border border-ink/10 bg-white/70 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-ink">{item.question}</p>
                  <p className="mt-2 text-sm text-slate">{item.category}</p>
                </div>
                <span className="status-pill">{item.status}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate">{item.answer}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.keywords.map((keyword) => (
                  <span
                    key={`${item.id}-${keyword}`}
                    className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-teal"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="button-secondary" type="button" onClick={() => editItem(item)}>
                  Edit
                </button>
                <button
                  className="button-secondary"
                  type="button"
                  disabled={busy}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AdminSectionShell>
  );
}
