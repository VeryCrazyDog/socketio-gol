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

// Chatroom

let numUsers = 0

io.on('connection', (socket) => {
  let addedUser = false

  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    })
  })

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return

    // we store the username in the socket session for this client
    socket.username = username
    ++numUsers
    addedUser = true
    socket.emit('login', {
      numUsers: numUsers
    })
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    })
  })

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    })
  })

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    })
  })

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      })
    }
  })
})

// Start server
server.listen(port, () => {
  logger.info(`Server ready at http://localhost:${port}`)
})