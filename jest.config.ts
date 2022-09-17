export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/core/(.*)$": "<rootDir>/src/core/$1",
    "^@/react/(.*)$": "<rootDir>/src/react/$1",
    "^@/tests/core/(.*)$": "<rootDir>/tests/core/$1",
    "^@/tests/react/(.*)$": "<rootDir>/tests/react/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
