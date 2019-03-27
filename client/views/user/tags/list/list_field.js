export default function checkField(_this) {
	let ables = []
	ables.push({
    'key'        : 'id',
    'label'      : 'ID',
    'viewAble'   : true,
  })
	ables.push({
		'key': 'tagsName',
		'label': '标签名',
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
		'key': 'tagsType',
		'label': '标签类型',
		'listAble': true,
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
			'placeholder' : '如：age (age-年龄标签，o2o-商城标签，joy-娱乐标签)'
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
			'type'    : 'number',
      		'placeholder'   : '请输入数字',
		},
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
			'val0'    : '否',
      		'val1'    : '是',
		},
	})
	ables.push({
		'key': 'tagsCode',
		'label': '标签编码',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
			'placeholder'   : '如：1 (1为男,2为女)',
		},
	})
	return ables
}