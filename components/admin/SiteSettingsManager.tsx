"use client";

import { useState } from "react";

import { AdminSectionShell } from "@/components/admin/AdminSectionShell";
import { saveChatbotSettings, saveContactInfo } from "@/lib/data";
import type { ChatbotSettings } from "@/types/chatbot-settings";
import type { ContactInfo } from "@/types/contact-info";

interface SiteSettingsManagerProps {
  contactInfo: ContactInfo;
  chatbotSettings: ChatbotSettings;
  onRefresh: () => Promise<void>;
}

export function SiteSettingsManager({
  contactInfo,
  chatbotSettings,
  onRefresh
}: SiteSettingsManagerProps) {
  const [contactForm, setContactForm] = useState(contactInfo);
  const [chatbotForm, setChatbotForm] = useState(chatbotSettings);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleSave() {
    setBusy(true);
    setFeedback("");

    try {
      await Promise.all([
        saveContactInfo({
          ...contactForm,
          updatedAt: new Date().toISOString()
        }),
        saveChatbotSettings({
          ...chatbotForm,
          updatedAt: new Date().toISOString()
        })
      ]);
      setFeedback("Site settings saved.");
      await onRefresh();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to save site settings."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminSectionShell
      eyebrow="Site Settings"
      title="Contact details and chatbot defaults"
      description="These records support the contact page, footer, and unmatched chatbot responses."
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-ink">Contact info</h3>
          <input
            className="field"
            value={contactForm.hospitalName}
            onChange={(event) =>
              setContactForm((current) => ({
                ...current,
                hospitalName: event.target.value
              }))
            }
            placeholder="Hospital name"
          />
          <input
            className="field"
            value={contactForm.phone}
            onChange={(event) =>
              setContactForm((current) => ({ ...current, phone: event.target.value }))
            }
            placeholder="Phone"
          />
          <input
            className="field"
            value={contactForm.email}
            onChange={(event) =>
              setContactForm((current) => ({ ...current, email: event.target.value }))
            }
            placeholder="Email"
          />
          <textarea
            className="field min-h-[120px]"
            value={contactForm.address}
            onChange={(event) =>
              setContactForm((current) => ({ ...current, address: event.target.value }))
            }
            placeholder="Address"
          />
          <input
            className="field"
            value={contactForm.mapLink}
            onChange={(event) =>
              setContactForm((current) => ({ ...current, mapLink: event.target.value }))
            }
            placeholder="Map link"
          />
          <input
            className="field"
            value={contactForm.workingHours}
            onChange={(event) =>
              setContactForm((current) => ({
                ...current,
                workingHours: event.target.value
              }))
            }
            placeholder="Working hours"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-ink">Chatbot settings</h3>
          <input
            className="field"
            value={chatbotForm.name}
            onChange={(event) =>
              setChatbotForm((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="Chatbot name"
          />
          <textarea
            className="field min-h-[140px]"
            value={chatbotForm.fallbackMessage}
            onChange={(event) =>
              setChatbotForm((current) => ({
                ...current,
                fallbackMessage: event.target.value
              }))
            }
            placeholder="Fallback message"
          />
          <textarea
            className="field min-h-[140px]"
            value={chatbotForm.disclaimerMessage}
            onChange={(event) =>
              setChatbotForm((current) => ({
                ...current,
                disclaimerMessage: event.target.value
              }))
            }
            placeholder="Disclaimer message"
          />
          <label className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={chatbotForm.isActive}
              onChange={(event) =>
                setChatbotForm((current) => ({
                  ...current,
                  isActive: event.target.checked
                }))
              }
            />
            Chatbot active
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="button-primary" type="button" disabled={busy} onClick={handleSave}>
          {busy ? "Saving..." : "Save site settings"}
        </button>
      </div>

      {feedback ? (
        <div className="mt-4 rounded-3xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-slate">
          {feedback}
        </div>
      ) : null}
    </AdminSectionShell>
  );
}
