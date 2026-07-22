import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const schemaPath = join(
  process.cwd(),
  "node_modules",
  "nextra-theme-docs",
  "dist",
  "schemas.js",
);

if (!existsSync(schemaPath)) {
  console.error("[patch-nextra-theme-docs] schema file not found");
  process.exit(1);
}

const source = readFileSync(schemaPath, "utf8");
const patched = source.replace(
  "  children: reactNode,\n",
  "  children: reactNode.optional(),\n",
);

if (patched === source) {
  if (source.includes("  children: reactNode.optional(),\n")) {
    console.log("[patch-nextra-theme-docs] already patched");
    process.exit(0);
  }

  console.error("[patch-nextra-theme-docs] schema shape not recognized");
  process.exit(1);
}

writeFileSync(schemaPath, patched);
console.log("[patch-nextra-theme-docs] patched LayoutPropsSchema children");
