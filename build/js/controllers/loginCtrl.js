define(["baseController","zPageView"],function(e,o){e.register.controller("login_Ctrl",["$rootScope","$scope","$location","$cookieStore",function(e,n,t,r){(new o).extend({onShow:function(){e.navTitle="登录",this.eventHandler()},eventHandler:function(){n.login=function(){var o={userName:"zws",userId:"1",token:"sidr$%^879"};e.UserInfo=o,Horse.zCookieStorage.setCookie("UserInfo",o,"h1"),Horse.util.goBack()}}})}])});