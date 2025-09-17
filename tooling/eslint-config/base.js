import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import _import from "eslint-plugin-import";
import onlyWarn from "eslint-plugin-only-warn";
import prettier from "eslint-plugin-prettier";
import turboPlugin from "eslint-plugin-turbo";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  // unicorn.configs.recommended, // Временно отключаем из-за проблем совместимости
  {
    plugins: {
      turbo: turboPlugin,
      "unused-imports": unusedImports,
      import: _import,
      prettier: prettier,
      unicorn: unicorn,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "prettier/prettier": "warn",
      "no-unused-vars": "off",
      "unused-imports/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_.*?$",
        },
      ],
      "import/order": [
        "warn",
        {
          groups: [
            "type",
            "builtin",
            "object",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "~/**",
              group: "external",
              position: "after",
            },
          ],
          "newlines-between": "always",
        },
      ],
      "padding-line-between-statements": [
        "warn",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        {
          blankLine: "always",
          prev: "*",
          next: ["if", "for", "while", "switch", "try"],
        },
        {
          blankLine: "always",
          prev: ["if", "for", "while", "switch", "try"],
          next: "*",
        },
      ],
      // Дополнительные правила качества кода
      "prefer-const": "warn",
      "no-var": "error",
      "object-shorthand": "warn",
      "prefer-template": "warn",
      "prefer-arrow-callback": "warn",
      "no-console": "warn",
      "no-debugger": "error",
      "no-duplicate-imports": "warn",
      "no-unused-expressions": "warn",
      "prefer-destructuring": [
        "warn",
        {
          array: false,
          object: true,
        },
      ],

      // Безопасные правила Unicorn (совместимые с ESLint 9.25)
      "unicorn/better-regex": "warn",
      "unicorn/catch-error-name": "warn",
      "unicorn/consistent-destructuring": "warn",
      "unicorn/empty-brace-spaces": "warn",
      "unicorn/escape-case": "warn",
      "unicorn/explicit-length-check": "warn",
      "unicorn/filename-case": [
        "warn",
        {
          cases: {
            kebabCase: true,
            camelCase: true,
          },
        },
      ],
      "unicorn/new-for-builtins": "warn",
      "unicorn/no-abusive-eslint-disable": "warn",
      "unicorn/no-array-for-each": "warn",
      "unicorn/no-console-spaces": "warn",
      "unicorn/no-hex-escape": "warn",
      "unicorn/no-instanceof-array": "warn",
      "unicorn/no-lonely-if": "warn",
      "unicorn/no-new-buffer": "warn",
      "unicorn/no-unreadable-array-destructuring": "warn",
      "unicorn/no-useless-undefined": "warn",
      "unicorn/numeric-separators-style": "warn",
      "unicorn/prefer-array-find": "warn",
      "unicorn/prefer-array-flat": "warn",
      "unicorn/prefer-array-flat-map": "warn",
      "unicorn/prefer-array-index-of": "warn",
      "unicorn/prefer-array-some": "warn",
      "unicorn/prefer-date-now": "warn",
      "unicorn/prefer-includes": "warn",
      "unicorn/prefer-number-properties": "warn",
      "unicorn/prefer-optional-catch-binding": "warn",
      "unicorn/prefer-string-slice": "warn",
      "unicorn/prefer-string-starts-ends-with": "warn",
      "unicorn/prefer-string-trim-start-end": "warn",
      "unicorn/prefer-ternary": "warn",
      "unicorn/throw-new-error": "warn",
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",
    },
    files: ["**/*.ts", "**/*.tsx"],
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: [
      "dist/**",
      ".now/*",
      "**/*.css",
      "**/.changeset",
      "**/dist",
      "esm/*",
      "public/*",
      "tests/*",
      "scripts/*",
      "**/*.config.js",
      "**/.DS_Store",
      "**/node_modules",
      "**/coverage",
      "**/.next",
      "**/build",
      "!**/.commitlintrc.cjs",
      "!**/.lintstagedrc.cjs",
      "!**/jest.config.js",
      "!**/plopfile.js",
      "!**/react-shim.js",
      "!**/tsup.config.ts",
    ],
  },
];

export default config;
export { config };
