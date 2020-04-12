<template>
  <table :class="cssClass">
    <tr
      v-for="y in size.y"
      :key="y"
    >
      <Cell
        v-for="x in size.x"
        :key="x"
        :x="x"
        :y="y"
      />
    </tr>
  </table>
</template>

<script>
import Cell from './Cell.vue'

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
        return value && value.x && value.x > 0 && value.y && value.y > 0
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
    cellList: {
      type: Array,
      default: function () {
        return []
      },
      validator: function (value) {
        return value.every(item => {
          return (item && item.x && item.x > 0 && item.y && item.y > 0)
        })
      }
    }
  },
  computed: {
    cssClass: function () {
      return [
        this.isSelectable ? 'selectable' : null,
        this.isSelected ? 'selected' : null
      ]
    }
  },
  watch: {
    size: function () {
      const result = []
      for (let y = 0; y < this.size.y; y++) {
        const row = []
        for (let x = 0; x < this.size.x; x++) {
          row.push({ x, y, color: null })
        }
        result.push(row)
      }
      this.layout = result
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

table.selectable:hover {
  cursor: pointer;
}

table.selected {
  border-style: double;
  border-color: red;
}
</style>
