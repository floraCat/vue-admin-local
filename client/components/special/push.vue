<!-- 发布（例：公告管理有此功能） -->
<template >

	<div style="display: inline">
		<!-- 开启发布btn -->	
		<a href="javascript:;" @click="pushItem()" :title="btnNameOn">
			<i class="fa fa-audio-description fa-lg"></i>
		</a>
		<!-- 关闭发布btn -->
		<a href="javascript:;" @click="pushendItem()" :title="btnNameOff">
			<i class="fa fa fa-star fa-lg"></i>
		</a>
	</div>

</template>

<script >
export default {
	data () {
		return {}
	},

	props: [
		'item',
		'btnNameOn',
		'btnNameOff'
	],

    computed: {
        api_push() { // 公告发布
            return `${this.API.url}/notice/push${this.API.suf}`
        },
        api_pushend() { // 关闭公告发布
            return `${this.API.url}/notice/pushend${this.API.suf}`
        },
    },

	methods: {

		// 发布
		pushItem() {
            let self = this
            self.axios({
                url: self.api_push,
                method: 'GET',
                params: {
                    id: self.item.id
                }
            }).then((res) => {
                console.log('发布')
                if (res.data.status === '') {
                    Funs.delCookie('xm_cookie')
                    window.location.href = ''
                }
                if (res.data.status === 'failure') {
                    console.log('错误提示：' + res.data.message)
                }
                if (res.data.status === 'success') {
                    console.log(res)
                    self.$emit("openModalPop","发布成功")
                }
            })
        },

        // 关闭发布
        pushendItem() {
            let self = this
            self.axios({
                url: self.api_pushend,
                method: 'GET',
            }).then((res) => {
                console.log('关闭发布')
                if (res.data.status === '') {
                    Funs.delCookie('xm_cookie')
                    window.location.href = ''
                }
                if (res.data.status === 'failure') {
                    console.log('错误提示：' + res.data.message)
                }
                if (res.data.status === 'success') {
                    console.log(res)
                    self.$emit("openModalPop","取消发布成功")
                }
            })
        },

	}
}
</script>