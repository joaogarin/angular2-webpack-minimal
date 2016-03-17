// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var webpack = require('webpack');
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');
var METADATA = {
  title: 'Angular2 Minimal Starter',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV,
  HMR: HMR
};

/*
 * Config
 */
module.exports = {
  // static data for index.html
  metadata: METADATA,
  // for faster builds use 'eval'
  devtool: 'source-map',
  debug: true,
  // cache: false,

  // our angular app
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'main': './src/main.ts'
  },

  // Config for our build files
  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    // ensure loader extensions match
    extensions: helpers.prepend(['.ts', '.js', '.json', '.css', '.html'], '.async') // ensure .async.ts etc also works
  },

  module: {
    loaders: [
      // Support Angular 2 async routes via .async.ts
      {
        test: /\.async\.ts$/,
        loaders: ['es6-promise-loader', 'ts-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/\.(spec|e2e)\.ts$/]
      },

      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      // Support for CSS as raw text
      {test: /\.css$/, loader: 'raw-loader'},

      // support for .html as raw text
      {test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')]}

      // if you add a loader include the resolve file extension above
    ]
  },

  plugins: [
    // Plugin: ForkCheckerPlugin
    // Description: Do type checking in a separate process, so webpack don't need to wait.
    //
    // See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
    new ForkCheckerPlugin(),

    // Plugin: OccurenceOrderPlugin
    // Description: Varies the distribution of the ids to get the smallest id length
    // for often used ids.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    // See: https://github.com/webpack/docs/wiki/optimization#minimize
    new webpack.optimize.OccurenceOrderPlugin(true),

    // Plugin: CommonsChunkPlugin
    // Description: Shares common code between the pages.
    // It identifies common modules and put them into a commons chunk.
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
    new webpack.optimize.CommonsChunkPlugin({name: ['main', 'vendor', 'polyfills'], minChunks: Infinity}),

    // Plugin: CopyWebpackPlugin
    // Description: Copy files and directories in webpack.
    //
    // Copies project static assets.
    //
    // See: https://www.npmjs.com/package/copy-webpack-plugin
    new CopyWebpackPlugin([{from: 'src/assets', to: 'assets'}]),

    // Plugin: HtmlWebpackPlugin
    // Description: Simplifies creation of HTML files to serve your webpack bundles.
    // This is especially useful for webpack bundles that include a hash in the filename
    // which changes every compilation.
    //
    // See: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({template: 'src/index.html', chunksSortMode: 'none'}),

    // Plugin: DefinePlugin
    // Description: Define free variables.
    // Useful for having development builds with debug logging or adding global constants.
    //
    // Environment helpers
    //
    // See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
    new webpack.DefinePlugin({'ENV': JSON.stringify(METADATA.ENV), 'HMR': HMR})
  ],

  // Other module loader config
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  // our Webpack Development Server config
  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    // contentBase: 'src/',
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
  },
  // we need this due to problems with es6-shim
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
