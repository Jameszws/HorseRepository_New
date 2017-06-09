/*
 * TODO 常量 基础服务
 */
define(["baseService"], function(baseService) {

	baseService.constant('ENV', {
		
		//请求baseUrl地址
		'_baseurl': '../jsondata/',
		
		//配置请求地址
		'_api': {
			studentcourse: "studentcourse.json",
			students: "students.json"
		},

		//配置不需要检测登录态的页面名称（注意要控制页面命名规则）
		'_noNeedToCheckLoginState':[			
			{pageid:2,pageName:"/test"},
			{pageid:3,pageName:"/test2"},
		],
		
		'_loginurl':"../src/#/login"
	});
	
});