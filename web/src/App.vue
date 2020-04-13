<template>
  <div id="app">
    <h1>
      <a
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
      >Conway's Game of Life</a>
    </h1>
    <ToolboxSidebar position="left" />
    <div class="main">
      <World
        :size="world.size"
        :are-cells-clickable="true"
        @cell-clicked="cellClicked"
      />
    </div>
    <StatusSidebar position="right" />
  </div>
</template>

<script>
import ToolboxSidebar from './components/ToolboxSidebar.vue'
import World from './components/World.vue'
import StatusSidebar from './components/StatusSidebar.vue'

export default {
  name: 'App',
  components: {
    ToolboxSidebar,
    World,
    StatusSidebar
  },
  data: function () {
    return {
      world: {
        size: { x: 0, y: 0 },
        cellList: []
      }
    }
  },
  methods: {
    cellClicked: function (message) {
      // TODO Implement
      console.log('app', message)
    }
  },
  sockets: {
    'game start info': function (data) {
      this.world.size = { x: data.world.xLength, y: data.world.yLength }
      // updateWorld($world, data.world.cellList, { overwrite: true })
      // hookWorld($world, socket, data.player.color)
    }
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
}

a {
  color: lightgray;
  text-decoration: none;
}

a:hover {
  color: lightgoldenrodyellow;
  text-decoration: underline;
}

div.main {
  margin: 0 98px;
}
</style>
