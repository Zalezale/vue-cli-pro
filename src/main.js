// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./global"
import Vue from 'vue'
import router from './router'
import "./assets/fonts/mui.ttf"
import "./assets/css/mui.min.css"
import "./assets/css/app.css"
import App from './App'

Vue.config.productionTip = false
// 页面必须以keepAlive的状态加载进来，才能使用缓存，所以菜单界面keepalive=ture,
router.beforeEach((to,from,next)=>{
if(to.path === "/login" && from.path==='/usercenter'){
router.options.routes[1].meta.keepAlive=false
}
//登陆之后设置菜单路由keepalive=true
if(from.path === "/menu"){
  from.meta.keepAlive = true;
}
next();
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
