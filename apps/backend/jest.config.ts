import type { Config } from 'jest';

const config: Config = {
  rootDir: '.',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^prisma/generated$': '<rootDir>/prisma/generated',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
};

export default config;
