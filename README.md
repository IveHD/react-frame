# 技术结构
    webpack + react + react-router

# 功能实现
### 关于打包
1.基于react-router的自定义打包code split。<br/>
2.分包异步按需加载。<br/>
3.CommonsChunkPlugin公共代码打包提取。<br/>
4.ParallelUglifyPlugin多线程代码压缩。<br/>
5.HappyPack多线程loader任务处理。<br/>
6.webpack tree shaking<br/>
   
### 开发模式
1.express + webpack-dev-middleware + webpack-hot-middleware 本地开发服务器和文件修改热加载及实时刷新。<br/>
2.mock数据，data.json进行接口和模拟数据配置，实时生效。<br/>
3.基于nodejs的http模块，实现本地服务器http请求代理转发，开发模式下直接请求测试环境或线上RESTfull api接口。<br/>
    
### 业务功能支持 
1.基于react-router的页面跳转控制<br/>
2.可配置的多级菜单组件<br/>
3.基于cookie的权限控制功能<br/>
4.引入element-react、antd两个常用ui组件库(对element-react做了通用代码抽离，antd做了组件按需加载)<br/>

# 使用说明 
### 安装npm依赖
	npm i --save
	
### 开发模式启动(使用data.json mock数据)
	npm run dev
	
### 开发模式启动(使用代理数据)
	修改'build/proxy.js'的http option配置(hostname属性和header自定义配置)
	npm run dev --pxy
	
### 生产环境打包
	'build/config.js'可对打包入口和输出路径做配置。
	npm run build
