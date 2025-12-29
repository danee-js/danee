import { log } from "@clack/prompts";
import { Clipse } from "clipse";
import { serverService } from "../services/server.service";

export const serveCmd = new Clipse("serve", "Launch the server");
serveCmd.action(async () => {
  log.step("server is running");
  log.info(`http://localhost:${Bun.env.PORT ?? 3000}`);
  serverService.init();
});
