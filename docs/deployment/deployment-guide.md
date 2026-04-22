# Firebase Deployment Guide

This document is the longer reference for deploying `hospital-chatbot-system` with GitHub and Firebase.

## Deployment Model

- `develop` branch = staging code branch
- `prod` branch = production code branch
- Firebase alias `dev` = staging Firebase project
- Firebase alias `prod` = production Firebase project

## Platform Decision

This repo uses **Firebase Hosting with framework-aware Next.js support** plus GitHub Actions.

That choice was made to keep deployment logic in repo-managed workflow files.

Inference from Firebase docs:
- Firebase explicitly recommends **App Hosting** for full-stack Next.js apps.
- Firebase Hosting still works for Next.js through the framework-aware CLI, but Firebase describes it as an early public preview.

## Required Tooling

- Git
- GitHub CLI
- Google Cloud SDK
- Firebase CLI
- Node.js 20 or later for CI consistency

## Local Authentication

Run these commands on the setup machine:

```powershell
gh auth login
gcloud auth login
gcloud auth application-default login
firebase login
firebase experiments:enable webframeworks
```

## Firebase Projects

Prepare two Firebase projects:

### Staging project

- used by branch `develop`
- mapped to alias `dev`
- safe for testing content and configuration

### Production project

- used by branch `prod`
- mapped to alias `prod`
- used only for approved releases

## Repository Files

### `.firebaserc`

Stores local Firebase project aliases.

Expected alias shape:

```json
{
  "projects": {
    "default": "your-firebase-dev-project-id",
    "dev": "your-firebase-dev-project-id",
    "prod": "your-firebase-prod-project-id"
  }
}
```

### `firebase.json`

Stores the Firebase Hosting configuration for the repo root and points Firestore deploys at `firestore.rules`.

### `.github/workflows/ci.yml`

Validates pull requests into `develop` and `prod`.

### `.github/workflows/firebase-deploy.yml`

Deploys pushes from `develop` and `prod` to the correct Firebase projects.

## GitHub Secrets

Add these repository secrets:

- `FIREBASE_PROJECT_DEV`
- `FIREBASE_PROJECT_PROD`
- `FIREBASE_SERVICE_ACCOUNT_DEV`
- `FIREBASE_SERVICE_ACCOUNT_PROD`

Add these environment-scoped secrets to both the `staging` and `production` GitHub environments:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

If the service account secrets are not configured yet, the deploy workflow skips the Firebase deploy step and still runs validation.

Recommended meaning:

- `FIREBASE_PROJECT_DEV` = staging Firebase project ID
- `FIREBASE_PROJECT_PROD` = production Firebase project ID
- `FIREBASE_SERVICE_ACCOUNT_DEV` = service account JSON with deploy access to the staging Firebase project
- `FIREBASE_SERVICE_ACCOUNT_PROD` = service account JSON with deploy access to the production Firebase project
- `NEXT_PUBLIC_FIREBASE_API_KEY` = Firebase Web API key for the matching environment
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = Firebase Web messaging sender ID for the matching environment
- `NEXT_PUBLIC_FIREBASE_APP_ID` = Firebase Web app ID for the matching environment

## Git Branch Workflow

1. Create feature branches from `develop`
2. Open pull requests back into `develop`
3. Let CI validate the change
4. Merge to `develop`
5. Confirm the staging Firebase deployment
6. Merge `develop` into `prod` for release
7. Confirm the production Firebase deployment

## GitHub Actions Behavior

### CI workflow

Runs on pull requests to:

- `develop`
- `prod`

It performs:

- dependency install
- lint
- production build

### Firebase deploy workflow

Runs on pushes to:

- `develop`
- `prod`

It performs:

- dependency install
- Firebase web frameworks enablement
- deployment to the correct Firebase project

Branch mapping:

- `develop` -> Firebase `dev`
- `prod` -> Firebase `prod`

## Local Deployment Commands

Before local Firestore-backed testing or deploy validation, create a Cloud Firestore database in each project and choose the location intentionally because it is effectively permanent.

Deploy to staging:

```powershell
firebase deploy --only hosting --project dev
```

Deploy to production:

```powershell
firebase deploy --only hosting --project prod
```

## Smoke Test Checklist

Before releasing to `prod`, verify:

- home page loads
- FAQ page loads
- departments page loads
- contact page loads
- login flow works
- appointments page behavior is correct
- admin access is still restricted
- chatbot FAQ answers are still fixed
- emergency symptom prompts still show safe escalation and disclaimers

## Rollback

### Git rollback

```powershell
git checkout prod
git revert <commit-hash>
git push origin prod
```

### Firebase rollback

- open the Firebase Hosting release history for the affected project
- restore the previous known good release

## Related Files

- `../../deploy.md`
- `../../.agents/repo-and-deploy.md`
- `../../.github/workflows/ci.yml`
- `../../.github/workflows/firebase-deploy.yml`
- `../../.firebaserc`
- `../../firebase.json`
- `../../firestore.rules`
