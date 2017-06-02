/*
 * TODO 弹出层  Confirm
 */
define(['zUiPopuplayerCommon'], function(zUiPopuplayerCommon) {
	var popupCommon = zUiPopuplayerCommon.popupCommon;
	var popupEnumBtn = zUiPopuplayerCommon.popupEnumBtn;	

	var popupConfirm = function() {

		//参数定义
		this.defaultParams = {
			title: "", //标题
			content: "", //弹出提示内容
			boxstyle: "", //样式
			isShowIcon: true, //是否显示图标  默认显示
			callback: $.noop, //注意：返回值要是true/false的方法
			btnSureText: "", //确定按钮文字
			btnCancelText: "", //取消按钮文字
			cancelCallBack:$.noop
		};

		this.options = {};
		this.popupLength = 0;
	};

	popupConfirm.prototype = {
		constructor: popupConfirm,

		init: function(params) {
			this.options = Horse.util.coverObject(this.defaultParams, params);

			this._init(this.options);
		},

		_init: function(options) {
			var contentHtml = popupCommon.getBasicElements_Confirm(this.options.content, this.options.isShowIcon);
			var popupLay = popupCommon.getPopupLayerHtml(this.options.title, this.options.boxstyle, contentHtml, popupEnumBtn.SureAndCancel, this.options.btnSureText, this.options.btnCancelText);

			$("body").append(popupLay);

			this.popupLength = $("div[userDefinedAttr='popupLayerBg']").length;

			popupCommon.showPopup();

			popupCommon.registerBasicEvent(this.options.cancelCallBack);

			popupCommon.popupLayerPosition();

			//注册事件
			this._registerBtnClick(options);

			this._registerDocMousemovePopupLayer();
			this._registerDocMouseupPopupLayer();
			this._registerTitleMousedownPopupLayer();
			this._registerWinBlurPopupLayer();
			this._registerCancelMousedown();
		},

		_registerBtnClick: function(options) {
			var len = this.popupLength;
			$("#popupBtnSure_" + len).click(function() {
				popupCommon.closePopup();
				if ($.isFunction(options.callback)) {
					options.callback();
				}
			});
		},

		_registerDocMousemovePopupLayer: function() {
			popupCommon.docMousemovePopupLayer();
		},

		_registerDocMouseupPopupLayer: function() {
			popupCommon.docMouseupPopupLayer();
		},

		_registerTitleMousedownPopupLayer: function() {
			popupCommon.titleMousedownPopupLayer();
		},

		_registerWinBlurPopupLayer: function() {
			popupCommon.winBlurPopupLayer();
		},

		_registerCancelMousedown: function() {
			popupCommon.cancelMousedown();
		}

	};

	return popupConfirm;
});