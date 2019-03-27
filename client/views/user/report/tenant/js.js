import Datepicker from 'vue-bulma-datepicker'
const pagination    = resolve => require(['../../../../components/common/pagination'], resolve);
const formPageSelect    = resolve => require(['../../../../components/common/form/pageSelect'], resolve);
import Field from './list_field'
  
export default {

  	components: {
      formPageSelect,
      Datepicker,
      pagination    : pagination,
    },

    data () {
    	return {
    		api_public: `${this.API.url}/sub/list${this.API.suf}`,
            api_list_filter: `${this.API.url}/xxx_tenant_list/list${this.API.suf}`,
    		api_list_day: `${this.API.url}/cust/list${this.API.suf}`,
    		curAppId: 'BAIDUAIRPORT',
            // 公众号
            showSelect: false,
            curAppName: '广州白云机场',
            curDay: null,
    		// publicDrop: false,
            // maskShow: false,
    		publicObj: {
                airportName: '广州白云机场',
                customer_amount: 3000,
                account_balance: '100.00元'
            },
            itemsFilter: [
                [
                    {ttl:'日期', val:'2018-05-17'},
                    {ttl:'粉丝量', val: 30},
                    {ttl:'粉丝单价', val: '1.0元'},
                    {ttl:'补量成本', val: '0.2元'},
                    {ttl:'分成比例', val: '30%'},
                    {ttl:'单客分成金额', val: '0.4元'},
                    {ttl:'分成金额', val: '12.0元'},
                ]
            ],
    		itemsAll: [
                [
                    {ttl:'日期', val:'2018-05-17'},
                    {ttl:'粉丝量', val: 30},
                    {ttl:'粉丝单价', val: '1.0元'},
                    {ttl:'补量成本', val: '0.2元'},
                    {ttl:'分成比例', val: '30%'},
                    {ttl:'单客分成金额', val: '0.4元'},
                    {ttl:'分成金额', val: '12.0元'},
                ]
            ],
    		itemsDay: [],
            // 两弹窗显隐 itemsAll & itemsDay
    		openSheet: [false,false],
    		// 时间选择
	        times: {begined: this.timeFormat(new Date(), -88), ended: this.timeFormat2(new Date(), 0)},
	        // 分页
	        pageObj: [
	          {"pageNo":1,"pageSize":8,"totalCount":0,"totalPage":1}, // itemsFilter
              {"pageNo":1,"pageSize":15,"totalCount":0,"totalPage":1}, // itemsAll
	          {"pageNo":1,"pageSize":15,"totalCount":0,"totalPage":1} // itemsDay
	        ],
            
    	}
    },

    mounted: function (){
        this.getList(0,'',function (_list) {
            let _ables = Field.listDay()
            self.itemsFilter = self.filterAble(_list,_ables)
        })
    },

    methods: {

    	// 获取公众号信息
    	// getData () {
    	// 	let self = this;
    	// 	self.axios({
    	// 		url: self.api_public,
    	// 		method: 'GET',
    	// 		params: {
    	// 			pageNo: 1,
    	// 			pageSize: 7,
    	// 			appid: self.curAppId
    	// 		}
    	// 	}).then((res)=>{
    	// 		console.log('公众号信息')
    	// 		console.log(res)
     //            let _obj = res.data.page.list[0]
    	// 		self.publicObj = _obj
     //            self.curAppName = _obj.publicNo
     //            self.publicAble.value = {
     //                ids: [_obj.appid],
     //                txts: [_obj.publicNo],
     //            }
     //            self.showSelect = true
    	// 	})
    	// },

        // 获取筛选列表
        getList (pageIndex,ended,callback) {
            let self = this;
            let _curPageObj = JSON.parse(JSON.stringify(self.pageObj[pageIndex]))
            var _submitData = {}
            _submitData.pageNo = _curPageObj.pageNo
            _submitData.pageSize = _curPageObj.pageSize
            _submitData.appid = self.curAppId
            if (!ended) {
                _submitData.begined = self.times.begined
                _submitData.ended = self.times.ended
            } else {
                _submitData.ended = self.getDate(ended)
            }
            self.axios({
                url: self.api_list_filter,
                method: 'GET',
                params: _submitData
            }).then((res)=>{
                console.log('公众号列表')
                console.log(res)
                let _list = res.data.page.list
                if (callback) {callback(res)}
            })
        },

        // 获取每日数据
        getListDay (_day) {
            let self = this
            let _curPageObj = JSON.parse(JSON.stringify(self.pageObj[2]))
            var _submitData = {}
            _submitData.pageNo = _curPageObj.pageNo
            _submitData.pageSize = _curPageObj.pageSize
            // _submitData.appid = self.curAppId
            let  _date = [_day,_day]
            _submitData.registerDate = [_day,_day].join(',')
            self.axios({
                url: self.api_list_day,
                method: 'GET',
                params: _submitData
            }).then((res)=>{
                console.log('每日数据')
                console.log(res)
                let _list = res.data.page.list
                let _ables = Field.listDay()
                self.itemsDay = self.filterAble(_list,_ables)
            })
        },

        // 过滤出sheet的字段
        filterAble (_list,_ables) {
            let _rs = []
            for (let i = 0; i < _list.length; i ++) {
                _rs[i] = []
                for (let a = 0; a < _ables.length; a ++) {
                    for (let x in _list[i]) {
                        if (_ables[a].key === x) {
                            _rs[i].push({
                                key: _ables[a].key,
                                ttl: _ables[a].label,
                                val: _list[i][x]
                            })
                            break
                        }
                    }
                }
            }
            return _rs
        },

    	// 返回
    	back (index) {
    		this.openSheet.splice(index,1,false)
    	},

    	// 打开每日详情
    	showDay (itemIndex) {
    		let _day = this.itemsFilter[itemIndex][0].val;
            this.curDay = _day
            this.getListDay(_day)
    		this.openSheet.splice(1,1,true)
    	},

    	// 打开明细报表
    	showAll () {
            this.getList(1,new Date(),function (_list) {
                let _ables = Field.listDay()
                self.itemsFilter = self.filterAble(_list,_ables)
            })
    		this.openSheet.splice(0,1,true)
    	},

        // 点击查询
        confirmList () {
            let self = this
            this.getList(0,'',function (_list) {
                let _ables = Field.listDay()
                self.itemsFilter = self.filterAble(_list,_ables)
            })
        },

      // 点其他地方关闭下拉
      cancelPop () {
        this.versionDrop = false
        this.maskShow = false
      },

      // 公众号查询
      // confirmTop () {
      //   let self = this
      //   this.getData()
      //   this.getList(0,'',function (_list) {
      //       let _ables = Field.listDay()
      //       self.itemsFilter = self.filterAble(_list,_ables)
      //   })
      // },

      // 换页
      changePage () {
        let _args = arguments
        if (_args[2] === 2) {
          this.getData3(_args[2])
        } else if (_args[2] === 3) {
          this.getData4(_args[2])
        } else {
          if (_args[3]) {
            this.getPage(_args[2],_args[0], 1)
          } else {
            this.getPage(_args[2],_args[0])
          }
        }
      },

      // 获取当天日期
    getDate (obj) {
        let data = '';
        obj = obj.getTime()
        if (obj) {
          let add = function(m){return m<10?'0'+m:m }
          let time = new Date(obj);  
          let y = time.getFullYear();  
          let m = time.getMonth()+1;  
          let d = time.getDate();  
          data = y+'-'+add(m)+'-'+add(d); 
        }
        return data;
    },

    	      /*时间格式转换*/
	      timeFormat (obj, addDay) {
	        let data = '';
	        obj = obj.getTime() + addDay*24*60*60*1000
	        if (obj) {
	          let add = function(m){return m<10?'0'+m:m }
	          let time = new Date(obj);  
	          let y = time.getFullYear();  
	          let m = time.getMonth()+1;  
	          let d = time.getDate();  
	          data = y+'-'+add(m)+'-'+add(d)+' 00:00'; 
	        }
	        return data;
	      },

	      timeFormat2 (obj, addDay) {
	        let data = '';
	        obj = obj.getTime() + addDay*24*60*60*1000
	        if (obj) {
	          let add = function(m){return m<10?'0'+m:m }
	          let time = new Date(obj);  
	          let y = time.getFullYear();  
	          let m = time.getMonth()+1;  
	          let d = time.getDate();  
	          data = y+'-'+add(m)+'-'+add(d)+' 23:59'; 
	        }
	        return data;
	      },
    }

}