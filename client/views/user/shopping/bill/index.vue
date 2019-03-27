<template>
  <div class="myGood">
    <ul class="myTabs2">
      <li v-if="tabs._shop" :class="{on:curCat === 1}" @click="switchTab(1)"><router-link :to="{path:'/shopping/bill/_shop/list'}">商家对账</router-link></li>
      <li v-if="tabs._toshop" :class="{on:curCat === 2}" @click="switchTab(2)"><router-link :to="{path:'/shopping/bill/_toshop/list'}">平台对账商家</router-link></li>
      <li v-if="tabs._tosend" :class="{on:curCat === 3}" @click="switchTab(3)"><router-link :to="{path:'/shopping/bill/_tosend/list'}">平台对账配送员</router-link></li>
    </ul>
    <div class="_main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        curCat: 1,
        /*判断是否有路由（是否有权限）*/
        tabs: {
          _shop: false,
          _toshop: false,
          _tosend: false
        }
      }
    },
    mounted () {
      // 左栏hightlight
      let _items = this.$store.state.menu.items
      for (let i = 0; i < _items.length; i ++) {
        if (_items[i].childNodes && _items[i].childNodes.length > 0) {
          let _childs = _items[i].childNodes
          for (let j = 0; j < _childs.length; j ++) {
            if (_childs[j].menuPath === '/shopping/bill/index') {
              this.$store.commit({
                type: 'subItemOn',
                'subItemOn': _childs[j].id
              })
            }
          }
        }
      }
      this.$nextTick(function () {
        let _routes = this.$router.options.routes
        for (let i = 0; i < _routes.length; i ++) {
          if (_routes[i].path === '/shopping/bill/index') {
            let _childs = _routes[i].children
            if (_childs && _childs.length > 0) {
              for (let j = 0; j < _childs.length; j ++) {
                if (_childs[j].path.indexOf('/shopping/bill/_shop') >= 0) {
                  this.tabs._shop = true
                }
                if (_routes[i].children[j].path.indexOf('/shopping/bill/_tosend') >= 0) {
                  this.tabs._tosend = true
                }
                if (_routes[i].children[j].path.indexOf('/shopping/bill/_toshop') >= 0) {
                  this.tabs._toshop = true
                }
              }
            } 
          }
        }
      })
    },
    updated () {
      let _curRoute = this.$route.path
      if (_curRoute === '/shopping/bill/_shop/list') {
        this.curCat = 1
      }
      if (_curRoute === '/shopping/bill/_tosend/list') {
        this.curCat = 2
      }
      if (_curRoute === '/shopping/bill/_toshop/list') {
        this.curCat = 3
      }
      this.defRoute = _curRoute
      
      if (!this.defRoute || this.$route.path === '/shopping/bill/index') {
        this.defRoute = '/shopping/bill/_shop/list'
        this.curCat = 1
      }
      this.$router.push({path:this.defRoute})
    },
    methods: {
      switchTab (index) {
        this.curCat = index
      }
    }
  }
</script>

<style lang="scss"></style>