define(["text!virtualKeyTempl"],function(t){var i=function(){this.defaultParams={containerId:"",isPopShow:!1,showWidth:"240px",virtualkeyClickCallback:null}};return i.prototype={constructor:i,init:function(t){this.options=Horse.util.coverObject(this.defaultParams,t),this._init()},_init:function(){this.renderTempl()},renderTempl:function(){var i=t;$("#"+this.options.containerId).html(i),$("#"+this.options.containerId).show(),$("#virtualKeyboard").css("width",this.options.showWidth),this.registerEvent()},registerEvent:function(){var t=this,i={"click #virtualKeyboard>ul>li.vk_item":"click_number"};for(var n in i){var r=n.split(" ");if(r&&2==r.length){var o=r[0],e=r[1];$(e).on(o,$.proxy(t[i[n]],this))}}},click_number:function(t){t.stopPropagation();var i=$(t.currentTarget),n=i.attr("attrId");Horse.validate.isFunction(this.options.virtualkeyClickCallback)&&this.options.virtualkeyClickCallback(n)}},i});