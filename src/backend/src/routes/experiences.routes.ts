import express from "express";
import ExperienceController from "../controllers/experiences.controller";

const experiencesRouter = express.Router();

experiencesRouter.get("/", ExperienceController.getExperiences);

export default experiencesRouter;
