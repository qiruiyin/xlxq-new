var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

originalConfig = {
  entry: {
    app: './src/main.js'
  },
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
      'node': path.resolve(__dirname, '../node_modules'),
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'modules': path.resolve(__dirname, '../src/modules'),
      'services': path.resolve(__dirname, '../src/services'),
      'lib': path.resolve(__dirname, '../bower_components')
    }
  },
  module: {
    rules: [
      {
      //   test: /\.(js|vue)$/,
      //   // loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src'), resolve('test')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },{
        test: /\.css$/,
        loader: 'style!css!autoprefixer'
      },{
        test: /\.scss$/,
        loader: 'sass'
      },{
        test: /\.less$/,
        loader: 'less'
      },{
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },{
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        postcss: [
          require('autoprefixer')({
            // 浏览器兼容版本，可根据需求变更，
            // 由于本项目是微信项目，参考vux提示，采取该设置
            browsers: ['iOS >= 7', 'Android >= 4.1'] 
          })
        ]
      }
    })
  ]
}

var vuxLoader = require('vux-loader')
var webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    {
      name: 'vux-ui'
    },{
      name: 'less-theme',
      path: 'src/assets/css/themes.less'
    }

  ]
})
