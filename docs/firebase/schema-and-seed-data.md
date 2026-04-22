# Firebase Schema and FAQ Seed Data

## 1) Firebase Schema

### Firestore Collections

---

### `users`
Stores user account and role information.

```json
{
  "uid": "auto_from_firebase_auth",
  "fullName": "Juan Dela Cruz",
  "email": "juan@example.com",
  "role": "patient",
  "phone": "+63 912 345 6789",
  "createdAt": "serverTimestamp()",
  "updatedAt": "serverTimestamp()",
  "status": "active"
}
```

Fields:
- `uid`: Firebase Auth user ID
- `fullName`: full name of the user
- `email`: email address
- `role`: `guest | patient | admin`
- `phone`: contact number
- `createdAt`: creation timestamp
- `updatedAt`: update timestamp
- `status`: `active | inactive`

---

### `faqs`
Stores chatbot and FAQ page responses.

```json
{
  "id": "faq_001",
  "question": "How do I book an appointment?",
  "answer": "You can book an appointment by logging into your patient account, going to the appointment section, and submitting your preferred department and date.",
  "category": "Appointments",
  "keywords": ["appointment", "book", "schedule", "doctor"],
  "status": "active",
  "priority": 1,
  "createdAt": "serverTimestamp()",
  "updatedAt": "serverTimestamp()"
}
```

Fields:
- `id`: custom FAQ ID
- `question`: FAQ question
- `answer`: fixed chatbot answer
- `category`: FAQ category
- `keywords`: matching keywords array
- `status`: `active | inactive`
- `priority`: ranking if multiple matches exist
- `createdAt`: creation timestamp
- `updatedAt`: update timestamp

---

### `departments`
Stores hospital department details.

```json
{
  "id": "dept_001",
  "name": "Cardiology",
  "description": "Provides diagnosis and treatment for heart-related conditions.",
  "services": ["ECG", "Heart Checkup", "Consultation"],
  "location": "Building A, 2nd Floor",
  "schedule": "Monday to Saturday, 8:00 AM to 5:00 PM",
  "contactNumber": "+63 912 000 1111",
  "status": "active",
  "createdAt": "serverTimestamp()",
  "updatedAt": "serverTimestamp()"
}
```

---

### `appointments`
Stores patient appointment requests.

```json
{
  "id": "appt_001",
  "patientUid": "firebase_user_uid",
  "patientName": "Juan Dela Cruz",
  "email": "juan@example.com",
  "phone": "+63 912 345 6789",
  "department": "Cardiology",
  "preferredDate": "2026-05-10",
  "message": "I would like to request a consultation.",
  "status": "pending",
  "createdAt": "serverTimestamp()",
  "updatedAt": "serverTimestamp()"
}
```

Fields:
- `status`: `pending | approved | rejected | completed | cancelled`

---

### `triage_rules`
Stores fixed symptom guidance rules.

```json
{
  "id": "triage_001",
  "symptomKeyword": "chest pain",
  "urgency": "emergency",
  "guidance": "If you are experiencing chest pain, go to the emergency department immediately or contact emergency services.",
  "emergencyFlag": true,
  "disclaimer": "This chatbot does not provide medical diagnosis. Please seek immediate medical attention for severe symptoms.",
  "status": "active",
  "createdAt": "serverTimestamp()",
  "updatedAt": "serverTimestamp()"
}
```

---

### `contact_info`
Stores hospital contact details.

```json
{
  "id": "contact_main",
  "hospitalName": "Hospital Chatbot System",
  "phone": "+63 912 123 4567",
  "email": "info@hospitalchatbot.demo",
  "address": "123 Demo Hospital Avenue, Sample City",
  "mapLink": "https://maps.google.com/",
  "workingHours": "Monday to Sunday, 8:00 AM to 8:00 PM",
  "updatedAt": "serverTimestamp()"
}
```

---

### `chatbot_settings`
Stores chatbot behavior settings.

```json
{
  "id": "main_chatbot",
  "name": "Hospital FAQ Bot",
  "fallbackMessage": "Sorry, I could not find an exact answer. Please check the FAQ page or contact the hospital directly.",
  "disclaimerMessage": "This chatbot provides general hospital information only and does not provide medical diagnosis.",
  "isActive": true,
  "updatedAt": "serverTimestamp()"
}
```

---

## 2) Suggested Firestore Security Logic

### Rules idea
- Guests: read public FAQ, departments, and contact info
- Patients: read public data, create appointment requests, read their own profile
- Admins: full read/write access to management collections

Suggested protected collections:
- `users`
- `appointments`
- `triage_rules`
- `chatbot_settings`

Public-readable collections:
- `faqs`
- `departments`
- `contact_info`

---

## 3) FAQ Seed Data

Use this as starter data for the `faqs` collection.

