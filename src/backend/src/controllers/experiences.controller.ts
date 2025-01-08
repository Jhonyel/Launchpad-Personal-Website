import { Request, Response, NextFunction } from "express";
import ExperiencesServices from "../services/experiences.services";
import { getCurrentUser } from "../utils/auth.utils";

export default class ExperiencesController {
  static async getExperiences(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const experiences = await ExperiencesServices.getExperiences();
      return res.json(experiences);
    } catch (error: unknown) {
      return next(error);
    }
  }

  static async createExperience(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, description, location, companyName, startDate, endDate } =
        req.body;
      const files = req.files as Express.Multer.File[];
      const filePaths = files.map((file) => file.path);
      const user = await getCurrentUser(res);
      const experience = await ExperiencesServices.createExperience(
        title,
        description,
        companyName,
        location,
        startDate,
        endDate,
        user,
        filePaths
      );
      return res.json(experience);
    } catch (error: unknown) {
      return next(error);
    }
  }

  static async updateExperience(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, description, location, companyName, startDate, endDate } =
        req.body;
      const { experienceId } = req.params;
      const files = req.files as Express.Multer.File[];
      const filePaths = files.map((file) => file.path);
      const user = await getCurrentUser(res);
      const experience = await ExperiencesServices.updateExperience(
        title,
        description,
        companyName,
        location,
        startDate,
        endDate,
        user,
        experienceId,
        filePaths
      );
      return res.json(experience);
    } catch (error: unknown) {
      return next(error);
    }
  }
}
