const CONFIG = require('./const');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: CONFIG.ENTRY_PATH,
	output: {
		filename: '[name].[hash:4].js',
		path: CONFIG.OUTPUT_PATH,
		publicPath: '/'
	},
	resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@src': path.resolve(__dirname, '../src'),
            '@component': path.resolve(__dirname, '../src/component'),
            '@view': path.resolve(__dirname, '../src/view'),
            '@asset': path.resolve(__dirname, '../src/asset')
        }
    },
    module: {
    	rules: [{
    		test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: {
            	loader: 'babel-loader'
            }
    	}, {
    		test: /\.(less|css)$/,
            use: ["style-loader", "css-loader?minimize", "less-loader?minimize"]
    	}]
    },
    plugins: [
    	new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            favicon: path.resolve(__dirname, '../src/asset/image/favicon.png'),
            inject: true
        })
    ]
}