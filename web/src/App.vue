<template>
  <div id="app">
    <h1>
      <a
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
      >Conway's Game of Life</a>
    </h1>
    <ToolboxSidebar position="left" />
    <GameScreen />
    <StatusSidebar position="right" />
  </div>
</template>

<script>
import ToolboxSidebar from './components/ToolboxSidebar.vue'
import GameScreen from './components/GameScreen.vue'
import StatusSidebar from './components/StatusSidebar.vue'

export default {
  name: 'App',
  components: {
    ToolboxSidebar,
    GameScreen,
    StatusSidebar
  }
}
</script>

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
