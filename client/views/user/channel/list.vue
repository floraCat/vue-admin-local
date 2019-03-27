<template>
  <div class="channelList">
    <div class="_table">
      <ul class="hd">
        <li class="_li1">No.</li>
        <li class="_li2">标题</li>
        <li class="_li3">状态</li>
        <li class="_li4">操作</li>
      </ul>
      <div class="list">
        <ul v-for="(item,index) in items">
          <li class="_li1" v-text="index+1"></li>
          <li class="_li2">
            <a href="javascript:;" @click="edit(index)" v-text="item.channelName"></a>
          </li>
          <li class="_li3">{{item.status | checkToTxt('status')}}</li>
          <li class="_li4">
            <ol>
              <!-- <a href="javascript:;" class="show">展示</a> -->
              <a href="javascript:;" class="edit" @click="edit(index)">编辑</a>
              <a href="javascript:;" class="del" @click="del(index)">删除</a>
            </ol>
          </li>
        </ul>
      </div>
    </div>
    <div class="note" v-if="!items.length">
      <p>还没有数据哦，请先添加数据~</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'transData'
    ],
    data () {
      return {
        items: [{loading: true}],
      }
    },
    computed: {
      api_art_list () {
        return `${this.API.url}/information/list${this.API.suf}`
      },
      api_del () {
        return `${this.API.url}/information/delete${this.API.suf}`
      },
      channelId () {
        return this.transData.channelId ? this.transData.channelId : null
      }
    },
    mounted () {
      this.getData()
    },
    watch: {
      channelId (val) {
        this.getData()
      }
    },
    methods: {
      /*获取列表数据*/
      getData () {
        let self = this
        self.axios({
          url: self.api_art_list,
          method: 'GET',
          params: {
            channelId: self.channelId
          }
        }).then((res) => {
          console.log('资讯列表')
          if (res.data.status === '') {
            Funs.delCookie('xm_cookie')
            window.location.href = ''
          }
          if (res.data.status === 'failure') {
            console.log('错误提示：' + res.data.message)
          }
          if (res.data.status === 'success') {
            console.log(res)
            self.items = res.data.page.list
          }
        })
      },
      /*编辑*/
      edit (index) {
        this.$emit('edit', this.items[index].id)
      },
      /*删除*/
      del (index) {
        let self = this
        if (confirm("确定要删除此条目吗？")) {
          self.axios({
            url: self.api_del,
            method: 'POST', 
            data: self.items[index].id
          }).then((res) => {
            console.log('删除操作')
            if (res.data.status === '') {
              Funs.delCookie('xm_cookie')
              window.location.href = ''
            }
            if (res.data.status === 'failure') {
              console.log('错误提示：' + res.data.message)
            }
            if (res.data.status === 'success') {
              console.log(res)
              self.items.splice(index,1)
              self.$emit('notePop', '文章删除成功')
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
@import '~assets/style/var.scss';
.channelList {
  ._table {
    border-top: $zLine 1px solid;
    border-left: $zLine 1px solid;
    ul {
      overflow: hidden;
    }
    li {
      float: left;
      text-align: center;
      height: 3rem;
      line-height: 2rem;
      padding: .5rem;
      border-right: $zLine 1px solid;
      border-bottom: $zLine 1px solid;
      &._li1 {
        width: 5%;
      }
      &._li2 {
        width: 65%;
      }
      &._li3 {
        width: 10%;
      }
      &._li4 {
        width: 20%;
        ol {
          overflow: hidden;
          width: 7.5rem;
          margin: 0 auto;
          a {
            float: left;
            width: 2.5rem;
          }
        }
      }
    }
    .list {
      .li2 {
        text-align: left;
        text-indent: .5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        a:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .note {
    padding: 1rem 0;
  }
}
</style>