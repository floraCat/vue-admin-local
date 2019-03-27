export default function checkField(_this) {
  let ables = []
	ables.push({
		'key': 'appid',
		'label': 'appId',
		'listAble': true,
		'listAble_mobile': true,
		'listAble_pad': true,
		'viewAble': true,
		'searchAble': true,
	})
  /*----------------------*/
  ables.push({
    'key': 'mac',
    'label': 'mac地址',
    'listAble': true,
    'viewAble': true,
  })
  /*----------------------*/
  ables.push({
    'key': 'qrCodeLink',
    'label': '二维码',
    'listAble': true,
    'listAble_mobile': true,
    'listAble_pad': true,
    'viewAble': true,
  })
  /*----------------------*/
  ables.push({
    'key': 'qrcodePath',
    'label': '二维码图片',
    'viewAble': true,
  })
  /*----------------------*/
  ables.push({
    'key'        : 'boxes',
    'label'      : '设备',
    'viewAble'   : true,
    'viewObj' : {
      'hasChild': true,
      'key2'    : 'boxName',
    },
  })
	/*----------------------*/
	ables.push({
		'key': 'created',
		'label': '创建时间',
		'viewAble': true,
	})
	/*----------------------*/
	ables.push({
		'key': 'qrCodeStatus',
		'label': '状态',
		'listAble': true,
		'viewAble': true,
		'searchAble': true,
		'searchObj'  : {
	      opts: [{txt:'生成失败',val:100}, {txt:'生成成功',val:200}, {txt:'已推送',val:300}, {txt:'推送成功',val:400}],
	      defOpt: {txt:'生成成功',val:200}
	    }
	})
	


/*---------------------------*/
  ables.push({
    'key'        : 'boxCode',
    'label'      : '设备编码',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxName',
    'label'      : '设备名称',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxNo',
    'label'      : '设备代号',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'      : '创建时间',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createUserName',
    'label'      : '创建者',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'ip',
    'label'      : 'IP',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'mac',
    'label'      : 'mac地址',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remark',
    'label'      : '备份',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'proVersion',
    'label'      : '版本',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'seatNo',
    'label'      : '座位号',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'comArea',
    'label'      : '片区',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'terminal',
    'label'      : '航站楼',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'area',
    'label'      : '登机口',
    'viewAble'   : true,
    'isChild'    : true
  })


	return ables
}