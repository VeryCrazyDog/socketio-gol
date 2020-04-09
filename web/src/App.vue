<template>
  <div id="app">
    <h1>
      <a
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
      >Conway's Game of Life</a>
    </h1>
    <ToolboxSidebar position="left" />
    <Game />
    <StatusSidebar position="right" />
  </div>
</template>

<script>
import ToolboxSidebar from './components/ToolboxSidebar.vue'
import Game from './components/Game.vue'
import StatusSidebar from './components/StatusSidebar.vue'

export default {
  name: 'App',
  components: {
    ToolboxSidebar,
    Game,
    StatusSidebar
  }
}
</script>

<style>
.sidebar {
  background-color: #111;
  height: 100%;
  overflow-x: hidden;
  padding: 10px 0;
  position: fixed;
  width: 96px;
  z-index: 1;
}

.sidebar.left {
  left: 0;
  top: 0;
}

.sidebar.right {
  right: 0;
  top: 0;
}

.sidebar table, .sidebar p {
  margin: 10px;
}

.sidebar p {
  text-align: center;
}
</style>

<style scoped>
h1 {
  text-align: center;
}

a {
  color: lightgray;
  text-decoration: none;
}

a:hover {
  color: lightgoldenrodyellow;
  text-decoration: underline;
}
</style>
