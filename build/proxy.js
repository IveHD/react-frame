let http = require('http');
var qs = require('querystring');
let proxy_http = (path, method, data, headers) => new Promise((resolve, reject) => {
	let _data = null;
	if(/application\/json/.test(headers['content-type'])){
		_data = JSON.stringify(data);
	}else{
		_data = qs.stringify(data);
	}
	let option = {
		hostname: 'web.paoject.com',  //这里写请求服务器的域名
		// port: 9925,
		path: method == 'GET' ? (path.split('?')[0] + '?' + _data) : path.split('?')[0],
		method,
		headers: Object.assign({}, headers, {
			'Content-Length': _data.length,
			'Cookie': ''  //这里写你的Cookie(如果需要的话)
		})
	};
	delete option.headers.host;
	console.log(option.headers);
	var r = http.request(option, function(res){
		res.setEncoding('utf-8');
		let buffer = '';
		res.on('data', function(chunk){
			buffer += chunk;
		})
		res.on('end', function(){
			if(res.statusCode == 302){
				reject('Cookie time out');
			}else{
				resolve({headers: res.headers, data: buffer});
			}
		})
		res.on('error', function(err){
			console.log('proxy-error-----', err)
			reject(err);
		})
	});
	r.on('error', function(err){
		console.error(err)
	});
	r.write(_data);


	r.end();
});
module.exports = proxy_http;