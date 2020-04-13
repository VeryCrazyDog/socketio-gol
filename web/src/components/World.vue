<template>
  <table
    :class="cssClass"
    @[clickEventName]="$emit('world-selected')"
  >
    <tr
      v-for="(row, yIndex) in layout.value"
      :key="yIndex"
    >
      <Cell
        v-for="(cell, xIndex) in row"
        :key="xIndex"
        :color="cell.color"
        :is-clickable="areCellsClickable"
        @cell-clicked="$emit('cell-clicked', {x: xIndex, y: yIndex})"
      />
    </tr>
  </table>
</template>

<script>
import Cell from './Cell.vue'

const CELL_TEMPLATE = {
  color: null
}

// Consider to merge with Game class in `server/game.js`
export class WorldLayout {
  constructor (size) {
    size = size || { x: 0, y: 0 }
    const layout = []
    for (let y = 0; y < size.y; y++) {
      const row = []
      for (let x = 0; x < size.x; x++) {
        row.push({
          ...CELL_TEMPLATE
        })
      }
      layout.push(row)
    }
    this.layout = layout
  }

  get value () {
    return this.layout
  }

  update (cellList, options) {
    const layout = this.layout
    options = options || {}
    cellList.forEach(({ x, y, color }) => {
      if (y in layout && x in layout[y]) {
        const cell = layout[y][x]
        if (options.overwrite || cell.color === null) {
          cell.color = (options.color || color)
        }
      }
    })
  }
}

export default {
  name: 'World',
  components: {
    Cell
  },
  props: {
    layout: {
      type: Object,
      required: true,
      validator: function (value) {
        return value instanceof WorldLayout
      }
    },
    isSelectable: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    areCellsClickable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cssClass: function () {
      return [
        (this.isSelectable || this.areCellsClickable) ? 'clickable' : null,
        this.isSelected ? 'selected' : null
      ]
    },
    clickEventName: function () {
      return this.isSelectable ? 'click' : null
    }
  }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid gray;
  border-collapse: collapse;
}

table {
  margin: 10px auto;
  table-layout: fixed;
  width: max-content;
}

table.clickable:hover {
  cursor: pointer;
}

table.selected {
  border-style: double;
  border-color: red;
}
</style>
