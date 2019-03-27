<!-- 选择切换（例：O2O订单管理有此功能） -->
<template >

	<div class="selectAble">
      <select @change="selectStatus($event)">
        <option v-for="status in opts" :value="status.code" :selected="status.code===parseInt(item.orderStatus)">{{status.txt}}</option>
      </select>
    </div>

</template>

<script >
export default {
	data () {
		return {
            opts: [{
                    code: 100,
                    txt: '待付款'
                }, {
                    code: 101,
                    txt: '支付失败'
                }, {
                    code: 102,
                    txt: '已取消'
                }, {
                    code: 103,
                    txt: '订单失效'
                },
                // {code: 104, txt: '待商家审核'},
                // {code: 105, txt: '退款成功'},
                // {code: 200, txt: '付款成功'},
                {
                    code: 300,
                    txt: '商家已接单'
                },
                // {code: 303, txt: '待配送员取餐'},
                {
                    code: 400,
                    txt: '配送员取餐中'
                }, {
                    code: 401,
                    txt: '配送中'
                },
                // {code: 403, txt: '商家取消了订单'},
                {
                    code: 500,
                    txt: '已完成'
                },
            ],
        }
	},

	props: [
		'item',
	],

    computed: {
        api_switch() {
            return `${this.API.url}/customerorder/update${this.API.suf}`
        },
    },

	methods: {

		// 选择切换状态
	   selectStatus(ev) {
            let self = this
            self.axios({
                url: self.api_switch,
                method: 'POST',
                data: {
                    orderCode: self.item.orderCode,
                    orderStatus: ev.target.value
                }
            }).then((res) => {
                console.log('状态切换')
                if (res.data.status === '') {
                    Funs.delCookie('xm_cookie')
                    window.location.href = ''
                }
                if (res.data.status === 'failure') {
                    console.log('错误提示：' + res.data.message)
                }
                if (res.data.status === 'success') {
                    console.log(res)
                    alert('状态切换成功')
                    self.item.orderStatus = ev.target.value
                }
            })
        },

	}
}
</script>