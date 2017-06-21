let express = require('express');
let app = new express();
let webpack = require('webpack');
let webpackBaseConfig = require('./webpack.base.config');
let CONFIG = require('./config');

let mockData = require('./mock_data');
mockData(app, express);
Object.keys(webpackBaseConfig.entry).forEach(function (name) {
	webpackBaseConfig.entry[name] = ['./build/dev.client'].concat(webpackBaseConfig.entry[name])
});
var definePlugin = new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': '"development"'
	}
});

webpackBaseConfig.devtool = 'cheap-module-eval-source-map';

webpackBaseConfig.plugins.push(definePlugin);
var compiler = webpack(webpackBaseConfig);
var devMiddleware = require('webpack-dev-middleware')(compiler, {
	// publicPath: CONFIG.PUBLIC_PATH
});
app.use(devMiddleware);
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
	log: () => {}
});
compiler.plugin('compilation', function(compilation) {
	compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
		hotMiddleware.publish({
			action: 'reload'
		})
		cb()
	})
});
app.use(hotMiddleware);
var uri = 'http://localhost:3000';
devMiddleware.waitUntilValid(function() {
    console.log('> Listening at ' + uri + '\n')
});

module.exports = app.listen(3000, function(err) {
	if (err) {
        console.log(err)
        return
    }
});