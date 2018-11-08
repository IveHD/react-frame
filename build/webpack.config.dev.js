const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');
const webpackHotMiddleware = require('webpack-hot-middleware');
const merge = require('webpack-merge');

if(typeof baseConfig.entry === 'string') {
	baseConfig.entry = ['webpack-hot-middleware/client', baseConfig.entry];
}else {
	Object.keys(baseConfig.entry).forEach(function(p){
		if(baseConfig.entry[p] instanceof Array) {
			baseConfig.entry[p].push('webpack-hot-middleware/client');
		}else {
			baseConfig.entry[p] = ['webpack-hot-middleware/client', baseConfig.entry[p]];
		}
	});
}

module.exports = merge(baseConfig, {
	mode: 'development',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
});