<template>
  <div class="reportSheet">
  	<!--选项框-->
  	<div class="top0">
		<div class="mySelect">
	        <div class="sheetFilter">
	            <form-page-select
	            	  v-if="showSelect"
	                  :able="publicAble"
	                ></form-page-select>
	        </div>
	  		<div class="conf myBtn"><a class="em" href="javascript:;" @click="confirmTop()">确定</a></div>
	  	</div>
  	</div>
  	<!--公众号基本信息-->
	<div class="main">
		<div class="tableSheet sheet1">
			<table class="table1">
				<tr>
					<td>公众号名称</td>
					<td>{{publicObj.publicNo}}</td>
				</tr>
				<tr>
					<td>投放期限</td>
					<td>{{publicObj.addedDate}} 至 {{publicObj.offDate}}</td>
				</tr>
				<tr>
					<td>已关注粉丝量</td>
					<td>{{publicObj.subAmount}}</td>
				</tr>
				<tr>
					<td>账户余额</td>
					<td>{{publicObj.remainPay}}</td>
				</tr>
			</table>
			<a class="more" href="javascript:;" @click="showAll()">明细</a>
		</div>
		<div class="handle">
			<div class="myBtn"><a href="javascript:;" @click="createTenantSheet()">生成机场报表</a></div>
			<p class="note">注意：仅当投放时间结束才能生成机场报表</p>
		</div>
	</div>
	<!--筛选列表-->
	<div class="list">
		<div class="filter">
			<div class="myTime">
	          <div class="control">
	            <span>起始：</span>
	            <datepicker ref="dateBegin" v-model="times.begined" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
	              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
	            </datepicker>
	          </div>
	          <div class="control">
	            <span>终止：</span>
	            <datepicker ref="dateEnd" v-model="times.ended" placeholder="请点选日期" :inputClass="{ test: true }" :config="{ wrap: true, dateFormat: 'Y-m-d' }" readonly>
	              <a class="button" data-toggle><i class="icon fa fa-calendar"></i></a>
	            </datepicker>
	          </div>
	          <div class="myBtn"><a class="em" href="javascript:;" @click="confirmList()">点击查询</a></div>
	        </div>
		</div>
		<div class="tableSheet sheet2" v-if="itemsFilter.length > 0">
			<table class="table2">
				<tr v-if="index === 0" v-for="(item,index) in itemsFilter">
					<th v-for="(ttl,index1) in item">{{ttl.ttl}}</th>
					<th>操作</th>
				</tr>
				<tr v-for="(item,index) in itemsFilter">
					<td v-for="(val,index2) in item">{{val.val | priceFormat(val.key)}}</td>
					<td><a href="javascript:;" @click="showDay(0,index)">详情</a></td>
				</tr>
			</table>
		</div>
		<div class="tableSheet sheet2" v-if="itemsFilter.length <= 0">
			<p class="noCont">最近一周没有数据哦~</p>
		</div>
		<pagination 
        v-if="pageObj[0] && itemsFilter.length > 0"
        :transData="pageObj[0]" 
        :wrapIndex="0"
        @changePage="changePage"
      ></pagination>
	</div>
	<!--弹窗：明细报表-->
	<div class="popWinSheet" ref="listAll" :class="{open:openSheet[1]}">
		<div class="bg"></div>
		<div class="wrap listAll">
			<div class="top">
				<a class="lt" href="javascript:;" @click="back(1)">返回</a>
				<p class="rt">以下为品牌商数据的明细报表</p>
			</div>
			<div class="hd">
				<div class="ttl">公众号名称：<span>{{curAppName}}</span></div>
				<export
					class="myBtn fr"
					@insertNew="insertNew"
					index="1"
					:fileName="'明细报表-'+curAppName"
					btnName="导出数据"
				>
				</export>
			</div>
			<div class="tableSheet sheet3" ref="tableAll" v-if="itemsAll.length > 0">
				<table class="table2">
					<tr v-if="index === 0" v-for="(item,index) in itemsAll">
						<th v-for="(ttl,index1) in item">{{ttl.ttl}}</th>
						<th>操作</th>
					</tr>
					<tr v-for="(item,index) in itemsAll">
						<td v-for="(val,index2) in item">{{val.val | priceFormat(val.key)}}</td>
						<td><a href="javascript:;" @click="showDay(1,index)">详情</a></td>
					</tr>
				</table>
			</div>
			<div class="tableSheet sheet3" v-if="itemsAll.length <= 0">
				<p class="noCont">暂时还没有数据哦~</p>
			</div>
			<pagination 
		        v-if="pageObj[1] && itemsAll.length > 0"
		        :transData="pageObj[1]" 
		        :wrapIndex="1"
		        @changePage="changePage"
		      ></pagination>
		</div>
	</div>
	<!--弹窗：单日报表-->
	<div class="popWinSheet" ref="listDay" :class="{open:openSheet[2]}">
		<div class="bg"></div>
		<div class="wrap listDay">
			<div class="top">
				<a class="lt" href="javascript:;" @click="back(2)">返回</a>
				<p class="rt">以下为品牌商数据的单日报表</p>
			</div>
			<div class="hd">
				<div class="ttl">公众号名称：<span>{{curAppName}}</span></div>
				<div class="ttl">日期：{{curDay}}</div>
				<export
					class="myBtn fr"
					index="2"
					@insertNew="insertNew"
					:fileName="'单日报表-'+curAppName"
					btnName="导出数据"
				>
				</export>
			</div>
			<div class="tableSheet sheet3" ref="tableDay">
				<table class="table2">
					<tr v-if="index === 0" v-for="(item,index) in itemsDay">
						<th>序号</th>
						<th v-for="(ttl,index1) in item">{{ttl.ttl}}</th>
					</tr>
					<tr v-for="(item,index) in itemsDay">
						<td>{{index+1}}</td>
						<td v-for="(val,index2) in item">{{val.val | checkToTxt(val.key)}}</td>
					</tr>
				</table>
			</div>
			<pagination 
		        v-if="pageObj[2]"
		        :transData="pageObj[2]" 
		        :wrapIndex="2"
		        @changePage="changePage"
		      ></pagination>
		</div>
	</div>
  </div>
</template>


<script>
import Index from './js.js';
export default Index;
</script>

<style lang="scss" src="../style.scss"></style>
