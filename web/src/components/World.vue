<template>
  <table
    :class="cssClass"
    @[clickEventName]="$emit('world-selected')"
  >
    <tr
      v-for="(row, yIndex) in layout"
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

function updateLayout (layout, cellList) {
  cellList.forEach(({ x, y, color }) => {
    if (y in layout && x in layout[y]) {
      const cell = layout[y][x]
      if (color) {
        cell.color = color
      } else {
        cell.color = null
      }
    }
  })
}

export default {
  name: 'World',
  components: {
    Cell
  },
  props: {
    size: {
      type: Object,
      required: true,
      validator: function (value) {
        return value && value.x >= 0 && value.y >= 0
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
    },
    cellList: {
      type: Array,
      default: function () {
        return []
      },
      validator: function (value) {
        return value.every(item => {
          return (item && item.x >= 0 && item.y >= 0)
        })
      }
    }
  },
  data: function () {
    // Rely on `immediate: true` to update the layout to avoid code complexity
    return {
      layout: []
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
  },
  watch: {
    size: {
      handler: function () {
        const result = []
        for (let y = 0; y < this.size.y; y++) {
          const row = []
          for (let x = 0; x < this.size.x; x++) {
            row.push({ color: null })
          }
          result.push(row)
        }
        updateLayout(result, this.cellList)
        this.layout = result
      },
      immediate: true
    },
    cellList: function () {
      updateLayout(this.layout, this.cellList)
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
