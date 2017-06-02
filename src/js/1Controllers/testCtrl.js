/**
 * 
 */
define(['baseController','zPageView','citylinkage','uploadImg'], function(moduleCtrl,zPageView,citylinkage,uploadImg) {
	moduleCtrl.register.controller('test_Ctrl', ['$scope', '$rootScope', '$http', '$location', 
		function($scope, $rootScope, $http, $location) {			
			var pageView = zPageView.extend({
				onShow:function(){
					$rootScope.headTitle = "1test";			
					new citylinkage().init({
					    contentId: "cityselect"  //接收容器的id
					});
					
					new uploadImg().init({
						fileAreaId:"aa",	//显示file控件的区域id
						showNameAreaId: "bb",  //显示文件名称容器id         
						maxUploadCount: 5    //最大上传数量
					});
				}
			});
		}
	]);

	
	//子级父级值传递
	moduleCtrl.register.controller('SelfCtrl', function($scope) {
		$scope.click = function () {
			$scope.$broadcast('to-child', 'child');
			$scope.$emit('to-parent', 'parent');
		}
	});

	moduleCtrl.register.controller('ParentCtrl', function($scope) {
		$scope.$on('to-parent', function(d,data) {
			console.log(data);         //父级能得到值		
			$scope.parentText=data;	
		});		
	});

	moduleCtrl.register.controller('ChildCtrl', function($scope){
		$scope.$on('to-child', function(d,data) {
			console.log(data);         //子级能得到值
			$scope.childText=data;
		});
	});
});