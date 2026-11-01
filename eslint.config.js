import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores([
    'dist', // сборка
    'node_modules',
    'task', // контекст для Claude, не код
    'public/mockServiceWorker.js', // генерируется MSW, если он есть в проекте
  ]),

  // Базовые правила для всех JS/TS файлов
  {
    files: ['**/*.{js,ts,tsx}'],
    extends: [js.configs.recommended], // базовые ошибки JS: недостижимый код, дубли ключей, no-undef и т.п.
    languageOptions: { globals: globals.browser }, // window, document и т.д. не считаются необъявленными
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'no-console': 'warn', // забытые console.log перед коммитом
      'no-alert': 'warn', // alert/confirm/prompt в проде почти всегда ошибка
      'prefer-arrow-callback': 'warn', // колбэки — стрелки, а не function(){}
      'no-var': 'warn', // только let/const
      'prefer-const': 'warn', // const, если переменная не переприсваивается
      'object-shorthand': 'warn', // { foo } вместо { foo: foo }
      eqeqeq: 'warn', // === вместо ==, без неявных приведений
      curly: 'warn', // фигурные скобки у if/else всегда
      'no-else-return': 'warn', // ранний return вместо лишнего else
      'simple-import-sort/imports': [
        'warn',
        { groups: [['^.+\\u0000$'], ['^']] }, // import type сверху, остальное одним блоком
      ],
      'simple-import-sort/exports': 'warn', // сортировка export { ... } from
    },
  },

  // TypeScript + React
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked, // TS-правила с информацией о типах: промисы, any, небезопасные операции
      pluginReact.configs.flat.recommended, // базовые React-правила: jsx-key, дубли пропсов и т.п.
      pluginReact.configs.flat['jsx-runtime'], // не требовать import React при новом JSX runtime
      reactHooks.configs.flat.recommended, // rules-of-hooks и exhaustive-deps — самое важное для React
      reactRefresh.configs.vite, // экспорт из компонентных файлов, совместимый с HMR
      jsxA11y.flatConfigs.recommended, // доступность: alt у img, роли, кликабельные div и т.п.
    ],
    languageOptions: {
      parserOptions: {
        projectService: true, // сам находит tsconfig для каждого файла (нужно для TypeChecked)
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' }, // версия React из package.json
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }, // _arg — намеренно неиспользуемое
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // any подсвечивается, но не блокирует
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } }, // разрешает async-хендлеры в onClick={async () => ...}
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'warn', // switch по union должен покрывать все варианты
      'react/jsx-key': 'warn', // key в map — уже в recommended, тут понижено до warn
      'react/prop-types': 'off', // типы пропсов даёт TS
      'react/no-unescaped-entities': 'off', // разрешает ' и " в тексте JSX
    },
  },

  prettierConfig, // последним: выключает всё, что конфликтует с Prettier
])
