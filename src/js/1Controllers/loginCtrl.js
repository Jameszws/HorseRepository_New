/*
 * 首页控制器
 */
define(['baseController', 'zPageView'], function(moduleCtrl, zPageView) {
	moduleCtrl.register.controller("login_Ctrl", ["$rootScope", "$scope", "$location", '$cookieStore', function($rootScope, $scope, $location, $cookieStore) {
		var pageView = zPageView.extend({

			onShow: function() {
				$rootScope.headTitle = "登陆";
				this.eventHandler();
			},

			eventHandler: function() {
				$scope.login = function() {
					var userInfo = {
						userName: "zws",
						userId: "1",
						token: "sidr$%^879"
					};
					$rootScope.UserInfo = userInfo;
					Horse.zCookieStorage.setCookie("UserInfo", userInfo, "h1");
					Horse.util.goBack();					
				};
			}
		});
	}]);
});
