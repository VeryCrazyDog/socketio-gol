'use strict'

// Include 3rd party modules
const consoleLogLevel = require('console-log-level')

// Module initialization
const logger = consoleLogLevel({
  level: process.env.LOG_LEVEL || 'debug',
  prefix: (level) => {
    return `${new Date().toISOString()} [${level.toUpperCase()}]`
  }
})

module.exports = logger
