let express = require('express');
let app = new express();
let webpack = require('webpack');
let webpackBaseConfig = require('./webpack.base.config');
let bodyParser=require('body-parser');

let fs = require('fs');
const path = require('path');
let proxyHttp = require('./proxy');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.all(/^\/[a-zA-Z0-9]+((?!\.).)*$/, function(req, res){
	if(process.argv.slice(2).indexOf('pxy') !== -1){
		console.log('proxy-path:', req.url);
		console.log('b-h:---');
		console.log(req.headers);
		console.log('b-h:---');
		proxyHttp(req.url, req.method, req.method == 'GET' ? req.query : req.body, req.headers).then(result => {
			res.headers = Object.assign({}, result.headers);
			res.send(JSON.parse(result.data));
		}).catch(error => {
			res.send(error);
			console.log('An arror occurred')
		})
	}else{
		console.log('mock-path:', req.url);
		fs.readFile(path.resolve(__dirname, './data.json'), function(err, json){
			if(!err){
				let data = JSON.parse(json);
				let urls = Object.keys(data);
				res.send(data[req.url.split('?')[0]]);	
			}else{
				console.log(err)
			}
		})
	}
	
})

webpackBaseConfig.entry.main = ['./build/dev.client', webpackBaseConfig.entry.main]
var definePlugin = new webpack.DefinePlugin({
	'process.env': {
		'NODE_ENV': '"development"'
	}
});

webpackBaseConfig.devtool = 'cheap-module-eval-source-map';

webpackBaseConfig.plugins.push(definePlugin, new webpack.HotModuleReplacementPlugin());
var compiler = webpack(webpackBaseConfig);
var devMiddleware = require('webpack-dev-middleware')(compiler, {
	//publicPath: CONFIG.PUBLIC_PATH,
	stats: {
		colors: true,
		chunks: false
	}
});
app.use(devMiddleware);
var hotMiddleware = require('webpack-hot-middleware')(compiler);
app.use(hotMiddleware);
var uri = 'http://localhost:4000';
devMiddleware.waitUntilValid(function() {
	console.log('> Listening at ' + uri + '\n')
});

module.exports = app.listen(4000, function(err) {
	if (err) {
		console.log(err)
		return
	}
});