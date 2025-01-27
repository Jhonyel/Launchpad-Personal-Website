import express from "express";
import ProjectsController from "../controllers/projects.controller";
import { nonEmptyString, validateInputs } from "../utils/validation.utils";
import { body } from "express-validator";
import { upload } from "../utils/file.utils";

const projectsRouter = express.Router();

projectsRouter.get("/", ProjectsController.getProjects);
projectsRouter.post(
  "/new",
  upload.array("images"),
  nonEmptyString(body("title")),
  nonEmptyString(body("description")),
  nonEmptyString(body("githubUrl")),
  nonEmptyString(body("skills")),
  validateInputs,
  ProjectsController.createProject
);
projectsRouter.post(
  "/:id/update/",
  upload.array("images"),
  nonEmptyString(body("title")),
  nonEmptyString(body("description")),
  nonEmptyString(body("githubUrl")),
  nonEmptyString(body("skills")),
  validateInputs,
  ProjectsController.updateProject
);

export default projectsRouter;
