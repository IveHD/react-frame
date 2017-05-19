const CONFIG = require('./config');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('stylesheets/[name].less.[hash:4].css');
module.exports = {
	entry: {
		main: CONFIG.ENTRY_PATH,
		// antd: 'antd',
	},

	output: {
		filename: '[name].[hash:8].js',
		path: CONFIG.OUTPUT_PATH
	},

	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@src': path.resolve(__dirname, '../src'),
			'@components': path.resolve(__dirname, '../src/components')
		}
	},

	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				"presets": ["react", "es2015", "stage-0"],
				"plugins": [
					["import", {
						"libraryName": "antd",
						"style": true
					}]
				]
			}

		}, {
			test: /\.less$/,
			use: extractLESS.extract([ 'css-loader', 'less-loader' ])
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192&name=images/[name].[ext]'
		}]
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'antd' // 指定公共 bundle 的名字。
		// }),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			inject: true
		}),
		extractLESS
	]
};