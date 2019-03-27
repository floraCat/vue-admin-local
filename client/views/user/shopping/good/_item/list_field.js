
export default function checkField (channels) {
  let apis = {
    shopListApi   : window.API.url + '/mall/list' + window.API.suf,
    tagsApi  : window.API.url + '/tags/list' + window.API.suf,
    tags_editApi  : window.API.url + '/tags/save' + window.API.suf,
    mall_editApi  : window.API.url + '/mall/save' + window.API.suf,
  }
  let ables = []
/*---------------------------*/
  ables.push({
    'key'        : 'id',
    'label'      : 'ID',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsName',
    'label'      : '商品名称',
    'listAble'   : true,
    'listAble_mobile'      : true,
    'listAble_pad'      : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'searchAble' : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'valid'          : 'notNull',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsNameEn',
    'label'      : '商品名称En',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsPrice',
    'label'      : '价格',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'     : 'text',
      'type'         : 'number',
      'placeholder'  : '请输入数字',
      'valid'        : 'notNull',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsCode',
    'label'      : '商品代号',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'hidden',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsDesc',
    'label'      : '商品详情',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      // 'formCtrl'       : 'editor',
      'formCtrl'       : 'textarea',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsDescEn',
    'label'      : '商品详情En',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      // 'formCtrl'       : 'editor',
      'formCtrl'       : 'textarea',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'totalNum',
    'label'      : '月销',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'type'          : 'number',
      'placeholder'  : '请输入数字',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'inventory',
    'label'      : '库存',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'type'          : 'number',
      'placeholder'  : '请输入数字',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsType',
    'label'      : '规格',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'placeholder'  : '如：大份/中份/小份',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'attrs',
    'label'      : '商品标签',
    'defVal'     : [],
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj': {
      'formCtrl': 'pageSelect',
      'key2': "name",
      'addItemApis': {
        field     : 'tags/list/list_field',
        editApi   : apis.tags_editApi,
        name      : '通用标签'
      },
      'arrayVal': true,
      'selectLen':2,
      'requireArr': [{
        api: apis.tagsApi,
        optArr: [
          {
            key: 'tagsName'
          }
        ]
      }]
    },
    'viewObj': {
      hasChild     : true,
      key2         : 'name'
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'typeId',
    'label'      : '所属分类',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'linkSelect',
      'valid'          : 'notNull',
      'channels'       : channels,
      'field'          : 'categoryName'
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'categoryName',
    'label'      : '分类名称',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'isDefault',
    'label'      : '默认',
    'defVal'     : 0,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'radio',
      'val0'           : '否',
      'val1'           : '是',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopId',
    'label'      : '商家ID',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'   : 'pageSelect',
      'valid'      : 'notNull',
      'key2'       : "shopName",
      'label2'     : "商家名称",
      'addItemApis': {
        field     : 'shopping/shop/list_field',
        editApi   : apis.mall_editApi,
        name      : '商品商家'
      },
      'selectLen'  : 1,
      'requireArr' : [
        {
          api: apis.shopListApi,
          optArr: [
            {key:'shopName', ttl: ''},
            {key:'shopAddr', ttl: '地址：'}
          ]
        }
      ],
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopName',
    'label'      : '商家名称',
    'listAble'   : true,
    'viewAble'   : true,
    'searchAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopMobile',
    'label'      : '商家手机',
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'type'           : 'phone'
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopTel',
    'label'      : '商家座机',
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopAddr',
    'label'      : '商家地址',
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'recommend',
    'label'      : '推荐',
    'defVal'     : 0,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'radio',
      'val0'           : '否',
      'val1'           : '是',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'thumbnailName',
    'label'      : '缩略图',
    'listAble'   : true,
    'addAble'    : true,
    'modAble'   : true,
    'editObj'    : {
      'formCtrl'   : 'hidden'
    },
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsImage',
    'label'       : '商品图',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'file',
      'note'          : '推荐尺寸：650*650，大小不超过200k',
      'limitSize'     : 200,
      'saveField2'    : 'thumbnailName',
      'saveFile2'     : 'resExt1'
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'orderBy',
    'label'       : '排序',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'text',
      'type'          : 'number',
      'placeholder'   : '请输入数字',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'remark',
    'label'       : '备注',
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'textarea',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsStatus',
    'label'      : '上下架',
    'defVal'     : 0,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'listAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'radio',
      'val0'           : '下架',
      'val1'           : '上架',
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'status',
    'label'      : '状态',
    'defVal'     : 0,
    'addAble'    : true,
    'modAble'    : true,
    'viewAble'   : true,
    'editObj'        : {
      'formCtrl'       : 'radio',
    }
  })
  return ables
}