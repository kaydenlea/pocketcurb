const { createExpoConfig } = require("../../packages/config-jest/base.cjs");

module.exports = createExpoConfig({
  displayName: "mobile-unit",
  rootDir: __dirname
});
