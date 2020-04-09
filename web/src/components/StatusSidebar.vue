<template>
  <div :class="['sidebar', position]">
    <p>You</p>
    <table class="center fixed game">
      <tr>
        <td id="player-color" />
      </tr>
    </table>
    <p>Players</p>
    <p id="connected-player">
      ?
    </p>
  </div>
</template>

<script>
export default {
  name: 'StatusBar',
  props: {
    position: {
      type: String,
      default: ''
    }
  }
}
</script>
