<!-- 编辑弹窗 -->
<template>
  <div class="selCustom">
    <input type="hidden" 
    v-model="able.value"
    :data-note="able.label"
    :data-valid='able.editObj.valid' 
    :data-forCheck="able.editObj.valid || able.editObj.type" />
    <div class="sels">
      <li class="bg6" v-for="(sel,index) in selArr">
        <form-page-select 
          :able="sel.able"
          @alert='alert'
        ></form-page-select>
      </li>
    </div>
    <div class="btns">
      <p @click="addRadio()"><span>+</span> 添加单选题</p>
      <p @click="addCheckbox()"><span>+</span> 添加多选题</p>
      <p @click="addFill()"><span>+</span> 添加填空题</p>
    </div>
    <p class="btnNote">注：点选以上控件添加指定类型的问题</p>
  </div>
</template>

<script>
const formPageSelect    = resolve => require(['../common/form/pageSelect'], resolve);
export default {
  components: {
    formPageSelect,
  },

  data () {
    return {
      selArr: [],
    }
  },

  props: {
    able: Object,
    action: String
  },

  computed: {
    JSONselArr () {
      return JSON.stringify(this.selArr)
    },
    JSONable () {
      return JSON.stringify(this.able)
    }
  },

  watch: {
    JSONable (val) {
      let _able = JSON.parse(val)
      if (!_able.value) { // 监听重置
        this.selArr = []
      }
    },
    JSONselArr (val) { // 监听题目添加变动
      let _arr = JSON.parse(val)
      let _rs = []
      if (_arr.length > 0) {
        for (let x = 0; x < _arr.length; x ++) {
          let _vals = _arr[x].able.value
          if (_vals.length > 0) {
            for (let y = 0; y < _vals.length; y ++) {
              _rs.push(_vals[y])
            }
          }
        }
      }
      this.able.value = _rs
    }
  },

  mounted () {
    if (this.action === 'modify') { // 修改时回显
      let _vals = this.able.value
      let _rs = []
      for (let i = 0; i <_vals.length; i ++) {
        if (_vals[i].type === 'radio') {
          this.addRadio({id:_vals[i].id,txt:_vals[i].name})
        }

        if (_vals[i].type === 'checkbox') {
          this.addCheckbox({id:_vals[i].id,txt:_vals[i].name})
        }
        if (_vals[i].type === 'fill') {
          this.addFill({id:_vals[i].id,txt:_vals[i].name})
        }
      }
    }
  },

  methods: {

    //加单选题
    addRadio (val) {
      let _able = JSON.parse(JSON.stringify(this.able))
      if (val != undefined) {
        if (!_able.value.ids) {
          _able.value = { ids : [],txts : [] }
        }
        _able.value.ids.push(val.id)
        _able.value.txts.push(val.txt)
      }
      _able.label='单选题'  
      _able.editObj.valid = null  
      _able.editObj.requireArr[0].paramKey='naireCategory'  
      _able.editObj.requireArr[0].paramVal='radio'
      let _sels = this.selArr
      let _flag = 0
      if (_sels.length > 0) {
        for (let i = 0; i < _sels.length; i ++) {
          if (_sels[i].type === 'radio') {
            _flag = 1
          }
        }
      }
      if (!_flag) {
        _sels.push({type:'radio',able:_able})
      }
    },

    //加多选题
    addCheckbox (val) {
      let _able = JSON.parse(JSON.stringify(this.able))
      if (val != undefined) {
        if (!_able.value.ids) {
          _able.value = { ids : [],txts : [] }
        }
        _able.value.ids.push(val.id)
        _able.value.txts.push(val.txt)
      }
      _able.label='多选题' 
      _able.editObj.valid = null 
      _able.editObj.requireArr[0].paramKey='naireCategory'  
      _able.editObj.requireArr[0].paramVal='checkbox'  
      let _sels = this.selArr
      let _flag = 0
      if (_sels.length > 0) {
        for (let i = 0; i < _sels.length; i ++) {
          if (_sels[i].type === 'checkbox') {
            _flag = 1
          }
        }
      }
      if (!_flag) {
        _sels.push({type:'checkbox',able:_able})
      }
    },

    //加填空题
    addFill (val) {
      let _able = JSON.parse(JSON.stringify(this.able))
      if (val != undefined) {
        if (!_able.value.ids) {
          _able.value = { ids : [],txts : [] }
        }
        _able.value.ids.push(val.id)
        _able.value.txts.push(val.txt)
      }
      _able.label='填空题' 
      _able.editObj.valid = null 
      _able.editObj.requireArr[0].paramKey='naireCategory'  
      _able.editObj.requireArr[0].paramVal='fill' 
      let _sels = this.selArr
      let _flag = 0
      if (_sels.length > 0) {
        for (let i = 0; i < _sels.length; i ++) {
          if (_sels[i].type === 'fill') {
            _flag = 1
          }
        }
      }
      if (!_flag) {
        _sels.push({type:'fill',able:_able})
      }
    },

    // 失败提示
    alert (msg) {
      this.$emit('alert', 1, msg)
    }
    
  },

}
</script>

<style lang="scss" scope>
.selCustom {
  margin: 15px 0 25px;
  .btns {
    overflow: hidden;
    text-align: center;
    margin-top: 20px;
    p {
      display: inline-block;
      cursor: pointer;
      margin-right: 20px;
      padding: 0 10px 0 6px;
      color: #3a71a3;
      font-size: 12px;
      background: #d7e8f8;
      border: #c1d7ec 1px solid;
      border-radius: 4px;
      span {
        color: #3a71a3;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .btnNote {
    padding: 0 0 0 115px;
    color: #aaa;
    font-size: 12px;
    margin-top: 10px;
  }
}
</style>