export function isClass(o){
	if(o===null) return "Null";
	if(o===undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8,-1);
}

export function deepClone(obj) {
	var result,oClass=isClass(obj);
	//确定result的类型
	if(oClass==="Object"){
		result={};
	}else if(oClass==="Array"){
		result=[];
	}else{
		return obj;
	}
	for(var key in obj){
		var copy=obj[key];
		if(isClass(copy)=="Object"){
			result[key]=deepClone(copy);//递归调用
		}else if(isClass(copy)=="Array"){
			result[key]=deepClone(copy);
		}else{
			result[key]=obj[key];
		}
	}
	return result;
}

export function clearEmptyValue(data, deleteOldData){
	var newData = {};
	for (var key in data) {
		if (!isEmpty(data[key])) {
			newData[key] = data[key];
		} else if (deleteOldData){
			delete data[key];
		}
	}
	return newData;
}

export function isEmpty(value) {
	if (value === null) {
		return true;
	}
	if(value instanceof Array){
		return false;//数组不判断空
	}

	var str = toString(value);
	str = str.replace(/(^\s*)|(\s*$)/g, "");
	if (str.length > 0) {
		if (str == 'NONE') {
			return true;
		}

		return false;
	} else {
		return true;
	}
}

export function NumToCN(n) {
	n = parseInt(n, 10);
	const CNINDEX = ['零', '一', '二', '三','四','五','六','七','八','九'];
	const SCOPES = ['', '十', '百', '千', '万'];
	let na = (n+'').split('');
	let pos = na.length;
	let t = na.map(function(e, i){
		--pos;
		if(e == 0){
			return i == (na.length-1) ? '' : CNINDEX[e];
		}else{
			return CNINDEX[e] + SCOPES[pos]
		}
	});
	return t.join('').replace(/零+$/, '').replace(/零+/, '零').replace(/^(一十)/, '十');
}

export function toString(text) {
    let type = typeof text;
    if(type === 'number' || type === 'boolean' || type === 'string'){
        return text + '';
    }else{
        return '';
    }
    return result;
}

export function getRequest() {
	var httpUrl = location.href; //获取url中'?'符后的字串
	var url = '?' + httpUrl.split('?')[1];
	var theRequest = {};
	if (url.indexOf('?') != -1) {
		var str = url.substr(1);
		var strs = str.split('&');
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
		}
	}
	return theRequest;
}

export const Base64 = {

	// private property
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode: function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode: function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode: function (string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode: function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while (i < utftext.length) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}