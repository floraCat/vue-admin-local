
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'userName',
    'label'      : '用户名称',
    'listAble'   : true,
    'listAble_mobile'   : true,
    'listAble_pad'   : true,
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
    'key'        : 'roles',
    'label'      : '角色',
    'viewAble'   : true,
    'viewObj'    : {
      'hasChild'   : true,
      'key2'       : 'roleName'
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
    'key'        : 'isadmin',
    'label'      : '是否管理员',
    'defVal'     : 0,
    'listAble'   : true,
    'listAble_pad'   : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'radio',
      'val0'           : '否',
      'val1'           : '是',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'loginIp',
    'label'      : '登录IP',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'loginDate',
    'label'      : '登录时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'lastLoginDate',
    'label'      : '最后登录时间',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'loginNo',
    'label'      : '登录次数',
    'viewAble'   : true,
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
/*---------------------------------------------------------*/
  ables.push({
    'key'        : 'roleName',
    'label'      : '角色名称',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'roleCode',
    'label'      : '角色编码',
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
    'key'        : 'createUsername',
    'label'      : '创建者',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'      : '创建时间',
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
  ables.push({
    'key'        : 'isDefault',
    'label'      : '是否默认',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  return ables
}