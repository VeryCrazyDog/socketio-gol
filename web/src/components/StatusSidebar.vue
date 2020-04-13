<template>
  <div
    v-show="!!position"
    :class="['sidebar', position]"
  >
    <p>You</p>
    <World
      ref="player"
      :size="{x: 1, y: 1}"
    />
    <p>Players</p>
    <p id="connected-player">
      {{ connectedPlayer === null ? '?' : connectedPlayer }}
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
  props: {
    playerColor: {
      type: String,
      required: true,
      default: 'transparent'
    },
    connectedPlayer: {
      type: Number,
      default: null
    }
  },
  watch: {
    playerColor: function () {
      // TODO Not working
      this.$refs.player.update([{ x: 0, y: 0 }], { color: this.playerColor, overwrite: true })
    }
  }
}
</script>
