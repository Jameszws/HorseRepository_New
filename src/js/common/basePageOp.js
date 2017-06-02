/**
 *  公共操作
 */
define([],function(){
     var basePageOp={
        initEvent: function($rootScope,$location) {
            $rootScope.GoToIndex=function(){
                $location.path("/index");					
            };
            
            $rootScope.GoToTest1 = function() {					
                $location.path("/test");
            };

            $rootScope.GoToTest2 = function() {
                $location.path("/test2/3");
            };
            
            $rootScope.GoToStudent=function(){
                $location.path("/student");
            };
            
            $rootScope.exit=function(){
                $rootScope.UserInfo = null;					
                Horse.zCookieStorage.delCookie("UserInfo");
                window.location.href="../#/login";
            };
        }
    };
    return basePageOp;
});