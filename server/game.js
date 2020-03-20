'use strict'

// Include our modules
const logger = require('./logger.js')

const CELL_TEMPLATE = {
  x: null,
  y: null,
  color: null
}

class Game {
  constructor (worldWidth, worldHeight) {
    this.xLen = worldWidth
    this.yLen = worldHeight
    const layout = []
    for (let y = 0; y < worldHeight; y++) {
      const row = []
      for (let x = 0; x < worldWidth; x++) {
        row.push({
          ...CELL_TEMPLATE,
          x,
          y
        })
      }
      layout.push(row)
    }
    this.layout = layout
  }

  getWorldInfo () {
    return {
      width: this.xLen,
      height: this.yLen,
      layout: this.layout
    }
  }

  addCells (posList) {
    const result = []
    posList.forEach(({ x, y }) => {
      if (x >= 0 && x < this.xLen && y >= 0 && y <= this.yLen) {
        this.layout[y][x].color = true
        result.push({ x, y })
      } else {
        logger.warn(`Invalid new cell position ${JSON.stringify({ x, y })}`)
      }
    })
    return result
  }
}

module.exports = Game
