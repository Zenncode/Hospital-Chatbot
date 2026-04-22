# Firebase Deployment Runbook

This is the practical deployment guide for `hospital-chatbot-system`.

The repo is configured for:

- `develop` branch -> staging release flow
- `prod` branch -> production release flow
- Firebase project alias `dev` -> staging Firebase project
- Firebase project alias `prod` -> production Firebase project
- GitHub Actions for validation and Firebase deployment

## Deployment Choice

This repo now uses **Firebase Hosting with the framework-aware CLI** for GitHub-based deployments.

Important note:
- Firebase's current documentation strongly recommends **Firebase App Hosting** for full-stack Next.js apps.
- This repo still uses **Firebase Hosting** because the deployment flow needs repo-managed `.github/workflows` files and branch-controlled deploy automation.

## Required Local Auth

Before an agent or developer sets up deployment, authenticate these tools locally:

```powershell
gh auth login
gcloud auth login
gcloud auth application-default login
firebase login
firebase experiments:enable webframeworks
```

## Required Repo Files

- `.firebaserc`
- `firebase.json`
- `.github/workflows/ci.yml`
- `.github/workflows/firebase-deploy.yml`
- `.agents/repo-and-deploy.md`

## Required GitHub Secrets

- `FIREBASE_PROJECT_DEV`
- `FIREBASE_PROJECT_PROD`
- `FIREBASE_SERVICE_ACCOUNT_DEV`
- `FIREBASE_SERVICE_ACCOUNT_PROD`

Add these environment-scoped secrets to the `staging` and `production` GitHub environments so the Next.js build gets the correct Firebase web config during deploy:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

If the service account secrets are still missing, the workflow now skips the deploy step instead of failing the whole push. Validation still runs.

## Branch Mapping

- `develop` pushes deploy to the live channel of the Firebase `dev` project
- `prod` pushes deploy to the live channel of the Firebase `prod` project

## Local Firebase Setup

1. Add the project aliases:

```powershell
firebase use --add
```

2. Confirm `.firebaserc` points to the correct projects:

- `default` -> your staging Firebase project
- `dev` -> your staging Firebase project
- `prod` -> your production Firebase project

3. Create a Cloud Firestore database in each project before relying on authenticated reads or writes. Choose the region intentionally because the location is effectively permanent.

4. If Firebase Hosting config needs to be regenerated for Next.js:

```powershell
firebase init hosting
```

Recommended answers:
- use an existing Firebase project
- say `Yes` to the web framework prompt
- use the current Next.js app in the repo root

## GitHub Workflow Behavior

### Pull Requests

- `.github/workflows/ci.yml` runs on pull requests to `develop` and `prod`
- it installs dependencies, lints, and builds the app

### Push to `develop`

- `.github/workflows/firebase-deploy.yml` validates the app
- it deploys to the Firebase `dev` project

### Push to `prod`

- `.github/workflows/firebase-deploy.yml` validates the app
- it deploys to the Firebase `prod` project

## Manual Local Deploys

Deploy to staging:

```powershell
firebase deploy --only hosting --project dev
```

Deploy to production:

```powershell
firebase deploy --only hosting --project prod
```

## Verification Checklist

Before promoting `develop` to `prod`, verify:

- `npm run lint` passes
- `npm run build` passes
- the home, FAQ, departments, contact, login, appointments, and admin routes load
- the chatbot still returns fixed FAQ and triage responses
- staging points to the Firebase `dev` project
- production points to the Firebase `prod` project

## Rollback

### Git-Based Rollback

```powershell
git checkout prod
git revert <commit-hash>
git push origin prod
```

### Firebase Hosting Rollback

Use the Firebase console to revert to a previous Hosting release for the affected project.

## Related Files

- `AGENTS.md`
- `.agents/repo-and-deploy.md`
- `.github/workflows/ci.yml`
- `.github/workflows/firebase-deploy.yml`
- `README.md`
- `docs/README.md`
- `docs/deployment/deployment-guide.md`
- `.firebaserc`
- `firebase.json`
- `firestore.rules`
