module.exports = {
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:7801',
        changeOrigin: true
        // pathRewrite: {
        //   '^/': '/'
        // }
      }
    }
  }
}
