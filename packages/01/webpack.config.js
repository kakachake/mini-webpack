const path = require("path");
const MyPlugin = require("./plugin/myPlugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, "./loader/style-loader.js"),
          path.resolve(__dirname, "./loader/less-loader.js"),
        ],
      },
    ],
  },
  plugins: [new MyPlugin()],
};
