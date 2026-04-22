# Hospital Chatbot System — Project Foundation

## 1) Root Context File

```yaml
project:
  name: Hospital Chatbot System
  type: FAQ website with fixed-response chatbot
  domain: Healthcare / Demo Hospital
  status: Planning

summary:
  description: >
    Hospital Chatbot System is a demo hospital FAQ website with a fixed-answer chatbot.
    It helps users find hospital information, understand services, view departments,
    learn visitor rules, request appointment guidance, and receive basic symptom triage guidance.
  chatbot_mode: Fixed FAQ answers only
  ai_freeform_generation: false
  hospital_type: Fictional / Demo Hospital

objectives:
  - Provide fast answers to common hospital-related questions
  - Help patients understand how to book appointments
  - Show department information and service availability
  - Guide visitors with schedules, policies, and directions
  - Offer safe, non-diagnostic symptom triage guidance
  - Reduce repetitive manual inquiries through structured FAQs

users:
  - role: guest
    permissions:
      - view public pages
      - browse FAQs
      - use chatbot
      - view departments
      - view contact details
  - role: patient
    permissions:
      - everything guest can do
      - log in
      - request/book appointments
      - manage profile basics
      - view appointment-related info
  - role: admin
    permissions:
      - manage FAQs
      - manage chatbot responses
      - manage departments
      - manage appointment records
      - manage contact information
      - manage user accounts
      - access dashboard and analytics
  - role: staff
    optional: true
    notes: Doctors and nurses may be included later as informational/internal users if needed

features:
  public_website:
    - Home page
    - About page
    - FAQ page
    - Departments page
    - Contact page
    - Login page
  chatbot:
    - Fixed FAQ matching
    - Category-based responses
    - Appointment guidance
    - Department information lookup
    - Visitor guidance
    - Basic symptom triage guidance
    - Escalation to emergency/contact advice when needed
  admin_panel:
    - FAQ management
    - Chatbot response management
    - Department management
    - Appointment management
    - Contact info management
    - User management
  authentication:
    - Guest access for public content
    - Patient login
    - Admin login

chatbot_scope:
  supported_topics:
    - hospital hours
    - appointment booking process
    - department information
    - doctor availability (if stored)
    - visitor policies
    - emergency department guidance
    - contact details
    - location and directions
    - payment / insurance info (optional)
    - lab and pharmacy info
  triage_policy:
    mode: Basic guidance only
    diagnosis_allowed: false
    prescription_allowed: false
    emergency_rule: >
      If symptoms appear severe or urgent, instruct the user to go to the emergency department
      or contact emergency services/hospital staff immediately.
    urgency_levels:
      - low
      - moderate
      - emergency
    disclaimer: >
      This chatbot does not provide medical diagnosis. It only gives general hospital guidance
      and safety-based recommendations.

content_structure:
  faq_categories:
    - General Information
    - Appointments
    - Departments
    - Visitors
    - Emergency
    - Billing and Insurance
    - Laboratory
    - Pharmacy
    - Contact and Location
    - Symptom Guidance

sample_departments:
  - Emergency
  - Cardiology
  - Pediatrics
  - Orthopedics
  - Neurology
  - Radiology
  - Pharmacy
  - Laboratory
  - Internal Medicine
  - Outpatient Services

sample_questions:
  - How do I book an appointment?
  - What are your opening hours?
  - What are the visiting hours?
  - Where is the emergency department?
  - What services does the cardiology department offer?
  - How can I contact the hospital?
  - Do I need an account to request an appointment?
  - Where is the laboratory located?
  - Is the pharmacy open on weekends?
  - What should I do if I have chest pain?
  - Can visitors enter the ICU?
  - How do I log in as a patient?
  - Can I cancel or reschedule my appointment?
  - What departments are available in the hospital?
  - Who can access the admin panel?

pages:
  - name: Home
    purpose: Introduce the hospital system and provide quick navigation
  - name: About
    purpose: Describe the demo hospital and chatbot purpose
  - name: FAQ
    purpose: List categorized frequently asked questions and answers
  - name: Departments
    purpose: Show hospital departments and services
  - name: Contact
    purpose: Display address, phone, email, and map/directions
  - name: Login
    purpose: Allow patient/admin authentication
  - name: Admin Panel
    purpose: Manage site content and chatbot knowledge base

tech_stack:
  frontend:
    - Next.js
    - React
    - Tailwind CSS (recommended)
  backend:
    - Node.js
    - Next.js API routes or Express (optional)
  database:
    - Firebase Firestore
  authentication:
    - Firebase Authentication
  hosting:
    - Firebase Hosting
  storage:
    - Firebase Storage (optional for images/assets)

firebase_usage:
  - Authentication
  - Firestore Database
  - Hosting

non_functional_requirements:
  - Responsive design for desktop and mobile
  - Simple, accessible UI
  - Fast FAQ retrieval
  - Secure role-based access control
  - Clear medical disclaimer on triage-related responses
  - Easy admin content management

constraints:
  - Fixed-response chatbot only
  - No generative medical diagnosis
  - Demo hospital data only
  - Public content must remain non-sensitive

future_enhancements:
  - Search bar for FAQs
  - Appointment history for patients
  - Admin analytics dashboard
  - Multi-language support
  - Staff portal
  - Smarter FAQ intent matching
```

---

## 2) Suggested Skills / Modules

These are project skills/modules, not necessarily separate services.

### Skill 1: FAQ Management
**Purpose:** Store, organize, edit, and publish FAQ entries.

