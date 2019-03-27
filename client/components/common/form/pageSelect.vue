<!-- 分页列表点选 （例：设备管理有此功能）-->
<template>
  <div class="formCtrl pageSel">
    <label class="label">
      <span class="must" v-if="able.editObj.valid">*</span>
      <span v-text="able.editObj.label2 ? able.editObj.label2 :able.label"></span>
    </label>
    <div class="p xSelect">
      <div class="itemList">
        <!--hidden控件存要提交的值-->
        <input class="input" type="hidden" v-model="result2" :data-note="able.editObj.label2 ? able.editObj.label2 : able.label" :data-valid='able.editObj.valid' :data-type='able.editObj.type' :data-forCheck="able.editObj.valid || able.editObj.type" :placeholder="able.editObj.placeholder" readonly="readonly">
        <!--点选后的文本标签-->
        <ol v-if="resultTxts.length">
          <li v-for="(label,index) in resultTxts" v-if="resultTxts.length">
            <p>{{able.editObj.requireArr[0].ttl || ''}}{{label}}</p>
            <i class="fa fa-close" @click="delect(index)"></i>
          </li>
        </ol>
      </div>
      <!--点选控件-->
      <div class="enter">
        <a class="add" @click="addItem()">点选</a>
        <div class="addItem" @click="addNewItem()" v-if="able.editObj.addItemApis">+ 添加条目</div>
        <p class="note" v-text="'（'+checkType+'）'"></p>
        <p class="note" v-text="able.editObj.placeholder"></p>
      </div>
    </div>
    <div class="infoList" ref="popWindow" :class="{open:options.length}">
      <div class="_bg"></div>
      <div class="wrap">
        <div class="hd" href="popHead">
          <div class="title">
            选择 
            <span>{{able.editObj.label2 || able.label}}</span>
          </div>
          <a class="quit delete" @click="quit()"></a>
        </div>
        <!--请求后的选项列表-->
        <ul ref="popUl">
          <a class="li" v-for="(option,index) in options">
            <p class="desc" @click="select(index)">
              <span v-for="opt in able.editObj.requireArr[0].optArr">{{opt.ttl}}
              {{option[opt.key]}}</span>
            </p>
          </a>
        </ul>
        <pagination
          :transData="paginationItems" 
          @changePage="changePage"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>

import pagination from '../../../components/common/pagination'

