function createWorld (size) {
  const $world = $('<table id="world" class="center fixed game">')
  for (let r = 0; r < size.height; r++) {
    const $tr = $('<tr>')
    for (let c = 0; c < size.width; c++) {
      $('<td></td>').appendTo($tr)
    }
    $tr.appendTo($world)
  }
  return $world
}

function hookWorld (socket, $world) {
  $world.find('td').click(function () {
    $(this).addClass('alive')
    socket.emit('add cells', {
      posList: [
        {
          x: this.cellIndex,
          y: this.parentNode.rowIndex
        }
      ]
    })
    // TODO Remove console.log
    console.log('Clicked: ' + this.cellIndex + 'x' + this.parentNode.rowIndex)
  })
}

$(function () {
  // Create socket
  const socket = io()

  // jQuery objects
  let $world = $('#world')

  // Game world initialization
  socket.on('world info', function (data) {
    const $newWorld = createWorld({ width: data.width, height: data.height })
    $world.replaceWith($newWorld)
    $world = $newWorld
    data.layout.forEach(function (row) {
      row.forEach(function (cell) {
        // TODO Boundary check
        const $cell = $($world[0].rows[cell.y].cells[cell.x])
        if (cell.color) {
          $cell.addClass('alive')
        } else {
          $cell.removeClass('alive')
        }
      })
    })
    hookWorld(socket, $world)
  })

  socket.on('new cells', function (data) {
    data.posList.forEach(function (pos) {
      // TODO Implement setCellColor($world, x, y, color)
      $($world[0].rows[pos.y].cells[pos.x]).addClass('alive')
    })
  })
})
