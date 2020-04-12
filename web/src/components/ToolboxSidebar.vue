<template>
  <div
    v-show="!!position"
    :class="['sidebar', position]"
  >
    <p>Toolbox</p>
    <World
      :size="{x: 3, y: 3}"
      :is-selectable="true"
      :is-selected="true"
    />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import World from './World.vue'

export default {
  name: 'Toolbox',
  components: {
    World
  },
  extends: Sidebar
}
</script>
