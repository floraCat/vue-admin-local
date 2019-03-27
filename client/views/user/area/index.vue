<template>
	<form-crud field="area_list" :items="items" :ables="ables" :apiObj="{
                edit: editApi,
                del : delApi,
                }" :noObj="{
                add : false,
                mod : false,
                del : false,
                search:true
                }" :pageObj="pageObj" @getItems="getItems"></form-crud>
</template>

<script>
	import formCrud from '../form/crud'
	import Field from './list_field'
	export default {

		components: {
			formCrud
		},

		data() {
			return {
				items: [{loading: true}],
				ables: [],
				pageObj: {}
			}
		},

		computed: {
			editApi() {
				return `${this.API.url}/area/save${this.API.suf}`
			},
			delApi() {
				return `${this.API.url}/area/delete${this.API.suf}`
			}
		},

		mounted: function() {
			this.getItems(1)
		},

		methods: {

			getItems(page, pageSize, searchOpt = {}) {
				let self = this
				let listObj = JSON.parse(JSON.stringify(searchOpt))
				listObj.pageNo = page
				listObj.pageSize = pageSize ? pageSize : 15
				self.axios({
					url: this.API.HOST + this.API.area.path + this.API.suf,
					method: this.API.area.type,
					params: listObj
				}).then((res) => {
					console.log('片区管理')
					console.log(res)
					if(res.data.status === '') {
						Funs.delCookie('xm_cookie')
						window.location.href = ''
					}
					if(res.data.status === 'failure') {
						console.log('片区管理错误提示：' + res.data.message)
					}
					if(res.data.status === 'success') {
						let list = res.data.page.list
						/*-----格式化数据 start------*/
						for(let i = 0; i < list.length; i++) {
							if(list[i].status) {
								list[i].status = parseInt(list[i].status)
							}
						}
						/*-----格式化数据 end------*/
						self.items = list
						self.checkField(list)
						self.pageObj = {
							pageNo: page,
							pageSize: res.data.page.pageSize,
							totalCount: res.data.page.totalCount,
							totalPage: res.data.page.totalPage,
						}
					}
				}).catch(error => {
					alert("网络异常，请重新操作")
				})
			},

			checkField(items) {
				for(var i = 0; i < items.length; i++) {
					this.$set(items[i], 'checked', false)
				}
				this.ables = Field(this)
			},

		}
	}
</script>
<style>
	.app-levelbar {
		margin-bottom: 30px;
	}
</style>