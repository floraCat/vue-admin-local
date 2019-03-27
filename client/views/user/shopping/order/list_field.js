
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
    'key'        : 'orderName',
    'label'      : '订单名称',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'orderCode',
    'label'      : '订单号',
    'listAble'   : true,
    'viewAble'   : true,
    'searchAble' : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsList',
    'label'      : '商品信息',
    'viewAble'   : true,
    'viewObj'    : {
      hasChild     : true,
      key2         : 'goodsName'
    }
  })
/*---------------------------*/
  ables.push({
    'key'        : 'isDefault',
    'label'      : '是否默认',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'payType',
    'label'      : '支付方式',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'distrAddr',
    'label'      : '收货地点',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'mobileNo',
    'label'      : '用户联系方式',
    'listAble'   : true,
    'viewAble'   : true,
  })

/*---------------------------*/
  ables.push({
    'key'        : 'childArea',
    'label'      : '片区',
    'viewAble'   : true,
  })
  /*---------------------------*/
  ables.push({
    'key'        : 'area',
    'label'      : '登机口',
    'viewAble'   : true,
  })



/*---------------------------*/
  ables.push({
    'key'        : 'seatNo',
    'label'      : '座位号',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customerUser',
    'label'      : '用户',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'customerUserId',
    'label'      : '用户ID',
  })
/*---------------------------*/
  ables.push({
    'key'        : 'deliveryMan',
    'label'      : '配送员',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'deliverymanId',
    'label'      : '配送员ID',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopId',
    'label'      : '店铺ID',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'shopName',
    'label'      : '店铺名称',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'discount',
    'label'      : '店铺折扣',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'coupon',
    'label'      : '店铺优惠',
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'sumPrice',
    'label'      : '总价',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'totalNo',
    'label'      : '份数',
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/
  ables.push({
    'key'        : 'orderDate',
    'label'      : '下单日期',
    'listAble'   : true,
    'viewAble'   : true,
  })



/*---------------------------*/
  ables.push({
    'key'        : 'orderBy',
    'label'      : '排序',
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
    'key'        : 'orderStatus',
    'label'      : '状态码',
    'defVal'     : 0,
    'listAble'   : true,
    'viewAble'   : true,
  })
/*---------------------------*/

/*---------------------------*/
  ables.push({
    'key'        : 'goodsId',
    'label'      : '商品Id',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsName',
    'label'      : '商品名称',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsType',
    'label'      : '规格',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'goodsPrice',
    'label'      : '单价',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  ables.push({
    'key'        : 'thumbnailName',
    'label'      : '缩略图',
    'viewAble'   : true,
    'isChild'      : true
  })
/*---------------------------*/
  return ables
}