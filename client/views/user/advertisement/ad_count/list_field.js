
export default function checkField () {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'adName',
    'label'      : '广告名称',
    'listAble'   : true,
    'listAble_mobile'      : true,
    'listAble_pad'      : true,
    'viewAble'   : true,
    'searchAble' : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'adId',
    'label'      : '广告ID',
    'addAble'    : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'adCode',
    'label'      : '广告编码',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'thumbnail',
    'label'      : '缩略图',
    'listAble'   : true,
  })

/*---------------------------*/
  ables.push({
    'key'        : 'locationName',
    'label'      : '广告位置',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'addedDate',
    'label'      : '上架时间',
    'listAble'   : true,
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
    'label'      : '创建时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customerName',
    'label'      : '客户名称',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'offDate',
    'label'      : '下架时间',
    'listAble'   : true,
  })
  
  ables.push({
    'key'        : 'adCounters',
    'label'      : '点击量',
    'viewAble'   : true,
    'viewObj'    : {
      'hasChild'   : true,
      'key2'       : 'adDate'
    },
  })
  
    ables.push({
    'key'        : 'adDate',
    'label'      : '时间',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'counter',
    'label'      : '点击量',
    'viewAble'   : true,
    'isChild'      : true
  })
  

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

  return ables
}