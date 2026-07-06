import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwrightPlugin from 'eslint-plugin-playwright';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules/', 'dist/', 'coverage/', '.playwright/'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  playwrightPlugin.configs['flat/recommended'],
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      // TYPESCRIPT & TYPE SAFETY (non-negotiable per AGENTS.md §9)
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/explicit-function-return-types': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      '@typescript-eslint/no-implicit-any-catch': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: false,
          allowNullish: false,
        },
      ],

      // CLEAN CODE ENFORCEMENT (AGENTS.md §8)
      'max-params': ['error', 4],
      'max-lines-per-function': [
        'error',
        {
          max: 20,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
      'max-lines': [
        'error',
        {
          max: 300,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'complexity': ['warn', 5],
      'max-depth': ['warn', 3],
      'max-nested-callbacks': ['warn', 3],

      // NAMING CONVENTIONS
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
      ],

      // COMMENTS - Only when necessary (AGENTS.md §8)
      'no-commented-out-code/no-commented-out-code': 'off', // Not in this config, but prefer rewriting bad code
      'eol-last': ['error', 'always'],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      // GENERAL CODE QUALITY
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'no-implicit-coercion': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // PLAYWRIGHT-SPECIFIC RULES (AGENTS.md §7, §10)
      'playwright/no-wait-for-timeout': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/expect-expect': 'error',
      'playwright/no-networkidle': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-useless-not': 'error',
      'playwright/no-element-handle': 'error',
      'playwright/no-eval-in-page': 'error',
      'playwright/no-force-option': 'error',
      'playwright/valid-expect': 'error',
      'playwright/valid-expect-in-promise': 'error',

      // ANTI-PATTERNS ENFORCEMENT (AGENTS.md §11)
      'no-plusplus': 'off',
      'prefer-template': 'error',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['acc', 'e', 'ctx', 'req', 'request', 'res', 'response', '$scope'],
        },
      ],

      // IMPORT RULES - Absolute paths
      'import/no-unresolved': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabeticalOrder: true,
          alphabeticalParserOptions: {
            caseInsensitive: true,
          },
        },
      ],
      'import/no-cycle': 'error',
      'import/no-unused-modules': [
        'warn',
        {
          unusedExports: true,
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/max-lines-per-function': 'off', // Tests can be longer
      'max-lines': [
        'error',
        {
          max: 500,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
];
