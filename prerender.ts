import { mkdir, write, exists } from "bun";
import { execSync } from "child_process";
import { join, dirname } from "path";

const paths = [
  "/",
  "/about",
  "/services",
  "/services/ocd",
  "/services/neurodivergent",
  "/services/chronic-illness",
  "/services/individual-therapy",
  "/courses",
  "/courses/ocd-course",
  "/courses/neurodivergent-relationships",
  "/groups",
  "/resources",
  "/resources/demystifying-ocd-talk-therapy-risks",
  "/resources/neurodivergent-affirming-lifestyle-guide",
  "/resources/navigating-medical-grief-autoimmune",
  "/for-therapists",
  "/coaching",
  "/contact",
  "/portal",
  "/portal/dashboard",
  "/portal/courses",
  "/portal/courses/ocd",
  "/portal/courses/relationships",
  "/portal/groups",
  "/portal/assignments"
];

const PORT = 3000;
const OUTPUT_DIR = "dist-static";

async function prerender() {
  console.log("Starting prerender process...");

  // Create clean output directory
  execSync(`rm -rf ${OUTPUT_DIR}`);
  execSync(`mkdir -p ${OUTPUT_DIR}`);

  // Fetch each path and write HTML file
  for (const path of paths) {
    const url = `http://localhost:${PORT}${path}`;
    console.log(`Prerendering ${path}...`);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
        continue;
      }
      const html = await response.text();

      // Determine file path
      let filePath = join(OUTPUT_DIR, path, "index.html");
      if (path === "/") {
        filePath = join(OUTPUT_DIR, "index.html");
      }

      // Create parent directories
      const dir = dirname(filePath);
      execSync(`mkdir -p ${dir}`);

      // Write html file
      await write(filePath, html);
      console.log(`Wrote ${filePath}`);
    } catch (err) {
      console.error(`Error fetching ${path}:`, err);
    }
  }

  // Copy assets and public files from .vercel/output/static (or .output/public)
  const sourceStatic = ".vercel/output/static";
  console.log(`Copying static assets from ${sourceStatic}...`);
  if (execSync(`ls -la ${sourceStatic}`).toString()) {
    execSync(`cp -R ${sourceStatic}/* ${OUTPUT_DIR}/`);
    console.log("Static assets copied successfully!");
  } else {
    console.error(`Source static directory ${sourceStatic} not found!`);
  }

  console.log("Prerender complete!");
}

prerender().catch(console.error);
