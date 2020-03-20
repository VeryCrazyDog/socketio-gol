function createWorld ({ width, height }) {
  const $world = $('<table id="world" class="center fixed game">')
  for (let r = 0; r < height; r++) {
    const $tr = $('<tr>')
    for (let c = 0; c < width; c++) {
      $('<td></td>').appendTo($tr)
    }
    $tr.appendTo($world)
  }
  return $world
}

function hookWorld ($world, socket) {
  $world.find('td').click(function () {
    $(this).addClass('alive')
    socket.emit('new cells', {
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
  socket.on('world info', (data) => {
    const $newWorld = createWorld({ width: data.width, height: data.height })
    $world.replaceWith($newWorld)
    $world = $newWorld
    hookWorld($world, socket)
    data.layout.forEach(row => {
      row.forEach(cell => {
        // TODO Boundary check
        const $cell = $($world[0].rows[cell.y].cells[cell.x])
        if (cell.color) {
          $cell.addClass('alive')
        } else {
          $cell.removeClass('alive')
        }
      })
    })
  })

  socket.on('new cells', (data) => {
    data.posList.forEach(({ x, y }) => {
      // TODO Cache jQuery object into variable
      $($world[0].rows[y].cells[x]).addClass('alive')
    })
  })
})
