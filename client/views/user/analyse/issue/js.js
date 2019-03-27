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
        api: 'http://localhost/___test/issue2.json',
        apiOn: 'http://localhost/___test/issue.json',
        // 指定显示字段
        ables: ["theme","sum","radio","checkbox","fill"],
        // 字段对应title
        titles: ['主题','提交总数','单选题数','多选题数','填空题数'],
        ablesOn: [
          {
            key: 'theme',
            label: '主题',
            value: null
          },
          {
            key: 'desc',
            label: '描述',
            value: null
          },
          {
            key: 'questions',
            label: '问题',
            value: null
          }
        ],
        // 各layout的数据
        result: {},
        resultOn: {},
        resultSum: {},
        showIssueFilter: false,
        issues: {
            "key":"theme",
            "value":{ids:[],txts:[]},
            "editObj":{"formCtrl":"pageSelect","label2":"问卷主题","arrayVal":true,"requireArr":[{"api":'http://localhost/___test/issue.json', optArr: [{key:'theme', ttl: '题目'}]}]
            }
          },
        // 导出Exl
        exlResult: [],
        exlTotal: [],
        fileName: '问卷统计',
        // 分页
        pageObj: {"pageNo":1,"pageSize":8,"totalCount":0,"totalPage":1},
        loadAll: false,
        showOn: false,
      }
    },

    computed: {
      questions () {
        let _rs = []
        let _ables = this.ablesOn
        for (let i = 0; i < _ables.length; i ++) {
          if (_ables[i].key === 'questions') {
            _rs = _ables[i].value
            break;
          }
        }
        return _rs
      }
    },

    mounted: function () {
      let self = this
      this.getPage(1)
    },

    methods: {

      getPage (page,callback) {
        let self = this
        let _params = {
          pageNo: page,
          pageSize: self.pageObj.pageSize,
        }
        if (this.issues.value[0] && this.issues.value[0].id) {
          _params.issue = this.issues.value[0].id
        }
        self.axios({
          url: self.api,
          method: 'GET',
          params: _params
        }).then((res) => {
          if (res.data.status === 'failure') {
              console.log(res.data.message)
          }
          if (res.data.status === 'success') {
            console.log('按广告list')
            console.log(res)
            self.pageObj.pageNo = page
            self.pageObj.totalCount = res.data.page && res.data.page.totalCount
            self.pageObj.totalPage = res.data.page && res.data.page.totalPage
            let _rs = res.data.page && res.data.page.list || []
            self.showIssueFilter = true
            let _newList = []
            for (let x = 0; x < _rs.length; x ++) {
              _newList[x] = {}
              for (let y = 0; y < self.ables.length; y ++) {
                if (_rs[x][self.ables[y]] !== undefined) {
                  _newList[x][self.ables[y]] = _rs[x][self.ables[y]]
                }
              }
            }
            self.result = _newList
            if (callback && 'function' === typeof callback) {
              callback(_rs)
            }
          }
        })
      },

      getCurIssue (index) {
        let self = this
        let _params = {
          pageNo: 1,
          pageSize: 1,
          issue: self.result[index].id
        }
        self.axios({
          url: self.apiOn,
          method: 'GET',
          params: _params
        }).then((res) => {
          if (res.data.status === 'failure') {
              console.log(res.data.message)
          }
          if (res.data.status === 'success') {
            let _rs = res.data.page && res.data.page.list[0]
            console.log('查看指定问卷')
            console.log(_rs)
            for (let x= 0; x < self.ablesOn.length; x ++) {
              if (_rs[self.ablesOn[x].key] != undefined) {
                self.ablesOn[x].value = _rs[self.ablesOn[x].key]
              }
            }
            self.showOn = true
            setTimeout(function () {
              document.body.appendChild(self.$refs.issueOn) // 便于fixed定位
            }, 100)
              
          }
        })
      },

      close () {
        this.showOn = false
      },

      // 换页
      changePage () {
        let _args = arguments
        this.getPage(_args[2])
      },

      // 确定筛选
      confirm (index) {
        this.getPage(1)
        // this.loadAll[index] = false
        // this.exlResult[index] = []
      },

    }
  }