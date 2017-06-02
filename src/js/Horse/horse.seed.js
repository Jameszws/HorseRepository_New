/*
 * TODO Horse框架 
 * 扩展注意点：
 * (1) Horse框架根据项目需要可扩展
 * (2) Horse框架建议只把常用的的操作（包括部分常用UI操作）放到架构中
 * (3) Horse框架不建议把重量级UI操作（如城市选择器）放到架构中
 * (4) Horse框架上线需要压缩处理，所以注意require操作
 */

define(['validate', 'util', 'popupAlert', 'popupConfirm', 'popupLoad', 'zCookieStorage', 'zLocalStorage', 'zSessionStorage'],
	function(validate, util, popupAlert, popupConfirm, popupLoad, zCookieStorage, zLocalStorage, zSessionStorage) {

		/*
		 * TODO 说明：alert弹出 五种状态 "error"、"info"、"question"、"warning"、"alert"
		 */
		var popupEnumType = {
			Error: 1,
			Info: 2,
			Question: 3,
			Warning: 4,
			Alert: 5
		};
		
		/*
		 * TODO Horse 框架 定义 可扩展
		 * (1) version 版本信息控制
		 * (2) validate 验证信息
		 * (3) util 基础操作
		 */
		Horse = typeof Horse != 'undefined' ? Horse : {
			version: "1.0",
			validate: validate,
			util: util,
			
			alert: new popupAlert(popupEnumType.Alert),
			error: new popupAlert(popupEnumType.Error),
			info: new popupAlert(popupEnumType.Info),
			question: new popupAlert(popupEnumType.Question),
			warning: new popupAlert(popupEnumType.Warning),
			confirm: new popupConfirm(),
			popupLoad: new popupLoad(),
			
			zCookieStorage:zCookieStorage,
			zLocalStorage:zLocalStorage,
			zSessionStorage:zSessionStorage,
			
		};

		window.Horse = Horse;

	});