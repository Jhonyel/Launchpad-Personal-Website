import { Request, Response, NextFunction } from "express";
import ExperiencesServices from "../services/experiences.services";

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
}
