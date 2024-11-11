import { User } from "shared";
import { prisma } from "../prisma/prisma";
import { userTransformer } from "../transformers/user.transformer";
import { userQueryArgs } from "../prisma-query-args/user-query-args";
import { NotFoundException } from "../utils/error.utils";

export default class userServices {
  static async getUsers(): Promise<User[]> {
    const User = await prisma.user.findMany({});
    return User.map(userTransformer);
  }

  static async login(userId: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      ...userQueryArgs,
    });

    if (!user) throw new NotFoundException("User", userId);

    return userTransformer(user);
  }
}
