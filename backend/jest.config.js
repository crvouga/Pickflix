module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "tsconfig.json",
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
