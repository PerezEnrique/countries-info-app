const path = require("path");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            }
          },
          {
            test: /\.html$/i,
            loader: 'html-loader',
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ],
          },
          {
            test: /\.(png|svg|jpg)$/i,
            type: 'asset/resource',
          },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: './public/index.html',
          filename: './index.html',
        }),
        new MiniCssExtractPlugin({
          filename: 'assets/styles/[name].css',
        }),
    ],
}