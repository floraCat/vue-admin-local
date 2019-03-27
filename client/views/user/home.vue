<template>
  <div class="content has-text-centered">
    <div class="indexInfo">
      <div class="sec infoBooth">
        <h3>设备监控</h3>
        <table>
          <tr>
            <th v-for="(ttl1,index1) in boothTtl" v-text="ttl1"></th>
          </tr>
          <tr v-for="obj1 in boothArr">
            <td v-for="(value1,key1) in obj1">{{value1 | checkToTxt(key1)}}</td>
          </tr>
        </table>
      </div>
      <div class="sec infoBooth">
        <h3>广告投放</h3>
        <table>
          <tr>
            <th v-for="(ttl2,index2) in adTtl" v-text="ttl2"></th>
          </tr>
          <tr v-for="obj2 in adArr">
            <td v-for="(value2,key2) in obj2">{{value2 | checkToTxt(key2)}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    // return this.$store.state.pkg
    return {
      boothArr: [],
      boothTtl: [],
      adArr: [],
      adTtl: []
    }
  },
  computed: {},
  mounted: function () { 

    /*是否登录页面以便切换背景色*/
    if (this.$store.state.app.loginPage) {
      this.$store.commit({ type: 'loginPage', loginPage: false})
    }

    this.getBooth()
    this.getAd()
    
  },
  methods: {
    getBooth () {
      let self = this
      self.axios({
        url: this.API.HOST + this.API.monitorlist.path + this.API.suf,
        method: this.API.monitorlist.type,
        params: {
          pageNo: 1,
          pageSize: 5,
          enter: 1
          // createDate: window.Funs.formatDate(new Date())
        }
      }).then((res) => {
        console.log('首页 监控')
        if (res.data.status === '') {
            Funs.delCookie('xm_cookie')
            window.location.href = ''
          }
          if (res.data.status === 'failure') {
            console.log('错误提示：' + res.data.message)
          }
          if (res.data.status === 'success') {
            console.log(res)
            self.boothTtl = ['设备名称','充电亭名称','实际心跳次数','间隔','状态']
            let fieldArr = ['boxName','boothName','heartbeatTimes','interval','boothStatus']
            let data = res.data.page.list
            for (let i = 0; i < data.length; i ++) {
              let _obj = {}
              for (let j = 0; j < fieldArr.length; j ++) {
                for (let x in data[i]) {
                  if (x === fieldArr[j]) {
                    _obj[x] = data[i][x]
                  }
                }
              }
              self.boothArr.push(_obj)
            }
          }
      })
    },
    getAd () {
      let self = this
      self.axios({
        url: this.API.HOST + this.API.ad_on.path + this.API.suf,
        method: this.API.ad_on.type,
        params: {
          pageNo: 1,
          pageSize: 5
        }
      }).then((res) => {
        console.log('首页 广告投放')
        if (res.data.status === '') {
            Funs.delCookie('xm_cookie')
            window.location.href = ''
          }
          if (res.data.status === 'failure') {
            console.log('错误提示：' + res.data.message)
          }
          if (res.data.status === 'success') {
            console.log(res)
            self.adTtl = ['投放广告名称','广告位置','上架时间','下架时间','状态']
            let fieldArr = ['adPlanName','locationName','addedDate','offDate','status']
            let data = res.data.page.list
            for (let i = 0; i < data.length; i ++) {
              let _obj = {}
              for (let j = 0; j < fieldArr.length; j ++) {
                for (let x in data[i]) {
                  if (x === fieldArr[j]) {
                    _obj[x] = data[i][x]
                  }
                }
              }
              self.adArr.push(_obj)
            }
          }
      })
    }
  }
}
</script>

<style lang="scss">
  .infoBooth {
    &.sec {
      margin-top: 3rem;
      h3 {
        font-size: 1.2rem;
        line-height: 3rem;
        text-align: left;
        color: #3a71a3;
        text-indent: .5rem;
      }
      table {
        width: 100%;
        line-height: 2.2rem;
        color: #777;
        font-size: .9rem;
        background: #d7e8f8;
        th {
          border-color: #c1d7ec;
          background: #fff;
          line-height: 2.5rem;
          font-size: 1rem;
          color: #333;
          text-align: center;
        }
        td {
          text-align: center;
          border-bottom: #c1d7ec 1px solid;
        }
      }
    }
  }
</style>
