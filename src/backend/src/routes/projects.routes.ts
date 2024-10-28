import express from "express";

const projectsRouter = express.Router();

projectsRouter.get("/", ProjectsController.getProjects);
