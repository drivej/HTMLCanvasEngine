const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');
// const dotenv = require('dotenv-webpack');

// var dotenv = require('dotenv').config({ path: __dirname + '/.env' });

// console.log('dotenv.parsed', dotenv.parsed);

module.exports = (env) => {
  return {
    entry: './src/index.ts',
    devtool: 'source-map',
    plugins: [
      // new dotenv(),
      // new webpack.EnvironmentPlugin({ SWELL_API: 'nope' }),
      // new webpack.DefinePlugin({
      //   'process.env': dotenv.parsed,
      // }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new HtmlWebpackPlugin({
        title: 'Output Management',
      }),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.jpeg', '.jpg', '.png', '.svg', '.gif'],
      alias: {
        '@src/': path.resolve(__dirname, 'src/'),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'ts-loader'],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    devServer: {
      publicPath: './dist',
      contentBase: './dist',
      writeToDisk: true,
      port: 5000,
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
