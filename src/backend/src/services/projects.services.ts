import { prisma } from "../prisma/prisma";
import { Project } from "shared";
import { projectTransformer } from "../transformers/project.transformer";

export default class ProjectsServices {
    static async getProjects():
    Promise<Project[]>  {
        const Project = await prisma.project.findMany({
            where: {
                dateDeleted: null
            },
            include: {
                userCreated: true
            }
        });
        return Project.map(projectTransformer)
    }
}