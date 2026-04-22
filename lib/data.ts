import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc
} from "firebase/firestore";

import { demoAppointments, demoChatbotSettings, demoContactInfo, demoDepartments, demoFaqs, demoTriageRules } from "@/lib/demo-content";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { createId } from "@/lib/utils";
import type { Appointment, AppointmentRequestInput, AppointmentStatus } from "@/types/appointment";
import type { AppUser, UserRole, UserStatus } from "@/types/user";
import type { ChatbotSettings } from "@/types/chatbot-settings";
import type { ContactInfo } from "@/types/contact-info";
import type { Department } from "@/types/department";
import type { FAQ } from "@/types/faq";
import type { TriageRule } from "@/types/triage-rule";

type TimestampLike = {
  toDate?: () => Date;
  seconds?: number;
};

function toIsoString(value: unknown, fallback = new Date().toISOString()) {
  if (!value) {
    return fallback;
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object" && value !== null) {
    const timestamp = value as TimestampLike;

    if (typeof timestamp.toDate === "function") {
      return timestamp.toDate().toISOString();
    }

    if (typeof timestamp.seconds === "number") {
      return new Date(timestamp.seconds * 1000).toISOString();
    }
  }

  return fallback;
}

function sortByUpdatedAt<T extends { updatedAt: string }>(items: T[]) {
  return [...items].sort((left, right) => {
    return right.updatedAt.localeCompare(left.updatedAt);
  });
}

function sortFaqs(items: FAQ[]) {
  return [...items].sort((left, right) => {
    if (left.priority !== right.priority) {
      return left.priority - right.priority;
    }

    return left.question.localeCompare(right.question);
  });
}

function sortDepartments(items: Department[]) {
  return [...items].sort((left, right) => left.name.localeCompare(right.name));
}

function ensureFaq(value: Partial<FAQ>, id: string): FAQ {
  const now = new Date().toISOString();

  return {
    id,
    question: value.question ?? "",
    answer: value.answer ?? "",
    category: value.category ?? "General Information",
    keywords: value.keywords ?? [],
    status: value.status ?? "active",
    priority: value.priority ?? 1,
    createdAt: toIsoString(value.createdAt, now),
    updatedAt: toIsoString(value.updatedAt, now)
  };
}

function ensureDepartment(value: Partial<Department>, id: string): Department {
  const now = new Date().toISOString();

  return {
    id,
    name: value.name ?? "",
    description: value.description ?? "",
    services: value.services ?? [],
    location: value.location ?? "",
    schedule: value.schedule ?? "",
    contactNumber: value.contactNumber ?? "",
    status: value.status ?? "active",
    createdAt: toIsoString(value.createdAt, now),
    updatedAt: toIsoString(value.updatedAt, now)
  };
}

function ensureAppointment(
  value: Partial<Appointment>,
  id: string
): Appointment {
  const now = new Date().toISOString();

  return {
    id,
    patientUid: value.patientUid ?? "",
    patientName: value.patientName ?? "",
    email: value.email ?? "",
    phone: value.phone ?? "",
    department: value.department ?? "",
    preferredDate: value.preferredDate ?? "",
    message: value.message ?? "",
    status: value.status ?? "pending",
    createdAt: toIsoString(value.createdAt, now),
    updatedAt: toIsoString(value.updatedAt, now)
  };
}

function ensureTriageRule(value: Partial<TriageRule>, id: string): TriageRule {
  const now = new Date().toISOString();

  return {
    id,
    symptomKeyword: value.symptomKeyword ?? "",
    urgency: value.urgency ?? "low",
    guidance: value.guidance ?? "",
    emergencyFlag: value.emergencyFlag ?? false,
    disclaimer: value.disclaimer ?? "",
    status: value.status ?? "active",
    createdAt: toIsoString(value.createdAt, now),
    updatedAt: toIsoString(value.updatedAt, now)
  };
}

