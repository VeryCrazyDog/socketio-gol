<template>
  <div
    v-show="!!position"
    :class="['sidebar', position]"
  >
    <p>Toolbox</p>
    <World
      :size="{x: 3, y: 3}"
      :is-selectable="true"
      :is-selected="selectedIndex === 0"
      :cell-list="[
        { x: 1, y: 1, color: 'lightblue' }
      ]"
      @world-selected="selectedIndex = 0"
    />
    <World
      :size="{x: 5, y: 5}"
      :is-selectable="true"
      :is-selected="selectedIndex === 1"
      :cell-list="[
        { x: 2, y: 1, color: 'lightblue' },
        { x: 2, y: 2, color: 'lightblue' },
        { x: 2, y: 3, color: 'lightblue' }
      ]"
      @world-selected="selectedIndex = 1"
    />
    <World
      :size="{x: 5, y: 5}"
      :is-selectable="true"
      :is-selected="selectedIndex === 2"
      :cell-list="[
        { x: 2, y: 1, color: 'lightblue' },
        { x: 3, y: 1, color: 'lightblue' },
        { x: 1, y: 2, color: 'lightblue' },
        { x: 2, y: 2, color: 'lightblue' },
        { x: 2, y: 3, color: 'lightblue' },
      ]"
      @world-selected="selectedIndex = 2"
    />
    <World
      :size="{x: 5, y: 5}"
      :is-selectable="true"
      :is-selected="selectedIndex === 3"
      :cell-list="[
        { x: 2, y: 1, color: 'lightblue' },
        { x: 3, y: 2, color: 'lightblue' },
        { x: 1, y: 3 , color: 'lightblue' },
        { x: 2, y: 3 , color: 'lightblue' },
        { x: 3, y: 3 , color: 'lightblue' },
      ]"
      @world-selected="selectedIndex = 3"
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
  extends: Sidebar,
  data: function () {
    return {
      selectedIndex: 0
    }
  }
}
</script>
