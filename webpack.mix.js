const mix = require("laravel-mix");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.config.webpackConfig.output = {
  chunkFilename: "js/[name].bundle.js",
  publicPath: "/"
};

mix
  .js("resources/js/app.js", "public/js")
  .sass("resources/sass/app.scss", "public/css")
  .webpackConfig({
    plugins: [
      new StyleLintPlugin({
        configFile: ".stylelintrc",
        context: "./resources",
        failOnError: false,
        files: ["**/*.scss"],
        quiet: false,
        syntax: "scss",
        options: {
          fix: true,
          cache: true
        }
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "static"
      })
    ],
    module: {
      rules: [{
        enforce: "pre",
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
          cache: true
        }
      }]
    }
  });

/**
 * Generate source maps only if we are in development mode. Else we ignore this action.
 */
if (!mix.inProduction) {
  mix.sourceMaps();
}