import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: true,  // enable JSX parsing
        },
      },
      globals: {
        React: "writable", // add if using React in scope automatically
      }
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    rules: {
      indent: ["error", 4],
    },
  },
  // This adds Next.js recommended rules, plugins, and configs
  ...compat.extends('next/core-web-vitals'),
];

export default eslintConfig;
