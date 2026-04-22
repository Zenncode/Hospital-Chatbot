import { Suspense } from "react";

import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="site-shell grid gap-8 pb-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="panel px-6 py-8 sm:px-8">
        <p className="eyebrow">Authentication</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
          Patient and admin sign-in
        </h1>
        <p className="mt-5 text-base leading-8 text-slate">
          Patients can register with email and password, while admin accounts are
          usually created in Firebase Authentication and assigned an `admin` role in
          the `users` collection.
        </p>
        <ul className="mt-6 space-y-4 text-sm leading-7 text-slate">
          <li>Use Firebase Authentication email/password sign-in.</li>
          <li>Store the matching profile in Firestore `users`.</li>
          <li>Route access is based on the stored Firestore role field.</li>
        </ul>
      </section>

      <Suspense
        fallback={
          <div className="panel px-6 py-7">
            <p className="text-sm text-slate">Loading login form...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
