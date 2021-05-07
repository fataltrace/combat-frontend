import { merge } from 'webpack-merge'
import dotenv from 'dotenv'
import common from './webpack.common.js'
import TerserPlugin from 'terser-webpack-plugin'

const {
  WEBPACK_MASK_JS_VENDORS
} = dotenv.config().parsed

export default merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }]
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                ['@emotion', {
                  sourceMap: false,
                  autoLabel: 'never',
                  cssPropOptimization: true
                }]
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      parallel: true,
      extractComments: false,
      terserOptions: {
        ecma: 2020,
        mangle: true,
        format: { comments: false }
      }
    })],
    splitChunks: {
      cacheGroups: {
        vendors: {
          filename: WEBPACK_MASK_JS_VENDORS,
          test: /node_modules/,
          chunks: 'all'
        }
      }
    }
  }
})