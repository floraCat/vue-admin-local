export default function checkField(_this) {
	let apis = {
		areaApi: window.API.url + '/area/list' + window.API.suf
	}
	let ables = []
	ables.push({
		'key': 'id',
		'label': 'ID',
		'viewAble': true,
	})
	ables.push({
		'key': 'userName',
		'label': '账号',
		'listAble': true,
		'listAble_mobile': true,
		'listAble_pad': true,
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'searchAble': true,
		'editObj': {
			'formCtrl': 'text',
			'valid': 'notNull',
		},
	})
	ables.push({
		'key': 'mobileNo',
		'label': '手机号',
		'listAble': true,
		'listAble_mobile': true,
		'listAble_pad': true,
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'searchAble': true,
		'editObj': {
			'formCtrl': 'text',
			'placeholder'    : '如：13600000000',
			'valid': 'notNull',
			'type': 'phone',
		},
	})
	/*---------------------------*/
	  ables.push({
	    'key': 'attrs',
	    'label': '登机口',
	    'defVal': [],
	    'addAble': true,
	    'modAble': true,
	    'viewAble': false,
	    'popPage' : true,
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
	    'key': 'click',
	    'label': '配送范围',
	    'listAble': true
	  })
	/*---------------------------*/
	ables.push({
		'key': 'answer1',
		'label': 'answer1',
		'viewAble': true,
	})
	ables.push({
		'key': 'email',
		'label': '邮箱',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
			'placeholder'    : '如：xxx@qq.com',
		},
	})
	ables.push({
		'key': 'identifyingCode',
		'label': 'identifyingCode',
		'viewAble': true,
	})
	ables.push({
		'key': 'isDefault',
		'label': '是否默认',
		'defVal': 0,
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'radio',
		},
	})
	ables.push({
		'key': 'name',
		'label': 'name',
		'viewAble': true,
	})
	ables.push({
		'key': 'orderBy',
		'label': '排序',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
			'type'    : 'number',
			'placeholder'    : '请输入数字',
		},
	})
	ables.push({
		'key': 'password',
		'label': 'password',
	})
	ables.push({
		'key': 'passwordQuest1',
		'label': 'passwordQuest1',
	})
	ables.push({
		'key': 'registerDate',
		'label': '注册时间',
		'viewAble': true,
	})
	ables.push({
		'key': 'status',
		'label': '状态',
		'defVal': 0,
		'listAble': true,
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'radio',
		},
	})
/*---------------------------*/
  ables.push({
    'key'        : 'areaId',
    'label'      : 'ID',
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