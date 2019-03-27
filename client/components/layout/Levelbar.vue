<template>
  <nav class="app-levelbar">
    <div class="left">
      <h3>{{ menuName }}</h3>
    </div>
    <div class="right">
      <ol class="breadcrumb">
        <li><a href="#/" class="is-active">Home</a></li> /
        <li><span class="active">{{ menuName }}</span></li>
      </ol>
    </div>
  </nav>
</template>

<script>
export default {

  data () {
    return {}
  },

  computed: {
    menuName () {
      let path = this.$route.path
      return path === '/dic/detaillist' ? this.$route.query.dicName : this.$route.name
    },
  },

}
</script>

<style lang="scss">
.app-levelbar {
  height: 1.5rem;
  line-height: 1.5rem;
  padding: 0 1rem;
  overflow: hidden;
  .left {
    float: left;
    h3 {
      font-size: 1.3rem;
    }
  }
  .right {
    float: right;
  }
}
.breadcrumb {
  li {
    display: inline-block;
  }
}
</style>
