import { NextFunction, Request, Response } from "express";
import UserServices from "../services/user.services";
import { AccessDeniedException } from "../utils/error.utils";

export default class UserController {
  static async getUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserServices.getUsers();
      return res.json(users);
    } catch (error: unknown) {
      return next(error);
    }
  }
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        username,
        email,
        role,
        title,
        bio,
        imageUrl,
        githubUrl,
        linkedInUrl,
      } = req.body;

      const createdUser = await UserServices.createUser(
        username,
        email,
        role,
        title,
        bio,
        imageUrl,
        githubUrl,
        linkedInUrl
      );
      return res.json(createdUser);
    } catch (error: unknown) {
      return next(error);
    }
  }
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        username,
        email,
        role,
        title,
        bio,
        imageUrl,
        githubUrl,
        linkedInUrl,
        userId,
      } = req.body;

      const updatedUser = await UserServices.updateUser(
        username,
        email,
        role,
        title,
        bio,
        imageUrl,
        githubUrl,
        linkedInUrl,
        userId
      );
      return res.json(updatedUser);
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

      const user = await UserServices.login(userId);

      res.status(200).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }
}
