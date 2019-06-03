const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  inject: "body"
});
const dev = process.env.NODE_ENV !== "production";

module.exports = {
  devServer: {
    host: "localhost",
    port: 3000,
    hot: true,
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    historyApiFallback: true
  },
  mode: dev ? "development" : "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader?limit=8000&name=images/[name].[ext]"
        }
      }
    ]
  },
  plugins: dev
    ? [
      htmlWebpackPluginConfig,
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(["dist"])
    ]
    : [htmlWebpackPluginConfig, new CleanWebpackPlugin(["dist"])]
};
