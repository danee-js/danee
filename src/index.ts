#! /usr/bin/env bun

import { intro, outro } from "@clack/prompts";
import { Clipse } from "clipse";
import pc from "picocolors";
import packagejson from "../package.json";
import { createCmd } from "./commands/create";
import { initCmd } from "./commands/init";
import { serveCmd } from "./commands/serve";
import checkVersion from "./utils/checkLastVersion";
import { getAction } from "./utils/interactCLI";

intro(`${pc.bold(pc.blue("।> Danee"))} is ready to help you with your tasks.`);

const danee = new Clipse("danee", packagejson.description, packagejson.version);
danee
  .action(async () => {
    await checkVersion(packagejson.version);
    outro("A new framework is born.");
  })
  .addSubcommands([createCmd, initCmd, serveCmd])
  .ready();

getAction();
