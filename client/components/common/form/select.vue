<template>
  <div class="formCtrl" id="ctrlSelect">
    <label class="label">
      <span class="must" v-if="able.editObj.valid">*</span>
      <span v-text="able.editObj.label2 ? able.editObj.label2 :able.label"></span>
    </label>
    <p class="p">
      <span class="select">
        <select 
          :data-note="_label2" 
          :data-valid='able.editObj.valid' 
          :data-type='able.editObj.type' 
          :data-forCheck="able.editObj.valid || able.editObj.type" 
          :data-defOpt='defOpt'
          @change="select($event)"
        >
          <option value="" v-text="defOpt"></option>
          <option v-for="(curItem2,index2) in selectOpts" :value="curItem2.val" :selected="curItem.value===curItem2.val">{{curItem2.option}}</option>
        </select>
      </span>
      <span class="note" v-if="selectOpts.length <= 0">{{able.selectObj.errorNote}}</span>
    </p>
  </div>
</template>

<script>

export default {

  data () {
    return {
      curItem: {},
      defOpt: '',
      selectOpts: []
    }
  },

  props: {
    able: Object
  },

  computed: {
    _label2 () {
      let label2 = this.curItem.editObj && this.curItem.editObj.label2
      return label2 ? label2 : this.curItem.label
    }
  },

  mounted () {
    this.action()
  },

  methods: {
    action () {
      if (this.able.selectObj && this.able.selectObj.api) {
        this.apiGetData()
      }
      if (this.able.selectObj && this.able.selectObj.opts) {
        this.selectOpts = this.able.selectObj.opts
      }
      this.curItem = JSON.parse(JSON.stringify(this.able))
      this.defOpt = this.able.selectObj && this.able.selectObj.defOpt ? this.able.selectObj.defOpt : '请选择'
    },
    apiGetData () {
      let self = this
      self.axios({
        url: self.able.selectObj.api,
        methods: 'GET'
      }).then((res) => {
        console.log('下拉选项')
        if (res.data.status === '') {
          Funs.delCookie('xm_cookie')
          window.location.href = ''
        }
        if (res.data.status === 'failure') {
          console.log('错误提示：' + res.data.message)
        }
        if (res.data.status === 'success') {
          console.log(res)
          let list = res.data.list || []
          /*-----格式化数据 start------*/
          for (let i = 0; i < list.length; i ++) {
            if (list[i].status) {
              list[i].status = parseInt(list[i].status)
            }
          }
          /*-----格式化数据 end------*/
          for (let i = 0; i < list.length; i ++) {
            let obj = {}
            obj.val = self.able.selectObj.valKey ? list[i][self.able.selectObj.valKey] : list[i].id
            obj.option = list[i][self.able.selectObj.optKey]
            self.selectOpts.push(obj)
          }
        }
      })
    },
    select (ev) {
      let val = ev.target.value
      this.able.value = val
    }
    /*----------特殊设置------------*/
  }

}
</script>

<style lang="scss">
#ctrlSelect {
  select {
    height: 35px;
    min-width: 150px;
    border-color: #c1d7ec;
    border-radius: 3px;
    text-indent: 5px;
    overflow: hidden;
    background: #d7e8f8;
  }
  .formCtrl .p .note {
    padding-left: 15px;
    color: #aaa;
  }
}
</style>