import { existsSync } from "node:fs";
import daneeSVG from "../assets/danee.svg" with { type: "text" };
import indexHTML from "../assets/index.html" with { type: "text" };
import slugify from "../utils/slugify";

export const projectService = {
  async initialize(name: string) {
    const slug = slugify(name);
    if (slug === "") throw new Error("Invalid project name");
    const projectPath = `${process.cwd()}/${slug}`;
    if (existsSync(projectPath)) throw new Error("Project already exists");
    await Bun.write(
      `${projectPath}/index.html`,
      indexHTML.toString().replaceAll("<!--SVG-->", daneeSVG),
    );
    return slug;
  },
};
