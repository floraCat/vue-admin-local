<template>
  <section class="app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
    <!--头部左边-->
    <div class="left">
      <a class="logo" href="/">
        <img class="myLogo" src="~assets/images/logo.jpg" alt="小享科技" />
        <h1 class="myTitle">旅客自助服务管理平台</h1>
      </a>
    </div>
    <div class="right">
      <!--头部右边下拉切换机场-->
      <div class="selectOpts">
        <select @change="changeTenant($event)" v-if="selectOpts.length > 1">
          <option v-for="(opt,index) in selectOpts" :value="opt.dicDetailCode" v-text="opt.dicDetailName" :data-test="curTenantID" :selected="opt.dicDetailCode === curTenantID"></option>
        </select>
        <p class="curOpt" v-if="selectOpts.length === 1" v-text="loginInfo.tenantName"></p>
      </div>
      <span class="welcome">欢迎<em>{{loginInfo.userName}}</em>登入</span>
      <!--右上角登入登出btn-->
      <span>
        <a @click="logout" class="nav-item">登出</a>
      </span>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  data () {
    return {
      selectOpts: []
    }
  },

  props: {
    show: Boolean
  },

  computed: {
      ...mapGetters({
        pkginfo: 'pkg',
        sidebar: 'sidebar'
      }),
      loginInfo () {
        // console.log("本地xm_cookie：")
        // console.log(Funs.getCookie('xm_cookie'))
        return Funs.getCookie('xm_cookie') ? JSON.parse(Funs.getCookie('xm_cookie')) : {userName: '您'}
      },
      curTenantID () {
        return Funs.getCookie('xm_tenantID')
      },
    },

  mounted () {
    this.tenantOpts()
  },

  methods: {
    ...mapActions([
      'toggleSidebar'
    ]),
    // 登出
    logout () {
      let self = this
      self.Loading.addLoading()
      self.axios({
        url: this.API.HOST + this.API.logout.path + this.API.suf,
        method: this.API.logout.type,
      }).then((res) => {
        self.Loading.delLoading()
        console.log('登出')
        if (res.data.status === '') {
          Funs.delCookie('xm_cookie')
          window.location.href = ''
        }
        if (res.data.status === 'failure') {
          alert(res.data.message)
        }
        if (res.data.status === 'success') {
          console.log(res)
          Funs.delCookie('xm_cookie')
          window.location.href = ''
        }
      })
    },
    // 获取机场列表
    tenantOpts () {
      let self = this
      self.Loading.addLoading()
      self.axios({
        url: this.API.HOST + this.API.switch.path + this.API.suf,
        method: this.API.switch.type,
        data: { dicCode: 'TENANTID' }
      }).then((res) => {
        self.Loading.delLoading()
        console.log('机场选项')
        if (res.data.status === 'user_no_auth') { // 没权限
          self.$router.push({path: '/'})
        }
        if (res.data.status === 'failure') {
          console.log('错误提示：' + res.data.message)
        }
        if (res.data.status === 'success') {
          console.log(res)
          self.selectOpts = res.data.list
        }
      })
    },
    // 机场切换
    changeTenant (ev) {
      let self = this
      let curSelect = ev.target.value 
      let curTenant = Funs.getCookie('xm_tenantID')
      Funs.setCookie('xm_tenantID',curSelect)
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
@import '~assets/style/var.scss';
.app-navbar {
  position: fixed;
  min-width: 100%;
  z-index: 1024;
  height: 3.5rem;
  line-height: 2.1rem;
  padding: .7rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);

  .left {
    float: left;
    padding-left: 1rem;
    .logo {
      overflow: hidden;
      img {
        float: left;
      }
      h1 {
        float: left;
        font-size: 1.4rem;
        color: $zs;
        padding-left: 1rem;
      }
    }
  }

  .right {
    float: right;
    span {
      line-height: 2.1rem;
      margin-right: .5rem;
      color: #777;
      em {
        padding: 0 3px;
        color: $zs;
        font-style: normal;
      }
      a {
        display: inline-block;
        height: 2.1rem;
        line-height: 2.1rem;
        padding:0 10px;
        background: $zs;
        color: #fff;
        border-radius:4px;
      }
    }
  }
}

.selectOpts {
  float: left;
  margin-right: 15px;
  select {
    width: 160px;
    height: 2.1rem;
    line-height: 2.1rem;
    border: #ddd 1px solid;
    border-radius: 5px;
  }
}

.curOpt {
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  margin-top: 2px;
  background: $zs;
  color: #fff;
  border-radius: 3px;
}
</style>
