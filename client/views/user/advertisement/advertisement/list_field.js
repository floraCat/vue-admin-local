
export default function checkField (_this) {
  let apis = {
    customer_editApi     : window.API.url + '/advertisement/ad_customer/save' + window.API.suf,
  }
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'adName',
    'label'       : '广告名称',
    'listAble'   : true,
    'listAble_mobile'   : true,
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
    'key'        : 'adCode',
    'label'       : '广告编码',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customerId',
    'label'       : '客户ID',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,    
    'editObj'    : {
      'formCtrl'   : 'pageSelect',
      'valid'      : 'notNull',
      'key2'       : "customerName",
      'label2'     : "客户名称",
      'addItemApis': {
        field     : 'advertisement/ad_customer/list_field',
        editApi   : apis.customer_editApi,
        name      : '广告客户'
      },
      'showDef'    : true,
      'selectLen'  : 1,
      'requireArr' : [
        {
          api: _this.customApi,
          paramKey: 'parentId',
          paramVal: null,
          optArr: [
            {key: 'customerName'}
          ]
        }
      ],
    },
    'viewObj'    : {
      // hasChild     : true,
      key2         : 'customerName'
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customerName',
    'label'       : '客户名称',
    'listAble'   : true,
    'viewAble'   : true,
    'searchAble' : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customerCode',
    'label'       : '客户编码',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createUsername',
    'label'       : '创建者',
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'updateUsername',
    'label'       : '更改者',
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'resName',
    'label'       : '广告图',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'file',
      'valid'          : 'notNull',
      'note'          : '大小不超过280k',
      'limitSize'     : 280,
      'saveField2'    : 'thumbnail',
      'saveFile2'     : 'resExt1'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'resCode',
    'label'       : '资源编码',
    'viewAble'   : true,
  })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'resName',
  //   'label'       : '资源名称',
  //   'viewAble'   : true,
  // })
/*---------------------------*/
  ables.push({
    'key'        : 'thumbnail',
    'label'       : '缩略图',
    'listAble'   : true,
    'viewAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'editObj'    : {
      'formCtrl'   : 'hidden'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'adTemplate',
    'label'       : '模板',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'select',
    },
    'selectObj'  : {
      api: _this.dicDetailApi + '?dicCode=AD_TEMPLATE',
      optKey: 'dicDetailName',
      valKey: 'dicDetailCode'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'       : '创建时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'updateDate',
    'label'       : '更新时间',
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
    },
  })
/*---------------------------*/
  return ables
}