<template>
  <div id="app">
    <h1>
      <a
        href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
      >Conway's Game of Life</a>
    </h1>
    <GameWorld />
  </div>
</template>

<script>
import GameWorld from './components/GameWorld.vue'

export default {
  name: 'App',
  components: {
    GameWorld
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
