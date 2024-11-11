import { Request, Response, NextFunction } from "express";
import ProjectsServices from "../services/projects.services";
import { getCurrentUser } from "../utils/auth.utils";

export default class ProjectsController {
  static async getProjects(_req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await ProjectsServices.getProjects();
      return res.json(projects);
    } catch (error: unknown) {
      return next(error);
    }
  }

  static async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { skills, title, description, url } = req.body;
      const user = await getCurrentUser(res);
      const project = await ProjectsServices.createProject(
        skills,
        title,
        description,
        url,
        user
      );
      return res.json(project);
    } catch (error: unknown) {
      return next(error);
    }
  }

  static async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { skills, title, description, url } = req.body;
      const { projectId } = req.params;
      const user = await getCurrentUser(res);
      const project = await ProjectsServices.updateProject(
        skills,
        title,
        description,
        url,
        user,
        projectId
      );
      return res.json(project);
    } catch (error: unknown) {
      return next(error);
    }
  }
}
