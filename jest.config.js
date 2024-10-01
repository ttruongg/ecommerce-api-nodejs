/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testMatch: ["**/__tests__/**/*.spec.ts"],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  roots: ["<rootDir>/src/__tests__"],
};