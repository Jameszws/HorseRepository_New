/**
 * 
 */
define(['baseController','zPageView','citylinkage','uploadImg'], function(moduleCtrl,zPageView,citylinkage,uploadImg) {	

	moduleCtrl.register.controller('test_Ctrl', ['$scope', '$rootScope', '$http', '$location', 
		function($scope, $rootScope, $http, $location) {			
			var pageView = new zPageView().extend({
				onShow:function(){
					$rootScope.navTitle="数据源配置";									
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
	
	moduleCtrl.register.controller('myCtrl', function($scope) {
		$scope.person = {};
		$scope.people = [
			{ name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
			{ name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
			{ name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
			{ name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
			{ name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
			{ name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
			{ name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
			{ name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
			{ name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
			{ name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
		];
	});
});