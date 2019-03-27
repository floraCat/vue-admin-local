<template>
  <div class="xmChannel">
    <div class="side" :class="{editAll: editAll}">
      <ul class="enters">
        <a class="fl add" href="javascript:;" @click="addCat()">添加分类</a>
        <a class="fr add" href="javascript:;" @click="editArt()">添加文章</a>
        <a class="cen" href="javascript:;" @click="editCats()" ref="editCats">编辑分类</a>
      </ul>
      <ul class="mySidebar">
        <li v-for="(item1,index1) in channels">
          <a href="javascript:;" :class="{on:item1.open}" @click="clickHandle(item1.children && item1.children.length, item1.id, $event, 1, index1)">
            {{item1.channelName}}
            <div class="editSpan" @click="editCat($event,item1)"><i></i><span>编辑</span></div>
            <div class="editSpan del" @click="delCat($event,item1.id)"><i></i><span>删除</span></div>
          </a>
          <div class="drop drop1" :class="{show:item1.open}">
            <div class="wrap" v-for="(item2,index2) in item1.children">
              <a href="javascript:;" :class="{on:item2.open}" @click="clickHandle(item2.children && item2.children.length, item2.id, $event, 2, index1, index2)">
                {{item2.channelName}}
                <div class="editSpan" @click="editCat($event,item2)"><i></i><span>编辑</span></div>
                <div class="editSpan del" @click="delCat($event,item2.id)"><i></i><span>删除</span></div>
              </a>
              <div class="drop drop2" @click="drop(item2)" :class="{show:item2.open}">
                <div class="wrap">
                  <a href="javascript:;" v-for="(item3,index3) in item2.children" @click="listArt($event, item3.id)">
                    {{item3.channelName}}
                    <div class="editSpan" @click="editCat($event,item3)"><i></i><span>编辑</span></div>
                    <div class="editSpan del" @click="delCat($event,item3.id)"><i></i><span>删除</span></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="main">
      <app-edit-cat v-if="show.cat" :transData = "catObj" @notePop="popNoteCat"></app-edit-cat>
      <app-list v-if="show.list" :transData = "listObj" @edit = "editArt" @notePop="popNoteArtDel"></app-list>
      <app-edit-art v-if="show.art" :channels = "channels" :transData = "artObj" @notePop="popNoteArt"></app-edit-art>
    </div>

    <modal-pop 
      v-if="objPop.show" 
      :transData="objPop.opts" 
      @close="closeModalPop"
    ></modal-pop>

  </div>
</template>

