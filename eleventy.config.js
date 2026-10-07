import { RenderPlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(RenderPlugin);
  // Reload the full document so theme and menu initialization runs after edits.
  eleventyConfig.setServerOptions({ domDiff: false });
  eleventyConfig.addWatchTarget("src/content/");
  eleventyConfig.addWatchTarget("assets/");

  // Markdown fragments are rendered into index.njk rather than separate pages.
  eleventyConfig.addPassthroughCopy("assets");
  // Publish only web assets, keeping full-resolution source photos out of _site.
  for (const name of [
    "profile.png", "favicon-32x32.png",
    "favicon-192x192.png", "favicon-512x512.png",
    "apple-touch-icon-180x180.png", "manifest.json",
  ]) {
    eleventyConfig.addPassthroughCopy(`images/${name}`);
  }
  eleventyConfig.addPassthroughCopy("files");
  eleventyConfig.addPassthroughCopy("LICENSE");
  eleventyConfig.addFilter("year", (date) => new Date(date).getUTCFullYear());
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("isoTimestamp", (date) => new Date(date).toISOString());
  eleventyConfig.addGlobalData("buildDate", () => new Date());

  return {
    dir: { input: "src", output: "_site" },
    templateFormats: ["njk"],
    markdownTemplateEngine: false,
  };
}
