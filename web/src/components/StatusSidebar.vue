<template>
  <div
    v-show="!!position"
    :class="['sidebar', position]"
  >
    <p>You</p>
    <World
      :size="{x: 1, y: 1}"
      :cell-list="[{x: 0, y: 0, color: playerColor}]"
    />
    <p>Players</p>
    <p id="connected-player">
      {{ connectedPlayer }}
    </p>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import World from './World.vue'

export default {
  name: 'StatusSidebar',
  components: {
    World
  },
  extends: Sidebar,
  data: function () {
    return {
      playerColor: 'transparent',
      connectedPlayer: '?'
    }
  },
  sockets: {
    'game start info': function (data) {
      this.playerColor = data.player.color
      this.connectedPlayer = data.game.connected
    }
  }
}
</script>
