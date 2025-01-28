/* eslint-disable */
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.{js,ts}"]
  },
  {
    ignores: ["node_modules/*", "dist/*"]
  },
  {
    languageOptions: { globals: globals.browser }
  },
  {
    rules: {
      "func-names": ["error", "never"],
      "complexity": ["error", 10],
      "max-depth": ["error", 5],
      "eqeqeq": ["error", "smart"],
      "func-style": ["error", "declaration"],
      "object-shorthand": ["error"],
      "no-var": ["error"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": ["class", "typeAlias", "interface", "enum"],
          "format": ["StrictPascalCase"],
        },
        {
          "selector": ["variable", "property"],
          "format": ["snake_case"],
        },
        {
          "selector": ["method", "function"],
          "format": ["strictCamelCase"]
        },
        {
          "selector": "variable",
          "modifiers": ["destructured"],
          "format": null,
        },
        {
          "selector": [
            "classProperty",
            "objectLiteralProperty",
            "typeProperty",
            "classMethod",
            "objectLiteralMethod",
            "typeMethod",
            "accessor",
            "enumMember",
          ],
          "format": null,
          "modifiers": ["requiresQuotes"],
        },
      ]
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
