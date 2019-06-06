const path = require('path'),
  CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = {
  entry: {
    app: './app.js',
    // dataController: ['./sqlite'],
    // data: './jsong.sqlite'
    sqlite: ['sqlite3']
  },
  // webpakc默认打包浏览器环境，如果打包node需要指定
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015'] }
      },
      { test: /\.sqlite$/, use: ['file-loader'] }
    ]
  },
  node: {
    fs: true,
    net: true,
    child_process: true,
    tls: true,
    __dirname: true,
    __filename: true,
    module: true
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        sqlite: {
          name: 'sqlite',
          chunks: 'initial',
          minChunks: 2
        }
        // commons: {
        //   name: 'commons',
        //   chunks: 'initial',
        //   minChunks: 2
        // }
      }
    }
  }
};
