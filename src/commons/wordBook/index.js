// 字典
import Vue from 'vue'
import headerBtns from './header-btns.js';
import nav from './nav.js';
import visitRouter from './visit-router.js';

Vue.prototype.wordBook = {
	headerBtns: headerBtns, // 已废弃
	nav: nav,
	visitRouter: visitRouter,
	pageCount: 10, // 分页条数
	tabChangeW: 160, // tab+swiper切换滚动多少距离切换，
	bannerWidthHeight: 600/1500, // banner图片宽高比
	urlLink: {
		img: 'http://114.215.135.236:8081/',  // 图片域名地址拼接
		richText: 'http://114.215.135.236:8081', // 富文本内图片域名地址拼接
		file: 'http://114.215.135.236:8081', // 文件域名地址拼接
		share: 'http://114.215.135.236:8081' // 分享域名地址拼接
	}
	// orderType: {}
}