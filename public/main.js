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
  socket.on('world size', (data) => {
    const $newWorld = createWorld(data)
    $world.replaceWith($newWorld)
    $world = $newWorld
    hookWorld($world, socket)
  })

  socket.on('new cells', (data) => {
    data.posList.forEach(({ x, y }) => {
      // TODO Cache jQuery object into variable
      $($world[0].rows[y].cells[x]).addClass('alive')
    })
  })
})
