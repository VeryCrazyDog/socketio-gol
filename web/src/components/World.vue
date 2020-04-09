<template>
  <table class="center fixed game">
    <tr
      v-for="y in yLen"
      :key="y"
    >
      <td
        v-for="x in xLen"
        :key="x"
      />
    </tr>
  </table>
</template>

<script>
export default {
  name: 'World',
  props: {
    xLen: {
      type: Number,
      default: 0
    },
    yLen: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
table, th, td {
  border: 1px solid gray;
  border-collapse: collapse;
}

table.center {
  margin-left: auto;
  margin-right: auto;
}

table.fixed {
  table-layout: fixed;
  width: max-content;
}

table.selectable:hover {
  cursor: pointer;
}

table.game.selected {
  border-style: double;
  border-color: red;
}

table.game td {
  height: 15px;
  width: 15px;
}
</style>
