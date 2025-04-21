import { prisma } from "../prisma/prisma";
import { projectTransformer } from "../transformers/project.transformer";
import {
  AccessDeniedException,
  DeletedException,
  NotFoundException,
} from "../utils/error.utils";
import { projectQueryArgs } from "../prisma-query-args/project.query-args";
import { Project } from "shared";
import { User } from "@prisma/client";

export default class ProjectsServices {
  static async getProjects(): Promise<Project[]> {
    const projects = await prisma.project.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        creator: true,
      },
    });
    return projects.map(projectTransformer);
  }

  static async createProject(
    skills: string[],
    title: string,
    description: string,
    creatingUser: User,
    githubUrl: string,
    imageUrls: string[]
  ): Promise<Project> {
    if (creatingUser.role !== "ADMIN") {
      throw new AccessDeniedException("only admins can create projects");
    }

    const project = await prisma.project.create({
      data: {
        skills: skills,
        title,
        description,
        githubUrl,
        creator: {
          connect: {
            id: creatingUser.id,
          },
        },
        imageUrls: imageUrls,
      },
      ...projectQueryArgs,
    });
    return projectTransformer(project);
  }
  static async updateProject(
    skills: string[],
    title: string,
    description: string,
    githubUrl: string,
    updatingUser: User,
    projectId: string,
    imageUrls: string[]
  ): Promise<Project> {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      ...projectQueryArgs,
    });
    if (!project) {
      throw new NotFoundException("Project", projectId);
    }
    if (project.deletedAt) {
      throw new DeletedException("Project", projectId);
    }
    if (project.creatorId != updatingUser.id) {
      throw new AccessDeniedException(
        "only the creator of a project can update it"
      );
    }
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        skills: skills,
        title,
        description,
        githubUrl,
        imageUrls: imageUrls,
      },
      ...projectQueryArgs,
    });
    return projectTransformer(updatedProject);
  }
}
