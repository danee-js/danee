import { log } from "@clack/prompts";
import { Clipse } from "clipse";
import slugify from "../utils/slugify";

export const initCmd = new Clipse("init", "Initialize a new project");
initCmd
  .addArguments([
    {
      name: "name",
      description: "Name of the project",
    },
  ])
  .action(async (args) => {
    if (args.name) {
      const name = slugify(args.name);
      log.success(`Project ${name} initialized successfully`);
      return;
    }
    log.error("Project name cannot be empty");
    log.info("usage: danee init <name>");
  });
