import { User } from "shared";

export interface Auth {
  user: User | undefined;
  signIn: (userId: string) => Promise<User>;
  signout: () => void;
  isLoading: boolean;
}
