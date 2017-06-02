/**
 * 建立angular.module
 */
define(['angular'], function (angular) {
	var moduleCtrl = angular.module('myapp.controller', ["myapp.service",'ngCookies']);
	moduleCtrl.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',function($controllerProvider, $compileProvider, $filterProvider, $provide) {
		moduleCtrl.register = {
			//得到$controllerProvider的引用
			controller : $controllerProvider.register,
			directive: $compileProvider.directive,
			filter: $filterProvider.register
		};
	}]);
	return moduleCtrl;
});