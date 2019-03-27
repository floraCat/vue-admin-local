<!-- 一级或多级别下拉选项框 （例：商品管理有此功能，只是只有一級） -->
<template>
  <div class="formCtrl">
    <label class="label">
      <span class="must" v-if="able.editObj.valid">*</span>
      <span v-text="able.label"></span>
    </label>
    <div class="p">
      <div class="_select">
        <select @change="getChannels($event,0)" :data-valid='able.editObj.valid' :data-type='able.editObj.type' :data-forCheck="able.editObj.valid || able.editObj.type" data-note="一级分类">
          <option :value="able.value">选择一级分类</option>
          <option v-for="(item0,index0) in channels" v-text="item0[field]" :value="item0.id" :selected="index0 === curIndex0"></option>
        </select>
        <select @change="getChannels($event,1)" v-if="channels1.length" ref="select1">
          <option value="">选择二级分类</option>
          <option v-for="(item1,index1) in channels1" v-text="item1[field]" :value="item1.id" :selected="index1 === curIndex1"></option>
        </select>
        <select @change="getChannels($event,2)" v-if="channels2.length" ref="select2">
          <option value="">选择三级分类</option>
          <option v-for="(item2,index2) in channels2" v-text="item2[field]" :value="item2.id" :selected="index2 === curIndex2"></option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      /*第二级分类*/
      channels1: [],
      /*第三级分类*/
      channels2: [],
      /*第一级分类当前选项*/
      curIndex0: null,
      /*第二级分类当前选项*/
      curIndex1: null,
      /*第三级分类当前选项*/
      curIndex2: null
    }
  },
  props: [
    // 'channels',
    'able',
    'field'
  ],
  computed: {
    ableId () {
      return this.able.value
    },
    channels () {
      return this.able.editObj.channels
    }
  },
  mounted() {
    let self = this
    console.log('channels')
    console.log(this.channels)
    this.$nextTick(function () {
      this.defChannels()
    })    
  },
  // update () {
  //   this.$nextTick(function() {
  //     this.defChannels()
  //   })
  // },
  watch: {
    ableId (val) {
      let self = this
      this.$nextTick(function () {
        this.defChannels()
      })
    }
  },
  methods: {
    // 识别已有父级id
    defChannels () {
      console.log('channels')
      console.log(this.channels)
      let _id = this.able.value
      if (_id != null) {
        let cats = this.channels
        for (let x = 0; x < cats.length; x ++) {
          if (cats[x].id === _id) {
            this.curIndex0 = x
          } else {
            if (cats[x].children) {
              let cats2 = cats[x].children
              for (let y = 0; y < cats2.length; y ++) {
                if (cats2[y].id === _id) {
                  this.curIndex1 = y
                  this.curIndex0 = x
                  this.channels1 = cats[x].children
                } else {
                  if (cats2[y].children) {
                    let cats3 = cats2[y].children
                    for (let z = 0; z < cats3.length; z ++) {
                      if (cats3[z].id === _id) {
                        this.curIndex2 = z
                        this.curIndex1 = y
                        this.curIndex0 = x
                        this.channels1 = cats[x].children
                        this.channels2 = cats2[y].children
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } else {
        this.reset()
      }
      // console.log(this.curIndex0)
      // console.log(this.curIndex1)
      // console.log(this.curIndex2)
    },
    /*恢复空值*/
    reset () {
      this.channels1 = []
      this.channels2 = []
      this.curIndex0 = null
      this.curIndex1 = null
      this.curIndex2 = null
    },
    /*点选*/
    getChannels (ev,level) {
      let val = parseInt(ev.target.value)
      for (let i = 0; i < this.channels.length; i ++) {
        //选择一级分类
        if (level === 0) {
          this.channels2 = []
          if (this.$refs.select1) {
            this.$refs.select1.options[0].selected = true
          }
          if (this.channels[i].id === val) {
            this.curIndex0 = i
            this.curIndex1 = null
            if (this.channels[i].children) {
              this.channels1 = this.channels[i].children
            }
            // this.channels1 = this.channels[i].children ? this.channels[i].children : []
            this.able.value = this.channels[i].id
            return
          }   
        }
        //选择二级分类
        if (level === 1) {
          if (this.$refs.select2) {
            this.$refs.select2.options[0].selected = true
          }
          if (this.curIndex0 === i) {
            let channel1 = this.channels[i].children
            for (let j = 0; j < channel1.length; j ++) {
              if (channel1[j].id === val) {
                this.curIndex1 = j
                this.curIndex2 = null
                if (channel1[j].children) {
                  this.channels2 = channel1[j].children
                }
                // this.channels2 = channel1[j].children ? channel1[j].children : []
                this.able.value = channel1[j].id
                return
              }
            }
          }
        }
        //选择三级分类
        if (level === 2) {
          if (this.curIndex0 === i) {
            let channel1 = this.channels[i].children
            for (let j = 0; j < channel1.length; j ++) {
              if (this.curIndex1 === j) {

                let channel2 = channel1[j].children
                for (let k = 0; k < channel2.length; k ++) {
                  if (channel2[k].id === val) {

                    this.channels2 = channel2[k].children ? channel2[k].children : []
                    this.able.value = channel2[k].id
                    return
                  }
                }
              }
            }
          }
          // return
        }
      }
    },
    select (id) {
      this.$emit("select",id)
    }
  },
}
</script>

<style lang="scss">
@import '~assets/style/var.scss';
._select {
  width: 100%;
  display: flex;
  overflow: hidden;
  select {
    flex: 1;
    max-width: 12rem;
    height: 2.6rem;
    line-height: 2.6rem;
    text-indent: .5rem;
    border: $zLine 1px solid;
    border-radius: .3rem;
    margin-right: 1rem;
  }
}
</style>