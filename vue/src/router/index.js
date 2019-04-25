import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/home'
import login from '../components/login/login'
import rank from '../components/rank/rank.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    }
  ],
  // beforeEach: (to, from, next) => {
  //   if (to.path == '/login') {
  //     next()
  //   } else {
  //     var token = localStorage.getItem('Authorization')
  //     if (token == null || token == '') {
  //       next('/login')
  //     } else {
  //       next()
  //     }
  //   }
  // }
})
