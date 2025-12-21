import { Clipse } from "clipse";

export const serveCmd = new Clipse("serve", "Launch the server");
serveCmd.action(async () => {
  console.log("Launching server...");
});
