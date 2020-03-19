$(function () {
  const rows = 50
  const cols = 100

  const $grid = $('<table class="center fixed game">')
  for (let r = 0; r < rows; r++) {
    const $tr = $('<tr>')
    for (let c = 0; c < cols; c++) {
      $('<td></td>').appendTo($tr)
    }
    $tr.appendTo($grid)
  }
  $('#grid').replaceWith($grid)

  $grid.find('td').click(function () {
    $(this).toggleClass('alive')
    console.log('Clicked: ' + this.cellIndex + 'x' + this.parentNode.rowIndex)
  })
})
