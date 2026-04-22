"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/components/providers/AuthProvider";
import { logoutUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/departments", label: "Departments" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const pathname = usePathname();
  const { profile, user, loading } = useAuth();

  const roleLinks: { href: string; label: string }[] = [];

  if (profile?.role === "patient" || profile?.role === "admin") {
    roleLinks.push({ href: "/appointments", label: "Appointments" });
  }

  if (profile?.role === "admin") {
    roleLinks.push({ href: "/admin", label: "Admin" });
  }

  async function handleLogout() {
    await logoutUser();
  }

  return (
    <header className="site-shell relative z-20 pt-6">
      <nav className="panel px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/" className="text-lg font-semibold text-ink">
              Harborview Demo Hospital
            </Link>
            <p className="mt-1 text-sm text-slate">
              Fixed-response FAQ chatbot for a fictional hospital website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[...publicLinks, ...roleLinks].map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-ink text-white"
                      : "bg-white/70 text-slate hover:text-teal"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {profile?.role ? (
              <span className="status-pill">{profile.role}</span>
            ) : null}

            {loading ? (
              <span className="text-sm text-slate">Checking session...</span>
            ) : user ? (
              <button className="button-secondary" type="button" onClick={handleLogout}>
                Sign Out
              </button>
            ) : (
              <Link href="/login" className="button-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
