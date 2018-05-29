import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/pages/login'
import menu from '@/components/pages/menu'
import usercenter from '@/components/pages/usercenter'
// 功能页面
import xsasnrp from "@/components/functions/xsasnrp"
import xsplanrp from "@/components/functions/xsplanrp"
import xsinvoicerp from "@/components/functions/xsinvoicerp"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        keepAlive:true
      }
    },{
      path: '/menu',
      name: 'menu',
      component: menu,
      meta:{
        keepAlive:true
      }
    },{
      path: '/usercenter',
      name: 'usercenter',
      component: usercenter
    },
    {
      path: '/xsplanrp',
      name: 'xsplanrp',
      component: xsplanrp
    },
    {
      path: '/xsasnrp',
      name: 'xsasnrp',
      component: xsasnrp
    },
    {
      path: '/xsinvoicerp',
      name: 'xsinvoicerp',
      component: xsinvoicerp
    }
  ]
})
