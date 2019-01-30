module.exports = {
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/localdebug': {
        target: 'http://localhost:7801',
        changeOrigin: true,
        pathRewrite: {
          '^/localdebug': '/'
        }
      }
    }
  }
}
