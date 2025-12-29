import { log } from "@clack/prompts";
import { Clipse } from "clipse";
import { projectService } from "../services/project.service";

export const initCmd = new Clipse("init", "Initialize a new project");
initCmd
  .addArguments([
    {
      name: "name",
      description: "Name of the project",
    },
  ])
  .action(async (args) => {
    if (!args.name) {
      log.error("Project name cannot be empty");
      log.info("usage: danee init <name>");
      return;
    }

    try {
      const name = await projectService.initialize(args.name);
      log.success(`Project ${name} initialized successfully`);
      log.info(`cd ${name} && danee serve`);
    } catch (err) {
      log.error((err as { message: string }).message);
    }
  });
