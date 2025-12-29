import Elysia from "elysia";

export const serverService = {
  init: () =>
    new Elysia()
      .get("/", () => Bun.file(`${process.cwd()}/index.html`))
      .listen(Bun.env.PORT ?? 3000),
};
