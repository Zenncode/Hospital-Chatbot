---
name: github-repo-operations
description: GitHub repository and branch operations for hospital-chatbot-system. Use when an agent needs to check `gh auth login`, verify or attach `origin`, create a GitHub repo, inspect remotes, or push `main`, `develop`, and `prod` safely without rewriting existing history.
---

# GitHub Repo Operations

Use this skill for Git and GitHub tasks tied to this repository.

## Quick Checks

Run these first:

```powershell
git status --short --branch
git branch -vv
git remote -v
gh auth status
```

If `gh` is not on `PATH`, use:

```powershell
& 'C:\Program Files\GitHub CLI\gh.exe' auth status
```

## Default Repo Expectations

- local project folder: `hospital-chatbot-system`
- GitHub repo may have a different casing or label than the local folder
- branch model in this repo:
  - `main`
  - `develop`
  - `prod`

## Workflow

### 1. Verify Local Repo State

- confirm the current branch
- confirm there are no unexpected uncommitted changes
- do not run `git init` if `.git` already exists
- do not append placeholder text to `README.md` just to mirror sample commands

### 2. Verify GitHub Auth

If `gh auth status` shows no login, stop treating GitHub CLI as authenticated.

Useful commands:

```powershell
gh auth login
gh auth status
```

## 3. Verify Or Attach The Remote

If no remote exists:

```powershell
git remote add origin https://github.com/OWNER/REPO.git
```

If the user already gave the target repo URL, use that exact URL rather than inventing a new repo name.

## 4. Create The GitHub Repo

Use this only if the remote repo does not already exist:

```powershell
gh repo create OWNER/REPO --private --source . --remote origin --push
```

After creation, verify:

```powershell
git remote -v
git ls-remote --symref origin HEAD
```

## 5. Push Branches Safely

If `main`, `develop`, and `prod` should all point at the same commit, create or fast-forward them intentionally before pushing.

Common commands:

```powershell
git branch -f main develop
git push -u origin main
git push -u origin develop
git push -u origin prod
git branch --set-upstream-to=origin/main main
```

## 6. Guardrails

- do not force-push unless the user explicitly asks for it
- do not rename or delete branches unless the release flow clearly requires it
- do not overwrite unrelated history to make sample commands work
- report when `git` push works but `gh auth status` is still disconnected; these are different auth surfaces

## References

Read [references/commands.md](references/commands.md) for the standard command set and verification order.
