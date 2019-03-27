<template>
<div class="myLogin">
  <h1 class="ttl">登录</h1>
      <div class="box">
        <form>
          <div class="formCtrl">
            <label class="label">账号</label>
            <p class="p">
              <input v-model="data.enter.userName" class="input" type="text" placeholder="请输入邮箱或电话" @keyup.enter="login()">
            </p>
          </div>
          <div class="formCtrl">
            <label class="label">密码</label>
            <p class="p">
              <input v-model="data.enter.password" class="input" type="password" placeholder="请输入密码" @keyup.enter="login()">
            </p>
          </div>
          <div class="formCtrl btmLine">
            <p class="p">
              <label class="checkbox">
                <a href="javascript:;" class="_check" :class="{_checked:data.rememberMe}" @click="check()"><i class="fa fa-check"></i></a>
                记住我
              </label>
            </p>
          </div>
          <p class="note" v-show="showNote" ref="showNote"></p>
          <div class="btns">
            <div class="formBtn on" @click="login()">提交</div>
            <div class="formBtn" @click="cancel()">重置</div>
          </div>
        </form>
      </div>
</div>
</template>

<script>
export default {

  data () {
    return {
      data: {
        enter: {
          userName: null,
          password: null
        },
        rememberMe: false
      },
      showNote: false,
    }
  },
  mounted () {
    if (Funs.getCookie('xm_cookie')) {
      this.$router.push({path:'/'})
    }
    if (!this.$store.state.app.loginPage) {
      this.$store.commit({ type: 'loginPage', loginPage: true})
      let winHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.$nextTick(function () {
        document.getElementsByClassName('xmLogin')[0].style.height = winHeight + 'px'
      })
    }
    let self = this
    if (localStorage.xm_loginInfo) {
      let user = JSON.parse(localStorage.xm_loginInfo)
      this.data.enter.userName = user.userName
      // this.data.enter.password = user.password
      this.data.rememberMe = true
    }    
  },
  methods: {
    login () {
      if (!this.data.enter.userName) {
        this.$refs.showNote.innerText = "用户名不能为空"
        this.showNote = true
        return
      }
      if (!this.data.enter.password) {
        this.$refs.showNote.innerText = "密码不能为空"
        this.showNote = true
        return
      }
      let self = this
      let submitData = {
        userName : self.data.enter.userName,
        password: self.data.enter.password
      }
      self.Loading.addLoading()
      self.axios({
        url: this.API.HOST + this.API.login.path + this.API.suf,
        method: this.API.login.type,
        data: submitData
      }).then((res) => {
        self.Loading.delLoading()
        console.log('登录')
        if (res.data.status === 'failure') {
          self.$refs.showNote.innerText = res.data.message
          self.showNote = true
        }
        if (res.data.status === 'success') {
          if (self.data.rememberMe) {
            localStorage.setItem('xm_loginInfo',JSON.stringify(res.data.user))
          }
          else {
            if (localStorage.xm_loginInfo) {
              localStorage.removeItem('xm_loginInfo')
            }
          }
          Funs.setCookie('xm_cookie',JSON.stringify(res.data.user))
          Funs.setCookie('xm_tenantID', res.data.user.tenantId)
          window.location.reload();
        }
      })
    },

    check () {
      this.data.rememberMe = !this.data.rememberMe
      if (this.data.rememberMe) {}
    },

    cancel () {
      this.data.enter.userName = ''
      this.data.enter.password = ''
      this.data.rememberMe = false
      this.showNote = false
    },
    
  }

}
</script>

<style lang="scss">
@import '~assets/style/var.scss';
.myLogin {
  padding-top: 2rem;
  h1 {
    font-size: 2rem;
    line-height: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .formCtrl {
    margin-bottom: 1rem;
  }
  .btmLine {
    border-bottom: $zLine 1px solid;
    padding-bottom: 1.5rem;
  }
  .note {
    margin-bottom: 1rem;
    color: $zs;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    background: $zBg;
  }
  .box {
    width: 96%;
    padding: 3rem 3rem 2.5rem;
    max-width: 430px;
    background: #fff;
    margin: 0 auto;
    border: #ddd 1px solid;
    border-radius: .4rem;
  }
  ._check {
    left: 0;
    margin-left: 0;
  }
  .btns {
    overflow: hidden;
    margin-top: 2rem;
    padding: 0 0 0 7.8rem;
  }
}
</style>
