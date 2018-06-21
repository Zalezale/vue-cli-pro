import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/pages/login'
import baseComponents from '@/components/functions/baseComponents'

const usercenter = () => ({
  component: import(/* webpackChunkName: "usercenter" */'@/components/pages/usercenter'),
  loading: null,
  error: null,
})
const menu = () => ({
  component: import(/* webpackChunkName: "menu" */'@/components/pages/menu'),
  loading: null,
  error: null,
})
const xsasnrp = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import(/* webpackChunkName: "xsasnrp" */'@/components/functions/xsasnrp'),
  // 异步组件加载时使用的组件
  loading: null,
  // 加载失败时使用的组件
  error: null,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
 // timeout: 30000
})
const xsplanrp = () => ({
  component: import(/* webpackChunkName: "xsplanrp" */'@/components/functions/xsplanrp'),
  loading: null,
  error: null,
})
const xsinvoicerp = () => ({
  component: import(/* webpackChunkName: "xsinvoicerp" */'@/components/functions/xsinvoicerp'),
  loading: null,
  error: null,
})
const xsasndetget = () => ({
  component: import(/* webpackChunkName: "xsasndetget" */'@/components/functions/xsasndetget'),
  loading: null,
  error: null,
})
const xsactbox = () => ({
  component: import(/* webpackChunkName: "xsactbox" */'@/components/functions/xsactbox'),
  loading: null,
  error: null,
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
    },
    {
      path: '/xsasndetget',
      name: 'xsasndetget',
      component: xsasndetget
    },
    {
      path: '/xsactbox',
      name: 'xsactbox',
      component: xsactbox
    },
    {
      path: '/baseComponents',
      name: 'baseComponents',
      component: baseComponents,
    }]
})
