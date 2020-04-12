<template>
  <table :class="[isSelectable ? 'selectable' : null, isSelected ? 'selected' : null]">
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
    }
  },
  data: function () {
    return {
      posList: []
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
  margin-left: auto;
  margin-right: auto;
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
