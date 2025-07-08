import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.jest
            }
        },
        plugins: {
            js
        },
        rules: {
            semi: ["error", "always"],
            quotes: ["error", "double"],
            indent: ["error", 4],
            "eol-last": ["warn", "always"],
            "comma-dangle": ["error", "never"],
            "no-trailing-spaces": "error",
            "object-curly-spacing": ["error", "always"],
            "next/no-html-link-for-pages": "off", // deprecated in Next 13+
            "next/no-img-element": "warn",
            "next/no-sync-scripts": "warn",
            "next/no-title-in-document-head": "warn",
            "next/no-head-element": "warn",
        }
    }
]);
