import { Role, User } from "shared";
import { prisma } from "../prisma/prisma";
import { userTransformer } from "../transformers/user.transformer";
import { AccessDeniedException, NotFoundException } from "../utils/error.utils";
import { userQueryArgs } from "../prisma-query-args/user-query-args";

export default class UserServices {
  static async getUsers(): Promise<User[]> {
    // get all the users.
    // are there any filters that we need to pass in?
    // are there any users we don't want to return?
    const users = await prisma.user.findMany();
    return users.map(userTransformer);
  }
  static async createUser(
    username: string,
    email: string,
    role: Role,
    title: string,
    bio: string,
    imageUrl: string,
    githubUrl: string,
    linkedInUrl: string
  ): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        role,
        title,
        bio,
        imageUrl,
        githubUrl,
        linkedInUrl,
      },
    });
    return userTransformer(createdUser);
  }
  static async updateUser(
    username: string,
    email: string,
    role: Role,
    title: string,
    bio: string,
    imageUrl: string,
    githubUrl: string,
    linkedInUrl: string,
    userId: string
  ): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email,
        role,
        title,
        bio,
        imageUrl,
        githubUrl,
        linkedInUrl,
      },
    });
    if (!user) {
      throw new NotFoundException("User", userId);
    }
    return userTransformer(user);
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
