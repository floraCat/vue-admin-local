
let checkField = {}


/*listFilter & listAll 公众号报表字段*/
checkField.listFilter = function (_this) {
  let apis = {}
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'registerDate',
    'label'      : '日期',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'subAmount',
    'label'      : '关注粉丝量',
    'handle'     : 'sum'
  })
/*---------------------------*/
  ables.push({
    'key'        : 'fansUnitPrice',
    'label'      : '粉丝单价',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'costMoney',
    'label'      : '总金额',
    'handle'     : 'sum'
  })
/*---------------------------*/
  return ables
}

/*listDay 每天报表字段*/
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
    'key'        : 'areaName',
    'label'      : '使用设备',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'proVersion',
    'label'      : '设备类型',
  })
/*---------------------------*/
  return ables
}


export default checkField