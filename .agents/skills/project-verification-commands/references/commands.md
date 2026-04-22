# Verification Command Reference

## Repo Checks

```powershell
git status --short --branch
git branch -vv
git remote -v
git log --oneline --decorate --all --max-count=5
```

## App Checks

```powershell
npm run lint
npm run build
npm run typecheck
```

## Deployment Checks

```powershell
firebase login:list
firebase projects:list
Get-Content .firebaserc
firebase hosting:sites:list --project <project-id>
firebase apps:list --project hospitalchatbotsystem
firebase apps:list --project hospitalchatbotsystem-prod
firebase firestore:databases:list --project <project-id>
```

## GitHub Checks

```powershell
gh auth status
git ls-remote --symref origin HEAD
```
