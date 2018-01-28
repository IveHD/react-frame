const CONFIG = require('./config');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractLESS = new ExtractTextPlugin('style/[name].style.css');

const HappyPack = require('happypack');
// const os = require("os")
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard();
// 
// 这两个是用来做打包分析的
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
// var StatsPlugin = require('stats-webpack-plugin');
module.exports = {
    entry: {
        main: CONFIG.ENTRY_PATH,
        'cmpt.lib': 'element-react',
        'cmpt.style': 'element-theme-default'
    },
    output: {
        filename: '[name].[hash:4].js',
        // filename: '[name].js',
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
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: ['happypack/loader?id=babel']  //对js|jsx的loader处理使用HappyPack插件做多线程
        }, {
            test: /\.(less|css)$/,
            use: ["style-loader", "css-loader?minimize", "less-loader?minimize"]
        }, {
            test: /\.(png|jpg)$/,
            exclude: /(node_modules)/,
            loader: 'url-loader?limit=8198&name=images/[name].[ext]'
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)\w*/,
            loader: 'url-loader?limit=1000000'
        }]
    },
    plugins: [
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['cmpt.lib', 'cmpt.style']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            favicon: path.resolve(__dirname, '../src/asset/image/favicon.png'),
            inject: true
        }),
        // new DashboardPlugin(dashboard.setData),
        // new BundleAnalyzerPlugin(),
        // new StatsPlugin('stats.json', {
        //     chunkModules: true,
        //     exclude: [/node_modules[\\\/]react/]
        // }),
        // extractLESS
    ]
};