'use strict'

// Include built-in modules
const path = require('path')
const http = require('http')

// Include 3rd party modules
const express = require('express')
const socketIo = require('socket.io')

// Include our modules
const logger = require('./logger.js')
const Game = require('./game.js')

// Determinate configuration
const MAX_HTTP_BUFFER_SIZE = 8192
const DEFAULT_WORLD_WIDTH = 50
const DEFAULT_WORLD_HEIGHT = 25
const port = process.env.PORT || 3000

// Module initialization
const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  maxHttpBufferSize: MAX_HTTP_BUFFER_SIZE,
  cookie: false
})

// Server data
let clientIdSequence = 1
const game = new Game(DEFAULT_WORLD_WIDTH, DEFAULT_WORLD_HEIGHT)

// Routing setup
app.use(express.static(path.join(path.dirname(__dirname), 'public')))

// Socket events
io.on('connection', (socket) => {
  // Assign client ID
  const clientId = clientIdSequence
  clientIdSequence++
  logger.info(`Client ${clientId}: Connected with socket ID ${socket.id}`)

  // Send world info
  socket.emit('world info', game.getWorldInfo())

  // Game events
  socket.on('new cells', (data) => {
    logger.debug(`Client ${clientId}: New cells at positions ${JSON.stringify(data.posList)}`)
    const addedCells = game.addCells(data.posList)
    socket.broadcast.emit('new cells', {
      posList: addedCells
    })
  })
})

// Start server
server.listen(port, () => {
  logger.info(`Server ready at http://localhost:${port}`)
})
