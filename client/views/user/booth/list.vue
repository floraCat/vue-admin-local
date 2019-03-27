<template>
  <form-crud 
    field    = "booth" 
    :items   = "items"
    :ables   = "ables"
    :apiObj  = "{
                edit: editApi,
                del : delApi,
                }"
    :pageObj  = "pageObj"
    @getItems = "getItems"
  ></form-crud>
</template>

<script>
  import formCrud from '../form/crud'
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
      // fieldApi () {
      //   return `${this.API.url}/booth/list_field${this.API.suf}`
      // },
      editApi () {
        return `${this.API.url}/booth/save${this.API.suf}`
      },
      delApi () {
        return `${this.API.url}/booth/delete${this.API.suf}`
      },
      // dicDetailApi () {
      //   return `${this.API.url}/dic/getdetail${this.API.suf}`
      // },
      // parentsApi () {
      //   return `${this.API.url}/dic/getdetailbykey2${this.API.suf}`
      // },
      // other_editApi () {
      //   return `${this.API.url}/dic/detailsave${this.API.suf}`
      // }
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
          url: this.API.HOST + this.API.booth.path + this.API.suf,
          method: this.API.booth.type,
          params: listObj
        }).then((res) => {
          console.log('充电亭管理')
          console.log(res)
          if (res.data.status === '') {
            Funs.delCookie('xm_cookie')
            window.location.href = ''
          }
          if (res.data.status === 'failure') {
            console.log('错误提示：' + res.data.message)
          }
          if (res.data.status === 'success') {
            let list = res.data.page.list
            /*-----格式化数据 start------*/
            for (let i = 0; i < list.length; i ++) {
              if (list[i].status) {
                list[i].status = parseInt(list[i].status)
              }
              if (list[i].parentId) {
                for (var j = 0; j < list.length; j ++) {
                  if (list[i].parentId === list[j].id) {
                    list[i].parentTxt = list[j].menuName
                  }
                }
              }
              else {
                list[i].parentTxt = null
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

    }
  }
</script>