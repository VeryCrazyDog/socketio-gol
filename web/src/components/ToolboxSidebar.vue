<template>
  <div
    v-show="!!position"
    :class="['sidebar', position]"
  >
    <p>Toolbox</p>
    <World
      key="0"
      :size="{x: 3, y: 3}"
      :is-selectable="true"
      :is-selected="true"
      :cell-list="[
        { x: 1, y: 1, color: 'lightblue' }
      ]"
    />
    <World
      key="1"
      :size="{x: 5, y: 5}"
      :is-selectable="true"
      :cell-list="[
        { x: 2, y: 1, color: 'lightblue' },
        { x: 2, y: 2, color: 'lightblue' },
        { x: 2, y: 3, color: 'lightblue' }
      ]"
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
