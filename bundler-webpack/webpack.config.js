const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   entry: "./src/index.ts",
   output: {
      filename: "bundle.js",
      path: path.resolve("dist"),
      clean: true,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html',
      }),
      new MiniCssExtractPlugin({
         filename: 'styles.css',
      })
   ],
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.(js|jsx)$/,
            exclude: "/node-modules/",
            use: "babel-loader"

         },
         {
            test: /\.html$/,
            use: "html-loader"
         },
         {
            test: /\.(scss|sass)$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
         }
     ]
  }
}
 