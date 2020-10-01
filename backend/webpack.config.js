const BundleTracker = require("webpack-bundle-tracker");


module.exports = {
  entry: "./frontendapp/src/index.jsx",
  plugins: [
    new BundleTracker({ path: __dirname, filname: "webpack-stats.json" }),
  ],
  output: {
    filename: "main.js",
    path: __dirname + "/frontendapp/static/frontend",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ],
  },
};
