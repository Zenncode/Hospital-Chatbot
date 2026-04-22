import Link from "next/link";

import Chatbot from "@/components/Chatbot";
import DepartmentDirectory from "@/components/DepartmentDirectory";
import FAQList from "@/components/FAQList";

export default function HomePage() {
  return (
    <div className="site-shell space-y-20 pb-6">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div className="panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <p className="eyebrow">Hospital Chatbot System</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-ink sm:text-6xl">
            A clean demo hospital website built around fixed, safe, approved answers.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate">
            Patients and visitors can browse FAQs, review departments, request
            appointments, and use a rule-based chatbot without any generative AI
            output or unsafe medical advice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/faq" className="button-primary">
              Explore FAQs
            </Link>
            <Link href="/appointments" className="button-secondary">
              Request appointment
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/70 p-5">
              <p className="text-3xl font-semibold text-ink">15</p>
              <p className="mt-2 text-sm text-slate">starter FAQ records</p>
            </div>
            <div className="rounded-3xl bg-white/70 p-5">
              <p className="text-3xl font-semibold text-ink">10</p>
              <p className="mt-2 text-sm text-slate">demo departments</p>
            </div>
            <div className="rounded-3xl bg-white/70 p-5">
              <p className="text-3xl font-semibold text-ink">3</p>
              <p className="mt-2 text-sm text-slate">user roles</p>
            </div>
          </div>
        </div>

        <Chatbot />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="panel px-6 py-6">
          <p className="eyebrow">Appointments</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">
            Patient-only request workflow
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate">
            Signed-in patients can submit appointment requests to Firestore, while
            admins can review and update request status from the dashboard.
          </p>
        </article>
        <article className="panel px-6 py-6">
          <p className="eyebrow">Departments</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">
            Structured department directory
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate">
            Each department record includes service descriptions, location, hours,
            and direct contact details for quick navigation.
          </p>
        </article>
        <article className="panel px-6 py-6">
          <p className="eyebrow">Safety</p>
          <h2 className="mt-3 text-2xl font-semibold text-ink">
            Triage rules without diagnosis
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate">
            Symptom-related messages are matched against fixed triage rules first,
            with emergency escalation and a medical disclaimer on every response.
          </p>
        </article>
      </section>

      <section className="space-y-6">
        <div>
          <p className="eyebrow">Featured FAQs</p>
          <h2 className="section-title mt-3">High-frequency hospital questions</h2>
          <p className="section-copy mt-3">
            These entries are seeded into Firestore and reused by the fixed-response
            chatbot logic.
          </p>
        </div>
        <FAQList limit={4} compact />
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Department Snapshot</p>
            <h2 className="section-title mt-3">Key services at a glance</h2>
          </div>
          <Link href="/departments" className="button-secondary">
            View all departments
          </Link>
        </div>
        <DepartmentDirectory limit={3} />
      </section>
    </div>
  );
}
