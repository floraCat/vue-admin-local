<template>
  <section class="app-main" :style="[hiddenSidebarStyle]">
    <div class="wraper">
      <levelbar></levelbar>
      <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <router-view class="animated"></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
import Levelbar from './Levelbar'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      sidebar: 'sidebar'
    }),
    hiddenSidebarStyle () {
      return this.sidebar.hidden ? { 'margin-left': 0 } : null
    }
  },

  components: {
    Levelbar
  },

  mounted () {
    // 最小高度设置
    let winHeight = document.documentElement.clientHeight
    document.querySelector(".app-main").style.minHeight = winHeight * 0.8 + 'px';
  }
}
</script>

<style lang="scss">

.app-main {
  padding-top: 50px;
  margin-left: 180px;
  transform: translate3d(0, 0, 0);
  .wraper {
    padding: 1.2rem;
  }
}

.app-content {
  padding: 20px;
}
</style>
