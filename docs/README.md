# Project Documentation

This folder contains supporting documentation for the Hospital Chatbot System.

## Structure

- `../AGENTS.md` is the repo-level guide for AI agents and contributors.
- `../deploy.md` is the top-level deployment runbook for releases and environment setup.
- `ai/README.md` is the index for the AI-specific project docs.
- `ai/agent-context.md` defines the AI-safe project scope and chatbot constraints.
- `ai/skills.md` maps the main AI support areas to the codebase and data model.
- `ai/workflow.md` describes the recommended AI-assisted authoring and runtime workflows.
- `architecture/project-foundation.md` describes the original product scope, roles, and planned capabilities.
- `architecture/root-context.yaml` stores the structured project context in YAML format.
- `deployment/deployment-guide.md` covers the longer branch strategy and deployment planning guidance.
- `firebase/schema-and-seed-data.md` documents the Firestore collections, security direction, and FAQ seed reference.
- `firebase/firestore-reference.rules` stores the imported Firestore rules reference with the correct `.rules` extension.

## Related Files

- `../README.md` is the main project setup and usage guide.
- `../AGENTS.md` is the working contract for AI-assisted edits.
- `../deploy.md` is the release-facing deployment guide.
- `../.agents/repo-and-deploy.md` is the repo bootstrap and deployment playbook for agents.
- `../.github/workflows/ci.yml` validates pull requests and protected branches.
- `../.github/workflows/firebase-deploy.yml` deploys `develop` and `prod` through Firebase.
- `../.firebaserc` stores the local Firebase project aliases.
- `../firebase.json` stores the Firebase Hosting configuration for the repo.
- `../data/seed-faqs.json` and `../data/seed-triage-rules.json` are the actual seed files used by the application.
