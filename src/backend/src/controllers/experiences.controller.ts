import { NextFunction, Request, Response } from "express";
import ExperiencesServices from "../services/experiences.services";
import { getCurrentUser } from "../utils/auth.utils";
import { userTransformer } from "../transformers/user.transformer";

// the experiences router uses this experiences controller to set up the end points
export default class ExperiencesController {
  // returns a json
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
      const { title, description, companyName, location } = req.body;
      const creator = await getCurrentUser(res);
      const createdExperience = await ExperiencesServices.createExperience(
        title,
        description,
        companyName,
        location,
        userTransformer(creator)
      );
      return res.json(createdExperience);
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
      const { title, description, companyName, location } = req.body;
      const updater = await getCurrentUser(res);
      const updatedExperience = await ExperiencesServices.createExperience(
        title,
        description,
        companyName,
        location,
        userTransformer(updater)
      );
      return res.json(updatedExperience);
    } catch (error: unknown) {
      return next(error);
    }
  }
}
