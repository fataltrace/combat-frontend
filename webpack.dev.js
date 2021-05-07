import webpack from 'webpack'
import { merge } from 'webpack-merge'
import dotenv from 'dotenv'
import common from './webpack.common.js'
// @todo Wait for https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/294
// import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const {
  WEBPACK_DEV_SERVER_PORT
} = dotenv.config().parsed

export default merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: common.output.path,
    hot: true,
    port: WEBPACK_DEV_SERVER_PORT,
    open: true,
    historyApiFallback: true
  },
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
                  sourceMap: true,
                  autoLabel: 'dev-only',
                  labelFormat: '[local]',
                  cssPropOptimization: false
                }]
                // @todo Wait for https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/294
                // 'react-refresh/babel'
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // @todo Wait for https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/294
    // new ReactRefreshWebpackPlugin()
  ]
})