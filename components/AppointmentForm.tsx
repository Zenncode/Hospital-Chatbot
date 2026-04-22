"use client";

import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/components/providers/AuthProvider";
import { getDepartments, submitAppointmentRequest } from "@/lib/data";
import { demoDepartments } from "@/lib/demo-content";
import { getTodayDateInputValue } from "@/lib/utils";
import type { Department } from "@/types/department";

export function AppointmentForm() {
  const { profile, user } = useAuth();
  const [departments, setDepartments] = useState<Department[]>(demoDepartments);
  const [department, setDepartment] = useState("Cardiology");
  const [preferredDate, setPreferredDate] = useState(getTodayDateInputValue());
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    getDepartments()
      .then((items) => {
        setDepartments(items);
        if (items[0]) {
          setDepartment(items[0].name);
        }
      })
      .catch(() => setDepartments(demoDepartments));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user || !profile) {
      setFeedback("You need an active patient profile before requesting an appointment.");
      return;
    }

    setBusy(true);
    setFeedback("");

    try {
      const result = await submitAppointmentRequest({
        patientUid: user.uid,
        patientName: profile.fullName || user.displayName || "Patient",
        email: profile.email || user.email || "",
        phone: profile.phone,
        department,
        preferredDate,
        message
      });

      setMessage("");
      setFeedback(
        result.demoMode
          ? "Appointment request validated in demo mode. Configure Firebase to store requests in Firestore."
          : "Appointment request submitted successfully. An admin can now review it from the dashboard."
      );
    } catch (submissionError) {
      const errorMessage =
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit the appointment request.";
      setFeedback(errorMessage);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel px-6 py-7 sm:px-8">
      <p className="eyebrow">Appointment Request</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink">
        Submit a scheduling request
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate">
        This demo form stores patient appointment requests in the `appointments`
        collection when Firebase is configured and the signed-in user has a patient
        or admin role.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="department">
              Department
            </label>
            <select
              id="department"
              className="field"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              {departments.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="preferredDate">
              Preferred date
            </label>
            <input
              id="preferredDate"
              className="field"
              type="date"
              min={getTodayDateInputValue()}
              value={preferredDate}
              onChange={(event) => setPreferredDate(event.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="field min-h-[140px]"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Add a short reason for the appointment request."
            required
          />
        </div>

        {feedback ? (
          <div className="rounded-3xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-slate">
            {feedback}
          </div>
        ) : null}

        <button className="button-primary" type="submit" disabled={busy}>
          {busy ? "Submitting..." : "Request appointment"}
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;
