// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'

Vue.use(new VueSocketio({
<<<<<<< HEAD
  // connection: socketio('http://39.108.10.155:8080')
  connection: socketio('http://localhost:8000')
=======
  connection: socketio('http://120.78.156.5')
  // connection: socketio('http://localhost:8000')
>>>>>>> 4418c0ae2c6d0baa9b5752480a21ea343a80d6d3
}))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    Bus: new Vue(),
  },
})