export default {

  components: {
    pagination: pagination,
  },

  data () {
    return {
      // 下拉选项
      options: [],
      // 点选后的文本标签
      resultTxts: [],
      // 点选后的值
      resultIds: [],
      // 分页传参
      paginationItems:{},
    }
  },
  
  props: {
    action: String,
    able: Object,
  },

  computed: {
    // 当前请求选项文本的字段
    curKey () {
      return this.able.editObj.requireArr[0].optArr[0].key
    },
    // 最终此控件提交的值
    result2 () {
      return this.resultTxts.join(',') || null
    },
    // 提交值字段
    valField () {
      return this.able.editObj.optValField || 'id'
    },
    checkType () {
      return this.able.editObj.selectLen > 1 ? '可多选' : '单选'
    }
  },

  mounted () {

    // 添加时显示默认值
    if (this.action === 'add') {
      this.showDefVal()
    }

    // 修改时回显
    if ('object' === typeof(this.able.value) && this.able.value.ids) {
      this.resultIds = JSON.parse(JSON.stringify(this.able.value.ids))
      this.resultTxts = JSON.parse(JSON.stringify(this.able.value.txts))
      this.valHandle()
    }

  },

  methods: {

    /*点选外可添加新条目*/
    addNewItem () {
      this.$emit('addNewItem', this.able.editObj.addItemApis)
    },

    // 点选获取分页选项
    addItem () {
      this.getData(1)
    },

    // 选项请求
    getData (page, callback) {
      let self = this
      let listObj = {}
      listObj.pageNo = page
      listObj.pageSize = 15
      let _requireArr = self.able.editObj.requireArr[0]
      if (_requireArr.paramKey) {
        listObj[_requireArr.paramKey] = _requireArr.paramVal
      }
      self.axios({
        url: _requireArr.api,
        method: 'GET',
        params: listObj
      }).then((res) => {
        console.log('下拉请求数据')
        if (res.data.status === '') {
          Funs.delCookie('xm_cookie')
          window.location.href = ''
        }
        if (res.data.status === 'failure') {
          self.$emit('alert', 1, res.data.message)
        }
        if (res.data.status === 'success') {
          console.log(res)
          let _res = res.data.list ? res.data.list : res.data.page.list
          if (_res.length <= 0) {
            let _label = this.able.editObj.label2 ? this.able.editObj.label2 : this.able.label
            alert('‘' + _label + '’ 没有数据，请先添加对应数据')
          }
          if (callback && 'function' === typeof callback) {
            callback(_res)
            return
          }
          self.options = JSON.parse(JSON.stringify(_res))
          self.paginationItems = {
            pageNo: page,
            pageSize: res.data.page.pageSize,
            totalCount: res.data.page.totalCount,
            totalPage: res.data.page.totalPage,
          }
        }
      })
    },

    // 点选处理
    select (index) {
      let self = this
      /*去重 start*/
      for (let x = 0; x < self.resultIds.length; x ++) {
        if (parseInt(self.options[index][self.valField]) === self.resultIds[x]) { // 已选过的不处理
          this.options = []
          return
        }
      }
      /*去重 end*/
      if (!this.able.editObj.selectLen || this.able.editObj.selectLen <= 1) { //单选先清空之前的
        self.resultTxts = []
        self.resultIds = []
      }
      self.resultTxts.push(self.options[index][self.curKey])
      self.resultIds.push(self.options[index][self.valField])
      self.valHandle()
      self.options = []
    },

    // 提交值处理
    valHandle () {
      let valArrHandle = function (_ids, _txts) {  // 提交对象数组处理
        let _valArr = []
        for (let x = 0; x < _ids.length; x ++) {
          let obj = {}
          obj.id = _ids[x]
          obj.name = _txts[x]
          _valArr.push(obj)
        }
        return _valArr
      }
      let valArrHandle2 = function (_ids, _txts) {  // 提交对象数组处理
        let obj = {}
        obj.ids = _ids
        obj.txts = _txts
        return obj
      }
      if (this.able.editObj.selectLen > 1) {
        if (this.able.editObj.arrayVal) { // 提交对象数组
          this.able.value = valArrHandle(this.resultIds,this.resultTxts)
        } else {
          this.able.value = this.resultIds.join(',')
        }
      } else {
        // 只有一个id返回int
        if (this.able.editObj.arrayVal) { // 提交对象数组
          this.able.value = valArrHandle(this.resultIds,this.resultTxts)
        } else {
          if (this.valField === 'id') {
            this.able.value = parseInt(this.resultIds)
          } else {
            this.able.value = valArrHandle2(this.resultIds,this.resultTxts)
          }
          
        }
      }
    },

    // 已选标签删除
    delect (index) {
      this.resultTxts.splice(index, 1)
      this.resultIds.splice(index, 1)
      this.valHandle()
    },

    // 关闭弹窗
    quit () {
      this.options = []
    },

    // 换页
    changePage (page) {
      this.getData(page)
    },

    /*显示默认值*/
    showDefVal () {
      let self = this
      /*有字段showDef时 默认显示isDefault为true的值*/
      if (this.able.editObj.showDef) {
        this.getData(1, function (res) {
            for (let i = 0; i < res.length; i ++) {
              if (res[i].isDefault) {
                self.resultIds = JSON.parse(JSON.stringify([res[i][self.valField]]))
                self.resultTxts = JSON.parse(JSON.stringify([res[i][self.able.editObj.key2]]))
                self.able.value = self.resultIds.join(',')
              }
            }
        })
      }
    }

  }
}
</script>

<style>
.pageSel .infoList .mPagination { padding-top: 10px; }
.pageSel .mPagination i { display: none; }
.pageSel .mPagination select { display: none; }
</style>
