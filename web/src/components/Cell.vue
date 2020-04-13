<template>
  <td
    :style="cssStyle"
    @[clickEventName]="$emit('cell-clicked')"
  />
</template>

<script>
export default {
  name: 'Cell',
  props: {
    color: {
      type: String,
      default: null
    },
    isClickable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cssStyle: function () {
      const result = {}
      if (this.color) {
        result['background-color'] = this.color
      }
      return result
    },
    clickEventName: function () {
      return this.isClickable ? 'click' : null
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
