
/*
 * 按需加载的路由
 *
 * 延时加载方法resolve => require(['xxx'], resolve)中组件路径xxx不能拼接
 * 对本项目路由是从线上数据决定的
 * 解决方案是预先把所有可能的组件先加载，
 * 再遍历比对线上有的菜单再赋值到Router实例对应的component属性上
 *
 */

export default [
  {
  	path:'/', 
  	comp: resolve => require(['views/user/home'], resolve)
  },
  {
  	path:'/dic/detaillist', 
  	comp: resolve => require(['views/user/dic/detaillist'], resolve)
  },
  {
    path:'/area/index', 
    comp: resolve => require(['views/user/area/index'], resolve)
  },
  {
  	path:'/box/list', 
  	comp: resolve => require(['views/user/box/list'], resolve)
  },
  {
  	path:'/shopping/order/list', 
  	comp: resolve => require(['views/user/shopping/order/list'], resolve)
  },
  {
  	path:'/shopping/good/index', 
  	comp: resolve => require(['views/user/shopping/good/index'], resolve)
  },
  {
    path:'/shopping/good/_item/list', 
    comp: resolve => require(['views/user/shopping/good/_item/list'], resolve)
  },
  {
    path:'/shopping/good/_cat/list', 
    comp: resolve => require(['views/user/shopping/good/_cat/list'], resolve)
  },
  {
  	path:'/shopping/shop/list', 
  	comp: resolve => require(['views/user/shopping/shop/list'], resolve)
  },
  {
    path:'/shopping/shopApp/list', 
    comp: resolve => require(['views/user/shopping/shopApp/list'], resolve)
  },
  {
  	path:'/shopping/send/list', 
  	comp: resolve => require(['views/user/shopping/send/list'], resolve)
  },
  {
  	path:'/shopping/bill/index', 
  	comp: resolve => require(['views/user/shopping/bill/index'], resolve)
  },
  {
    path:'/shopping/bill/_shop/list', 
    comp: resolve => require(['views/user/shopping/bill/_shop/list'], resolve)
  },
  {
    path:'/shopping/bill/_tosend/list', 
    comp: resolve => require(['views/user/shopping/bill/_tosend/list'], resolve)
  },
  {
    path:'/shopping/bill/_toshop/list', 
    comp: resolve => require(['views/user/shopping/bill/_toshop/list'], resolve)
  },
  {
  	path:'/channel/index', 
  	comp: resolve => require(['views/user/channel/index'], resolve)
  },
  {
  	path:'/notice/list', 
  	comp: resolve => require(['views/user/notice/list'], resolve)
  },
  {
  	path:'/booth/monitorlist', 
  	comp: resolve => require(['views/user/booth/monitorlist'], resolve)
  },
  {
  	path:'/booth/list', 
  	comp: resolve => require(['views/user/booth/list'], resolve)
  },
  {
  	path:'/advertisement/ad_resource/list', 
  	comp: resolve => require(['views/user/advertisement/ad_resource/list'], resolve)
  },
  {
  	path:'/advertisement/ad_customer/list', 
  	comp: resolve => require(['views/user/advertisement/ad_customer/list'], resolve)
  },
  {
  	path:'/advertisement/advertisement/list', 
  	comp: resolve => require(['views/user/advertisement/advertisement/list'], resolve)
  },
  {
  	path:'/advertisement/ad_on/list', 
  	comp: resolve => require(['views/user/advertisement/ad_on/list'], resolve)
  },
  {
  	path:'/xlsdata/list', 
  	comp: resolve => require(['views/user/xlsdata/list'], resolve)
  },
  {
  	path:'/dic/list', 
  	comp: resolve => require(['views/user/dic/list'], resolve)
  },
  {
  	path:'/user/list', 
  	comp: resolve => require(['views/user/user/list'], resolve)
  },
  {
  	path:'/menu/list', 
  	comp: resolve => require(['views/user/menu/list'], resolve)
  },
  {
  	path:'/role/list', 
  	comp: resolve => require(['views/user/role/list'], resolve)
  },
  {
    path:'/settings', 
    comp: resolve => require(['views/user/settings'], resolve)
  },
  {
    path:'/video/list/list', 
    comp: resolve => require(['views/user/video/list/list'], resolve)
  },
  {
    path:'/video/category/list', 
    comp: resolve => require(['views/user/video/category/list'], resolve)
  },
  {
    path:'/tags/list/list', 
    comp: resolve => require(['views/user/tags/list/list'], resolve)
  },
  {
    path:'/shopping/cust/list', 
    comp: resolve => require(['views/user/shopping/cust/list'], resolve)
  },
  {
    path:'/shopping/charge/list', 
    comp: resolve => require(['views/user/shopping/charge/list'], resolve)
  },
  {
    path:'/shopping/follow/list', 
    comp: resolve => require(['views/user/shopping/follow/list'], resolve)
  },
  {
    path:'/remote/list', 
    comp: resolve => require(['views/user/remote/list'], resolve)
  },
  {
    path:'/analyse/charge/index', 
    comp: resolve => require(['views/user/analyse/charge/index'], resolve)
  },
  {
    path:'/analyse/ad/index', 
    comp: resolve => require(['views/user/analyse/ad/index'], resolve)
  },
  {
    path:'/analyse/issue/index', 
    comp: resolve => require(['views/user/analyse/issue/index'], resolve)
  },
  {
    path:'/extend/list/list', 
    comp: resolve => require(['views/user/extend/list/list'], resolve)
  },
  {
    path:'/report/brand/list', 
    comp: resolve => require(['views/user/report/brand/list'], resolve)
  },
  {
    path:'/report/tenant/list', 
    comp: resolve => require(['views/user/report/tenant/list'], resolve)
  },
  {
    path:'/advertisement/ad_count/list', 
    comp: resolve => require(['views/user/advertisement/ad_count/list'], resolve)
  },
  {
    path:'/examine/question/index', 
    comp: resolve => require(['views/user/examine/question/index'], resolve)
  },
  {
    path:'/examine/issue/index', 
    comp: resolve => require(['views/user/examine/issue/index'], resolve)
  },
  {
    path:'/feedback/list', 
    comp: resolve => require(['views/user/feedback/list'], resolve)
  }
]