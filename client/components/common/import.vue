<!-- 导入Excel（例：导入Excel菜单有此功能） -->
<template>
  <div class="index">
    <input type="file" @change="importFile(this)" id="imFile" style="display: none" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
    <h4 class="_title fr">
        <a href="javascript:;" @click="uploadFile()">
          <i class="fa fa-mail-forward"></i>
          导入Excel
        </a>
      </h4>
    <h4 class="_title fr">
        <a href="javascript:;" @click="importToDB()">
          <i class="fa fa-plus"></i>
          保存已选到DB
        </a>
      </h4>
    <select class="dicTable" @change="selectTable($event)">
      <option value="">请选择要保存的字典</option>
      <option v-for="(opt,index) in dicList" :value="opt.dicCode" v-text="opt.dicName"></option>
    </select>
    <span class="addToSelect added fr">已选保存条目：<i v-text="selectedLen"></i></span>
  </div>
</template>
<script>
var XLSX = require('xlsx')
export default {
  name: 'Index',
  data() {
    return {
      dicList: [], // 字典DB列表
      imFile: '', // 导入文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelData: [],
      excelSelect: [], //已选的
      selectedLen: 0,
      dicTable: null // 当选的字典DB
    }
  },

  computed: {
    api_dics() {
      return `${this.API.url}/dic/importList${this.API.suf}`
    },
    api_improt() {
      return `${this.API.url}/dic/importexcel${this.API.suf}`
    },
  },

  mounted() {

    this.imFile = document.getElementById('imFile')

    /*字典DB列表*/
    this.getDicList()
  },

  methods: {

    // 获取字典DB列表
    getDicList() {
      let self = this
      self.axios({
        url: self.api_dics,
        method: 'GET',
      }).then((res) => {
        console.log('字典下拉')
        console.log(res)
        let data = res.data.list
        self.dicList = data
      })
    },

    // 选择字典DB
    selectTable(ev) {
      let val = ev.target.value
      this.dicTable = val
    },

    // 是否勾选
    addToSelect(_item, _index) {
      if (_item.selected) {
        this.$set(_item, 'selected', false)
        this.excelSelect[_index].selected = false
        this.selectedLen--
      } else {
        this.$set(_item, 'selected', true)
        this.excelSelect[_index].selected = true
        this.selectedLen++
      }
    },

    // 导入数据后处理
    listHandle(_data) {
      let _items = JSON.parse(JSON.stringify(_data))
      for (let i = 0; i < _items.length; i++) {
        _items[i].selected = true
      }
      this.$emit("importList", _items)
      this.selectedLen = _items.length
      this.excelSelect = _items
    },

    // 遍历出所有已选的
    getSelected() {
      let _arr = []
      for (let i = 0; i < this.excelSelect.length; i++) {
        if (this.excelSelect[i].selected) {
          _arr.push(this.excelSelect[i])
        }
      }
      return _arr
    },

    // 保存到DB
    importToDB() {
      let self = this
      if (!self.dicTable) {
        alert('您还没有选择要保存的字典名称')
        // this.objDel.opts = {
        //     action: 'note',
        //     txt: '您还没有选择要保存的字典名称',
        //     noSubmit: true
        // }
        // this.openModalDel()
        return
      }
      if (self.excelSelect.length < 1) {
        alert('请先导入Excel数据')
        // this.objDel.opts = {
        //     action: 'note',
        //     txt: '请选导入Excel数据',
        //     noSubmit: true
        // }
        // this.openModalDel()
        return
      }
      self.exportData = JSON.parse(JSON.stringify(this.getSelected()))
      let submitData = {
        dicCode: self.dicTable,
        list: self.exportData
      }
      self.axios({
        url: self.api_improt,
        method: 'POST',
        data: submitData
      }).then((res) => {
        console.log('导入')
        if (res.data.status === '') {
          Funs.delCookie('xm_cookie')
          window.location.href = ''
        }
        if (res.data.status === 'failure') {
          console.log('错误提示：' + res.data.message)
        }
        if (res.data.status === 'success') {
          console.log(res)
          alert('保存成功')
          // self.objPop.opts = '保存成功'
          // self.openModalPop()
        }
      })
    },


    uploadFile: function() { // 点击导入按钮
      this.imFile.click()
    },
    importFile: function() { // 导入excel
      let obj = this.imFile
      if (!obj.files) {
        return
      }
      var f = obj.files[0]
      var reader = new FileReader()
      let $t = this
      reader.onload = function(e) {
        var data = e.target.result
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), { // 手动转化
            type: 'base64'
          })
        } else {
          $t.wb = XLSX.read(data, {
            type: 'binary'
          })
        }
        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
        console.log(typeof json)
        $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
      }
      if (this.rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    analyzeData: function(data) { // 此处可以解析导入数据
      return data
    },
    dealFile: function(data) { // 处理导入的数据
      console.log('导入后的json结构')
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        if (!data[i].id) {
          data[i].id = parseInt(Math.random(1000) * 10000)
        }
      }
      this.listHandle(data)
      this.imFile.value = ''
      if (data.length <= 0) {
        this.errorDialog = true
        this.errorMsg = '请导入正确信息'
      } else {
        this.excelData = data
      }
    },
    fixdata: function(data) { // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    }

  }
}

</script>
