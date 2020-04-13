<template>
  <div
    v-show="!!position"
    :class="['sidebar', position]"
  >
    <p>Toolbox</p>
    <World
      v-for="(world, index) in items"
      :key="index"
      :size="world.size"
      :is-selectable="true"
      :is-selected="selectedIndex === index"
      :cell-list="world.cellList"
      @world-selected="selectedIndex = index"
    />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import World from './World.vue'

export default {
  name: 'ToolboxSidebar',
  components: {
    World
  },
  extends: Sidebar,
  data: function () {
    const items = [
      {
        size: { x: 3, y: 3 },
        cellList: [
          { x: 1, y: 1 }
        ]
      },
      {
        size: { x: 5, y: 5 },
        cellList: [
          { x: 2, y: 1 },
          { x: 2, y: 2 },
          { x: 2, y: 3 }
        ]
      },
      {
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
    items.forEach(item => {
      item.cellList.forEach(cell => {
        cell.color = 'lightblue'
      })
      const centerX = ~~(item.size.x / 2)
      const centerY = ~~(item.size.y / 2)
      item.offsetList = item.cellList.map(function (pos) {
        return {
          x: pos.x - centerX,
          y: pos.y - centerY
        }
      })
    })
    return {
      items,
      selectedIndex: 0
    }
  },
  methods: {
    getCellOffsetList: function () {
      return this.item[this.selectedIndex].offsetList
    }
  }
}
</script>
