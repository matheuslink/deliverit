const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({filename: "css/main.css"});

module.exports = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/bundle.js',
  },
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, "dist"),
    port: 3333,
    open: true,
    stats: "errors-only",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader", 
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        enforce: "pre",        
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.(less|css)$/,
        use: extractLess.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }],
            // use style-loader in development
            fallback: "style-loader",
            publicPath: '/'
        })
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader?limit=30000&name=img/[name].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?name=img/[name].[ext]',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=css/fonts/[name].[ext]',
      }
    ]
  },
  plugins: [
      extractLess
  ]
}