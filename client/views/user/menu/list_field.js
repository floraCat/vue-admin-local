
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'menuName',
    'label'      : '菜单名称',
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
      'modReadOnly': true,
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'menuPath',
    'label'      : '菜单路径',
    'listAble'   : true,
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
    'key'        : 'menuIcon',
    'label'      : '菜单图标',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'    : {
      'formCtrl'   : 'select',
    },
    'selectObj'  : {
      api: _this.dicDetailApi + '?dicCode=menuIcon',
      optKey: 'dicDetailName',
      valKey: 'dicDetailCode'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'menuCode',
    'label'      : '菜单编码',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'parentId',
    'label'      : '父级ID',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'select',
      'label2'         : '父级菜单',
    }, 
    'selectObj'  : {
      defOpt: '父级菜单',
      api: _this.parentIdsApi,
      optKey: 'menuName',
    },
  })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'parentTxt',
  //   'label'      : '父级菜单',
  //   'listAble'   : true,
  // })
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
    'key'        : 'hasChildNode',
    'label'      : '是否有下级',
    'viewAble'   : true,
  })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'isLeafNode',
  //   'label'      : 'isLeafNode',
  //   'viewAble'   : true,
  // })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'isRootNode',
  //   'label'      : 'isRootNode',
  //   'viewAble'   : true,
  // })
/*---------------------------*/
  ables.push({
    'key'        : 'level',
    'label'      : '层级',
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
      'type'          : 'number',
      'placeholder'   : '请输入数字',
    }, 
  })
/*---------------------------*/
  return ables
}