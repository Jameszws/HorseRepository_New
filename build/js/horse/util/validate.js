define([],function(){return{isNull:function(n){return null===n||void 0===n||""===n.trim()},objIsNull:function(n){return null===n||void 0===n},isFunction:function(n){return null!=n&&"function"==typeof n},isTrue:function(n){return!0===n},isExistAttr:function(n,t){return void 0===document.getElementById(n).attributes[t]},isDate:function(n){var t=n.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);if(null==t)return!1;var e=new Date(t[1],t[3]-1,t[4]);return e.getFullYear()==t[1]&&e.getMonth()+1==t[3]&&e.getDate()==t[4]},isPic:function(n){if(n.indexOf(".")>-1){var t=n.lastIndexOf("."),e=n.substring(t,this.length)+"|";if(e=e.toLowerCase(),".jpeg|.gif|.jpg|.png|.bmp|.pic".indexOf(e)>-1)return!0}return!1}}});