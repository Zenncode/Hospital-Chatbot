# UI/UX Design Guide

This file is the source of truth for any agent making frontend or design changes in `hospital-chatbot-system`.

## Goal

Preserve the existing visual identity:

- calm, credible, safety-first hospital UI
- warm editorial look instead of generic SaaS styling
- soft surfaces, rounded shapes, and spacious layouts
- clear patient guidance with strong readability

Do not redesign the product into a different visual language unless explicitly requested.

## Product Personality

- Tone: reassuring, direct, medically cautious, never dramatic
- Feel: modern demo hospital, warm and clean, not sterile and not corporate-heavy
- Content style: explain clearly, avoid jargon when possible, emphasize safety and guidance
- Trust signal: the interface should feel reviewed and intentional, not experimental

## Current Design System

The current UI is defined primarily by:

- [app/globals.css](/C:/Users/zenja/OneDrive/Desktop/Codex/hospital-chatbot-system/app/globals.css)
- [tailwind.config.ts](/C:/Users/zenja/OneDrive/Desktop/Codex/hospital-chatbot-system/tailwind.config.ts)
- [app/layout.tsx](/C:/Users/zenja/OneDrive/Desktop/Codex/hospital-chatbot-system/app/layout.tsx)
- [app/page.tsx](/C:/Users/zenja/OneDrive/Desktop/Codex/hospital-chatbot-system/app/page.tsx)
- [components/Navbar.tsx](/C:/Users/zenja/OneDrive/Desktop/Codex/hospital-chatbot-system/components/Navbar.tsx)
- [components/Footer.tsx](/C:/Users/zenja/OneDrive/Desktop/Codex/hospital-chatbot-system/components/Footer.tsx)

Follow these patterns before introducing new ones.

## Visual Tokens

Use the existing Tailwind tokens. Do not invent new colors unless there is a clear need.

- `shell`: `#f5f1e8`
- `ink`: `#172235`
- `teal`: `#0f766e`
- `slate`: `#42526b`
- `accent`: `#d97745`
- `mist`: `#dce8ea`
- `panel`: `#fffaf2`

Supporting effects:

- background uses soft radial gradients on a warm neutral base
- surfaces use `panel` backgrounds with low-contrast borders
- default shadow is `shadow-soft`

## Typography

Use the established font pairing from [app/layout.tsx](/C:/Users/zenja/OneDrive/Desktop/Codex/hospital-chatbot-system/app/layout.tsx):

- Headings: `Fraunces`
- Body/UI text: `Manrope`

Rules:

- keep headings elegant and editorial
- keep body copy simple and readable
- prefer strong line-height over dense blocks
- avoid all-caps except for small eyebrow labels
- do not switch to generic system fonts unless asked

## Layout Principles

- Use `site-shell` for page width and horizontal padding
- Prefer generous vertical spacing between sections
- Use `panel` for primary sections, forms, cards, and admin containers
- Rounded corners should stay soft and large; current system uses large radii such as `rounded-3xl` and `rounded-[28px]`
- Keep layouts responsive with stacked mobile-first behavior

Preferred page rhythm:

1. Intro block with eyebrow, heading, and supporting copy
2. Primary action or content area
3. Secondary supporting sections
4. Safety, help, or footer information

## Core Components

### Navigation

- Keep the navbar lightweight, readable, and role-aware
- Active navigation should be obvious through filled treatment, not subtle underline-only states
- Do not overcrowd the nav with too many actions

### Panels and Cards

- Primary container style is a soft card or panel
- Cards should feel elevated but not glossy
- Inner sections often use white or white-tinted fills inside the main panel
- Prefer concise content blocks over dense dashboards

### Buttons

Follow the existing hierarchy:

- `button-primary`: dark ink fill, strong action
- `button-secondary`: pale surface with border, lower emphasis

Rules:

- primary actions should be limited per section
- avoid multiple competing primary buttons in the same viewport region
- keep labels short and task-oriented

### Forms

Use the shared `field` style for inputs, selects, and textareas.

Rules:

- labels are always visible above fields
- inputs should remain high-contrast and easy to scan
- feedback states should appear in a rounded message container
- forms should feel calm and guided, not dense or enterprise-heavy

### Chat UI

The chatbot is part of the design language and should remain consistent:

- use rounded bubbles
- user messages are dark ink blocks
- bot messages are pale bordered blocks
- triage or safety messages may use `accent`-tinted emphasis, but keep readability high
- chatbot copy must reinforce fixed-response and safety constraints

## Content and Copy Rules

- Always preserve medical safety framing
- Never make the UI imply diagnosis, prescription, or live clinical advice
- Use plain language for patient-facing copy
- Keep disclaimers visible where symptom guidance appears
- Prefer calm, factual calls to action over marketing-heavy phrases

Good direction:

- "Request appointment"
- "View all departments"
- "Safety-focused hospital guidance only"

Avoid:

- hype language
- playful microcopy that weakens trust
- AI-first messaging that conflicts with the fixed-response product behavior

## Page-Type Guidance

### Marketing / Public Pages

- Use a strong hero or intro panel
- Combine editorial headings with clear supporting text
- Mix structured cards, lists, and action links
- Keep the experience warm and informative

### Auth and Patient Flows

- Prioritize clarity and low friction
- Keep the form area visually prominent
- Use side content only to support understanding, not distract from the task

### Admin Pages

- Preserve the same brand system instead of switching to a separate harsh dashboard style
- Use `panel` sections for each admin area
- Prefer modular sections with descriptive headings and short instructions
- Keep admin tools readable first, compact second

## Accessibility and UX Expectations

- Maintain strong text contrast against warm backgrounds
- Preserve visible focus states
- Do not rely on color alone for status or interaction cues
- Ensure tap targets remain comfortable on mobile
- Keep line lengths controlled for long text
- Loading and empty states should be calm and explicit

## Motion and Interaction

- Keep motion subtle and meaningful
- Prefer hover and focus refinement over flashy animation
- Avoid bouncy, playful, or high-energy transitions
- Any animation should support clarity, not spectacle

## Do and Do Not

Do:

- reuse shared utility classes and tokens
- preserve warm background gradients
- keep serif headings and sans-serif body pairing
- use rounded containers and measured spacing
- maintain safety-first medical tone

Do not:

- introduce neon colors, glassmorphism, or dark-mode-first redesigns
- replace the warm palette with pure white clinical minimalism
- turn the product into a generic SaaS dashboard
- use dense tables or cramped controls unless the screen truly requires it
- add visual noise that competes with core patient tasks

## Implementation Rule for Agents

When updating UI:

1. inspect existing component patterns first
2. reuse `site-shell`, `panel`, `eyebrow`, `section-title`, `section-copy`, `field`, `button-primary`, `button-secondary`, and `status-pill` where appropriate
3. extend the current system before creating new visual primitives
4. keep public, patient, and admin pages within one coherent design language

If a requested UI conflicts with this guide, follow the explicit user request but note the deviation.
