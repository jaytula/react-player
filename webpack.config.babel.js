import { join } from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const PORT = 3000
const PRODUCTION = process.env.NODE_ENV === 'production'
const PUBLIC_PATH = PRODUCTION ? '' : `http://localhost:${PORT}/`

const PATH_DEMO = join(__dirname, 'demo')
const PATH_SRC = join(__dirname, 'src')
const PATH_INDEX = join(__dirname, 'index.html')
const PATH_TESTS = join(__dirname, 'test', 'specs')

export const plugins = [
  new HtmlWebpackPlugin({
    template: PATH_INDEX,
    minify: {
      collapseWhitespace: true,
      quoteCharacter: '\''
    }
  })
]

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${PORT}`,
    'webpack/hot/only-dev-server',
    './src/demo/index'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [PATH_SRC, PATH_TESTS]
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader?sourceMap',
          'postcss-loader?sourceMap'
        ],
        include: PATH_SRC
      }
    ]
  },
  output: {
    path: PATH_DEMO,
    filename: 'app.js',
    publicPath: PUBLIC_PATH
  },
  plugins: [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    port: PORT,
    publicPath: PUBLIC_PATH,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }
}
