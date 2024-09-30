import { prisma } from "./prisma";

const performSeed = async () => {
  const adminUser = await prisma.user.create({
    data: {
      username: "Jhonk",
      email: "jhonyelg@gmail.com",
      role: "ADMIN",
      bio: "I like book",
      imageUrl: "",
      githubLink: "",
      LinkedInLink: "",
    },
  });
  const project1 = await prisma.project.create({
    data: {
      title: "Luanchpad",
      description: "Coded an awesome personal website for NER",
      skills: ["prisma", "typescript"],
      githuburl: "https://github.com/Jhonyel",
      userCreatedId: adminUser.id,
    },
  });

  const Project2 = await prisma.project.create({
    data: {
      title: "Homework",
      description: "car creation",
      skills: ["java", "functional Programming"],
      githuburl: "",
      userCreatedId: adminUser.id,
    },
  });

  const Project3 = await prisma.project.create({
    data: {
      title: "Homework",
      description: "car creation",
      skills: ["java", "functional Programming"],
      githuburl: "",
      userCreatedId: adminUser.id,
    },
  });

  const Exp1 = await prisma.project.create({
    data: {
      id: adminUser.id,
      title: "Nasa",
      description: "rovah",
      location: "Texas",
      imageUrl: [""],
      userCreatedId: adminUser.id,
      userCreated: adminUser,
    },
  });

  const Exp2 = await prisma.project.create({
    data: {
      id: adminUser.id,
      title: "Nasa",
      description: "rovah",
      location: "Texas",
      imageUrl: [""],
      userCreatedId: adminUser.id,
      userCreated: adminUser,
    },
  });

  const Exp3 = await prisma.project.create({
    data: {
      id: adminUser.id,
      title: "Nasa",
      description: "rovah",
      location: "Texas",
      imageUrl: [""],
      userCreatedId: adminUser.id,
      userCreated: adminUser,
    },
  });
};

performSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
