
export default function checkField (_this) {
  let ables = []
  let apis = {
		parentsApi: window.API.url + '/area/allget' + window.API.suf
	}
/*---------------------------*/
  ables.push({
    'key'        : 'headImgUrl',
    'label'      : '头像',
    'listAble'   : true,
    'listAble_mobile'      : true,
    'listAble_pad'      : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'surName',
    'label'      : '昵称',
    'listAble'   : true,
    'listAble_mobile'      : true,
    'listAble_pad'      : true,
    'viewAble'   : true,
    'searchAble' : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'age',
    'label'      : '年龄',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'city',
    'label'      : '城市',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'country',
    'label'      : '国家',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'email',
    'label'      : '邮箱',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'faceId',
    'label'      : '人脸识别ID',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'gender',
    'label'      : '性别',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'mobileNo',
    'label'      : '手机',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'userName',
    'label'      : '用户名',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'userTags',
    'label'      : '用户标签',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'registerDate',
    'label'      : '注册日期',
    'searchAble' : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'permissionsId',
    'listAble'   : true,
    'label'      : '操作权限',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remark',
    'label'      : '备注',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'status',
    'label'      : '状态',
    'listAble'   : true,
    'viewAble'   : true,
  })

  return ables
}