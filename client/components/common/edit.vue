<!-- 编辑弹窗 -->
<template>
  <div class="modal animated">
    <div class="bg"></div> 
    <div class="main">
      <header class="head">
        <p class="title">
        {{transData.action | ttlTxt}}
        <span>{{transData.name}}</span>
        </p> 
        <button class="delete" @click="close"></button>
      </header> 
      <section class="body">
          <article class="box" :id="editIndex">

            <!--各控件-->
            <li v-for="(able,index) in ablesOn" 
              :class="[
              {hidden: able.editObj.formCtrl==='hidden'},
              {bg6: able.editObj.formCtrl==='pageSelect'},
              {bg6: able.editObj.formCtrl==='pageSelect2'},
              {bg6: able.editObj.formCtrl==='listSelect'},
              {bg8: able.editObj.formCtrl==='linkSelect'}
              ]"
            >
              <form-text 
                :able="able"
                :action="transData.action" 
                v-if="able.editObj.formCtrl==='text'"
              ></form-text>
              <form-hidden 
                :able="able"
                :action="transData.action"  
                v-if="able.editObj.formCtrl==='hidden'"
              ></form-hidden>
              <form-radio 
                :able="able"
                :action="transData.action"  
                v-if="able.editObj.formCtrl==='radio'"
              ></form-radio>
              <form-select 
                :able="able"
                :action="transData.action"  
                v-if="able.editObj.formCtrl==='select'"
              ></form-select>
              <form-list-select 
                :able="able"
                :action="transData.action" 
                @addNewItem = 'addNewItem'
                @alert = 'alert'
                v-if="able.editObj.formCtrl==='listSelect'"
              ></form-list-select>
              <form-page-select 
                :able="able"
                :action="transData.action" 
                @addNewItem = 'addNewItem'
                @alert = 'alert'
                v-if="able.editObj.formCtrl==='pageSelect'"
              ></form-page-select>
              <form-page-select2 
                :able="able"
                :action="transData.action" 
                @addNewItem = 'addNewItem'
                @alert = 'alert'
                v-if="able.editObj.formCtrl==='pageSelect2'"
              ></form-page-select2>
              <form-link-select
                :able="able"
                :field="able.editObj.field"
                v-if="able.editObj.formCtrl==='linkSelect'"
              ></form-link-select>
              <form-textarea 
                :able="able"
                :action="transData.action"  
                v-if="able.editObj.formCtrl==='textarea'"
              ></form-textarea>
              <form-file 
                :able="able"
                :ables="ablesOn"
                :action="transData.action"  
                @alert = 'alert'
                v-if="able.editObj.formCtrl==='file'"
              ></form-file>
              <form-picker 
                :able="able"
                :action="transData.action"  
                v-if="able.editObj.formCtrl==='picker'"
              ></form-picker>

              <spec-page-select
                :able="able"
                :action="transData.action" 
                @alert = 'alert'
                v-if="able.editObj.formCtrl==='pageSelectCustom'"
              ></spec-page-select>

            </li>

            <!--编辑器组件-->
            <!-- <li v-for="(able,index) in ablesOn">
              <UE 
                :able="able"
                :action="transData.action" 
                v-if="able.editObj.formCtrl==='editor'"
                :defaultMsg=defaultMsg 
                :config=config 
                :id=ue1 ref="ue" 
                v-model="htmlForEditor"
              ></UE>
            </li> -->

            <div class="formCtrl btns" v-show="!transData.noSubmit">
              <p class="p">
                <a class="formBtn on" @click="submit()">提交</a>
                <a class="formBtn" @click="reset()">重置</a>
              </p>
            </div>

            <!--验证错误提示-->
            <div class="validateNote" v-show="noteShow" v-text="noteTxt"></div>

        </article>
      </section> 
    </div>
  </div>
</template>

