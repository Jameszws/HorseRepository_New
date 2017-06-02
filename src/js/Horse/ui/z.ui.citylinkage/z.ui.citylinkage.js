/*
*  instructions :citylinkage 基于jquery
*  date : 2015-8-20
*  author : 张文书
*  Last Modified 
*  By 张文书
*/

define(['citydata'],function (citydata) {
	
	var cityItems =citydata;

    //定义全局参数
    var citylinkageParams = {
        //被选中的城市等级ID
        cityItemsKey: {
            provincesLevelId: 0,//默认值
            cityLevelId: null,
            countyLevelId: null
        },
        //被选中城市信息
        selectedCity: {
            provinces: {
                provincesId: null,
                provincesName: ""
            },
            city: {
                cityId: null,
                cityName: ""
            },
            county: {
                countyId: null,
                countyName: ""
            }
        }
    };

    ///说明：
    ///  TODO 城市联动选择（插件）
    var citylinkage = function () {
        //定义默认参数
        this.defaultParams = {
            contentId: ""   //接收容器的id
        };
        this.options = {};
    };
    citylinkage.prototype = {
        constructor: citylinkage,

        init: function (params) {
            this.options = Horse.util.coverObject(this.defaultParams, params);
            this._init();
        },

        _init: function () {
            this.registerContentClick();
            this.registerDocumentClick();
        },
        
        /****************************(注册事件 begin )******************************/

        registerContentClick: function () {
            var contentId = this.options.contentId;
            $("#"+contentId).addClass("citylinkage-area");
            var handleEvent = Horse.util.delegate(this._handlerContentClick, this, [{ contentId: contentId }]);
            $("#" + contentId).click(handleEvent);
        },

        //注册关闭事件
        registerDocumentClick: function () {
            var options = this.options;
            $(document).click(function(event) {
                var handleEvent = Horse.util.delegate(citylinkage.prototype._handleDocumentClick, this, [{ event: event, options: options }]);
                handleEvent();
            });
        },

        registerProvincestabClick: function () {
            var contentId = this.options.contentId;
            var handleEvent = Horse.util.delegate(this._handlerProvincestabClick, this, [{ contentId: contentId }]);
            $("#provincestab_" + contentId).click(handleEvent);
        },

        registerCitytabClick: function () {
            var contentId = this.options.contentId;
            var handleEvent = Horse.util.delegate(this._handlerCitytabClick, this, [{ contentId: contentId }]);
            $("#citytab_" + contentId).click(handleEvent);
        },

        registerCountytabClick: function () {
            var contentId = this.options.contentId;
            var handleEvent = Horse.util.delegate(this._handlerCountytabClick, this, [{ contentId: contentId }]);
            $("#countytab_" + contentId).click(handleEvent);
        },

        registertabbodydetailInfoClick: function () {
            var contentId = this.options.contentId;
            var obj = this;
            
            $(".tab-body-detailInfo").click(function (event) {
                event.stopPropagation();
                var attrId = $(this).attr("attrId");
                var attrItem = $(this).attr("attrItem");
                var handleEvent = Horse.util.delegate(obj._handlertabbodydetailInfoClick, obj, [{ contentId: contentId, attrId: attrId, attrItem: attrItem }]);
                handleEvent();
            });
        },

        /****************************(注册事件 end )******************************/

        /****************************( 事件句柄 end )******************************/

        _handlerContentClick: function () {
            var contentId = this.options.contentId;
            if ($("#citylinkageTab").length > 0) {
                return;
            }
            var tabHtml = "<div class='tab-citylinkage' id='citylinkageTab'>";
            tabHtml += "       <div class='tab-head'>";
            tabHtml += "           <div id='provincestab_" + contentId + "' class='tab-head-name tab-head-borderbottom-none'>省份</div>";
            tabHtml += "           <div id='citytab_" + contentId + "' class='tab-head-name2 tab-head-borderbottom'>城市</div>";
            tabHtml += "           <div id='countytab_" + contentId + "' class='tab-head-name tab-head-borderbottom'>县区</div>";
            tabHtml += "       </div>";
            tabHtml += "       <div id='detailInfo_" + contentId + "' class='tab-body'>";
            tabHtml += "       </div>";
            tabHtml += "   </div>";

            $("body").append(tabHtml);
            this.getPosition();
            this.getCityLevelInfo(citylinkageParams.cityItemsKey.provincesLevelId);

            //注册事件
            this.registerProvincestabClick();
            this.registerCitytabClick();
            this.registerCountytabClick();
        },

        _handleDocumentClick: function (params) {
            var e = params.event || window.event;
            var elem = e.srcElement || e.target;
            while (elem) {
                if (elem.id == "citylinkageTab" || elem.id == params.options.contentId) {
                    return;
                }
                elem = elem.parentNode;
            }
            if ($("#citylinkageTab").length > 0) {
                $("#citylinkageTab").remove();
            }
        },

        _handlerProvincestabClick: function (params) {
            this.setProvincestabStyle(params);
            this.getCityLevelInfo(citylinkageParams.cityItemsKey.provincesLevelId);
        },

        _handlerCitytabClick: function (params) {
            this.setCitytabStyle(params);
            this.getCityLevelInfo(citylinkageParams.cityItemsKey.cityLevelId);
        },

        _handlerCountytabClick: function (params) {
            this.setCountytabStyle(params);
            this.getCityLevelInfo(citylinkageParams.cityItemsKey.countyLevelId);
        },

        _handlertabbodydetailInfoClick: function (params) {
            var contentId = params.contentId;
            var attrId = params.attrId;
            var attrItem = params.attrItem;
            var keyOfData;
            //获取子级城市key
            $.each(cityItems, function (key, item) {
                var keylist = key.split(',');
                var keylistLen = keylist.length;
                if ($.trim(key) != attrId && $.trim(keylist[keylistLen - 1]) == attrId) {
                    keyOfData = key;
                    return false;
                }
                return true;
            });
            if (keyOfData == null) {
                citylinkageParams.selectedCity.county.countyId = attrId;
                citylinkageParams.selectedCity.county.countyName = attrItem;
                this.showSelectedCityInfo(contentId);
                $("span.tab-body-detailInfo").removeClass("selectedStyle");
                $("span.tab-body-detailInfo[attrId='" + attrId + "']").addClass("selectedStyle");
                return;
            }

            var len = keyOfData.split(',').length;
            if (len == 2) {
                citylinkage.prototype.setCitytabStyle(params);
                citylinkageParams.cityItemsKey.cityLevelId = keyOfData;//记录被选中的市级id
                citylinkageParams.cityItemsKey.countyLevelId = null;

                citylinkageParams.selectedCity.provinces.provincesId = attrId;
                citylinkageParams.selectedCity.city.cityId = null;
                citylinkageParams.selectedCity.county.countyId = null;

                citylinkageParams.selectedCity.provinces.provincesName = attrItem;
                citylinkageParams.selectedCity.city.cityName = "";
                citylinkageParams.selectedCity.county.countyName = "";
            }
            else if (len == 3) {
                citylinkage.prototype.setCountytabStyle(params);
                citylinkageParams.cityItemsKey.countyLevelId = keyOfData;//记录被选中的县区id

                citylinkageParams.selectedCity.city.cityId = attrId;
                citylinkageParams.selectedCity.county.countyId = null;

                citylinkageParams.selectedCity.city.cityName = attrItem;
                citylinkageParams.selectedCity.county.countyName = "";
            }
            
            this.showSelectedCityInfo(contentId);
            
            this.getCityLevelInfo(keyOfData);
            
            this.registertabbodydetailInfoClick();
        },

        /****************************( 事件句柄 end )******************************/

        /****************************( 调用方法 begin )******************************/

        setProvincestabStyle: function (params) {
            var contentId = params.contentId;
            $("#provincestab_" + contentId).removeClass("tab-head-borderbottom").addClass("tab-head-borderbottom-none");
            $("#citytab_" + contentId).removeClass("tab-head-borderbottom-none").addClass("tab-head-borderbottom");
            $("#countytab_" + contentId).removeClass("tab-head-borderbottom-none").addClass("tab-head-borderbottom");
        },

        setCitytabStyle: function (params) {
            var contentId = params.contentId;
            $("#provincestab_" + contentId).removeClass("tab-head-borderbottom-none").addClass("tab-head-borderbottom");
            $("#citytab_" + contentId).removeClass("tab-head-borderbottom").addClass("tab-head-borderbottom-none");
            $("#countytab_" + contentId).removeClass("tab-head-borderbottom-none").addClass("tab-head-borderbottom");
        },

        setCountytabStyle: function (params) {
            var contentId = params.contentId;
            $("#provincestab_" + contentId).removeClass("tab-head-borderbottom-none").addClass("tab-head-borderbottom");
            $("#citytab_" + contentId).removeClass("tab-head-borderbottom-none").addClass("tab-head-borderbottom");
            $("#countytab_" + contentId).removeClass("tab-head-borderbottom").addClass("tab-head-borderbottom-none");
        },

        //显示各级城市信息
        getCityLevelInfo: function (cityItemsKey) {
            var contentId = this.options.contentId;
            if (cityItemsKey == null) {
                $("#detailInfo_" + contentId).html("");
                return;
            }
            var provinceHtml = "";
            $.each(cityItems[cityItemsKey], function (key, item) {
                var selectedStyle = "";
                if (key == citylinkageParams.selectedCity.provinces.provincesId ||
                    key == citylinkageParams.selectedCity.city.cityId ||
                    key == citylinkageParams.selectedCity.county.countyId) {
                    selectedStyle = "selectedStyle";
                }
                provinceHtml += "<span class='tab-body-detailInfo " + selectedStyle + "' id='c_" + key + "' attrId='" + key + "' attrItem='" + item + "'>" + item + "</span>";
            });
            $("#detailInfo_" + contentId).html(provinceHtml);
            
            this.registertabbodydetailInfoClick();
        },

        showSelectedCityInfo: function (contentId) {

            var htmlContent =
                (citylinkageParams.selectedCity.provinces.provincesName == "" ? "" : citylinkageParams.selectedCity.provinces.provincesName + " / ") +
                (citylinkageParams.selectedCity.city.cityName == "" ? "" : citylinkageParams.selectedCity.city.cityName + " / ") +
                (citylinkageParams.selectedCity.county.countyName == "" ? "" : citylinkageParams.selectedCity.county.countyName);

            $("#" + contentId).html(htmlContent);
        },

        //获取元素位置  定位
        getPosition: function () {
            var left = $("#" + this.options.contentId).offset().left;
            //zepto用height()方法，jquery 中使用 outerHeight()
            var top = $("#" + this.options.contentId).offset().top + $("#" + this.options.contentId).height();
            $("#citylinkageTab").css("left", left);
            $("#citylinkageTab").css("top", top);
        }

        /****************************(  调用方法 end )******************************/
    };

    return citylinkage;

});
