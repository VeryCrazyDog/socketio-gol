'use strict'

// Include our modules
const logger = require('./logger.js')
const randomColor = require('./random-color.js')

// Constants
const CELL_TEMPLATE = {
  x: null,
  y: null,
  color: null,
  nextColor: null
}
const POS_OFFSET_LIST = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
]

// Private functions
function updateNextColor (cell, world) {
  const nearByCellCount = POS_OFFSET_LIST.reduce((accumulator, [xOffset, yOffset]) => {
    const xCheck = cell.x + xOffset
    const yCheck = cell.y + yOffset
    if (yCheck in world && xCheck in world[yCheck] && world[yCheck][xCheck].color !== null) {
      accumulator++
    }
    return accumulator
  }, 0)
  if (cell.color === null) {
    if (nearByCellCount === 3) {
      // TODO Calculate the next color
      cell.nextColor = randomColor()
    }
  } else {
    if (nearByCellCount === 2 || nearByCellCount === 3) {
      cell.nextColor = cell.color
    } else {
      cell.nextColor = null
    }
  }
}

// Class to export
class Game {
  constructor (xLength, yLength) {
    this.turn = 0
    this.xLen = xLength
    this.yLen = yLength
    const layout = []
    for (let y = 0; y < yLength; y++) {
      const row = []
      for (let x = 0; x < xLength; x++) {
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

  get currentTurn () {
    return this.turn + 1
  }

  get worldInfo () {
    const cellList = []
    this.layout.forEach(row => {
      row.forEach(cell => {
        cellList.push({
          x: cell.x,
          y: cell.y,
          color: cell.color && cell.color.string()
        })
      })
    })
    return {
      xLength: this.xLen,
      yLength: this.yLen,
      cellList
    }
  }

  addCells (posList, color) {
    const result = []
    posList.forEach(({ x, y }) => {
      if (y in this.layout && x in this.layout[y]) {
        const cell = this.layout[y][x]
        if (cell.color === null) {
          cell.color = color
          result.push({ x, y, color: color.string() })
        }
      } else {
        logger.warn(`Invalid new cell position ${JSON.stringify({ x, y })}`)
      }
    })
    return result
  }

  nextWorld () {
    this.layout.forEach(row => {
      row.forEach(cell => {
        updateNextColor(cell, this.layout)
      })
    })
    this.layout.forEach(row => {
      row.forEach(cell => {
        cell.color = cell.nextColor
        cell.nextColor = null
      })
    })
    this.turn++
  }
}

module.exports = Game
