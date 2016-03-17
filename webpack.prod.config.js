// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */

// Webpack Plugins
var webpack = require('webpack');
var helpers = require('./helpers');

var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
var DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 80;
const METADATA = {
    title: 'Angular2 Webpack Starter by @gdi2990 from @AngularClass',
    baseUrl: '/angular2-webpack-minimal/dist/',
    host: HOST,
    port: PORT,
    ENV: ENV
};

var metadata = {
    title: 'Angular2 Webpack Starter prod',
    baseUrl: '/angular2-webpack-minimal/dist/', //assuming running from http://localhost/angular2-webpack-minimal/
    host: HOST,
    port: PORT,
    ENV: ENV
};

/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: METADATA,
    // for faster builds use 'eval'
    devtool: 'source-map',
    debug: false,

    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'main': './src/main.ts'
    },

    // Config for our build files
    output: {
        path: helpers.root('dist'),
        filename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[name].[chunkhash].bundle.map',
        chunkFilename: '[id].[chunkhash].chunk.js'
    },

    resolve: {
        cache: false,
        // ensure loader extensions match
        extensions: helpers.prepend(['.ts', '.js', '.json', '.css', '.html'], '.async') // ensure .async.ts etc also works
    },

    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                exclude: [
                    helpers.root('node_modules')
                ]
            },
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: [
                    helpers.root('node_modules/rxjs')
                ]
            }
        ],
        loaders: [
            // Typescript loader support for .ts and Angular 2 async routes via .async.ts
            //
            // See: https://github.com/s-panferov/awesome-typescript-loader
            {
                test: /\.ts$/, loader: 'awesome-typescript-loader',
                query: {
                    'compilerOptions': {

                        // Remove TypeScript helpers to be injected
                        // below by DefinePlugin
                        'removeComments': true

                    }
                },
                exclude: [
                    /\.(spec|e2e)\.ts$/
                ]
            },
            // Support for *.json files.
            { test: /\.json$/, loader: 'json-loader' },

            // Support for CSS as raw text
            { test: /\.css$/, loader: 'raw-loader' },

            // support for .html as raw text
            { test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')] }

            // if you add a loader include the file extension
        ]
    },

    plugins: [
        // Plugin: ForkCheckerPlugin
        // Description: Do type checking in a separate process, so webpack don't need to wait.
        //
        // See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
        new ForkCheckerPlugin(),

        // Plugin: WebpackMd5Hash
        // Description: Plugin to replace a standard webpack chunkhash with md5.
        //
        // See: https://www.npmjs.com/package/webpack-md5-hash
        new WebpackMd5Hash(),

        // Plugin: DedupePlugin
        // Description: Prevents the inclusion of duplicate code into your bundle
        // and instead applies a copy of the function at runtime.
        //
        // See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        // See: https://github.com/webpack/docs/wiki/optimization#deduplication
        new DedupePlugin(),

        // Plugin: OccurenceOrderPlugin
        // Description: Varies the distribution of the ids to get the smallest id length
        // for often used ids.
        //
        // See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
        // See: https://github.com/webpack/docs/wiki/optimization#minimize
        new OccurenceOrderPlugin(true),

        // Plugin: CommonsChunkPlugin
        // Description: Shares common code between the pages.
        // It identifies common modules and put them into a commons chunk.
        //
        // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
        new CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),

        // Plugin: CopyWebpackPlugin
        // Description: Copy files and directories in webpack.
        //
        // Copies project static assets.
        //
        // See: https://www.npmjs.com/package/copy-webpack-plugin
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),

        // Plugin: HtmlWebpackPlugin
        // Description: Simplifies creation of HTML files to serve your webpack bundles.
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation.
        //
        // See: https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({ template: 'src/index.html', chunksSortMode: 'none' }),

        // Plugin: DefinePlugin
        // Description: Define free variables.
        // Useful for having development builds with debug logging or adding global constants.
        //
        // Environment helpers
        //
        // See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
        new DefinePlugin({ 'ENV': JSON.stringify(METADATA.ENV), 'HMR': false }),

        new UglifyJsPlugin({
            // to debug prod builds uncomment //debug lines and comment //prod lines

            // beautify: true,//debug
            // mangle: false,//debug
            // dead_code: false,//debug
            // unused: false,//debug
            // deadCode: false,//debug
            // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
            // comments: true,//debug

            beautify: false,//prod
            // disable mangling because of a bug in angular2 beta.1, beta.2 and beta.3
            // TODO(mastertinner): enable mangling as soon as angular2 beta.4 is out
            // mangle: { screw_ie8 : true },//prod
            mangle: false,
            compress: { screw_ie8: true },//prod
            comments: false//prod

        }),
        // include uglify in production
        new CompressionPlugin({
            algorithm: helpers.gzipMaxLevel,
            regExp: /\.css$|\.html$|\.js$|\.map$/,
            threshold: 2 * 1024
        })
    ],
    // Other module loader config
    tslint: {
        emitErrors: true,
        failOnHint: true
    },
    // don't use devServer for production

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


