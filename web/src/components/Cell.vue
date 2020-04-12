<template>
  <td :style="cssStyle" />
</template>

<script>
export default {
  name: 'Cell',
  props: {
    x: {
      type: Number,
      required: true,
      validator: function (value) {
        return value >= 0
      }
    },
    y: {
      type: Number,
      required: true,
      validator: function (value) {
        return value >= 0
      }
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    cssStyle: function () {
      const result = {}
      if (this.color) {
        result['background-color'] = this.color
      }
      return result
    }
  }
}
</script>

<style scoped>
td {
  height: 15px;
  width: 15px;
}
</style>
