import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db, getFirebaseSetupMessage, isFirebaseConfigured } from "@/lib/firebase";
import type { AppUser } from "@/types/user";

export interface RegisterPatientInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

function normalizeTimestamp(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object" && value !== null && "toDate" in value) {
    const candidate = value as { toDate?: () => Date };
    return candidate.toDate ? candidate.toDate().toISOString() : new Date().toISOString();
  }

  return new Date().toISOString();
}

function mapUserProfile(value: Record<string, unknown>, uid: string): AppUser {
  return {
    uid,
    fullName: String(value.fullName ?? ""),
    email: String(value.email ?? ""),
    role: (value.role as AppUser["role"]) ?? "patient",
    phone: String(value.phone ?? ""),
    createdAt: normalizeTimestamp(value.createdAt),
    updatedAt: normalizeTimestamp(value.updatedAt),
    status: (value.status as AppUser["status"]) ?? "active"
  };
}

export async function registerPatient(input: RegisterPatientInput) {
  if (!auth || !db || !isFirebaseConfigured) {
    throw new Error(getFirebaseSetupMessage());
  }

  const credentials = await createUserWithEmailAndPassword(
    auth,
    input.email,
    input.password
  );

  if (input.fullName.trim()) {
    await updateProfile(credentials.user, {
      displayName: input.fullName.trim()
    });
  }

  const now = new Date().toISOString();
  const profile: AppUser = {
    uid: credentials.user.uid,
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    role: "patient",
    phone: input.phone.trim(),
    createdAt: now,
    updatedAt: now,
    status: "active"
  };

  await setDoc(doc(db, "users", credentials.user.uid), profile);

  return profile;
}

export async function signInUser(email: string, password: string) {
  if (!auth || !isFirebaseConfigured) {
    throw new Error(getFirebaseSetupMessage());
  }

  const credentials = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  return credentials.user;
}

export async function getUserProfile(uid: string) {
  if (!db || !isFirebaseConfigured) {
    return null;
  }

  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) {
    return null;
  }

  return mapUserProfile(snapshot.data() as Record<string, unknown>, uid);
}

export async function logoutUser() {
  if (!auth) {
    return;
  }

  await signOut(auth);
}
