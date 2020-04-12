<template>
  <div
    v-show="!!position"
    :class="['sidebar', position]"
  >
    <p>You</p>
    <World
      :size="{x: 1, y: 1}"
    />
    <p>Players</p>
    <p id="connected-player">
      ?
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
  extends: Sidebar
}
</script>
