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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
