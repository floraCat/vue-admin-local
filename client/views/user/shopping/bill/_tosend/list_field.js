
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'shopName',
    'label'      : '商铺名称',
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
    'key'        : 'shopAddr',
    'label'      : '商铺地址',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopTel',
    'label'      : '商铺座机',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopMobile',
    'label'      : '商品手机号',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'isDefault',
    'label'      : '是否默认',
    'listAble'   : true,
    'listAble_mobile'      : true,
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
  // ables.push({
  //   'key'        : 'orderBy',
  //   'label'      : '排序',
  //   'listAble'   : true,
  //   'addAble'    : true,
  //   'modAble'    : true,
  //   'viewAble'   : true,
  //   'editObj'        : {
  //     'formCtrl'       : 'text',
  //     'valid'          : 'number',
  //   }, 
  // })
/*---------------------------*/
  return ables
}