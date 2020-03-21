'use strict'

// Include 3rd party modules
const loglevel = require('loglevel')
const loglevelPrefix = require('loglevel-plugin-prefix')

// Build level description mapping
const levelDescriptions = Object.entries(loglevel.levels).reduce((accumulator, [desc, index]) => {
  accumulator[index] = desc
  return accumulator
}, [])

// Module initialization
loglevel.setDefaultLevel('debug')
loglevelPrefix.reg(loglevel)
loglevelPrefix.apply(loglevel, {
  template: '%t [%l]',
  timestampFormatter: date => date.toISOString()
})

// Apply our log level
if (process.env.LOG_LEVEL && process.env.LOG_LEVEL.toUpperCase() in loglevel.levels) {
  loglevel.setLevel(process.env.LOG_LEVEL)
}

// Add extra function
loglevel.getLevelDescription = function () {
  return levelDescriptions[this.getLevel()]
}

module.exports = loglevel
