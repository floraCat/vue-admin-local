<!-- 明细弹窗 -->
<template>
  <div class="modal animated">
    <div class="bg"></div> 
    <div class="main">
      <header class="head">
        <p class="title">{{transData.action | ttlTxt}}</p> 
        <button class="delete" @click="close"></button>
      </header> 
      <section class="body">
        <article class="box">
          <li class="formCtrl" v-for="(item,index) in transData.ables">
            <label class="label" v-text="item.label"></label>
            <!--有下级-->
            <div class="control" v-if="item.viewObj && item.viewObj.hasChild">
              <div class="viewChild" :class="{childLen0:!transData.childAbles[0] || !transData.childAbles[0].length}">
                <div class="li" v-for="(li,index2) in item.value" ref="li"  @click="popSub(index,index2)" v-text="li">
                </div>
              </div>
            </div>
            <!--无下级-->
            <div class="p" v-else>
              <span class="txt" style=" word-break:break-all">{{item.value | checkToTxt(item.key)}}</span>
            </div>
          </li>
        </article>
        <!--下级详细信息-->
        <div class="infoList" ref="popWindow" :class="{open:infos.length}">
          <div class="hd">
            <h5 class="lt"><em v-text='transData.ables[curIndex].value && transData.ables[curIndex].value[curIndex2]'></em>的信息列表</h5>
            <a class="quit delete" @click="quit()"></a> 
          </div> 
          <ul ref="popUl">
            <li class="li" v-for="(info,index3) in infos">
              <label v-text="info.label + '：'"></label> 
              <span>{{info.value | checkToTxt(info.key)}}</span> 
            </li>
          </ul> 
        </div>
      </section> 
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      curIndex: 0, // 顶级当前index
      curIndex2: 0, // 下级当前index
      infos: {}
    }
  },

  props: {
    transData: Object
  },

  mounted () {
    console.log('view --- transData')
    console.log(this.transData)

    document.body.appendChild(this.$el) // 便于fixed定位
  },

  methods: {

    // 关闭顶级弹窗
    close () {
      this.$emit('close')
    },

    // 下级信息弹窗
    popSub (index,index2) {
      this.curIndex = index
      this.curIndex2 = index2
      this.infos = this.transData.childAbles[index2]
      this.$nextTick(function () {
        /*弹窗设置 start*/
        let popRect = this.$refs.popWindow.getBoundingClientRect()
        this.$refs.popUl.style.height = (popRect.height-62) + 'px'
        this.$refs.popUl.style.overflowY = 'scroll'
        /*弹窗设置 end*/
      })
    },

    // 关闭下级弹窗
    quit () {
      this.infos = {}
    },

  },

}
</script>

<style lang="scss">
@import '~assets/style/var.scss';

.viewChild {
  line-height: 36px;
  overflow:hidden;
  padding-top: 7px;

  &.childLen0 {
    .li {
      color: #666;
      border-color: #aaa;
      &:hover {
        cursor: auto;
        background: #fff;
      }
    }
  }

  .show {
    font-size: 12px;
  }

  .quit {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    background: #fff;
    border: #333 1px solid;
    border-radius: 50%;
  }

  .li {
    position: relative;
    float: left;
    height:22px;
    line-height: 20px;
    font-size: 12px;
    padding: 0 5px;
    border: $zLine 1px solid;
    margin: 0 5px 5px 0;
    border-radius:3px;
    cursor: pointer;
    color: $zs;

    &:hover {
      background: $zBg;
    }

    > p {
      display: inline;
    }

  }
}
</style>