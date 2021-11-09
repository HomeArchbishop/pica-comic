'use strict'

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  NODE_ENV: '"production"',
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true,
          pure_funcs: ['console.log']
        }
      },
      parallel: true
    })
  ]
}
