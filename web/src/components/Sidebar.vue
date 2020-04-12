<script>
export default {
  name: 'Sidebar',
  props: {
    position: {
      type: String,
      default: null,
      validator: function (value) {
        return ['left', 'right', null].includes(value)
      }
    }
  }
}
</script>

<style scoped>
div.sidebar {
  background-color: #111;
  height: 100%;
  overflow-x: hidden;
  padding: 10px 0;
  position: fixed;
  width: 96px;
  z-index: 1;
}

div.sidebar.left {
  left: 0;
  top: 0;
}

div.sidebar.right {
  right: 0;
  top: 0;
}

div.sidebar p {
  margin: 10px;
  text-align: center;
}
</style>
