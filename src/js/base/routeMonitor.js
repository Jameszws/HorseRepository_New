/*
 * TODO 注册全局的事件监听器
 */
define(['baseRoute','basePageOp'], function(baseRoute,basePageOp) {

	baseRoute.run(["$rootScope", "$state", '$location', '$log', 'authservice','ENV', function($rootScope, $state, $location, $log, authservice,ENV) {
		
		var monitor = {
			//判断当前页面是否需要登录态
			judgeCurrentPageNeedLoginState:function(){
				for(var i=0;i<ENV._noNeedToCheckLoginState.length;i++){
					var noNeedCheck=ENV._noNeedToCheckLoginState[i];
					if($location.absUrl().toLowerCase().indexOf(noNeedCheck.pageName)>=0){
						return true;
					}
				}
				return false;
			}
		};

		$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
			$log.error('An error occurred while changing states: ' + error);
			$log.debug('event', event);
			$log.debug('toState', toState);
			$log.debug('toParams', toParams);
			$log.debug('fromState', fromState);
			$log.debug('fromParams', fromParams);
		});

		/*
		 * TODO 当路由改变的时候执行
		 */
		$rootScope.$on("$stateChangeStart", function(event, toState, fromState) {
			if(monitor.judgeCurrentPageNeedLoginState()){
				$log.info("current page don`t need login !! ");
				return;
			}
			authservice.checkAuth(event,function(ret) {
				if (ret) {
					if ($location.absUrl().toLowerCase().indexOf("login") >= 0) {
						event.preventDefault(); 
						window.location.href = "../#/index"; //跳转到首页	
						return;
					}
					return;
				}
				$log.info("Missing login state !!");
				if ($location.absUrl().toLowerCase().indexOf("login") >= 0) {
					return;
				}
				event.preventDefault(); // 取消默认跳转行为
				window.location.href =ENV._loginurl+"?from="+encodeURIComponent(window.location.href); //跳转到登录界面	
			});
		});

		/*
		 * TODO 路由状态改变成功
		 */
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			//路由更改执行注册header、footer中事件基础操作
			basePageOp.initEvent($rootScope,$location);
			/*
			$log.debug('successfully changed states');
            
			$log.debug('event', event);
			$log.debug('toState', toState);
			$log.debug('toParams', toParams);
			$log.debug('fromState', fromState);
			$log.debug('fromParams', fromParams);
			*/
		});

		$rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
			$log.error('The request state was not found: ' + unfoundState);
		});
		
	}]);
});