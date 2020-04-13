import Vue from 'vue'
import VueSocketIo from 'vue-socket.io'

import App from './App.vue'
import './assets/main.css'

Vue.config.productionTip = false

Vue.use(new VueSocketIo({
  connection: '/'
}))

new Vue({
  render: h => h(App)
}).$mount('#app')
