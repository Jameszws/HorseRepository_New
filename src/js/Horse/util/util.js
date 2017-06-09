define([], function() {

	//定义公共操作
	Function.prototype.delegate = function(context, params) {
		var func = this;
		return function() {
			if (params == null) {
				return func.apply(context);
			}
			return func.apply(context, params);
		};
	};

	String.prototype.endWith = function(s) {
		if (s == null || s == "" || this.length == 0 || s.length > this.length)
			return false;
		if (this.substring(this.length - s.length) == s)
			return true;
		else
			return false;
	};

	String.prototype.startWith = function(s) {
		if (s == null || s == "" || this.length == 0 || s.length > this.length)
			return false;
		if (this.substr(0, s.length) == s)
			return true;
		else
			return false;
	};

	var util = {
		delegate: function(func, context, params) {
			if ((typeof(eval(func)) == "function")) {
				return func.delegate(context, params);
			} else {
				return function() {};
			}
		},

		coverObject: function(obj1, obj2) {

			var o = this.cloneObject(obj1, false);
			var name;
			for (name in obj2) {
				if (obj2.hasOwnProperty(name)) {
					o[name] = obj2[name];
				}
			}
			return o;
		},

		cloneObject: function(obj, deep) {
			if (obj === null) {
				return null;
			}
			var con = new obj.constructor();
			var name;
			for (name in obj) {
				if (!deep) {
					con[name] = obj[name];
				} else {
					if (typeof(obj[name]) == "object") {
						con[name] = commonOp.cloneObject(obj[name], deep);
					} else {
						con[name] = obj[name];
					}
				}
			}
			return con;
		},

		///TODO 检查属性
		checkPrototypes: function(objc) {
			for (var p in objc) {
				if (typeof(objc[p]) == "function") {
					return;
				}
				if (typeof(objc[p]) == "string") {
					var value = objc[p];
					Object.preventExtensions(objc, p, {
						value: value,
						writable: true,
						configurable: true
					});
				}
			}
		},

		/// TODO 实现拷贝对象
		extend: function(target, source) {
			for (var p in source) {
				if (source.hasOwnProperty(p)) {
					target[p] = source[p];
				}
			}
			return target;
		},

		//js 判断样式是否存在
		hasClass: function(obj, cls) {
			return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		},

		//js 为指定的dom元素添加样式
		addClass: function(obj, cls) {
			if (!this.hasClass(obj, cls)) {
				obj.className += " " + cls;
			}
		},

		//js 删除指定dom元素的样式
		removeClass: function(obj, cls) {
			if (this.hasClass(obj, cls)) {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
				obj.className = obj.className.replace(reg, ' ');
			}
		},

		getQueryParams:function() { 
			var paramListObj={};
			var list=window.location.href.split('?');
			if(list.length>1){
				var paramList=list[1].split('&');
				for (var i = 0; i < paramList.length; i++) {
					var key = paramList[i].split("=")[0];
					var value = paramList[i].split("=")[1];
					paramListObj[key]=value;
				};
			}
			return paramListObj;
		},

		goBack:function(){
			var queryObj=this.getQueryParams();
			var from = queryObj.from;
			if(from){
				window.location.href = decodeURIComponent(from);
				return;
			}
			window.location.href = "../src/#/index";
		}
	};
	return util;
});