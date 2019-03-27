export default function checkField(_this) {
	let apis = {
		shopsApi: window.API.url + '/mall/list' + window.API.suf,
    mall_editApi  : window.API.url + '/mall/save' + window.API.suf,
	}
	let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'id',
    'label'      : 'ID',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'userName',
    'label'      : '用户名',
    'listAble'    : true,
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
    'key'        : 'mobileNo',
    'label'      : '手机号',
    'listAble'    : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'placeholder'    : '如：13600000000',
      'valid'          : 'notNull',
      'type'          : 'phone',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopingId',
    'label'      : '店铺ID',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'pageSelect',
      'valid'          : 'notNull',
      'label2'         : '所属店铺',
      'key2': "shopName",
      'addItemApis': {
        field     : 'shopping/shop/list_field',
        editApi   : apis.mall_editApi,
        name      : '商家'
      },
      'requireArr': [{
        api: apis.shopsApi,
        optArr: [
          {key: 'shopName'},
          {key: 'shopAddr', ttl: '地址:'},
        ]
      }]
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopName',
    'label'      : '商家名称',
    'listAble'    : true,
    'viewAble'   : true,
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
  ables.push({
    'key'        : 'registerDate',
    'label'      : '注册日期',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'status',
    'label'      : '状态',
    'listAble'    : true,
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