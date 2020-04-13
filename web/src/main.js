import Vue from 'vue'
import VueSocketIo from 'vue-socket.io'

import App from './App.vue'
import './assets/main.css'

Vue.config.productionTip = false

Vue.use(new VueSocketIo({
  // TODO Change the URL
  connection: 'http://localhost:3000'
}))

new Vue({
  render: h => h(App)
}).$mount('#app')
