import { prisma } from "./prisma";

const performSeed = async () => {
  // create an admin user in our database
  const adminUser = await prisma.user.create({
    data: {
      username: "Jhonyel Galvis",
      email: "jhonyelg@gmail.com",
      role: "ADMIN",
      bio: "2nd year CS student at Northeastern University",
      imageUrl: "",
      githubUrl: "https://github.com/Jhonyel",
      linkedInUrl: "https://www.linkedin.com/in/jhonyel-galvis/",
      title: "Student",
    },
  });
  const project1 = await prisma.project.create({
    data: {
      title: "Launchpad personal website",
      description: "Created a personal website",
      skills: ["Prisma", "Typescript"],
      githubUrl: "https://github.com/Jhonyel/Launchpad-Personal-Website",
      creatorId: adminUser.id,
    },
  });
  const project2 = await prisma.project.create({
    data: {
      title: "",
      description: "",
      skills: ["React", "Supabase"],
      githubUrl: "https://github.com/hack-the-us-government",
      creatorId: adminUser.id,
    },
  });
  const experience1 = await prisma.experience.create({
    data: {
      title: "Software Developer",
      description: "Created a personal website",
      companyName: "Northeastern Electric Racing",
      location: "Boston",
      startDate: new Date("2024-09-01"),
      creatorId: adminUser.id,
    },
  });
  const experience2 = await prisma.experience.create({
    data: {
      title: "Software Developer",
      description: "",
      companyName: "",
      location: "",
      creatorId: adminUser.id,
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
