import express from "express";
import UserServices from "../services/user.services";
import { nonEmptyString, validateInputs } from "../utils/validation.utils";
import { body } from "express-validator";
import UserController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", UserController.getUsers);
userRouter.post(
  "/new",
  nonEmptyString(body("username")),
  nonEmptyString(body("email")),
  nonEmptyString(body("role")),
  nonEmptyString(body("title")),
  nonEmptyString(body("bio")),
  nonEmptyString(body("githubUrl")),
  nonEmptyString(body("linkedInUrl")),
  validateInputs,
  UserController.createUser
);
userRouter.post(
  "/:id/update/",
  nonEmptyString(body("username")),
  nonEmptyString(body("email")),
  nonEmptyString(body("role")),
  nonEmptyString(body("title")),
  nonEmptyString(body("bio")),
  nonEmptyString(body("githubUrl")),
  nonEmptyString(body("linkedInUrl")),
  validateInputs,
  UserController.updateUser
);
userRouter.post("/auth/login", UserController.login);

export default userRouter;
