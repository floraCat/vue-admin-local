<template>
  <form-crud 
    field    = "remote"
    :items   = "items"
    :ables   = "ables"
    :apiObj  = "{
                edit: editApi,
                process: processApi
                }"
    :noObj   = "{
                del : true,
                dels: true
                }"
    :pageObj  = "pageObj"
    @getItems = "getItems"
    @checkStateRemote = "checkStateRemote"
  ></form-crud>
</template>

<script>
  import formCrud from '../form/crud'
  import Field from './list_field'
  export default {

    components: {
      formCrud,
    },

    data () {
      return {
        items: [{loading: true}],
        ables: [],
        pageObj: {},
      }
    },

    computed: {
      listApi () {
        return `${this.API.url}/remote/list${this.API.suf}`
      },
      editApi () {
        return `${this.API.url}/remote/save${this.API.suf}`
      },
      processApi () {
        return `${this.API.url}/remote/process${this.API.suf}`
      },
      dicDetailApi () {
        return `${this.API.url}/dic/getdetail${this.API.suf}`
      }
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
          url: self.listApi,
          method: 'GET',
          params: listObj
        }).then((res) => {
          console.log('角色管理')
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
              list[i].remoteStateBtn = ['on','on']
              self.checkStateRemote(list,i)
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

      /*btn状态判断*/
      checkStateRemote (_list,index) {
        let self = this
        if (_list[index].remoteStatus !== '0') {
          _list[index].remoteStateBtn.splice(0,1,'off')
          _list[index].remoteStateBtn.splice(1,1,'off')         
        }
        if (_list[index].firstResults) {
          _list[index].remoteStateBtn.splice(1,1,'on')   
        }
      },

    }
  }
</script>