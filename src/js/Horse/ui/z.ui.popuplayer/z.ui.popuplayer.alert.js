/*
 * TODO 弹出层 alert
 */
define(['zUiPopuplayerCommon'],function(zUiPopuplayerCommon){
	var popupCommon= zUiPopuplayerCommon.popupCommon;
	var popupEnumBtn=zUiPopuplayerCommon.popupEnumBtn;
	var popupEnumType=zUiPopuplayerCommon.popupEnumType;
	var popupAlert = function (popupType) {
        //参数定义
        this.defaultParams = {
            title: "",
            content: "",
            boxstyle: "",
            callback: $.noop,//注意：返回值要是true/false的方法
            cancelCallBack:$.noop	//取消按钮的回调函数
        };
        this.options = {};
        this.popupLength = 0;
        this.popupType = popupType;
    };
    popupAlert.prototype = {
        constructor: popupAlert,
        init: function (params) {
            this.options = Horse.util.coverObject(this.defaultParams, params);
            this._init(this.options);
        },        
        _init: function (options) {

            var contentHtml = popupCommon.getBasicElements_Alert(this.popupType, this.options.content);
            var popupLay = popupCommon.getPopupLayerHtml(this.options.title, this.options.boxstyle, contentHtml, popupEnumBtn.SureOnly);

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

        _registerBtnClick: function (options) {
            var len = this.popupLength;
            $("#popupBtnSure_" + len).click(function () {
                popupCommon.closePopup();
                if ($.isFunction(options.callback)) {
                    Horse.validate.isFunction(options.callback) && options.callback(); 
                }
            });
        },

        _registerDocMousemovePopupLayer: function () {
            popupCommon.docMousemovePopupLayer();
        },

        _registerDocMouseupPopupLayer: function () {
            popupCommon.docMouseupPopupLayer();
        },

        _registerTitleMousedownPopupLayer: function () {
            popupCommon.titleMousedownPopupLayer();
        },

        _registerWinBlurPopupLayer: function () {
            popupCommon.winBlurPopupLayer();
        },

        _registerCancelMousedown: function () {
            popupCommon.cancelMousedown();
        }
    };
    return popupAlert;
});