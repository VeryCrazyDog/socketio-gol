<template>
  <div
    v-show="position !== POS_GONE"
    :class="['sidebar', position]"
  >
    <p>Toolbox</p>
  </div>
</template>

<script>
const POS_GONE = 'gone'

export default {
  name: 'Toolbox',
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
