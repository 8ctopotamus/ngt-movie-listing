module.exports = {
  entry: [
    "babel-polyfill",
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
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
  }
}
