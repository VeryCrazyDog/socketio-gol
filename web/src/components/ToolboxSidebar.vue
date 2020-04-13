<template>
  <div
    v-show="!!position"
    :class="['sidebar', position]"
  >
    <p>Toolbox</p>
    <World
      v-for="world in items"
      :key="world.name"
      :layout="world.layout"
      :is-selectable="true"
      :is-selected="selectedItemName === world.name"
      :cell-list="world.cellList"
      @world-selected="selectedItemName = world.name"
    />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import World, { WorldLayout } from './World.vue'

export default {
  name: 'ToolboxSidebar',
  components: {
    World
  },
  extends: Sidebar,
  data: function () {
    const items = [
      {
        name: 'single',
        size: { x: 3, y: 3 },
        cellList: [
          { x: 1, y: 1 }
        ]
      },
      {
        name: 'blinker',
        size: { x: 5, y: 5 },
        cellList: [
          { x: 2, y: 1 },
          { x: 2, y: 2 },
          { x: 2, y: 3 }
        ]
      },
      {
        name: 'r-pentomino',
        size: { x: 5, y: 5 },
        cellList: [
          { x: 2, y: 1 },
          { x: 3, y: 1 },
          { x: 1, y: 2 },
          { x: 2, y: 2 },
          { x: 2, y: 3 }
        ]
      },
      {
        name: 'glider',
        size: { x: 5, y: 5 },
        cellList: [
          { x: 2, y: 1 },
          { x: 3, y: 2 },
          { x: 1, y: 3 },
          { x: 2, y: 3 },
          { x: 3, y: 3 }
        ]
      }
    ]
    const offsets = {}
    items.forEach(item => {
      item.layout = new WorldLayout(item.size)
      item.layout.update(item.cellList, { color: 'lightblue', overwrite: true })
      const centerX = ~~(item.size.x / 2)
      const centerY = ~~(item.size.y / 2)
      offsets[item.name] = item.cellList.map(function (pos) {
        return {
          x: pos.x - centerX,
          y: pos.y - centerY
        }
      })
    })
    return {
      items,
      offsets,
      selectedItemName: 'single'
    }
  },
  methods: {
    getCellOffsetList: function () {
      return this.offsets[this.selectedItemName]
    }
  }
}
</script>
