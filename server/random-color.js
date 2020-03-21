'use strict'

// Include 3rd party modules
const color = require('color')

// Constants
const RATIO = 0.618033988749895

// Seed
let hue = Math.random()

module.exports = function (saturation, value) {
  hue += RATIO
  hue %= 1

  if (typeof saturation !== 'number') {
    saturation = 0.5
  }

  if (typeof value !== 'number') {
    value = 0.95
  }

  return color({
    h: hue * 360,
    s: saturation * 100,
    v: value * 100
  })
}
