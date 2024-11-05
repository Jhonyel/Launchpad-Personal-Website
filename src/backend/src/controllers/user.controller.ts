import { Request, Response, NextFunction } from "express";
import userServices from "../services/user.services";

export default class userController {
  static async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userServices.getUsers();
      return res.json(users);
    } catch (error: unknown) {
      return next(error);
    }
  }
}
