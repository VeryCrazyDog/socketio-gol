$(function () {
  const KEY_IS_COLOR_SET = 'IS_ALIVE'
  const KEY_POS_OFFSET_LIST = 'POS_OFFSET_LIST'

  function createWorld (size, id) {
    const $world = $('<table class="center fixed game">')
    if (id) {
      $world.attr('id', id)
    }
    for (let r = 0; r < size.y; r++) {
      const $tr = $('<tr>')
      for (let c = 0; c < size.x; c++) {
        $('<td></td>').appendTo($tr)
      }
      $tr.appendTo($world)
    }
    return $world
  }

  function isCellColorSet ($cell) {
    return !!$cell.data(KEY_IS_COLOR_SET)
  }

  function setCellColor ($cell, color, overwrite) {
    if (overwrite || !isCellColorSet($cell)) {
      $cell.css('background-color', color !== null ? color : '')
      $cell.data(KEY_IS_COLOR_SET, color !== null)
    }
  }

  function setCellColorByPos ($world, x, y, color, overwrite) {
    if (y in $world[0].rows && x in $world[0].rows[y].cells) {
      setCellColor($($world[0].rows[y].cells[x]), color, overwrite)
    }
  }

  function updateWorld ($world, cellList, options) {
    options = options || {}
    cellList.forEach(function (cell) {
      setCellColorByPos($world, cell.x, cell.y, options.color || cell.color, options.overwrite)
    })
  }

  function addToolboxItem (size, posList, $leftBar, isSelected) {
    const $result = createWorld(size)
    updateWorld($result, posList, {
      overwrite: true,
      color: 'lightblue'
    })
    if (isSelected) {
      $result.addClass('selected')
    }
    $result.appendTo($leftBar)

    const centerX = ~~(size.x / 2)
    const centerY = ~~(size.y / 2)
    $result.data(KEY_POS_OFFSET_LIST, posList.map(function (pos) {
      return {
        x: pos.x - centerX,
        y: pos.y - centerY
      }
    }))

    $result.click(function () {
      $leftBar.find('table').removeClass('selected')
      $result.addClass('selected')
    })
  }

  function hookWorld ($world, socket, playerColor) {
    $world.find('td').click(function () {
      const clickedX = this.cellIndex
      const clickedY = this.parentNode.rowIndex

      let offsetList = $('#leftbar table.selected').data(KEY_POS_OFFSET_LIST)
      if (!offsetList) {
        offsetList = { x: 0, y: 0 }
      }
      const posList = offsetList.map(function (offset) {
        return {
          x: clickedX + offset.x,
          y: clickedY + offset.y
        }
      })

      updateWorld($world, posList, { color: playerColor })
      socket.emit('add cells', {
        posList: posList
      })
    })
  }

  // Create socket
  const socket = io()

  // jQuery objects
  let $world = $('#world')
  const $leftBar = $('#leftbar')

  // Toolbox initialization
  addToolboxItem({ x: 3, y: 3 }, [
    { x: 1, y: 1 }
  ], $leftBar, true)
  addToolboxItem({ x: 5, y: 5 }, [
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2, y: 3 }
  ], $leftBar)
  addToolboxItem({ x: 5, y: 5 }, [
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 2, y: 3 }
  ], $leftBar)
  addToolboxItem({ x: 5, y: 5 }, [
    { x: 2, y: 1 },
    { x: 3, y: 2 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 }
  ], $leftBar)

  // Game world initialization
  socket.on('game start info', function (data) {
    const $newWorld = createWorld({ x: data.world.xLength, y: data.world.yLength }, 'world')
    $world.replaceWith($newWorld)
    $world = $newWorld
    updateWorld($world, data.world.cellList, { overwrite: true })
    setCellColor($('#player-color'), data.player.color)
    hookWorld($world, socket, data.player.color)
  })

  // Game events
  socket.on('new cells', function (data) {
    data.cellList.forEach(function (cell) {
      setCellColorByPos($world, cell.x, cell.y, cell.color, true)
    })
  })

  socket.on('update world', function (data) {
    updateWorld($world, data.cellList, { overwrite: true })
  })
})
