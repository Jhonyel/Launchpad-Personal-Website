import { User } from "./user.types";

export interface Experience {
  id: string;
  title: string;
  description: string;
  companyName: string;
  location: string;
  imageUrls: string[];
  creator: User;
}

export interface ExperiencePreview {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string; // or Date, depending on your use case
  endDate: string; // or Date, depending on your use case
  description: string;
}
