import firebaseSecurityRules from '@firebase/eslint-plugin-security-rules';

export default [
  {
    ignores: [
      'dist/**',
      'ota-dist/**',
      'android/**',
      'functions/**',
      'node_modules/**',
      'src/**',
      'scripts/**',
      'server.ts',
    ],
  },
  {
    ...firebaseSecurityRules.configs['flat/recommended'],
    files: ['**/*.rules'],
  },
];
