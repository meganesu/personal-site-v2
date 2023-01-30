// Babel config for .js and .jsx files, for Jest tests
const babelOptions = {
  presets: ["babel-preset-gatsby"],
}

module.exports = require("babel-jest").default.createTransformer(babelOptions)