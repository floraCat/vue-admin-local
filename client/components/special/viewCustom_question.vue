<!-- 明细弹窗 -->
<template>
  <div class="questionView">
    <div class="item" v-for="(item,index) in viewObj" v-if="item.type_question.indexOf(type) >= 0">
      <label v-text="item.label+'：'"></label>
      <p v-if="item.key!='choiceList'">{{item.value | checkToTxt(item.key)}}</p>
      <p class="opts" v-if="item.key==='choiceList'">
        <span v-for="opt in item.value" v-text="opt"></span>
        <span class="self" v-if="selfOpt">带手写答案</span>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      selfOpt: 0
    }
  },

  props: {
    transData: Object
  },

  computed: {
    type () {
      let _rs = ''
      let _ables = this.transData.ables
      for (let i = 0; i < _ables.length; i ++) {
        if (_ables[i].key === 'naireCategory') {
          _rs = _ables[i].value
        }
      }
      return _rs
    },
    viewObj () {
      let _ables = JSON.parse(JSON.stringify(this.transData.ables))
      let _temp = []
      for (let i = 0; i < _ables.length; i ++) {
        if (_ables[i].key === 'choiceList') {
          let _vals = _ables[i].value
          if (_vals[_vals.length-1] === '$$$') {
            this.selfOpt = 1
            _vals.pop()
          }
          for (let x = 0; x < _vals.length; x ++) {
            if (x === 0) {_vals[x] = 'A.' + _vals[x]}
            if (x === 1) {_vals[x] = 'B.' + _vals[x]}
            if (x === 2) {_vals[x] = 'C.' + _vals[x]}
          }
        }
      }
      return _ables
    }
  },

  mounted () {
    let self = this
    
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
.questionView {
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
  .opts {
    background: #eee;
    padding: 0 0 0 15px;
    span {
      margin-right: 20px;
      &.self {
        font-size: 12px;
      }
    }
  }
}
</style>