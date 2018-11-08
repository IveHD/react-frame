const fs = require('fs');

module.exports = (req, res, next) => {
	if(/^\/api\//.test(req.url)) {
		fs.readFile('./data.json').then(json => {
			let data = JSON.parse(json);
			let url = req.url.split('?')[0];
			if(data[url]) {
				console.log('mock success: ', req.url);
				res.end(data[]);
			}else {
				console.log('mock 404: ', req.url);
			}
		})
	}else {
		next();
	}
}