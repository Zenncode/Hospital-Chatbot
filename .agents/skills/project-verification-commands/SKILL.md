---
name: project-verification-commands
description: Standard verification workflow for hospital-chatbot-system. Use when an agent needs to inspect repo state, check branches and remotes, run `npm` validation commands, confirm deployment readiness, or summarize what is verified versus still blocked.
---

# Project Verification Commands

Use this skill when the user asks to check whether the repo, build, or deployment setup is working.

## Quick Start

Run the smallest set of commands that answers the user's request:

```powershell
git status --short --branch
git branch -vv
git remote -v
npm run lint
npm run build
npm run typecheck
```

## Verification Order

### 1. Repo State

Start with:

```powershell
git status --short --branch
git branch -vv
git remote -v
```

Use this to separate local code issues from push or deploy issues.

### 2. App Validation

Use the standard repo checks:

```powershell
npm run lint
npm run build
npm run typecheck
```

If `typecheck` depends on generated Next.js types, run `build` before concluding that TypeScript is broken.

### 3. Deployment Readiness

When the request is deployment-related, also check:

```powershell
firebase login:list
firebase projects:list
Get-Content .firebaserc
firebase apps:list --project hospitalchatbotsystem
firebase apps:list --project hospitalchatbotsystem-prod
firebase firestore:databases:list --project <project-id>
```

### 4. Remote Verification

When the request is GitHub-related, also check:

```powershell
gh auth status
git ls-remote --symref origin HEAD
```

## Reporting Format

Summarize results in this order:

1. what you found
2. what changed
3. how to verify
4. remaining risks

Be explicit about what was not verified.

## Guardrails

- do not say deployment works just because `npm run build` passed
- do not hide auth failures behind generic "setup issue" wording
- distinguish docs-only changes from tested runtime behavior
- keep the output factual and specific

## References

Read [references/commands.md](references/commands.md) for the standard verification command set.
