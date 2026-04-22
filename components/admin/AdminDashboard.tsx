"use client";

import { useEffect, useState } from "react";

import { AppointmentManager } from "@/components/admin/AppointmentManager";
import { DepartmentManager } from "@/components/admin/DepartmentManager";
import { FAQManager } from "@/components/admin/FAQManager";
import { SiteSettingsManager } from "@/components/admin/SiteSettingsManager";
import { TriageRuleManager } from "@/components/admin/TriageRuleManager";
import { UserManager } from "@/components/admin/UserManager";
import { demoChatbotSettings, demoContactInfo } from "@/lib/demo-content";
import {
  getAppointments,
  getChatbotSettings,
  getContactInfo,
  getDepartments,
  getFaqs,
  getTriageRules,
  getUsers
} from "@/lib/data";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Appointment } from "@/types/appointment";
import type { AppUser } from "@/types/user";
import type { ChatbotSettings } from "@/types/chatbot-settings";
import type { ContactInfo } from "@/types/contact-info";
import type { Department } from "@/types/department";
import type { FAQ } from "@/types/faq";
import type { TriageRule } from "@/types/triage-rule";

type AdminTab =
  | "overview"
  | "faqs"
  | "departments"
  | "triage"
  | "appointments"
  | "users"
  | "settings";

const tabs: { id: AdminTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "faqs", label: "FAQs" },
  { id: "departments", label: "Departments" },
  { id: "triage", label: "Triage Rules" },
  { id: "appointments", label: "Appointments" },
  { id: "users", label: "Users" },
  { id: "settings", label: "Site Settings" }
];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [triageRules, setTriageRules] = useState<TriageRule[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(demoContactInfo);
  const [chatbotSettings, setChatbotSettings] =
    useState<ChatbotSettings>(demoChatbotSettings);

  async function refreshData() {
    setLoading(true);

    try {
      const [
        nextFaqs,
        nextDepartments,
        nextTriageRules,
        nextAppointments,
        nextUsers,
        nextContactInfo,
        nextChatbotSettings
      ] = await Promise.all([
        getFaqs(true),
        getDepartments(true),
        getTriageRules(true),
        getAppointments(),
        getUsers(),
        getContactInfo(),
        getChatbotSettings()
      ]);

      setFaqs(nextFaqs);
      setDepartments(nextDepartments);
      setTriageRules(nextTriageRules);
      setAppointments(nextAppointments);
      setUsers(nextUsers);
      setContactInfo(nextContactInfo);
      setChatbotSettings(nextChatbotSettings);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="space-y-8">
      <section className="panel px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
              Manage hospital content and records
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate">
              The dashboard updates Firestore collections directly. Public pages and
              the chatbot reuse the same content sources.
            </p>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-white/70 px-5 py-4 text-sm text-slate">
            <p>
              <span className="font-semibold text-ink">Firebase:</span>{" "}
              {isFirebaseConfigured ? "configured" : "not configured"}
            </p>
            <p>
              <span className="font-semibold text-ink">FAQ records:</span> {faqs.length}
            </p>
            <p>
              <span className="font-semibold text-ink">Departments:</span>{" "}
              {departments.length}
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={activeTab === tab.id ? "button-primary" : "button-secondary"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="panel px-6 py-8">
          <p className="text-sm text-slate">Loading dashboard data...</p>
        </div>
      ) : null}

      {!loading && activeTab === "overview" ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="panel px-6 py-6">
            <p className="eyebrow">FAQs</p>
            <p className="mt-3 text-4xl font-semibold text-ink">{faqs.length}</p>
          </article>
          <article className="panel px-6 py-6">
            <p className="eyebrow">Departments</p>
            <p className="mt-3 text-4xl font-semibold text-ink">{departments.length}</p>
          </article>
          <article className="panel px-6 py-6">
            <p className="eyebrow">Appointments</p>
            <p className="mt-3 text-4xl font-semibold text-ink">{appointments.length}</p>
          </article>
          <article className="panel px-6 py-6">
            <p className="eyebrow">Users</p>
            <p className="mt-3 text-4xl font-semibold text-ink">{users.length}</p>
          </article>
        </section>
      ) : null}

      {!loading && activeTab === "faqs" ? (
        <FAQManager items={faqs} onRefresh={refreshData} />
      ) : null}
      {!loading && activeTab === "departments" ? (
        <DepartmentManager items={departments} onRefresh={refreshData} />
      ) : null}
      {!loading && activeTab === "triage" ? (
        <TriageRuleManager items={triageRules} onRefresh={refreshData} />
      ) : null}
      {!loading && activeTab === "appointments" ? (
        <AppointmentManager items={appointments} onRefresh={refreshData} />
      ) : null}
      {!loading && activeTab === "users" ? (
        <UserManager items={users} onRefresh={refreshData} />
      ) : null}
      {!loading && activeTab === "settings" ? (
        <SiteSettingsManager
          contactInfo={contactInfo}
          chatbotSettings={chatbotSettings}
          onRefresh={refreshData}
        />
      ) : null}
    </div>
  );
}
