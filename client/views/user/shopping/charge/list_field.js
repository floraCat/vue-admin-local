
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'id',
    'label'      : 'ID',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'chargeNo',
    'label'      : '订单号',
    'searchAble' : true,
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'chargeStatus',
    'label'      : '状态码',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'mac',
    'label'      : 'mac地址',
    // 'searchAble' : true,
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'currentDate',
    'label'      : 'currentDate',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'mobileNo',
    'label'      : '手机号',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'openDate',
    'label'      : '开启时间',
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
    'key'        : 'timeLong',
    'label'      : '剩余时长',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'type',
    'label'      : '充电type',
    'viewAble'   : true,
  })
/*---------------------------*/
  return ables
}