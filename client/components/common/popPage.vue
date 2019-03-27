<!-- 列表某字段明细弹窗（如商家管理的配送范围） -->
<template>
  <div class="popPage">
    <div class="bg" @click="close"></div>
    <div class="wrap">
      <div class="main">
        <header class="head">
          <p class="title">{{transData.title}}</p> 
          <button class="delete" @click="close"></button>
        </header>
        <table class="table">
          <tr class="hd">
            <td v-for="(item0,index0) in listAbles" v-text="item0.text"></td>
          </tr>
          <tr v-for="(item,index) in listItems" v-if="listItems.length > 0">
            <td v-for="(able,index) in listAbles">{{item[able.key] | checkToTxt(able.key) }}</td>
          </tr>
        </table>
        <div v-if="listItems.length <= 0">
            还没有数据噢~
        </div>
        <pagination v-if="listItems.length > 0"
        :transData="paginationItems" 
        @changePage="changePage"
      ></pagination>
      </div>
    </div>
  </div>
</template>

<script>

import pagination from './pagination'

export default {
  components: {
    pagination    : pagination,
  },
  data () {
    return {
      listItems: [],
      listAbles: [],
      paginationItems:{},
    }
  },

  props: {
    transData: Object
  },

  mounted () {
    document.body.appendChild(this.$el) // 便于fixed定位
    this.getItems(1)  
  },

  methods: {

    /*获取isChild字段*/
    getAbles () {
      let _ables = this.transData.ables
      let arr = []
      for (let i = 0; i < _ables.length; i ++) {
        if (_ables[i].isChild) {
          let obj = {}
          obj.key = _ables[i].key
          obj.text = _ables[i].label
          arr.push(obj)
        }
      }
      return arr
    },

    getItems (page) {
      let self = this
      self.axios({
        url: self.transData.url,
        method: 'GET',
        params: {
          filterId: self.transData.id,
          pageNo: page,
          pageSize: 15
        }
      }).then((res) => {
        console.log('字段下的条目')
        if (res.data.status === '') {
          Funs.delCookie('xm_cookie')
          window.location.href = ''
        }
        if (res.data.status === 'failure') {
          console.log('错误提示：' + res.data.message)
        }
        if (res.data.status === 'success') {
          console.log(res)
          self.listItems = res.data.page.list,
          self.listAbles = self.getAbles()
          self.paginationItems = {
            pageNo: page,
            pageSize: res.data.page.pageSize,
            totalCount: res.data.page.totalCount,
            totalPage: res.data.page.totalPage,
          }
        }
      })
    },

    close () {
      this.$emit('close')
    },

    changePage (page) {
      this.getItems(page)
    },

  },

}
</script>

<style>
@import '~assets/style/var.scss';

/*列表弹窗*/
.popPage {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.popPage .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .5;
}
.popPage .wrap {
  position: relative;
  top: 12%;
  padding-left: 180px;
}
.popPage .main .head{
  align-items: center;
    background-color: whitesmoke;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -ms-flex-pack: start;
    justify-content: flex-start;
    padding: 20px;
    position: relative;
    border-bottom: 1px solid #dbdbdb;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.popPage .main .head .title {
    color: #363636;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    font-size: 1.5rem;
    line-height: 1;
}
.popPage .main {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  background: #fff;
  border: #ddd 1px solid;
  border-radius: 5px;
  padding: 10px;
}
.popPage .main .hd {
  height: 14px;
  line-height: 14px;
  background: #d7e8f8;
}
.popPage .mPagination {
  padding: 10px 0;
}
.popPage .mPagination .switch {
  display: none;
}
</style>