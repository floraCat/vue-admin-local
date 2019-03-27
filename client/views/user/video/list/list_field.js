export default function checkField(_this) {
	let apis = {
		tagsApi: window.API.url + '/tags/typelist' + window.API.suf,
		catsApi: window.API.url + '/video/categorylist' + window.API.suf,
		tags_editApi  : window.API.url + '/tags/save' + window.API.suf,
		cats_editApi  : window.API.url + '/video/categorysave' + window.API.suf,
	}
	let ables = []
	ables.push({
    'key'        : 'id',
    'label'      : 'ID',
    'viewAble'   : true,
  })
	ables.push({
		'key': 'videoName',
		'label': '视频名字',
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
		'key': 'videoUrl',
		'label': '视频地址',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
			'valid': 'notNull',
			'placeholder'  : '如：https://aaa.com/bbb.mp4',
		},
	})
	ables.push({
		'key': 'videoImage',
		'label': '视频封面',
		'listAble': true,
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'file',
			'valid'   : 'notNull',
			'note'    : '推荐尺寸：300*428，大小不超过150k',
  			'limitSize' : 150
		},
	})
	ables.push({
		'key': 'videoLink',
		'label': '视频链接',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
			'placeholder'  : '如：http://v.baidu.com/xxx.html',
		},
	})
	ables.push({
		'key': 'videoDesc',
		'label': '视频简介',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'textarea',
		},
	})
	ables.push({
		'key': 'categoryId',
		'label': '分类Id',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'pageSelect',
			'valid': 'notNull',
			'label2': "所属分类",
			'key2': "categoryName",
			'addItemApis': {
		        field     : 'video/category/list_field',
		        editApi   : apis.cat_editApi,
		        name      : '视频分类'
		    },
			'requireArr': [{
				api: apis.catsApi,
				optArr: [
					{key: 'categoryName'}
				]
			}]
		},
	})
	ables.push({
		'key': 'categoryName',
		'label': '分类名称',
		'viewAble': true,
	})
	ables.push({
		'key': 'attrs',
		'label': '视频标签',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'listSelect',
			'key2': "name",
			'label2': "视频标签",
			'arrayVal': true,
			'selectLen':2,
			'addItemApis': {
		        field     : 'tags/list/list_field',
		        editApi   : apis.tags_editApi,
		        name      : '通用标签'
		    },
			'requireArr': [{
				api: apis.tagsApi + '?tagsType=joy',
				key: 'tagsName'
			}]
		},
		'viewObj': {
			hasChild     : true,
			key2         : 'name'
		}
	})
	ables.push({
		'key': 'remark',
		'label': '备注',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
		},
	})
	ables.push({
		'key': 'orderBy',
		'label': '排序',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
			'type'          : 'number',
      		'placeholder'   : '请输入数字',
		},
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
	return ables
}