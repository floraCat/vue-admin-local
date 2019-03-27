
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'resName',
    'label'       : '资源名称',
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
    'key'        : 'resPath',
    'label'       : '资源路径',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'resCode',
    'label'       : '资源编码',
    'listAble'   : true,
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
    'key'        : 'createUsername',
    'label'       : '创建者',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'       : '创建时间',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remark',
    'label'       : '备注',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'textarea',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'thumbnail',
    'label'       : '缩略图',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  return ables
}