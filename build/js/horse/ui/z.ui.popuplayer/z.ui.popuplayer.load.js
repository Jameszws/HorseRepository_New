define(["zUiPopuplayerCommon"],function(t){var o=t.popupCommon,e=t.popupEnumBtn,n=(t.popupEnumType,function(){this.defaultParams={title:"",boxstyle:"",url:"",data:"",loadback:$.noop,callback:$.noop,btnId:"",btnSureText:"",btnCancelText:""},this.options={},this.popupLength=0});return n.prototype={constructor:n,init:function(t){this.options=Horse.util.coverObject(this.defaultParams,t),this._init(this.options)},_init:function(t){var n=o.getPopupLayerHtml(this.options.title,this.options.boxstyle,"",e.SureAndCancel,this.options.btnSureText,this.options.btnCancelText);$("body").append(n),$("#"+t.btnId).attr("disabled","disabled"),$.ajaxSetup({cache:!1}),this.popupLength=$("div[userDefinedAttr='popupLayerBg']").length,$("#popupContent_"+this.popupLength).load(t.url,t.data,function(){o.showPopup(),o.popupLayerPosition(),$("#"+t.btnId).removeAttr("disabled"),$.isFunction(t.loadback)&&t.loadback()}),o.registerBasicEvent(),this._registerBtnClick(t),this._registerDocMousemovePopupLayer(),this._registerDocMouseupPopupLayer(),this._registerTitleMousedownPopupLayer(),this._registerWinBlurPopupLayer(),this._registerCancelMousedown()},_registerBtnClick:function(t){var e=this.popupLength;$("#popupBtnSure_"+e).click(function(){$.isFunction(t.callback)&&t.callback()&&o.closePopup()})},_registerDocMousemovePopupLayer:function(){o.docMousemovePopupLayer()},_registerDocMouseupPopupLayer:function(){o.docMouseupPopupLayer()},_registerTitleMousedownPopupLayer:function(){o.titleMousedownPopupLayer()},_registerWinBlurPopupLayer:function(){o.winBlurPopupLayer()},_registerCancelMousedown:function(){o.cancelMousedown()}},n});