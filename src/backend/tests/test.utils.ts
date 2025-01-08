import { User } from "@prisma/client";
import { prisma } from "../src/prisma/prisma";

export const clearDatabase = async () => {
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.user.deleteMany();
};
export const createTestUser = async (isAdmin = true): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      username: "Jhonk",
      email: "jhonyelg@gmail.com",
      role: isAdmin ? "ADMIN" : "GUEST",
      title: "Manager",
      bio: "I like book",
      imageUrl: "",
      githubLink: "",
      LinkedInLink: "",
    },
  });
  return user;
};
