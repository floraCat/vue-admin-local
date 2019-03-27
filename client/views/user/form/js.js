const viewModal = resolve => require(['../../../components/common/view'], resolve);
const editModal = resolve => require(['../../../components/common/edit'], resolve);
const editModal2 = resolve => require(['../../../components/common/edit'], resolve);
const editModal3 = resolve => require(['../../../components/common/edit'], resolve);
const editModal4 = resolve => require(['../../../components/common/edit'], resolve);
const alertModal = resolve => require(['../../../components/common/alert'], resolve);
const conformModal = resolve => require(['../../../components/common/conform'], resolve);
const popModal = resolve => require(['../../../components/common/pop'], resolve);
const modalPopPage = resolve => require(['../../../components/common/popPage'], resolve);
const pagination = resolve => require(['../../../components/common/pagination'], resolve);
const modalBind = resolve => require(['../../../components/common/binding'], resolve);
const appExport = resolve => require(['../../../components/common/export'], resolve);
const appImport = resolve => require(['../../../components/common/import'], resolve);

const editModal_q = resolve => require(['../../../components/special/edit_question'], resolve);
const viewModal_custom = resolve => require(['../../../components/special/viewCustom'], resolve);

const remoteHandle = resolve => require(['../../../components/special/remote'], resolve);
const examineHandle = resolve => require(['../../../components/special/examine'], resolve);
const deliveryHandle = resolve => require(['../../../components/special/delivery'], resolve);
const pushHandle = resolve => require(['../../../components/special/push'], resolve);
const monitorHandle = resolve => require(['../../../components/special/monitor'], resolve);
const switchBySelHandle = resolve => require(['../../../components/special/switchBySel'], resolve);
const switchByClkHandle = resolve => require(['../../../components/special/switchByClk'], resolve);

import {
    mapGetters
}
from 'vuex'
import Datepicker from 'vue-bulma-datepicker'

