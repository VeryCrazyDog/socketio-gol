'use strict'

// Include built-in modules
const path = require('path')
const http = require('http')

// Include 3rd party modules
const express = require('express')
const socketIo = require('socket.io')

// Include our modules
const logger = require('./logger.js')
const randomColor = require('./random-color.js')
const Game = require('./game.js')

// Constants
const MAX_HTTP_BUFFER_SIZE = 8192
const DEFAULT_WORLD_XLENGTH = 45
const DEFAULT_WORLD_YLENGTH = 30
const DEFAULT_UPDATE_INTERVAL = 1000

// Determinate effective configuration
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
const game = new Game(DEFAULT_WORLD_XLENGTH, DEFAULT_WORLD_YLENGTH)
let intervalUpdateId = null

// Routing setup
app.use(express.static(path.join(path.dirname(__dirname), 'public')))

// Socket events
io.on('connection', (socket) => {
  // Update connection statistics
  connectedClientCount++
  // Assign client ID and color
  const clientId = clientIdSequence
  clientIdSequence++
  const clientColor = randomColor()
  logger.info(
    `Client ${clientId}: Connected,`,
    `assigned color: ${clientColor.string()},`,
    `socket ID ${socket.id},`,
    `current connected client: ${connectedClientCount}`
  )

  // Send player and game info
  socket.emit('game start info', {
    player: {
      id: clientId,
      color: clientColor.string()
    },
    world: game.worldInfo
  })

  // Connection handling
  socket.on('disconnect', () => {
    connectedClientCount--
    logger.info(`Client ${clientId}: Disconnected, current connected client: ${connectedClientCount}`)
    if (connectedClientCount <= 0 && intervalUpdateId !== null) {
      logger.info('Stopping interval update...')
      clearInterval(intervalUpdateId)
      intervalUpdateId = null
    }
  })

  // Game events
  socket.on('add cells', (data) => {
    logger.debug(`Client ${clientId}: Add cells at positions ${JSON.stringify(data.posList)}`)
    const addedCells = game.addCells(data.posList, clientColor)
    socket.broadcast.emit('new cells', {
      cellList: addedCells
    })
  })

  // Start interval update
  if (connectedClientCount > 0 && intervalUpdateId === null) {
    logger.info(`Starting interval update with ${DEFAULT_UPDATE_INTERVAL / 1000} seconds interval...`)
    intervalUpdateId = setInterval(() => {
      logger.debug(`Updating game world to turn ${game.currentTurn + 1}`)
      game.nextWorld()
      io.emit('update world', {
        cellList: game.worldInfo.cellList
      })
    }, DEFAULT_UPDATE_INTERVAL)
  }
})

// Start server
server.listen(port, () => {
  logger.info(
    `Server ready at http://localhost:${port}`,
    `running in mode ${process.env.NODE_ENV}`,
    `with log level ${logger.getLevelDescription()}`
  )
})
