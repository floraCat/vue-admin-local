<!-- 点击切换 -->
<template >

    <div style="display: inline">

        <!--切换状态（例：商品管理有此功能）-->
        <a href="javascript:;" class="clickAble" title="点击切换" 
            v-if="label === 'goodsStatus'"
            @click="switchStatus"
        >
            {{item[label] | checkToTxt(label) }}
        </a>

        <!--切换权限（例：旅客管理有此功能）-->
        <a href="javascript:;" class="clickAble" title="点击更改"
            v-if="label === 'permissionsId'"
            @click="switchRole"
        >
            {{item[label] ? '有权限' : '没权限' }}
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
        'label',
        'api',
	],


	methods: {

		/*-----------点击切换权限---------*/
        switchRole() {
            let self = this
            let txt = !self.item.permissionsId ? '您确定对此用户添加操作权限吗？' : '您确定对此用户撤销操作权限吗？'
            let _permissionsId = !self.item.permissionsId ? 'box_data_report' : ''
            let r = confirm(txt);
            if (r == true) {
                self.axios({
                    url: self.api,
                    method: 'post',
                    data: {
                        permissionsId: _permissionsId,
                        id: self.item.id
                    }
                }).then((res) => {
                    console.log('操作权限返回');
                    console.log(res);
                    if (res.data.status === '') {
                        Funs.delCookie('xm_cookie')
                        window.location.href = ''
                    }
                    if (res.data.status === 'failure') {
                        console.log('错误提示：' + res.data.message)
                    }
                    if (res.data.status === 'success') {
                        self.item.permissionsId = self.item.permissionsId ? 0 : 1;
                    }
                })
            }
        },

        /*-----------点击切换状态---------*/
        switchStatus() {
            let self = this;
            console.log("上下架切换状态：");
            console.log(self.item)
            let txt = self.item.goodsStatus ? '您确定要下架此商品吗？' : '您确定要上架此商品吗？'
            let r = confirm(txt);
            if (r == true) {
                self.axios({
                    url: self.api,
                    method: 'get',
                    params: {
                        goodsId: self.item.id
                    }
                }).then((res) => {
                    console.log('上下架状态切换后台返回数据');
                    console.log(res);
                    if (res.data.status === '') {
                        Funs.delCookie('xm_cookie')
                        window.location.href = ''
                    }
                    if (res.data.status === 'failure') {
                        console.log('错误提示：' + res.data.message)
                    }
                    if (res.data.status === 'success') {
                        self.item.goodsStatus = self.item.goodsStatus ? 0 : 1;
                    }
                })
            }
        },

	}
}
</script>