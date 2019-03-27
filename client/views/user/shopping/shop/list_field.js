
export default function checkField (_this) {
  let ables = []
  let apis = {
    areaApi: window.API.url + '/area/list' + window.API.suf,
		area_editApi: window.API.url + '/area/save' + window.API.suf
	}
/*---------------------------*/
  ables.push({
    'key'        : 'id',
    'label'      : 'ID',
    'viewAble'   : true,
  })
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
      'placeholder'    : '如：xx航站楼xx区xx登机口'
    },
  })
  /*---------------------------*/
  ables.push({
    'key'        : 'businessHours',
    'label'      : '营业时间',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'placeholder'    : '如：9:00 ~ 21:00'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'logo',
    'label'      : '商标',
    'addAble'    : true,
    'modAble'    : true,
    'listAble'   : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'file',
      'note'          : '推荐尺寸：200*200，大小不超过60k',
      'limitSize'     : 60

    },
  })
/*------------------------null,且可能会多个片区---*/
  // ables.push({
  //   'key'        : 'comArea',
  //   'label'      : '所属片区',
  //   'viewAble'   : true,
  // })
/*---------------------------*/
  ables.push({
    'key': 'attrs',
    'label': '登机口',
    'listAble': true,
    'addAble': true,
    'modAble': true,
    'viewAble': false,
    'specHandle' : 'popPage',
    'editObj': {
      'formCtrl': 'pageSelect',
      'valid': 'notNull',
      'arrayVal': true,
      'key2': "name",
      'addItemApis': {
        field     : 'area/list_field',
        editApi   : apis.area_editApi,
        name      : '配送范围(即登机口)'
      },
      'selectLen': 2,
      'label2': "配送范围",
      'requireArr': [{
        api: apis.areaApi,
        optArr: [
          {key: 'area',ttl: '登机口'},
          {key: 'terminal',ttl: '航站楼:'},
          {key: 'comArea',ttl: '片区:'}
        ]
      }],
    },
    'viewObj': {
      'hasChild': true,
      'key2': 'name'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'thumbnailName',
    'label'      : '店面图',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'file',
      'note'          : '推荐尺寸：300*300，大小不超过100k',
      'limitSize'     : 100
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
      'placeholder'    : '如：020-29813006'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopMobile',
    'label'      : '商家手机号',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'placeholder'    : '如：13600000000',
      'valid'           : 'notNull',
      'type'           : 'phone'
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'isDefault',
    'label'      : '是否默认',
    'defVal'     : 0,
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
    'key'        : 'areaId',
    'label'      : 'areaID',
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'area',
    'label'      : '登机口',
    'isChild'      : true
  })
 /*---------------------------*/
  ables.push({
    'key'        : 'comArea',
    'label'      : '片区',
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'terminal',
    'label'      : '航站楼',
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'status',
    'label'      : '状态',
    'isChild'      : true
  })
/*---------------------------*/
  return ables
}