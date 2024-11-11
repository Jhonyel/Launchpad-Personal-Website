import { User } from "./user.types";

export interface Project {
  id: String;
  title: String;
  description: String;
  imageUrls: String[];
  url: String;
  skills: String[];
  creator: User;
}
