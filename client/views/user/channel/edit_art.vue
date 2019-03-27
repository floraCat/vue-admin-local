<template>
  <div class="editArticle">
    <h3 class="ttlChannel">{{transData.title}}：</h3>
    <li v-for="(able,index) in ablesOn">
      <form-text 
          :able="able"
          v-if="able.editObj.formCtrl==='text'"
      ></form-text>
      <form-radio 
        :able="able"
        v-if="able.editObj.formCtrl==='radio'"
      ></form-radio>
      <form-link-select
        :channels = "channels"
        :able="able"
        field = "channelName"
        v-if="able.editObj.formCtrl==='linkSelect'"
      ></form-link-select>
    </li>
    <!-- <UE :transData = "htmlData"></UE> -->
    <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue" v-model="htmlForEditor"></UE>
    <div class="formCtrl btns">
      <a class="formBtn on" @click="submitHandle()" href="javascript:;">提交</a>
      <a class="formBtn" href="javascript:;" @click="reset()">重置</a>
    </div>
    <div class="validateNote" ref="note"></div>
  </div>
</template>

<script>
import formText from 'components/common/form/text'
import formRadio from 'components/common/form/radio'
import formLinkSelect from 'components/common/form/linkSelect'
// import UE from './ueditor';
import UE from 'components/common/form/ue'
  export default {
    components: {
      UE,
      formText,
      formRadio,
      formLinkSelect
    },
    props: [
      'channels',
      'transData'
    ],
    data() {
      return {
        // 字段属性
        ablesOn: [
          {
            'key'        : 'channelName',
            'label'      : '文章标题',
            'value'      : null,
            'editObj'        : {
              'formCtrl'       : 'text',
              'valid'          : 'notNull',
            }
          },
          {
            'key'        : 'channelId',
            'label'      : '所属父级',
            'value'      : 0,
            'editObj'        : {
              'formCtrl'       : 'linkSelect',
              'valid'          : 'notNull',
            }
          },
          {
            'key'        : 'orderBy',
            'label'      : '排序',
            'value'      : null,
            'editObj'        : {
              'formCtrl'       : 'text',
              'valid'          : 'number',
            }
          },
          {
            'key'        : 'idDefault',
            'label'      : '是否默认',
            'value'      : 0,
            'editObj'        : {
              'formCtrl'       : 'radio',
            }
          },
          {
            'key'        : 'status',
            'label'      : '状态',
            'value'      : 1,
            'editObj'        : {
              'formCtrl'       : 'radio',
            }
          },
        ],
        // 保存默认值以便重置
        defAbles: null,
        // 正文
        // htmlData: {
        //   content: ''
        // }
        defaultMsg: '',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        ue1: "ue1", // 不同编辑器必须不同的id
        htmlForEditor: ''
      }
    },

    computed: {
      api_submit () {
        return `${this.API.url}/information/save${this.API.suf}`
      },
      infosId () {
        return this.transData.infos && this.transData.infos.id || null
      }
    },

    watch: {
      infosId (val) {
        this.defVal(val)
      }
    },

    mounted () {
      this.$nextTick(function () {
        this.defVal(this.infosId)
      })
      this.defAbles = JSON.parse(JSON.stringify(this.ablesOn))
    },

    methods: {

      /*提交*/
      submitHandle () {
        let self = this
        /*提交验证 start*/
        // let doms = document.querySelectorAll('.editArticle [data-valid]')
        // for (let i = 0; i < doms.length; i ++) {
        //   doms[i].classList.remove("error");
        //   this.$refs.note.classList.remove("show");
        //   let note = doms[i].getAttribute('data-note')
        //   let valid_val = doms[i].getAttribute('data-valid')
        //   // 是否为空或已选
        //   let firstOpt = doms[i].getAttribute('data-firstOpt')
        //   if (valid_val === 'notNull' && !doms[i].value || 
        //       // valid_val === 'number' && !doms[i].value ||
        //       valid_val === 'selected' && doms[i].value === firstOpt || 
        //       valid_val === 'selected' && doms[i].value === '') {
        //     doms[i].classList.add("error");
        //     this.$refs.note.innerHTML = '请添加' + note
        //     this.$refs.note.classList.add("show");
        //     return
        //   }
        //   // 是否数字
        //   if (valid_val === 'number' && isNaN(doms[i].value)){
        //     doms[i].classList.add("error");
        //     this.$refs.note.innerHTML = '" ' + note + ' "' + '不是数字，请填写数字'
        //     this.$refs.note.classList.add("show");
        //     return
        //   }
        //   // 是否ip
        //   let regexp = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/;
        //   if (valid_val === 'ip' && !regexp.test(doms[i].value)){
        //     doms[i].classList.add("error");
        //     this.$refs.note.innerHTML = '" ' + note + ' "' + '格式不正确，请重新填写'
        //     this.$refs.note.classList.add("show");
        //     return
        //   }
        // }
        /*提交验证 end*/
        let submitData = {}
        for (let i = 0; i < this.ablesOn.length; i ++) {
          submitData[this.ablesOn[i].key] = this.ablesOn[i].value
        } 
        submitData["content"] = this.$refs.ue.getUEContent()
        let noteTxt = '文章添加成功'
        if (self.infosId) {
          submitData["id"] = self.infosId
          noteTxt = '文章修改成功'
        }
        // console.log('result')
        // console.log(submitData)
        // return
        self.axios({
          url: self.api_submit,
          method: 'POST',
          data: submitData
        }).then((res) => {
          console.log('提交分类返回')
          if (res.data.status === '') {
            Funs.delCookie('xm_cookie')
            window.location.href = ''
          }
          if (res.data.status === 'failure') {
            console.log('错误提示：' + res.data.message)
          }
          if (res.data.status === 'success') {
            console.log(res)
            self.$emit('notePop', noteTxt)
          }
        })
      },
      /*默认值设置*/
      defVal (watchKey) {
        if (watchKey) {
          for (let i = 0; i < this.ablesOn.length; i ++) {
            this.ablesOn[i].value = this.transData.infos[this.ablesOn[i].key]
          }
          this.defaultMsg = this.transData.infos.content
        } else {
          this.ablesOn = JSON.parse(JSON.stringify(this.defAbles))
          this.defaultMsg = ''
        }
      },
      /*重置*/
      reset () {
        this.ablesOn = JSON.parse(JSON.stringify(this.defAbles))
      }
    }
  };

</script>

<style lang="scss">
.editArticle {
  width: 100%;
  float: left;
  li {
    margin-bottom: 1rem;
  }
  ._ctrls {
    margin-bottom: 1rem;
  }
}
</style>