<!-- 导出excel（例：订单统计和报表管理有此功能） -->
<template >
	
	<div style="display: inline;">
		<!--实际点击的按键-->
		<a @click="expExl()">{{btnName}}</a>
		<!--数据准备好触发导出的控件-->
		<a style="display: none;" :id="'btn_export'+index"></a>
		<!--导出Excel用的表格-->
		<table :id="'table_export'+index" style="display: none;">
          	<tr>
				<th v-if="result && result.head" v-for="opt in result.head" v-text="opt"></th>
			</tr>
			<tr v-if="result && result.list" v-for="(item0,index0) in result.list">
				<td v-for="item2 in item0" v-text="item2"></td>
			</tr>
        </table>
	</div>

</template>

<script >
const xlsdata = require('../../assets/js/xlsdata.js'); 
export default {
	data () {
		return {
			result: {},
			fileNameRs: null
		}
	},

	props: [
		'index',
		'btnName',
		'fileName'
	],

	methods: {

        // 导出excel
        expExl () {
        	let self = this
        	this.$emit('insertNew',self.index,function (res,fileNameAdd) {
        		self.result = res
        		setTimeout(function () {
	                xlsdata.default.expExl('table_export'+self.index,'btn_export'+self.index,self.fileName + ' ' + (fileNameAdd ? fileNameAdd : ''))
	            }, 500)
        	})
        },

	}
}
</script>