"use client";

import { useState } from "react";

import { AdminSectionShell } from "@/components/admin/AdminSectionShell";
import { updateAppointmentStatus } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { Appointment, AppointmentStatus } from "@/types/appointment";

interface AppointmentManagerProps {
  items: Appointment[];
  onRefresh: () => Promise<void>;
}

const appointmentStatuses: AppointmentStatus[] = [
  "pending",
  "approved",
  "rejected",
  "completed",
  "cancelled"
];

export function AppointmentManager({
  items,
  onRefresh
}: AppointmentManagerProps) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  async function handleStatusChange(id: string, status: AppointmentStatus) {
    setBusyId(id);
    setFeedback("");

    try {
      await updateAppointmentStatus(id, status);
      setFeedback(`Appointment ${id} updated to ${status}.`);
      await onRefresh();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to update appointment."
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AdminSectionShell
      eyebrow="Appointments"
      title="Review patient requests"
      description="Admins can track appointment status and update requests after follow-up."
    >
      {feedback ? (
        <div className="mb-5 rounded-3xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-slate">
          {feedback}
        </div>
      ) : null}

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-3xl border border-ink/10 bg-white/70 p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="space-y-2 text-sm text-slate">
                <p className="text-lg font-semibold text-ink">{item.patientName}</p>
                <p>{item.department}</p>
                <p>{item.email}</p>
                <p>{item.phone}</p>
                <p>Preferred date: {formatDate(item.preferredDate)}</p>
                <p>{item.message}</p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="status-pill">{item.status}</span>
                <select
                  className="field min-w-[180px]"
                  defaultValue={item.status}
                  disabled={busyId === item.id}
                  onChange={(event) =>
                    handleStatusChange(
                      item.id,
                      event.target.value as AppointmentStatus
                    )
                  }
                >
                  {appointmentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminSectionShell>
  );
}
