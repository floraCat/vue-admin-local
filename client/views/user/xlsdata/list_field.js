
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'dicDetailName',
    'label'      : '字典详情名称',
    'listAble'   : true,
    'listAble_mobile'      : true,
    'listAble_pad'      : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
    }, 
  })
/*---------------------------*/
  ables.push({
  'key'        : 'dicDetailCode',
  'label'      : '字典详情编码',
  'listAble'   : true,
  'listAble_pad'      : true,
  'addAble'    : true,
  'modAble'    : true,
  'viewAble'   : true,
  'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
    }, 
  })
/*---------------------------*/
  ables.push({
  'key'        : 'dicId',
  'label'      : '字典详情ID',
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
  'label'      : '创建日期',
  'viewAble'   : true,
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
    }, 
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
      'type'          : 'number',
      'placeholder'   : '请输入数字',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'extName1',
    'label'      : 'extName1',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'textarea',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'extName2',
    'label'      : 'extName2',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'extName3',
    'label'      : 'extName3',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'parentId',
  //   'label'      : '父级ID',
  //   'listAble'   : true,
  //   'addAble'    : true,
  //   'modAble'    : true,
  //   'viewAble'   : true,
  //   'editObj'        : {
  //     'formCtrl'       : 'select',
  //     'label2'         : '父级名称'
  //   },
  // })
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