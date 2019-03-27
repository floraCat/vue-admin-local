<!-- alert弹窗（如错误提示） -->
<template>
  <div class="modal animated" id="alertModal" transition="zoom">
    <div class="bg"></div> 
    <div class="main">
      <header class="head">
        <p class="title">提示</p> 
        <button class="delete" @click="close"></button>
      </header> 
      <section class="body">
          <article class="box">
            <p class="delTxt" v-text="transData.txt"></p>
            <div class="formCtrl btns">
              <button class="formBtn" @click="close()">知道了</button>
            </div>
        </article>
      </section> 
    </div>
  </div>
</template>

<script>

export default {

  props: {
    transData: {},
  },

  mounted () {
    document.body.appendChild(this.$el) // 便于fixed定位
  },

  methods: {

    close () {
      this.$emit('close')
    },

  },

}
</script>

<style>
#alertModal .main {
  min-height: 250px;
}
</style>