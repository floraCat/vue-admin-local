
export default function checkField (_this) {
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'boxes',
    'label'      : '设备',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'listSelect',
      'valid'          : 'notNull',
      'modReadOnly'    : true,
    },
    'viewObj' : {
      'hasChild': true,
      'key2'    : 'boxName',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxId',
    'label'      : '设备ID',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxName',
    'label'      : '设备名称',
    'listAble'   : true,
    'listAble_mobile'   : true,
    'listAble_pad'      : true,
    'viewAble'   : true,
    'searchAble' : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'rVersion',
    'label'      : '软件版本',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'signal',
    'label'      : '信号强度',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxTypeName',
    'label'      : '设备类型',
    'viewAble'   : true,
  })
/*------------------------1.6---*/
  ables.push({
    'key'        : 'boothName',
    'label'      : '充电亭名称',
    'listAble'   : true,
    'viewAble'   : true,
    'searchAble' : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'heartbeatTimes',
    'label'      : '实际心跳次数',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'theoryHeartbeatTimes',
    'label'      : '理论心跳次数',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'heartbeatTime',
    'label'      : '当前心跳时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'      : '创建时间',
    'viewAble'   : true,
    // 'searchAble' : true,
    'searchObj'  : {
      opts: _this.optsDate(),
      defOpt: _this.curDate()
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'currentDate',
    'label'      : '上次心跳时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'interval',
    'label'      : '间隔',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'tenantId',
    'label'      : '租户ID',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remark',
    'label'      : '备份',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boothStatus',
    'label'      : '状态',
    'defVal'     : 0,
    'listAble'   : true,
    'listAble_mobile'   : true,
    'listAble_pad'      : true,
    'viewAble'   : true,
    'searchAble'   : true,
    'searchObj'  : {
      opts: [{txt:'离线',val:'offline'}, {txt:'在线',val:'online'}],
      defOpt: {txt:null,val:null}
    }
  })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'addrCode',
  //   'label'      : '点位编码',
  //   'viewAble'   : true,
  //   'isChild'    : true,
  // })
/*---------------------------*/
//   ables.push({
//     'key'        : 'addrId',
//     'label'      : '点位ID',
//     'viewAble'   : true,
//     'isChild'    : true
//   })
// /*---------------------------*/
  ables.push({
    'key'        : 'addrName',
    'label'      : '充电亭位置',
    'viewAble'   : true,
    'isChild'    : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'position',
    'label'      : '设备位置',
    'viewAble'   : true,
    'isChild'    : true,
  })
/*---------------------------*/
//   ables.push({
//     'key'        : 'boothCode',
//     'label'      : '充电亭编码',
//     'viewAble'   : true,
//     'isChild'    : true
//   })
// /*---------------------------*/
//   ables.push({
//     'key'        : 'boothName',
//     'label'      : '充电亭名称',
//     'viewAble'   : true,
//     'isChild'    : true,
//   })
// /*---------------------------*/
//   ables.push({
//     'key'        : 'boothId',
//     'label'      : '充电亭ID',
//     'viewAble'   : true,
//     'isChild'    : true
//   })
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
  // ables.push({
  //   'key'        : 'boxTypeCode',
  //   'label'      : '硬件类型编码',
  //   'viewAble'   : true,
  //   'isChild'    : true
  // })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'boxTypeId',
  //   'label'      : '硬件类型ID',
  //   'viewAble'   : true,
  //   'isChild'    : true
  // })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'boxTypeName',
  //   'label'      : '硬件类型名称',
  //   'viewAble'   : true,
  //   'isChild'    : true
  // })
/*---------------------------*/
  // ables.push({
  //   'key'        : 'boxTypeNo',
  //   'label'      : '硬件类型代号',
  //   'viewAble'   : true,
  //   'isChild'    : true
  // })
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
  // ables.push({
  //   'key'        : 'areaId',
  //   'label'      : '登机口Id',
  //   'viewAble'   : true,
  //   'isChild'    : true
  // })
/*---------------------------*/
  ables.push({
    'key'        : 'area',
    'label'      : '登机口',
    'viewAble'   : true,
    'isChild'    : true
  })
/*---------------------------*/
  return ables
}