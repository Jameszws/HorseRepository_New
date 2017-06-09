/*
 * 
 */
define(['baseController','zPageView','datepicker','virtualKey','securitycode'], function(moduleCtrl,zPageView,datepicker,virtualKey,securitycode) {
	moduleCtrl.register.controller('test_Ctrl2', ['$scope', '$rootScope', '$location',  function($scope, $rootScope, $location) {
		var pageView = new zPageView().extend({
			onShow:function(){
				$rootScope.navTitle="需求管理";
			
				$scope.text="text page";
				/*
				var width=$("#cc").css("width");
				new virtualKey().init({
					containerId: "vk", //容器ID
					isPopShow: false, //是否弹出
					showWidth: width, //虚拟键盘宽度
					virtualkeyClickCallback: function(num) {
						console.log(num);
					}
				});

				new securitycode().init({
					containerId: "dd",    //容器ID
	                securityCodePlugInAreaId: "sc1", //安全码插件ID
	                fillInCompleteCallBack: null, //填写完成回调函数
	                //是否需要确认密码
	                needConfirmPassword: {
	                    referencePasswordId: "",//参考密码插件SCID
	                    callback: null   //回调函数
	                },
	
	                isNeedClickSCShowVirtualKey: true,  //是否需要点击显示
	                clickSCCallback: null,    //点击安全码框回调函数
	
	                isHasFixedPosition: true,     //是否有固定的位置显示虚拟键
	                fixedPositionAreaId: "vk",     //固定位置区域id
	                virtualkeyClickCallback: null    //虚拟键点击回调事件
				});
				*/
			}
		});
	}]);
});