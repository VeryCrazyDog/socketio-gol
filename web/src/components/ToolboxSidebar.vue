<template>
  <div
    v-show="position !== POS_GONE"
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
import World from './World.vue'

const POS_GONE = 'gone'

export default {
  name: 'Toolbox',
  components: {
    World
  },
  props: {
    position: {
      type: String,
      default: POS_GONE,
      validator: function (value) {
        return ['left', 'right', POS_GONE].includes(value)
      }
    }
  },
  created: function () {
    this.POS_GONE = POS_GONE
  }
}
</script>
