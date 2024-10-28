import { Request, Response, NextFunction } from "express";

export default class ProjectsController {
  static async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error: unknown) {
      const projects = await ProjectsServices.getProjects();
    }
  }
}
