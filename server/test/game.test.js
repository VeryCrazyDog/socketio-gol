'use strict'

// Include 3rd party modules
const { expect } = require('chai')

// Include our modules
const randomColor = require('../random-color.js')

// Include module to test
const Game = require('../game.js')

// Private functions
function verifyNextWorld (game, expectedOutput, newCells) {
  const outputLookup = expectedOutput.reduce((accumulator, [x, y]) => {
    if (!(y in accumulator)) {
      accumulator[y] = []
    }
    accumulator[y][x] = true
    return accumulator
  }, [])
  if (newCells) {
    game.addCells(newCells.map(([x, y]) => ({ x, y })), randomColor())
  }
  game.nextWorld()
  game.worldInfo.cellList.forEach(cell => {
    const expected = (outputLookup[cell.y] || [])[cell.x]
    expect(
      !!(cell.color) === !!expected,
      `Cell at ${JSON.stringify({ x: cell.x, y: cell.y })}`
    ).to.be.true
  })
}

// Test cases
describe('game.js', function () {
  describe('constructor()', function () {
    it('should create correct world size for 1x1', function () {
      const worldInfo = (new Game(1, 1)).worldInfo
      expect(worldInfo.xLength).to.equal(1)
      expect(worldInfo.yLength).to.equal(1)
      expect(worldInfo.cellList).to.have.lengthOf(1 * 1)
    })

    it('should create correct world size for 3x5', function () {
      const worldInfo = (new Game(3, 5)).worldInfo
      expect(worldInfo.xLength).to.equal(3)
      expect(worldInfo.yLength).to.equal(5)
      expect(worldInfo.cellList).to.have.lengthOf(3 * 5)
    })

    it('should create correct world size for 7x4', function () {
      const worldInfo = (new Game(7, 4)).worldInfo
      expect(worldInfo.xLength).to.equal(7)
      expect(worldInfo.yLength).to.equal(4)
      expect(worldInfo.cellList).to.have.lengthOf(7 * 4)
    })
  })

  describe('nextWorld()', function () {
    describe('still lifes', function () {
      it('should produce unchanged next world for block', function () {
        const INPUT = [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2]
        ]
        verifyNextWorld(new Game(4, 4), INPUT, INPUT)
      })

      it('should produce unchanged next world for bee-hive', function () {
        const INPUT = [
          [2, 1],
          [3, 1],
          [1, 2],
          [4, 2],
          [2, 3],
          [3, 3]
        ]
        verifyNextWorld(new Game(6, 5), INPUT, INPUT)
      })

      it('should produce unchanged next world for boat', function () {
        const INPUT = [
          [1, 1],
          [2, 1],
          [1, 2],
          [3, 2],
          [2, 3]
        ]
        verifyNextWorld(new Game(5, 5), INPUT, INPUT)
      })

      it('should produce unchanged next world for tub', function () {
        const INPUT = [
          [2, 1],
          [1, 2],
          [3, 2],
          [2, 3]
        ]
        verifyNextWorld(new Game(5, 5), INPUT, INPUT)
      })
    })

    describe('oscillators', function () {
      it('should produce correct next world for blinker', function () {
        const INPUT = [
          [2, 1],
          [2, 2],
          [2, 3]
        ]
        const TURN_1 = [
          [1, 2],
          [2, 2],
          [3, 2]
        ]
        const game = new Game(5, 5)
        verifyNextWorld(game, TURN_1, INPUT)
        verifyNextWorld(game, INPUT)
      })

      it('should produce correct next world for toad', function () {
        const INPUT = [
          [2, 2],
          [3, 2],
          [4, 2],
          [1, 3],
          [2, 3],
          [3, 3]
        ]
        const TURN_1 = [
          [3, 1],
          [1, 2],
          [4, 2],
          [1, 3],
          [4, 3],
          [2, 4]
        ]
        const game = new Game(6, 6)
        verifyNextWorld(game, TURN_1, INPUT)
        verifyNextWorld(game, INPUT)
      })

      it('should produce correct next world for beacon', function () {
        const INPUT = [
          [1, 1],
          [2, 1],
          [1, 2],
          [2, 2],
          [3, 3],
          [4, 3],
          [3, 4],
          [4, 4]
        ]
        const TURN_1 = [
          [1, 1],
          [2, 1],
          [1, 2],
          [4, 3],
          [3, 4],
          [4, 4]
        ]
        const game = new Game(6, 6)
        verifyNextWorld(game, TURN_1, INPUT)
        verifyNextWorld(game, INPUT)
      })
    })

    describe('border cases', function () {
      it('should produce correct next world for blinker', function () {
        const INPUT = [
          [1, 0],
          [1, 1],
          [1, 2]
        ]
        const TURN_1 = [
          [0, 1],
          [1, 1],
          [2, 1]
        ]
        const game = new Game(3, 3)
        verifyNextWorld(game, TURN_1, INPUT)
        verifyNextWorld(game, INPUT)
      })
    })

    describe('mix color', function () {
      // TOOD Implement
      it('should produce correct cell color in next world for blinker')
    })
  })
})
