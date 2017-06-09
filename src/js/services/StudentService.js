/*
 * student服务
 */
define(["baseService"], function(baseService) {
	
	baseService.register.factory("studentsvc", ['$q', '$http', '$location', 'authservice','ENV','restservice',function($q, $http, $location, authservice,ENV,restservice) {
		var studentSvc=function(){			
			restservice.call(this,studentSvc);			
		};
		
		studentSvc.prototype = {
			
			getstudentbyid: function() {				
				this.url = ENV._baseurl + ENV._api.studentcourse;				
				this.params={ 'id': '1'};
				this.timeout=3000;
				return this.get();
			},
			getstudents: function() {
				this.url = ENV._baseurl + ENV._api.students;
				this.params={ 'id': '123'};
				return this.get();
			},
			GetQQChannelInfo:function(){
				this.url="http://ws.union.open.uat.qa.nt.ctripcorp.com/amservice/api/amcommonsoaservice/json/GetQQChannelInfo";
				this.params={"UID":'shouq_test_idqq1'};
				return this.post();
			}
		};
		
		return function(){
			return new studentSvc();
		}
	}]);
});