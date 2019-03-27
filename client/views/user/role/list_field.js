
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'roleName',
    'label'      : '角色名称',
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
    'key'        : 'roleCode',
    'label'      : '角色编码',
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
    'key'        : 'createUsername',
    'label'      : '角色创建者',
    'listAble'   : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'      : '创建日期',
    'viewAble'   : true,
  })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'tempcreateDate',
  //   'label'      : 'temp创建日期',
  //   'viewAble'   : true,
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
    'key'        : 'menus',
    'label'      : '可用菜单',
    'viewAble'   : true,
    'viewObj'    : {
      hasChild     : true,
      key2         : 'menuName'
    }
  })
/*---------------------------------------------------------*/
  ables.push({
    'key'        : 'menuName',
    'label'      : '菜单名称',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'menuCode',
    'label'      : '菜单编号',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'menuPath',
    'label'      : '菜单路径',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'menuIcon',
    'label'      : '菜单图标名',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'parentId',
    'label'      : '父级ID',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'orderBy',
    'label'      : '排序',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'level',
    'label'      : '级别',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'isDefault',
    'label'      : '是否默认',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'hasChildNode',
    'label'      : '是否有下级',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'status',
    'label'      : '状态',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/

  return ables
}