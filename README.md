# brainbank 大脑银行微信商城项目

	vue2 + vux + vue-router + vuex

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

cnpm install 

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 目录结构

## src 开发文件

	### assets 静态资源文件

		css 样式表

		fonts 图标字体

		img 图片

	### commons 公共方法和字典

		index vue prototype扩展

		wordbook 字典

		weixin 微信签名及分享

	### components 组件

		card 卡片

		cart 购物车相关

		comment 评论

		header 头部

		img-text 图文混排

		mall 商城相关

		nav 底部菜单

		order 订单相关

		quotation 语录 参考朋友圈

		reward 打赏

		tuijian 首页推荐

		verification-code 验证码扩展，基于vux

		witness 客户见证

	### datas 数据

	### filter 过滤器

	### modules 具体页面

		address 地址

		author 微信授权

		banner 广告宣传

		course 课程

		index 首页相关

		mall 商城相关

		msg 消息

		order 订单

		quotation 经典语录

		rank 排行榜

		shop-cart 购物车

		user-center 用户中心

	### router 路由

	### services 数据服务

	### store 公共数据

		cart 购物车

		direction 页面切换方向

		loadbar 页面加载过渡效果

		msg 消息来源暂存

		nav 底部菜单状态

		pay 是否可支付，微信签名成功

		user 用户信息



# 备注

	由于项目方不允许使用第三方资源服务，在音视频的加载及播放上，存在问题，需要后台支持（目前的后台暂无支持），该项目的音视频播放在体验上需要优化，后台也没有做资源服务器，资源响应很慢


# 帮助

	ios 键盘遮挡输入框

		http://blog.csdn.net/github_37533433/article/details/66471962

# vue bug

	1、渲染出来的图片第一次点击会无效，第二次才可以
		在暂时解决方案：将图片放到background上去