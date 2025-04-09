module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    // Disable the serialization rule for client components
    'react/no-unescaped-entities': 'error',
  },
  overrides: [
    {
      files: ['lib/solana/quiz-contract.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        // Disable the serialization warning for client components
        'react-server-components/no-unserialized-props': 'off',
      },
    },
  ],
};
