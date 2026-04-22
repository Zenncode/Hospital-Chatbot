# GitHub Command Reference

## Auth

```powershell
gh auth login
gh auth status
& 'C:\Program Files\GitHub CLI\gh.exe' auth status
```

## Repo State

```powershell
git status --short --branch
git branch -vv
git remote -v
git log --oneline --decorate --all --max-count=5
```

## Remote Setup

```powershell
git remote add origin https://github.com/OWNER/REPO.git
gh repo create OWNER/REPO --private --source . --remote origin --push
gh repo edit OWNER/REPO --default-branch main
git ls-remote --symref origin HEAD
```

## Branch Push

```powershell
git branch -f main develop
git push -u origin main
git push -u origin develop
git push -u origin prod
git branch --set-upstream-to=origin/main main
```
