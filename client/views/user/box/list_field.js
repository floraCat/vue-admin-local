
export default function checkField () {
  let apis = {
    parentsApi   : window.API.url + '/dic/getdetailbykey' + window.API.suf,
    deviceApi    : window.API.url + '/booth/getboothbykey' + window.API.suf,
    dicDetailApi : window.API.url + '/dic/getdetail' + window.API.suf,
    other_editApi: window.API.url + '/booth/save' + window.API.suf,
    areaApi      : window.API.url + '/area/list' + window.API.suf,
    area_editApi : window.API.url + '/area/save' + window.API.suf
  }
  let ables = []
/*---------------------------*/
  ables.push({
    'key'            : 'boxName',
    'label'          : '设备名称',
    'listAble'       : true,
    'listAble_mobile': true,
    'listAble_pad'   : true,
    'addAble'        : true,
    'modAble'        : true,
    'viewAble'       : true,
    'searchAble'     : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxCode',
    'label'       : '设备编码',
    // 'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble'   : true,
    'editObj'   : {
      'formCtrl'       : 'text',
    }
  })
  /*---------------------------*/
  ables.push({
    'key'        : 'proVersion',
    'label'       : '版本',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble'   : true,
    'editObj'   : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
      'placeholder'  : '如：1.0',
    },
    'searchObj'  : {
      opts: [{txt:'1.0',val:'1.0'}, {txt:'2.0',val:'2.0'}, {txt:'2.1',val:'2.1'}, {txt:'2.2',val:'2.2'}],
      defOpt: {txt:null,val:null}
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxNo',
    'label'       : '设备代号',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'ip',
    'label'       : 'IP',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'type'          : 'ip',
      'placeholder'  : '如：127.0.0.1',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'mac',
    'label'       : 'mac地址',
    // 'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble'     : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
      'placeholder'  : '如：88:07:4B:AE:58:20',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'seatNo',
    'label'       : '座位号',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      // 'valid'          : 'notNull',
      'placeholder'  : '如：101',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'comArea',
    'label'       : '片区',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'terminal',
    'label'       : '航站楼',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'areaId',
    'label'       : '登机口Id',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl': 'pageSelect',
      // 'valid': 'notNull',
      'label2': '所属登机口',
      'key2': "area",
      'addItemApis': {
        field     : 'area/list_field',
        editApi   : apis.area_editApi,
        name      : '配送范围(即登机口)'
      },
      'requireArr': [{
        api: apis.areaApi,
        optArr: [
          {key:'area', ttl: '登机口'},
          {key:'terminal', ttl: '航站楼'},
          {key:'comArea', ttl: '片区'}
        ]
      }],
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'area',
    'label'       : '登机口',
    'viewAble'   : true,
  })
/*---------------------------*/
//   ables.push({
//     'key'        : 'addrCode',
//     'label'       : '点位编码',
//     'viewAble'   : true,
//   })
// /*---------------------------*/
//   ables.push({
//     'key'        : 'addrId',
//     'label'       : '点位ID',
//     'viewAble'   : true,
//   })
// /*---------------------------*/
  ables.push({
    'key'        : 'addrName',
    'label'       : '充电亭位置',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'position',
    'label'       : '设备位置',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boothCode',
    'label'       : '充电亭编码',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boothId',
    'label'      : '充电亭ID',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'    : {
      'formCtrl'   : 'listSelect',
      'label2'     : '充电亭名称',
      'placeholder': "点击上面‘+’添加",
      'key2'       : 'boothName',
      'addItemApis': {
        field     : 'booth/list_field',
        parentsApi: apis.parentsApi,
        editApi   : apis.other_editApi
      },
      'requireArr' : [
        {
          api     : apis.parentsApi,
          paramKey: 'parentId',
          paramVal: null,
          key     : 'dicDetailName'
        },
        {
          api     : apis.parentsApi,
          paramKey: 'parentId',
          paramVal: null,
          key     : 'dicDetailName'
        },
        {
          api     : apis.deviceApi,
          paramKey: 'addrId',
          paramVal: null,
          key     : 'boothName'
        }
      ],
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boothName',
    'label'       : '充电亭名称',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'boxTypeName',
  //   'label'       : '硬件类型',
  //   'listAble'   : true,
  //   'viewAble'   : true,
  // })
/*---------------------------*/
  ables.push({
    'key'        : 'boxTypeCode',
    'label'       : '硬件类型编码',
    'viewAble'   : true,
  })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'boxTypeId',
  //   'label'       : '硬件类型ID',
  //   'addAble'    : true,
  //   'modAble'    : true,
  //   'viewAble'   : true,
  //   'editObj'        : {
  //     'formCtrl'       : 'select',
  //     'valid'          : 'selected',
  //     'label2'    : '硬件类型',
  //   },
  //   'selectObj'  : {
  //     api: apis.dicDetailApi + '?dicCode=BOOTH_BOX_TYPE',
  //     optKey: 'dicDetailName',
  //   },
  // })
/*---------------------------*/
  ables.push({
    'key'        : 'boxTypeNo',
    'label'       : '硬件类型代号',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'       : '创建时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createUserName',
    'label'       : '创建者',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remark',
    'label'       : '备注',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'textarea',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'status',
    'label'       : '状态',
    'defVal'     : 0,
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'radio',
      'val0'           : '未激活',
      'val1'           : '已激活'
    },
  })
/*---------------------------*/
  return ables
}