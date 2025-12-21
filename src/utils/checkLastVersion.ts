import { log } from "@clack/prompts";

export default async function checkVersion(currentVersion: string) {
  try {
    const github = await fetch(
      "https://api.github.com/repos/danee-js/danee/releases/latest",
      {
        signal: AbortSignal.timeout(2000), // wait at least 2 seconds before aborting
      },
    );
    if (github.ok) {
      const data = (await github.json()) as { tag_name: string };
      if (data.tag_name !== currentVersion) {
        log.warn(`Danee is out of date! Please update to ${data.tag_name}`);
      }
    } else if (github.status === 404) {
      log.warn("Danee is not available on GitHub");
    } else {
      log.error("Failed to check for updates");
    }
  } catch (_) {
    log.error("Failed to check for updates");
  }
}
