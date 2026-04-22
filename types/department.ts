export interface Department {
  id: string;
  name: string;
  description: string;
  services: string[];
  location: string;
  schedule: string;
  contactNumber: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
