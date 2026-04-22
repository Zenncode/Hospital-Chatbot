"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/components/providers/AuthProvider";
import { getUserProfile, registerPatient, signInUser } from "@/lib/auth";
import { getFirebaseSetupMessage, isFirebaseConfigured } from "@/lib/firebase";

type AuthMode = "signin" | "register";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profile, refreshProfile, user } = useAuth();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user || !profile) {
      return;
    }

    router.replace(profile.role === "admin" ? "/admin" : "/appointments");
  }, [profile, router, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      if (mode === "register") {
        await registerPatient({
          fullName,
          phone,
          email,
          password
        });
        await refreshProfile();
        router.push("/appointments");
        return;
      }

      const signedInUser = await signInUser(email, password);
      const nextProfile = await getUserProfile(signedInUser.uid);

      if (!nextProfile) {
        throw new Error(
          "Your account is authenticated, but no Firestore user profile exists yet. Create the matching users document first."
        );
      }

      await refreshProfile();

      const redirectTarget = searchParams.get("redirect");

      if (redirectTarget) {
        router.push(redirectTarget);
        return;
      }

      router.push(nextProfile.role === "admin" ? "/admin" : "/appointments");
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "Authentication failed.";
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="panel px-6 py-7">
        <h2 className="text-2xl font-semibold text-ink">Firebase setup required</h2>
        <p className="mt-3 text-sm leading-7 text-slate">
          {getFirebaseSetupMessage()}
        </p>
      </div>
    );
  }

  return (
    <div className="panel px-6 py-7 sm:px-8">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={mode === "signin" ? "button-primary" : "button-secondary"}
          onClick={() => setMode("signin")}
        >
          Sign In
        </button>
        <button
          type="button"
          className={mode === "register" ? "button-primary" : "button-secondary"}
          onClick={() => setMode("register")}
        >
          Register Patient
        </button>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {mode === "register" ? (
          <>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                className="field"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Maria Santos"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                className="field"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+63 912 345 6789"
                required
              />
            </div>
          </>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="field"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="patient@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="field"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 6 characters"
            required
          />
        </div>

        {error ? (
          <div className="rounded-3xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-ink">
            {error}
          </div>
        ) : null}

        <button className="button-primary w-full" type="submit" disabled={busy}>
          {busy
            ? "Processing..."
            : mode === "register"
              ? "Create Patient Account"
              : "Login"}
        </button>
      </form>
    </div>
  );
}
