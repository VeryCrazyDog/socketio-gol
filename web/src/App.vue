<template>
  <div id="app">
    <h1>
      <a
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
      >Conway's Game of Life</a>
    </h1>
    <ToolboxSidebar
      ref="toolbox"
      position="left"
    />
    <div class="main">
      <World
        ref="world"
        :size="world.size"
        :are-cells-clickable="true"
        @cell-clicked="cellClicked"
      />
    </div>
    <StatusSidebar
      position="right"
      :player-color="playerColor"
      :connected-player="connectedPlayer"
    />
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
      playerColor: 'transparent',
      connectedPlayer: null,
      world: {
        size: { x: 0, y: 0 },
        cellList: []
      }
    }
  },
  methods: {
    cellClicked: function ({ x, y }) {
      const offsetList = this.$refs.toolbox.getCellOffsetList()
      const posList = offsetList.map(offset => {
        return {
          x: x + offset.x,
          y: y + offset.y
        }
      })
      this.$refs.world.update(posList, { color: this.playerColor })
    }
  },
  sockets: {
    'game start info': function (data) {
      this.playerColor = data.player.color
      this.connectedPlayer = data.game.connected
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
