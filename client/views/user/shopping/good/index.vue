<template>
  <div class="myGood">
    <ul class="myTabs2">
      <li v-if="tabs._item" :class="{on:curCat === 1}" @click="switchTab(1)"><router-link :to="{path:'/shopping/good/_item/list'}">商品管理</router-link></li>
      <li v-if="tabs._cat" :class="{on:curCat === 2}" @click="switchTab(2)"><router-link :to="{path:'/shopping/good/_cat/list'}">分类管理</router-link></li>
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
          _cat: false,
          _item: false,
        },
        defRoute: null
      }
    },
    computed: {
    },
    mounted () {
      // 左栏hightlight
      let _items = this.$store.state.menu.items
      for (let i = 0; i < _items.length; i ++) {
        if (_items[i].childNodes && _items[i].childNodes.length > 0) {
          let _childs = _items[i].childNodes
          for (let j = 0; j < _childs.length; j ++) {
            if (_childs[j].menuPath === '/shopping/good/index') {
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
          if (_routes[i].path === '/shopping/good/index') {
            let _childs = _routes[i].children
            if (_childs && _childs.length > 0) {
              for (let j = 0; j < _childs.length; j ++) {
                if (_childs[j].path.indexOf('/shopping/good/_item') >= 0) {
                  this.tabs._item = true
                }
                if (_routes[i].children[j].path.indexOf('/shopping/good/_cat') >= 0) {
                  this.tabs._cat = true
                }
              }
            } 
          }
        }
      })      
    },
    destroyed () {
       this.$store.commit({
        type: 'subItemOn',
        'subItemOn': null
      })
    },
    updated () {
      let _curRoute = this.$route.path
      if (_curRoute === '/shopping/good/_item/list') {
        this.curCat = 1
      }
      if (_curRoute === '/shopping/good/_cat/list') {
        this.curCat = 2
      }
      this.defRoute = _curRoute

      if (!this.defRoute || this.$route.path === '/shopping/good/index') {
        this.defRoute = '/shopping/good/_item/list'
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