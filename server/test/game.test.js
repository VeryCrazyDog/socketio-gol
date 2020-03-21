'use strict'

// Include 3rd party modules
const { expect } = require('chai')

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
    game.addCells(newCells.map(([x, y]) => ({ x, y })), 'rgb(255,0,0)')
  }
  game.nextWorld()
  game.worldInfo.layout.forEach(row => {
    row.forEach(cell => {
      const expected = (outputLookup[cell.y] || [])[cell.x]
      expect(
        !!(cell.color) === !!expected,
        `Cell at ${JSON.stringify({ x: cell.x, y: cell.y })}`
      ).to.be.true
    })
  })
}

// Test cases
describe('game.js', function () {
  describe('constructor()', function () {
    it('should create correct world size for 1x1', function () {
      const worldInfo = (new Game(1, 1)).worldInfo
      expect(worldInfo.xLength).to.equal(1)
      expect(worldInfo.yLength).to.equal(1)
      expect(worldInfo.layout).to.have.lengthOf(1)
      expect(worldInfo.layout[0]).to.have.lengthOf(1)
    })

    it('should create correct world size for 3x5', function () {
      const worldInfo = (new Game(3, 5)).worldInfo
      expect(worldInfo.xLength).to.equal(3)
      expect(worldInfo.yLength).to.equal(5)
      expect(worldInfo.layout).to.have.lengthOf(5)
      expect(worldInfo.layout[0]).to.have.lengthOf(3)
    })

    it('should create correct world size for 7x4', function () {
      const worldInfo = (new Game(7, 4)).worldInfo
      expect(worldInfo.xLength).to.equal(7)
      expect(worldInfo.yLength).to.equal(4)
      expect(worldInfo.layout).to.have.lengthOf(4)
      expect(worldInfo.layout[0]).to.have.lengthOf(7)
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
  })
})
