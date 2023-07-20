const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (_, argv) => {
  const isProd = argv.mode === "production";
  return {
    mode: argv.mode,
    entry: {
      app: path.join(__dirname, "src", "frontend", "index.js"),
    },
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "main.js",
    },
    devtool: isProd ? "hidden-source-map" : "eval-source-map",
    devServer: {
      port: parseInt(argv.port) || 5000,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: /\.css$/,
          loader: "style-loader",
        },
        {
          test: /\.css$/,
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[local]",
            },
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: path.resolve(__dirname, "dist", "fonts"),
              },
            },
          ],
        },
      ],
    },
    optimization: isProd
      ? {
          minimize: true,
          minimizer: [new TerserPlugin()],
        }
      : {},
    plugins: [
      new DefinePlugin({
        "process.env": {},
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "assets", "index.html"),
      }),
    ],
  };
};
