export enum Role {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}

export interface User {
  id: String;
  email: String;
  username: String;
  role: Role;
  title: String;
  bio: String;
  imageUrl: String;
  githubLink: String;
  linkedInLink: String;
}