**Functions:**
- Create FAQ
- Update FAQ
- Delete FAQ
- Categorize FAQ
- Mark FAQ as active/inactive

**Firebase collection suggestion:** `faqs`

**Fields:**
- `id`
- `question`
- `answer`
- `category`
- `keywords`
- `status`
- `createdAt`
- `updatedAt`

---

### Skill 2: Chatbot Response Matching
**Purpose:** Match user questions to the correct fixed FAQ answer.

**Functions:**
- Accept user message
- Normalize input
- Search matching FAQ by keywords/category
- Return fixed answer
- Return fallback if no answer found

**Fallback example:**
> Sorry, I could not find an exact answer. Please check the FAQ page or contact the hospital directly.

---

### Skill 3: Appointment Guidance
**Purpose:** Help users understand or submit appointment requests.

**Functions:**
- Show appointment instructions
- Collect appointment request details
- Save requests
- Let admin review requests

**Firebase collection suggestion:** `appointments`

**Fields:**
- `id`
- `patientName`
- `email`
- `phone`
- `department`
- `preferredDate`
- `message`
- `status`
- `createdAt`

---

### Skill 4: Department Information Management
**Purpose:** Manage hospital department content.

**Functions:**
- Add department
- Edit department
- Show department services
- Show schedule/contact/location

**Firebase collection suggestion:** `departments`

**Fields:**
- `id`
- `name`
- `description`
- `services`
- `location`
- `schedule`
- `contactNumber`

---

### Skill 5: Symptom Guidance / Triage Rules
**Purpose:** Provide safe, fixed, non-diagnostic guidance.

**Functions:**
- Match symptom keywords
- Return approved guidance
- Escalate emergencies immediately

**Rules:**
- Never diagnose
- Never prescribe medicine
- Always show disclaimer
- Always escalate severe symptoms

**Firebase collection suggestion:** `triage_rules`

**Fields:**
- `id`
- `symptomKeyword`
- `urgency`
- `guidance`
- `emergencyFlag`

---

### Skill 6: Visitor Guidance
**Purpose:** Answer common visitor questions.

**Functions:**
- Visiting hours
- ICU/ward restrictions
- Parking/location guidance
- Required visitor rules

Can be stored in `faqs` or in a dedicated `visitor_info` collection.

---

### Skill 7: Authentication and Role Management
**Purpose:** Control access for guest, patient, and admin users.

**Functions:**
- Register/login patient
- Login admin
- Route protection
- Role-based page access

**Firebase tools:**
- Firebase Authentication
- Firestore role mapping

---

### Skill 8: Admin Dashboard Operations
**Purpose:** Central management area for content and records.

**Functions:**
- Manage FAQs
- Manage chatbot responses
- Manage departments
- Manage appointments
- Manage contacts
- Manage users

---

## 3) Workflow

### A. Public User FAQ Workflow
1. User opens website.
2. User visits FAQ page or opens chatbot.
3. User enters a question.
4. System checks stored FAQs/keywords.
5. Matching fixed response is shown.
6. If no match exists, system shows fallback guidance.

### B. Appointment Workflow
1. Patient logs in or accesses appointment request form.
2. Patient enters appointment details.
3. System validates required fields.
4. Data is saved to Firestore.
5. Admin reviews appointment request.
6. Admin updates status (pending, approved, rejected, completed).

### C. Department Information Workflow
1. User opens Departments page or asks chatbot.
2. System retrieves department data.
3. Department description, services, and contact details are shown.

### D. Symptom Guidance Workflow
1. User enters symptom-related question.
2. System checks triage rules.
3. If symptom is mild/moderate, system shows approved guidance.
4. If symptom is severe, system shows emergency instruction.
5. System always displays non-diagnostic disclaimer.

### E. Admin Content Management Workflow
1. Admin logs in.
2. Admin opens dashboard.
3. Admin selects module (FAQ, departments, appointments, users).
4. Admin creates, edits, or deletes records.
5. Firestore updates data.
6. Updated content becomes visible on the website/chatbot.

---

## 4) Suggested Firebase Collections

- `users`
- `faqs`
- `departments`
- `appointments`
- `triage_rules`
- `contact_info`
- `chatbot_settings`

---

## 5) Suggested Folder Direction for Next.js

```txt
hospital-chatbot-system/
├── app/
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── faq/page.tsx
│   ├── departments/page.tsx
│   ├── contact/page.tsx
│   ├── login/page.tsx
│   ├── admin/page.tsx
│   └── api/
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Chatbot.tsx
│   ├── FAQList.tsx
│   ├── DepartmentCard.tsx
│   └── AppointmentForm.tsx
├── lib/
│   ├── firebase.ts
│   ├── auth.ts
│   └── chatbot.ts
├── types/
│   ├── faq.ts
│   ├── department.ts
│   ├── appointment.ts
│   └── user.ts
├── context/
│   └── root-context.yaml
└── README.md
```

---

## 6) Recommended Next Step

Create these in order:
1. `root-context.yaml`
2. Firebase schema design
3. page structure
4. chatbot matching logic
5. admin dashboard modules
6. UI wireframe

---

## 7) Default Project Decisions Used

Because the requirements were accepted as “all good,” these defaults were applied:
- Website users include guest, patient, and admin
- Doctors/nurses remain optional future users
- Triage is basic safety guidance only
- Standard demo hospital departments are included
- Admin manages FAQs, chatbot responses, departments, appointments, contact info, and users
- Patients can log in and request appointments
- Firebase is used for Authentication, Firestore, and Hosting
- Chatbot is recommended to appear across the site, especially Home and FAQ pages
