define([],function(){return{set:function(e,o){"object"==typeof o&&(o=JSON.stringify(o)),window.localStorage.setItem(e,o)},get:function(e){try{return JSON.parse(window.localStorage.getItem(e))}catch(o){return console.log(o),window.localStorage.getItem(e)}},remove:function(e){window.localStorage.removeItem(e)},clear:function(){window.localStorage.clear()}}});