import { defineConfig } from "@utoo/lint/config";
import frontend from "@utoo/lint/configs/frontend";

export default defineConfig(
  {
    name: "site",
    files: [
      "utlint.config.ts",
      "app/**/*.{js,jsx,ts,tsx,mjs,cjs}",
      "components/**/*.{js,jsx,ts,tsx,mjs,cjs}",
      "content/**/_meta.js",
      "lib/**/*.{js,jsx,ts,tsx,mjs,cjs}",
      "scripts/**/*.{js,jsx,ts,tsx,mjs,cjs}",
      "mdx-components.js",
      "next-env.d.ts",
      "next.config.mjs",
      "postcss.config.js",
      "tailwind.config.js",
    ],
    rules: {
      ...frontend.rules,
      "@typescript-eslint/consistent-type-definitions": "off",
    },
  },
  {
    name: "tailwind-config",
    files: ["tailwind.config.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    name: "patch-script",
    files: ["scripts/patch-nextra-theme-docs.mjs"],
    rules: {
      "no-console": "off",
    },
  },
);
