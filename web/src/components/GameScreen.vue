<template>
  <div class="main">
    <World
      :size="world.size"
      :is-selectable="true"
    />
  </div>
</template>

<script>
import World from './World.vue'

export default {
  name: 'GameScreen',
  components: {
    World
  },
  data: function () {
    return {
      world: {
        size: { x: 0, y: 0 },
        cellList: []
      }
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
div.main {
  margin: 0 98px;
}
</style>
