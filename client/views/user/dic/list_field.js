
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'dicName',
    'label'      : '字典名称',
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
    'key'        : 'dicCode',
    'label'      : '字典编码',
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
    'key'        : 'createDate',
    'label'      : '创建时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createUsername',
    'label'      : '创建者',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'orderBy',
    'label'      : '排序',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'type'           : 'number',
      'placeholder'   : '请输入数字',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remarks',
    'label'      : '备注',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'textarea',
      'valid'          : 'notNull',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'status',
    'label'      : '状态',
    'defVal'     : 1,
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