import { prisma } from "../prisma/prisma";
import { Experience, User } from "shared";
import { experienceTransformer } from "../transformers/experience.transformer";
import {
  AccessDeniedException,
  DeletedException,
  NotFoundException,
} from "../utils/error.utils";
import { experienceQueryArgs } from "../prisma-query-args/experience.query-args";

export default class ExperiencesServices {
  static async getExperiences(): Promise<Experience[]> {
    const experiences = await prisma.experience.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        creator: true,
      },
    });
    return experiences.map(experienceTransformer);
  }
  static async createExperience(
    title: string,
    description: string,
    companyName: string,
    location: string,
    user: User
  ): Promise<Experience> {
    if (user.role !== "ADMIN") {
      throw new AccessDeniedException("only admins can create experiences");
    }
    const experience = await prisma.experience.create({
      data: {
        title,
        description,
        companyName,
        location,
        creator: {
          connect: {
            id: user.id,
          },
        },
      },
      ...experienceQueryArgs,
    });
    return experienceTransformer(experience);
  }
  static async updateExperience(
    title: string,
    description: string,
    companyName: string,
    location: string,
    user: User,
    id: string
  ): Promise<Experience> {
    const experience = await prisma.experience.findUnique({
      where: {
        id,
      },
      ...experienceQueryArgs,
    });
    if (!experience) {
      throw new NotFoundException("Experience", id);
    }
    if (experience.deletedAt) {
      throw new DeletedException("Experience", id);
    }
    if (experience.creatorId != user.id) {
      throw new AccessDeniedException(
        "only the creator of an experience can update it"
      );
    }
    const updatedExperience = await prisma.experience.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        companyName,
        location,
      },
      ...experienceQueryArgs,
    });
    return experienceTransformer(updatedExperience);
  }
}
