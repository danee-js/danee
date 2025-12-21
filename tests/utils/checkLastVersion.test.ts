import { beforeEach, describe, expect, it, spyOn } from "bun:test";
import { log } from "@clack/prompts";
import { useFetchMock } from "bun-fetch-mock";
import checkVersion from "../../src/utils/checkLastVersion";

describe("checkVersion", () => {
  const warnSpy = spyOn(log, "warn");
  const errorSpy = spyOn(log, "error");
  const fetchMock = useFetchMock({
    baseUrl: "https://api.github.com",
  });
  const url = "/repos/danee-js/danee/releases/latest";

  beforeEach(() => {
    warnSpy.mockClear();
    errorSpy.mockClear();
    fetchMock.reset();
  });

  it("should warn if a newer version is available", async () => {
    fetchMock.get(url, {
      status: 200,
      data: { tag_name: "2.0.0" },
    });

    await checkVersion("1.0.0");

    expect(warnSpy).toHaveBeenCalledWith(
      "Danee is out of date! Please update to 2.0.0",
    );
  });

  it("should not log anything if the version is up to date", async () => {
    fetchMock.get(url, {
      status: 200,
      data: { tag_name: "1.0.0" },
    });

    await checkVersion("1.0.0");

    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("should warn specifically if the repo is not found (404)", async () => {
    fetchMock.get(url, {
      status: 404,
      data: null,
    });

    await checkVersion("1.0.0");

    expect(warnSpy).toHaveBeenCalledWith("Danee is not available on GitHub");
  });

  it("should log an error if the API request fails (e.g., 500)", async () => {
    fetchMock.get(url, {
      status: 500,
      data: null,
    });

    await checkVersion("1.0.0");

    expect(errorSpy).toHaveBeenCalledWith("Failed to check for updates");
  });
});
