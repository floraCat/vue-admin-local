<!-- pop弹窗（如提示修改成功） -->
<template>
  <transition name="test">
  <div class="popWindow" ref="pop">
    <div class="box">
      <div class="bg"></div>
      <p v-text="transData.txt"></p>
    </div>
  </div>
  </transition>
</template>

<script>

export default {

  props: {
    transData: Object
  },

  mounted () {
    document.body.appendChild(this.$el) // 便于fixed定位
    let winHeight = document.documentElement.clientHeight || document.body.clientHeight
    this.$refs.pop.style.height = winHeight + 'px'
  },

}
</script>

<style lang="scss">
@import '~assets/style/var.scss';
.popWindow {
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .box {
    position: absolute;
    top: 55%;
    left: 50%;
    margin-top: -2.5rem;
    margin-left: -100px;
    width: 200px; 
    text-align: center;
    padding: 1.5rem 2rem;
    box-shadow: 0 0 20px $zLine;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: .9;
      background: $zBg;
      border: $zLine 1px solid;
      border-radius: 5px;
    }
    p {
      position: relative;
      z-index: 9;
      font-size: 1.2rem;
      color: $zs;
      text-shadow: 5px 5px 5px $zLine;
    }
  }
}
.test-enter-active, .test-leave-active {
transition: transform 0.4s ease;
transform: scale(1);
}
.test-enter, .test-leave-active {
transition: transform 0.3s ease;
transform: scale(0);
}
</style>