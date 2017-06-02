
define([],function(){
	var sessionStorage={
		set:function(key,value){			
			window.sessionStorage.setItem(key,JSON.stringify(value));
		},
		
		get:function(key){
			try{
				return JSON.parse(window.sessionStorage.getItem(key));
			}
			catch(ex){
				console.log(ex);
				return window.sessionStorage.getItem(key);	
			}
		},
		
		remove:function(key){
			window.sessionStorage.removeItem(key);
		},
		
		clear:function(){
			window.sessionStorage.clear();
		}
	};
	return sessionStorage;
});