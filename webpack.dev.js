var path = require('path')
module.exports = {
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'app')],
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader'}, { loader: 'css-loader' }],
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'app'),
    },
    compress: true,
    port: 9000
  },
}
