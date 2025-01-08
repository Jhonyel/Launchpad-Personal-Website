import { clearDatabase, createTestUser } from "../test.utils";
import { describe, beforeEach, test, expect } from "vitest";
import ProjectService from "../../src/services/projects.services";
import { AccessDeniedException } from "../../src/utils/error.utils";

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
});
