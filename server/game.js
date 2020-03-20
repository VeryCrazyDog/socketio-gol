'use strict'

class Game {
  constructor (worldWidth, worldHeight) {
    this.xLen = worldWidth
    this.yLen = worldHeight
  }

  getWorldSize () {
    return {
      width: this.xLen,
      height: this.yLen
    }
  }
}

module.exports = Game
