define(["baseController","zPageView","citylinkage","uploadImg"],function(t,e,n,o){t.register.controller("test_Ctrl",["$scope","$rootScope","$http","$location",function(t,i,l,r){(new e).extend({onShow:function(){i.navTitle="数据源配置",(new n).init({contentId:"cityselect"}),(new o).init({fileAreaId:"aa",showNameAreaId:"bb",maxUploadCount:5})}})}]),t.register.controller("SelfCtrl",function(t){t.click=function(){t.$broadcast("to-child","child"),t.$emit("to-parent","parent")}}),t.register.controller("ParentCtrl",function(t){t.$on("to-parent",function(e,n){console.log(n),t.parentText=n})}),t.register.controller("ChildCtrl",function(t){t.$on("to-child",function(e,n){console.log(n),t.childText=n})})});