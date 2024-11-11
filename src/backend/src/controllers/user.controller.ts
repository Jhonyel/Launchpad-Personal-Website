import { Request, Response, NextFunction } from "express";
import userServices from "../services/user.services";
import { AccessDeniedException } from "../utils/error.utils";

export default class userController {
  static async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userServices.getUsers();
      return res.json(users);
    } catch (error: unknown) {
      return next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (process.env.NODE_ENV === "production")
        throw new AccessDeniedException("Cant dev login on production!");

      const { userId } = req.body;
      const header = req.headers["user-agent"];

      if (!header) {
        throw new AccessDeniedException(
          "You cannot put an unknown for dev login!"
        );
      }

      const user = await userServices.login(userId);

      res.status(200).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }
}
