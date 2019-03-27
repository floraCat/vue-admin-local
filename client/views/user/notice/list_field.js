
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'name',
    'label'      : '公告名称',
    'defVal'     : null,
    'listAble'   : true,
    'listAble_mobile'      : true,
    'listAble_pad'      : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble' : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'content',
    'label'      : '公告内容',
    'defVal'     : null,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'textarea',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'      : '创建时间',
    'defVal'     : null,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'updateDate',
    'label'      : '更新时间',
    'defVal'     : null,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'addedDate',
    'label'      : '上架时间',
    'defVal'     : null,
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'picker',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'offDate',
    'label'      : '下架时间',
    'defVal'     : null,
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'picker',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'sortBy',
    'label'      : '排序',
    'defVal'     : null,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'type'          : 'number',
      'placeholder'   : '请输入数字',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remark',
    'label'      : '备注',
    'defVal'     : null,
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