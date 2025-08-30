import eslint from '@eslint/js'
import vitest from '@vitest/eslint-plugin'
import configPrettier from 'eslint-config-prettier/flat'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import perfectionist from 'eslint-plugin-perfectionist'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import * as tseslint from 'typescript-eslint'

export default tseslint.config(
  globalIgnores(['dist', 'dist-ssr']),
  {
    name: 'All',
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strict,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      configPrettier,
    ],
    settings: {
      'import/resolver': { typescript: true },
    },
    plugins: {
      perfectionist,
    },
    rules: {
      'no-duplicate-imports': 'error',
      'perfectionist/sort-imports': ['error', { type: 'natural', order: 'asc' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'import/newline-after-import': 'error',
    },
  },
  {
    name: 'App',
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      {
        name: 'react/recommended',
        ...react.configs.flat.recommended,
        settings: {
          react: { version: 'detect' },
        },
      },
      {
        name: 'react/jsx-runtime',
        ...react.configs.flat['jsx-runtime'],
      },
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    rules: {
      'no-console': 'warn',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message: '`React` is globally available.',
            },
          ],
        },
      ],
      'react/jsx-curly-brace-presence': 'error',
      'react/jsx-newline': ['error', { prevent: true }],
      'react/jsx-no-useless-fragment': 'error',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
    },
  },
  {
    name: 'App: ts except declarations',
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.d.ts'],
    rules: {
      'import/no-default-export': 'error',
    },
  },
  {
    name: 'App: tests',
    files: ['src/**/*.test.{ts,tsx}'],
    ...vitest.configs.recommended,
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  {
    name: 'Node',
    files: ['vite.config.ts', 'eslint.config.mjs'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.node,
    },
  },
)
