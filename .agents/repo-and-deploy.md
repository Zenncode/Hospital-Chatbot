# Repo And Deploy Agent Playbook

Use this playbook when an agent needs to publish `hospital-chatbot-system` to GitHub and enable branch-based deployment.

## Goal

- create the GitHub repository from the local project
- use `develop` as the integration branch
- use `prod` as the production branch
- enable GitHub Actions CI
- authenticate local tooling for GitHub, Google Cloud, and Firebase
- deploy through Firebase from GitHub pushes
- keep separate Firebase projects for `dev` and `prod`

## Required Tools

- Git
- GitHub CLI (`gh`)
- Google Cloud SDK (`gcloud`)
- Firebase CLI (`firebase`)

## Important Note

This repo is a Next.js app with API routes. Firebase's official guidance strongly recommends **Firebase App Hosting** for full-stack Next.js apps, while Firebase Hosting framework support is still an early preview. This repo is configured for **Firebase Hosting with GitHub Actions** because the deployment flow needs repo-managed `.github/workflows` files.

## Required Secrets

Set these repository secrets before expecting deploy workflows to succeed:

- `FIREBASE_SERVICE_ACCOUNT_DEV`
- `FIREBASE_SERVICE_ACCOUNT_PROD`
- `FIREBASE_PROJECT_DEV`
- `FIREBASE_PROJECT_PROD`

Set these environment-scoped secrets in both `staging` and `production` before expecting the deploy workflow to build with the right Firebase web config:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Without the service account secrets, the workflow will still validate the app but will skip the Firebase deploy step.

## Bootstrap Steps

1. Confirm or install the required CLIs.

If `gh` or `gcloud` is missing, install them before continuing.

2. Sign in to GitHub CLI:

```powershell
gh auth login
```

3. Sign in to Google Cloud:

```powershell
gcloud auth login
gcloud auth application-default login
```

4. Sign in to Firebase:

```powershell
firebase login
firebase experiments:enable webframeworks
```

5. Initialize Git if the project is not already a repo:

```powershell
git init
```

6. Create the first commit on `develop`:

```powershell
git checkout -b develop
git add .
git commit -m "Initial project commit"
```

7. Create the GitHub repository from the current directory.
Use `--private` or `--public` based on the target visibility:

```powershell
gh repo create OWNER/REPO --private --source=. --remote=origin --push
```

8. Ensure the default branch is `develop`:

```powershell
gh repo edit OWNER/REPO --default-branch develop
```

9. Create and push the production branch:

```powershell
git checkout -b prod
git push -u origin prod
git checkout develop
```

10. Link local Firebase aliases.

Map the staging Firebase project to alias `dev` and the production Firebase project to alias `prod`:

```powershell
firebase use --add
```

Expected outcome:
- `.firebaserc` points `default` and `dev` to the staging project
- `.firebaserc` points `prod` to the production project

Current project IDs in this repo:
- `dev` -> `hospitalchatbotsystem`
- `prod` -> `hospitalchatbotsystem-prod`

11. If `firebase.json` needs to be regenerated for framework-aware Hosting, run:

```powershell
firebase init hosting
```

Recommended answers:
- use an existing project
- choose the `dev` project first
- say `Yes` to using a web framework
- use the current Next.js app in the repo root

If the CLI rewrites `firebase.json`, review the result before committing.

12. Prepare service account JSON keys for both Firebase projects, then add the required GitHub secrets:

```powershell
gh secret set FIREBASE_PROJECT_DEV --body "your-firebase-dev-project-id"
gh secret set FIREBASE_PROJECT_PROD --body "your-firebase-prod-project-id"
gh secret set FIREBASE_SERVICE_ACCOUNT_DEV < .\secrets\firebase-dev-service-account.json
gh secret set FIREBASE_SERVICE_ACCOUNT_PROD < .\secrets\firebase-prod-service-account.json
```

Set environment-scoped web config secrets as well:

```powershell
gh secret set NEXT_PUBLIC_FIREBASE_API_KEY --env staging --body "your-dev-web-api-key"
gh secret set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID --env staging --body "your-dev-messaging-sender-id"
gh secret set NEXT_PUBLIC_FIREBASE_APP_ID --env staging --body "your-dev-web-app-id"
gh secret set NEXT_PUBLIC_FIREBASE_API_KEY --env production --body "your-prod-web-api-key"
gh secret set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID --env production --body "your-prod-messaging-sender-id"
gh secret set NEXT_PUBLIC_FIREBASE_APP_ID --env production --body "your-prod-web-app-id"
```

13. Create Cloud Firestore in each Firebase project before relying on authenticated reads or writes. Choose the region intentionally because the location is effectively permanent.

## Deployment Model

- pushes to `develop` run validation and deploy to the live channel of the Firebase `dev` project
- pushes to `prod` run validation and deploy to the live channel of the Firebase `prod` project
- pull requests into `develop` or `prod` run CI validation

## Recommended Git Flow

1. Branch from `develop`
2. Open a pull request back into `develop`
3. Validate staging from the Firebase `dev` deployment
4. Merge `develop` into `prod` for release

## Verification

After setup:

1. Push a commit to `develop` and confirm:
   - `.github/workflows/ci.yml` passes on pull requests
   - `.github/workflows/firebase-deploy.yml` runs the `validate` job
   - the Firebase `dev` project receives the new deployment
2. Push or merge a release commit to `prod` and confirm:
   - the same deploy workflow validation passes again
   - the Firebase `prod` project receives the new deployment

## Notes

- The GitHub deployment workflow uses Firebase's official Hosting deploy action with per-project service account secrets.
- If the repository already exists on GitHub, skip `gh repo create` and attach the remote manually before pushing branches.
