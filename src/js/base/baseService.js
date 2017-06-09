/**
 * 建立angular.module
 */
define(['angular'], function(angular) {
	var moduleService = angular.module('myapp.service', ['ngCookies']);
	moduleService.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',function($controllerProvider, $compileProvider, $filterProvider, $provide) {
		moduleService.register = {
			service: $provide.service,
			factory: $provide.factory,
			constant:$provide.constant,
			value:$provide.value
		};
	}]);
	
	return moduleService;
});