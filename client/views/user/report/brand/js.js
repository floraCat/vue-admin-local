import Datepicker from 'vue-bulma-datepicker'
import Field from './list_field'
const pagination    = resolve => require(['../../../../components/common/pagination'], resolve);
const formPageSelect    = resolve => require(['../../../../components/common/form/pageSelect'], resolve);
const export2    = resolve => require(['../../../../components/common/export2'], resolve);
  
export default {

  	components: {
      formPageSelect,
      Datepicker,
      pagination    : pagination,
      export : export2
    },

    data () {
    	return {
            // 默认appId
            defAppId:'wxe75550255c42045f', 
            //接口-公众号信息
    		api_public: `${this.API.url}/sub/list${this.API.suf}`,
            //接口-公众号每天列表
            api_list_filter: `${this.API.url}/customer/stat${this.API.suf}`,
            //接口-某天粉丝列表
    		api_list_day: `${this.API.url}/customer/listbydate${this.API.suf}`,
            //当前公众号
            curAppId: null,
            curAppName: null,
            //公众号点选显隐
            showSelect: false,
            //公众号pageSelect对象
            publicAble: {
                "key":"appid",
                "value":{
                    ids: [],
                    txts: []
                },
                "editObj":{ // 点选参数
                    "formCtrl":"pageSelect",
                    "label2":"公众号",
                    "optValField": "appid",
                    "requireArr":[{"api":`${this.API.url}/sub/list${this.API.suf}`,optArr: [{key:'publicNo', ttl: '公众号名称：'},{key:'appid', ttl: 'appID：'}]}]
                }
            },
            //公众号信息
    		publicObj: {},
            //公众号筛选列表
            itemsFilter: [],
            //公众号明细列表
    		itemsAll: [],
            // 每天粉丝列表
    		itemsDay: [],
            // 当前日期
            curDay: null,
            // 两弹窗显隐 明细报表 & 每日报表
    		openSheet: [false,false,false],
            ables: null,
            // 各导出Excel用的对象
            exlResult: [[],[],[]],
    		// 时间选择
	        times: {begined: window.Funs.getDate(new Date(), 'date', -7), ended: window.Funs.getDate(new Date(), 'date', 0)},
	        // 分页
	        pageObj: [
	          {"pageNo":1,"pageSize":15,"totalCount":0,"totalPage":1}, // itemsFilter
              {"pageNo":1,"pageSize":15,"totalCount":0,"totalPage":1}, // itemsAll-明细
	          {"pageNo":1,"pageSize":15,"totalCount":0,"totalPage":1} // itemsDay-每日
	        ],
            
    	}
    },

    computed: {
        JSONpublicAble () {
            return JSON.stringify(this.publicAble)
        }
    },

    mounted: function (){

        let self = this

        // 各表格要显示的字段
        this.ables = []
        this.ables.push(Field.listFilter())
        this.ables.push(Field.listFilter())
        this.ables.push(Field.listDay())

        document.body.appendChild(self.$refs.listAll) // 便于fixed定位，明细报表弹窗
        document.body.appendChild(self.$refs.listDay) // 便于fixed定位，每日报表弹窗

        // 默认查询某公众号
        this.curAppId = this.defAppId
        this.confirmTop()

    },

    watch: {
        // 公众号选项框change后更新变量
        JSONpublicAble (val) {
            let _curAppId = JSON.parse(val) && JSON.parse(val).value && JSON.parse(val).value.ids[0]
            if (_curAppId) {
                this.curAppId = _curAppId
            } 
        },
    },

    methods: {

        // 公众号查询
        confirmTop () {
            let self = this
            this.getPublic(function (_obj) {
                self.timeRange(_obj.addedDate,_obj.offDate)
                self.exlResult = [[],[],[]]
                setTimeout(function () {
                    self.getList(0,null,function (_list) {
                        self.itemsFilter = self.filterAble(_list,self.ables[0])
                    })
                }, 0)
            })
        },

        // 计算最佳筛选时间范围
        timeRange (_begined, _ended) {
            let _max = 7*24*60*60*1000
            let _today = new Date().getTime()
            let _begin = _begined ? new Date(_begined).getTime() : window.Funs.getDate(new Date(),'date',-7)
            let _end = _ended ? new Date(_ended).getTime() : window.Funs.getDate(new Date(),'date',0)
            let rsBegin,rsEnd
            if (_begin > _today) { return } // 还没开始            
            rsEnd = (_end > _today) ? _today : _end // 筛选的最后一天
            rsBegin = ((rsEnd - _begin) > _max) ? (rsEnd - _max) : _begin // 筛选的第一天
            this.times.begined = window.Funs.getDate(new Date(rsBegin), 'date', 0)
            this.times._ended = window.Funs.getDate(new Date(rsEnd), 'date', 0)
            this.$refs.dateBegin.date = this.times.begined // 日期控件赋值
            this.$refs.dateEnd.date = this.times._ended
        },

        // 生成机场报表
        createTenantSheet () {
            alert('此功能未开放！')
        },

        // 打开每天粉丝列表
        showDay (tableIndex,itemIndex) {
            let self = this
            let _list = tableIndex === 1 ? this.itemsAll : this.itemsFilter
            let _day = _list[itemIndex][0].val;
            this.curDay = _day
            this.getDay(_day,null,function (_list) {
                self.itemsDay = self.filterAble(_list,self.ables[2])
                document.body.style.overflow = 'hidden'
                self.openSheet.splice(2,1,true)
                setTimeout(function () {
                    // table高度
                    self.$refs.tableDay.style.height = (self.$refs.listDay.clientHeight - 260) + 'px'
                },200)
            })
        },

        // 打开明细报表
        showAll () {
            let self = this
            this.getList(1,null,function (_list) {
                self.itemsAll = self.filterAble(_list,self.ables[1])
                document.body.style.overflow = 'hidden'
                self.openSheet.splice(1,1,true)
                if (_list.length > 0) {
                    setTimeout(function () {
                        // table高度
                        self.$refs.tableAll.style.height = (self.$refs.listAll.clientHeight - 260) + 'px'
                    },200)
                }
            })
        },

        // 查询筛选报表
        confirmList () {
            let self = this
            this.getList(0,null,function (_list) {
                self.itemsFilter = self.filterAble(_list,self.ables[0])
            })
        },

    	// 获取公众号信息
    	getPublic (callback) {
    		let self = this;
    		self.axios({
    			url: self.api_public,
    			method: 'GET',
    			params: {
    				pageNo: 1,
    				pageSize: 7,
    				appid: self.curAppId
    			}
    		}).then((res)=>{
                if (res.data.status === 'failure') {
                    alert('后台报错：' + res.data.message)
                }
                if (res.data.status === 'success') {
                    console.log('公众号信息')
                    console.log(res)
                    let _obj = res.data.page.list[0]
                    self.publicObj = _obj
                    self.curAppName = _obj.publicNo
                    self.publicAble.value = {
                        ids: [_obj.appid],
                        txts: [_obj.publicNo],
                    }
                    self.showSelect = true
                    if (callback) {callback(_obj)}
                }
    		})
    	},

        // 获取筛选列表 & 明细列表
        getList (index,_page,callback) {
            let self = this;
            let _curPageObj = JSON.parse(JSON.stringify(self.pageObj[index]))
            var _submitData = {}
            _submitData.pageNo = _page ? _page : _curPageObj.pageNo
            _submitData.pageSize = _curPageObj.pageSize
            _submitData.appid = self.curAppId
            if (index === 1) { // 明细列表
                _submitData.begined = self.publicObj.addedDate && self.publicObj.addedDate.substr(0,10)
                _submitData.ended = self.publicObj.offDate && self.publicObj.offDate.substr(0,10)
            } else { // 筛选列表
                _submitData.begined = self.times.begined
                _submitData.ended = self.times.ended
            }
            self.axios({
                url: self.api_list_filter,
                method: 'GET',
                params: _submitData
            }).then((res)=>{
                if (res.data.status === 'failure') {
                    alert('后台报错：' + res.data.message)
                }
                if (res.data.status === 'success') {
                    console.log('公众号每天列表')
                    console.log(res)
                    self.pageObj[index].totalPage = res.data.page.totalPage
                    self.pageObj[index].totalCount = res.data.page.totalCount
                    let _list = res.data.page.list
                    if (callback) {callback(_list)}
                }
            })
        },

        // 获取每天粉丝列表
        getDay (_day,_page,callback) {
            let self = this
            let _curPageObj = JSON.parse(JSON.stringify(self.pageObj[2]))
            var _submitData = {}
            _submitData.pageNo = _page ? _page : _curPageObj.pageNo
            _submitData.pageSize = _curPageObj.pageSize
            _submitData.appid = self.curAppId
            _submitData.registerDate = _day
            self.axios({
                url: self.api_list_day,
                method: 'GET',
                params: _submitData
            }).then((res)=>{
                if (res.data.status === 'failure') {
                    alert('后台报错：' + res.data.message)
                }
                if (res.data.status === 'success') {
                    console.log('每天粉丝列表')
                    console.log(res)
                    self.pageObj[2].totalPage = res.data.page.totalPage
                    self.pageObj[2].totalCount = res.data.page.totalCount
                    let _list = res.data.page.list
                    if (callback) {callback(_list)}
                }
            })
        },

        // 过滤出sheet的字段
        filterAble (_list,_ables) {
            let _rs = []
            for (let i = 0; i < _list.length; i ++) {
                _rs[i] = []
                for (let a = 0; a < _ables.length; a ++) {
                    let _flag = 0
                    for (let x in _list[i]) {
                        if (_ables[a].key === x) {
                            _flag = 1
                            _rs[i].push({
                                key: _ables[a].key,
                                ttl: _ables[a].label,
                                val: _list[i][x]
                            })
                            break
                        }
                    }
                    if (!_flag) {
                        _rs[i].push({
                            key: _ables[a].key,
                            ttl: _ables[a].label,
                            val: null
                        })
                    }
                }
            }
            return _rs
        },

        // 导出excel需把所有数据加进隐形的table
        insertNew (index,callback) {
            let self = this
            index = parseInt(index)

            let _action = function (_list,_ttls) { // 执行导出
                let _rs8 = {}
                _rs8.list = JSON.parse(JSON.stringify(_list))
                _rs8.head = _ttls
                if (callback && 'function' === typeof callback) {
                    callback(_rs8)
                }
            }

            let _exlResult = self.exlResult[index]
            if (_exlResult.length > 0) { // 已经导出过没变的不用重新请求后台
                _action(_exlResult,self.titles[index])
                return
            }

            _exlResult = []
            let _page = this.pageObj[index].totalPage || 1
            let _able = self.ables[index]

            // 初始总计数组
            let _sumArr = []
            for (let i = 0; i < _able.length; i ++) {
                if (i === 0) { _sumArr[i] = '合计：';}
                else {
                    if (_able[i].handle === 'sum') { // 需要统计的字段
                        _sumArr[i] = 0
                    } else { _sumArr[i] = null}
                }
            }

            let _eachHandle = function (_exlRs,_list) { // 每请求一页的回调处理
              for (let i = 0; i < _list.length; i ++) {
                  let _rs = [] // 筛选出要下载的字段
                  for (let a = 0; a < _able.length; a ++) {
                      let _flag = 0
                      for (let x in _list[i]) {
                          if (_able[a].key === x) {
                              _flag = 1
                              _rs.push(_list[i][x])
                              if (a) { // 排除=0的
                                 // 数量统计
                                _sumArr[a] = (_list[i][x] && _sumArr[a] != null) ? (_sumArr[a] + parseInt(_list[i][x])) : _sumArr[a]
                              }
                              break
                          }
                      }
                      if (!_flag) { _rs.push(null) } // able有而list没有
                  }
                  _exlRs.push(_rs)
              }
            }

            let _index = JSON.parse(JSON.stringify(_page))
            if (index == 2) { // 每天报表
                for (var i = 1; i <= _page; i ++) {
                    this.getDay(this.curDay,i,function (_list) { // 逐页请求
                        _eachHandle(_exlResult,_list)
                        _index --
                    })
                }
            } else { // 明细报表
                for (var i = 1; i <= _page; i ++) {
                    this.getList(index,i,function (_list) { // 逐页请求
                        _eachHandle(_exlResult,_list)
                        _index --
                    })
                }
            }
          
            window._setIn = setInterval( function() { // 500ms检测一次是否已经获取完成
              if (_index === 0) {
                  if (_exlResult.length > 0) { // 有条目才执行导出
                      _exlResult.push(_sumArr) // 总计放底部
                      self.exlResult[index] = _exlResult
                      let _ttls = []
                      for (let x = 0; x < _able.length; x ++) {
                        _ttls.push(_able[x].label)
                      }
                      _action(_exlResult,_ttls,self.curDay)
                  } else {
                      alert('没有数据可以导出哦~')
                  }
                  clearInterval(_setIn)
              }
            }, 500)

        },

    	// 返回
    	back (index) {
    		this.openSheet.splice(index,1,false)
            this.pageObj[index].pageNo = 1
            this.curDay = null
            let _flag = 0
            for (let i = 0; i < this.openSheet.length; i ++) {
                if (this.openSheet[i]) {
                    _flag = 1
                    break;
                }
            }
            if (!_flag) { // 没有弹窗时恢复滚动条
                document.body.style.overflow = 'auto'
            }
    	},

        // 换页
        changePage () {
            let self = this
            let _args = arguments
            if (_args[2] === 0) { // 筛选报表
                this.getList(_args[2],_args[0],function (_list) {
                    self.itemsFilter = self.filterAble(_list,self.ables[0])
                    self.pageObj[0].pageNo = _args[0]
                })
            }
            if (_args[2] === 1) { // 明细报表
                this.getList(_args[2],_args[0],function (_list) {
                    self.itemsAll = self.filterAble(_list,self.ables[1])
                    self.pageObj[1].pageNo = _args[0]
                })
            }
            if (_args[2] === 2) { // 每天报表
                this.getDay(this.curDay,_args[0],function (_list) {
                    self.itemsDay = self.filterAble(_list,self.ables[2])
                    self.pageObj[2].pageNo = _args[0]
                })
            }
        },

    },

    /*过滤器*/
    filters: {
        // 价格规格
        priceFormat: function (val,label) {
            if (label === 'fansUnitPrice' || label === 'costMoney') {
                return val + '元'
            } else {
                return val
            }
        }
    }

}