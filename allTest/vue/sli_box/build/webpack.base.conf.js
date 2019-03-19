'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const happyPackPlugin = [
  new HappyPack({
    id: 'happy-babel-js',
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  }),
  new HappyPack({
    id: 'vue',
    cache: false,
    threadPool: happyThreadPool,
    loaders: [
      {
        loader: 'vue-loader',
        options: vueLoaderConfig
      }
    ]
  })
]

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: utils.entries(),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'api': resolve('src/api'),
      'const': resolve('src/const'),
      'components': resolve('src/components'),
      'model': resolve('src/model'),
      'modules': resolve('src/modules'),
      'pages': resolve('src/pages'),
      'utils': resolve('src/utils'),
      'store': resolve('src/store'),
      'assets': resolve('src/assets'),
      'views': resolve('src/views'),
      'mixins': resolve('src/mixins'),
      'common': resolve('src/common'),
      'config': resolve('src/config'),
      'websocket': resolve('src/websocket'),
      'plugins': resolve('src/plugins'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        // loader: 'vue-loader',
        // options: vueLoaderConfig
        loader: 'happypack/loader?id=vue'
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        loader: 'happypack/loader?id=happy-babel-js',
        include: [
          resolve('src'), 
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client'),
          resolve('node_modules/vue-echarts'),
          resolve('node_modules/resize-detector')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    })
  ].concat(happyPackPlugin)
}
