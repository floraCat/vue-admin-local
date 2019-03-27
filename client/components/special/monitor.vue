<!-- 监控（例：设备监控有此功能） -->
<template >
	
	<div style="display: inline">
		<!--监控主板-->
		<h4 v-if="position == 1" style="margin-right: 20px; background:#B88F51;" class="_title fr">
	      <a target="_blank" :href="API.url+'/freeboard/index.html'">
	        <i class="fa fa-star"></i>
	        监控主板
	      </a>
	    </h4>

		<!--单独监控-->
		<a v-if="position == 2" style="color: #B88F51;" href="javascript:;" @click="openPanel" title="打开监控面板">
			<i class="fa fa-stop-circle-o fa-lg"></i>
		</a>
	</div>

</template>

<script >
export default {
	data () {
		return {}
	},

	props: [
		// btn位置 1:表格上面 / 2:每条目操作栏内
		'position',
		'item',
	],

	methods: {

		// 打开面板
        openPanel() {
            let _url = `${this.API.url}/freeboard/monitor_device.html?tenantId=${this.item.tenantId}&boxName=${this.item.boxName}`
            window.open(_url)
        },




	}
}
</script>