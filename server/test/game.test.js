'use strict'

// Include 3rd party modules
const { expect } = require('chai')

// Include module to test
const Game = require('../game.js')

// Private functions
function verifyNextWorld (game, input, expectedOutput) {
  const outputLookup = expectedOutput.reduce((accumulator, [x, y]) => {
    if (!(y in accumulator)) {
      accumulator[y] = []
    }
    accumulator[y][x] = true
    return accumulator
  }, [])

  game.addCells(input.map(([x, y]) => ({ x, y })), 'rgb(255,0,0)')
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
    it('should produce correct next world for blinker', function () {
      const INPUT = [
        [2, 1],
        [2, 2],
        [2, 3]
      ]
      const EXPECTED_OUTPUT = [
        [1, 2],
        [2, 2],
        [3, 2]
      ]
      verifyNextWorld(new Game(5, 5), INPUT, EXPECTED_OUTPUT)
    })
  })
})
