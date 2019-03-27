import Vue from 'vue'
import axios from 'axios'
import _components from '../router/components'

Vue.prototype.axios = axios


function getRouterData (callback) {
  let self = this
  axios({
    // url: `${window.API.url}/menu${window.API.suf}`,
    url: window.API.HOST + window.API.menu.path + window.API.suf,
    method: window.API.menu.type,
    params: {
      tenantId: Funs.getCookie('xm_tenantID') || null
    }
  }).then((res) => {
    console.log('侧栏')
    console.log(res)
    if (res.data.status === '') {
      Funs.delCookie('xm_cookie')
      window.location.href = ''
    }
    if (res.data.status === 'failure') {
      console.log(res.data.message)
    }
    if (res.data.status === 'success') {
      let items = res.data.list
      /*----加上res中没有的状态 start----*/
      items.unshift({
        expanded: false,
        menuIcon: 'fa-star',
        menuName: '首页',
        menuPath: '/'
      })
      /*----加上res中没有的状态 end----*/
      let routes = [] // 一级路由
      let routesChildren = [] // 二级路由
      /*三级菜单先暂存routesChildren且从items[左栏]中不显示*/
      for (let i = 0; i < items.length; i ++) {
        items[i].expanded = false // 初始关闭
        if (items[i].menuPath) {
          routes.push(filter(items[i]))
        }
        if (items[i].childNodes && items[i].childNodes.length > 0) {
          for (let j = 0; j < items[i].childNodes.length; j ++) {
            items[i].childNodes[j].hide = false
            if (items[i].childNodes[j].menuPath) {
              if (items[i].childNodes[j].menuPath.indexOf('/shopping/bill/_') >= 0 || 
                items[i].childNodes[j].menuPath.indexOf('/shopping/good/_') >= 0) {
                routesChildren.push(filter(items[i].childNodes[j]))
                items[i].childNodes[j].hide = true
              } else {
                routes.push(filter(items[i].childNodes[j]))
              }
            }
          }
        }    
      }
      /*遍历二级路由push到对应一级路由下的routes[y].children*/
      for (let x = 0; x < routes.length; x ++) {
        if (routes[x].path === '/shopping/bill/index') { // 对账管理
          routes[x].children = []
          for (let y = 0; y < routesChildren.length; y ++) {
            if (routesChildren[y].path.indexOf('/shopping/bill/_') >= 0) {
              routes[x].children.push(routesChildren[y])
            }
          }
        }
        if (routes[x].path === '/shopping/good/index') { // 商品管理
          routes[x].children = []
          for (let y = 0; y < routesChildren.length; y ++) {
            if (routesChildren[y].path.indexOf('/shopping/good/_') >= 0) {
              routes[x].children.push(routesChildren[y])
            }
          }
        }
      }
      /*加上res中没有的路由*/
      routes.push(
        {
          name: '首页',
          path: '/',
        },
        {
          name: '字典详情管理',
          path: '/dic/detaillist',
        },
      )
      console.log('路由')
      console.log(routes)

      /*遍历_components把与routes相同的建立路由 for 按需加载*/
      for (let i = 0; i < _components.length; i ++) {
        for (let j = 0; j < routes.length; j ++) {
          if (_components[i].path === routes[j].path) {
            routes[j].component = _components[i].comp
          }
          let _childs = routes[j].children
          if (_childs && _childs.length > 0) {
            for (let x = 0; x < _childs.length; x ++) {
              if (_components[i].path === _childs[x].path) {
                routes[j].children[x].component = _components[i].comp
                break
              }
            }
          }
        }
      }
      if (callback && 'function' === typeof callback) {
        callback(items,routes)
      }
    }
  })
}


function filter (item) {
  let obj = {}
  obj.name = item.menuName
  obj.path = item.menuPath
  // let path = item.menuPath.substr(0,1) === '/' ? '' : '/'
  try {
    // obj.component = require('views/user' + path + obj.path)
  } catch(ex) {
    console.log('--> 请按新增菜单路径添加对应文件')
    console.log(ex)
  }
  return obj
}


export default {
  getRouterData: getRouterData
}