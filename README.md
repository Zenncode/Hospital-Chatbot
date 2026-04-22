# Hospital Chatbot System

Hospital Chatbot System is a fictional demo hospital website built with Next.js App Router, React, TypeScript, Tailwind CSS, Firebase Authentication, and Firestore.

The chatbot uses fixed FAQ answers and fixed triage rules only. It does not generate freeform AI responses, and it does not provide diagnosis or prescriptions.

## Features

- Public pages: Home, About, FAQ, Departments, Contact, Login
- Protected pages: Patient Appointments, Admin Panel
- Fixed-response chatbot with keyword matching and triage-first safety logic
- Firebase Authentication for patient and admin sign-in
- Firestore collections for FAQs, departments, appointments, users, triage rules, contact info, and chatbot settings
- Admin dashboard for FAQ, department, triage, appointment, user, and site settings management
- Demo-safe symptom guidance with emergency escalation and disclaimer messages

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Firebase Authentication
- Firebase Firestore
- Node.js runtime through Next.js

## Project Tree

```txt
hospital-chatbot-system/
|-- .agents/
|   `-- repo-and-deploy.md
|-- .github/
|   `-- workflows/
|       |-- ci.yml
|       `-- firebase-deploy.yml
|-- AGENTS.md
|-- app/
|   |-- about/page.tsx
|   |-- admin/page.tsx
|   |-- api/chatbot/route.ts
|   |-- appointments/page.tsx
|   |-- contact/page.tsx
|   |-- departments/page.tsx
|   |-- faq/page.tsx
|   |-- login/page.tsx
|   |-- globals.css
|   |-- layout.tsx
|   `-- page.tsx
|-- components/
|   |-- admin/
|   |   |-- AdminDashboard.tsx
|   |   |-- AdminSectionShell.tsx
|   |   |-- AppointmentManager.tsx
|   |   |-- DepartmentManager.tsx
|   |   |-- FAQManager.tsx
|   |   |-- SiteSettingsManager.tsx
|   |   |-- TriageRuleManager.tsx
|   |   `-- UserManager.tsx
|   |-- providers/AuthProvider.tsx
|   |-- AppointmentForm.tsx
|   |-- Chatbot.tsx
|   |-- ContactDetails.tsx
|   |-- DepartmentCard.tsx
|   |-- DepartmentDirectory.tsx
|   |-- FAQList.tsx
|   |-- Footer.tsx
|   |-- LoginForm.tsx
|   |-- Navbar.tsx
|   `-- ProtectedRoute.tsx
|-- data/
|   |-- seed-faqs.json
|   `-- seed-triage-rules.json
|-- docs/
|   |-- ai/
|   |   |-- README.md
|   |   |-- agent-context.md
|   |   |-- skills.md
|   |   `-- workflow.md
|   |-- architecture/
|   |   |-- project-foundation.md
|   |   `-- root-context.yaml
|   |-- deployment/
|   |   `-- deployment-guide.md
|   |-- firebase/
|   |   |-- firestore-reference.rules
|   |   `-- schema-and-seed-data.md
|   `-- README.md
|-- lib/
|   |-- auth.ts
|   |-- chatbot.ts
|   |-- data.ts
|   |-- demo-content.ts
|   |-- firebase.ts
|   `-- utils.ts
|-- types/
|   |-- appointment.ts
|   |-- chatbot-settings.ts
|   |-- contact-info.ts
|   |-- department.ts
|   |-- faq.ts
|   |-- triage-rule.ts
|   `-- user.ts
|-- .env.local.example
|-- .firebaserc
|-- deploy.md
|-- firebase.json
|-- firestore.rules
|-- next.config.mjs
|-- package.json
|-- postcss.config.js
|-- tailwind.config.ts
|-- tsconfig.json
`-- README.md
```

## Documentation

- `AGENTS.md` for repo-specific AI and contributor guidance
- `.agents/repo-and-deploy.md` for the agent playbook that bootstraps GitHub, local auth, and Firebase deployment
- `.github/workflows/ci.yml` for pull request validation into `develop` and `prod`
- `.github/workflows/firebase-deploy.yml` for gated Firebase deploys from `develop` and `prod`
- `deploy.md` for the primary Firebase deployment runbook used during releases
- `docs/ai/README.md` for the AI documentation index inside the app repo
- `docs/ai/agent-context.md` for the AI-safe project scope and chatbot constraints
- `docs/ai/skills.md` for the AI module and ownership reference
- `docs/ai/workflow.md` for the recommended AI authoring and runtime workflows
- `docs/architecture/project-foundation.md` for the original project scope, roles, feature set, and planning notes
- `docs/architecture/root-context.yaml` for the structured YAML version of the project context
- `docs/deployment/deployment-guide.md` for the longer staging and production deployment reference
- `docs/firebase/schema-and-seed-data.md` for Firestore schema guidance, security notes, and FAQ seed reference
- `docs/firebase/firestore-reference.rules` for the imported Firestore rules reference file with a `.rules` extension

## Prerequisites

- Windows 10 or Windows 11
- Node.js 18.18 or later
- npm 9 or later
- A Firebase project with Authentication and Firestore enabled

Check your versions in PowerShell:

```powershell
node -v
npm -v
```

## Setup Instructions

1. Open PowerShell in the project folder:

```powershell
cd "C:\Users\zenja\OneDrive\Desktop\Codex\hospital-chatbot-system"
```

2. Install dependencies:

```powershell
npm install
```

3. Copy the environment example file:

```powershell
Copy-Item .env.local.example .env.local
```

4. Paste your Firebase web app credentials into `.env.local`.

5. Start the development server:

```powershell
npm run dev
```

6. Open the local app:

```txt
http://localhost:3000
```

## Run Instructions

Development:

```powershell
npm run dev
```

Production build:

```powershell
npm run build
```

Start the production build locally:

```powershell
npm run start
```

Type check:

```powershell
npm run typecheck
```

Lint:

```powershell
npm run lint
```

## Firebase Setup Instructions

### 1. Create a Firebase project

Create a Firebase project from the [Firebase Console](https://console.firebase.google.com/).

### 2. Add a Web App

In Firebase, add a web app and copy the client configuration values.

### 3. Paste credentials into `.env.local`

Edit this file:

```txt
hospital-chatbot-system/.env.local
```

Paste your Firebase credentials here:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

For local production builds or `firebase deploy --project prod`, add the same keys to:

```txt
hospital-chatbot-system/.env.production.local
```

This project reads those values from:

- `lib/firebase.ts`

### 3.1 Firebase project aliases

This repo also includes a committed `.firebaserc` and `firebase.json` for Firebase deployment automation.

- alias `dev` should point to your staging Firebase project
- alias `prod` should point to your production Firebase project

Update `.firebaserc` with your real project IDs before local Firebase deploys.

Create Cloud Firestore in each Firebase project before testing authenticated reads or writes. Pick the database location intentionally because it is effectively permanent for that project.

### 4. Enable Authentication

In Firebase Console:

1. Open Authentication
2. Enable Email/Password sign-in
3. Create admin accounts manually if needed

### 5. Create Firestore Database

Create Firestore in Native mode.

### 6. Add Firestore Security Rules

Open Firestore Rules and paste the contents of:

```txt
hospital-chatbot-system/firestore.rules
```

### 7. Create initial collections

Create these collections:

- `users`
- `faqs`
- `departments`
- `appointments`
- `triage_rules`
- `contact_info`
- `chatbot_settings`

### 8. Seed starter data

Use these files as your import source:

- `data/seed-faqs.json`
- `data/seed-triage-rules.json`

You can also create department, contact, and chatbot settings records manually from the admin panel after your first admin login.

### 9. Create an admin user

Admin access depends on the Firestore `users` document role, not just Firebase Auth.

For an admin account:

1. Create the auth user in Firebase Authentication
2. Create a matching Firestore document in `users`
3. Use the auth UID as the document ID and `uid` field value
4. Set `role` to `admin`

Example:

```json
{
  "uid": "firebase-auth-uid",
  "fullName": "Admin User",
  "email": "admin@example.com",
  "role": "admin",
  "phone": "+63 900 000 0000",
  "createdAt": "2026-04-22T00:00:00.000Z",
  "updatedAt": "2026-04-22T00:00:00.000Z",
  "status": "active"
}
```

## How The Chatbot Works

The chatbot flow is implemented in `lib/chatbot.ts`.

1. The user enters a message.
2. The message is normalized to lowercase plain text.
3. Triage rules are checked first.
4. If a symptom keyword matches, one fixed triage answer is returned.
5. Emergency triage rules prepend an emergency warning.
6. A disclaimer is always included for symptom guidance.
7. If no triage rule matches, FAQ keyword and question matching runs.
8. If no FAQ is strong enough, the chatbot returns the fixed fallback message.

There is no generative AI output anywhere in the response pipeline.

## How To Verify

### Basic app checks

1. Visit `/` and confirm the home page loads.
2. Visit `/faq` and confirm FAQ entries render.
3. Use the chatbot and ask:
   - `How do I book an appointment?`
   - `What are your opening hours?`
   - `What should I do if I have chest pain?`
4. Confirm the chest pain response shows emergency guidance and disclaimer text.

### Auth and role checks

1. Register a patient account from `/login`.
2. Confirm the patient lands on `/appointments`.
3. Confirm a guest is redirected to `/login` when opening `/appointments`.
4. Confirm a non-admin user cannot open `/admin`.
5. Confirm an admin user with `role: admin` can open `/admin`.

### Firestore checks

1. Submit an appointment request as a patient.
2. Confirm the record appears in the `appointments` collection.
3. Update an appointment status in the admin panel.
4. Create or edit an FAQ in the admin panel.
5. Refresh `/faq` and confirm the updated data appears.

## Files To Edit First

If you are configuring this project for the first time, edit these files first:

1. `.env.local`
2. `firestore.rules`
3. `data/seed-faqs.json`
4. `data/seed-triage-rules.json`
5. `lib/demo-content.ts`

If you are customizing behavior after setup, start with:

1. `lib/chatbot.ts`
2. `components/Chatbot.tsx`
3. `components/admin/AdminDashboard.tsx`
4. `components/AppointmentForm.tsx`

## Notes

- This is a fictional demo hospital project.
- Firebase is optional for first render because the app falls back to demo content when config is missing.
- Authentication and real writes require Firebase credentials and enabled Firebase services.
- The `app/api/chatbot/route.ts` endpoint returns the same fixed matching logic for backend-style integration examples.
