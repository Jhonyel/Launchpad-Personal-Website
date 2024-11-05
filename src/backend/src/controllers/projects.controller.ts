import { Request, Response, NextFunction } from "express";
import ProjectsServices from "../services/projects.services";

export default class ProjectsController {
  static async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await ProjectsServices.getProjects();
      return res.json(projects);
    } catch (error: unknown) {
      return next(error);
    }
  }
}
