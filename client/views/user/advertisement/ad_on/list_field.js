
export default function checkField () {
  let apis = {
    parentsApi         : window.API.url + '/dic/getdetailbykey' + window.API.suf,
    adListApi          : window.API.url + '/advertisement/advertisement/list' + window.API.suf,
    adAddrApi          : window.API.url + '/dic/getdetail' + window.API.suf,
    ad_editApi          : window.API.url + '/advertisement/advertisement/save' + window.API.suf,
    other_editApi      : window.API.url + '/dic/detailsave' + window.API.suf,
    other2_editApi     : window.API.url + '/dic/detailsave' + window.API.suf,
  }
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'adName',
    'label'      : '广告名称',
    'listAble'   : true,
    'listAble_mobile'      : true,
    'listAble_pad'      : true,
    'viewAble'   : true,
    'searchAble' : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'adId',
    'label'      : '广告ID',
    'addAble'    : true,
    'viewAble'   : true,
    'editObj'    : {
      'formCtrl'   : 'pageSelect',
      'valid'      : 'notNull',
      'key2'       : "adName",
      'label2'     : "广告名称",
      'addItemApis': {
        field     : 'advertisement/advertisement/list_field',
        editApi   : apis.ad_editApi,
        name      : '新广告'
      },
      'selectLen'  : 1,
      'requireArr' : [
        {
          api: apis.adListApi,
          paramKey: 'parentId',
          paramVal: null,
          optArr: [
            {key: 'adName'}
          ]
        }
      ],
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'adCode',
    'label'      : '广告编码',
    'viewAble'   : true,
    'searchAble' : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'thumbnail',
    'label'      : '缩略图',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------1.6*/
  ables.push({
    'key'        : 'boxes',
    'label'      : '所属设备',
    'addAble'    : true,      
    'viewAble'   : true,
    'editObj'    : {
      'formCtrl'   : 'listSelect',
      'label2'     : "设备位置",
      'addItemApis': {
        field     : 'dic/detaillist_field',
        editApi : apis.other_editApi,
        parentsApi: apis.parentsApi,
        dicCode   : 'BOOTH_ADDRESS',
        dicId     : 12
      },
      'selectLen'  : 2,
      'requireArr' : [
        {
          api: apis.parentsApi+'?key=ad',
          paramKey: 'parentId',
          paramVal: null,
          key: 'dicDetailName'
        },
        {
          api: apis.parentsApi+'?key=ad',
          paramKey: 'parentId',
          paramVal: null,
          key: 'dicDetailName'
        },
      ],
    },
    'viewObj'    : {
      hasChild     : true,
      key2         : 'boxName'
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'location',
    'label'      : '广告位置ID',
    'addAble'    : true,      
    'viewAble'   : true,
    'editObj'    : {
      'formCtrl'   : 'listSelect',
      'valid'      : 'notNull',
      'label2'     : "广告位置",
      'key2'       : "dicDetailName",
      'addItemApis': {
        field     : 'dic/detaillist_field',
        parentsApi: apis.parentsApi,
        editApi   : apis.other2_editApi,
        dicCode   : 'INFO_LOCATION',
        dicId     : 31,
        name      : '广告发布位置'
      },
      // 'showDef'    : true,
      'requireArr' : [
        {
          api: apis.adAddrApi,
          paramKey: 'dicCode',
          paramVal: 'INFO_LOCATION',
          key: 'dicDetailName',
        }
      ],
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'locationName',
    'label'      : '广告位置',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'sortBy',
    'label'      : '排序',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'type'          : 'number',
      'placeholder'   : '请输入数字',
    }, 
  })
/*---------------------------*/
  ables.push({
    'key'        : 'addedDate',
    'label'      : '上架时间',
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
    'key'        : 'createUsername',
    'label'      : '创建者',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'createDate',
    'label'      : '创建时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customerName',
    'label'      : '客户名称',
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'select',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'offDate',
    'label'      : '下架时间',
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
    'key'        : 'updateDate',
    'label'      : '修改时间',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'updateUsername',
    'label'      : '修改者',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remark',
    'label'      : '备注',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'textarea',
    },
  })
/*---------------------------*/
  ables.push({
    'key'        : 'status',
    'label'      : '状态',
    'defVal'     : 0,
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'radio',
    },
  })
/*---------------------------------------------------------*/
  ables.push({
    'key'        : 'addrName',
    'label'      : '点位名称',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'addrId',
    'label'      : '点位ID',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'addrCode',
    'label'      : '点位编码',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boothName',
    'label'      : '充电亭名称',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boothId',
    'label'      : '充电亭ID',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boothCode',
    'label'      : '充电亭编码',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxName',
    'label'      : '柜机名称',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxNo',
    'label'      : '柜机代号',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxCode',
    'label'      : '柜机编码',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxTypeName',
    'label'      : '类型',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxTypeId',
    'label'      : '类型ID',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxTypeCode',
    'label'      : '类型编码',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'boxTypeNo',
    'label'      : '类型代号',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'ip',
    'label'      : 'IP',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'mac',
    'label'      : 'mac地址',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  return ables
}