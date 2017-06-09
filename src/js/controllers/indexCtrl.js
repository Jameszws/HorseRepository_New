/*
 * 首页控制器
 */
define(["baseController","zPageView"], function(moduleCtrl,zPageView) {
	moduleCtrl.register.controller("index_Ctrl", ["$rootScope", "$scope", "$location",'ENV',function($rootScope, $scope, $location,ENV) {
		var pageView = new zPageView().extend({
			onShow: function() {
				$rootScope.navTitle="首页";
				Horse.zLocalStorage.set("234", {
					qa: "234"
				});
				Horse.zLocalStorage.get("234");
			}
		});		
	}]);
});