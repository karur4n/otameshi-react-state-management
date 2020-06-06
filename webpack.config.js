const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src'],
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
  ],
}
