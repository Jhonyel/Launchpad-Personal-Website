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

export interface ProjectPreview {
  id: string;
  title: string;
  description: string;
  imageUrls: string[];
  skills: string[];
  githubUrl: string;
  createdAt: string; // or Date, depending on your needs
  updatedAt: string; // or Date, depending on your needs
}
