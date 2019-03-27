<!-- 远程更新（例：远程管理由此功能） -->
<template >
	
	<div style="display: inline;">
	
		<!--操作内的按键-->
		<a v-show="position === 1"
			href="javascript:;" 
			:class="{noClick:
				item.remoteStateBtn && item.remoteStateBtn[0] === 'off' || 
				item.remoteStateBtn && item.remoteStateBtn[0] === 'loading'}" 
			@click="processRemote(0,item)" 
			title="远程更新" 
		>
	        <i 
		        v-if="!item.remoteStateBtn || (item.remoteStateBtn && item.remoteStateBtn[0] != 'loading')" 
		        class="fa fa-podcast fa-lg"
	        ></i>
	        <i 
		        v-if="item.remoteStateBtn && item.remoteStateBtn[0] === 'loading'" 
		        class="fa fa-spinner"
	        ></i>
	    </a>

		<!--更新结果内的重试-->
		<a v-show="position === 2" 
		  style="display: block;" 
		  href="javascript:;" 
		  class="clickAble" 
		  :class="{noClick:
		    item.remoteStateBtn && item.remoteStateBtn[1] === 'off' || 
			item.remoteStateBtn && item.remoteStateBtn[1] === 'loading'}" 
		  title="点击重试" 
		  @click="processRemote(1,item)" 
		>
		  <s v-if="item.remoteStateBtn && item.remoteStateBtn[1] != 'loading'">点击重试</s>
		  <i v-if="item.remoteStateBtn && item.remoteStateBtn[1] === 'loading'" class="fa fa-spinner"></i>
		</a>

	  </div>

</template>

<script >
export default {
	data () {
		return {
			// 更新次数
			updateTime: 0
		}
	},

	props: [
		// 位置（1:在操作内 / 2:在返回结果内）
		'position',
		'api',
		'item'
	],

	methods: {

		/*远程更新*/
		processRemote(btnIndex,_item) {
			let self = this
			// 判断是否第一次更新
			if (_item.remoteStateBtn[0] === 'off') {
				this.updateTime = 1
			}
			if (_item.remoteStateBtn[btnIndex] === 'off' || _item.remoteStateBtn[btnIndex] === 'loading') {
				return false
			}
			if (this.updateTime === 0) {
				_item.remoteStateBtn.splice(0,1,'loading')
			} else {
				_item.remoteStateBtn.splice(1,1,'loading')
			}
			self.axios({
				url: self.api,
				method: 'POST',
				type: 'json',
				data: _item.id
			}).then((res) => {
				console.log('远程更新')
				console.log(res)
				if (res.data.status === '') {
                    Funs.delCookie('xm_cookie')
                    window.location.href = ''
                }
                if (res.data.status === 'failure') {
                    alert('错误提示：' + res.data.message)
                }
				if (res.data.status === 'success') {
					_item.remoteStatus = '1'
					this.updateTime ++
				}
			})
		},

	}
}
</script>