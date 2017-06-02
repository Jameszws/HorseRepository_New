/*
 * 学生信息控制器
 */
define(['baseController','zPageView'], function(baseController,zPageView) {

	baseController.register.controller("student_Ctrl", ["$rootScope", "$scope", "studentsvc",
		function($rootScope, $scope, studentsvc) {
			var page=zPageView.extend({
				
				events:{
					"click #aa":"aaHandler"
				},
				
				aaHandler:function(){
					alert(123);
				},
				
				onInitView: function() {
					$rootScope.headTitle = "学生信息";
				},
				
				onShow: function() {					
					$scope.showCourse = false;
					$scope.showStudent = false;
					this.getPageParams();
					this.showMyInfoclick();
					this.showStudentInfoclick();
					this.getQQChannelInfo();
				},
				
				showMyInfoclick: function() {
					var current = this;
					$scope.showMyInfo = function() {
						current.getstudentbyid();						
					};
				},
				
				showStudentInfoclick: function() {
					var current = this;
					$scope.showStudentInfo = function() {
						current.getstudents();
					};
				},
				
				getstudentbyid: function() {					
					//获取我的课程信息
					this.studentsvc.getstudentbyid().then(function(result) {
						$scope.name = result.data.name;
						$scope.sex = result.data.sex;
						$scope.age = result.data.age;
						$scope.courses = result.data.mycourse;
						$scope.showCourse = true;
						$scope.showStudent = false;
					}, function(error) {
						console.log(error);
					}, function(progress) {
						console.log(progress);
					});
				},
				
				getstudents: function() {
					//获取课程
					this.studentsvc.getstudents().then(function(result) {
						$scope.students = result.data;
						$scope.showCourse = false;
						$scope.showStudent = true;
					}, function(error) {

					}, function(progress) {

					});
				},
				
				getQQChannelInfo:function(){
					var current=this;
					$scope.GetQQChannelInfo=function(){						
						current.studentsvc.GetQQChannelInfo().then(function(ret){
							console.log(ret);
						},function(error){
							console.log(error);
						},function(progress){
							console.log(progress);
						});
					};					
				},
				
				getPageParams:function(){
					this.studentsvc=studentsvc();
				}
			});
		}
	]);
});

