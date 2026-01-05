import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Add import plugin rules (e.g. to block cross-feature imports)
  {
    plugins: { import: importPlugin },
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // example: disable cross-feature imports under src/features
            {
              target: "./src/features/home",
              from: "./src/features",
              except: ["./home"],
            },
            {
              target: "./src/features/members",
              from: "./src/features",
              except: ["./members"],
            },
            {
              target: "./src/features/products",
              from: "./src/features",
              except: ["./products"],
            },
            {
              target: "./src/features/storeLocations",
              from: "./src/features",
              except: ["./storeLocations"],
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