function ensureContactInfo(value: Partial<ContactInfo>, id: string): ContactInfo {
  return {
    id,
    hospitalName: value.hospitalName ?? "",
    phone: value.phone ?? "",
    email: value.email ?? "",
    address: value.address ?? "",
    mapLink: value.mapLink ?? "",
    workingHours: value.workingHours ?? "",
    updatedAt: toIsoString(value.updatedAt)
  };
}

function ensureChatbotSettings(
  value: Partial<ChatbotSettings>,
  id: string
): ChatbotSettings {
  return {
    id,
    name: value.name ?? "",
    fallbackMessage: value.fallbackMessage ?? "",
    disclaimerMessage: value.disclaimerMessage ?? "",
    isActive: value.isActive ?? true,
    updatedAt: toIsoString(value.updatedAt)
  };
}

function ensureUser(value: Partial<AppUser>, id: string): AppUser {
  const now = new Date().toISOString();

  return {
    uid: value.uid ?? id,
    fullName: value.fullName ?? "",
    email: value.email ?? "",
    role: value.role ?? "patient",
    phone: value.phone ?? "",
    createdAt: toIsoString(value.createdAt, now),
    updatedAt: toIsoString(value.updatedAt, now),
    status: value.status ?? "active"
  };
}

async function readCollection<T>(
  collectionName: string,
  fallback: T[],
  mapper: (value: Record<string, unknown>, id: string) => T
) {
  if (!db || !isFirebaseConfigured) {
    return fallback;
  }

  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((item) =>
    mapper(item.data() as Record<string, unknown>, item.id)
  );
}

export async function getFaqs(includeInactive = false) {
  const faqs = await readCollection<FAQ>("faqs", demoFaqs, (value, id) =>
    ensureFaq(value as Partial<FAQ>, id)
  );
  const filtered = includeInactive
    ? faqs
    : faqs.filter((faq) => faq.status === "active");

  return sortFaqs(filtered);
}

export async function saveFaq(faq: FAQ) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to save FAQ records.");
  }

  const existing = await getDoc(doc(db, "faqs", faq.id));
  const payload = {
    ...faq,
    createdAt: existing.exists() ? existing.data().createdAt ?? faq.createdAt : faq.createdAt,
    updatedAt: new Date().toISOString()
  };

  await setDoc(doc(db, "faqs", faq.id), payload);
}

export async function deleteFaq(id: string) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to delete FAQ records.");
  }

  await deleteDoc(doc(db, "faqs", id));
}

export async function getDepartments(includeInactive = false) {
  const departments = await readCollection<Department>(
    "departments",
    demoDepartments,
    (value, id) => ensureDepartment(value as Partial<Department>, id)
  );
  const filtered = includeInactive
    ? departments
    : departments.filter((department) => department.status === "active");

  return sortDepartments(filtered);
}

export async function saveDepartment(department: Department) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to save department records.");
  }

  const existing = await getDoc(doc(db, "departments", department.id));
  const payload = {
    ...department,
    createdAt: existing.exists()
      ? existing.data().createdAt ?? department.createdAt
      : department.createdAt,
    updatedAt: new Date().toISOString()
  };

  await setDoc(doc(db, "departments", department.id), payload);
}

export async function deleteDepartment(id: string) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to delete department records.");
  }

  await deleteDoc(doc(db, "departments", id));
}

export async function getTriageRules(includeInactive = false) {
  const rules = await readCollection<TriageRule>(
    "triage_rules",
    demoTriageRules,
    (value, id) => ensureTriageRule(value as Partial<TriageRule>, id)
  );
  const filtered = includeInactive
    ? rules
    : rules.filter((rule) => rule.status === "active");

  return sortByUpdatedAt(filtered);
}

export async function saveTriageRule(rule: TriageRule) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to save triage rules.");
  }

  const existing = await getDoc(doc(db, "triage_rules", rule.id));
  const payload = {
    ...rule,
    createdAt: existing.exists() ? existing.data().createdAt ?? rule.createdAt : rule.createdAt,
    updatedAt: new Date().toISOString()
  };

  await setDoc(doc(db, "triage_rules", rule.id), payload);
}

