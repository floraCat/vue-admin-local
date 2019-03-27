
export default function checkField (_this) {
  let apis = {
    areaApi      : window.API.url + '/area/list' + window.API.suf,
    area_editApi : window.API.url + '/area/save' + window.API.suf,
    followApi : window.API.url + '/sub/list' + window.API.suf
  }
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'categoryName',
    'label'      : '操作名称',
    'listAble'   : true,
    'listAble_mobile'      : true,
    'listAble_pad'      : true,
    'viewAble'   : true,
    'searchAble' : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'categoryCode',
    'label'      : '操作代号',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'select',
      'label2'      : '操作类型',
      'valid'          : 'notNull',
    },
    'selectObj'  : {
      api: _this.dicDetailApi + '?dicCode=REMOTE_MANAGER_CATEGORY',
      optKey: 'dicDetailName',
      valKey: 'dicDetailCode',
      errorNote: '操作类型请在字典管理中添加'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remoteStatus',
    'label'      : '远程状态',
    'defVal'     : 0,
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key': 'attrs',
    'label': '设备登机口',
    'addAble': true,
    'modAble': true,
    'viewAble': false,
    'popPage' : true,
    'editObj': {
      'formCtrl': 'pageSelect',
      'valid': 'notNull',
      'arrayVal': true,
      'key2': "name",
      'addItemApis': {
        field     : 'area/list_field',
        editApi   : apis.area_editApi,
        name      : '配送范围(即登机口)'
      },
      'selectLen': 2,
      'label2': "设备登机口",
      'requireArr': [{
        api: apis.areaApi,
        optArr: [
          {key: 'area',ttl: '登机口'},
          {key: 'terminal',ttl: '航站楼:'},
          {key: 'comArea',ttl: '片区:'}
        ]
      }],
    },
    'viewObj': {
      'hasChild': true,
      'key2': 'name'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'appid',
    'label'      : 'appID',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'pageSelect',
      'arrayVal': true,
      'key2': "name",
      'addItemApis': {
        field     : 'area/list_field',
        editApi   : apis.area_editApi,
        name      : 'appID'
      },
      'selectLen': 2,
      'requireArr': [{
        api: apis.followApi,
        optArr: [
          {key: 'appid',ttl: 'appID:'},
          {key: 'publicNo',ttl: '公众号名称:'}
        ]
      }],
    },
  })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'boxes',
  //   'label'      : '设备登机口',
  // })
/*---------------------------*/
  ables.push({
    'key'        : 'begined',
    'label'      : '首次执行时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'created',
    'label'      : '创建时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'firstResults',
    'label'      : '首次结果',
    'defVal'     : 0,
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'retryResults',
  //   'label'      : '重试结果',
  //   'defVal'     : 0,
  //   'listAble'   : true,
  //   'viewAble'   : true,
  // })
/*---------------------------*/

  return ables
}