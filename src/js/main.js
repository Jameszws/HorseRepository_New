/**
 *  TODO 入口文件
 * 2016-06-12 afternoon
 */
var config = {
	init: function() {
		this.requireConfigInit();
		this.loadMustRequireModule();
	},

	requireConfigInit: function() {
		require.config({
			baseUrl: "../src/js/",
			paths: {
				"text":"libs/require-text",
				"jquery": "libs/jquery-v2.0.3",

				"bootstrapjs":"libs/bootstrap/dist/js/bootstrap.min",

				/* angular begin */
				/*
				"angular": "../../node_modules/angular/angular.min",
				"angular-ui-router": "../../node_modules/angular-ui-router/release/angular-ui-router.min",
				"angular-sanitize": "../../node_modules/angular-sanitize/angular-sanitize.min",
				"angular-cookies": "../../node_modules/angular-cookies/angular-cookies.min",
				*/
				"angular": "libs/angular/angular.min",
				"angular-ui-router": "libs/angular-ui-router/release/angular-ui-router.min",
				"angular-sanitize": "libs/angular-sanitize/angular-sanitize.min",
				"angular-cookies": "libs/angular-cookies/angular-cookies.min",
				"angular-ui-select":"libs/angular-ui-select/dist/select.min",
				/* angular end */
				
				"baseRoute": "base/baseRoute",
				"routeMonitor": "base/routeMonitor",
				"baseService": "base/baseService",
				"authService":"base/authService",	//基础服务——auth服务
				"restservice":"base/restService",	//基础服务——rest服务
				"baseController": "base/baseController",

				/* ctrl 区域 begin */
				"basePageView":"controllers/common/basePageView",
				"studentCtrl":"controllers/studentCtrl",
				"loginCtrl":"controllers/loginCtrl",
				"testCtrl":"controllers/testCtrl",
				"testCtrl2":"controllers/testCtrl2",
				"indexCtrl":"controllers/indexCtrl",
				/* ctrl 区域 end */

				/* service 区域 begin */
				"commonService": "services/common/commonService",
				"studentService": "services/StudentService",
				"constant":"services/constant",	//基础服务——常量api
				/* service 区域 end */

				"appRoute": "routes/appRoute",

				"basePageOp":"common/basePageOp",

				"util": "horse/util/util",
				"validate": "horse/util/validate",
				
				/***************(Horse配置 begin)********************/
				
				'zPageView': "Horse/app/z.page.view",
				'Horse': "Horse/horse.seed",
				'zUiPopuplayerCommon': "Horse/ui/z.ui.popuplayer/z.ui.popuplayer._common",
				'popupAlert': "Horse/ui/z.ui.popuplayer/z.ui.popuplayer.alert",
				'popupConfirm': "Horse/ui/z.ui.popuplayer/z.ui.popuplayer.confirm",
				'popupLoad': "Horse/ui/z.ui.popuplayer/z.ui.popuplayer.load",
				'datepicker': "Horse/ui/z.ui.datepicker/z.ui.datepicker",
				'citydata':'Horse/ui/z.ui.citylinkage/z.ui.citydata',
				'citylinkage':'Horse/ui/z.ui.citylinkage/z.ui.citylinkage',
				'uploadImg':'Horse/ui/z.ui.uploadImg/z.ui.uploadImg',
				'virtualKey':'Horse/ui/z.ui.virtualkey/z.ui.virtualkey',
				'virtualKeyTempl':'Horse/ui/z.ui.virtualkey/html/z.ui.virtualkey.html',
				
				'securitycode':"Horse/ui/z.ui.securitycode/z.ui.securitycode.new",
				'securitycodeTempl':"Horse/ui/z.ui.securitycode/html/z.ui.securitycode.new.html",
				
				'zCookieStorage':"Horse/data/storage/z.cookie.storage",
				'zLocalStorage':"Horse/data/storage/z.local.storage",
				'zSessionStorage':"Horse/data/storage/z.session.storage"
				
				/***************(Horse配置 end)********************/
			},
			map: {
				'*': {
					'css': 'libs/require-css'
				}
			},
			shim: {
				'angular': {
					exports: 'angular'
				},
				'angular-ui-router': {
					deps: ["angular"],
					exports: 'angular-ui-router'
				},
				'angular-sanitize': {
					deps: ["angular"],
					exports: 'angular-sanitize'
				},
				'angular-ui-select': {
					deps: ["angular"],
					exports: 'angular-ui-select'
				},
				'bootstrapjs':{
					deps: ["jquery"],
					exports: 'bootstrapjs'
				},
				//*
				'angular-cookies': {
					deps: ["angular"],
					exports: 'angular-cookies'
				},				
				//*/
				'zUiPopuplayerCommon':{
					deps: [						
						'css!../js/Horse/ui/z.ui.popuplayer/css/z.ui.popuplayer.css'
					]
				},
				'datepicker':{
					deps:[
						'css!../js/Horse/ui/z.ui.datepicker/css/datepicker'
					]
				},
				'citylinkage':{
					deps:[
						'css!../js/Horse/ui/z.ui.citylinkage/css/citylinkage'
					]
				},
				'uploadImg':{
					deps:[
						'css!../js/Horse/ui/z.ui.uploadImg/css/uploadImg'
					]
				},
				'virtualKey':{
					deps:[
						'css!../js/Horse/ui/z.ui.virtualkey/css/virtualkey'
					]
				},
				'securitycode':{
					deps:[
						"css!../js/Horse/ui/z.ui.securitycode/css/securitycode.new"
					]
				},
				'angular-ui-select':{
					deps:[
						"css!../js/libs/angular-ui-select/dist/select.min"
					]
				}
			}
		});
	},

	loadMustRequireModule: function() {
		require(["jquery", 
			'angular', 'angular-sanitize', 'angular-cookies','angular-ui-router','angular-ui-select','bootstrapjs',
			'baseRoute', 'baseService', 'baseController',
			'appRoute', 'routeMonitor',
			'constant','authService','restservice','Horse', 'zPageView'
		], function($, angular) {
			$(function() {				
				angular.bootstrap(document, ["myapp.route"]);
			});
		});
	}
};

config.init();
