module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args.forEach(arg => {
          if ('title' in arg) {
            arg.title = "Conway's Game of Life"
          }
        })
        return args
      })
  },
  devServer: {
    proxy: {
      '^/socket.io/*': {
        target: 'http://localhost:3000/socket.io/',
        secure: false
      }
    }
  },
}
