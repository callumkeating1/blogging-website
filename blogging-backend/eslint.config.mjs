import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: globals.node
    },
    plugins: {
      js
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "eol-last": ["warn", "always"],
      "comma-dangle": ["error", "never"],
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"]
    },
    extends: ["js/recommended"]
  }
]);
