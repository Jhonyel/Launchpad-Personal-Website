import { User } from "shared";
import { prisma } from "../prisma/prisma";
import { userTransformer } from "../transformers/user.transformer";

export default class userServices {
  static async getUsers(): Promise<User[]> {
    const User = await prisma.user.findMany({});
    return User.map(userTransformer);
  }
}
