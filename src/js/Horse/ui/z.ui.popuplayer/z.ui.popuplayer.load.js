/*
 * TODO 弹出层：加载url
 */
define(['zUiPopuplayerCommon'],function(zUiPopuplayerCommon){
	var popupCommon= zUiPopuplayerCommon.popupCommon;
	var popupEnumBtn=zUiPopuplayerCommon.popupEnumBtn;
	var popupEnumType=zUiPopuplayerCommon.popupEnumType;	

    var popupLoad = function () {
        //参数定义
        this.defaultParams = {

            title: "",  //标题
            boxstyle: "",   //样式
            url: "",    //加载地址
            data: "",   //数据
            loadback: $.noop,   //加载完成回调函数
            callback: $.noop,   //注意：返回值要是true/false的方法
            btnId: "",  //加载按钮的id
            btnSureText: "",    //确定按钮文字
            btnCancelText: ""   //取消按钮文字
        };

        this.options = {};

        this.popupLength = 0;
    };

    popupLoad.prototype = {
        constructor: popupLoad,

        init: function (params) {

            this.options = Horse.util.coverObject(this.defaultParams, params);

            this._init(this.options);
        },

        _init: function (options) {

            var popupLay = popupCommon.getPopupLayerHtml(this.options.title, this.options.boxstyle, "", popupEnumBtn.SureAndCancel, this.options.btnSureText, this.options.btnCancelText);

            $("body").append(popupLay);

            $("#" + options.btnId).attr("disabled", "disabled");//防止多次发送请求

            $.ajaxSetup({
                cache: false //关闭 AJAX 缓存
            });
            this.popupLength = $("div[userDefinedAttr='popupLayerBg']").length;

            $("#popupContent_" + this.popupLength).load(options.url, options.data, function () {

                popupCommon.showPopup();
                popupCommon.popupLayerPosition();

                $("#" + options.btnId).removeAttr("disabled");

                if ($.isFunction(options.loadback)) {
                    options.loadback();
                }

            });


            //注册事件
            popupCommon.registerBasicEvent();
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
                if (!$.isFunction(options.callback)) {
                    return;
                }
                if (!options.callback()) {
                    return;
                }
                popupCommon.closePopup();
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

   return popupLoad;

});