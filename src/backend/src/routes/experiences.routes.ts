import express from "express";
import ExperienceController from "../controllers/experiences.controller";
import { nonEmptyString, validateInputs } from "../utils/validation.utils";
import { body } from "express-validator";
import ExperiencesController from "../controllers/experiences.controller";
import { upload } from "../utils/file.utils";

const experiencesRouter = express.Router();

experiencesRouter.get("/", ExperienceController.getExperiences);

experiencesRouter.post(
  "/new",
  upload.array("images"),
  nonEmptyString(body("title")),
  nonEmptyString(body("description")),
  nonEmptyString(body("companyName")),
  nonEmptyString(body("location")),
  validateInputs,
  ExperiencesController.createExperience
);

experiencesRouter.post(
  "/:experienceId/update/",
  upload.array("images"),
  nonEmptyString(body("title")),
  nonEmptyString(body("description")),
  nonEmptyString(body("companyName")),
  nonEmptyString(body("location")),
  validateInputs,
  ExperiencesController.updateExperience
);

export default experiencesRouter;
