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

// Constants
const MAX_HTTP_BUFFER_SIZE = 8192
const DEFAULT_WORLD_WIDTH = 50
const DEFAULT_WORLD_HEIGHT = 25

// Determinate configuration
const port = process.env.PORT || 3000

// Module initialization
const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  maxHttpBufferSize: MAX_HTTP_BUFFER_SIZE,
  cookie: false
})

// Server data
let connectedClientCount = 0
let clientIdSequence = 1
const game = new Game(DEFAULT_WORLD_WIDTH, DEFAULT_WORLD_HEIGHT)

// Routing setup
app.use(express.static(path.join(path.dirname(__dirname), 'public')))

// Socket events
io.on('connection', (socket) => {
  // Update connection statistics
  connectedClientCount++
  // Assign client ID
  const clientId = clientIdSequence
  clientIdSequence++
  logger.info(
    `Client ${clientId}: Connected with socket ID ${socket.id},`,
    `current connected client: ${connectedClientCount}`
  )

  // Send world info
  socket.emit('world info', game.getWorldInfo())

  // Connection handling
  socket.on('disconnect', () => {
    connectedClientCount--
    logger.info(`Client ${clientId}: Disconnected, current connected client: ${connectedClientCount}`)
  })

  // Game events
  socket.on('add cells', (data) => {
    logger.debug(`Client ${clientId}: Add cells at positions ${JSON.stringify(data.posList)}`)
    const addedCells = game.addCells(data.posList)
    socket.broadcast.emit('new cells', {
      posList: addedCells
    })
  })
})

// Start server
server.listen(port, () => {
  logger.info(`Server ready at http://localhost:${port} running mode ${process.env.NODE_ENV}`)
})
