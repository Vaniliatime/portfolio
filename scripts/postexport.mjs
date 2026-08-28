import { copyFile, access } from "node:fs/promises";

/**
 * Tidies the export for Apache.
 *
 * Next writes its own bare 404.html next to the real one this site has at
 * /404/index.html. .htaccess points ErrorDocument at ours, but plenty of
 * hosting panels and static servers reach for 404.html on their own, so the
 * two are made the same file rather than left to disagree.
 */
const source = "out/404/index.html";
const target = "out/404.html";

try {
  await access(source);
  await copyFile(source, target);
  console.log(`postexport: ${source} -> ${target}`);
} catch (error) {
  console.warn(`postexport: skipped, ${error?.message ?? error}`);
}
