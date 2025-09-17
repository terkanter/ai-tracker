import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config} */
const config = [
  ...baseConfig,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/self-closing-comp": "warn",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      // Дополнительные правила для лучшего качества кода
      "react/jsx-boolean-value": ["warn", "never"],
      "react/jsx-curly-brace-presence": ["warn", "never"],
      "react/jsx-fragments": ["warn", "syntax"],
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-pascal-case": "warn",
      "react/no-array-index-key": "warn",
      "react/no-danger": "warn",
      "react/no-unstable-nested-components": "warn",
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "function-declaration",
          unnamedComponents: "arrow-function",
        },
      ],
      // TypeScript specific
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "after-used",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Эти правила требуют type information, отключаем пока
      // "@typescript-eslint/prefer-nullish-coalescing": "warn",
      // "@typescript-eslint/prefer-optional-chain": "warn",
      // "@typescript-eslint/no-unnecessary-condition": "warn",
      // "@typescript-eslint/prefer-string-starts-ends-with": "warn",

      // Дополнительные React правила для лучшего качества
      "react/jsx-key": ["error", { checkFragmentShorthand: true }],
      "react/jsx-no-leaked-render": "warn",
      // Убираем правила форматирования - это задача Prettier
      // "react/jsx-max-props-per-line": конфликтует с Prettier
      // "react/jsx-first-prop-new-line": конфликтует с Prettier
      // "react/jsx-closing-bracket-location": конфликтует с Prettier
      // "react/jsx-wrap-multilines": конфликтует с Prettier
    },
  },
];

export default config;
export { config };
