<template>
  <div :class="['sidebar', position]">
    <p>Toolbox</p>
  </div>
</template>

<script>
export default {
  name: 'Toolbox',
  props: {
    position: {
      type: String,
      default: ''
    }
  }
}
</script>
