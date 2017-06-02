/**
 * 建立baseRoute
 */
define(['angular'], function (angular) {
	//确定依赖关系
    var baseRoute = angular.module('myapp.route', ["ui.router", 'myapp.service','myapp.controller']);    
    return baseRoute;
});
