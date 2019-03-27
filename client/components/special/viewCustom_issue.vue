<!-- 明细弹窗 -->
<template>
  <div class="issueView">
    <div class="item" v-for="(item,index) in transData.ables" v-if="item.key != 'attrType'">
      <label v-text="item.label+'：'"></label>
      <p>{{item.value | checkToTxt(item.key)}}</p>
    </div>
    <div class="list">
      <div class="li" v-for="(ques,index) in questions">
        <h3>{{ques.question}}：</h3>
        <div class="opts">
          <p v-for="(opt,index2) in ques.opts">
            <span v-if="opt != '$$$'">{{opt}}</span>
            <span v-if="opt === '$$$'">
              <input type="text" value="" />
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },

  props: {
    transData: Object
  },

  computed: {
    questions () {
      let _rs = []
      let _ables = this.transData.ables
      for (let i = 0; i < _ables.length; i ++) {
        if (_ables[i].key === 'attrType') {
          /*----for test--*/
          _ables[i].value = [
            {id:1,name:'问题test',type:'radio',opts:["A项","B项","C项","D项"]},
            {id:1,name:'问题test22',type:'radio',opts:["A2项","B2项","C2项","D2项","$$$"]}
          ]
          /*----for test--*/
          let _vals = _ables[i].value
          for (let x = 0; x < _vals.length; x ++) {
            let _temp = []
            _temp.question = _vals[x].name
            let _opts = _vals[x].opts
            _opts[0] = 'A：'+_opts[0]
            _opts[1] = 'B：'+_opts[1]
            for (let y = 2; y < _opts.length; y ++) {
              if (y === 2 && _opts[y] != '$$$') {_opts[y] = 'C：'+_opts[y]; continue}
              if (y === 3 && _opts[y] != '$$$') {_opts[y] = 'D：'+_opts[y]; continue}
              if (y === 4 && _opts[y] != '$$$') {_opts[y] = 'E：'+_opts[y]; continue}
              if (y === 5 && _opts[y] != '$$$') {_opts[y] = 'D：'+_opts[y]; continue}
              if (y === 6 && _opts[y] != '$$$') {_opts[y] = 'G：'+_opts[y]; continue}
            }
            _temp.opts = _opts
            _rs.push(_temp)
          }
          break;
        }
      }
      return _rs
    }
  },

  mounted () {},

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