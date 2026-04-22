import seedFaqs from "@/data/seed-faqs.json";
import seedTriageRules from "@/data/seed-triage-rules.json";
import type { Appointment } from "@/types/appointment";
import type { ChatbotSettings } from "@/types/chatbot-settings";
import type { ContactInfo } from "@/types/contact-info";
import type { Department } from "@/types/department";
import type { FAQ } from "@/types/faq";
import type { TriageRule } from "@/types/triage-rule";

export const demoFaqs = seedFaqs as FAQ[];
export const demoTriageRules = seedTriageRules as TriageRule[];

export const demoDepartments: Department[] = [
  {
    id: "dept_001",
    name: "Emergency",
    description:
      "Provides immediate care for urgent and life-threatening concerns with 24/7 access.",
    services: ["Emergency intake", "Trauma response", "Rapid assessment"],
    location: "Ground Floor, Main Entrance Wing",
    schedule: "Open 24/7",
    contactNumber: "+63 912 000 1001",
    status: "active",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  },
  {
    id: "dept_002",
    name: "Cardiology",
    description:
      "Supports preventive heart care, diagnostics, consultations, and outpatient review.",
    services: ["ECG", "Heart consultations", "Cardiac follow-up"],
    location: "Building A, Level 2",
    schedule: "Monday to Saturday, 8:00 AM to 5:00 PM",
    contactNumber: "+63 912 000 1002",
    status: "active",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  },
  {
    id: "dept_003",
    name: "Pediatrics",
    description:
      "Delivers child-focused consultations, developmental checks, and family guidance.",
    services: ["Pediatric consults", "Vaccination counseling", "Wellness visits"],
    location: "Building B, Level 1",
    schedule: "Monday to Saturday, 9:00 AM to 5:00 PM",
    contactNumber: "+63 912 000 1003",
    status: "active",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  },
  {
    id: "dept_004",
    name: "Orthopedics",
    description:
      "Handles bone, joint, sports injury, and mobility-related outpatient services.",
    services: ["Orthopedic consults", "Fracture follow-up", "Mobility assessment"],
    location: "Building B, Level 2",
    schedule: "Monday to Friday, 8:00 AM to 5:00 PM",
    contactNumber: "+63 912 000 1004",
    status: "active",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  },
  {
    id: "dept_005",
    name: "Neurology",
    description:
      "Offers specialist consultations for neurological symptoms and referral planning.",
    services: ["Neurology consults", "Follow-up review", "Referral coordination"],
    location: "Building C, Level 3",
    schedule: "Monday to Friday, 9:00 AM to 4:00 PM",
    contactNumber: "+63 912 000 1005",
    status: "active",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  },
  {
    id: "dept_006",
    name: "Radiology",
    description:
      "Supports imaging requests and scheduled diagnostic scans during service hours.",
    services: ["X-ray", "Ultrasound", "Imaging support"],
    location: "Building A, Level 1",
    schedule: "Monday to Saturday, 8:00 AM to 6:00 PM",
    contactNumber: "+63 912 000 1006",
    status: "active",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  },
  {
    id: "dept_007",
    name: "Pharmacy",
    description:
      "Dispenses approved prescriptions and helps patients understand medicine pickup hours.",
    services: ["Prescription dispensing", "Medication pickup", "Weekend service"],
    location: "Main Lobby, Right Wing",
    schedule: "Daily, 9:00 AM to 5:00 PM",
    contactNumber: "+63 912 000 1007",
    status: "active",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  },
  {
    id: "dept_008",
    name: "Laboratory",
    description:
      "Provides diagnostic sample collection and test-processing support for referred patients.",
    services: ["Blood tests", "Sample collection", "Diagnostic support"],
    location: "Building A, Level 1",
    schedule: "Monday to Saturday, 7:00 AM to 5:00 PM",
    contactNumber: "+63 912 000 1008",
    status: "active",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  },
  {
    id: "dept_009",
    name: "Internal Medicine",
    description:
      "Coordinates adult outpatient consultations and general physician-led care planning.",
    services: ["Consultation", "Follow-up visits", "Care coordination"],
    location: "Building C, Level 2",
    schedule: "Monday to Friday, 8:00 AM to 5:00 PM",
    contactNumber: "+63 912 000 1009",
    status: "active",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  },
  {
    id: "dept_010",
    name: "Outpatient Services",
    description:
      "Acts as the central point for routine consultations and scheduled non-emergency visits.",
    services: ["Consultation routing", "Scheduled visits", "Patient coordination"],
    location: "Main Building, Level 2",
    schedule: "Monday to Saturday, 8:00 AM to 5:00 PM",
    contactNumber: "+63 912 000 1010",
    status: "active",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  }
];

export const demoContactInfo: ContactInfo = {
  id: "contact_main",
  hospitalName: "Harborview Demo Hospital",
  phone: "+63 912 123 4567",
  email: "hello@harborview-demo-hospital.test",
  address: "123 Harborview Avenue, Sample City, Demo Province",
  mapLink: "https://maps.google.com/?q=Harborview+Demo+Hospital",
  workingHours: "Daily, 8:00 AM to 8:00 PM. Emergency department open 24/7.",
  updatedAt: "2026-04-22T00:00:00.000Z"
};

export const demoChatbotSettings: ChatbotSettings = {
  id: "chatbot_main",
  name: "Harborview FAQ Assistant",
  fallbackMessage:
    "Sorry, I could not find a strong match for that question. Please review the FAQ page or contact the hospital directly.",
  disclaimerMessage:
    "This chatbot only shares general hospital information and safety-based guidance. It does not provide diagnosis or prescriptions.",
  isActive: true,
  updatedAt: "2026-04-22T00:00:00.000Z"
};

export const demoAppointments: Appointment[] = [
  {
    id: "appt_demo_001",
    patientUid: "demo-patient-1",
    patientName: "Demo Patient",
    email: "patient@example.com",
    phone: "+63 900 000 0000",
    department: "Cardiology",
    preferredDate: "2026-05-12",
    message: "Weekend chest follow-up request.",
    status: "pending",
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z"
  }
];

export const sampleQuestions = [
  "How do I book an appointment?",
  "What are your opening hours?",
  "What are the visiting hours?",
  "Where is the emergency department?",
  "What should I do if I have chest pain?"
];
