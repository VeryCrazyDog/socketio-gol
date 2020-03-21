const KEY_IS_COLOR_SET = 'IS_ALIVE'

function createWorld (size) {
  const $world = $('<table id="world" class="center fixed game">')
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

  // Game world initialization
  socket.on('game start info', function (data) {
    const $newWorld = createWorld({ x: data.world.xLength, y: data.world.yLength })
    $world.replaceWith($newWorld)
    $world = $newWorld
    updateWorld($world, data.world.cellList)
    hookWorld($world, socket, data.player.color)
  })

  socket.on('new cells', function (data) {
    data.cellList.forEach(function (cell) {
      setCellColorByPos($world, cell.x, cell.y, cell.color)
    })
  })

  socket.on('update world', function (data) {
    updateWorld($world, data.cellList)
  })
})
