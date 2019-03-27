<template>
  <div class="adminLayout">
    <!--按广告统计-->
    <div class="layout table1">
      <div class="ttl">
        <h3><i class="icon fa fa-th-large"></i>{{headTtl[0]}}</h3>
        <span>某时间段按广告名称统计的数据</span>
      </div>
      <div class="filter">
        <div class="time">
          <div class="control">
            <span>起始：</span>
            <datepicker v-model="times[0].begined" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
          </div>
          <div class="control">
            <span>终止：</span>
            <datepicker v-model="times[0].ended" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
          </div>
          <a class="confirm" href="javascript:;" @click="confirm(0,1)">确定</a>
          <!-- <export
            class="btnExl fr"
            @insertNew="insertNew"
            index="0"
            :fileName="'广告点击-'+fileName[0]"
            btnName="导出Excel表"
          >
          </export> -->
        </div>
      </div>
     <!--  <div class="sumInfo">
          <span>总广告数：<em>{{pageObj[0].totalCount}}</em></span>
          <span>总点击量：<em>{{resultSum[0].sum}}</em></span>
      </div> -->
      <div class="tablePage">
        <table cellpadding="5">
          <tr>
            <th v-for="title in titles[0]" v-text="title"></th>
          </tr>
          <tr v-for="(item,index) in result[0]">
            <td v-for="(item2,key2) in item">
              <img v-if="key2 === 'thumbnail'" :src="item2" />
              <p v-if="key2 != 'thumbnail'" v-text="item2"></p>
            </td>
          </tr>
        </table>
      </div>
      <pagination 
        v-if="pageObj[0]"
        :transData="pageObj[0]" 
        :wrapIndex="0"
        @changePage="changePage"
      ></pagination>
    </div>
    <!--按时间统计-->
    <div class="layout table2">
      <div class="ttl">
        <h3><i class="icon fa fa-th-large"></i>{{headTtl[1]}}</h3>
        <span>指定某广告在某时间段按日期统计的数据</span>
      </div>
      <div class="fieldFilter">
        <form-page-select 
              v-if="showAdFilter"
              :able="ads"
            ></form-page-select>
        <!-- <a class="confirm" href="javascript:;" @click="confirm(1)">确定</a> -->
      </div>
      <div class="filter">
        <div class="time">
          <p class="control">
            <span>起始：</span>
            <datepicker v-model="times[1].begined" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
          </p>
          <p class="control">
            <span>终止：</span>
            <datepicker v-model="times[1].ended" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
            </datepicker>
          </p>
          <a class="confirm" href="javascript:;" @click="confirm(1)">确定</a>
          <!-- <export
            class="btnExl fr"
            @insertNew="insertNew"
            index="1"
            :fileName="'广告点击-'+fileName[1]"
            btnName="导出Excel表"
          >
          </export> -->
        </div>
      </div>
      <div class="sumInfo info2">
          <span>总点击量：<em>{{resultSum[1].sum}}</em></span>
          <span>上架时间：<em>{{resultSum[1].addedDate}}</em></span>
          <span>下架时间：<em>{{resultSum[1].offDate}}</em></span>
          <span class="last"><img :src="resultSum[1].thumbnail" /></span>
      </div>
      <div class="tablePage">
        <table cellpadding="5">
          <tr>
            <th v-for="title in titles[1]" v-text="title"></th>
          </tr>
          <tr v-for="(item,index) in result[1]">
            <td v-for="item2 in item" v-text="item2"></td>
          </tr>
        </table>
      </div>
      <pagination 
        v-if="pageObj[1]"
        :transData="pageObj[1]" 
        :wrapIndex="1"
        @changePage="changePage"
      ></pagination>
    </div>
  </div>
</template>


<script>
import Index from './js.js';
export default Index;
</script>
<style lang="scss" src="../style.scss"></style>
