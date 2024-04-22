const path = require("path");
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const { webpack } = require("webpack");
const clientFiles = [
  "video-edit-client-plugin.js",
  "video-watch-client-plugin.js",
  "router-client-plugin",
  "creator-client-plugin",
  "organization-client-plugin",
];

let config = clientFiles.map((f) => ({
  entry: "./client/" + f,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./" + f,
    library: "script",
    libraryTarget: "var",
  },
  plugins: [new EsmWebpackPlugin()],
}));

module.exports = config;
