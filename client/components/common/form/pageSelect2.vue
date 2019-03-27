<!-- 分页列表点选，选完后确定  （例：公众号关注有此功能）-->
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
        <a class="add" @click="addItem($event)">点选</a>
        <div class="addItem" @click="addNewItem()" v-if="able.editObj.addItemApis">+ 添加条目</div>
        <p class="note" v-text="able.editObj.placeholder"></p>
      </div>
    </div>
    <div class="infoList2" ref="popWindow" :class="{open:pageShow}">
      <div class="hd" href="popHead">
        <div class="title">
          选择 
          <span>{{able.editObj.label2 || able.label}}</span>
        </div>
        <!--搜索控件-->
        <div class="xmSearch">
          <ul>
            <li v-for="filter in able.editObj.requireArr[0].filterArr">
              <label>{{filter.ttl}}：</label> <input type="text" v-model="filter.val" />
            </li>
          </ul>
          <ol style="overflow: hidden;">
            <li class="li"><input type="button" value="搜索" class="btn" @click="filter()"></li> 
          </ol>
        </div>
        <a class="quit delete" @click="quit()"></a>
      </div>
      <div class="note" v-if="!options.length">没有你要的数据，请重新筛选</div>
      <!--请求后的选项列表-->
      <div class="table2">
        <table ref="popUl" v-if="options.length">
          <tr>
            <th>全选</th>
            <th v-for="(option,index) in able.editObj.requireArr[0].optArr">
              {{option.ttl}}
            </th>
          </tr>
          <tr v-for="(option,index) in options">
            <td class="sel">
              <a href="javascript:;" @click="select(index)" class="_check" :class="{_checked:selectArr[index]}"><i class="fa fa-check"></i></a>
            </td>
            <td v-for="opt in able.editObj.requireArr[0].optArr">
              {{option[opt.key]}}
            </td>
          </tr>
        </table>
      </div>
      <pagination v-if="options.length"
        :transData="paginationItems" 
        @changePage="changePage"
      ></pagination>
      <!--点选预览的文本标签-->
      <div class="xSelect">
        <div class="itemList">
          <input class="input" type="hidden" v-model="result2" :data-note="able.editObj.label2 ? able.editObj.label2 : able.label" :data-valid='able.editObj.valid' :data-type='able.editObj.type' :data-forCheck="able.editObj.valid || able.editObj.type" :placeholder="able.editObj.placeholder" readonly="readonly">
          <ol v-if="resultTxts.length">
            <li v-for="(label,index) in resultTxts" v-if="resultTxts.length">
              <p>{{able.editObj.requireArr[0].ttl || ''}}{{label}}</p>
              <i class="fa fa-close" @click="delect(index)"></i>
            </li>
          </ol>
        </div>
      </div>
      <div class="confirm" @click="confirm()">确定</div>
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
      pageShow: false,
      selectArr: [],
      // 下拉选项
      options: [],
      // 点选预览的文本标签
      org_resultTxts: [],
      // 点选预览的值
      org_resultIds: [],
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
    addItem (ev) {
      let _filter = this.able.editObj.requireArr[0].filterArr
      for (let x = 0; x < _filter.length; x ++) {
        _filter[x].val = ''
      }
      this.getData(1)
      this.org_resultTxts = JSON.parse(JSON.stringify(this.resultTxts))
      this.org_resultIds = JSON.parse(JSON.stringify(this.resultIds))
    },

    // 选项请求
    getData (page, rsHandle, callback) {
      let self = this
      let listObj = {}
      listObj.pageNo = page
      listObj.pageSize = 15
      let _filter = self.able.editObj.requireArr[0].filterArr
      for (let x = 0; x < _filter.length; x ++) {
        listObj[_filter[x].key] = _filter[x].val
      }
      self.axios({
        url: self.able.editObj.requireArr[0].api,
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
            if (!rsHandle) {
              alert('‘' + _label + '’ 没有数据，请先添加对应数据')
            }
          }
          if (callback && 'function' === typeof callback) {
            callback(_res)
            return
          }
          self.options = JSON.parse(JSON.stringify(_res))
          for(let x = 0; x < self.options.length; x ++) {
            self.selectArr.splice(x,1,false)
            if (self.resultIds.length > 0) {
              for (let y = 0; y < self.resultIds.length; y ++) {
                if (self.options[x].id === self.resultIds[y]) {
                  self.selectArr.splice(x, 1, true)
                  break
                }
              }
            }          
          }
          self.paginationItems = {
            pageNo: page,
            pageSize: res.data.page.pageSize,
            totalCount: res.data.page.totalCount,
            totalPage: res.data.page.totalPage,
          }
          self.pageShow = true
        }
      })
    },

    // 点选处理
    select (index) {
      let self = this
      let _curSel = !self.selectArr[index]
      self.selectArr.splice(index, 1, _curSel)
      if (_curSel) {
        self.resultTxts.push(self.options[index][self.curKey])
        self.resultIds.push(self.options[index].id)
      } else {
        for (let x = 0; x < self.resultIds.length; x ++) {
          if (parseInt(self.options[index].id) === self.resultIds[x]) {
            this.resultTxts.splice(x,1)
            this.resultIds.splice(x,1)
          }
        }
      }
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
      if (this.able.editObj.arrayVal) { // 提交对象数组
        this.able.value = valArrHandle(this.resultIds,this.resultTxts)
      } else {
        self.able.value = self.resultIds.join(',')
      }
    },

    // 提交值处理
    valHandle () {
      let valArrHandle = function (_ids, _txts) {  // 提交值的数据格式处理
        let _valArr = []
        for (let x = 0; x < _ids.length; x ++) {
          let obj = {}
          obj.id = _ids[x]
          obj.name = _txts[x]
          _valArr.push(obj)
        }
        return _valArr
      }
      let _editObj = this.able.editObj
      // 多个值
      if (_editObj.selectLen > 1) {
        if (_editObj.arrayVal) { // 提交对象数组
          this.able.value = valArrHandle(this.resultIds,this.resultTxts)
        } else {
          this.able.value = this.resultIds.join(',') // 逗号隔开
        }
      // 只有一个值
      } else {
        if (_editObj.arrayVal) { // 提交对象数组
          this.able.value = valArrHandle(this.resultIds,this.resultTxts)
        } else {
          this.able.value = parseInt(this.resultIds)//返回int
        }
      }
    },

    // 筛选
    filter () {
      this.getData(1, 'noPop')
    },

    // 确定
    confirm () {
      this.pageShow = false
    },

    // 已选标签删除
    delect (index) {
      this.resultTxts.splice(index, 1)
      this.resultIds.splice(index, 1)
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
      if (this.able.editObj.arrayVal) { // 提交对象数组
        this.able.value = valArrHandle(this.resultIds,this.resultTxts)
      } else {
        this.able.value = this.resultIds.join(',')
      }
    },

    // 关闭弹窗
    quit () {
      this.pageShow = false
      this.resultTxts = JSON.parse(JSON.stringify(this.org_resultTxts))
      this.resultIds = JSON.parse(JSON.stringify(this.org_resultIds))
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

<style lang="scss" scope>
.infoList2 {
  position: absolute;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background: #fff;
  transition: left .4s ease;
  z-index: 99;
  &.open {
    transition: left .4s ease;
    left: 0;
    padding-bottom: 15px;
  }
  .hd {
    height: 122px;
    line-height: 62px;
    border-bottom: #e5e5e5 1px solid;
    overflow: hidden;
    padding: 0 20px;
    .title {
      font-size: 1.5rem;
      span {
        font-size: 14px;
        color: #3a71a3;
        padding-left: 10px;
      }
    }
    .quit {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .lt {
      float: left;
    }
    em {
      font-style: normal;
      font-size: 16px;
      color: #3a71a3;
      &:before {
        content: ' ';
      }
      &:after {
        content: ' ';
      }
    }
  }
  .table2 {
    height: 60%;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #eee;
  }
  table {
    width: 100%;
    text-align: center;
    .sel {
      position: relative;
    }
    tr {
      border-bottom: #ddd 1px solid;
    }
    th {
      height: 36px;
      line-height: 36px;
      border-right: #ddd 1px solid;
      border-bottom: #ddd 1px solid;
      background: #eee;
    }
    td {
      height: 32px;
      line-height: 32px;
      border-right: #ddd 1px solid;
    }
  }
  .note {
    padding: 20px 0;
    text-align: center;
    color: #999;
  }
  .xmSearch {
    padding: 0;
    margin: 0;
    border-top: none;
    ul {
      padding-left: 20px;
    }
  }
  .itemList {
    width: 90%;
    min-height: 66px;
    max-height: 83px;
    overflow-y: scroll;
    padding: 10px;
    margin: 0 auto;
    border-radius: 5px;
    border: #ddd 1px solid;
  }
  .mPagination {
    padding: 15px 0 0;
    .switch {
      display: none;
    }
    .info {
      display: none;
    }
  }
  .confirm {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: #3a71a3;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
