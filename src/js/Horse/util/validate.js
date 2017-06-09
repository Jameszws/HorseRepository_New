/* 
 *
 * TODO 验证功能 
 * 
 */
define([], function() {
	var validate = {

		//判断字符串是否为空
		isNull: function(str) {
			if (str !== null && str !== undefined && str.trim() !== '') {
				return false;
			}
			return true;
		},

		//判断字符串是否为空
		objIsNull: function(str) {
			if (str !== null && str !== undefined) {
				return false;
			}
			return true;
		},

		isFunction: function(callback) {
			if (callback != null && typeof callback == "function") {
				return true;
			}
			return false;
		},

		isTrue: function(ret) {
			return ret === true;
		},

		//说明：
		//  判断元素是否存在某个属性   true：不包含   false:包含 
		isExistAttr: function(id, attr) {

			if (typeof(document.getElementById(id).attributes[attr]) != "undefined") {
				return false;
			}
			return true;
		},

		//说明：
		//  判断输入框中输入的日期格式为yyyy-mm-dd和正确的日期   短日期，形如 (2008-07-22)
		isDate: function(str) {
			var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
			if (r == null) {
				return false;
			}
			var d = new Date(r[1], r[3] - 1, r[4]);
			return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
		},
		
		isPic: function(str) {
			var strFilter = ".jpeg|.gif|.jpg|.png|.bmp|.pic";
			if (str.indexOf(".") > -1) {
				var p = str.lastIndexOf(".");
				var strPostfix = str.substring(p, this.length) + "|";
				strPostfix = strPostfix.toLowerCase();
				if (strFilter.indexOf(strPostfix) > -1) {
					return true;
				}
			}
			return false;
		}
	};
	return validate;
});
