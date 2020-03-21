'use strict'

// Include 3rd party modules
const { expect } = require('chai')

// Include module to test
const Game = require('../game.js')

describe('game.js', function () {
  describe('constructor()', function () {
    it('should create correct world size for 1x1', function () {
      const game = new Game(1, 1)
      expect(game.worldInfo.width).to.equal(1)
      expect(game.worldInfo.height).to.equal(1)
      expect(game.worldInfo.layout).to.have.lengthOf(1)
      expect(game.worldInfo.layout[0]).to.have.lengthOf(1)
    })

    it('should create correct world size for 3x5', function () {
      const game = new Game(3, 5)
      expect(game.worldInfo.width).to.equal(3)
      expect(game.worldInfo.height).to.equal(5)
      expect(game.worldInfo.layout).to.have.lengthOf(5)
      expect(game.worldInfo.layout[0]).to.have.lengthOf(3)
    })

    it('should create correct world size for 7x4', function () {
      const game = new Game(7, 4)
      expect(game.worldInfo.width).to.equal(7)
      expect(game.worldInfo.height).to.equal(4)
      expect(game.worldInfo.layout).to.have.lengthOf(4)
      expect(game.worldInfo.layout[0]).to.have.lengthOf(7)
    })
  })
})
