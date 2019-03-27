<template>
  <form-crud 
    id       = "detaillist"
    field    = "detaillist" 
    specHandle = "export"
    :items   = "items"
    :ables   = "ables"
    :apiObj  = "{
                edit: editApi,
                del : delApi,
                }"
    :noObj   = "{
                del : true,
                dels: true
                }"
    :pageObj  = "pageObj"
    @getItems = "getItems"
  ></form-crud>
</template>

<style lang="scss">
#detaillist {
  .mPagination .switch {
    display: none;
  }
}
</style>

<script>
  import formCrud from '../form/crud'
  import Field from './detaillist_field'
  export default {

    components: {
      formCrud,
    },

    data () {
      return {
        items: [{loading: true}],
        ables: [],
        pageObj: {},
        checkedData: null
      }
    },

    computed: {
      listApi () {
        return `${this.API.url}/dic/detaillist${this.API.suf}`
      },
      editApi () {
        return `${this.API.url}/dic/detailsave${this.API.suf}`
      },
      delApi () {
        return `${this.API.url}/dic/detaildelete${this.API.suf}`
      },
      parentsApi () {
        return `${this.API.url}/dic/getdetailbykey${this.API.suf}`
      },
      dicCode () {
        return this.$route.query.dicCode
      }
    },

    mounted: function () {
      this.getItems(1)
    },

    methods: {

      // importList (_data) {
      //   let self = this
      //   let data = {
      //     add: [],
      //     update: []
      //   }
      //   let rs = JSON.parse(JSON.stringify(this.items))
      //   for (let i = 0; i < _data.length; i ++) {
      //     let flag = 0
      //     for (let j = 0; j < this.items.length; j ++) {
      //       if (_data[i].dicDetailCode === this.items[j].dicDetailCode) {
      //         flag = 1
      //         data.update.push(_data[i])
      //         rs.splice(i,_data[i])
      //       }
      //     }
      //     if (!flag) {
      //       data.add.push(_data[i])
      //       rs.push(_data[i])
      //     }
      //   }
      //   this.items = rs
      //   console.log('this.items')
      //   console.log(this.items)
      // },  

      // importToDB () {
      //   this.checkedData = JSON.parse(JSON.stringify(this.items))
      //   let submitData = {
      //     disCode: 'TENANTID',
      //       list: data
      //   }
      //   console.log('submitData')
      //   console.log(submitData)
      //   return
      //   self.axios({
      //     url: 'http://192.168.10.210:8080/dic/importexcel',
      //     method: 'POST',
      //     params: submitData
      //   }).then((res) => {
      //     console.log('importList')
      //     console.log(res)
      //   })
      // },

      getItems (page, pageSize, searchOpt = {},callback) {
        let self = this
        let listObj = JSON.parse(JSON.stringify(searchOpt))
        listObj.pageNo = page
        listObj.pageSize = pageSize ? pageSize : 15
        listObj.dicId = this.$route.query.dicId
        self.axios({
          url: self.listApi,
          method: 'GET',
          params: listObj
        }).then((res) => {
          console.log('字典详情管理')
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
            }
            /*-----格式化数据 end------*/
            self.items = list
            // self.selectOpts_parentTxt(function (opts) {
              self.checkField(list)
            // })
            self.pageObj = {
              pageNo: page,
              pageSize: res.data.page.pageSize,
              totalCount: res.data.page.totalCount,
              totalPage: res.data.page.totalPage,
            }
            if (callback && 'function' === typeof callback) {
              callback(self.items)
            }
          }
        })
      },

      checkField (items, opts) {
        for (var i = 0; i < items.length; i ++) {
          this.$set(items[i], 'checked', false)
        }
        this.ables = Field(this, opts)
      },
    }
  }
</script>