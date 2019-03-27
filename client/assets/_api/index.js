window.API = {};

// API.HOST = 'https://dev.veryxiang.com/';
// API.suf = '';

API.HOST = 'http://localhost:8066/json/';
API.suf = '.json';

API.menu = {
	path: 'menu',
	type: 'GET',
	data: {
		tenantId: 'BAIYUNAIRPORT'
	}
};
API.switch = {
	path: 'dic/switch',
	type: 'GET',
	data: {
		dicCode: 'TENANTID'
	}
};
API.monitorlist = {
	path: 'booth/monitorlist',
	type: 'GET',
	data: {
		pageNo: 1,
		pageSize: 5,
		enter: 1
	}
};
API.advertisement = {
	path: 'advertisement/advertisement/list',
	type: 'GET',
	data: {
		pageNo: 1,
		pageSize: 5
	}
};
API.ad_on = {
	path: 'advertisement/ad_on/list',
	type: 'GET',
	data: {
		pageNo: 1,
		pageSize: 5
	}
};
API.ad_customer = {
	path: 'advertisement/ad_customer/list',
	type: 'GET',
	data: {
		pageNo: 1,
		pageSize: 15
	}
};
API.ad_resource = {
	path: 'advertisement/ad_resource/list',
	type: 'GET',
	data: {
		pageNo: 1,
		pageSize: 15
	}
};
API.area = {
	path: 'area/list',
	type: 'GET',
	data: {
		pageNo: 1,
		pageSize: 15
	}
};
API.booth = {
	path: 'booth/list',
	type: 'GET',
	data: {
		pageNo: 1,
		pageSize: 15
	}
};
API.monitorlist = {
	path: 'booth/monitorlist',
	type: 'GET',
	data: {
		enter: 1,
		pageNo: 1,
		pageSize: 15
	}
};
// API.xxxx = {
// 	path: 'xxxx',
// 	type: 'GET',
// 	data: {
// 		xxxx: 'xxxxx'
// 	}
// };
// API.xxxx = {
// 	path: 'xxxx',
// 	type: 'GET',
// 	data: {
// 		xxxx: 'xxxxx'
// 	}
// };
// API.xxxx = {
// 	path: 'xxxx',
// 	type: 'GET',
// 	data: {
// 		xxxx: 'xxxxx'
// 	}
// };
// API.xxxx = {
// 	path: 'xxxx',
// 	type: 'GET',
// 	data: {
// 		xxxx: 'xxxxx'
// 	}
// };
// API.xxxx = {
// 	path: 'xxxx',
// 	type: 'GET',
// 	data: {
// 		xxxx: 'xxxxx'
// 	}
// };
// API.xxxx = {
// 	path: 'xxxx',
// 	type: 'GET',
// 	data: {
// 		xxxx: 'xxxxx'
// 	}
// };
// API.xxxx = {
// 	path: 'xxxx',
// 	type: 'GET',
// 	data: {
// 		xxxx: 'xxxxx'
// 	}
// };
// API.charge = {
// 	path: 'charge/stat',
// 	type: 'GET',
// 	data: {
// 		xxxx: 'xxxxx'
// 	}
// };
API.logout = {
	path: 'logout',
	type: 'POST',
	data: {}
};
API.login = {
	path: 'login',
	type: 'GET',
	data: {
		userName: 'admin',
		password: 'gzxxkjdsjd301'
	}
};

export default window.API;
