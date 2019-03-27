<template>
  <form-crud 
    field    = "monitorlist" 
    specHandle = "refresh,monitor"
    :items   = "items"
    :ables   = "ables"
    :apiObj  = "{
                edit: editApi,
                del : delApi,
                }"
    :noObj   = "{
                add : true,
                mod : true,
                del : true,
                dels: true
                }"
    :pageObj  = "pageObj"
    @getItems = "getItems"
    @refresh = "refresh"
  ></form-crud>
</template>

<script>
  import formCrud from '../form/crud'
  import Field from './monitorlist_field'
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
      listApi () {
        return `${this.API.url}/booth/monitorlist${this.API.suf}`
      },
      editApi () {
        return `${this.API.url}/booth/save${this.API.suf}`
      },
      delApi () {
        return `${this.API.url}/booth/delete${this.API.suf}`
      },
    },

    mounted: function () {
      // this.getItems(1, null, {createDate: this.curDate().val}, 1)
      this.getItems(1, null, {}, 1)
    },

    methods: {

      getItems (pageNo, pageSize, searchOpt = {}, enter) {
        let self = this
        let listObj = JSON.parse(JSON.stringify(searchOpt))
        if (listObj.createDate === 'all') {
          listObj.createDate = null
        }
        listObj.pageNo = pageNo
        listObj.pageSize = pageSize ? pageSize : 15
        if (enter && 'function' != typeof enter) { // 搜索传enter=1方便后台缓存数据，区分与分页请求
          listObj.enter = 1
        }
        self.axios({
          url: this.API.HOST + this.API.monitorlist.path + this.API.suf,
          method: this.API.monitorlist.type,
          params: listObj
        }).then((res) => {
          console.log('充电亭监控')
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
            self.checkField(list)
            self.pageObj = {
              pageNo: pageNo,
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

      // 日期搜索选项
      optsDate () {
        var myDate = new Date();
        myDate.setDate(myDate.getDate() - 6);
        var dateArray = []; 
        var dateTemp; 
        var flag = 1; 
        for (var i = 0; i < 7; i++) {
          dateTemp = myDate.getFullYear() + "-" + (myDate.getMonth()+1)+"-"+myDate.getDate();
          dateArray.push({txt:dateTemp, val:dateTemp});
          myDate.setDate(myDate.getDate() + flag);
        }
        return dateArray;
      },

      curDate () {
        var myDate = new Date()
        var dateTemp
        dateTemp = myDate.getFullYear() + "-" + (myDate.getMonth()+1) + "-" + myDate.getDate()
        return {txt:dateTemp, val:dateTemp}
      },

      /*刷新按键*/
      refresh (pageNo, pageSize, opt) {
        pageNo = pageNo ? pageNo : 1
        pageSize = pageSize ? pageSize : 15
        this.getItems(pageNo,pageSize,opt,1)
      },

    }
  }
</script>