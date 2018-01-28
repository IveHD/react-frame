const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../');
const WEBAPP_ROOT_PATH = path.resolve(__dirname, '../../../../webapp');
module.exports = {
    ROOT_PATH: ROOT_PATH,
    ENTRY_PATH: ROOT_PATH + '/src/index',
    OUTPUT_PATH: WEBAPP_ROOT_PATH + '/console/src/main/webapp/WEB-INF/views/frontend/'
};