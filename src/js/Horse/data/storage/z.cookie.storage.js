define([], function() {
	var cookieStorage = {

		//写cookies 
		setCookie: function(name, value, time) {
			if(typeof value=="object"){
				value=JSON.stringify(value);
			}
			var strsec = this.getsec(time);
			var exp = new Date();
			exp.setTime(exp.getTime() + strsec * 1);
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		},

		//读取cookies 
		getCookie: function(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			var isExist=false;
			if (document.cookie.match(reg)) {
				arr=document.cookie.match(reg);
				isExist=true;
			}
			if(!isExist){
				return null;
			}
			try {
				return JSON.parse(unescape(arr[2]));			
			} catch (e) {
				return unescape(arr[2]);
			}
			return null;
		},
		
		//删除cookies 
        delCookie: function (name,domain,path) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1000 * 60 * 60 * 24 * 365);
            var cval = this.getCookie(name);            
            if (cval != null) {
            	
            	if(Horse.validate.isNull(path)){
            		path="/";
            	}
            	if(Horse.validate.isNull(domain)){            		
            		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            		return;
            	}
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";domain=" + domain + ";path=" + path;
            }
        },

		getsec: function(str) {
			var str1 = str.substring(1, str.length) * 1;
			var str2 = str.substring(0, 1);
			if (str2 == "s") {
				return str1 * 1000;
			} 
			if (str2 == "h") {
				return str1 * 60 * 60 * 1000;
			}
			if (str2 == "d") {
				return str1 * 24 * 60 * 60 * 1000;
			}
		}
	};
	return cookieStorage;
});