```json
[
  {
    "id": "faq_001",
    "question": "How do I book an appointment?",
    "answer": "You can book an appointment by logging into your patient account, opening the appointment section, and submitting your preferred department and date.",
    "category": "Appointments",
    "keywords": ["appointment", "book", "schedule", "doctor"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_002",
    "question": "What are your opening hours?",
    "answer": "Our hospital is open daily from 8:00 AM to 8:00 PM. Emergency services are available 24/7.",
    "category": "General Information",
    "keywords": ["hours", "open", "opening hours", "schedule"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_003",
    "question": "What are the visiting hours?",
    "answer": "Visiting hours are from 10:00 AM to 6:00 PM daily. Some departments may have special visitor restrictions.",
    "category": "Visitors",
    "keywords": ["visiting", "visitor", "hours", "visit"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_004",
    "question": "Where is the emergency department?",
    "answer": "The emergency department is located on the ground floor near the main entrance and is open 24/7.",
    "category": "Emergency",
    "keywords": ["emergency", "er", "ed", "location"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_005",
    "question": "What services does the cardiology department offer?",
    "answer": "The cardiology department provides heart consultations, ECG services, cardiac assessments, and follow-up care.",
    "category": "Departments",
    "keywords": ["cardiology", "heart", "services", "department"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_006",
    "question": "How can I contact the hospital?",
    "answer": "You can contact the hospital by phone at +63 912 123 4567 or email at info@hospitalchatbot.demo.",
    "category": "Contact and Location",
    "keywords": ["contact", "phone", "email", "call"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_007",
    "question": "Do I need an account to request an appointment?",
    "answer": "Yes. Patients need to log in to their account before submitting an appointment request.",
    "category": "Appointments",
    "keywords": ["account", "login", "appointment", "request"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_008",
    "question": "Where is the laboratory located?",
    "answer": "The laboratory is located on the first floor beside the radiology department.",
    "category": "Laboratory",
    "keywords": ["laboratory", "lab", "location", "test"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_009",
    "question": "Is the pharmacy open on weekends?",
    "answer": "Yes. The pharmacy is open on weekends from 9:00 AM to 5:00 PM.",
    "category": "Pharmacy",
    "keywords": ["pharmacy", "weekends", "open", "medicine"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_010",
    "question": "What should I do if I have chest pain?",
    "answer": "If you are experiencing chest pain, go to the emergency department immediately or contact emergency services. This chatbot does not provide medical diagnosis.",
    "category": "Symptom Guidance",
    "keywords": ["chest pain", "pain", "emergency", "heart"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_011",
    "question": "Can visitors enter the ICU?",
    "answer": "ICU visits may be limited and are subject to hospital policy. Please contact the front desk or nursing station before visiting.",
    "category": "Visitors",
    "keywords": ["icu", "visitor", "visit", "restriction"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_012",
    "question": "How do I log in as a patient?",
    "answer": "Go to the Login page, enter your registered email and password, then select patient access.",
    "category": "General Information",
    "keywords": ["login", "patient", "sign in", "account"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_013",
    "question": "Can I cancel or reschedule my appointment?",
    "answer": "Yes. You can cancel or request a reschedule from your patient account or by contacting hospital support.",
    "category": "Appointments",
    "keywords": ["cancel", "reschedule", "appointment", "change"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_014",
    "question": "What departments are available in the hospital?",
    "answer": "Our available departments include Emergency, Cardiology, Pediatrics, Orthopedics, Neurology, Radiology, Pharmacy, Laboratory, Internal Medicine, and Outpatient Services.",
    "category": "Departments",
    "keywords": ["departments", "available", "services", "hospital"],
    "status": "active",
    "priority": 1
  },
  {
    "id": "faq_015",
    "question": "Who can access the admin panel?",
    "answer": "Only authorized admin users can access the admin panel.",
    "category": "General Information",
    "keywords": ["admin", "panel", "access", "administrator"],
    "status": "active",
    "priority": 1
  }
]
```

---

## 4) Optional Seed Data for `triage_rules`

```json
[
  {
    "id": "triage_001",
    "symptomKeyword": "chest pain",
    "urgency": "emergency",
    "guidance": "Go to the emergency department immediately or contact emergency services.",
    "emergencyFlag": true,
    "disclaimer": "This chatbot does not provide medical diagnosis.",
    "status": "active"
  },
  {
    "id": "triage_002",
    "symptomKeyword": "difficulty breathing",
    "urgency": "emergency",
    "guidance": "Seek emergency medical help immediately.",
    "emergencyFlag": true,
    "disclaimer": "This chatbot does not provide medical diagnosis.",
    "status": "active"
  },
  {
    "id": "triage_003",
    "symptomKeyword": "fever",
    "urgency": "moderate",
    "guidance": "Please monitor your temperature and consult a doctor if symptoms worsen or persist.",
    "emergencyFlag": false,
    "disclaimer": "This chatbot does not provide medical diagnosis.",
    "status": "active"
  }
]
```

---

## 5) Recommended Next Files

After this, the most useful next files are:
- `firestore.rules`
- `firebase.ts`
- `seed-faqs.json`
- `seed-triage-rules.json`
- `chatbot.ts` matching logic
