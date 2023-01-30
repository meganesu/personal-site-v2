module.exports = {
  // run all .js or .jsx files through Babel preprocessor first
  transform: {
    "^.+\\.jsx?$": `<rootDir>/jest-preprocess.js`,
  },
  // rules for how Jest should handle imports
  moduleNameMapper: {
    // mock stylesheets using the `identity-obj-proxy` lib
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    // mock other static file imports (which Jest can't handle)
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  // ignore any tests in these paths
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  // need this because Gatsby includes un-transpiled ES6 code
  transformIgnorePatterns: [`node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)`],
  // set a global env var usually set by Gatsby
  globals: {
    __PATH_PREFIX__: ``,
  },
  testEnvironment: `jsdom`,
  testEnvironmentOptions: {
    url: `http://localhost`,
  },
  setupFiles: [`<rootDir>/loadershim.js`],
  setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"],
}