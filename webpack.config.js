const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // entry: './src/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'app.js'
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ttf|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.md$/,
        use: ['raw-loader'],
      },
    ],
  },
  plugins: [new MonacoWebpackPlugin()],
};
