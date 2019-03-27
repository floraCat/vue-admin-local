<template>
  <div class="adminLayout" id="issueAnalyse">
    <div class="layout table1">
      <div class="ttl">
        <h3><i class="icon fa fa-th-large"></i>问卷统计列表</h3>
      </div>
      <div class="fieldFilter">
        <form-page-select 
              v-if="showIssueFilter"
              :able="issues"
            ></form-page-select>
        <a class="confirm" href="javascript:;" @click="confirm(1)">确定</a>
      </div>
      <div class="tablePage">
        <table cellpadding="5">
          <tr>
            <th v-for="title in titles" v-text="title"></th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in result">
            <td v-for="(item2,key2) in item">
              <p v-text="item2"></p>
            </td>
            <td>
              <a href="javascript:;" @click="getCurIssue(index)">查看详情</a>
            </td>
          </tr>
        </table>
      </div>
      <pagination 
        v-if="pageObj"
        :transData="pageObj" 
        :wrapIndex="0"
        @changePage="changePage"
      ></pagination>
    </div>
    <div class="issueOn" ref="issueOn" v-if="showOn">
      <div class="bg"></div>
      <div class="wrap">
        <div class="quit delete" @click="close()"></div>
        <div class="item" v-for="(item,index) in ablesOn" v-if="item.key != 'questions'">
          <label v-text="item.label+'：'"></label>
          <p>{{item.value | checkToTxt(item.key)}}</p>
        </div>
        <div class="list">
          <div class="li" v-for="(ques,index) in questions">
            <h3>{{ques.question}}：</h3>
            <div class="opts">
              <p v-if="ques.optA">
                <span>A：<em>{{ques.optA}}</em></span>
                <s>11%</s>
              </p>
              <p v-if="ques.optB">
                <span>B：<em>{{ques.optB}}</em></span>
                <s>11%</s>
              </p>
              <p v-if="ques.optC">
                <span>C：<em>{{ques.optC}}</em></span>
                <s>11%</s>
              </p>
              <p v-if="ques.optD">
                <span>D：<em>{{ques.optD}}</em></span>
                <s>11%</s>
              </p>
              <p v-if="ques.optD2" class="txt"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Index from './js.js';
export default Index;
</script>
<style lang="scss">
@import '../style.scss';
.issueOn {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .5;
  }
  .quit {
    z-index: 10000;
    position: absolute;
    top: 20px;
    right: 10px;
    width: 22px;
    height: 22px;
    background: #bbb;
    border-radius: 50%;
  }
  .wrap {
    position: relative;
    z-index: 10000;
    width: 800px;
    height: 90%;
    top: 5%;
    padding: 30px;
    margin: 0 auto;
    overflow-y: scroll;
    background: #fff;
    border-radius: 5px;
  }
  .item {
    overflow: hidden;
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    label {
      float: left;
      width: 70px;
      margin-right: 15px;
      text-align: right;
    }
    p {
      float: left;
    }
  }
  .list {
    margin: 20px 0 0;
    .li {
      margin-bottom: 10px;
      background: #eee;
      padding: 8px 15px;
      h3 {
        line-height: 26px;
      }
      .opts {
        overflow: hidden;
        p {
          float: left;
          margin-right: 20px;
          width: 80px;
          span {
            display: block;
            color: #666;
            em {
              color: #3a71a3;
            }
          }
          s {
            text-decoration: none;
            color: #e54c4c;
          }
          &.txt {
            width: 70px;
            height: 20px;
            line-height: 20px;
            border: #ccc 1px solid;
          }
        }
      }
    }
  }
}
#issueAnalyse {
  .tablePage {
    tr:nth-child(2) {
      td:first-child {
        width: 210px;
        p {
          width: 210px;
          padding: 0 10px;
          overflow: hidden;
          white-space:nowrap;
          text-overflow:ellipsis; 
          -o-text-overflow:ellipsis; 
        }
      }
    }
  }
}
</style>
