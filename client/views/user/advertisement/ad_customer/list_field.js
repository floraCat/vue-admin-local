
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'customerName',
    'label'      : '客户名称',
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
    'key'        : 'isDefault',
    'defVal'     : 0,
    'label'      : '是否默认',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'radio',
      'val0': '否',
      'val1': '是',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customerMainBusiness',
    'label'      : '客户主营',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'placeholder'  : '如：食品/服饰/航空',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customerAddr',
    'label'      : '公司详细地址',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customerCode',
    'label'      : '客户编码',
    'listAble'   : true,
    'listAble_pad'      : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createUsername',
    'label'      : '创建者',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'      : '创建时间',
    'listAble'   : true,
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