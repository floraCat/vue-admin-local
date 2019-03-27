<!-- 投放（例：广告投放有此功能） -->
<template >
	
	<a href="javascript:;" @click="delivery" :title="btnName">
	    <i class="fa fa-audio-description fa-lg"></i>
	</a>

</template>

<script >
export default {
	data () {
		return {}
	},

	props: [
		'item',
		'btnName'
	],

	methods: {

		// 广告投放
		delivery() {
	        let self = this
	        this.$router.push({
	            path: '/advertisement/ad_on/list',
	            query: {
	                addKey: 'adId',
	                addId: self.item.id,
	                addTxt: self.item.adName
	            }
	        })
	    },

	}
}
</script>