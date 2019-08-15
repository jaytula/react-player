import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import config, { plugins } from './webpack.config.babel'

export const minifyPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.LoaderOptionsPlugin({ minimize: true })
]

export default {
  ...config,
  devtool: 'source-map',
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    'whatwg-fetch',
    './src/demo/index'
  ],
  plugins: [
    ...plugins,
    ...minifyPlugins,
    new MiniCssExtractPlugin({ filename: 'app.css' })
  ]
}
