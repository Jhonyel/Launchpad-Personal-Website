export enum Role {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  title: string;
  bio: string;
  imageUrl: string;
  githubUrl: string;
  linkedInUrl: string;
}
