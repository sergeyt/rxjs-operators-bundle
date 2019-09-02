const path = require("path");

const makeConfig = isProd => {
  const ext = isProd ? ".min.js" : ".js";
  const babelLoader = {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      sourceMaps: true
    }
  };
  return {
    mode: isProd ? "production" : "development",
    devtool: "source-map",
    entry: {
      bundle: "./src/rxjs-operators.js"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: `[name]${ext}`,
      libraryTarget: "umd"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: babelLoader
        }
      ]
    },
    externals: {
      rxjs: "rxjs"
    }
  };
};

module.exports = [makeConfig(false), makeConfig(true)];
