// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

Vue.use(new VueSocketio({
  connection: socketio('http://39.108.10.155:8080')
  // connection: socketio('http://localhost:8000')
}))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

