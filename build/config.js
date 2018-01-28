const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../');
const OUTPUT_PATH = path.resolve(__dirname, '../dis');
module.exports = {
    ROOT_PATH: ROOT_PATH,
    ENTRY_PATH: ROOT_PATH + '/src/index',
    OUTPUT_PATH: OUTPUT_PATH
};