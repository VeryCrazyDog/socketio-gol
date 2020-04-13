<template>
  <div
    v-show="!!position"
    :class="['sidebar', position]"
  >
    <p>You</p>
    <World :layout="playerColorWorldLayout" />
    <p>Players</p>
    <p id="connected-player">
      {{ connectedPlayer === null ? '?' : connectedPlayer }}
    </p>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import World, { WorldLayout } from './World.vue'

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
  data: function () {
    return {
      playerColorWorldLayout: new WorldLayout({ x: 1, y: 1 })
    }
  },
  watch: {
    playerColor: function () {
      this.playerColorWorldLayout.update([{ x: 0, y: 0 }], { color: this.playerColor })
    }
  }
}
</script>
