import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import Dotenv from 'dotenv-webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const absolutePath = (relativePath) => path.resolve(path.dirname(fileURLToPath(import.meta.url)), relativePath)

const {
  COMBAT_DOCUMENT_TITLE,
  WEBPACK_ENTRY,
  WEBPACK_BUILD,
  WEBPACK_ENTRY_HTML,
  WEBPACK_ENTRY_HTML_FAVICON,
  WEBPACK_MASK_JS_APP,
  WEBPACK_MASK_IMAGES,
  WEBPACK_MASK_FONTS
} = dotenv.config().parsed

export default {
  entry: {
    app: WEBPACK_ENTRY,
  },
  output: {
    publicPath: '/',
    filename: WEBPACK_MASK_JS_APP,
    path: absolutePath(WEBPACK_BUILD)
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@emotion'
            ]
          }
        }
      },
      {
        test: /\.(woff|woff2)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: WEBPACK_MASK_FONTS
          }
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: WEBPACK_MASK_IMAGES,
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: COMBAT_DOCUMENT_TITLE,
      template: WEBPACK_ENTRY_HTML,
      favicon: WEBPACK_ENTRY_HTML_FAVICON
    })
  ]
}