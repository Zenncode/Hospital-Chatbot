# AI Skills Reference

This document defines the main AI support areas for `hospital-chatbot-system`.

## 1. Context Management

### Purpose

Keep implementation and documentation aligned with the project scope, safety model, and runtime behavior.

### Responsibilities

- preserve fixed-answer chatbot rules
- keep role and data model assumptions consistent
- align docs with the current codebase

## 2. FAQ Management

### Purpose

Support creation and maintenance of FAQ entries used by the public FAQ page and chatbot matching.

### Related Surface

- collection: `faqs`
- files: `lib/data.ts`, `types/faq.ts`, admin FAQ UI

## 3. Chatbot Matching Logic

### Purpose

Maintain deterministic matching between user messages and approved FAQ or triage responses.

### Responsibilities

- normalize text safely
- preserve triage-first evaluation
- keep fallback behavior deterministic
- avoid generative output paths

### Related Surface

- `lib/chatbot.ts`
- `components/Chatbot.tsx`
- `types/chatbot-settings.ts`

## 4. Symptom Safety Handling

### Purpose

Ensure symptom-related replies remain safe, fixed, and non-diagnostic.

### Responsibilities

- detect urgent symptom keywords
- preserve emergency escalation copy
- keep disclaimer behavior intact

### Related Surface

- collection: `triage_rules`
- files: `lib/chatbot.ts`, `types/triage-rule.ts`

## 5. Appointment Management

### Purpose

Support patient appointment requests and admin status updates.

### Related Surface

- collection: `appointments`
- files: `types/appointment.ts`, `lib/data.ts`, `components/AppointmentForm.tsx`

## 6. Department and Contact Management

### Purpose

Maintain public hospital information shown on pages and reused in chatbot answers.

### Related Surface

- collections: `departments`, `contact_info`
- files: `types/department.ts`, `types/contact-info.ts`, `lib/data.ts`

## 7. Authentication and Role Handling

### Purpose

Preserve patient and admin access boundaries.

### Related Surface

- collection: `users`
- files: `lib/auth.ts`, `components/ProtectedRoute.tsx`, auth provider and admin pages

## 8. Firestore Security Design

### Purpose

Keep data access compatible with the role-based model and public-content restrictions.

### Related Surface

- `firestore.rules`
- `docs/firebase/firestore-reference.rules`

## 9. Deployment Management

### Purpose

Support predictable staging and production releases with separate Firebase projects.

### Related Surface

- `deploy.md`
- `docs/deployment/deployment-guide.md`
- `.env.local.example`
- `lib/firebase.ts`

## 9A. Command Skills

### Purpose

Give the agent explicit command workflows for GitHub, Firebase, and repo verification tasks that are repeated often in this project.

### Related Surface

- `.agents/skills/github-repo-operations/SKILL.md`
- `.agents/skills/firebase-deployment-operations/SKILL.md`
- `.agents/skills/project-verification-commands/SKILL.md`

## 10. Documentation Generation

### Purpose

Keep setup, architecture, AI authoring, and deployment docs current with the repo.

### Related Surface

- `README.md`
- `docs/README.md`
- `docs/architecture/*`
- `docs/ai/*`

## 11. Admin Dashboard Operations

### Purpose

Support safe content management across FAQs, departments, appointments, triage rules, users, and chatbot settings.

### Related Surface

- `components/admin/*`
- `lib/data.ts`

## 12. Seed and Demo Content

### Purpose

Maintain starter content for local use, demos, and Firebase bootstrap flows.

### Related Surface

- `data/seed-faqs.json`
- `data/seed-triage-rules.json`
- `lib/demo-content.ts`

## Agent Constraints

- Do not turn the chatbot into a generative assistant.
- Keep medical content deterministic and safety-first.
- Maintain role-based security assumptions.
- Prefer minimal, maintainable changes.
- Update documentation when changing runtime behavior or setup.
