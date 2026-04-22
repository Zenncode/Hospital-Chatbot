# AI Agent Context

## Project Summary

`hospital-chatbot-system` is a fictional demo hospital website built with Next.js, TypeScript, Firebase Authentication, and Firestore. Its chatbot is a fixed-response system backed by FAQ data, triage rules, and chatbot settings.

## Primary Goal

Help users find hospital information quickly while keeping medical safety constraints strict and implementation behavior deterministic.

## Supported User Roles

- `guest`: browse public pages and use the chatbot
- `patient`: authenticate and submit appointment requests
- `admin`: manage FAQs, departments, appointments, users, contact info, triage rules, and chatbot settings

## Chatbot Scope

The chatbot may answer questions about:

- hospital hours
- appointments
- departments
- laboratory and pharmacy information
- contact details
- visitor guidance
- login guidance
- symptom safety guidance

## Safety Constraints

The chatbot must:

- return fixed stored answers only
- check triage rules before FAQ matching
- show emergency guidance for urgent symptom keywords
- include a disclaimer for symptom guidance

The chatbot must not:

- generate freeform medical advice
- diagnose illness
- prescribe medication or treatment
- present itself as a replacement for a clinician or emergency care

## Data Sources

The application uses:

- Firestore collections for FAQs, triage rules, appointments, departments, users, contact info, and chatbot settings
- demo content fallbacks when Firebase is not configured for read scenarios

The application does not use:

- generative AI output in the chatbot response path
- real patient medical records

## Key Source Files

- `lib/chatbot.ts`
- `app/api/chatbot/route.ts`
- `lib/data.ts`
- `lib/firebase.ts`
- `firestore.rules`

## Environment Model

- `develop` branch for staging or QA
- `prod` branch for production
- separate Firebase projects per environment
- `deploy.md` as the primary release runbook

## Agent Objective

An AI agent working in this repo should help produce code and documentation that preserve the fixed-answer chatbot architecture, role-based access model, Firebase-backed data flows, and safety boundaries described above.

