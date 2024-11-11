import { prisma } from "../prisma/prisma";
import { Project } from "shared";
import { projectTransformer } from "../transformers/project.transformer";
import { User } from "@prisma/client";
import {
  AccessDeniedException,
  DeletedException,
  NotFoundException,
} from "../utils/error.utils";
import { projectQueryArgs } from "../prisma-query-args/project.query-args";

export default class ProjectsServices {
  static async getProjects(): Promise<Project[]> {
    const Project = await prisma.project.findMany({
      where: {
        dateDeleted: null,
      },
      include: {
        userCreated: true,
      },
    });
    return Project.map(projectTransformer);
  }

  static async createProject(
    skills: string[],
    title: string,
    description: string,
    githubUrl: string,
    user: User
  ): Promise<Project> {
    if (user.role !== "ADMIN")
      throw new AccessDeniedException("Only Admins Can Create Projects");

    const project = await prisma.project.create({
      data: {
        skills,
        title,
        description,
        githubUrl,
        userCreated: {
          connect: {
            id: user.id,
          },
        },
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
    user: User,
    projectId: string
  ): Promise<Project> {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      ...projectQueryArgs,
    });

    if (!project) throw new NotFoundException("Project", projectId);
    if (project.dateDeleted) throw new DeletedException("Project", projectId);

    if (project.userCreated.id !== user.id)
      throw new AccessDeniedException(
        "Only the creator of a project can edit the project"
      );

    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        skills,
        title,
        description,
        githubUrl,
      },
      ...projectQueryArgs,
    });

    return projectTransformer(updatedProject);
  }
}
