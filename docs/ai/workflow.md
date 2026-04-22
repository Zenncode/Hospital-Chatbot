# AI Workflow

This document describes the recommended workflows for AI-assisted work in `hospital-chatbot-system`.

## 1. Documentation Workflow

1. Read `AGENTS.md`.
2. Review `docs/ai/agent-context.md` for scope and safety constraints.
3. Check `README.md`, `deploy.md`, and Firebase docs for the current setup.
4. Update documentation together with any behavior or setup change.

## 2. Chatbot Runtime Workflow

1. Normalize the user message.
2. Evaluate active triage rules first.
3. If a triage rule matches, return the stored guidance and disclaimer.
4. If no triage rule matches, score FAQ candidates.
5. If the best FAQ score passes the threshold, return the stored answer.
6. Otherwise return the configured fallback message.

## 3. Content Management Workflow

1. Admin updates data through the dashboard.
2. Firestore persists the relevant record.
3. Public pages and chatbot reads reflect the updated content.
4. Fallback demo data remains available only when Firebase is not configured.

## 4. Appointment Workflow

1. Patient authenticates.
2. Patient submits an appointment request.
3. The request is stored with `pending` status.
4. Admin reviews and updates the status.

## 5. Deployment Workflow

1. Feature work is merged into `develop`.
2. `develop` is deployed to staging.
3. Staging is smoke-tested against the staging Firebase project.
4. Approved changes are merged into `prod`.
5. `prod` is deployed to production.

## 6. Verification Workflow

Run the most relevant checks:

- `npm run build`
- `npm run lint`
- `npm run typecheck`

Then manually verify:

- public page rendering
- chatbot FAQ and triage responses
- patient login and appointment creation
- admin access restrictions
- admin CRUD flows for Firestore-backed content

