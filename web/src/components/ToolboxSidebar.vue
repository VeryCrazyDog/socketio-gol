<template>
  <div
    v-show="!!position"
    :class="['sidebar', position]"
  >
    <p>Toolbox</p>
    <World
      v-for="world in items"
      :key="world.name"
      :ref="world.name"
      :size="world.size"
      :is-selectable="true"
      :is-selected="selectedItemName === world.name"
      :cell-list="world.cellList"
      @world-selected="selectedItemName = world.name"
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
      selectedItemName: 'single'
    }
  },
  mounted: function () {
    const itemRefs = this.$refs
    this.items.forEach(item => {
      itemRefs[item.name][0].update(item.cellList, { overwrite: true })
    })
  },
  methods: {
    getCellOffsetList: function () {
      return this.item[this.selectedIndex].offsetList
    }
  }
}
</script>
