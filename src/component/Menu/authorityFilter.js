import config from './config.js';
import { has } from '@src/util/permission/index';

let flatFilter = config => {
	return config.filter(e => !e.authority || has(e.authority));
}

let layerFilter = config => {
	if(!config || !config.length){
		return;
	}
	for(let i = 0; i < config.length; i++){
		let e = config[i];
		if(!e.authority || has(e.authority)){
			try{
				if(e.maps && e.maps.length > 0){
					let f = flatFilter(e.maps);
					if(f.length == 0){
						config.splice(i, 1);
						i--;
					}else{
						e.maps = f;
					}
				}else if(e.children && e.children.length > 0){
					layerFilter(e.children);
				}
			}catch(e){
				console.error('error:第'+i+'个元素', config)
			}finally{
				if((e.maps && !e.maps.length) || (e.children && !e.children.length)){
					config.splice(i, 1);
					i--;
				}
			}
		}else{
			config.splice(i, 1);
			i--;
		}
	}
}

let filter = config => {
	layerFilter(config)
	return config;
}

export default filter(config);