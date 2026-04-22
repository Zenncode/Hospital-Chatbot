"use client";

import { useState } from "react";

import { AdminSectionShell } from "@/components/admin/AdminSectionShell";
import { updateUserRole } from "@/lib/data";
import type { AppUser, UserRole, UserStatus } from "@/types/user";

interface UserManagerProps {
  items: AppUser[];
  onRefresh: () => Promise<void>;
}

const roles: UserRole[] = ["patient", "admin"];
const statuses: UserStatus[] = ["active", "inactive"];

export function UserManager({ items, onRefresh }: UserManagerProps) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  async function handleSave(userId: string, role: UserRole, status: UserStatus) {
    setBusyId(userId);
    setFeedback("");

    try {
      await updateUserRole(userId, role, status);
      setFeedback(`User ${userId} updated.`);
      await onRefresh();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Unable to update user.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AdminSectionShell
      eyebrow="Users"
      title="Manage roles and access"
      description="Role values in the `users` collection drive patient and admin route access."
    >
      {feedback ? (
        <div className="mb-5 rounded-3xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-slate">
          {feedback}
        </div>
      ) : null}

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-ink/10 bg-white/70 p-5 text-sm text-slate">
            No users found yet. Patient profiles are created at registration.
          </div>
        ) : null}

        {items.map((item) => (
          <article key={item.uid} className="rounded-3xl border border-ink/10 bg-white/70 p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto_auto] lg:items-end">
              <div>
                <p className="text-lg font-semibold text-ink">{item.fullName}</p>
                <p className="mt-2 text-sm text-slate">{item.email}</p>
                <p className="text-sm text-slate">{item.phone}</p>
              </div>
              <select
                className="field min-w-[140px]"
                defaultValue={item.role}
                id={`${item.uid}-role`}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <select
                className="field min-w-[140px]"
                defaultValue={item.status}
                id={`${item.uid}-status`}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                className="button-primary"
                type="button"
                disabled={busyId === item.uid}
                onClick={() => {
                  const roleField = document.getElementById(
                    `${item.uid}-role`
                  ) as HTMLSelectElement | null;
                  const statusField = document.getElementById(
                    `${item.uid}-status`
                  ) as HTMLSelectElement | null;

                  handleSave(
                    item.uid,
                    (roleField?.value as UserRole) ?? item.role,
                    (statusField?.value as UserStatus) ?? item.status
                  );
                }}
              >
                {busyId === item.uid ? "Saving..." : "Save"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </AdminSectionShell>
  );
}