export default {

    components: {
        modalView: viewModal,
        modalEdit: editModal,
        modalEdit2: editModal2,
        modalEdit3: editModal3,
        modalEdit4: editModal4,
        modalAlert: alertModal,
        modalConfirm: conformModal,
        modalPop: popModal,
        modalPopPage: modalPopPage,
        pagination: pagination,
        modalBind: modalBind,

        modalEditQ: editModal_q,
        modalViewCustom: viewModal_custom,

        appExport: appExport,
        appImport: appImport,
        datepicker: Datepicker,

        remoteHandle: remoteHandle, // 远程更新
        examineHandle: examineHandle, // 审核
        deliveryHandle: deliveryHandle, // 投放
        pushHandle: pushHandle, // 发布
        monitorHandle: monitorHandle, // 监控
        switchBySelHandle: switchBySelHandle, // 下拉切换（状态）
        switchByClkHandle: switchByClkHandle, // 点击切换（权限）
    },

    props: [
        'field',
        'items',
        'ables',
        'apiObj',
        'noObj',
        'pageObj',
        'specHandle',
        'spacComp',
    ],

    data() {
        return {
            checkAll: false,
            hasCheck: false,
            objEdit: {
                show: false,
                opts: {}
            },
            objEdit2: {
                show: false,
                opts: {}
            },
            objEdit3: {
                show: false,
                opts: {}
            },
            objEdit4: {
                show: false,
                opts: {}
            },
            objView: {
                show: false,
                opts: {}
            },
            objConfirm: {
                show: false,
                opts: {}
            },
            objAlert: {
                show: false,
                opts: {}
            },
            objPop: {
                show: false,
                opts: '提交成功'
            },
            objBind: {
                show: false,
                opts: {}
            },
            objFieldItems: {
                show: false,
                opts: {}
            },
            /*spec*/
            objEdit_q: {
                show: false,
                opts: {}
            },
            objView_custom: {
                show: false,
                opts: {}
            },
            /*搜索*/
            searchBlock: {
                submitObj: {}, // 用以提交搜索的值
                defObj: {}, // 保存默认值以便恢复
                itemObj: null // 全部搜索项
            },
            /*移动端操作下拉显隐*/
            handleOpen: [],
            /*传递到控件的数据*/
            transData: null,
            searchDate: '',
        }
    },

    computed: {

        ...mapGetters([
                'device',
            ]),

            // 列表数据处理
            listItems() {
                let arr = []
                for (let i = 0; i < this.ables.length; i++) {
                    if (this.ables[i].listAble) {
                        let obj = {}
                        obj.key = this.ables[i].key
                        obj.text = this.ables[i].label
                        obj.mobileKeep = this.ables[i].listAble_mobile
                        obj.padKeep = this.ables[i].listAble_pad
                        obj.specHandle = this.ables[i].specHandle
                        obj.editObj = this.ables[i].editObj
                        arr.push(obj)
                    }
                }
                return arr
            },

            isAdmin() {
                return parseInt(JSON.parse(Funs.getCookie('xm_cookie')).isadmin)
            },

    },

    mounted: function() {

        /*是否登录页面以便切换背景色*/
        if (this.$store.state.app.loginPage) {
            this.$store.commit({
                type: 'loginPage',
                loginPage: false
            })
        }

        /*操作的下拉框（移动端）*/
        for (let i = 0; i < this.items.length; i++) {
            this.$set(this.handleOpen, i, false)
        }

        /*url有指定参数时自动打开添加窗口，如广告管理的广告投放*/
        let _query = this.$route.query
        if (_query.addKey && _query.addId && _query.addTxt) {
            this.autoOpenEdit(_query.addKey, _query.addId, _query.addTxt)
        }

    },

    watch: {
        ables() {
            // 获取搜索项
            if (!this.searchBlock.itemObj) {
                this.searchHandle()
            }
        },
    },

    methods: {

        /*------------------- 添加 --------------*/
        addItem(callback) {
            let _ables = []
            for (let i = 0; i < this.ables.length; i++) {
                if (this.ables[i].addAble) { // 筛选可添加的字段
                    this.ables[i].value = this.ables[i].defVal === undefined ? '' : this.ables[i].defVal
                    _ables.push(this.ables[i])
                }
            }
            let _opts = {
                field: this.field,
                action: 'add',
                ables: _ables,
                api: this.apiObj.edit,
                index: -1, // -1为添加，有值为修改条目的索引
                dicId: this.$route.query.dicId || null, // 针对字典管理下级菜单
                // deliveryManagerId: this.$route.query.id || null, // ？？？
            }
            if (this.field === 'question') { // 针对问题库的编辑弹窗
                this.objEdit_q.opts = _opts
                this.objEdit_q.show = true
            } else {
                this.objEdit.opts = _opts
                this.openModalEdit()
            }
            if (callback && 'function' === typeof callback) {
                callback(this.ables)
            }
        },

        /*------------------- 修改 --------------*/

        modItem(index) {
            if (this.$store.state.app.device.isMobile) {
                this.closeHandle(index);
            }
            let _ables = []
            for (let i = 0; i < this.ables.length; i++) {
                if (this.ables[i].modAble) { // 筛选可修改的字段
                    /*----显示txt提交id start-----*/
                    if (this.ables[i].editObj && this.ables[i].editObj.requireArr && this.ables[i].editObj.formCtrl!='pageSelectCustom') {
                        this.ables[i].value = this.selectFilter(this.items[index], this.ables[i])
                    }
                    /*----显示txt提交id end-----*/
                    else {
                        this.ables[i].value = this.items[index][this.ables[i].key]
                    }
                    _ables.push(this.ables[i])
                }
            }
            let otherOpts = {}
            otherOpts.checked = this.items[index].checked
            otherOpts.selected = this.items[index].selected
            this.items[index].parents = this.getParent() // 父级
            let _opts = {
                field: this.field,
                action: 'modify',
                ables: _ables,
                api: this.apiObj.edit,
                id: this.items[index].id, // 要修改条目的id
                index: index,
                dicId: this.items[index].dicId || null, // 针对字典管理下级菜单
                specHandle: this.specHandle, // 特殊处理函数
                others: otherOpts
            }
            if (this.field === 'question') { // 针对问题库的编辑弹窗
                this.objEdit_q.opts = _opts
                this.objEdit_q.show = true
            } else {
                this.objEdit.opts = _opts
                this.openModalEdit()
            }
        },

        // listSelect & pageSelect 数据结构处理
        selectFilter(_item, _able) {
            let _ids = []
            let _txts = []
            let val = _item[_able.key]
            if (val && 'object' === typeof(val)) {
                if (val[0] && val[0].id === undefined) { // 数组元素是字符串
                    for (let x = 0; x < val.length; x++) {
                        _ids.push(val[x])
                        _txts.push(val[x])
                    }
                } else { // 数组元素是对象
                    for (let x = 0; x < val.length; x++) {
                        _ids.push(val[x]['id'])
                        _txts.push(val[x][_able.editObj.key2])
                    }
                }
            } else {
                _ids = [val]
                _txts = [_item[_able.editObj.key2]]
            }
            // 多个值，如listSelect
            return {
                ids: _ids,
                txts: _txts
            }
        },

        // 获取父级 （如：菜单管理的父级）
        getParent() {
            let parents = []
            for (let i = 0; i < this.items.length; i++) {
                let obj = {}
                if (this.items[i].hasChildNode) {
                    obj.id = this.items[i].id
                    obj.menuName = this.items[i].menuName
                    parents.push(obj)
                }
            }
            return parents
        },

        /*------------------- 编辑弹窗 --------------*/
        openModalEdit() {
            this.objEdit.show = true
        },

        closeModalEdit(index, data, editIndex) {
            let self = this
            /*添加上级条目弹窗 START*/

            if (this.objEdit_q.show) {
                this.objEdit_q.show = false // 针对问题库的编辑弹窗
            } else if (this.objEdit4.show) {
                this.objEdit4.show = false
            } else if (this.objEdit3.show) {
                this.objEdit3.show = false
            } else if (this.objEdit2.show) {
                this.objEdit2.show = false
            } else {
                this.objEdit.show = false
            }
            /*添加上级条目弹窗 END*/
            if (index !== undefined) {
                let _txt = ''
                // 修改
                if (index > -1) {
                    _txt = '修改成功'
                    this.$set(this.items, index, data)
                    // 保留原有导出勾选状态
                    if (this.specHandle === 'export' || this.specHandle === 'import') {
                        let _excel = this.$refs.excelHandle
                        if (data.selected) {
                            _excel.excelSelect[this.pageObj.pageNo-1][index] = data
                        }
                    }
                    if (this.field === 'remote') { //远程更新按键状态
                        this.items[index].remoteStateBtn = ['on','on']
                        this.$emit("checkStateRemote",this.items,index)
                    }
                }
                // 新增
                else {
                    _txt = '添加成功'
                    if (data) {
                        if (this.field === 'remote') { //远程更新按键状态
                            data.remoteStateBtn = ['on','on']
                        }
                        if (editIndex === 'edit_0') { // 添加上級條目不用把新條目渲染出來
                            this.items.unshift(data)
                        }
                        
                    }
                }
                this.objPop.opts = {txt:_txt}
                this.winPop()
            } else { // 直接關閉編輯彈窗
                setTimeout(function () {
                    if (self.specHandle === 'deliveryCallback') { //广告投放回調
                        self.$emit('closeCallback')
                    }
                }, 100)
            }
        },

        /*------------------- 删除 --------------*/
        delOpen (index) {
            let self = this
            this.winConfirm(1,'删除操作','您确定要删除此条目吗？',function () {
                if (!self.$store.state.app.sidebar.opened) {  // ......
                    self.closeHandle(index);
                }
                // 传参加字段
                let _opts = self.objConfirm.opts
                _opts.api = self.apiObj.del
                _opts.delIds = self.items[index].id.toString() // 此字段判断为删除操作
                _opts.indexs = index.toString()
                _opts.specHandle = self.specHandle // 特殊处理函数
            })
        },
        delClose(delIds) {
            let self = this
            this.objConfirm.opts.delIds = undefined
            this.winConfirm(0,'','',function () {
                if (delIds) {
                    let ids = delIds.split(',')
                    for (let i = 0; i < self.items.length; i++) {
                        for (let j = 0; j < ids.length; j++) {
                            if (parseInt(self.items[i].id) === parseInt([ids[j]])) {
                                self.items.splice(i, 1)
                            }
                        }
                    }
                    self.winPop("删除成功")
                }
            })
        },

        /*------------------- 明细 --------------*/
        viewItem(index) {
            if (!this.$store.state.app.sidebar.opened) {
                this.closeHandle(index);
            }
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
            let _opts = {
                action: 'view',
                ables: _ables,
                spacComp: this.spacComp || null,
                childAbles: _childAbles,
            }
            if (this.spacComp) { // 用到特殊展示模板（如：问题库，问卷）
                this.objView_custom.opts = _opts
                this.objView_custom.show = true
            } else {
                this.objView.opts = _opts
                this.openModalView()
            }
        },

        openModalView() {
            this.objView.show = true
        },

        closeModalView(index) {
            if (index != undefined) {
                this.items[index].confirm = 1
            }
            if (this.objView_custom.show) {
                this.objView_custom.show = false
            } else {
                this.objView.show = false
            }
        },

        /*------------------- pop弹窗 --------------*/
        winPop (txt) {
            let self = this
            if (txt) {
                self.objPop.opts = {
                    txt:txt
                }
            }
            setTimeout(function() {
                self.objPop.show = true
            }, 0)
            setTimeout(function() {
                self.objPop.show = false
                if (self.specHandle === 'deliveryCallback') { //广告投放回調
                    self.$emit('closeCallback')
                }
            }, 2000)
        },

        /*------------------- confirm弹窗 --------------*/
        winConfirm(action,ttl,msg,filter) {
            let self = this
            if (action) { //open
                this.objConfirm.opts = {
                    title: ttl || '提示',
                    txt: msg
                }
                if (filter && 'function' === typeof filter) {
                    filter() //过滤处理
                }
                self.objConfirm.show = true
            } else { //close
                self.objConfirm.show = false
                if (filter && 'function' === typeof filter) {
                    filter() //过滤处理
                }
            }                                
        },

        /*------------------- alert弹窗 --------------*/
        winAlert(action,msg) {
            let self = this
            if (action) { //open
                this.objAlert.opts = {
                    txt: msg,
                }
                self.objAlert.show = true
            } else { //close
                self.objAlert.show = false
            }    
        },

        /*------------------- 搜索 --------------*/
        search(opt) {
            let flag = 0
            for (let k in this.searchBlock.submitObj) {
                console.log(k)
                if (opt === 'all') { /*搜索恢复*/
                    flag = 1
                    if (this.field === 'cust') {
                        this.$refs.date[0].date = '' // 日期控件
                    }
                    if (k === 'createDate') {
                        this.searchBlock.itemObj[k].defOpt = JSON.parse(JSON.stringify(this.searchBlock.defObj[k])) || {
                            txt: 'all',
                            val: 'all'
                        }
                        this.searchBlock.submitObj[k] = JSON.parse(JSON.stringify(this.searchBlock.defObj[k])).val
                    } else if (k === 'proVersion') { // 只设备管理
                        if (this.searchBlock.itemObj['comArea'] && this.searchBlock.itemObj['comArea'].key) {
                            delete this.searchBlock.itemObj['comArea']
                            delete this.searchBlock.submitObj['comArea']
                        }
                        if (this.searchBlock.itemObj['seatNo'] && this.searchBlock.itemObj['seatNo'].key) {
                            delete this.searchBlock.itemObj['seatNo']
                            delete this.searchBlock.submitObj['seatNo']
                        }
                        if (this.searchBlock.itemObj['area'] && this.searchBlock.itemObj['area'].key) {
                            delete this.searchBlock.itemObj['area']
                            delete this.searchBlock.submitObj['area']
                        }
                        this.searchBlock.submitObj[k] = null
                        this.searchBlock.itemObj[k].defOpt.val = JSON.parse(JSON.stringify(this.searchBlock.defObj[k]))
                    } else if (k === 'pageNo') {
                        this.searchBlock.submitObj[k] = 1
                    } else if (k === 'pageSize') {
                        this.searchBlock.submitObj[k] = this.searchBlock.submitObj.pageSize
                    } else {
                        this.searchBlock.submitObj[k] = null
                        if (this.searchBlock.itemObj[k].defOpt) { // 下拉恢复默认值
                            this.searchBlock.itemObj[k].defOpt.val = JSON.parse(JSON.stringify(this.searchBlock.defObj[k]))
                        }
                    }
                } else {
                    if (k === 'createDate') {
                        this.searchBlock.submitObj[k] = this.searchBlock.itemObj[k].defOpt.val || 'all'
                    }
                    if (k === 'registerDate') {
                        let _rs = this.searchDate.split(' to ')
                        _rs = _rs.join(',')
                        this.searchBlock.submitObj[k] = _rs
                    }
                }
                if (this.searchBlock.submitObj[k]) {
                    flag = 1
                }
            }
            if (flag) {
                if (this.field === 'monitorlist') {
                    this.$emit('getItems', 1, this.searchBlock.submitObj.pageSize, this.searchBlock.submitObj, 1)
                } else {
                    this.$emit('getItems', 1, this.searchBlock.submitObj.pageSize, this.searchBlock.submitObj)
                }
            } else {
                if (this.field === 'extend' || this.field === 'monitorlist') { // 搜索字段无值时也触发搜索
                    this.$emit('getItems', 1, this.searchBlock.submitObj.pageSize)
                }
            }
        },

        /*搜索数据处理*/
        searchHandle() {
            let _search = this.searchBlock
            _search.itemObj = {}
            for (let i = 0; i < this.ables.length; i++) {
                if (this.ables[i].searchAble) {
                    let _able = this.ables[i]
                    // 搜索项
                    _search.itemObj[_able.key] = {}
                    _search.itemObj[_able.key]['key'] = _able.key
                    _search.itemObj[_able.key]['label'] = _able.label
                    _search.itemObj[_able.key]['opts'] = _able.searchObj && _able.searchObj.opts ? _able.searchObj.opts : null
                    _search.itemObj[_able.key]['defOpt'] = _able.searchObj && _able.searchObj.defOpt ? _able.searchObj.defOpt : null
                    // 搜索提交值
                    _search.submitObj[_able.key] = _able.searchObj && _able.searchObj.defOpt ? _able.searchObj.defOpt.val : null
                    // 搜索原有值，以便恢复
                    _search.defObj[_able.key] = JSON.parse(JSON.stringify(_search.itemObj[_able.key]['defOpt']))
                }
            }
        },

        /*搜索控件为下拉选项*/
        dataSelect(ev) {
            let self = this
            let selected = ev.target.value
            let _key = ev.target.getAttribute('data-key')
            let _txt = ev.target.getAttribute('data-txt')
            this.searchBlock.itemObj[_key].defOpt = {
                txt: _txt,
                val: selected
            }
            this.searchBlock.submitObj[_key] = selected
            if (this.field === 'box') { // 只设备管理
                let _temp = JSON.parse(JSON.stringify(this.searchBlock))
                if (selected === '1.0') {
                    if (_temp.itemObj['area'] && _temp.itemObj['area'].key) {
                        delete _temp.itemObj['area']
                        delete _temp.submitObj['area']
                    }
                    if (_temp.itemObj['seatNo'] && _temp.itemObj['seatNo'].key) {
                        delete _temp.itemObj['seatNo']
                        delete _temp.submitObj['seatNo']
                    }
                    _temp.submitObj['comArea'] = null
                    _temp.itemObj['comArea'] = {
                        label: '片区',
                        key: 'comArea',
                        defOpt: null
                    }
                } else if (selected === '2.1' || selected === '2.2') {
                    _temp.submitObj['comArea'] = null
                    _temp.itemObj['comArea'] = {
                        label: '片区',
                        key: 'comArea',
                        defOpt: null
                    }
                    _temp.submitObj['area'] = null
                    _temp.itemObj['area'] = {
                        label: '登机口',
                        key: 'area',
                        defOpt: null
                    }
                    _temp.submitObj['seatNo'] = null
                    _temp.itemObj['seatNo'] = {
                        label: '座位号',
                        key: 'seatNo',
                        defOpt: null
                    }
                } else {
                    if (_temp.itemObj['comArea'] && _temp.itemObj['comArea'].key) {
                        delete _temp.itemObj['comArea']
                        delete _temp.submitObj['comArea']
                    }
                    if (_temp.itemObj['seatNo'] && _temp.itemObj['seatNo'].key) {
                        delete _temp.itemObj['seatNo']
                        delete _temp.submitObj['seatNo']
                    }
                    if (_temp.itemObj['area'] && _temp.itemObj['area'].key) {
                        delete _temp.itemObj['area']
                        delete _temp.submitObj['area']
                    }
                }
                self.$set(self.searchBlock, 'itemObj', _temp.itemObj)
                self.$set(self.searchBlock, 'submitObj', _temp.submitObj)
            }
        },
        
        /*------------------- 单选 --------------*/
        checkSelect(index) {
            this.items[index].checked = !this.items[index].checked
            this.$set(this.items, index, this.items[index])
        },

        /*------------------- 多选 --------------*/
        selectAll() {
            this.checkAll = !this.checkAll
            for (let i = 0; i < this.items.length; i++) {
                if (this.checkAll) {
                    this.$set(this.items[i], "checked", true)
                } else {
                    this.$set(this.items[i], "checked", false)
                }
            }
            let arr = []
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].checked) {
                    arr.push(this.items[i])
                }
            }
        },

        /*------------------- 删除多个 --------------*/
        selectedDel() {
            let self = this
            let flag = 0
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].checked) {
                    flag = 1
                }
            }
            if (!flag) {
                this.winAlert(1,'请先选择要删除的条目！')
            } else {
                let delIds = []
                let indexs = []
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].checked) {
                        delIds.push(this.items[i].id)
                        indexs.push(i)
                    }
                }
                this.winConfirm(1,'删除操作','您确定要删除所选条目吗？',function () {
                    // 传参加字段
                    let _opts = self.objConfirm.opts
                    _opts.api = self.apiObj.del,
                    _opts.delIds = delIds.join(','), // 此字段判断为删除操作
                    _opts.indexs = indexs.join(',')
                })
            }
        },

        /*------------------- 分页 --------------*/
        changePage(pageNo, pageSize) {
            let self = this
            this.searchBlock.submitObj.pageNo = pageNo
            this.searchBlock.submitObj.pageSize = pageSize
            this.$emit('getItems', pageNo, pageSize, this.searchBlock.submitObj,function (_items) {
                // 判断是否已加入导出（字典管理下级菜单才会有此回调）
                setTimeout(function () {
                    let _excelSelect = self.$refs.excelHandle.excelSelect[self.pageObj.pageNo-1]
                    if (_excelSelect && _excelSelect.length > 0) {
                        for (let x = 0; x < _excelSelect.length; x++) {
                            if (_excelSelect[x].selected) {
                                self.$set(self.items[x],'selected',true)
                            } else {
                                self.$set(self.items[x],'selected',false)
                            }
                        }
                    }
                }, 300)                    
            })
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },

        /*------------------- 刷新 --------------*/
        refresh() {
            let _cur = this.searchBlock.submitObj
            this.$emit("refresh", _cur.pageNo, _cur.pageSize, _cur)
        },

        /*------------------- 绑定角色 | 绑定权限 --------------*/
        binding(index) {
            if (!this.$store.state.app.sidebar.opened) {
                this.closeHandle(index);
            }
            this.objBind.opts = {
                apiBindGet: this.apiObj.bindGet,
                apiBindPost: this.apiObj.bindPost,
                curName: this.items[index].userName ? this.items[index].userName : this.items[index].roleName,
                id: this.items[index].id,
                index: index
            }
            this.openModalBind()
        },
        openModalBind() {
            this.objBind.show = true
        },
        closeModalBind(index) {
            this.objBind.show = false
            if (index !== undefined) {
                this.winPop()
            }
        },

        /*------------------- 操作下拉项（手机端） --------------*/
        openHandle(index) {
            this.$set(this.handleOpen, index, true)
        },
        closeHandle(index) {
            this.$set(this.handleOpen, index, false)
        },

        /*------------------- 导入导出 --------------*/

        importList (_items) { // 导入后渲染
            this.$emit("importList", _items)
        },

        addToSelect (_item,_index) { // 勾选到导出
            this.$refs.excelHandle.addToSelect(_item,_index)
        },

        /*----------自动识别传参打开添加窗口----------*/
        autoOpenEdit(key, id, txt) {
            let self = this
            setTimeout(function() {
                self.addItem(function(_ables) {
                    for (let i = 0; i < _ables.length; i++) {
                        if (_ables[i].key === key) {
                            _ables[i].value = {
                                ids: [id],
                                txts: [txt]
                            }
                        }
                    }
                })
            }, 400)
        },

        /*----------listSelect等点选外同时可添加新条目----------*/
        addNewItem(apis) {
            let Field = require('../' + apis.field)
            let _ables = Field.default(apis)
            let ables = []
            for (let i = 0; i < _ables.length; i++) {
                if (_ables[i].addAble) {
                    let defVal = _ables[i].defVal === undefined ? '' : _ables[i].defVal
                    _ables[i].value = defVal
                    ables.push(_ables[i])
                }
            }
            let _opts = {
                    action: 'add',
                    ables: ables,
                    api: apis.editApi,
                    index: -1,
                    dicId: apis.dicId || null,
                    name: apis.name
                }
                // 多层嵌套添加弹窗
            if (!this.objEdit2.show) {
                this.objEdit2.show = true
                this.objEdit2.opts = _opts
            } else if (!this.objEdit3.show) {
                this.objEdit3.show = true
                this.objEdit3.opts = _opts
            } else {
                this.objEdit4.show = true
                this.objEdit4.opts = _opts
            }
        },

        /*-----------添加其他规格（同商品）---------*/
        addGoodsType(index) {
            let self = this
            self.addItem(function(ables) {
                window.addGoodsType = true
                for (let i = 0; i < ables.length; i++) {
                    let _key = ables[i].key
                    if (ables[i].editObj && ables[i].editObj.requireArr) { // 针对pageSelect
                        ables[i].value = self.selectFilter(self.items[index], ables[i])
                    } else {
                        if (_key === 'goodsType') {
                            ables[i].value = ''
                        } else if (_key === 'goodsPrice') {
                            ables[i].value = ''
                        } else {
                            ables[i].value = self.items[index][_key]
                        }
                    }
                }
                ables.goodsCode = self.items[index].goodsCode
            })
        },

        /*-----------点击查看字段下级条目（如商家管理的配送范围）---------*/
        popPage(id, title) {
            let self = this
            self.objFieldItems.opts = {
                url: self.apiObj.subItems,
                id: id,
                ables: self.ables,
                title: title
            }
            this.openModalPopPage()
        },
        openModalPopPage() {
            this.objFieldItems.show = true
        },
        closeModalPopPage() {
            this.objFieldItems.show = false
        },

        // 拉取最新数据（例：公众号关注）
        updateApp () {
            this.$emit('getItems', 1, this.searchBlock.submitObj.pageSize, {third:'yundai'})
        }

    },

}