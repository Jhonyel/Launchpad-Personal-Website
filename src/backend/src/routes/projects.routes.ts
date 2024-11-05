import express from "express";
import ProjectsController from "../controllers/projects.controller";

const projectsRouter = express.Router();

projectsRouter.get("/", ProjectsController.getProjects);

export default projectsRouter;
