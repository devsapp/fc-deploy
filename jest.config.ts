/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

// noinspection JSUnusedGlobalSymbols
export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  collectCoverage: false,
  preset: 'ts-jest',
  testEnvironment: 'node',
  // https://jestjs.io/docs/configuration#testmatch-arraystring the default value for testMatch is enough
  // testMatch: ['**/test/*.test.ts'],
  // testPathIgnorePatterns: ['./test/fixtures'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/examples'],
};
