'use strict'

// Include built-in modules
const path = require('path')
const http = require('http')

// Include 3rd party modules
const consoleLogLevel = require('console-log-level')
const express = require('express')
const socketIo = require('socket.io')

// Determinate configuration
const MAX_HTTP_BUFFER_SIZE = 8192
const port = process.env.PORT || 3000

// Module initialization
const logger = consoleLogLevel({
  level: 'debug',
  prefix: (level) => {
    return `${new Date().toISOString()} [${level.toUpperCase()}]`
  }
})
const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  maxHttpBufferSize: MAX_HTTP_BUFFER_SIZE,
  cookie: false
})

// Routing setup
app.use(express.static(path.join(path.dirname(__dirname), 'public')))

io.on('connection', (socket) => {
  logger.info(`Client ${socket.id}: Connected`)

  socket.on('new cells', (dataStr) => {
    let dataObj
    try {
      dataObj = JSON.parse(dataStr)
    } catch (error) {
      dataObj = null
    }
    if (dataObj !== null) {
      const firstPos = dataObj.posList[0] || {}
      logger.debug(`Client ${socket.id}: New cells at first position x=${firstPos.x}, y=${firstPos.y}`)
      socket.broadcast.emit('new cells', dataStr)
    }
  })
})

// Start server
server.listen(port, () => {
  logger.info(`Server ready at http://localhost:${port}`)
})
