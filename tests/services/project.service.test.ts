import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import daneeSVG from "../../src/assets/danee.svg" with { type: "text" };
import { projectService } from "../../src/services/project.service";
import slugify from "../../src/utils/slugify";

let createdSlugs: string[] = [];

function cleanupDir(dir: string) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
describe("projectService", () => {
  beforeEach(() => {
    createdSlugs = [];
  });

  afterEach(() => {
    createdSlugs.forEach((slug) => {
      const dirPath = path.join(process.cwd(), slug);
      cleanupDir(dirPath);
    });
    createdSlugs = [];
  });

  it("should initialize a new project with index.html", async () => {
    const projectName = "My New Project";
    const expectedSlug = "my-new-project";
    const projectPath = path.join(process.cwd(), expectedSlug);
    const indexPath = path.join(projectPath, "index.html");

    createdSlugs.push(expectedSlug);

    const resultSlug = await projectService.initialize(projectName);

    expect(resultSlug).toBe(expectedSlug);
    expect(fs.existsSync(projectPath)).toBe(true);
    expect(fs.existsSync(indexPath)).toBe(true);

    const indexContent = await Bun.file(indexPath).text();
    expect(indexContent).not.toContain("<!--SVG-->");
    expect(indexContent).toContain(daneeSVG);
  });

  it("should throw an error for an invalid project name", async () => {
    const invalidProjectName = "   ";
    expect(projectService.initialize(invalidProjectName)).rejects.toThrow(
      "Invalid project name",
    );
  });

  it("should throw an error if the project directory already exists", async () => {
    const existingProjectName = "Existing Project";
    const slug = slugify(existingProjectName);
    const projectPath = path.join(process.cwd(), slug);

    fs.mkdirSync(projectPath);
    createdSlugs.push(slug);

    expect(projectService.initialize(existingProjectName)).rejects.toThrow(
      "Project already exists",
    );
  });
});
