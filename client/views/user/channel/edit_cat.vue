<template>
  <div class="infoEdit">
    <h3 class="ttlChannel">{{transData.title}}：
    </h3>
    <ul class="myFormCtrl">
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
          :channels = "transData.channels"
          field = "channelName"
          :able="able"
          v-if="able.editObj.formCtrl==='linkSelect'"
        ></form-link-select>
      </li>
      <div class="formCtrl btns">
        <a class="formBtn on" @click="submitHandle()" href="javascript:;">提交</a>
        <a class="formBtn" href="javascript:;" @click="reset()">重置</a>
      </div>
      <div class="validateNote" ref="note"></div>
    </ul>
  </div>
</template>

<script>
import formText from 'components/common/form/text'
import formRadio from 'components/common/form/radio'
import formLinkSelect from 'components/common/form/linkSelect'

export default {
  components: {
    formText,
    formRadio,
    formLinkSelect
  },
  props: [
    'transData'
  ],
  data () {
    return {
      ablesOn: [
        {
          'key'        : 'channelName',
          'label'      : '分类名称',
          'value'      : null,
          'editObj'        : {
            'formCtrl'       : 'text',
            'valid'          : 'notNull',
          }
        },
        {
          'key'        : 'channelCode',
          'label'      : '分类编码',
          'value'      : null,
          'editObj'        : {
            'formCtrl'       : 'text',
          }
        },
        {
          'key'        : 'parentId',
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
      // 默认值，以便重置
      defAbles: null,
    }
  },
  computed: {
    api_submit () {
      return `${this.API.url}/channel/save${this.API.suf}`
    },
  },
  mounted () {
      this.defAbles = JSON.parse(JSON.stringify(this.ablesOn))
      this.$nextTick(function () {
        this.originVal()
      })
  },
  watch: {
    transData (val) {
      this.$nextTick(function () {
        this.originVal()
      })
    }
  },
  methods: {

    /*显示原有值*/
    originVal () {
      let channel = this.transData.channel
      if (channel) {
        for (let i = 0; i < this.ablesOn.length; i ++) {
          this.ablesOn[i].value = channel[this.ablesOn[i].key]
        }
      }else {
        this.ablesOn = JSON.parse(JSON.stringify(this.defAbles))
      }
    },
    /*提交*/
    submitHandle () {
      let self = this
      /*提交验证 start*/
      let doms = document.querySelectorAll('.myFormCtrl [data-valid]')
      for (let i = 0; i < doms.length; i ++) {
        doms[i].classList.remove("error");
        this.$refs.note.classList.remove("show");
        let note = doms[i].getAttribute('data-note')
        let valid_val = doms[i].getAttribute('data-valid')
        // 是否为空或已选
        let firstOpt = doms[i].getAttribute('data-firstOpt')
        if (valid_val === 'notNull' && !doms[i].value || 
            // valid_val === 'number' && !doms[i].value ||
            valid_val === 'selected' && doms[i].value === firstOpt || 
            valid_val === 'selected' && doms[i].value === '') {
          doms[i].classList.add("error");
          this.$refs.note.innerHTML = '请添加' + note
          this.$refs.note.classList.add("show");
          return
        }
        // 是否数字
        if (valid_val === 'number' && isNaN(doms[i].value)){
          doms[i].classList.add("error");
          this.$refs.note.innerHTML = '" ' + note + ' "' + '不是数字，请填写数字'
          this.$refs.note.classList.add("show");
          return
        }
        // 是否ip
        let regexp = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-5][0-5])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/;
        if (valid_val === 'ip' && !regexp.test(doms[i].value)){
          doms[i].classList.add("error");
          this.$refs.note.innerHTML = '" ' + note + ' "' + '格式不正确，请重新填写'
          this.$refs.note.classList.add("show");
          return
        }
      }
      /*提交验证 end*/
      let submitData = {}
      for (let i = 0; i < this.ablesOn.length; i ++) {
        submitData[this.ablesOn[i].key] = this.ablesOn[i].value
      }  
      let noteTxt = '分类添加成功'
      let channel = this.transData.channel
      if (channel) {
        // 修改需提交id
        submitData['id'] = channel.id
        noteTxt = '分类修改成功'
      }
      // console.log('submitHandle')
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
          self.$emit('notePop',noteTxt)
        }
      })
    },

    /*重置*/
    reset () {
      this.ablesOn = JSON.parse(JSON.stringify(this.defAbles))
    }

  }
}
</script>

<style lang="scss">
@import '~assets/style/var.scss';
.infoEdit {
  .btns {
    padding-left: 8rem;
  }
}
.myFormCtrl {
  position: relative;
  padding: 3rem 3.5rem 5rem 1.5rem;
  background: #fff;
  border: #ddd 1px solid;
  margin: 0 auto;
  border-radius: .4rem;
  li {
    overflow: hidden;
    margin-bottom: 1rem;
    line-height: 2.6rem;
    .label {
      float: left;
      width: 7.5rem;
      text-align: right;
    }
    .ctrl {
      padding-left: 8rem;
      height: 2.6rem;
      input {
        height: 2.6rem;
        line-height: 2.6rem;
        padding: 0 .5rem;
        border: #c1d7ec 1px solid;
        border-radius: .3rem;
      }
      &.radio {
        padding-top: .5rem;
        .set {
          float: left;
          overflow: hidden;
          margin-right: 2rem;
          padding-left: 1rem;
          p {
            float: left;
            position: relative;
            width: 1.5rem;
            height: 1.5rem;
            margin: 0 .5rem 0 0;
            input {
              width: 100%;
              height: 100%;
              border-radius: .4rem;
            }
          }
          label {
            float: left;
            line-height:1.5rem;
          }
          &.on {
            input {
              background: $zs;
              border: none;
            }
            i {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              font-size: 1rem;
              text-align: center;
              line-height: 1.5rem;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
.validateNote {
  display: none;
}
</style>