
// 对应package.json的scripts中NODE_ENV的值生成静态页
// 同时也要对应修改 /config/prod.env.js

// if (process.env.NODE_ENV === 'p1') {
// 	window.API = {
// 		url: 'http://192.168.10.210:8080/chargingbooth/',
// 		suf: ''
// 	}
// }
// else if (process.env.NODE_ENV === 'p2') {
// 	window.API = {
// 		url: 'http://localhost:8080/chargingbooth/',
// 		suf: ''
// 	}
// }
// else if (process.env.NODE_ENV === 'p3') {
// 	window.API = {
// 		url: 'http://h5.mjyun.net/',
// 		suf: ''
// 	}
// }

if (process.env.NODE_ENV === 'prod') {
	window.API = {
		url: 'https://cloud.veryxiang.com',
		suf: ''
	}
}
else if (process.env.NODE_ENV === 'dev') {
	window.API = {
		url: 'https://dev.veryxiang.com',
		suf: ''
	}
}
else {
	window.API = require('./assets/_api/').default
}
require('./app')