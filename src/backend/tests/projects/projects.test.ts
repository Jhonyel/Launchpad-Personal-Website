import { beforeEach, describe, expect, test } from "vitest";
import { clearDatabase, createTestUser } from "../test.utils";
import ProjectService from "../../src/services/projects.services";
import { AccessDeniedException } from "../../src/utils/error.utils";

describe("project tests", () => {
  beforeEach(async () => {
    await clearDatabase();
  });
  test("create project throws if user is not admin", async () => {
    const guestUser = await createTestUser(false);
    await expect(() =>
      ProjectService.createProject(
        ["prisma", "typescript"],
        "awesome launchpad project",
        "coded an awesome personal website for ner",
        guestUser,
        "",
        []
      )
    ).rejects.toThrow(
      new AccessDeniedException("only admins can create projects")
    );
  });
  test("create project succeeds with valid input", async () => {
    const adminUser = await createTestUser(true);
    const project = await ProjectService.createProject(
      ["prisma", "typescript"],
      "awesome launchpad project",
      "coded an awesome personal website for ner",
      adminUser,
      "",
      []
    );
    expect(project).toContain({
      title: "awesome launchpad project",
      description: "coded an awesome personal website for ner",
      githubUrl:
        "https://github.com/Northeastern-Electric-Racing-Launchpad/web-dev-launchpad-kb578432",
      creatorId: adminUser.id,
    });
    expect(project.skills).toStrictEqual(["prisma", "typescript"]);
    expect(project.imageUrls).toStrictEqual([]);
  });
});
