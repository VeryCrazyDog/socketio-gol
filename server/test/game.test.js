'use strict'

// Include 3rd party modules
const { expect } = require('chai')

// Include module to test
const Game = require('../game.js')

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
})
