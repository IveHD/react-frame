require('shelljs/global');
let webpack = require('webpack');
let webpackBaseConfig = require('./webpack.base.config.js');
let CONFIG = require('./config');
let ora = require('ora');
var definePlugin = new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': '"production"'
	}
});


webpackBaseConfig.plugins.push(definePlugin);

var spinner = ora('building for production...')
spinner.start()

rm('-rf', CONFIG.OUTPUT_PATH);
mkdir('-p', CONFIG.OUTPUT_PATH);

webpack(webpackBaseConfig, function(err, stats) {
	spinner.stop()
	if (err) throw err
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n')
})