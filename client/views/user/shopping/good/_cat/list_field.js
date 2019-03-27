
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'id',
    'label'      : 'ID',
    'viewAble'   : true,
  })
  /*---------------------------*/
  ables.push({
    'key'        : 'categoryName',
    'label'      : '名称',
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
    'key'        : 'categoryImage',
    'label'      : '图片',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'file',
      'note'          : '推荐尺寸：650*477，大小不超过160k',
      'limitSize'     : 160
    },
  })
  /*---------------------------*/
  ables.push({
    'key'        : 'iconOn',
    'label'      : '图标on',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'file',
      'note'          : '推荐尺寸：60*60，大小不超过15k',
      'limitSize'     : 15
    },
  })
  /*---------------------------*/
  ables.push({
    'key'        : 'iconOff',
    'label'      : '图标off',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'file',
      'note'          : '推荐尺寸：60*60，大小不超过15k',
      'limitSize'     : 15
    },
  })
  /*---------------------------*/
  ables.push({
    'key'        : 'categoryCode',
    'label'      : '分类编码',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'placeholder'    : '如：F101 (F开头推荐到首页的‘吃货食堂’; H开头推荐到‘特色手信’)'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'isDefault',
    'label'      : '是否默认',
    'defVal'     : 0,
    'listAble'   : true,
    'listAble_mobile'      : true,
    'listAble_pad'      : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'radio',
      'val0'           : '否',
      'val1'           : '是',
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
  ables.push({
    'key'        : 'orderBy',
    'label'      : '排序',
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
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'textarea',
    }, 
  })
/*---------------------------*/
  return ables
}