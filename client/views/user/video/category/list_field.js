export default function checkField(_this) {
	let apis = {
		parentsApi: window.API.url + '/area/allget' + window.API.suf
	}
	let ables = []
	ables.push({
		'key': 'id',
		'label': 'ID',
		'viewAble': true,
	})
	ables.push({
		'key': 'categoryName',
		'label': '分类名称',
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
		'key': 'categoryNameEn',
		'label': '分类名称En',
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'text',
		},
	})
	ables.push({
		'key': 'categoryCode',
		'label': '分类编码',
		'viewAble': true,
	})
	ables.push({
		'key': 'categoryImage',
		'label': '图片',
		'listAble': true,
		'addAble': true,
		'modAble': true,
		'viewAble': true,
		'editObj': {
			'formCtrl': 'file',
			'valid': 'notNull',
		},
	})
	ables.push({
		'key': 'categoryExt1',
		'label': 'Ext1',
		'viewAble': true,
	})
	ables.push({
		'key': 'categoryExt2',
		'label': 'Ext2',
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
			'val0'    : '否',
      		'val1'    : '是',
		},
	})
	ables.push({
		'key': 'parentId',
		'label': '父级ID',
		'viewAble': true,
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