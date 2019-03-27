<template>
  <div class="setPassword">
      <div class="block">
        <li v-for="(item,index) in curItemOn" :data-json="JSON.stringify(item)">
          <form-text 
            :able="item"
            v-if="item.editObj.formCtrl==='text'"
          ></form-text>
          <form-password 
            :able="item"
            v-if="item.editObj.formCtrl==='password'"
          ></form-password>
        </li>
        <p class="formCtrl btns">
          <a class="formBtn on" @click="submit()">提交</a>
          <a class="formBtn" @click="cancel()">重置</a>
        </p>
        <div class="validateNote" ref="note" v-show="noteShow"></div>
      </div>
    <modal-del 
      v-if="modalDel_show" 
      :visible="modalDel_show" 
      :transData="modalDel_items" 
      @close="closeModalDel" 
    ></modal-del>

  </div>
</template>

<script>
  // import { CardModal } from 'vue-bulma-modal'
  import formText from '../../components/common/form/text'
  import formPassword from '../../components/common/form/password'
  import conformModal from '../../components/common/conform'

export default {
  components: {
    // CardModal,
    formText,
    formPassword,
    modalDel: conformModal,
  },

  data () {
    return {
      noteShow: false,
      curItem: {
        userName: {
          label:'用户名',
          value:'',
          editObj: {
            formCtrl: 'text',
            valid: 'notNull',
            modReadOnly: true,
          }
        },
        password: {
          label:'旧密码',
          editObj: {
            formCtrl: 'password',
            valid: 'notNull',
          }
        },
        newPassword: {
          label:'新密码',
          editObj: {
            formCtrl: 'password',
            valid: 'notNull',
          }
        }
      },
      curItemOn: {},
      modalDel_items: {},
      modalDel_show: false,
    }
  },

  computed: {
    api () {
      return `${this.API.url}/user/set_password${this.API.suf}`
    }
  },

  mounted () {
    this.curItem.userName.value = JSON.parse(Funs.getCookie('xm_cookie')).userName
    this.curItemOn = JSON.parse(JSON.stringify(this.curItem))
    console.log('this.curItemOn')
    console.log(this.curItemOn)
  },

  methods: {

    cancel () {
      this.curItemOn = JSON.parse(JSON.stringify(this.curItem))
    },

    submit () {
      let self = this
      let docs = document.querySelectorAll("[data-valid]")
      for(let i = 0; i < docs.length; i ++) {
        if (!docs[i].value) {
          let note = docs[i].getAttribute('data-note')
          docs[i].style.borderColor = '#3a71a3'
          this.$refs.note.innerHTML = '请输入' + note
          this.$refs.note.style.display = 'block'
          return
        }
      }
      let submitData = {
        password: self.curItemOn.password.value,
        newPassword: self.curItemOn.newPassword.value,
      }
      self.axios({
        url: self.api,
        method: 'POST',
        data: submitData,
      }).then((res) => {
        console.log('编辑提交')
        if (res.data.status === '') {
          Funs.delCookie('xm_cookie')
          window.location.href = ''
        }
        if (res.data.status === 'failure') {
          self.failNote(res.data.message)
        }
        if (res.data.status === 'success') {
          console.log(res)
          let data = res.data.result
          self.failNote(res.data.message)
          localStorage.removeItem('xm_loginInfo')
          Funs.delCookie('xm_cookie')
        }
      })
      return false
    },

    failNote (msg) {
      let self = this
      this.modalDel_items = {
        action: 'note',
        txt: msg,
        noSubmit: true
      }
      setTimeout(function() {
        self.modalDel_show = true
      },500)
    },

    closeModalDel () {
      window.location.reload()
    }
  },

}

</script>

<style lang="scss">
.setPassword {
  position: relative;
  width: 96%;
  padding: 2rem 3.5rem 3rem 1.5rem;
  max-width: 500px;
  margin: 5rem auto 0;
  border: #c1d7ec 1px solid;
  border-radius: .4rem;
  .btns {
    padding-left: 7.8rem;
  }
  .block {
    li {
      margin-bottom: 15px;
    }
  }
}
</style>