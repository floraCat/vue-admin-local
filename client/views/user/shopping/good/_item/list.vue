<template>
  <form-crud
    field    = "menu" 
    :items   = "items"
    :ables   = "ables"
    :apiObj  = "{
                edit: editApi,
                del : delApi,
                switch:switchApi
                }"
    :pageObj  = "pageObj"
    @getItems = "getItems"
  ></form-crud>
</template>

<script>
  import formCrud from '../../../form/crud'
  import Field from './list_field'
  export default {

    components: {
      formCrud
    },

    data () {
      return {
        items: [{loading: true}],
        ables: [],
        pageObj: {},
        /*所有类目*/
        channels: [],
      }
    },

    computed: {
      listApi () {
        return `${this.API.url}/item/list${this.API.suf}`
      },
      editApi () {
        return `${this.API.url}/item/save${this.API.suf}`
      },
      delApi () {
        return `${this.API.url}/item/delete${this.API.suf}`
      },
      api_dic () {
        return `${this.API.url}/dic/importList${this.API.suf}`
      },
      api_cat_list () {
        return `${this.API.url}/category/list${this.API.suf}`
      },
      switchApi(){
      	return `${this.API.url}/item/update${this.API.suf}`
      }
    },

    mounted: function () {
      let self = this
      this.getData(function(channels) {
        self.getItems(1)
      })
    },

    methods: {

      // 获取字典得到shopping的dicId
      getDic (callback) {
        let self = this
        self.axios({
          url: self.api_dic,
          method: 'GET'
        }).then((res) => {
          console.log('字典列表')
          console.log(res)
          if (callback && 'function' === typeof callback) {
            callback(res.data.list)
          }
        })
      },
      /*获取分类*/
      getData (callback) {
        let self = this
        let dicId
        self.getDic(function (res) {
          for (let x = 0; x < res.length; x ++) {
            if (res[x].dicCode === 'shopping') {
              dicId = res[x].id
            }
          }
          self.axios({
            url: self.api_cat_list,
            method: 'GET',
            params: {
              // dicId: dicId,
              // parentId: 0
            }
          }).then((res) => {
            console.log('商品管理')
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
              self.channels = list
              if (callback && 'function' === typeof callback) {
                callback(self.channels)
              }
            }
              
          })
        })
      },

      /**/
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
          console.log('商品管理')
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
        this.ables = Field(this.channels)
      },

    }
  }
</script>