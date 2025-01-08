import { User } from "./user.types";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  url: string;
  skills: string[];
  creator: User;
}
