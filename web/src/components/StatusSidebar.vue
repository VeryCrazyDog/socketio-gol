<template>
  <div :class="['sidebar', position]">
    <p>You</p>
    <World
      x-len="1"
      y-len="1"
    />
    <p>Players</p>
    <p id="connected-player">
      ?
    </p>
  </div>
</template>

<script>
import World from './World.vue'

export default {
  name: 'StatusBar',
  components: {
    World
  },
  props: {
    position: {
      type: String,
      default: ''
    }
  }
}
</script>
