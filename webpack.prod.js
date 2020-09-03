// const path = require('path')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
          },
          mangle: {
            toplevel: true,
            // properties: false,
            properties: {
              regex: /(__[a-zA-Z]+)/,
            },
            // properties: {
            //   regex: /__/g,
            // },
          }, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
    ],
  },
  module: {
    rules: [
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      /**
       * Note: You can do HTLM minification here OR in `html-loader` - but not both.
       *
       * Exact filesize reduction may vary depending on settings used in each.
      */
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyURLs: true,
      },
    }),
    new ZipPlugin({
      // OPTIONAL: defaults to the Webpack output path (above)
      // can be relative (to Webpack output path) or absolute
      path: 'zip',

      // OPTIONAL: defaults to the Webpack output filename (above) or,
      // if not present, the basename of the path
      filename: 'dist.zip',

      // OPTIONAL: defaults to 'zip'
      // the file extension to use instead of 'zip'
      extension: 'zip',

      // OPTIONAL: defaults to the empty string
      // the prefix for the files included in the zip file
      pathPrefix: 'dist',

      // OPTIONAL: defaults to the identity function
      // a function mapping asset paths to new paths
      pathMapper: function (assetPath) {
        // put all pngs in an `images` subdir
        if (assetPath.endsWith('.png'))
          return path.join(path.dirname(assetPath), 'images', path.basename(assetPath));
        return assetPath;
      },

      // OPTIONAL: defaults to including everything
      // can be a string, a RegExp, or an array of strings and RegExps
      include: [/\.js$/],

      // OPTIONAL: defaults to excluding nothing
      // can be a string, a RegExp, or an array of strings and RegExps
      // if a file matches both include and exclude, exclude takes precedence
      exclude: [/\.png$/, /\.html$/],

      // yazl Options

      // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false,
      },

      // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
      zipOptions: {
        forceZip64Format: false,
      },
    })
  ],
})
