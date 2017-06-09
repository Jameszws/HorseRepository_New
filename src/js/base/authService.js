/*
 *	TODO 基础服务：身份验证服务
 * 	 checkAuth:异步验证，需要传入回调函数
 *   checkAuthSync:同步验证
 */ 
define(["baseService"], function(baseService) {
	baseService.factory("authservice", ['$rootScope','$location', '$cookieStore',function($rootScope, $location, $cookieStore) {			
		var authSvc = {

			checkAuth: function(event, callback) {
				var userInfo = Horse.zCookieStorage.getCookie("UserInfo");
				$rootScope.UserInfo = userInfo;
				if (Horse.validate.objIsNull(userInfo) || Horse.validate.isNull(userInfo.token)) {
					if ($location.absUrl().toLowerCase().indexOf("login") >= 0) {
						return;
					}
					!Horse.validate.objIsNull(event) && event.preventDefault();
					Horse.alert.init({
						title: "登录失败",
						content: "您目前为非登陆状态，请登录~",
						callback: function() {
							Horse.validate.isFunction(callback) && callback(false);
						},
						cancelCallBack: function() {
							Horse.validate.isFunction(callback) && callback(false);
						}
					});
					return;
				}
				Horse.validate.isFunction(callback) && callback(true);
				return;
			},

			checkAuthSync: function() {
				var userInfo = Horse.zCookieStorage.getCookie("UserInfo");
				$rootScope.UserInfo = userInfo;
				if (Horse.validate.objIsNull(userInfo) || Horse.validate.isNull(userInfo.token)) {
					return false;
				}
				return true;
			}
		};
		return authSvc;
	}]);
});