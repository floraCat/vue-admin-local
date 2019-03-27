<!-- 审查（例：广告管理之前有做测试demo） -->
<template >
	
	<a href="javascript:;" @click="confirmItem(index)" title="审核">{{btnName}}</a>

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
		'btnName',
		'api',
		'item'
	],

	methods: {

        /*广告审核test*/
        confirmItem(index) {
            let self = this
            let _ables = []
            let _childAbles = [] // 下级（弹窗）
            for (let i = 0; i < this.ables.length; i++) {
                if (this.ables[i].viewAble && !this.ables[i].isChild) {
                    for (let k in this.items[index]) {
                        if (this.ables[i].key === k) {
                            if (this.ables[i].viewObj && this.ables[i].viewObj.hasChild) {
                                /*----下级处理 [如boxes] start----*/
                                let _this = this.items[index][k]
                                let arr = []
                                if (_this && _this.length) {
                                    for (let x = 0; x < _this.length; x++) {
                                        arr.push(_this[x][this.ables[i].viewObj.key2])
                                        let temp = []
                                        let _ables = JSON.parse(JSON.stringify(this.ables))
                                        for (let _i = 0; _i < _ables.length; _i++) {
                                            if (_ables[_i].isChild) {
                                                for (let _k in _this[x]) {
                                                    if (_ables[_i].key === _k) {
                                                        _ables[_i].value = _this[x][_k]
                                                    }
                                                }
                                                temp.push(_ables[_i])
                                            }
                                        }
                                        _childAbles.push(temp)
                                    }
                                    this.ables[i].value = arr
                                }
                                /*----下级处理 end----*/
                            } else {
                                this.ables[i].value = this.items[index][k]
                            }
                        }
                    }
                    _ables.push(this.ables[i])
                }
            }
            this.objView.opts = {
                action: 'view',
                ables: _ables,
                confirm: true,
                index: index
            }
            this.openModalView()
        },

	}
}
</script>