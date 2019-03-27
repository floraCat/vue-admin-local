<!-- 列表分页 -->
<template>
  <div class="mPagination">
    <ul>

      <!--首页-->
      <ol>
        <li class="first" :class="{hidden:transData.pageNo===1}"><a href="javascript:;" @click="changePage(1,transData.pageNo===1)">首页</a></li>
        <li class="prev" :class="{hidden:transData.pageNo===1}"><a href="javascript:;" @click="changePage('prev',transData.pageNo===1)">上一页</a></li>
      </ol>

      <!--可点页码-->
      <ol class="ol2">
        <li class="page" :class="{active:parseInt(transData.pageNo)===parseInt(index-1+firstPage)}" v-for="index in pages"><a href="javascript:;" v-text="(index-1)+firstPage" @click="changePage((index-1)+firstPage,transData.pageNo===(index-1)+firstPage)"></a></li>
      </ol>
      <span class="ellipsis" v-show="transData.pageNo < transData.totalPage - 6">...</span>

      <!--末页-->
      <ol class="ol3">
        <li class="next" :class="{hidden:transData.pageNo===transData.totalPage}"><a href="javascript:;" @click="changePage('next',transData.pageNo===transData.totalPage)">下一页</a></li>
        <li class="last" :class="{hidden:transData.pageNo===transData.totalPage}"><a href="javascript:;" @click="changePage('last',transData.pageNo===transData.totalPage)">末页</a></li>
      </ol>
    </ul>

    <!--条数等信息-->
    <p class="info">
      <span>共<b v-text="transData.totalPage"></b>页</span>
      <span>总数<b v-text="transData.totalCount"></b>条</span>
      <span class="switch pageNo">
        <i>第</i>
        <select @change="changePage2($event)">
          <option value="">请选择</option>
          <option v-for="(page2,index) in pages2" :value="page2" :selected="page2 == curPage2" v-text="pages3[index]"></option>
        </select>
        <i>页</i></span>
      <span class="switch pageSize">
        <i> 每页</i>
        <select @change="changePageSize($event)">
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
        <i>条</i></span>
    </p>
  </div>
</template>

<script>
export default {

  data () {
    return {
      curPage: 1, // 当前页码
      curPage2: 0, // 下拉页码当选
      levelLast: 20, // 下拉页码（整除倍数）最后一个
      pages3: [], // 下拉显示页码数组
      curPageSize: 15
    }
  },

  props: {
    transData: Object,
    wrapIndex: Number
  },

  computed: {
    // 可点选的页码数
    pages () {
      return this.transData.totalPage < 10 ? this.transData.totalPage : 10
    },
    // 下拉页码value数组
    pages2 () {
      let _rs = []
      let _pObj = this.transData.totalPage
      let _level = 10 // 倍数
      if (20 < _pObj <= 200) {
        _level = 100
      } else if (200 < _pObj <= 2000) {
        _level = 1000
      } else if (200 < _pObj <= 2000) {
        _level = 10000
      } else if (200 < _pObj <= 20000) {
        _level = 100000
      }
      for (let i = 0; i < _pObj; i ++) {
        if (i%_level == 0) {
          this.levelLast = i
          let _last = (_pObj < (i+_level)) ? _pObj : (i+_level) // 最后的页码
          if (i <= this.curPage && this.curPage < (i+_level)) {
            for (let j = (i-_level+1); j < _last; j ++) { // 显示当页最近倍数前后10个数
              if (j%(_level/10) == 0) {
                if (j > 0) {
                  _rs.push(j)
                }
              }
            }
          } else { // 显示总页内整除倍数的页码
            if (i > 0) {
              _rs.push(i)
            }
          }
        }
      }
      this.pages3 = []
      for (let x = 0; x < _rs.length; x ++) {
        if (this.levelLast > this.curPage && _rs[x] === this.levelLast) { // 最后页码为最后倍数时加'>'
          this.pages3.push('>'+_rs[x])
        } else if (this.curPage >= _level*2 && _rs[x] === _level) { // 第一页码为100...加'<'
          this.pages3.push('<'+_rs[x])
        } else {
          this.pages3.push(_rs[x])
        }
      }
      return _rs
    },
    // 可点选页码的第一个
    firstPage () {
      let rs = 1
      let total = this.transData.totalPage
      if (total >= 10) {
        if (this.transData.pageNo > 5 && this.transData.pageNo <= total - 4) {
          rs = this.transData.pageNo - 5
        } else if (this.transData.pageNo > total - 4) {
          rs = total - 9
        }
      }
      return rs
    }
  },

  methods: {
    // 换页操作
    changePage (pageNo,hide,pageSize) {
      if (!hide) {
        if (pageNo === null) {
          pageNo = this.curPage
        }
        if (pageNo === 'prev') {
          pageNo = this.transData.pageNo > 2 ? this.transData.pageNo - 1 : 1
        }
        if (pageNo === 'next') {
          pageNo = this.transData.pageNo <= this.transData.totalPage ? this.transData.pageNo + 1 : this.transData.totalPage
        }
        if (pageNo === 'last') {
          pageNo = this.transData.totalPage
        }
        this.curPage = pageNo
        pageSize = pageSize ? pageSize : this.curPageSize
        // 同页多个分页，wrapIndex为当前分页index
        let _optLast = this.wrapIndex !== null ? this.wrapIndex : null
        this.$emit('changePage', pageNo, pageSize, _optLast)
      }
    },
    //下拉选择换页
    changePage2 (ev) { 
      let _pageNo = ev.target.value
      this.curPage2 = _pageNo
      this.changePage(_pageNo)
    },
    // 切换每页条数
    changePageSize (ev) { 
      let pageSize = ev.target.value 
      this.curPageSize = pageSize     
      this.changePage(null, false, pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/var.scss';
  .mPagination{ font-size: 1rem; line-height:32px; text-align:center; padding:3rem 0; min-width: 755px;}
  .mPagination ul{ overflow:hidden; display:inline-block;}
  .mPagination ol { float: left; border-top: $zLine 1px solid; border-left: $zLine 1px solid;}
  .mPagination ol.ol2 { border-left: none;}
  .mPagination ol.ol3 { border-left: none;}
  .mPagination li{ float: left;}
  .mPagination li a{ display:block; height:32px; padding:0 14px; border-right:#c6e6e1 1px solid; border-bottom:#c6e6e1 1px solid; background: #fff;}
  .mPagination .active a{ cursor: default; }
  .mPagination li a:hover{ background: $zBg; color: $zs;}
  .mPagination .active a{ background: $zs; color:#fff; font-weight: bold; border-right: $zs 1px solid; border-bottom: $zs 1px solid;}
  .mPagination .active a:hover { background: $zs; color:#fff;}
  .mPagination .hidden a{ border-right:#c6e6e1 1px solid; border-bottom:#c6e6e1 1px solid; color:#ccc; cursor:default; }
  .mPagination .hidden a:hover{ color:#ccc; background: #fff; cursor: not-allowed;}
  .mPagination .info{ display: inline-block; padding:0 5px; vertical-align: top; color: #888;}
  .mPagination .info span{ padding: 0 4px;}
  .ellipsis { float: left; padding: 0 .5rem; letter-spacing: 3px; border-right: #c6e6e1 1px solid;}
  .mPagination .switch {
    float: left;
    overflow: hidden;
    i {
      float: left;
    }
    select {
      margin: 2px .5rem;
      float: left;
      width: 4rem;
      height: 28px;
      line-height: 28px;
      border: $zLine 1px solid;
    }
  }
</style>
