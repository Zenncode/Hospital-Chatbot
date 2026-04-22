# Firebase Command Reference

## Auth And Account Checks

```powershell
firebase login
firebase logout
firebase login:list
& 'C:\Users\zenja\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd' auth login
& 'C:\Users\zenja\AppData\Local\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd' auth list
```

## Project And App Checks

```powershell
firebase projects:list
firebase use <project-id>
firebase apps:list --project <project-id>
firebase apps:sdkconfig WEB <app-id> --project <project-id>
firebase hosting:sites:list --project <project-id>
firebase firestore:databases:list --project <project-id>
```

## Alias And Config Checks

```powershell
Get-Content .firebaserc
Get-Content firebase.json
firebase use --add
firebase experiments:enable webframeworks
```

Current repo mapping:

```txt
dev  -> hospitalchatbotsystem
prod -> hospitalchatbotsystem-prod
```

## Deploy

```powershell
firebase deploy --project <project-id> --debug
firebase deploy --project <project-id>
```
