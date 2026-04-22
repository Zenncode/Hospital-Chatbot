export type AppointmentStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled";

export interface Appointment {
  id: string;
  patientUid: string;
  patientName: string;
  email: string;
  phone: string;
  department: string;
  preferredDate: string;
  message: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentRequestInput {
  patientUid: string;
  patientName: string;
  email: string;
  phone: string;
  department: string;
  preferredDate: string;
  message: string;
}
