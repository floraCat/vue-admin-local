<template>
  <div id="app" :class="{xmLogin:loginPage}">
    <nprogress-container></nprogress-container>
    <navbar :show="true"></navbar>
    <sidebar :show="sidebar.opened && !sidebar.hidden"></sidebar>
    <app-main></app-main>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, Sidebar, AppMain, FooterBar } from 'components/layout/'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Navbar,
    Sidebar,
    AppMain,
    FooterBar,
    NprogressContainer,
  },

  beforeMount () {
    
    /*适配 不同宽度加不同类名*/
    const WIDTH = 768
    const WIDTH_PAD = 1024
    const RATIO = 3
    const handler = () => {
      let rect = document.body.getBoundingClientRect()
      if (!document.hidden) {
        let width = rect.width - RATIO
        let device;
        let domHTML = document.documentElement
        if (width < WIDTH) {
          domHTML.classList.remove('isPad')
          domHTML.classList.add('isMobile')
          device = 'isMobile'
        } else if (WIDTH < width && width < WIDTH_PAD) {
          device = 'isPad'
          domHTML.classList.remove('isMobile')
          domHTML.classList.add('isPad')
        } else {
          domHTML.classList.remove('isMobile')
          domHTML.classList.remove('isPad')
          device = 'PC'
        }
        this.toggleDevice(device === 'isMobile' ? 'mobile' : 'other')
        this.toggleSidebar({
          opened: !device
        })
      }
    }
    handler()
    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)

  },

  computed: {
    ...mapGetters([
      'sidebar',
      'loginPage'
    ]),
  },

  mounted () {

  },

  methods: {
    ...mapActions([
      'toggleDevice',
      'toggleSidebar'
    ]),
  }
}
</script>

<style lang="scss">
@import '~animate.css';
.animated {
  animation-duration: .377s;
}
@import 'assets/style/public.sass';

$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';

</style>
