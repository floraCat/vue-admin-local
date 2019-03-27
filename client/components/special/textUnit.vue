<template>
  <div class="textUnit" id="textUnit">
    <div class="wrap">
      <li v-for="(txt,index) in textArr">
        <form-text 
          :able="txt.able"
          @alert='alert'
        ></form-text>
      </li>
      <div class="txtOpt">
        <p @click="switchLast(0)" :class="{on:selfOpt===0}"><em></em><span>不带手写答案</span></p>
        <p @click="switchLast(1)" :class="{on:selfOpt===1}"><em></em><span>带手写答案</span></p>
      </div>
    </div>
    <div class="btn">
      <a href="javascript:;" @click="addText()">+ 添加选项</a>
      <p class="note">注：最多添加7个选项；是否带手写答案只针对最后一个选项</p>
    </div>
  </div>
</template>

<script>
const formText    = resolve => require(['../common/form/text'], resolve);
export default {

  components: {
    formText,
  },

  data () {
    return {
      textArr: [],
      maxItem: 7,
      lastIndex: 0,
      defAble: null,
      selfOpt: 0,
      errorNote: false
    }
  },
  
  props: {
    action: String,
  	flag: String,
    able: Object
  },

  computed: {
  	readonly () {
  	  return this.action === 'add' ? false : this.able.editObj.modReadOnly
  	},
    JSONtextArr () {
      return JSON.stringify(this.textArr)
    },
    JSONable () {
      return JSON.stringify(this.able)
    }
  },

  watch: {
    JSONable (val) {
      let _able = JSON.parse(val)
      if (!_able.value) { // 监听重置
        this.initOpts()
      }
    },
    JSONtextArr (val) {
      let _arr = JSON.parse(val)
      let _rs = []
      if (_arr.length > 0) {
        for (let x = 0; x < _arr.length; x ++) {
          let _vals = _arr[x].able.value
          if (_vals.trim()) {
            _rs.push(_arr[x].opt + _vals)
          }
          if (_vals.trim() && _arr[x-1] && !_arr[x-1].able.value.trim()) { // 选项中间不能为空
            this.errorNote = true
          } else {
            this.errorNote = false
          }
        }
      }
      if (_rs.length > 0 && this.selfOpt === 1) {
        for (let x = 0; x < _rs.length; x ++) {// 先把$$$去掉
          if (_rs[x] === '$$$') { // $$$用来识别是否带手写答案，奇葩后端接口的额外处理
            _rs.splice(x,1)
            break;
          }
        }
        let _pre = _rs[_rs.length-1].substr(0,2)
        _rs.push(_pre+"$$$") // 再把$$$加回去
      }
      if (this.errorNote) {
        this.able.value = 'textUnitError'
      } else {
        this.able.value = _rs
      }
      
    },
    flag (val) { // 切换类型时
      this.initOpts()
    }
  },

  mounted () {
    this.initOpts()
  },

  methods: {

    // 初始化选项
    initOpts () {
      this.lastIndex = 0
      this.selfOpt = 0
      this.textArr = []
      this.defAble = JSON.parse(JSON.stringify(this.able))
      this.defAble.value = ""
      if (this.action === 'add') {
        this.addText(true) // A
        this.addText(true) // B
        this.addText() // C
        this.addText() // D
      }
      if (this.action === 'modify') { // 修改时回显
        let _vals = this.able.value
        this.lastIndex = _vals.length - 1
        for (let i = 0; i < _vals.length; i ++) {
          if (i === 0 && _vals[i] != '$$$') {
            let _able = JSON.parse(JSON.stringify(this.defAble))
            _able.editObj.valid = 'notNull'
            _able.value=_vals[i]
            _able.label='选项A'
            this.textArr.push({opt:'A.',able:_able})
          } 
          if (i === 1 && _vals[i] != '$$$') {
            let _able = JSON.parse(JSON.stringify(this.defAble))
            _able.editObj.valid = 'notNull'
            _able.value=_vals[i]
            _able.label='选项B'
            this.textArr.push({opt:'B.',able:_able})
          } 
          if (i === 2 && _vals[i] != '$$$') {
            let _able = JSON.parse(JSON.stringify(this.defAble))
            _able.value=_vals[i]
            _able.label='选项C'
            this.textArr.push({opt:'C.',able:_able})
          } 
          if (i === 3 && _vals[i] != '$$$') {
            let _able = JSON.parse(JSON.stringify(this.defAble))
            _able.value=_vals[i]
            _able.label='选项D'
            this.textArr.push({opt:'D.',able:_able})
          }
          if (i === 4 && _vals[i] != '$$$') {
            let _able = JSON.parse(JSON.stringify(this.defAble))
            _able.value=_vals[i]
            _able.label='选项E'
            this.textArr.push({opt:'E.',able:_able})
          }
          if (i === 5 && _vals[i] != '$$$') {
            let _able = JSON.parse(JSON.stringify(this.defAble))
            _able.value=_vals[i]
            _able.label='选项F'
            this.textArr.push({opt:'F.',able:_able})
          }
          if (i === 6 && _vals[i] != '$$$') {
            let _able = JSON.parse(JSON.stringify(this.defAble))
            _able.value=_vals[i]
            _able.label='选项G'
            this.textArr.push({opt:'G.',able:_able})
          }
          if (_vals[i] === '$$$') {
            this.selfOpt = 1
          }
        }
      }
    },
    //加单选题
    addText (notNull) {
      let _able = JSON.parse(JSON.stringify(this.defAble))
      if (notNull) {
        _able.editObj.valid = 'notNull'
      }
      if (this.lastIndex === 0) {
        _able.label='选项A'
        this.textArr.push({opt:'A.',able:_able})
      } 
      if (this.lastIndex === 1) {
        _able.label='选项B'
        this.textArr.push({opt:'B.',able:_able})
      } 
      if (this.lastIndex === 2) {
        _able.label='选项C'
        this.textArr.push({opt:'C.',able:_able})
      } 
      if (this.lastIndex === 3) {
        _able.label='选项D'
        this.textArr.push({opt:'D.',able:_able})
      }
      if (this.lastIndex === 4) {
        _able.label='选项E'
        this.textArr.push({opt:'E.',able:_able})
      }
      if (this.lastIndex === 5) {
        _able.label='选项F'
        this.textArr.push({opt:'F.',able:_able})
      }
      if (this.lastIndex === 6) {
        _able.label='选项G'
        this.textArr.push({opt:'G.',able:_able})
      }
      this.lastIndex ++
    },

    // 是否带手写答案
    switchLast (boolean) {
      this.selfOpt = boolean
      if (boolean === 1) {
        let _vals = this.able.value
        if (_vals.length > 0 && _vals != 'textUnitError') {
          let _pre = _vals[_vals.length-1].substr(0,2)
          _vals.push(_pre+"$$$")
        }
      } else {
        let _vals = this.able.value
        if (_vals != 'textUnitError') {
          _vals.pop()
        }
      }
    },

    // 失败提示
    alert (msg) {
      this.$emit('alert', 1, msg)
    }

  }
}
</script>

