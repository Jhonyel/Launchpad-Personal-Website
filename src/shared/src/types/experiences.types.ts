import { User } from "./user.types";

export interface Experience {
  id: String;
  title: String;
  description: String;
  companyName: String;
  location: String;
  imageUrl: String[];
  creator: User;
}
