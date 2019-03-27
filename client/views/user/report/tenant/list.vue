<template>
  <div class="reportSheet">
	<div class="main">
		<div class="sheet1">
			<table class="table1">
				<tr>
					<td>公众号名称</td>
					<td>{{publicObj.airportName}}</td>
				</tr>
				<tr>
					<td>已关注粉丝量</td>
					<td>{{publicObj.customer_amount}}</td>
				</tr>
				<tr>
					<td>总分成金额</td>
					<td>{{publicObj.account_balance}}</td>
				</tr>
			</table>
			<a class="more" href="javascript:;" @click="showAll()">明细</a>
		</div>
	</div>
	<div class="list">
		<div class="filter">
			<div class="myTime">
	          <div class="control">
	            <span>起始：</span>
	            <datepicker v-model="times.begined" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
	              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
	            </datepicker>
	          </div>
	          <div class="control">
	            <span>终止：</span>
	            <datepicker v-model="times.ended" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
	              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
	            </datepicker>
	          </div>
	          <a class="myBtn em" href="javascript:;" @click="confirmList()">点击查询</a>
	          <a style="display: none;" class="btnExl" href="javascript:;" id="btn0" @click="expExl(0)">导出Excel表</a>
	        </div>
		</div>
		<div class="sheet2">
			<table class="table2">
				<tr v-for="(item,index) in itemsFilter" :data-txt="JSON.stringify(itemsFilter)">
					<th v-for="(ttl,index1) in item">{{ttl.ttl}}</th>
					<th>操作</th>
				</tr>
				<tr v-for="(item,index) in itemsFilter">
					<td v-for="(val,index2) in item">{{val.val | checkToTxt(val.val)}}</td>
					<td><a href="javascript:;" @click="showDay(index)">详情</a></td>
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
	<!--明细报表-->
	<div class="list2 listAll" :class="{open:openSheet[0]}">
		<div class="top">
			<a class="lt" href="javascript:;" @click="back(0)">返回</a>
			<p class="rt">以下为品牌商数据的明细报表</p>
		</div>
		<div class="hd">
			<div class="ttl">机场名称：<span>{{curAppName}}</span></div>
			<a class="myBtn">导出数据</a>
		</div>
		<div class="sheet3">
			<table class="table2">
				<tr v-for="(item,index) in itemsFilter" :data-txt="JSON.stringify(itemsFilter)">
					<th v-for="(ttl,index1) in item">{{ttl.ttl}}</th>
					<th>操作</th>
				</tr>
				<tr v-for="(item,index) in itemsFilter">
					<td v-for="(val,index2) in item">{{val.val}}</td>
					<td><a href="javascript:;" @click="showDay(index)">详情</a></td>
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
	<!--单日报表-->
	<div class="list2 listDay" :class="{open:openSheet[1]}">
		<div class="top">
			<a class="lt" href="javascript:;" @click="back(1)">返回</a>
			<p class="rt">以下为品牌商数据的单日报表</p>
		</div>
		<div class="hd">
			<div class="ttl">机场名称：<span>{{curAppName}}</span></div>
			<div class="ttl">日期：{{curDay}}</div>
			<a class="myBtn">导出数据</a>
		</div>
		<div class="sheet3">
			<table class="table2">
				<tr v-for="(item,index) in itemsDay">
					<th>序号</th>
					<th v-for="(ttl,index1) in item">{{ttl.ttl}}</th>
				</tr>
				<tr v-for="(item,index) in itemsDay">
					<td>{{index+1}}</td>
					<td :data-test="JSON.stringify(item)" v-for="(val,index2) in item">{{val.val | checkToTxt(val.key)}}</td>
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
  </div>
</template>


<script>
import Index from './js.js';
export default Index;
</script>

<style lang="scss" src="../style.scss"></style>
