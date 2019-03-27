import Datepicker from 'vue-bulma-datepicker'
const formPageSelect    = resolve => require(['../../../../components/common/form/pageSelect'], resolve);
const pagination    = resolve => require(['../../../../components/common/pagination'], resolve);
const chatLine    = resolve => require(['../../../../components/chat/line1/index'], resolve);
const chatBar    = resolve => require(['../../../../components/chat/bar1/index'], resolve);
const export2    = resolve => require(['../../../../components/common/export2'], resolve);
const xlsdata = require('../../../../assets/js/xlsdata.js'); 

export default {

    components: {
      formPageSelect,
      Datepicker,
      pagination    : pagination,
      chatLine: chatLine,
      chatBar: chatBar,
      export : export2
    },

    data () {
      return {
        api: `${this.API.url}/charge/stat${this.API.suf}`,
        headTtl: [
          '按设备统计',
          '按时间统计',
          '实时统计',
          '按使用时长统计'
        ],
        // 各layout片区选择
        areas: [
          {
            "key":"areaId",
            "value":"",
            "editObj":{"formCtrl":"pageSelect","label2":"登机口","requireArr":[{"api":`${this.API.url}/area/list${this.API.suf}`,optArr: [{key:'area', ttl: '登机口'},{key:'terminal', ttl: '航站楼'},{key:'comArea', ttl: '片区'}]}]
            }
          },
          {
            "key":"areaId",
            "value":"",
            "editObj":{"formCtrl":"pageSelect","label2":"登机口","requireArr":[{"api":`${this.API.url}/area/list${this.API.suf}`,optArr: [{key:'area', ttl: '登机口'},{key:'terminal', ttl: '航站楼'},{key:'comArea', ttl: '片区'}]}]
            }
          },
          {
            "key":"areaId",
            "value":"",
            "editObj":{"formCtrl":"pageSelect","label2":"登机口","requireArr":[{"api":`${this.API.url}/area/list${this.API.suf}`,optArr: [{key:'area', ttl: '登机口'},{key:'terminal', ttl: '航站楼'},{key:'comArea', ttl: '片区'}]}]
            }
          },
          {
            "key":"areaId",
            "value":"",
            "editObj":{"formCtrl":"pageSelect","label2":"登机口","requireArr":[{"api":`${this.API.url}/area/list${this.API.suf}`,optArr: [{key:'area', ttl: '登机口'},{key:'terminal', ttl: '航站楼'},{key:'comArea', ttl: '片区'}]}]
            }
          },
        ],
        areaIds: [null,null,null,null],
        // 各layout时间范围
        times: [
          {begined: Funs.getDate(new Date(), 'timeStart', 0), ended: Funs.getDate(new Date(), 'timeEnd', 0)},
          {begined: Funs.getDate(new Date(), 'date', -7), ended: Funs.getDate(new Date(), 'date', 0)},
          {},
          {begined: Funs.getDate(new Date(), 'timeStart', 0), ended: Funs.getDate(new Date(), 'timeEnd', 0)},
        ],
        // layout3图表日期
        timesChat: [
          {ttl: '日期1',date: Funs.getDate(new Date(), 'date', -7)},
          {ttl: '日期2',date: Funs.getDate(new Date(), 'date', 0)},
        ],
        // 各layout指定字段
        ables: [
          ["address","chargeNoCount5","chargeNoCount30","chargeNoCount","chargeUsedCount5","chargeUsedCount30","chargeUsedCount","counter"],
          ["day","chargeNoCount5","chargeNoCount30","chargeUsedCount5","chargeUsedCount30"],
          [],
          ["totalTimeLong","chargeUsedCount","chargeNoCount","avgByEveryone"]

        ],
        // 各layout的数据
        result: [{},{},
        { // cat3图表数据
          "data": [],
          "series": [],
          labels: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
          backgroundColor: [
            'rgba(31, 200, 219, 1)',
            'rgba(151, 205, 118, 1)',
            'rgba(219, 155, 31, 1)',
            'rgba(31, 137, 219, 1)',
            'rgba(219, 31, 208, 1)',
            'rgba(106, 31, 219, 1)',
            'rgba(31, 219, 119, 1)',
          ],
        },
        { // cat4图表数据
          "data": [],
          label: '充电统计',
          labels: [],
          backgroundColor: [
            'rgba(31, 200, 219, 1)',
            'rgba(31, 200, 219, 1)',
            'rgba(31, 200, 219, 1)',
            'rgba(31, 200, 219, 1)',
          ],
        }],
        // 导出Exl
        exlResult: [[],[]],
        exlTotal: [],
        fileName: ['按设备统计','按时间统计'],
        // 各layout表格的title
        titles: [
          ['位置','5分钟订单数','30分钟订单数','总订单数','5分钟使用人数','30分钟使用人数','总使用人数','人次'],
          ['日期','5分钟订单数','30分钟订单数','5分钟使用人数','30分钟使用人数'],
          ['日期','总订单数','5分钟订单数','30分钟订单数','总使用人数','5分钟使用人数','30分钟使用人数'],
          ['总充电时长','总使用人数','总使用次数','人均充电时长']
        ],
        // 分页
        pageObj: [
          {"pageNo":1,"pageSize":8,"totalCount":0,"totalPage":1},
          {"pageNo":1,"pageSize":8,"totalCount":0,"totalPage":1}
        ],
        orgPageNo: [1,1],
        loadAll: [false,false],
        // 图表里当前选择的日期index，以便去重
        curPickIndex: null,
        oldPicker: null,
        // 图表显隐
        showChat: false,
        showBar: false,
        // 版本下拉
        versionDrop: [false,false,false,false],
        version: ['全部','全部','全部','全部'],
        maskShow: false,
      }
    },

    computed: {
      JSONTimeChat () {
        return JSON.stringify(this.timesChat)
      },
    },

    mounted: function () {
      this.getPage(0,1,1)
      this.getPage(1,1,1)
      this.getData3(2)
      this.getData4(3)
    },

    watch: {
      JSONTimeChat (newVal,oldVal) { //layout 3图表有变更
        let _curPicker = JSON.parse(newVal)[this.curPickIndex] && JSON.parse(newVal)[this.curPickIndex].date
        if ((this.curPickIndex !== 'noWatch') && (_curPicker != this.oldPicker)) {
          this.oldPicker = JSON.parse(oldVal)[this.curPickIndex] && JSON.parse(oldVal)[this.curPickIndex].date
          let _arr = JSON.parse(newVal)
          let _curPick = _arr[this.curPickIndex] && _arr[this.curPickIndex].date || null
          for (let i = 0; i < _arr.length; i ++) {
            if (i != this.curPickIndex) {
              if (_curPick === _arr[i].date) { // 判断有重复
                alert("此日期与已有的重复了，请选择其他日期")
                this.$refs.picker[this.curPickIndex].date = this.oldPicker 
                break
              }
            }
          }
        }
      },

    },

    methods: {

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
            else { _sumArr[i] = 0}
          }

          let _eachHandle = function (_exlRs,_list) { // 每请求一页的回调处理
              for (let i = 0; i < _list.length; i ++) {
                  let _rs = [] // 筛选出要下载的字段
                  for (let a = 0; a < _able.length; a ++) {
                      let _flag = 0
                      for (let x in _list[i]) {
                          if (_able[a] === x) {
                              _flag = 1
                              _rs.push(_list[i][x])
                              if (a) {
                                 // 数量统计
                                _sumArr[a] = _list[i][x] ? _sumArr[a] + parseInt(_list[i][x]) : _sumArr[a]
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
          for (var i = 1; i <= _page; i ++) {
              this.getPageExl(index,i,function (_list) { // 逐页请求
                  _eachHandle(_exlResult,_list)
                  _index --
              })
          }

          window._setIn = setInterval( function() { // 500ms检测一次是否已经获取完成
              if (_index === 0) {
                  if (_exlResult.length > 0) { // 有条目才执行导出
                      _exlResult.push(_sumArr) // 总计放底部
                      self.exlResult[index] = _exlResult
                      _action(_exlResult,self.titles[index],self.fileName[index])
                  } else {
                      alert('没有数据可以导出哦~')
                  }
                  clearInterval(_setIn)
              }
          }, 500)
      },

      // 导出excel时循环获取全部数据
      getPageExl (index,page,callback) {
        let self = this
        let _params = {
          category: (index + 1),
          proVersion: self.version[index] === '全部' ? '' : self.version[index],
          pageNo: page,
          pageSize: self.pageObj[index].pageSize,
          begined: self.times[index].begined,
          ended: self.times[index].ended,
          area: isNaN(self.areas[index].value) ? '' : self.areas[index].value
        }
        self.axios({
          url: self.api,
          method: 'GET',
          params: _params
        }).then((res) => {
          if (res.data.status === 'failure') {
              console.log('----> getPageExl()接口传参category='+(index + 1)+'的接口报错：'+ res.data.message)
          }
          if (res.data.status === 'success') {
            let _rs = res.data.page && res.data.page.list || []
            // 位置值加单引号，防止转excel后会匹配成日期
            for (let x = 0; x < _rs.length; x ++) {
              _rs[x].address = JSON.stringify(_rs[x].address)
            }
            if (callback && 'function' === typeof callback) {
              callback(_rs)
            }
          }
        })
      },

      // layout 1 & 2 分页数据获取
      getPage (index,page,enter,callback) {
        let self = this
        let _params = {
          category: (index + 1),
          proVersion: self.version[index] === '全部' ? '' : self.version[index],
          pageNo: page,
          pageSize: self.pageObj[index].pageSize,
          begined: self.times[index].begined,
          ended: self.times[index].ended,
          area: isNaN(self.areas[index].value) ? '' : self.areas[index].value
        }
        if (enter) {
          _params.enter = 1
        }
        self.axios({
          url: self.api,
          method: 'GET',
          params: _params
        }).then((res) => {
          if (res.data.status === 'failure') {
              console.log('----> getPage()接口传参category='+(index + 1)+'的请求失败信息：'+ res.data.message)
          }
          if (res.data.status === 'success') {
            console.log('订单统计1&2')
            console.log(res)
            self.pageObj[index].pageNo = page
            self.pageObj[index].totalCount = res.data.page && res.data.page.totalCount
            self.pageObj[index].totalPage = res.data.page && res.data.page.totalPage
            let _rs = res.data.page && res.data.page.list || []
            let _newList = []
            for (let x = 0; x < _rs.length; x ++) {
              _newList[x] = {}
              for (let y = 0; y < self.ables[index].length; y ++) {
                if (_rs[x][self.ables[index][y]] !== undefined) {
                  _newList[x][self.ables[index][y]] = _rs[x][self.ables[index][y]]
                }
              }
            }
            self.result.splice(index, 1, _newList)
            if (callback && 'function' === typeof callback) {
              callback(_rs)
            }
          }
        })
      },
      // layout 3 数据获取
      getData3 (index) {
        let self = this
        this.showChat = false
        let _dates = []
        for (let i = 0; i < this.timesChat.length; i ++) {
          if (this.timesChat[i].date) {
            _dates.push(this.timesChat[i].date)
          }
        }
        self.axios({
          url: self.api,
          method: 'GET',
          params: {
            category: 3,
            proVersion: self.version[index] === '全部' ? '' : self.version[index],
            dates: _dates.join(','),
            area: isNaN(self.areas[index].value) ? '' : self.areas[index].value
          }
        }).then((res) => {
          if (res.data.status === 'failure') {
              console.log('----> getData3()接口传参category=3的请求失败信息：'+ res.data.message)
          }
          if (res.data.status === 'success') {
            console.log('订单统计3')
            console.log(res)
            let _rs = res.data.list
            self.result[index].data = []
            self.result[index].series = _dates
            for (let i = 0; i < _rs.length; i ++) {
              let _arr = []
              for (let j = 0; j < _rs[i].list.length; j ++) {
                _arr.push(_rs[i].list[j].chargeNoCount)
              }
              self.result[index].data.push(_arr)
            }
            self.showChat = true
          }
        })
      },
      // layout 4 数据获取
      getData4 (index) {
        let self = this
        this.showBar = false
        self.axios({
          url: self.api,
          method: 'GET',
          params: {
            category: (index + 1),
            proVersion: self.version[index] === '全部' ? '' : self.version[index],
            begined: self.times[index].begined,
            ended: self.times[index].ended,
            area: isNaN(self.areas[index].value) ? '' : self.areas[index].value
          }
        }).then((res) => {
          if (res.data.status === 'failure') {
              console.log('----> getData4()接口传参category='+(index + 1)+'的请求失败信息：'+res.data.message)
          }
          if (res.data.status === 'success') {
            console.log('订单统计4')
            console.log(res)
            let _rs = res.data.result
            let _arr = []
            for (let i = 0; i < self.ables[index].length; i ++) {
              if (_rs[self.ables[index][i]] !== undefined) {
                _arr.push(_rs[self.ables[index][i]])
              }
            }
            self.result[index].data = _arr
            self.result[index].labels = self.titles[index]
            self.showBar = true
          }
        })
      },

      // 图表增加对比日期
      addItem () {
        if (this.timesChat.length >= 7) {
          alert('对比日期数量不能大于7个')
          return
        } else {
          let _newTtl = '日期' + parseInt(this.timesChat.length + 1);
          this.timesChat.push({
            ttl: _newTtl,
            date: null
          })
          this.curPickIndex = 'noWatch'
        }
      },

      // 图表删对比日期
      delItem (index) {
        this.curPickIndex = 'noWatch'
        let _len = 0
        let _timesChat = JSON.parse(JSON.stringify(this.timesChat))
        for (let i = 0; i < _timesChat.length; i ++) {
          if (_timesChat[i].date !== null) {
            _len ++
          }
        }
        if (_len <= 2 && _timesChat[index].date !== null) {
          alert('对比日期数量不能小于2个')
          return
        } else {
          let _timesChat2 = []
          for (let j = 0; j < _timesChat.length; j ++) {
            if (j != index) {
              _timesChat2.push(_timesChat[j])
            }
          }
          this.timesChat = _timesChat2
          for (let x = 0; x < _timesChat2.length; x ++) {
            this.timesChat[x].ttl = '日期' + (x+1)
            this.$refs.picker[x].date = _timesChat2[x].date // 无此行日期显示会有问题？
          }
        }
      },

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

      // 确定筛选
      confirm (index, enter) {
        this.changePage (1,null,index,enter)
        this.loadAll[index] = false
        this.exlResult[index] = []
      },

      // 当前选择日期的index
      checkCurPick (index) {
        this.curPickIndex = index
      },

      // 版本下拉
      selectDrop (index) {
        if (!this.versionDrop[index]) {
          this.versionDrop[index] = true
          this.maskShow = true
        }        
      },

      // 版本选择
      selectOn (ev,index) {
        let _val = ev.target.getAttribute('data-val')
        this.version[index] = _val
        this.versionDrop.splice(index,1,false)
        this.maskShow = false
      },

      // 点其他地方关闭下拉
      cancelPop () {
        for (let x = 0; x < this.versionDrop.length; x ++) {
          this.versionDrop.splice(x,1,false)
        }
        this.maskShow = false
      }
    }
  }