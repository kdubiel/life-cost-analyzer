const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv');
const DotenvWebpack = require('dotenv-webpack');

Dotenv.config();
const { NODE_ENV = 'development' } = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new DotenvWebpack({
      allowEmptyValues: true,
    }),
  ],
  stats: {
    warningsFilter: [/critical dependency:/i],
  },
  devtool: 'inline-source-map',
};
