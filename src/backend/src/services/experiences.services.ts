import { prisma } from "../prisma/prisma";
import { Experience } from "shared";
import { experienceTransformer } from "../transformers/experience.transformer";
import { User } from "@prisma/client";
import {
  AccessDeniedException,
  DeletedException,
  NotFoundException,
} from "../utils/error.utils";
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
    user: User,
    filePaths: string[]
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
        imageUrl: filePaths,
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
    startDate: Date,
    endDate: Date,
    user: User,
    experienceId: string,
    filePaths: string[]
  ): Promise<Experience> {
    const experience = await prisma.experience.findUnique({
      where: {
        id: experienceId,
      },
      ...experienceQueryArgs,
    });

    if (!experience) throw new NotFoundException("Experience", experienceId);
    if (experience.dateDeleted)
      throw new DeletedException("Experience", experienceId);

    if (experience.userCreated.id !== user.id)
      throw new AccessDeniedException(
        "Only the creator of an experience can edit the experience"
      );

    const updatedExperience = await prisma.experience.update({
      where: {
        id: experienceId,
      },
      data: {
        title,
        description,
        companyName,
        location,
        startDate,
        endDate,
        imageUrl: filePaths,
      },
      ...experienceQueryArgs,
    });

    return experienceTransformer(updatedExperience);
  }
}
