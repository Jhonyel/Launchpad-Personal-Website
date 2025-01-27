import { NextFunction, Request, Response } from "express";
import ProjectsServices from "../services/projects.services";
import { getCurrentUser } from "../utils/auth.utils";
import { userTransformer } from "../transformers/user.transformer";

export default class ProjectsController {
  static async getProjects(_req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await ProjectsServices.getProjects();
      // res.json(projects).send() throws an error 'Cannot set headers after they are sent to the client'
      // res.json(projects) does not
      // which is correct?
      return res.json(projects);
    } catch (error: unknown) {
      return next(error);
    }
  }
  static async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { skills, title, description, url } = req.body;
      const files = req.files as Express.Multer.File[]; // multer: express's file namespace
      const filePaths = files.map((file) => file.path);
      const creator = await getCurrentUser(res);
      const createdProject = await ProjectsServices.createProject(
        skills,
        title,
        description,
        creator,
        url,
        filePaths
      );
      return res.json(createdProject);
    } catch (error: unknown) {
      return next(error);
    }
  }
  static async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { skills, title, description, url } = req.body;
      const { id } = req.params;
      const files = req.files as Express.Multer.File[]; // multer: express's file namespace
      const filePaths = files.map((file) => file.path);
      const updater = await getCurrentUser(res);
      const updatedProject = await ProjectsServices.updateProject(
        skills,
        title,
        description,
        url,
        updater,
        id,
        filePaths
      );
      return res.json(updatedProject);
    } catch (error: unknown) {
      return next(error);
    }
  }
}
