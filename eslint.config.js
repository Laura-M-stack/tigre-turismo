import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import refresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist", "node_modules"] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": hooks,
      "react-refresh": refresh,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...hooks.configs.recommended.rules,

      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // A11y básico (no bloquea el build, pero avisa)
      "jsx-a11y/no-autofocus": "warn",
      "jsx-a11y/label-has-associated-control": "warn",

      // Evitar any (pero en warnings al principio, para no frenar el desarrollo)
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  prettier,
];
