<template>
  <footer class="myFoot">
    <div class="img">
      <img class="myLogo" src="~assets/images/logo.jpg" alt="小享科技" />
    </div>
    <p>© 广州小享科技有限公司</p>
  </footer>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss">

.myFoot {
  margin-left: 180px;
  padding: 2rem 0 4rem;
  text-align: center;
  .img {
    display: block;
    padding-bottom: .6rem;
    .myLogo {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
