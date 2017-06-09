/**
 *  公共操作
 */
define([],function(){
     var basePageOp={
        initEvent: function($rootScope,$location) {
            $rootScope.goToIndex=function(){
                $rootScope.navTitle="首页";
                $location.path("/index");					
            };
            
            $rootScope.goToTest1 = function() {
                $rootScope.navTitle="数据源配置";
                $location.path("/test");
            };

            $rootScope.goToTest2 = function() {
                $rootScope.navTitle="需求管理";
                $location.path("/test2/3");
            };
            
            $rootScope.goToStudent=function(){
                $rootScope.navTitle="模块配置";
                $location.path("/student");
            };
            
            $rootScope.logout=function(){
                $rootScope.UserInfo = null;
                Horse.zCookieStorage.delCookie("UserInfo");
                $location.path("/login");
            };
        }
    };
    return basePageOp;
});