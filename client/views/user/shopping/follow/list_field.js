export default function checkField(_this) {
	let apis = {
		tagsApi: window.API.url + '/tags/typelist' + window.API.suf,
		catsApi: window.API.url + '/video/categorylist' + window.API.suf,
		areaApi: window.API.url + '/area/list' + window.API.suf,
	}
	let ables = []
	ables.push({
		'key'        : 'id',
		'label'      : 'ID',
		'viewAble'   : true,
	})
	/*-------------*/
	ables.push({
		'key': 'appid',
		'label': 'appid',
		// 'listAble': true,
		// 'listAble_mobile': true,
		// 'listAble_pad': true,
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'searchAble': true,
		'editObj': {
			'formCtrl': 'text',
			'valid': 'notNull',
		},
	})
	/*-------------*/
	ables.push({
		'key': 'publicNo',
		'label': '公众号名称',
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
	/*-------------*/
	ables.push({
		'key': 'company',
		'label': '公司名称',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
		},
	})
	/*-------------*/
	ables.push({
		'key': 'orderBy',
		'label': '权重',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
			'type'         : 'number2',
      	  	'placeholder'  : '权重越高优先级别越高，值不能小于0',
		},
	})
	/*-------------*/
	ables.push({
		'key': 'publicNoLogo',
		'label': '商标',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'file',
			'valid'   : 'notNull',
			'note'          : '推荐尺寸：200*200，大小不超过60k',
  			'limitSize'     : 60
		},
	})
	/*-------------*/
	ables.push({
		'key': 'qrImage',
		'label': '二维码',
		// 'listAble': true,
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'file',
			'valid'   : 'notNull',
			'note'          : '推荐尺寸：258*258，大小不超过60k',
  			'limitSize'     : 60
		},
	})
	/*---------------------------*/
	  ables.push({
	    'key'        : 'fansUnitPrice',
	    'label'      : '粉丝单价',
	    'addAble'    : true,
	    'modAble'    : true,
	    'viewAble'   : true,
	    'editObj'        : {
	      'formCtrl'       : 'text',
	      'type'         : 'number',
      	  'placeholder'  : '请输入数字',
	    },
	  })
	 /*---------------------------*/
	  ables.push({
	    'key'        : 'subAmount',
	    'label'      : '最大关注量',
	    'addAble'    : true,
	    'modAble'    : true,
	    'viewAble'   : true,
	    'editObj'        : {
	      'formCtrl'       : 'text',
	      'type'         : 'number',
      	  'placeholder'  : '请输入数字',
	    },
	  })
	 /*---------------------------*/
	  ables.push({
	    'key'        : 'subAmountTotal',
	    'label'      : '关注量',
	    'listAble'   : true,
	    'viewAble'   : true,
	  })
	/*---------------------------*/
	  ables.push({
	    'key'        : 'totalPay',
	    'label'      : '充值总额',
	    'listAble'   : true,
	    'addAble'    : true,
	    'modAble'    : true,
	    'viewAble'   : true,
	    'editObj'        : {
	      'formCtrl'       : 'text',
	      'type'         : 'number',
      	  'placeholder'  : '请输入数字',
	    },
	  })
	/*---------------------------*/
	  ables.push({
	    'key'        : 'remainPay',
	    'label'      : '账户余额',
	    'viewAble'   : true,
	    'editObj'        : {
	      'formCtrl'       : 'text',
	      'type'         : 'number',
      	  'placeholder'  : '请输入数字',
	    },
	  })
	 /*---------------------------*/
	  ables.push({
	    'key'        : 'addedDate',
	    'label'      : '开始时间',
	    'addAble'    : true,
	    'modAble'    : true,
	    'viewAble'   : true,
	    'editObj'        : {
	      'formCtrl'       : 'picker',
	    },
	  })
	/*---------------------------*/
	  ables.push({
	    'key'        : 'offDate',
	    'label'      : '结束时间',
	    'listAble'   : true,
	    'addAble'    : true,
	    'modAble'    : true,
	    'viewAble'   : true,
	    'editObj'        : {
	      'formCtrl'       : 'picker',
	    },
	  })
	/*---------------------------*/
	  ables.push({
	    'key'        : 'attrs',
	    'label'       : '登机口Id',
	    'addAble'    : true,
	    'modAble'    : true,
	    'viewAble'   : true,
	    'editObj'        : {
	      'formCtrl': 'pageSelect2',
	      'valid': 'notNull',
	      'arrayVal': true,
	      'label2': '所属登机口',
	      'key2': "name",
	      'addItemApis': {
	        field     : 'area/list_field',
	        editApi   : apis.area_editApi,
	        name      : '配送范围(即登机口)'
	      },
	      'requireArr': [{
	        api: apis.areaApi,
	        optArr: [
	          {key:'area', ttl: '登机口'},
	          {key:'terminal', ttl: '航站楼'},
	          {key:'comArea', ttl: '片区'}
	        ],
	        filterArr: [
	          {key:'area', ttl: '登机口', val:''},
	          {key:'comArea', ttl: '片区', val:''}
	        ]
	      }],
	    },
	  })
	/*-------------*/
	ables.push({
		'key': 'clickNo',
		'label': '点击次数',
		'viewAble': true,
	})
	/*-------------*/
	ables.push({
		'key': 'scanNo',
		'label': 'scanNo',
		'viewAble': true,
	})
	/*-------------*/
	ables.push({
		'key': 'subNo',
		'label': 'subNo',
		'viewAble': true,
	})
	/*-------------*/
	// ables.push({
	// 	'key': 'createQrcode',
	// 	'label': '推广二维码',
	// 	'defVal': 0,
	// 	'addAble': true,
	// 	'modAble': true,
	// 	'viewAble': true,
	// 	'editObj': {
	// 		'formCtrl': 'radio',
	// 		'val0'   : '不生成',
	// 		'val1'   : '生成',
	// 	},
	// })
	/*-------------*/
	ables.push({
		'key': 'isDefault',
		'label': '是否默认',
		'defVal': 0,
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'radio',
			'val0': '否',
			'val1': '是',
		},
	})
	/*-------------*/
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
	/*-------------*/
	return ables
}