define(['baseRoute'], function(baseRoute) {
	baseRoute.config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
		function($stateProvider, $locationProvider, $urlRouterProvider) {

			$locationProvider.html5Mode(false);
			$locationProvider.hashPrefix("");
			$urlRouterProvider.otherwise('/index');

			$stateProvider
			.state('login', {
				url: '/login',
				controller: 'login_Ctrl',
				templateUrl: '../src/view/login/login.html',
				resolve: {
					loadCtrl: ["$q", function($q) {
						var deferred = $q.defer();
						//异步加载controller／directive/filter/service
						require(['loginCtrl'], function() {
							deferred.resolve();
						});
						return deferred.promise;
					}]
				}
			})
			.state("index", {
				url: "/index",
				controller: "index_Ctrl",
				templateUrl: '../src/view/index/index.html',
				resolve: {
					loadCtrl: ["$q", function($q) {
						var deferred = $q.defer();
						require(['indexCtrl'], function() {
							deferred.resolve();
						});
						return deferred.promise;
					}]
				}
			})
			.state('student', {
				url: '/student',
				controller: 'student_Ctrl',
				templateUrl: '../src/view/student/student.html',
				resolve: {
					loadCtrl: ["$q", function($q) {
						var deferred = $q.defer();
						//异步加载controller／directive/filter/service
						require(['studentService','studentCtrl'], function() {
							deferred.resolve();
						});
						return deferred.promise;
					}]
				}
			})
			.state('test', {
				url: '/test',
				templateUrl: '../src/view/TestPage/test.html',
				controller: 'test_Ctrl',
				resolve: {
					loadCtrl: ["$q", function($q) {
						var deferred = $q.defer();
						require(['testCtrl'], function() {
							deferred.resolve();
						});
						return deferred.promise;
					}]
				}
			})
			.state('test2', {
				url: '/test2/:id',
				templateUrl: '../src/view/TestPage/test2.html',
				controller: 'test_Ctrl2',
				resolve: {
					loadCtrl: ["$q", function($q) {
						var deferred = $q.defer();
						require(['testCtrl2'], function() {
							deferred.resolve();
						});
						return deferred.promise;
					}]
				}
			})
		}
	]);

});