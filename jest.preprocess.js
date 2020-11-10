const babelOptions = {
  presets: ['babel-preset-gatsby', '@babel/preset-typescript']
}

// eslint-disable-next-line
module.exports = require('babel-jest').createTransformer(babelOptions)
