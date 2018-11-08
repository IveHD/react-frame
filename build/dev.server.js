const webpack = require('webpack');
const devConfig = require('./webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const express = require('express');
const app = express()

app.get('*', function(req, res, next) {
	next();
});

app.get(/(^\/$)|(^\/view\/)/, function(req, res, next) {
	console.log('get:path:', req.path);
	req.url = '/';
	next();
});

if(process.env.API_PROXY) {
	app.use(require('./mock/index'));
}

const compiler = webpack(devConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
	noInfo: true,
	stats: {
		colors: true,
		chunks: false,
		modules: false,
		children: false
	}
});
const hotMiddleware = webpackHotMiddleware(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);

devMiddleware.waitUntilValid(function() {
	console.log('> Listening at ' + 4000 + '\n')
});

app.listen(4000, (err) => {
	if(err) throw err;
});