<script>
const formText    = resolve => require(['./form/text'], resolve);
const formHidden    = resolve => require(['./form/hidden'], resolve);
const formRadio    = resolve => require(['./form/radio'], resolve);
const formListSelect    = resolve => require(['./form/listSelect'], resolve);
const formPageSelect    = resolve => require(['./form/pageSelect'], resolve);
const formPageSelect2    = resolve => require(['./form/pageSelect2'], resolve);
const formLinkSelect    = resolve => require(['./form/linkSelect'], resolve);
const formSelect    = resolve => require(['./form/select'], resolve);
const formTextarea    = resolve => require(['./form/textarea'], resolve);
const formFile    = resolve => require(['./form/file'], resolve);
const formPicker    = resolve => require(['./form/picker'], resolve);
const specPageSelect    = resolve => require(['../special/selectPageCustom'], resolve);
const UE    = resolve => require(['./form/ue'], resolve);

export default {
  components: {
    formText,
    formHidden,
    formRadio,
    formSelect,
    formListSelect,
    formPageSelect,
    formPageSelect2,
    formLinkSelect,
    formTextarea,
    formFile,
    formPicker,
    specPageSelect,
    UE
  },

  data () {
    return {
      ablesOn: {},
      // 验证提示
      noteShow: false,
      noteTxt: '',
      // // 編輯器組件
      // defaultMsg: '',
      // config: {
      //   initialFrameWidth: null,
      //   initialFrameHeight: 350
      // },
      // ue1: "ue1", // 不同编辑器必须不同的id
      // htmlForEditor: ''
    }
  },

  props: {
    transData: Object,
    editIndex: String, // 編輯彈窗index（添加上級條目時内嵌編輯彈窗）
  },

  computed: {},

  mounted () {
    console.log('edit.vue --- transData')
    console.log(this.transData)

    let self = this
    this.$nextTick(function () {
      this.ablesOn = JSON.parse(JSON.stringify(this.transData.ables))
    })

    document.body.appendChild(this.$el) //便于fixed定位

  },

  methods: {

    addNewItem (apis) {
      this.$emit('addNewItem', apis)
    },

    close () {
      this.$emit('close')
    },

    reset () {
      this.ablesOn = JSON.parse(JSON.stringify(this.transData.ables))
    },

    // 数据格式
    formatHandle (_able) {
      let _rs = null
      if (_able.value === "" || _able.value ==null) {
        _rs = _able.value
      }
      if (_able.key === 'addedDate' || _able.key === 'offDate' || _able.key === 'endDate') { // 此些字段提交时间戳
        if (_able.value && new Date(_able.value).toString().indexOf('GMT') > -1) {
          _rs = new Date(_able.value).getTime()
        } else { _rs = _able.value }
      } else {
        if (_able.editObj.type === 'number' || _able.editObj.type === 'number2') {
          _rs = parseFloat(_able.value) // 是数字的提交int
        } else {
          _rs = _able.value
        }
      }
      return _rs
    },

    // 提交执行
    submit () {
      let self = this

      /*提交验证 start*/
      let _doms = document.querySelectorAll('#' + this.editIndex + " [data-forCheck]")
      for (let i = 0; i < _doms.length; i ++) {
        _doms[i].classList.remove("error");
        this.noteShow = false
        let note = _doms[i].getAttribute('data-note')
        let valid_val = _doms[i].getAttribute('data-valid')
        let type_val = _doms[i].getAttribute('data-type')
        // 是否为空或已选
        let firstOpt = _doms[i].getAttribute('data-firstOpt')
        if (valid_val === 'notNull' && !_doms[i].value ||
            // valid_val === 'number' && !_doms[i].value || 
            valid_val === 'selected' && _doms[i].value === firstOpt || 
            valid_val === 'selected' && _doms[i].value === '') {
          _doms[i].classList.add("error");
          this.noteTxt = '请添加' + note
          this.noteShow = true
          return
        }
        // 是否数字
        if (type_val === 'number' && isNaN(_doms[i].value)){
          _doms[i].classList.add("error");
          this.noteTxt = '" ' + note + ' "' + '不是数字，请填写数字'
          this.noteShow = true
          return
        }
        // <=0或不是数字报错
        if (type_val === 'number2'){
          _doms[i].classList.add("error");
          if (_doms[i].value <= 0) {
            this.noteTxt = '" ' + note + ' "' + '值不能小于等于0'
            this.noteShow = true
            return
          }
          if (isNaN(_doms[i].value)) {
            this.noteTxt = '" ' + note + ' "' + '不是数字，请填写数字'
            this.noteShow = true
            return
          }
        }
        // 是否ip
        let regexp = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/;
        if (type_val === 'ip' && _doms[i].value && !regexp.test(_doms[i].value)){
          _doms[i].classList.add("error");
          this.noteTxt = '" ' + note + ' "' + '格式不正确，请重新填写'
          this.noteShow = true
          return
        }
        // 手机号验证
        let reg_phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (type_val === 'phone' && _doms[i].value && !reg_phone.test(_doms[i].value)) {
          _doms[i].classList.add("error");
          this.noteTxt = '" ' + note + ' "' + '格式不正确，请重新填写'
          this.noteShow = true
          return
        }
      }
      /*提交验证 end*/

      let obj = {}
      for (let i = 0; i < this.ablesOn.length; i ++) {
        let _able = this.ablesOn[i]
        obj[_able.key] = self.formatHandle(_able)
        if (window.addGoodsType) { // 商品管理的添加规格
          if (_able.key === 'goodsType') {
            if (!_able.value) {
              this.noteTxt = '请添加规格'
              this.noteShow = true
              return
            }
          }
        }
      }   

      /*----提交值处理 start----*/
      if (this.transData.id) {
        obj.id = this.transData.id
      }
      if (this.transData.dicId) {
        obj.dicId = parseInt(this.transData.dicId)
      }
      // if (this.transData.deliveryManagerId) { // ？？？
      //   obj.deliveryManagerId = parseInt(this.transData.deliveryManagerId) 
      // }
      console.log('obj5666666')
      console.log(obj)
      return false
      if (this.transData.specHandle === 'import') { // 导入Excel的不需请求服务器
        obj.selected = self.transData.others.selected
        self.$emit('close', self.transData.index, obj, self.editIndex)
        return
      }
      // if (self.$route.query.version) { // ？？？
      //   obj.version = self.$route.query.version
      // }
      /*----提交值处理 end----*/

      self.axios({
        url: self.transData.api,
        method: 'POST',
        data: obj,
      }).then((res) => {
        console.log('编辑提交')
        if (res.data.status === '') {
          Funs.delCookie('xm_cookie')
          window.location.href = ''
        }
        if (res.data.status === 'failure') {
          self.alert(res.data.message)
          setTimeout(function () {
            self.close()
          }, 0)
        }
        if (res.data.status === 'success') {
          console.log(res)
          window.addGoodsType = false // 商品管理的添加规格
          let _data = res.data.result
          /*-----格式化数据 start------*/
          for (let i in _data) {
            if (_data.status) {
              _data.status = parseInt(_data.status)
            }
          }
          // 导出的勾选状态
          _data.selected = (self.transData.others && self.transData.others.selected) || false
          /*-----格式化数据 end------*/
          self.$emit('close', self.transData.index, _data, self.editIndex)
        }
      })
    },

    // 失败提示
    alert (msg) {
      this.$emit('alert', 1, msg)
    }

  },

}
</script>

<style lang="scss" scope>
.error {
  background: #d7e8f8;
  border-color: #c1d7ec;
}
.show {
  display: block!important;
}
.modal .bg6 {
  background: #eee;
  padding: 6px 10px 0 0;
}
.modal .bg8 {
  background: #f0ede2;
  padding: 10px 0;
}
      
</style>