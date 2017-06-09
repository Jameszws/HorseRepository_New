/**
 * 建立angular.module
 */
define(['angular'], function (angular) {
	var moduleCtrl = angular.module('myapp.controller', ["myapp.service",'ngCookies','ngSanitize','ui.select']);	
	moduleCtrl.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide','uiSelectConfig',function($controllerProvider, $compileProvider, $filterProvider, $provide,uiSelectConfig) {
		uiSelectConfig.theme = 'bootstrap';
		moduleCtrl.register = {
			//得到$controllerProvider的引用
			controller : $controllerProvider.register,
			directive: $compileProvider.directive,
			filter: $filterProvider.register
		};
	}]);
	return moduleCtrl;
});