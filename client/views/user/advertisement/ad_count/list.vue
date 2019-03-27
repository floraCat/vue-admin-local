<template>
  <form-crud 
    field    = "ad_count" 
    :items   = "items"
    :ables   = "ables"
    :pageObj  = "pageObj"
    :noObj   = "{
    	         add:true,
                del : true,
                dels: true,
                mod:true
                }"
    @getItems = "getItems"
  ></form-crud>
</template>

<script>
  import formCrud from '../../form/crud'
  import Field from './list_field'
  export default {

    components: {
      formCrud
    },

    data () {
      return {
        items: [{loading: true}],
        ables: [],
        pageObj: {}
      }
    },

    computed: {
      // listApi () {
      //   return `${this.API.url}/advertisement/ad_on/list${this.API.suf}`
      // },
      editApi () {
        return `${this.API.url}/advertisement/ad_on/save${this.API.suf}`
      },
      delApi () {
        return `${this.API.url}/advertisement/ad_on/delete${this.API.suf}`
      },
    },

    mounted: function () {
      this.getItems(1)
    },

    methods: {

      getItems (page, pageSize, searchOpt = {}) {
        let self = this
        let listObj = JSON.parse(JSON.stringify(searchOpt))
        listObj.pageNo = page
        listObj.pageSize = pageSize ? pageSize : 15
        self.axios({
          url: this.API.HOST + this.API.ad_on.path + this.API.suf,
          method: this.API.ad_on.type,
          params: listObj
        }).then((res) => {
          console.log('广告统计')
          if (res.data.status === '') {
            Funs.delCookie('xm_cookie')
            window.location.href = ''
          }
          if (res.data.status === 'failure') {
            console.log('错误提示：' + res.data.message)
          }
          if (res.data.status === 'success') {
            console.log(res)
            let list = res.data.page.list
            /*-----格式化数据 start------*/
            for (let i = 0; i < list.length; i ++) {
              if (list[i].status) {
                list[i].status = parseInt(list[i].status)
              }
            }
            /*-----格式化数据 end------*/
            self.items = list
            self.checkField(list)
            self.pageObj = {
              pageNo: page,
              pageSize: res.data.page.pageSize,
              totalCount: res.data.page.totalCount,
              totalPage: res.data.page.totalPage,
            }
          }
        })
      },

      checkField (items) {
        for (var i = 0; i < items.length; i ++) {
          this.$set(items[i], 'checked', false)
        }
        this.ables = Field(this)
      },

      /*广告投放提交后去掉url后的参数*/
      deliveryCallback () {
        let query = this.$route.query
        if (query.addKey && query.addId && query.addTxt) {
          this.$router.push({
              path: '/advertisement/advertisement/list'
          })
        }
      }

    }
  }
</script>