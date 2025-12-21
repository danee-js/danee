#! /usr/bin/env bun

import packagejson from "../package.json";
import { Clipse } from "clipse";
import { intro, outro } from "@clack/prompts";
import pc from "picocolors";
import checkVersion from "./utils/checkLastVersion";

const danee = new Clipse("danee", packagejson.description, packagejson.version);
danee
  .action(async () => {
    intro(
      `${pc.bold(pc.blue("|> Danee"))} is ready to help you with your tasks.`,
    );
    await checkVersion(packagejson.version);
    outro("A new framework is born.");
  })
  .ready();
