import { prisma } from "../prisma/prisma";
import { Experience } from "shared";
import { experienceTransformer } from "../transformers/experience.transformer";

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
}
