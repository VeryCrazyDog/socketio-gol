'use strict'

// Include our modules
const logger = require('./logger.js')

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
function getCellColorByRelPos (world, { x, y }, [xOffset, yOffset]) {
  const xNew = x + xOffset
  const yNew = y + yOffset
  let result = null
  if (yNew in world && xNew in world[yNew]) {
    result = world[yNew][xNew].color
  }
  return result
}

function updateNextColor (cell, world) {
  const nearByCellCount = POS_OFFSET_LIST.reduce((accumulator, offset) => {
    if (getCellColorByRelPos(world, cell, offset) !== null) {
      accumulator++
    }
    return accumulator
  }, 0)
  if (cell.color === null) {
    if (nearByCellCount === 3) {
      cell.nextColor = POS_OFFSET_LIST.reduce((accumulator, offset) => {
        const color = getCellColorByRelPos(world, cell, offset)
        if (color !== null) {
          if (accumulator !== null) {
            accumulator = accumulator.mix(color)
          } else {
            accumulator = color
          }
        }
        return accumulator
      }, null)
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
    return this.turn
  }

  get worldInfo () {
    // TODO Caching the cell list so that we can use the cached cell list for every
    //   client when there is no new cells added by clients
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
