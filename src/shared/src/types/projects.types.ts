import { User } from "./user.types";

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  skills: string[];
  githubUrl: string;
  creator: User;
}
