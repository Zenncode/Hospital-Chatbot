export type TriageUrgency = "low" | "moderate" | "emergency";

export interface TriageRule {
  id: string;
  symptomKeyword: string;
  urgency: TriageUrgency;
  guidance: string;
  emergencyFlag: boolean;
  disclaimer: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