<style lang="scss">
#textUnit {
  background: #eee;
  padding: 15px 25px 15px 0;
  .readonly {
    border:none;
  }
  .wrap {
    position: relative;
    padding-bottom: 30px;
  }
  .btn {
    padding-left: 110px;
    margin-top: 5px;
    a {
      float: left;
      padding: 0 15px 0 10px;
      margin-right: 10px;
      height: 28px;
      line-height: 28px;
      color: #3a71a3;
      border: #c1d7ec 1px solid;
      background: #d7e8f8;
      border-radius: 4px;
    }
    .note {
      line-height: 28px;
      color: #aaa;
      font-size: 12px;
    }
  }
  .txtOpt {
    position: absolute;
    right: 0px;
    bottom: 5px;
    height: 24px;
    line-height: 24px;
    overflow: hidden;
    p {
      float: left;
      margin-right: 15px;
      overflow: left;
      color: #3a71a3;
      font-size: 12px;
      cursor: pointer;
      &.on {
        em {
          background: #3a71a3;
          border: none;
        }
      }
      em {
        float: left;
        display: block;
        width: 12px;
        height: 12px;
        margin: 7px 5px 0 0;
        background: #fff;
        border: #c1d7ec 1px solid;
        border-radius: 50%;
      }
    }
  }
}
</style>