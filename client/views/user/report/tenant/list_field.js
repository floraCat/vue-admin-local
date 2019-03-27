
let checkField = {}

/*listFilter 报表筛选数据字段*/
checkField.listFilter = function (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'appid',
    'label'      : 'appID',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'publicNo',
    'label'      : '公众号名称',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'addedDate',
    'label'      : '上架时间',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'offDate',
    'label'      : '下架时间',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customer_amount',
    'label'      : '已关注粉丝量',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'account_balance',
    'label'      : '账户余额',
  })
/*---------------------------*/
  return ables
}

/*listAll 报表全部数据字段*/
checkField.listAll = function (_this) {
  let apis = {}
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'registerDate',
    'label'      : '日期',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customer_amount',
    'label'      : '粉丝量',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'account_unit_price',
    'label'      : '粉丝单价',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'accout_total',
    'label'      : '总金额',
  })
/*---------------------------*/
  return ables
}

/*listDay 报表每天数据字段*/
checkField.listDay = function (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'surName',
    'label'      : '用户昵称',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'age',
    'label'      : '年龄',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'gender',
    'label'      : '性别',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'registerDate',
    'label'      : '关注时间',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'tenantId',
    'label'      : '扫码机场',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'mac',
    'label'      : '使用设备mac',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'type',
    'label'      : '设备类型',
  })
/*---------------------------*/
  return ables
}


export default checkField