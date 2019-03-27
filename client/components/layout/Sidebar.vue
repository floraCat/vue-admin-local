<template>
  <aside class="menu app-sidebar animated" :class="{ slideInLeft: show, slideOutLeft: !show }">
    <ul class="menu-list">
      <li v-for="(item, index) in menu" :class="{open: item.expanded}">

        <a class="top" @click="toggle(index)">
          <span class="icon is-small"><i :class="['fa', item.menuIcon]"></i></span>
          {{ item.label || item.menuName }}
          <span class="icon is-small is-angle" v-if="item.childNodes && item.childNodes.length">
            <i class="fa fa-angle-down"></i>
          </span>
        </a>

        <expanding v-if="item.childNodes && item.childNodes.length">
          <ul v-show="item.expanded">
            <li v-for="subItem in item.childNodes" v-if="subItem.menuPath" :class="{hide: subItem.hide}">
              <router-link :class="{'is-active': subItemOn === subItem.id}" :to="generatePath(item, subItem)" @click.native="ifHidden()">
                <span class="icon is-small"><i :class="['fa', subItem.menuIcon]"></i></span>
                {{ subItem && subItem.label || subItem.menuName }}
              </router-link>
            </li>
          </ul>
        </expanding>

      </li>
    </ul>
  </aside>
</template>

<script>
import Expanding from 'vue-bulma-expanding'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Expanding
  },

  props: {
    show: Boolean
  },

  data () {
    return {
      menu: [],
    }
  },

  computed: {
    // 下级栏目highlight
    subItemOn () {
      return this.$store.state.menu.subItemOn
    },
  },

  mounted () {
    this.menu = this.$store.state.menu.items
    let route = this.$route
    this.shouldExpandMatchItem(route)    
  },

  methods: {

    ifHidden () {
      this.$store.dispatch({
        type: 'toggleSidebar',
        opened: false
      })
    },

    /*下拉切换*/
    toggle (index, expanded) {
      if (this.menu[index].menuPath) {
        this.$router.push({path: this.menu[index].menuPath})
      } else {
        let org = this.$store.state.menu.items[index].expanded
        let _expanded = expanded === undefined ? !org : expanded
        for (let x = 0; x < this.menu.length; x ++) {
          this.$store.dispatch({
            type: 'expandMenu',
            index: x,
            expanded: false
          })
        }
        this.$store.dispatch({
          type: 'expandMenu',
          index: index,
          expanded: _expanded
        })
      }
    },

    /*默认下拉*/
    shouldExpandMatchItem (route) {
      let self = this
      for (let i = 0; i < this.menu.length; i ++) {
        if (this.menu[i].childNodes && this.menu[i].childNodes.length > 0) {
          for (let j = 0; j < this.menu[i].childNodes.length; j ++) {
            if (this.menu[i].childNodes[j].menuName === route.name) {
              setTimeout(function () {
                self.toggle(i, true)
              }, 0)
            }
          }
        }
      }
    },

    generatePath (item, subItem) {
      return `${item.component ? item.menuPath + '/' : ''}${subItem.menuPath}`
    },

    // findParentFromMenu (route) {
    //   const menu = this.menu
    //   for (let i = 0, l = menu.length; i < l; i++) {
    //     const item = menu[i]
    //     const k = item.childNodes && item.childNodes.length
    //     if (k) {
    //       for (let j = 0; j < k; j++) {
    //         if (item.childNodes[j].name === route.name) {
    //           return item
    //         }
    //       }
    //     }
    //   }
    // }
    
  },

  watch: {
    $route (route) {
      this.shouldExpandMatchItem(route)
    }
  }

}
</script>

<style lang="scss">

.menu {
  font-size: 1rem;
}

.menu-list {
  line-height: 1.25;
}

.menu-list > li > a {
  border-bottom: #e2e2e2 1px solid;
  line-height: 28px;
}

.menu-list a {
  color: #4a4a4a;
  display: block;
  padding: 0.7em 0.45em;
  
}

.menu-list a:hover {
  background-color: whitesmoke;
  color: #3a71a3;
}

.menu-list a.is-active {
  background-color: #3a71a3;
  color: #fff;
}

.menu-list li.open .top {
  color: #3a71a3;
  background: #d7e8f8;
}

.menu-list li ul {
  border-bottom: #e2e2e2 1px solid;
  padding-left: 0.75em;
}

.menu-list li ul li {
  border-left: 1px solid #dbdbdb;
  border-bottom: #e2e2e2 1px solid;
}

.menu-list li ul li.hide {
  display: none;
}

.menu-list li ul li:last-child {
  border-bottom: none;
}

.menu-label {
  color: #7a7a7a;
  font-size: 0.8em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.menu-label:not(:first-child) {
  margin-top: 1em;
}

.menu-label:not(:last-child) {
  margin-bottom: 1em;
}

.app-sidebar {
  position: fixed;
  top: 3.5rem;
  left: 0;
  bottom: 0;
  padding: 0 0 50px;
  width: 180px;
  min-width: 45px;
  max-height: 100vh;
  height: calc(100% - 50px);
  z-index: 1024 - 1;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  overflow-y: auto;
  overflow-x: hidden;

  // @include mobile() {
  //   transform: translate3d(-180px, 0, 0);
  // }

  .icon {
    vertical-align: baseline;
    margin-right: 4px;
    &.is-angle {
      position: absolute;
      right: 10px;
      transition: transform .377s ease;
      line-height: 30px;
    }
  }

  .menu-label {
    padding-left: 5px;
  }

  .menu-list {
    ul {
      overflow: hidden;
      li a {
        &[aria-expanded="true"] {
          .is-angle {
            transform: rotate(180deg);
          }
        }
      }
    }

  }

}
</style>
