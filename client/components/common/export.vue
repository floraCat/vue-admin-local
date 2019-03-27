<!-- 导出Excel（例：字典管理下一级菜单有此功能） -->
<template>
    <div class="index">
        <a id="downlink"></a>
      <h4 class="_title fr">
        <a href="javascript:;" @click="downloadFile()">
          <i class="fa fa-download"></i>
          导出全部
        </a>
      </h4>
      <h4 class="_title fr">
        <a href="javascript:;" @click="exportSelected()">
          <i class="fa fa-download"></i>
          导出已选
        </a>
      </h4>
      <span class="addToSelect added fr">已选导出条目数：<i v-text="selectedLen"></i></span>
    </div>
</template>

<script>
var XLSX = require('xlsx')
export default {
    name: 'Index',
    data() {
        return {
            outFile: '', // 导出文件el
            errorDialog: false, // 错误信息弹窗
            errorMsg: '', // 错误信息内容
            excelData: [],
            exportData: null,
            excelSelect: [], //每页勾选条目数组
            selectedLen: 0
        }
    },
    props: [
        'pageObj',
    ],
    computed: {
        api_export() {
            return `${this.API.url}/dic/exportexcel${this.API.suf}`
        },
    },
    mounted() {
        this.outFile = document.getElementById('downlink')
    },
    methods: {

        // 勾选
        addToSelect(_item,_index) {
            let self = this
            let _pageItems = this.excelSelect[this.pageObj.pageNo-1]
            if (!_pageItems || _pageItems.length <= 0) { //新的一页
                for (let x = 0; x < this.pageObj.pageNo; x ++) { // 没有过条目的当页
                    if (!this.excelSelect[x] || this.excelSelect[x].length <= 0) {
                        let _arr = []
                        this.excelSelect.push(_arr)
                    }
                }
                for (let j = 0; j < this.pageObj.pageSize; j ++) {
                    let _obj = {selected: false}
                    this.excelSelect[this.pageObj.pageNo-1].push(_obj)
                }
            }
            setTimeout(function () {
                if (_item.selected) {
                    self.$set(_item,'selected',false)
                    self.excelSelect[self.pageObj.pageNo-1][_index].selected = false
                    self.selectedLen --
                } else {
                    self.$set(_item,'selected',true)
                    self.excelSelect[self.pageObj.pageNo-1][_index] = _item
                    self.selectedLen ++
                }
            }, 100)               
        },

        // 遍历出所有已选的
        getSelected() {
            let _arr = []
            for (let i = 0; i < this.excelSelect.length; i ++) {
                let _list = this.excelSelect[i]
                for (let j = 0; j < _list.length; j ++) {
                    if (_list[j].selected) {
                        _arr.push(_list[j])
                    }
                }
            }
            return _arr
        },

        // 导出已选click
        exportSelected() {
            let self = this
            self.exportData = JSON.parse(JSON.stringify(this.getSelected()))
            setTimeout(function() {
                if (self.exportData.length <= 0) {
                    alert("已选条目为零，请选择后再执行导出")
                    return
                }
                let data = [{}]
                for (let k in self.exportData[0]) {
                    data[0][k] = k
                }
                data = data.concat(self.exportData)
                self.downloadExl(data, '菜单')
            }, 0)
        },

        // 导出全部click
        downloadFile: function() {
            let self = this
            if(confirm("确定要导出全部数据吗？共计条目数为："+this.pageObj.totalCount)) {
                setTimeout(function() {
                    self.axios({
                        url: self.api_export,
                        method: 'GET',
                        params: {
                            dicCode: self.$route.query.dicCode
                        }
                    }).then((res) => {
                        console.log('导出')
                        console.log(res)
                        self.exportData = res.data.list
                        self.exportData = self.exportData
                        let data = [{}]
                        for (let k in self.exportData[0]) {
                            data[0][k] = k
                        }
                        data = data.concat(self.exportData)
                        self.downloadExl(data, '菜单')
                    })
                }, 0)
            }
        },

        // 导出到excel
        downloadExl: function(json, downName, type) { 
            let keyMap = [] // 获取键
            for (let k in json[0]) {
                keyMap.push(k)
            }
            let arr = []
            arr.push(json[0])
            for (let i = 0; i < this.exportData.length; i++) {
                arr.push(this.exportData[i])
            }
            json = arr
            console.info('keyMap', keyMap, json)
            let tmpdata = [] // 用来保存转换好的json
            let _s2ab = function(s) { // 字符串转字符流
                var buf = new ArrayBuffer(s.length)
                var view = new Uint8Array(buf)
                for (var i = 0; i !== s.length; ++i) {
                    view[i] = s.charCodeAt(i) & 0xFF
                }
                return buf
            }
            let _getCharCol = function(n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
                let s = ''
                let m = 0
                while (n > 0) {
                    m = n % 26 + 1
                    s = String.fromCharCode(m + 64) + s
                    n = (n - m) / 26
                }
                return s
            }
            json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
                v: v[k],
                position: (j > 25 ? this._getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }))).reduce((prev, next) => prev.concat(next)).forEach(function(v) {
                tmpdata[v.position] = {
                    v: v.v
                }
            })
            let outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
            let tmpWB = {
                SheetNames: ['mySheet'], // 保存的表标题
                Sheets: {
                    'mySheet': Object.assign({},
                        tmpdata, // 内容
                        {
                            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
                        })
                }
            }
            let tmpDown = new Blob([_s2ab(XLSX.write(tmpWB, {
                        bookType: (type === undefined ? 'xlsx' : type),
                        bookSST: false,
                        type: 'binary'
                    } // 这里的数据是用来定义导出的格式类型
                ))], {
                    type: ''
                }) // 创建二进制对象写入转换好的字节流
            var href = URL.createObjectURL(tmpDown) // 创建对象超链接
            this.outFile.download = downName + '.xlsx' // 下载名称
            this.outFile.href = href // 绑定a标签
            this.outFile.click() // 模拟点击实现下载
            setTimeout(function() { // 延时释放
                URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
            }, 100)
        },

    }
}
</script>