<script>
  import appEditCat from './edit_cat'
  import appList from './list'
  import appEditArt from './edit_art'
  import modalPop from '../../../components/common/pop'
  export default {
    components: {
      appEditCat,
      appList,
      appEditArt,
      modalPop
    },
    data () {
      return {
        /*所有类目*/
        channels: [],
        /*当前(在编辑)的类目数据*/
        curCatId: null,
        /*列表传参*/
        listObj: {
          channelId: null
        },
        /*文章编辑传参*/
        artObj: {
          title: '添加文章',
          infos: null
        },
        /*分类编辑传参*/
        catObj: {
          title: null,
          id: null,
          parentId: null,
          channels: null,
        },
        /*编辑状态*/
        editAll: false,
        /*显隐*/
        show: {
          cat: false,
          list: false,
          art: true
        },
        /*提示弹窗传参*/
        objPop     : { show: false, opts: '提交成功'},
      }
    },
    computed: {
      api_cat_list () {
        return `${this.API.url}/channel/list${this.API.suf}`
      },
      api_cat_del () {
        return `${this.API.url}/channel/delete${this.API.suf}`
      },
      api_art_get () {
        return `${this.API.url}/information/get${this.API.suf}`
      },
    },
    mounted () {
      this.getData()
      this.setOpen(false)
    },
    methods: {
      getData () {
        let self = this
        self.axios({
          url: self.api_cat_list,
          method: 'GET'
        }).then((res) => {
          console.log('资讯管理')
          if (res.data.status === '') {
            Funs.delCookie('xm_cookie')
            window.location.href = ''
          }
          if (res.data.status === 'failure') {
            console.log('错误提示：' + res.data.message)
          }
          if (res.data.status === 'success') {
            console.log(res)
            let list = res.data.list
            self.channels = list
          }
            
        })
      },
      
      /*分类点击处理*/
      clickHandle (hasChild, id, ev, level, index1,index2) {
        if (ev.target && ev.target.className != 'editSpan') {
          if (hasChild) {
            this.drop (ev, level, index1, index2)
          } else {
            if (id != null) {
              this.listArt(ev, id)
            }
          }
        }
      },

      /*下拉折叠*/
      drop (ev, level,index1, index2) {
        if (ev.target && ev.target.className != 'editSpan') {
          if (level === 1) {
            let temp = this.channels[index1]
            temp.open = !temp.open
            this.$set(this.channels, index1, temp)
          }
          if (level === 2) {
            let temp = this.channels[index1].children[index2]
            temp.open = !temp.open
            this.$set(this.channels[index1].children, index2, temp)
          }  
        }
      },
      /*添加分类*/
      addCat () {
        this.catObj = {
          title : '添加分类',
          channels: this.channels
        }
        this.show.cat = true
        this.show.list = false
        this.show.art = false
      },

      /*编辑文章*/
      editArt (id) {
        // 修改前获取文章数据
        if (id != undefined) {
          let self = this
          self.axios({
            url: self.api_art_get,
            method: 'GET',
            params: {
              id : id
            }
          }).then((res) => {
            console.log('资讯编辑')
            if (res.data.status === '') {
              Funs.delCookie('xm_cookie')
              window.location.href = ''
            }
            if (res.data.status === 'failure') {
              console.log('错误提示：' + res.data.message)
            }
            if (res.data.status === 'success') {
              console.log(res)
              let result = res.data.result
              self.artObj.title = "修改文章"
              self.artObj.infos = result
            }
          })
        } else {
          // 添加
          this.artObj.title = "添加文章"
          this.artObj.infos = null
        }
        this.show.cat = false
        this.show.list = false
        this.show.art = true
      },
      /*删除分类*/
      delCat (ev,id) {
        if (ev.target && ev.target.className != 'editSpan') {
          if (confirm("确定要删除此分类吗？")) {
            let self = this
            self.axios({
              url: self.api_cat_del,
              method: 'POST',
              data: id
            }).then((res) => {
              console.log("删除分类")
              if (res.data.status === '') {
                  Funs.delCookie('xm_cookie')
                  window.location.href = ''
                }
                if (res.data.status === 'failure') {
                  console.log('错误提示：' + res.data.message)
                }
                if (res.data.status === 'success') {
                  console.log(res)
                  // 侧栏删除对应栏目
                  let cats = this.channels
                  for (let x = 0; x < cats.length; x ++) {
                    if (cats[x].id === id) {
                      this.channels.splice(x,1)
                    } else {
                      if (cats[x].children) {
                        let cats2 = cats[x].children
                        for (let y = 0; y < cats2.length; y ++) {
                          if (cats2[y].id === id) {
                            this.channels[x].children.splice(y,1)
                          } else {
                            if (cats2[y].children) {
                              let cats3 = cats2[y].children
                              for (let z = 0; z < cats3.length; z ++) {
                                if (cats3[z].id === id) {
                                  this.channels[x].children[y].children.splice(z,1)
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  self.openModalPop('分类删除成功',function () {
                    self.addCat()
                  })
                }
            })
          }
        }
      },
      /*递归设置open值（是否打开下拉）*/
      setOpen (val) {
        for (let i = 0; i < this.channels.length; i ++) {
          this.$set(this.channels[i], 'open', val)
          let temp1 = this.channels[i].children
          if (temp1 && temp1.length) {
            for ( let j = 0; j < temp1.length; j ++) {
              this.$set(this.channels[i].children[j], 'open', val)
              let temp2 = this.channels[i].children[j].children
              if (temp2 && temp2.length) {
                for (let k = 0; k < temp2.length; k ++) {
                  this.$set(this.channels[i].children[j].children[k], 'open', val)
                }
              }
            }
          }
        }
      },
      /*编辑分类，显示编辑btn*/
      editCats () {
        let self = this
        if (this.editAll) {
          this.editCancel()
          return
        }
        this.editAll = true
        this.setOpen(true)
        this.$refs.editCats.innerText = "恢复分类编辑"
        document.removeEventListener("click", this.editCancel)
        setTimeout(function () {
          document.addEventListener("click", self.editCancel)
        }, 0)
        
      },
      /*取消编辑*/
      editCancel () {
        this.editAll = false
        this.$refs.editCats.innerText = "编辑分类"
        document.removeEventListener("click", this.editCancel)
      },
      /*编辑分类处理*/
      editCat (ev,channel) {
        ev.stopPropagation()
        this.catObj = {
          title : '编辑分类',
          channel: channel,
          channels: this.channels
        }
        this.show.cat = true
        this.show.list = false
        this.show.art = false
        this.editCancel()
      },
      /*分类添加提示*/
      popNoteCat (ttl) {
        let self = this
        this.openModalPop(ttl, function () {
          self.addCat()
        })
      },
      /*文章增加提示*/
      popNoteArt (ttl) {
        let self = this
        this.openModalPop(ttl, function () {
          self.editArt()
        })
      },
      /*文章删除成功*/
      popNoteArtDel (ttl,index) {
        let self = this
        this.openModalPop(ttl, function () {
        })
      },
      /*展示文章列表*/
      listArt (ev,id) {
        if (ev.target && ev.target.className != 'editSpan') {
          this.listObj.channelId = id
          this.show.list = true
          this.show.cat = false
          this.show.art = false
        }
      },
      /*提示弹窗*/
      openModalPop (ttl,callback) {
        this.objPop.opts = ttl
        let self = this
        setTimeout(function () {
          self.objPop.show = true
        }, 0)
        setTimeout(function () {
          self.objPop.show = false
          if (callback && 'function' === typeof callback) {
            callback()
          }
        }, 2000)
      },
      closeModalPop () {
        this.objPop.show = false
      },
    }
  }
</script>

<style lang="scss">
@import '~assets/style/infoAdmin.scss';
.xmChannel {
  position: relative;
  overflow: hidden;
  margin: 2rem 1rem;
  border-top: #ddd 1px solid;
  padding: 2rem 0;
  .side {
    float: left;
    &.editAll {
      .editSpan { 
        display: block!important;
      }
      .add { background: #aaa;}

    }
  }
  .enters {
    width: 12rem;
    overflow: hidden;
    border-bottom: #fff 1px solid;      
    a {
      display: block;
      width: 50%;
      text-align: center;
      height: 3.2rem;
      line-height: 3.2rem;
      background: $spec;
      color: #fff;
      &.fl {
        float: left;
        border-right: #fff 1px solid;
      }
      &.fr {
        float: right;
      }
      &.cen {
        border-top: #fff 1px solid;
        height: 2.5rem;
        line-height: 2.5rem;
        float: left;
        width: 100%;
      }
    }
  }
  .main {
    margin-left: 13.5rem;
    background: #fff;
    padding: 1rem;
    overflow: hidden;
  }
}
</style>