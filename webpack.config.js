module.exports = {
  entry: [
    "babel-polyfill",
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot-loader!babel-loader'
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    "alias": {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'movielisting.bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
