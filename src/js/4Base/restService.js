/*
 * TODO rest 基础服务
 */
define(["baseService"], function(baseService) {
    /*
    *	TODO 基础服务：rest服务
    * 	@params 说明： 
    * 	url：请求地址（如果是内部服务，通过配置ENV参数实现，如果是外部服务，直接赋值）
    * 	另：提供get，post请求，以后可扩展
    */
	baseService.factory("restservice", ['$rootScope', '$location', '$q', '$http', 'ENV', 'authservice','$log', function($rootScope, $location, $q, $http, ENV, authservice,$log) {
        function restservice(svc, isNeedCheckAuth) {
            this.url="";    //请求 url
            this.params=null;   //请求 参数
            this.timeout=5000;  //请求超时时间 默认：5000毫秒
            this.isRequestNeedCheckLoginState=true; //默认需要登录态检验
            Horse.validate.isFunction(svc) && Horse.util.extend(svc.prototype, restservice.prototype);
        }
        restservice.prototype = {
            get: function() {
                var deferred = $q.defer(); //声明延后执行
                var promise = deferred.promise;
                //判断登陆态
                if (this.isRequestNeedCheckLoginState && !authservice.checkAuthSync()) {
                    Horse.alert.init({
                        title: "登录失败",
                        content: "您目前为非登陆状态，请登录~",
                        callback: function() {
                            window.location.href = ENV._loginurl+"?from="+encodeURIComponent(window.location.href);
                        },
                        cancelCallBack: function() {
                            window.location.href = ENV._loginurl+"?from="+encodeURIComponent(window.location.href);
                        }
                    });
                    return promise;
                }
                if (Horse.validate.isNull(this.url)) {
                    $log.warn("xhr:url can not be empty !!")
                    return promise;
                }
                $http({
                    method: 'GET',
                    url: this.url,
                    params: this.params,
                    timeout: this.timeout
                }).then(function(data, header, config, status) {
                    deferred.resolve(data); //声明执行成功
                }).then(function(data, header, config, status) {
                    deferred.reject(data); //声明执行失败
                });
                return promise; //返回承诺，返回获取数据的API
            },
            post: function() {
                var deferred = $q.defer(); //声明延后执行
                var promise = deferred.promise;
                //判断登陆态
                if (this.isRequestNeedCheckLoginState && !authservice.checkAuthSync()) {
                    Horse.alert.init({
                        title: "登录失败",
                        content: "您目前为非登陆状态，请登录~",
                        callback: function() {
                            window.location.href = ENV._loginurl+"?from="+encodeURIComponent(window.location.href);
                        },
                        cancelCallBack: function() {
                            window.location.href = ENV._loginurl+"?from="+encodeURIComponent(window.location.href);
                        }
                    });
                    return promise;
                }
                if (Horse.validate.isNull(this.url)) {
                    $log.warn("xhr:url can not be empty !!")
                    return promise;
                }
                $http({
                    method: 'POST',
                    url: this.url,
                    params:this.params,
                    timeout: this.timeout
                }).then(function(data, header, config, status) {
                    deferred.resolve(data); //声明执行成功
                }).then(function(data, header, config, status) {
                    deferred.reject(data); //声明执行失败
                });
                return promise; //返回承诺，返回获取数据的API
            }
        };
        return restservice;
    }]);
});