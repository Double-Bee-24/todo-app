import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default tseslint.config(
  eslint.configs.recommended,
  { ignores: ['dist/', 'node_modules/', '**/*.d.ts', 'coverage/', 'eslint.config.js'] },

  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  // boring stuff
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
      globals: globals.node,
    },
  },
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],
    },
  },
)
