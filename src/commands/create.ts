import { Clipse } from "clipse";

export const createCmd = new Clipse("create", "Create a new item");
createCmd.action(async () => {
  console.log("Creating project...");
});
