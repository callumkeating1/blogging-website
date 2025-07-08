import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    files: ["**/*.ts", "**/*.tsx"],  // files is top-level in flat config
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",  // most likely you want this
      },
    },
    rules: {
      indent: ["error", 4],
    },
  },
];

export default eslintConfig;