export async function deleteTriageRule(id: string) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to delete triage rules.");
  }

  await deleteDoc(doc(db, "triage_rules", id));
}

export async function getContactInfo() {
  if (!db || !isFirebaseConfigured) {
    return demoContactInfo;
  }

  const snapshot = await getDocs(collection(db, "contact_info"));
  const firstRecord = snapshot.docs[0];

  if (!firstRecord) {
    return demoContactInfo;
  }

  return ensureContactInfo(
    firstRecord.data() as Partial<ContactInfo>,
    firstRecord.id
  );
}

export async function saveContactInfo(contactInfo: ContactInfo) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to save contact information.");
  }

  await setDoc(doc(db, "contact_info", contactInfo.id), {
    ...contactInfo,
    updatedAt: new Date().toISOString()
  });
}

export async function getChatbotSettings() {
  if (!db || !isFirebaseConfigured) {
    return demoChatbotSettings;
  }

  const snapshot = await getDocs(collection(db, "chatbot_settings"));
  const firstRecord = snapshot.docs[0];

  if (!firstRecord) {
    return demoChatbotSettings;
  }

  return ensureChatbotSettings(
    firstRecord.data() as Partial<ChatbotSettings>,
    firstRecord.id
  );
}

export async function saveChatbotSettings(settings: ChatbotSettings) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to save chatbot settings.");
  }

  await setDoc(doc(db, "chatbot_settings", settings.id), {
    ...settings,
    updatedAt: new Date().toISOString()
  });
}

export async function getAppointments() {
  const appointments = await readCollection<Appointment>(
    "appointments",
    demoAppointments,
    (value, id) => ensureAppointment(value as Partial<Appointment>, id)
  );

  return sortByUpdatedAt(appointments);
}

export async function submitAppointmentRequest(
  input: AppointmentRequestInput
) {
  const now = new Date().toISOString();
  const appointment: Appointment = {
    id: createId("appt"),
    patientUid: input.patientUid,
    patientName: input.patientName,
    email: input.email,
    phone: input.phone,
    department: input.department,
    preferredDate: input.preferredDate,
    message: input.message,
    status: "pending",
    createdAt: now,
    updatedAt: now
  };

  if (!db || !isFirebaseConfigured) {
    return {
      appointment,
      demoMode: true
    };
  }

  await setDoc(doc(db, "appointments", appointment.id), appointment);

  return {
    appointment,
    demoMode: false
  };
}

export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus
) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to update appointments.");
  }

  const snapshot = await getDoc(doc(db, "appointments", appointmentId));

  if (!snapshot.exists()) {
    throw new Error("Appointment not found.");
  }

  await setDoc(
    doc(db, "appointments", appointmentId),
    {
      ...snapshot.data(),
      status,
      updatedAt: new Date().toISOString()
    },
    { merge: true }
  );
}

export async function getUsers() {
  return readCollection<AppUser>("users", [], (value, id) =>
    ensureUser(value as Partial<AppUser>, id)
  );
}

export async function saveUser(user: AppUser) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to save user profiles.");
  }

  await setDoc(
    doc(db, "users", user.uid),
    {
      ...user,
      updatedAt: new Date().toISOString()
    },
    { merge: true }
  );
}

export async function updateUserRole(
  userId: string,
  role: UserRole,
  status: UserStatus
) {
  if (!db || !isFirebaseConfigured) {
    throw new Error("Firebase is required to update users.");
  }

  const snapshot = await getDoc(doc(db, "users", userId));

  if (!snapshot.exists()) {
    throw new Error("User not found.");
  }

  await setDoc(
    doc(db, "users", userId),
    {
      ...snapshot.data(),
      role,
      status,
      updatedAt: new Date().toISOString()
    },
    { merge: true }
  );
}
