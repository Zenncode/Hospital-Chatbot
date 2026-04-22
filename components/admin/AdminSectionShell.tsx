import type { ReactNode } from "react";

interface AdminSectionShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function AdminSectionShell({
  eyebrow,
  title,
  description,
  children
}: AdminSectionShellProps) {
  return (
    <section className="panel px-6 py-6 sm:px-7">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}
