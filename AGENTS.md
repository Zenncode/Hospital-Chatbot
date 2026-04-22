# AGENTS.md

This file defines the working rules for AI agents and contributors operating inside `hospital-chatbot-system`.

## Project Mission

Build and maintain a fictional hospital website with a fixed-response chatbot, Firebase-backed content management, patient appointment requests, and role-based admin tools.

## Non-Negotiable Constraints

- The chatbot returns fixed answers only.
- Do not introduce freeform AI responses, diagnosis, or prescription behavior.
- Triage guidance must remain safety-based and non-diagnostic.
- Emergency symptom matches must keep the escalation warning and disclaimer behavior.
- Demo content is acceptable for local reads when Firebase is not configured, but authenticated flows and writes require Firebase.

## System Boundaries

### Key Runtime Files

- `lib/chatbot.ts` implements normalization, triage-first matching, FAQ scoring, and fallback behavior.
- `app/api/chatbot/route.ts` exposes the chatbot response contract through the API route.
- `lib/data.ts` handles Firestore reads and writes with demo-mode fallbacks where supported.
- `lib/firebase.ts` controls Firebase initialization from environment variables.
- `components/admin/*` contains the admin dashboard management UI.

### Core Collections

- `faqs`
- `triage_rules`
- `chatbot_settings`
- `departments`
- `appointments`
- `users`
- `contact_info`

## Working Rules

1. Inspect relevant files before editing.
2. Prefer minimal, high-confidence changes over broad refactors.
3. Preserve the existing file layout, naming, and coding patterns unless there is a concrete reason to improve them.
4. Update documentation when behavior, setup, deployment, or data contracts change.
5. Treat the following as source-of-truth references before changing behavior:
   - `README.md`
   - `deploy.md`
   - `docs/firebase/schema-and-seed-data.md`
   - `docs/architecture/root-context.yaml`
   - `docs/ai/agent-context.md`
   - `docs/ai/skills.md`
   - `docs/ai/workflow.md`

## Change Expectations

### Frontend

- Keep public flows clear and accessible.
- Maintain loading, empty, and error states where relevant.
- Keep admin tools consistent with the rest of the UI.

### Backend and Data

- Validate inputs on API and form boundaries.
- Keep Firestore writes safe and explicit.
- Preserve role-based access assumptions and `firestore.rules` compatibility.
- Avoid breaking the current demo-data fallback path.

### Chatbot

- Keep the triage-first flow intact.
- Preserve the FAQ score threshold unless there is a validated reason to change it.
- Keep fallback responses deterministic.
- Do not store or process real patient medical data.

## Verification Expectations

Run the most relevant checks for the change:

- `npm run build`
- `npm run lint`
- `npm run typecheck`

Manual checks are still required for:

- chatbot FAQ matching
- emergency triage messaging
- patient login and appointments
- admin-only route protection
- Firestore-backed CRUD behavior

## Related Docs

- `deploy.md`
- `docs/README.md`
- `docs/ai/README.md`
- `docs/deployment/deployment-guide.md`
- `docs/firebase/schema-and-seed-data.md`
