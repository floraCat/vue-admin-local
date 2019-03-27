<!-- 明细弹窗 -->
<template>
  <div class="modal animated">
    <div class="bg"></div> 
    <div class="main">
      <header class="head">
        <p class="title">{{transData.action | ttlTxt}}</p> 
        <button class="delete" @click="close"></button>
      </header> 
      <section class="body">
        <!--问题明细-->
        <modal-view-question 
          v-if="transData.spacComp === 'viewQuestion'"
          :transData='transData'
          @close="close"
        >
        </modal-view-question>
        <!--问卷明细-->
        <modal-view-issue 
          v-if="transData.spacComp === 'viewIssue'"
          :transData='transData'
          @close="close"
        >
        </modal-view-issue>
      </section>
    </div>    
  </div>
</template>

<script>
const viewModal_question = resolve => require(['./viewCustom_question'], resolve);
const viewModal_issue = resolve => require(['./viewCustom_issue'], resolve);
export default {

  components: {
    modalViewQuestion: viewModal_question,
    modalViewIssue: viewModal_issue,
  },

  data () {
    return {}
  },

  props: {
    transData: Object
  },

  mounted () {
    document.body.appendChild(this.$el) // 便于fixed定位
  },

  methods: {

    // 关闭顶级弹窗
    close () {
      this.$emit('close')
    },

    // 关闭下级弹窗
    quit () {
      this.infos = {}
    },
  },

}
</script>

<style lang="scss">
@import '~assets/style/var.scss';
.issueView {
  .item {
    overflow: hidden;
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    label {
      float: left;
      width: 70px;
      margin-right: 15px;
      text-align: right;
    }
    p {
      float: left;
    }
  }
  .list {
    margin: 20px 0 0;
    .li {
      margin-bottom: 10px;
      background: #eee;
      padding: 8px 15px 12px;
      h3 {
        line-height: 26px;
      }
      .opts {
        overflow: hidden;
        p {
          float: left;
          margin-right: 20px;
          span {
            input {
              background: #fff;
              padding: 3px 10px;
              width: 120px;
              line-height: 16px;
            }
          }
          &.txt {
            width: 70px;
            height: 20px;
            line-height: 20px;
            border: #ccc 1px solid;
          }
        }
      }
    }
  }
}
</style>