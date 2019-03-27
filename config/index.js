'use strict'

module.exports = {
  build: {
    env: require('./prod.env').env,
    index: require('./prod.env').index,
    assetsRoot: require('./prod.env').assetsRoot,
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.DEV_PORT || 8098,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        // '/chargingbooth': {
        //     // target: 'http://120.25.135.137',
        //     target: 'http://192.168.10.210',
        //     changeOrigin: true, //是否跨域 
        //     pathRewrite: {
        //       '^/chargingbooth': '/chargingbooth'
        //     }
        // },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
