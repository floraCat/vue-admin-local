<!-- confirm确认弹窗（如删除确认） -->
<template>
  <div class="modal animated" id="confirmModal" transition="zoom">
    <div class="bg"></div> 
    <div class="main">
      <header class="head">
        <p class="title">{{transData.title}}</p> 
        <button class="delete" @click="close"></button>
      </header> 
      <section class="body">
          <article class="box">
            <p class="delTxt" v-text="transData.txt"></p>
            <div class="formCtrl btns">
                <button class="formBtn on" @click="confirm()">确定</button> 
                <button class="formBtn" @click="close()">取消</button>
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

    // 关闭弹窗
    close () {
      this.$emit('close')
    },

    // 按确定
    confirm () {
      if (this.transData.delIds !== undefined) { // +删除操作
        this.delAction()
      } else { // 只confirm弹窗
        this.$emit('close')
      }
    },

    // 删除操作
    delAction () {
      let self = this
      if (this.transData.specHandle === 'import') { // 导入Excel的不需请求服务器
        self.$emit('close', self.transData.delIds)
        return
      }
      self.axios({
        url: self.transData.api,
        method: 'POST',
        type:'json',
        data: self.transData.delIds
      }).then((res) => {
        if (res.data.status === '') {
          Funs.delCookie('xm_cookie')
          window.location.href = ''
        }
        if (res.data.status === 'failure') {
          self.$emit('alert', res.data.message)
          setTimeout(function () {
            self.close()
          }, 0)
        }
        if (res.data.status === 'success') {
          self.$emit('close', self.transData.delIds)
        }
      })
    }
  },

}
</script>

<style>
#confirmModal .main {
  min-height: 250px;
}
</style>