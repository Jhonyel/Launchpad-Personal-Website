import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { NotFoundException } from "./error.utils";

/**
 * get the user making the request.
 * @param res - we use the response because that's where we stored the userId data during jwt validation
 * @returns the user
 * @throws if no user with the userId exists
 */
export const getCurrentUser = async (res: Response): Promise<User> => {
  const { userId } = res.locals;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundException("User", userId);
  return user;
};

// middleware function for development that will enforce jwt authorization
export const requireAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.path === "/users/auth/login" || // logins dont have cookies yet
    req.path === "/" || // base route is available so aws can listen and check the health
    req.method === "OPTIONS" || // this is a pre-flight request and those don't send cookies
    req.path === "/users/" || // dev login needs the list of users to log in
    req.path.startsWith("/uploads") // images are public
  ) {
    return next();
  } else {
    const devUserId = req.headers.authorization;

    if (!devUserId)
      return res
        .status(401)
        .json({ message: "Authentication Failed: Not logged in (dev)!" });

    res.locals.userId = devUserId;

    return next();
  }
};
