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
      username: "Jhonyel Galvis",
      email: "jhonyelg@gmail.com",
      role: isAdmin ? "ADMIN" : "GUEST",
      bio: "i love picking pickles",
      imageUrl: "",
      githubUrl: "https://github.com/Jhonyel",
      linkedInUrl: "https://www.linkedin.com/in/jhonyel-galvis/",
      title: "chief pickle picker",
    },
  });
  return user;
};
