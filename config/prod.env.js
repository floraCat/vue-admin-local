'use strict'


const path = require('path')
let result = {}
const env = process.env.NODE_ENV
// if (env === 'p1') {
// 	result.env = { NODE_ENV: '"p1"'}
// 	result.assetsRoot = path.resolve(__dirname, '../dist/pont210/')
// 	result.index = path.resolve(__dirname, '../dist/pont210/index.html')
// } else if (env === 'p2') {
// 	result.env = { NODE_ENV: '"p2"'}
// 	result.assetsRoot = path.resolve(__dirname, '../dist/local8080/')
// 	result.index = path.resolve(__dirname, '../dist/local8080/index.html')
// } else if (env === 'p3') {
// 	result.env = { NODE_ENV: '"p3"'}
// 	result.assetsRoot = path.resolve(__dirname, '../dist/pont137/')
// 	result.index = path.resolve(__dirname, '../dist/pont137/index.html')
if (env === 'prod') {
	result.env = { NODE_ENV: '"prod"'}
	result.assetsRoot = path.resolve(__dirname, '../dist/__prod/')
	result.index = path.resolve(__dirname, '../dist/__prod/index.html')
} else if (env === 'dev') {
	result.env = { NODE_ENV: '"dev"'}
	result.assetsRoot = path.resolve(__dirname, '../dist/__dev/')
	result.index = path.resolve(__dirname, '../dist/__dev/index.html')
} else if (env === 'production') {
	result.env = { NODE_ENV: '"production"'}
	result.assetsRoot = path.resolve(__dirname, '../dist/')
	result.index = path.resolve(__dirname, '../dist/index.html')
} else {
	result.env = { NODE_ENV: '"development"'}
	result.assetsRoot = path.resolve(__dirname, '../dist/defalut')
	result.index = path.resolve(__dirname, '../dist/defalut/index.html')
}
module.exports = result
