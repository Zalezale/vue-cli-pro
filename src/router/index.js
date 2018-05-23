import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/pages/login'
import menu from '@/components/pages/menu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/menu',
      name: 'menu',
      component: menu
    }
  ]
})
