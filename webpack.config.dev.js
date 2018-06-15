var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:3000`,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    })
  ],
  devServer: {
    contentBase: process.cwd(),
    inline: true,
    hot: true,
    stats: {
      colors: true,
      chunks: false,
      'errors-only': true
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules|bower_components/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }]
  },
  resolve: { extensions: ['.js', '.jsx'] }
}
