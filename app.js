const createError = require('http-errors');
const express = require('express');
// 引入json解析中间件
const bodyParser = require('body-parser');
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./config/webpack.dev.config.js');
// 开发模式
if (process.env.NODE_ENV === 'dev') {
	const compiler = webpack(config);
	// webpack热更新
	app.use(webpackDevMiddleware(compiler,{
		publicPath: '/'
	}))
	app.use(webpackHotMiddleware(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}));
}

// 设置静态文件夹
app.use(express.static(path.join(__dirname, 'static')));

// 404页面
app.use(function(req, res, next) {
	next(createError(404));
});

// 错误页面
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send('error');
});

module.exports = app;
