"use client";

import { useState } from "react";

import { AdminSectionShell } from "@/components/admin/AdminSectionShell";
import { deleteDepartment, saveDepartment } from "@/lib/data";
import { createId } from "@/lib/utils";
import type { Department } from "@/types/department";

const emptyForm = {
  id: "",
  name: "",
  description: "",
  services: "",
  location: "",
  schedule: "",
  contactNumber: "",
  status: "active" as Department["status"]
};

interface DepartmentManagerProps {
  items: Department[];
  onRefresh: () => Promise<void>;
}

export function DepartmentManager({ items, onRefresh }: DepartmentManagerProps) {
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");

  function editItem(item: Department) {
    setForm({
      id: item.id,
      name: item.name,
      description: item.description,
      services: item.services.join(", "),
      location: item.location,
      schedule: item.schedule,
      contactNumber: item.contactNumber,
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
      const payload: Department = {
        id: form.id || createId("dept"),
        name: form.name.trim(),
        description: form.description.trim(),
        services: form.services
          .split(",")
          .map((service) => service.trim())
          .filter(Boolean),
        location: form.location.trim(),
        schedule: form.schedule.trim(),
        contactNumber: form.contactNumber.trim(),
        status: form.status,
        createdAt: existing?.createdAt ?? now,
        updatedAt: now
      };

      await saveDepartment(payload);
      setForm(emptyForm);
      setFeedback("Department saved.");
      await onRefresh();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to save department."
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    setBusy(true);
    setFeedback("");

    try {
      await deleteDepartment(id);
      if (form.id === id) {
        setForm(emptyForm);
      }
      setFeedback("Department deleted.");
      await onRefresh();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Unable to delete department."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminSectionShell
      eyebrow="Department Management"
      title="Maintain service listings"
      description="Departments drive the public directory and can also be used for appointment routing."
    >
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Name</label>
            <input
              className="field"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Description</label>
            <textarea
              className="field min-h-[140px]"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Services</label>
            <input
              className="field"
              value={form.services}
              onChange={(event) => setForm((current) => ({ ...current, services: event.target.value }))}
              placeholder="ECG, consultation, follow-up"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Location</label>
              <input
                className="field"
                value={form.location}
                onChange={(event) =>
                  setForm((current) => ({ ...current, location: event.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Schedule</label>
              <input
                className="field"
                value={form.schedule}
                onChange={(event) =>
                  setForm((current) => ({ ...current, schedule: event.target.value }))
                }
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">
                Contact number
              </label>
              <input
                className="field"
                value={form.contactNumber}
                onChange={(event) =>
                  setForm((current) => ({ ...current, contactNumber: event.target.value }))
                }
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
                    status: event.target.value as Department["status"]
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
              {busy ? "Saving..." : form.id ? "Update department" : "Create department"}
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
                  <p className="text-lg font-semibold text-ink">{item.name}</p>
                  <p className="mt-2 text-sm text-slate">{item.location}</p>
                </div>
                <span className="status-pill">{item.status}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.services.map((service) => (
                  <span
                    key={`${item.id}-${service}`}
                    className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-teal"
                  >
                    {service}
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
