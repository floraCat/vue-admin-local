<!-- 列表点选 （例：广告投放管理有此功能）-->
<template>
  <div class="formCtrl">
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
          <li v-for="(txt,index) in resultTxts" v-if="resultTxts.length">
            <p>{{requireArr[maxRequire-1].ttl || ''}}{{txt}}</p>
            <i class="fa fa-close" @click="delect(index)"></i>
          </li>
        </ol>
      </div>
      <!--点选控件-->
      <div class="enter">
        <a class="add" @click="selectItem($event)">点选</a>
        <div class="addItem" @click="addNewItem()" v-if="able.editObj.addItemApis">+ 添加条目</div>
        <p class="note" v-text="'（'+checkType+'）'"></p>
        <p class="note" v-text="able.editObj.placeholder"></p>
      </div>
    </div>
    <div class="infoList" ref="popWindow" :class="{open:options.length}">
      <div class="hd">
        <a class="quit delete" @click="quit()"></a>
        <a class="lt" v-show="requireIndex>0" @click="_return()">返回上一级</a>
      </div>
      <!--请求后的选项列表-->
      <ul ref="popUl">
        <a class="li" v-for="(option,index) in options" @mouseover="overInfo($event, index)" @mousemove="moveInfo($event, index)" @mouseout="outInfo()">
          <p class="desc" @click="select(index)">
            <span class="span0">{{requireArr[requireIndex].ttl}}
            {{option[curKey]}}</span>
            <span>{{requireArr[requireIndex].ttl2}}
            {{option[requireArr[requireIndex].key2]}}</span>
            <span>{{requireArr[requireIndex].ttl3}}
            {{option[requireArr[requireIndex].key3]}}</span>
            <span>{{requireArr[requireIndex].ttl4}}
            {{option[requireArr[requireIndex].key4]}}</span>
          </p>
          <a class="btn" href="javascript:;" v-show="selectAll" @click="select(index,true)">全选</a>
        </a>
      </ul>
      <div class="noMore" v-show="noMore">
        <i class="bg"></i>
        <p>已经没有了</p>
      </div>
    </div>
    <!--hover弹窗-->
    <div class="infoPop" :class="{show: popShow}" ref="infoPop">
      <ol>
        <dl v-for="(info,index) in popInfo">
          <dt v-text="info.boothName"></dt>
          <dd>
              <p v-for="(info2,index2) in info.boxes"><label v-text="info2.boxName + '：'"></label><span v-text="info2.mac"></span></p>
          </dd>
        </dl>
      </ol>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      // 选项列表
      options: [],
      // 请求层级
      requireIndex: -1,
      // 点选后的文本标签
      resultTxts: [],
      // 点选后的值
      resultIds: [],
      // 缓存（返回上一级就不要重新请求了）
      cacheObj: [],
      //鼠标hover弹窗相关
      curInfoId: null,
      popInfo: null,
      popShow: false,
      // 没有下级时提示
      noMore: false,
    }
  },
  
  props: {
  	action: String,
    able: Object,
  },

  computed: {
    requireArr () {
      return this.able.editObj.requireArr
    },
    // 当前请求选项文本的字段
    curKey () {
      return this.able.editObj.requireArr[this.requireIndex].key
    },
    // 最大请求数
    maxRequire () {
      return this.able.editObj.requireArr.length
    },
    // 最终此控件提交的值
    result2 () {
      return this.resultTxts.join(',') || null
    },
    // 直接选择一个上级
    selectAll () {
      return this.able.key === 'boxes' && this.requireIndex === this.maxRequire - 2
    },
    checkType () {
      return this.able.editObj.selectLen > 1 ? '多选' : '单选'
    },
    // hover弹窗api
    api_popInfo () {
      return `${this.API.url}/booth/show${this.API.suf}`
    }
  },

  mounted () {

    // 添加时显示默认值
    if (this.action === 'add') {
      this.showDefVal()
    }

    // 修改时回显
    if ('object' === typeof(this.able.value)) {
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

    /*点选*/
    selectItem (ev) {
      this.requireIndex = -1
      this.select()
    },

    // 选项请求
    getData (params, callback) {
      let self = this
      self.axios({
        url: self.requireArr[this.requireIndex].api,
        method: 'GET',
        params: params
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
          if (callback && 'function' === typeof callback) {
            callback(_res)
            return
          }
          self.options = JSON.parse(JSON.stringify(_res))
          /*----------排除已选 start------*/
          for (let x = 0; x < _res.length; x ++) {
            let flag = 0
            for (let y = 0; y < self.resultIds.length; y ++) {
              if (_res[x].id === self.resultIds[y]) {
                flag = 1
              }
            }
            if (flag) {
              self.options.splice(x, 1)
            }
          }
          /*----------排除已选 end------*/
          if (!self.options.length) {
            let self = this
            self.noMore = true
            // 提示没有
            setTimeout(function() {
              self.noMore = false
            }, 1500)
          }
          // 更新缓存
          self.cacheObj.splice(self.requireIndex, 1, self.options)
          /*弹窗设置 start*/
          // let popRect = this.$refs.popWindow.getBoundingClientRect()
          // this.$refs.popUl.style.height = (popRect.height-62) + 'px'
          // this.$refs.popUl.style.overflowY = 'scroll'
          /*弹窗设置 end*/
        }
      })
    },

    // 点选处理
    select (index, boolean) {
      let self = this
      self.popShow = false
      // 点全选（不要下级了）
      if (boolean) {
        self.requireIndex = self.maxRequire-1
      }
      // 点选后没有请求了（没有下级了）
      if (self.requireIndex === (self.maxRequire-1)) {
        if (!this.able.editObj.selectLen || this.able.editObj.selectLen <= 1) { //单选先清空之前的
          self.resultTxts = []
          self.resultIds = []
        }
        self.resultTxts.push(self.options[index][self.curKey])
        self.resultIds.push(self.options[index].id)
        self.valHandle()
        self.options = []
        self.requireIndex = -1
      // 点选后还有请求 
      } else {
        self.requireIndex++
        let _params = null
        if (index !== undefined) {
          // 请求指定id
          let val = self.options[index].id
          _params = {[self.requireArr[self.requireIndex].paramKey] : val}
        } else {
          // 默认传的参数
          _params = {[self.requireArr[self.requireIndex].paramKey] : self.requireArr[self.requireIndex].paramVal}
        }
        self.getData(_params)
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

    // 已选标签删除
    delect (index) {
      this.resultTxts.splice(index, 1)
      this.resultIds.splice(index, 1)
      this.valHandle()
    },

    // 关闭弹窗
    quit () {
      this.requireIndex = -1
      this.options = []
      this.cacheObj = []
    },


    /*返回上一级*/
    _return () {
      let self = this
      setTimeout(function () {
        if (self.requireIndex > 0) {
          self.requireIndex = self.requireIndex - 1
          self.selectCache()
        }
      }, 200)      
    }, 

    /*返回上一级查缓存*/
    selectCache () {
      let self = this
      self.options = JSON.parse(JSON.stringify(self.cacheObj[self.requireIndex]))
    },

    /*boxes 鼠标hover时弹窗显示对应内容*/
    overInfo (ev, index) {
      if (this.able.key != 'boxes') { return }
      ev=ev||event
      let inform = this.$refs.infoPop
      this.popShow = true
      inform.style.left=(ev.clientX + 10)+"px";
      inform.style.top=(ev.clientY + 10)+"px";
      let self = this
      let curHoverId = this.options[index].id
      if (self.curInfoId != curHoverId) {
        self.axios({
          url: self.api_popInfo,
          method: 'GET',
          params: {
            boxes: curHoverId
          }
        }).then((res) => {
          console.log('hover数据弹窗')
          console.log(res)
          self.popInfo = res.data.list
          self.curInfoId = curHoverId
          return
        })
      }
    },

    /*鼠标move*/
    moveInfo (ev, index) {
      if (this.able.key != 'boxes') { return }
      ev=ev||event
      let inform = this.$refs.infoPop
      inform.style.left=(ev.clientX + 10)+"px";
      inform.style.top=(ev.clientY + 10)+"px";
    },

    /*鼠标moveout*/
    outInfo () {
      if (this.able.key != 'boxes') { return }
      let inform = this.$refs.infoPop
      this.popShow = false
    },

    /*显示默认值*/
    showDefVal () {
      let self = this
      /*有字段showDef时*/
      if (this.able.editObj.showDef) {
        this.requireIndex = 0
        let _params = {[this.requireArr[this.requireIndex].paramKey] : this.requireArr[this.requireIndex].paramVal}
        this.getData(_params, function (res) {
            for (let i = 0; i < res.length; i ++) {
              if (res[i].isDefault) { // 条目isDefault为true（如广告管理的客户名称默认为白云机场）
                self.resultIds = JSON.parse(JSON.stringify([res[i].id]))
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

<style lang="scss">

.infoPop {
z-index: 9999;
width:15rem;
font-size: .8rem;
padding: 1rem 1rem .3rem;
/*height:200px;*/
border:1px solid #ddd6b0;
background:#f7f2d6;
color: #333;
display:none;
position:fixed;
border-radius: .2rem;
  &.show {
    display: block;
  }
  dl {
    margin-bottom: .5rem;
    dt {
      font-weight: bold;
    }
    dd {
      position: relative;
      padding-left: 1.2rem;
      &:before {
        content:'';
        position: absolute;
        top: .8rem;
        left: .5rem;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #333;
      }
      span {
        font-size: 10px;
      }
    }
  }
}


</style>