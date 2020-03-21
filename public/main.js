const KEY_IS_COLOR_SET = 'IS_ALIVE'

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

function setCellColor ($cell, color) {
  $cell.css('background-color', color !== null ? color : '')
  $cell.data(KEY_IS_COLOR_SET, color !== null)
}

function setCellColorByPos ($world, x, y, color) {
  if (y in $world[0].rows && x in $world[0].rows[y].cells) {
    setCellColor($($world[0].rows[y].cells[x]), color)
  }
}

function updateWorld ($world, cellList) {
  cellList.forEach(function (cell) {
    setCellColorByPos($world, cell.x, cell.y, cell.color)
  })
}

function addToolboxItem (size, cellList, $leftBar, isSelected) {
  const $result = createWorld(size)
  cellList.forEach(function (cell) {
    cell.color = 'lightblue'
  })
  updateWorld($result, cellList)
  if (isSelected) {
    $result.addClass('selected')
  }
  $result.appendTo($leftBar)

  $result.click(function () {
    $leftBar.find('table').removeClass('selected')
    $result.addClass('selected')
  })
}

function hookWorld ($world, socket, color) {
  $world.find('td').click(function () {
    const $this = $(this)
    if (!isCellColorSet($this)) {
      setCellColor($this, color)
      socket.emit('add cells', {
        posList: [
          {
            x: this.cellIndex,
            y: this.parentNode.rowIndex
          }
        ]
      })
    }
  })
}

$(function () {
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
    updateWorld($world, data.world.cellList)
    hookWorld($world, socket, data.player.color)
  })

  // Game events
  socket.on('new cells', function (data) {
    data.cellList.forEach(function (cell) {
      setCellColorByPos($world, cell.x, cell.y, cell.color)
    })
  })

  socket.on('update world', function (data) {
    updateWorld($world, data.cellList)
  })
})
