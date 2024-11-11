import { prisma } from "../prisma/prisma";
import { Experience } from "shared";
import { experienceTransformer } from "../transformers/experience.transformer";
import { User } from "@prisma/client";
import { AccessDeniedException } from "../utils/error.utils";
import { experienceQueryArgs } from "../prisma-query-args/experience.query-args";

export default class ExperiencesServices {
  static async getExperiences(): Promise<Experience[]> {
    const Experience = await prisma.experience.findMany({
      where: {
        dateDeleted: null,
      },
      include: {
        userCreated: true,
      },
    });
    return Experience.map(experienceTransformer);
  }

  static async createExperience(
    title: string,
    description: string,
    companyName: string,
    location: string,
    startDate: Date,
    endDate: Date,
    user: User
  ): Promise<Experience> {
    if (user.role !== "ADMIN")
      throw new AccessDeniedException("Only Admins Can Create Experiences");

    const experience = await prisma.experience.create({
      data: {
        title,
        description,
        companyName,
        location,
        startDate,
        endDate,
        userCreated: {
          connect: {
            id: user.id,
          },
        },
      },
      ...experienceQueryArgs,
    });

    return experienceTransformer(experience);
  }
}
