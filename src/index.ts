#! /usr/bin/env bun

import packagejson from "../package.json";
import { Clipse } from "clipse";
import { intro, outro } from "@clack/prompts";
import pc from "picocolors";

const danee = new Clipse("danee", packagejson.description, packagejson.version);
danee
  .action(() => {
    intro(
      `${pc.bold(`${pc.bgCyan(pc.whiteBright(" |> "))} ${pc.cyan("Danee")}`)} is ready to help you with your tasks.`,
    );
    outro("A new framework is born.");
  })
  .ready();
