import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/pages/login'
import menu from '@/components/pages/menu'
import usercenter from '@/components/pages/usercenter'
const xsasnrp = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import(/* webpackChunkName: "xsasnrp" */'@/components/functions/xsasnrp'),
  // 异步组件加载时使用的组件
  loading: null,
  // 加载失败时使用的组件
  error: null,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 20000,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 30000
})
const xsplanrp = () => ({
  component: import(/* webpackChunkName: "xsplanrp" */'@/components/functions/xsplanrp'),
  loading: null,
  error: null,
  delay: 20000,
  timeout: 30000
})
const xsinvoicerp = () => ({
  component: import(/* webpackChunkName: "xsinvoicerp" */'@/components/functions/xsinvoicerp'),
  loading: null,
  error: null,
  delay: 20000,
  timeout: 30000
})
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
