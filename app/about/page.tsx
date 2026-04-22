export default function AboutPage() {
  return (
    <div className="site-shell space-y-10 pb-8">
      <section className="panel px-6 py-8 sm:px-8">
        <p className="eyebrow">About The Project</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
          Fictional hospital, practical full-stack structure
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate">
          Hospital Chatbot System is a demo application designed for learning and
          prototyping. It combines public hospital information pages, a fixed-answer
          chatbot, Firebase Authentication, Firestore collections, and an admin
          content dashboard in a beginner-friendly codebase.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="panel px-6 py-6">
          <p className="eyebrow">Core Rules</p>
          <ul className="mt-4 space-y-4 text-sm leading-7 text-slate">
            <li>No generative AI responses are used anywhere in the chatbot flow.</li>
            <li>No diagnosis or prescription advice is returned to the user.</li>
            <li>Symptom guidance is limited to rule-based safety recommendations.</li>
            <li>Emergency symptom matches always escalate to immediate in-person care.</li>
          </ul>
        </article>

        <article className="panel px-6 py-6">
          <p className="eyebrow">Roles</p>
          <ul className="mt-4 space-y-4 text-sm leading-7 text-slate">
            <li>
              <span className="font-semibold text-ink">Guest:</span> browse public
              pages, departments, FAQs, and the chatbot.
            </li>
            <li>
              <span className="font-semibold text-ink">Patient:</span> sign in and
              submit appointment requests.
            </li>
            <li>
              <span className="font-semibold text-ink">Admin:</span> manage FAQs,
              departments, triage rules, appointments, contact info, and users.
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}
