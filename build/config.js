const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../');

module.exports = {
	ROOT_PATH: ROOT_PATH,
	ENTRY_PATH: ROOT_PATH + '/src/index',
	OUTPUT_PATH: ROOT_PATH + '/_dist',
	PUBLIC_PATH: ROOT_PATH
};