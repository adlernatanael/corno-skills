import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://corno.dev",
  output: "static",
  trailingSlash: "ignore",
  // A small page: inlining the CSS saves a blocking request on first paint.
  build: { format: "directory", inlineStylesheets: "always" },
});
