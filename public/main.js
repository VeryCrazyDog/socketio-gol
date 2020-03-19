$(function () {
  const rows = 50
  const cols = 100

  // Create socket
  const socket = io()

  // Game board initialization
  const $board = $('<table id="board" class="center fixed game">')
  for (let r = 0; r < rows; r++) {
    const $tr = $('<tr>')
    for (let c = 0; c < cols; c++) {
      $('<td></td>').appendTo($tr)
    }
    $tr.appendTo($board)
  }
  $('#board').replaceWith($board)

  $board.find('td').click(function () {
    $(this).addClass('alive')
    socket.emit('new cells', JSON.stringify({
      posList: [
        {
          x: this.cellIndex,
          y: this.parentNode.rowIndex
        }
      ]
    }))
    // TODO Remove console.log
    console.log('Clicked: ' + this.cellIndex + 'x' + this.parentNode.rowIndex)
  })

  socket.on('new cells', (dataStr) => {
    const jsonObj = JSON.parse(dataStr)
    jsonObj.posList.forEach(({ x, y }) => {
      // TODO Cache jQuery object into variable
      $($board[0].rows[y].cells[x]).addClass('alive')
    })
  })
})
