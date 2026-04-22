"use client";

import { useState } from "react";

import { AdminSectionShell } from "@/components/admin/AdminSectionShell";
import { deleteTriageRule, saveTriageRule } from "@/lib/data";
import { createId } from "@/lib/utils";
import type { TriageRule } from "@/types/triage-rule";

const emptyForm = {
  id: "",
  symptomKeyword: "",
  urgency: "low" as TriageRule["urgency"],
  guidance: "",
  emergencyFlag: false,
  disclaimer: "This chatbot does not provide diagnosis or prescriptions.",
  status: "active" as TriageRule["status"]
};

interface TriageRuleManagerProps {
  items: TriageRule[];
  onRefresh: () => Promise<void>;
}

export function TriageRuleManager({
  items,
  onRefresh
}: TriageRuleManagerProps) {
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");

  function editItem(item: TriageRule) {
    setForm({
      id: item.id,
      symptomKeyword: item.symptomKeyword,
      urgency: item.urgency,
      guidance: item.guidance,
      emergencyFlag: item.emergencyFlag,
      disclaimer: item.disclaimer,
      status: item.status
    });
    setFeedback("");
  }

  async function handleSave() {
    setBusy(true);
    setFeedback("");

    try {
      const now = new Date().toISOString();
      const existing = items.find((item) => item.id === form.id);
      const payload: TriageRule = {
        id: form.id || createId("triage"),
        symptomKeyword: form.symptomKeyword.trim(),
        urgency: form.urgency,
        guidance: form.guidance.trim(),
        emergencyFlag: form.emergencyFlag,
        disclaimer: form.disclaimer.trim(),
        status: form.status,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now
      };

      await saveTriageRule(payload);
      setForm(emptyForm);
      setFeedback("Triage rule saved.");
      await onRefresh();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to save triage rule."
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    setBusy(true);
    setFeedback("");

    try {
      await deleteTriageRule(id);
      if (form.id === id) {
        setForm(emptyForm);
      }
      setFeedback("Triage rule deleted.");
      await onRefresh();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to delete triage rule."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminSectionShell
      eyebrow="Triage Rules"
      title="Maintain safe symptom guidance"
      description="These records are checked before FAQ matching for symptom-related user input."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">
                Symptom keyword
              </label>
              <input
                className="field"
                value={form.symptomKeyword}
                onChange={(event) =>
                  setForm((current) => ({ ...current, symptomKeyword: event.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Urgency</label>
              <select
                className="field"
                value={form.urgency}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    urgency: event.target.value as TriageRule["urgency"]
                  }))
                }
              >
                <option value="low">low</option>
                <option value="moderate">moderate</option>
                <option value="emergency">emergency</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Guidance</label>
            <textarea
              className="field min-h-[140px]"
              value={form.guidance}
              onChange={(event) => setForm((current) => ({ ...current, guidance: event.target.value }))}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Disclaimer</label>
            <textarea
              className="field min-h-[100px]"
              value={form.disclaimer}
              onChange={(event) =>
                setForm((current) => ({ ...current, disclaimer: event.target.value }))
              }
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink">
              <input
                type="checkbox"
                checked={form.emergencyFlag}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    emergencyFlag: event.target.checked
                  }))
                }
              />
              Emergency escalation required
            </label>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Status</label>
              <select
                className="field"
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as TriageRule["status"]
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
              {busy ? "Saving..." : form.id ? "Update rule" : "Create rule"}
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
                  <p className="text-lg font-semibold text-ink">{item.symptomKeyword}</p>
                  <p className="mt-2 text-sm text-slate">{item.urgency}</p>
                </div>
                <span className="status-pill">{item.status}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate">{item.guidance}</p>
              <p className="mt-3 text-sm leading-7 text-slate">{item.disclaimer}</p>
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
