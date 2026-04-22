export type UserRole = "guest" | "patient" | "admin";
export type UserStatus = "active" | "inactive";

export interface AppUser {
  uid: string;
  fullName: string;
  email: string;
  role: UserRole;
  phone: string;
  createdAt: string;
  updatedAt: string;
  status: UserStatus;
}
