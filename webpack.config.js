const HtmlWebPackPlugin = require('html-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')
const path = require('path')
const htmlPlugin = new HtmlWebPackPlugin({
  template: './index.html',
  filename: './index.html'
})

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    htmlPlugin,
    new NodemonPlugin({
      watch: path.resolve('./src/server'),
      script: path.resolve('./src/server/index.js'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  watch: true,
  watchOptions: {
    ignored: ['dist', 'node_modules'],
  },
}
