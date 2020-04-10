<template>
  <div
    v-show="position !== POS_GONE"
    :class="['sidebar', position]"
  >
    <p>Toolbox</p>
  </div>
</template>

<script>
const POS_LEFT = 'left'
const POS_RIGHT = 'right'
const POS_GONE = 'gone'

export default {
  name: 'Toolbox',
  props: {
    position: {
      type: String,
      default: POS_GONE,
      validator: function (value) {
        return [POS_LEFT, POS_RIGHT, POS_GONE].includes(value)
      }
    }
  }
}
</script>
