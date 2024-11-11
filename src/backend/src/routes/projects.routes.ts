import express from "express";
import ProjectsController from "../controllers/projects.controller";
import { nonEmptyString, validateInputs } from "../utils/validation.utils";
import { body } from "express-validator";

const projectsRouter = express.Router();

projectsRouter.get("/", ProjectsController.getProjects);

projectsRouter.post(
  "/new",
  nonEmptyString(body("title")),
  nonEmptyString(body("description")),
  nonEmptyString(body("githubUrl")),
  body("skills").isArray(),
  nonEmptyString(body("skills.*")),
  validateInputs,
  ProjectsController.createProject
);

projectsRouter.post(
  "/:projectId/update/",
  nonEmptyString(body("title")),
  nonEmptyString(body("description")),
  nonEmptyString(body("githubUrl")),
  body("skills").isArray(),
  nonEmptyString(body("skills.*")),
  validateInputs,
  ProjectsController.updateProject
);

export default projectsRouter;
