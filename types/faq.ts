export type FAQCategory =
  | "General Information"
  | "Appointments"
  | "Departments"
  | "Visitors"
  | "Emergency"
  | "Billing and Insurance"
  | "Laboratory"
  | "Pharmacy"
  | "Contact and Location"
  | "Symptom Guidance";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  keywords: string[];
  status: "active" | "inactive";
  priority: number;
  createdAt: string;
  updatedAt: string;
}
