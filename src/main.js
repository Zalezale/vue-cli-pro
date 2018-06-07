// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./global"
import Vue from 'vue'
import Vuex from 'vuex'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import router from './router'
import "./assets/fonts/mui.ttf"
import "./assets/css/mui.min.css"
import "./assets/css/app.css"
import App from './App'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    currentComponent: null,
    input: '',
    scanValue: ''
  },
  mutations: {
    chgComponent(state, component) {
      state.currentComponent = component
    },
    chgInput: function (state, input) {
      state.input = input
    },
    chgValue: function (state, value) {
      state.scanValue = value
    }
  }
})

Vue.config.productionTip = false
// 页面必须以keepAlive的状态加载进来，才能使用缓存，所以菜单界面keepalive=ture,
router.beforeEach((to, from, next) => {
  //login到menu，menu每次刷新
  if (to.path === "/login" && from.path === '/usercenter') {
    router.options.routes[1].meta.keepAlive = false
  } else {
    //menu到page，page每次刷新且缓存
    if (from.path === "/menu") {
      from.meta.keepAlive = true;
      to.meta.keepAlive = true;
    }
  }
  next();
})

const requireComponent = require.context(
  './components/subcomponents/',
  false,
  /.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `'./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
