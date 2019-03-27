
export default function checkField () {
  let apis = {
    parentsApi   : window.API.url + '/dic/getdetailbykey' + window.API.suf,
    other_editApi: window.API.url + '/dic/detailsave' + window.API.suf,
  }
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'boothName',
    'label'      : '充电亭名称',
    'listAble'   : true,
    'listAble_mobile'      : true,
    'listAble_pad'      : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble' : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boothCode',
    'label'      : '充电亭编码',
    'listAble'   : true,
    'listAble_pad'      : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble' : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boothNo',
    'label'      : '充电亭代号',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'type'          : 'number',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'addrName',
    'label'      : '点位名称',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'addrCode',
    'label'      : '点位编码',
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'select',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'addrId',
    'label'      : '点位ID',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'    : {
      'formCtrl'   : 'listSelect',
      'valid'      : 'notNull',
      'placeholder': "点击上面'+'添加",
      'key2'       : "addrName",
      'label2'     : "点位名称",
      'addItemApis': {
        field     : 'dic/detaillist_field',
        parentsApi: apis.parentsApi,
        editApi   : apis.other_editApi,
        dicCode   : 'BOOTH_ADDRESS',
        dicId     : 12
      },
      'requireArr' : [
        {
          api: apis.parentsApi+'?key=all',
          paramKey: 'parentId',
          paramVal: null,
          key: 'dicDetailName'
        },
        {
          api: apis.parentsApi+'?key=all',
          paramKey: 'parentId',
          paramVal: null,
          key: 'dicDetailName'
        },
      ],
    },
    'viewObj'    : {
      hasChild     : true,
      // key2         : '???'
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'      : '创建时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createUserName',
    'label'      : '创建者',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'updateDate',
    'label'      : '更新时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createUserName',
    'label'      : '更新者',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'parentTxt',
    'label'      : 'parentTxt',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remark',
    'label'      : '备注',
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
    'label'      : '状态',
    'defVal'     : 0,
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'radio',
    },
  })
/*---------------------------*/
  return ables
}