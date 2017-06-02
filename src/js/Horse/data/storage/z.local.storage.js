
define([],function(){
	var localStorage={
		set:function(key,value){
			if(typeof value=="object"){
				value=JSON.stringify(value);
			}
			window.localStorage.setItem(key,value);
		},
		
		get:function(key){
			try{
				return JSON.parse(window.localStorage.getItem(key));
			}
			catch(ex){
				console.log(ex);
				return window.localStorage.getItem(key);	
			}
		},
		
		remove:function(key){
			window.localStorage.removeItem(key);
		},
		
		clear:function(){
			window.localStorage.clear();
		}
	};
	return localStorage;
});