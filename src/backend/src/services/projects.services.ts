import { prisma } from "../prisma/prisma";
import { Project } from "shared";

export default class ProjectsServices {
    static async getProjects()
    Promise<Project[]>  {
        const Project = await prisma.project.findMany({
            include: {
                userCreated: true
            }
        });
        return projects;
    }
}