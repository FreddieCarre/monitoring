const { resolve, join } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        exclude: [resolve(__dirname, 'node_modules')],
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  entry: [
    'webpack/hot/poll?1000',
    join(__dirname, 'src/server.ts')
  ],
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000']
    })
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'server.js',
    path: resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: true,
  target: 'node'
};
