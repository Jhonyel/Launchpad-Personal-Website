import { clearDatabase, createTestUser } from "../test.utils";
import { describe, beforeEach, test, expect } from "vitest";
import ProjectService from "../../src/services/projects.services";
import {
  AccessDeniedException,
  DeletedException,
  NotFoundException,
} from "../../src/utils/error.utils";
import { prisma } from "../../src/prisma/prisma";

describe("Project Tests", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  test("Create Project Throws if user is not admin", async () => {
    const guestUser = await createTestUser(false);

    await expect(() =>
      ProjectService.createProject(
        ["Pyhton"],
        "title",
        "description",
        "url",
        guestUser,
        []
      )
    ).rejects.toThrow(
      new AccessDeniedException("Only Admins Can Create Projects")
    );
  });

  test("Create Project Succeeds with valid input", async () => {
    const adminUser = await createTestUser(true);

    const project = await ProjectService.createProject(
      ["Python"],
      "title",
      "description",
      "url",
      adminUser,
      []
    );

    expect(project).toContain({
      title: "title",
      description: "description",
      githubUrl: "url",
    });
    expect(project.skills).toStrictEqual(["Python"]);
    expect(project.imageUrls).toStrictEqual([]);
  });

  test("Update Project Throws if project is not found", async () => {
    const adminUser = await createTestUser(true);

    await expect(() =>
      ProjectService.updateProject(
        ["Pyhton"],
        "title",
        "description",
        "url",
        adminUser,
        "jjjjjjj",
        []
      )
    ).rejects.toThrow(new NotFoundException("Project", "jjjjjjj"));
  });

  test("Update Project Throws if project is deleted", async () => {
    const adminUser = await createTestUser(true);

    const project = await ProjectService.createProject(
      ["Python"],
      "title",
      "description",
      "url",
      adminUser,
      []
    );

    await prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        dateDeleted: new Date(),
        userDeletedId: adminUser.id,
      },
    });

    await expect(() =>
      ProjectService.updateProject(
        ["Pyhton"],
        "title",
        "description",
        "url",
        adminUser,
        project.id,
        []
      )
    ).rejects.toThrow(new DeletedException("Project", project.id));
  });

  test("Update Project Throws if updater is not creator", async () => {
    const adminUser = await createTestUser(true);
    const secondUser = await createTestUser(true);

    const project = await ProjectService.createProject(
      ["Python"],
      "title",
      "description",
      "url",
      adminUser,
      []
    );

    await expect(() =>
      ProjectService.updateProject(
        ["Pyhton"],
        "title",
        "description",
        "url",
        secondUser,
        project.id,
        []
      )
    ).rejects.toThrow(
      new AccessDeniedException(
        "Only the creator of a project can edit the project"
      )
    );
  });

  test("Update Project succeeds with valid input", async () => {
    const adminUser = await createTestUser(true);

    const project = await ProjectService.createProject(
      ["Python"],
      "title",
      "description",
      "url",
      adminUser,
      []
    );

    const updatedProject = await ProjectService.updateProject(
      ["Typescript"],
      "secondTitle",
      "secondDescription",
      "SecondUrl",
      adminUser,
      project.id,
      []
    );

    expect(updatedProject).toContain({
      title: "secondTitle",
      description: "secondDescription",
      githubUrl: "SecondUrl",
    });
    expect(updatedProject.skills).toStrictEqual(["Typescript"]);
    expect(updatedProject.imageUrls).toStrictEqual([]);
  });

  test("Get all projects works", async () => {
    const adminUser = await createTestUser(true);

    const project = await ProjectService.createProject(
      ["Python"],
      "title",
      "description",
      "url",
      adminUser,
      []
    );

    const project2 = await ProjectService.createProject(
      ["Python"],
      "title",
      "description",
      "url",
      adminUser,
      []
    );

    const project3 = await ProjectService.createProject(
      ["Python"],
      "title",
      "description",
      "url",
      adminUser,
      []
    );

    const projects = await ProjectService.getProjects();

    expect(projects.length).toBe(3);
    expect(projects).toStrictEqual([project, project2, project3]);
  });
});
