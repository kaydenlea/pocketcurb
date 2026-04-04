function createWorkspaceModuleNameMapper(rootDirPrefix) {
  return {
    "^@pocketcurb/core-domain$": `${rootDirPrefix}/packages/core-domain/src/index.ts`,
    "^@pocketcurb/schemas$": `${rootDirPrefix}/packages/schemas/src/index.ts`,
    "^@pocketcurb/api-client$": `${rootDirPrefix}/packages/api-client/src/index.ts`,
    "^@pocketcurb/supabase-types$": `${rootDirPrefix}/packages/supabase-types/src/index.ts`,
    "^@pocketcurb/ui-mobile$": `${rootDirPrefix}/packages/ui-mobile/src/index.tsx`,
    "^@pocketcurb/ui-web$": `${rootDirPrefix}/packages/ui-web/src/index.tsx`
  };
}

function createExpoConfig({ displayName, rootDir }) {
  return {
    displayName,
    rootDir,
    preset: "jest-expo",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "node",
    testMatch: [
      "<rootDir>/src/**/*.test.ts",
      "<rootDir>/src/**/*.test.tsx",
      "<rootDir>/app/**/*.test.ts",
      "<rootDir>/app/**/*.test.tsx"
    ],
    transformIgnorePatterns: [],
    moduleNameMapper: createWorkspaceModuleNameMapper("<rootDir>/../.."),
    collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}", "<rootDir>/app/**/*.{ts,tsx}"],
    clearMocks: true
  };
}

function createNodeConfig({ displayName, rootDir }) {
  return {
    displayName,
    rootDir,
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
      "^.+\\.(ts|tsx)$": [
        "ts-jest",
        {
          tsconfig: "<rootDir>/tsconfig.jest.json"
        }
      ]
    },
    moduleNameMapper: createWorkspaceModuleNameMapper("<rootDir>"),
    testMatch: [
      "<rootDir>/packages/**/*.test.ts",
      "<rootDir>/packages/**/*.test.tsx",
      "<rootDir>/apps/web/**/*.test.ts",
      "<rootDir>/apps/web/**/*.test.tsx"
    ],
    testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],
    collectCoverageFrom: ["<rootDir>/packages/**/*.{ts,tsx}", "<rootDir>/apps/web/**/*.{ts,tsx}"],
    clearMocks: true
  };
}

module.exports = {
  createExpoConfig,
  createNodeConfig
};
