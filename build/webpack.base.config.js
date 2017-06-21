const CONFIG = require('./config');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('style/[name].style.[hash:4].css');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

// var StatsPlugin = require('stats-webpack-plugin');
module.exports = {
	entry: {
		main: CONFIG.ENTRY_PATH,
        vendor: ['react', 'react-dom'],
        ECharts: 'ECharts'
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
			'@component': path.resolve(__dirname, '../src/component'),
			'@container': path.resolve(__dirname, '../src/container'),
			'@asset': path.resolve(__dirname, '../src/asset')
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
					["import", [
                        {
                            "libraryName": "antd",
                            "libraryDirectory": "lib",   // default: lib
                            "style": true
                        },
                        {
                            "libraryName": "antd-mobile",
                            "libraryDirectory": "component",
                        },
                    ]]
				]
			}
		}, {
			test: /\.(less|css)$/,
			use: extractLESS.extract([ 'css-loader', 'less-loader' ])
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8198&name=images/[name].[ext]'
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
        new webpack.optimize.CommonsChunkPlugin(['vendor', 'ECharts']),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'antd' // 指定公共 bundle 的名字。
		// }),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
            favicon: path.resolve(__dirname, '../src/asset/image/favicon.png'),
			inject: true
		}),
        new DashboardPlugin(dashboard.setData),
        // new StatsPlugin('stats.json', {
        //     chunkModules: true,
        //     exclude: [/node_modules[\\\/]react/]
        // }),
		extractLESS
	]
};