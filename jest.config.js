module.exports = {
  roots: ['<rootDir>/testes'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ["src/**/*.ts"],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/src/controller/controller.ts/',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: -10,
    },
  },
};