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
  }
}
