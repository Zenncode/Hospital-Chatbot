"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useAuth } from "@/components/providers/AuthProvider";
import { getFirebaseSetupMessage } from "@/lib/firebase";
import type { UserRole } from "@/types/user";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function ProtectedRoute({
  allowedRoles,
  redirectTo = "/login",
  title,
  description,
  children
}: ProtectedRouteProps) {
  const router = useRouter();
  const { loading, profile, user, isFirebaseReady } = useAuth();

  useEffect(() => {
    if (loading || !isFirebaseReady || user) {
      return;
    }

    router.replace(`/login?redirect=${encodeURIComponent(redirectTo)}`);
  }, [isFirebaseReady, loading, redirectTo, router, user]);

  if (!isFirebaseReady) {
    return (
      <div className="panel px-6 py-8">
        <h2 className="text-2xl font-semibold text-ink">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate">
          {getFirebaseSetupMessage()}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="panel px-6 py-8">
        <h2 className="text-2xl font-semibold text-ink">Checking access</h2>
        <p className="mt-3 text-sm text-slate">
          Verifying the signed-in user and role before opening this page.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="panel px-6 py-8">
        <h2 className="text-2xl font-semibold text-ink">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate">{description}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="panel px-6 py-8">
        <h2 className="text-2xl font-semibold text-ink">Profile record missing</h2>
        <p className="mt-3 text-sm leading-7 text-slate">
          You are signed in, but there is no matching Firestore `users` record for
          this account. Create the user document first so role-based access can work.
        </p>
      </div>
    );
  }

  if (!allowedRoles.includes(profile.role)) {
    return (
      <div className="panel px-6 py-8">
        <h2 className="text-2xl font-semibold text-ink">Access denied</h2>
        <p className="mt-3 text-sm leading-7 text-slate">
          This page is limited to {allowedRoles.join(" or ")} users. Your current
          role is <span className="font-semibold text-ink">{profile.role}</span>.
        </p>
        <div className="mt-5">
          <Link href="/" className="button-secondary">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
