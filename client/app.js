
import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import "babel-polyfill"
import filters from './filters'
import './assets/js/public.js'
import Loading from "./assets/js/loading"
import Routes from './router'
import store from './store'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import NProgress from 'vue-nprogress'

Vue.use(Router)
Vue.use(NProgress)

Vue.config.devtools = true
Vue.prototype.API = window.API
Vue.prototype.Loading = Loading

const nprogress = new NProgress({ parent: '.nprogress-container' })

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

console.log('cookie缓存：')
console.log(JSON.parse(Funs.getCookie('xm_cookie')))

/*有缓存，登录状态*/
if (Funs.getCookie('xm_cookie')) {
  Routes.getRouterData(function (items,routes) {

    let router = new Router({
      mode: 'hash', // Demo is living in GitHub.io, so required!
      linkActiveClass: 'is-active',
      scrollBehavior: () => ({ y: 0 }),
      routes: routes
    })
    router.beforeEach((route, redirect, next) => {
      Loading.addLoading()
      store.commit({type: 'items', items: items})
      if (store.state.app.device.isMobile && store.state.app.sidebar.opened) {
        store.commit(TOGGLE_SIDEBAR, false)
      }
      next()
      Loading.delLoading()
    })
    const app = new Vue({
      el: '#app',
      router,
      store,
      nprogress,
      ...App
    })
  })
} else {
  /*没有缓存，未登录状态*/
  let router = new Router({
      mode: 'hash',
      linkActiveClass: 'is-active',
      routes: [
        {
          name: '登录',
          path: '*',
          component: require('views/auth/Login')
        }
      ]
    })
    const app = new Vue({
      el: '#app',
      router,
      store,
      ...App
    })
}
