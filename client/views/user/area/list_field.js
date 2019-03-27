
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
ables.push({
    'key'        : 'terminal',
    'label'       : '航站楼',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble' : false,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
      'placeholder'  : '如：T2',
    },
  })
/*---------------------------*/
ables.push({
    'key'        : 'comArea',
    'label'       : '所属片区',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble' : false,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
      'placeholder'  : '如：A区/A岛',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'area',
    'label'       : '登机口',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble' : false,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
      'placeholder'  : '如：A01',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'areaName',
    'label'       : '详细地址',
    'viewAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
  /*---------------------------*/
  ables.push({
    'key'        : 'orderBy',
    'label'       : '排序',
    'viewAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'type'          : 'number',
      'placeholder'   : '请输入数字',
    },
  })
/*---------------------------*/
   ables.push({
    'key'        : 'remark',
    'label'       : '备注',
    'viewAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'editObj'        : {
      'formCtrl'       : 'textarea',    
    },
  })
  ///*---------------------------*/
  ables.push({
      'key'        : 'status',
      'label'       : '状态',
      'listAble'   : true,
      'viewAble'   : true,
      'addAble'    : true,
      'modAble'    : true,
      'editObj'        : {
        'formCtrl'       : 'radio',
      },
  })
  
/*---------------------------*/
  return ables
}
