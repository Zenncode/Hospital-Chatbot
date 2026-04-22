---
name: firebase-deployment-operations
description: Firebase and Google Cloud deployment operations for hospital-chatbot-system. Use when an agent needs to check `firebase login`, `gcloud` auth, project access, web app config, Hosting site links, `.firebaserc` aliases, or deploy the Next.js app to separate `dev` and `prod` Firebase projects.
---

# Firebase Deployment Operations

Use this skill for Firebase, Hosting, and Google Cloud command work in this repository.

## Quick Checks

Run these first:

```powershell
firebase login:list
firebase projects:list
Get-Content .firebaserc
firebase hosting:sites:list --project <project-id>
```

If `gcloud` is not on `PATH`, use:

```powershell
& 'C:\Users\zenja\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd' auth list
```

## Account Reality Check

Do not assume the signed-in Firebase account matches the user's intended Firebase console account.

If a project returns `403 PERMISSION_DENIED`:

1. check `firebase login:list`
2. compare the signed-in email to the user's actual Firebase owner email
3. re-authenticate before changing repo config

Useful commands:

```powershell
firebase logout
firebase login
firebase login:list
```

## Default Repo Expectations

- `.firebaserc` carries separate `dev` and `prod` aliases
- current expected mapping:
  - `dev` -> `hospitalchatbotsystem`
  - `prod` -> `hospitalchatbotsystem-prod`
- the app is a Next.js project with an API route, so Firebase Hosting may require Cloud Functions support
- a successful local build does not prove Firebase deploy access
- GitHub deploys also depend on Firebase web config secrets per environment, not just project aliases

## Workflow

### 1. Verify Project Access

Use direct project checks before editing config:

```powershell
firebase use <project-id>
firebase apps:list --project <project-id>
firebase apps:sdkconfig WEB <app-id> --project <project-id>
firebase hosting:sites:list --project <project-id>
```

### 2. Maintain Dev And Prod Separation

Keep `.firebaserc` explicit:

- `default` and `dev` should point to the dev project
- `prod` should point to the production project

Do not silently replace real project IDs with temporary ones if the repo is already tied to a live Firebase setup.

### 3. Prepare The CLI For Framework Hosting

```powershell
firebase experiments:enable webframeworks
```

### 4. Deploy Intentionally

Use direct deploy commands during local troubleshooting:

```powershell
firebase deploy --project <project-id> --debug
```

### 5. Check Firestore Readiness

Before saying Firebase is fully configured, confirm whether the Firestore API and database actually exist:

```powershell
firebase firestore:databases:list --project <project-id>
```

If this returns `SERVICE_DISABLED`, treat Firebase as only partially configured and call out that the database location still needs an explicit choice.

### 6. Understand Common Failure Modes

- `403 PERMISSION_DENIED`: wrong Google account or missing project access
- Blaze requirement errors: Next.js Hosting with server behavior may require billing before Cloud Build or Cloud Functions can be enabled
- missing web app config: project exists, but the CLI account may still lack access to the configured web app
- `SERVICE_DISABLED` for `firestore.googleapis.com`: the project exists, but Firestore is not enabled yet

## Guardrails

- do not treat a Firebase console URL as proof that CLI access is working
- do not claim a deploy succeeded until Firebase returns a real Hosting result
- separate account-auth problems from app-config problems in the report
- preserve the user's chosen project IDs if they already exist

## References

Read [references/commands.md](references/commands.md) for the standard account, project, alias, and deploy commands.
