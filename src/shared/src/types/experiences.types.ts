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
