const webpack = require('webpack');
const prodConfig = require('./webpack.config.prod');
if(process.env.SET_UP_ANALYSIS) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
	prodConfig.plugins.push(new BundleAnalyzerPlugin);
}

webpack(prodConfig, (err, stats) => {
	if(err) throw err;
	if(stats.toJson().errors.length) {
		stats.toJson().errors.forEach(e => console.log(e))
		return;
	}
	process.stdout.write(stats.toString({
		colors: true,
		modules: true,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n')
});