
export default function checkField (_this) {
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
    'listAble'   : true,
    'listAble_pad'      : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
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
    'key'        : 'resId',
    'label'       : '资源ID',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'file',
      'key2'          : 'thumbnail',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'resCode',
    'label'       : '资源编码',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'resName',
    'label'       : '资源名称',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'thumbnail',
    'label'       : '缩略图',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'adTemplate',
    'label'       : '模板',
    'listAble'   : true,
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
    'listAble'   : true,
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
  ables.push({
    'key'        : 'confirm',
    'label'       : '审核状态',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/

  return ables
}