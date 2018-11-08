const webpack = require('webpack');
const prodConfig = require('./webpack.config.prod');

webpack(prodConfig, (err, stats) => {
	if(err) throw err;
	if(stats.toJson().errors.length) {
		stats.toJson().errors.forEach(e => console.log(e))
		return;
	}
});