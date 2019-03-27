import Datepicker from 'vue-bulma-datepicker'
const formPageSelect    = resolve => require(['../../../../components/common/form/pageSelect'], resolve);
const pagination    = resolve => require(['../../../../components/common/pagination'], resolve);
const export2    = resolve => require(['../../../../components/common/export2'], resolve);
const xlsdata = require('../../../../assets/js/xlsdata.js'); 

export default {

    components: {
      formPageSelect,
      Datepicker,
      pagination    : pagination,
      export : export2
    },

    data () {
      return {
        headTtl: [
          '按广告统计',
          '按时间统计'
        ],
        // 各layout时间范围
        times: [
          {begined: Funs.getDate(new Date(), 'date', -30), ended: Funs.getDate(new Date(), 'date', 0)},
          {begined: null, ended: null}
        ],
        // 各layout指定字段
        ables: [
          ["adName","thumbnail","addedDate","offDate","sum"],
          ["adDate","counter"]
        ],
        // 各layout表格的title
        titles: [
          ['广告名称','广告图','上架时间','下架时间','点击量'],
          ['日期','点击量']
        ],
        // 各layout的数据
        result: [{},{}],
        resultSum: [{},{}],
        showAdFilter: false,
        ads: {
            "key":"adName",
            "value":{ids:[],txts:[]},
            "editObj":{"formCtrl":"pageSelect","label2":"广告名称","arrayVal":true,"requireArr":[{"api":`${this.API.url}/advertisement/ad_on/list${this.API.suf}`, optArr: [{key:'adName', ttl: '广告名称'}]}]
            }
          },
        // 导出Exl
        exlResult: [[],[]],
        exlTotal: [],
        fileName: ['按广告统计','按时间统计'],
        // 分页
        pageObj: [
          {"pageNo":1,"pageSize":8,"totalCount":0,"totalPage":1},
          {"pageNo":1,"pageSize":8,"totalCount":0,"totalPage":1}
        ],
        orgPageNo: [1,1],
        loadAll: [false,false],
        maskShow: false,
      }
    },

    computed: {
      JSONTimeChat () {
        return JSON.stringify(this.timesChat)
      },
    },

    mounted: function () {
      let self = this
      this.getPage(1,function (res) {
        self.getPage2 (1,res[0].adName)
      })
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
          url: this.API.HOST + this.API.ad_on.path + this.API.suf,
          method: this.API.ad_on.type,
          params: _params
        }).then((res) => {
          if (res.data.status === 'failure') {
              console.log(res.data.message)
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
      getPage (page,callback) {
        let self = this
        let _params = {
          pageNo: page,
          pageSize: self.pageObj[0].pageSize,
          begined: self.times[0].begined,
          ended: self.times[0].ended,
        }
        self.axios({
          url: this.API.HOST + this.API.ad_on.path + this.API.suf,
          method: this.API.ad_on.type,
          params: _params
        }).then((res) => {
          if (res.data.status === 'failure') {
              console.log(res.data.message)
          }
          if (res.data.status === 'success') {
            console.log('按广告list')
            console.log(res)
            self.pageObj[0].pageNo = page
            self.pageObj[0].totalCount = res.data.page && res.data.page.totalCount
            self.pageObj[0].totalPage = res.data.page && res.data.page.totalPage
            let _rs = res.data.page && res.data.page.list || []
            self.ads.value={ids:[_rs[0].adId],txts:[_rs[0].adName]}
            self.showAdFilter = true
            let _newList = []
            self.resultSum[0].sum = 0
            for (let x = 0; x < _rs.length; x ++) {
              _newList[x] = {}
              for (let y = 0; y < self.ables[0].length; y ++) {
                if (_rs[x][self.ables[0][y]] !== undefined) {
                  if (_rs[x][self.ables[0][y]] && (self.ables[0][y] === 'addedDate' || self.ables[0][y] === 'offDate')) {
                    _newList[x][self.ables[0][y]] = Funs.getDate(new Date(_rs[x][self.ables[0][y]]),'time')
                  } else {
                    _newList[x][self.ables[0][y]] = _rs[x][self.ables[0][y]]
                  }
                }
              }
              _newList[x].sum = 0
              if (_rs[x].adCounters.length > 0) {
                for (let y = 0; y < _rs[x].adCounters.length; y ++) {
                  console.log(_rs[x].adCounters[y].counter)
                  _newList[x].sum += _rs[x].adCounters[y].counter
                  self.resultSum[0].sum += _rs[x].adCounters[y].counter
                }
              }
            }
            self.result.splice(0, 1, _newList)
            if (callback && 'function' === typeof callback) {
              callback(_rs)
            }
          }
        })
      },

      getPage2 (page,adName,callback) {
        let self = this
        let _params = {
          adName: adName,
          pageNo: page,
          pageSize: self.pageObj[1].pageSize,
          begined: self.times[1].begined || null,
          ended: self.times[1].ended || null,
        }
        self.axios({
          url: this.API.HOST + this.API.ad_on.path + this.API.suf,
          method: this.API.ad_on.type,
          params: _params
        }).then((res) => {
          if (res.data.status === 'failure') {
              console.log(res.data.message)
          }
          if (res.data.status === 'success') {
            console.log('指定广告list')
            console.log(res)
            self.pageObj[1].pageNo = page
            self.pageObj[1].totalCount = res.data.page && res.data.page.totalCount
            self.pageObj[1].totalPage = res.data.page && res.data.page.totalPage
            let _rs = res.data.page && res.data.page.list && res.data.page.list[0] || []
            if (_rs.adCounters.length > 0) {
              let _newList = []
              for (let x = 0; x < _rs.adCounters.length; x ++) {
                _newList[x] = {}
                for (let y = 0; y < self.ables[1].length; y ++) {
                  if (_rs.adCounters[x][self.ables[1][y]] !== undefined) {
                    _newList[x][self.ables[1][y]] = _rs.adCounters[x][self.ables[1][y]]
                  }
                }
              }
              self.result.splice(1, 1, _newList)
            } else {
              self.result.splice(1, 1, [])
            }
            self.resultSum[1].addedDate = _rs.addedDate && Funs.getDate(new Date(_rs.addedDate),'time') || '未设置'
            self.resultSum[1].offDate = _rs.offDate && Funs.getDate(new Date(_rs.offDate),'time') || '未设置'
            self.resultSum[1].thumbnail = _rs.thumbnail
            self.resultSum[1].sum = 0
            if (_rs.adCounters.length > 0) {
              for (let y = 0; y < _rs.adCounters.length; y ++) {
                self.resultSum[1].sum += _rs.adCounters[y].counter
              }
            }
            if (callback && 'function' === typeof callback) {
              callback(_rs)
            }
          }
        })
      },

      // 换页
      changePage () {
        let _args = arguments
        if (_args[2] === 1) {
          this.getPage2(1,this.ads.value[0].name)
        }
      },

      // 确定筛选
      confirm (index) {
        this.changePage (1,null,index)
        this.loadAll[index] = false
        this.exlResult[index] = []
      },

      // 当前选择日期的index
      checkCurPick (index) {
        this.curPickIndex = index
      },

    }
  }