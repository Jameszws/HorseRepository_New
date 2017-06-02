/*
*  instructions ：DatePicker  
*  date : 2014-06-20
*  author : 张文书
*  Last Modified 
*  By 张文书
*/


/*
 * TODO 弹出层 common
 */
define([], function() {

	/*
	 * TODO 说明：alert弹出 五种状态 "error"、"info"、"question"、"warning"、"alert"
	 */
	var popupEnumType = {
		Error: 1,
		Info: 2,
		Question: 3,
		Warning: 4,
		Alert: 5
	};

	/*
	 * TODO 说明：显示button的类型
	 */
	var popupEnumBtn = {
		SureAndCancel: 1,
		SureOnly: 2,
		CancelOnly: 3
	};

	// TODO 说明：
	//      弹出层拖动定义参数对象
	var popupLayParam = {
		bDrag: false,
		disX: 0,
		disY: 0
	};

	//各类弹出层的公共部分
	var popupCommon = {

		//获取 Confirm 基础元素
		getBasicElements_Confirm: function(content, isShowIcon) {
			var htmlStr = "";
			htmlStr += "<div class='cancel_dingdai_tixing'>";
			htmlStr += "<dl class='f-oh'>";
			if (isShowIcon) {
				htmlStr += "<dd class='f-fl infoIcon'></dd>";
			}
			htmlStr += "    <dd class='f-fl cancel_dingdai_text cancel_dingdai_text_content'>" + content + "</dd>";
			htmlStr += "</dl>";
			htmlStr += "</div>";

			return htmlStr;
		},

		//获取 Alert 基础元素
		getBasicElements_Alert: function(popupType, content) {

			var htmlStr = "";
			htmlStr += "<div class='cancel_dingdai_tixing'>";
			htmlStr += "     <dl class='f-oh'>";
			htmlStr += "<dd class='f-fl ";
			switch (popupType) {
				case popupEnumType.Error:
					htmlStr += "errorIcon";
					break;
				case popupEnumType.Info:
					htmlStr += "infoIcon";
					break;
				case popupEnumType.Question:
					htmlStr += "questionIcon";
					break;
				case popupEnumType.Warning:
					htmlStr += "warningIcon";
					break;
				case popupEnumType.Alert:
					htmlStr += "";
					break;
			}
			htmlStr += "'></dd>";
			htmlStr += "         <dd class='f-fl cancel_dingdai_text cancel_dingdai_text_content'>" + content + "</dd>";
			htmlStr += "     </dl>";
			htmlStr += " </div>";

			return htmlStr;
		},

		// TODO 获得要显示的弹出层
		//参数说明：
		//  title:标题
		//  boxstyle:弹出层样式
		//  contentHtml:弹出的内容
		//  popupBtnType:弹出层类型
		//  btnSureText:确定按钮文字
		//  btnCancelText:取消按钮文字
		getPopupLayerHtml: function(title, boxstyle, contentHtml, popupBtnType, btnSureText, btnCancelText) {

			var htmlStr = "";
			htmlStr += "<div id='" + this.returnId("popupBg") + "' userDefinedAttr='popupLayerBg' class='popupBg' style='z-index:" + this.returnPopupBgZIndex() + "' ></div>";
			htmlStr += "<div id='" + this.returnId("popupShow") + "' class='popupShow' style='z-index:" + this.returnPopupShowZIndex() + "'>";
			htmlStr += "   <div class='cancel_dingdai_pop'>";
			htmlStr += "       <div class='cancel_dingdai_wrap_out' id='" + this.returnId("wrapOut") + "'>";
			htmlStr += "           <div id='popupBox' class='cancel_dingdai_wrap " + boxstyle + "' >";
			htmlStr += "               <h2 id='" + this.returnId("popupTitle") + "' class='cancel_dingdai_title f-oh'>";
			htmlStr += "                   <span class='cancel_dingdai_text f-fl'>" + title + "</span>";
			htmlStr += "                   <em id='" + this.returnId("cancelImg") + "' class='cancel_dingdai_title_icon f-fr' style='font-size:9px;'></em>";
			htmlStr += "               </h2>";
			htmlStr += "               <div id='" + this.returnId("popupContent") + "' style='width:100%;height:auto;background-color:white'>";
			htmlStr += contentHtml;
			htmlStr += "               </div>";
			htmlStr += this.getPopupLayerBtn(popupBtnType, btnSureText, btnCancelText);
			htmlStr += "           </div>";
			htmlStr += "       </div>";
			htmlStr += "    </div>";
			htmlStr += "</div>";
			return htmlStr;
		},

		//TODO 弹出层按钮选择
		getPopupLayerBtn: function(popupBtnType, btnSureText, btnCancelText) {

			btnSureText = this.getParam(btnSureText) == "" ? "确定" : btnSureText;
			btnCancelText = this.getParam(btnCancelText) == "" ? "取消" : btnCancelText;

			var htmlStr = "";
			htmlStr += "<div class='cancel_dingdai_tijiao'>";
			htmlStr += "    <dl class='f-fr f-oh'>";

			var sureBtnStr = "";
			sureBtnStr += "<dd class='f-fl cancel_dingdai_submit'>";
			sureBtnStr += "    <input type='button' id='" + this.returnId("popupBtnSure") + "'  value='" + btnSureText + "' />";
			sureBtnStr += "</dd>";

			var cancelBtnStr = "";
			cancelBtnStr += "<dd class='f-fl cancel_dingdai_cancel'>";
			cancelBtnStr += "    <input type='button' id='" + this.returnId("popupBtnCancel") + "' value='" + btnCancelText + "' />";
			cancelBtnStr += "</dd>";

			switch (popupBtnType) {
				case popupEnumBtn.SureAndCancel:
					htmlStr += sureBtnStr + cancelBtnStr;
					break;
				case popupEnumBtn.SureOnly:
					htmlStr += sureBtnStr;
					break;
				case popupEnumBtn.CancelOnly:
					htmlStr += cancelBtnStr;
					break;

			}

			htmlStr += "    </dl>" +
				"</div>";

			return htmlStr;

		},

		//判断元素是否存在，存在后部分加1
		returnId: function(prefix) {
			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			if (len < 0) {
				return prefix + "_1";
			}
			len++;
			return prefix + "_" + len;
		},

		//返回弹出层遮罩的z-index
		returnPopupBgZIndex: function() {
			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			if (len < 0) {
				return 1001;
			}

			return 1002 + 2 * len - 1;
		},

		//返回弹出层的z-index
		returnPopupShowZIndex: function() {
			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			if (len < 0) {
				return 1002;
			}

			return 1002 + 2 * len;
		},

		//显示弹出层
		showPopup: function() {

			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			$("#popupBg_" + len).show();
			//$("#popupBg_" + len).css("height", $(document).height());
			$("#popupShow_" + len).show();

		},

		//关闭弹出层
		closePopup: function(cancelCallBack) {
			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			$("#popupBg_" + len).hide();
			$("#popupShow_" + len).hide();
			$("#popupBg_" + len).remove();
			$("#popupShow_" + len).remove();
			Horse.validate.isFunction(cancelCallBack) && 　cancelCallBack();
		},

		//注册基础事件
		registerBasicEvent: function(cancelCallBack) {
			//“X”号图标和取消按钮
			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			$("#cancelImg_" + len + ",#popupBtnCancel_" + len).click(function() {
				popupCommon.closePopup(cancelCallBack);
			});
		},

		getParam: function(param) {
			if (typeof(param) == "undefined") {
				return "";
			} else {
				return param;
			}
		},

		popupLayerPosition: function() {

			var len = $("div[userDefinedAttr='popupLayerBg']").length;

			var objHeight = $("#wrapOut_" + len).height() / 2;
			var objWidth = $("#wrapOut_" + len).width() / 2;

			var topValue = $(window).height() / 2 - objHeight + "px";
			var leftValue = $(window).width() / 2 - objWidth + "px";

			$("#popupShow_" + len).css("left", leftValue);
			$("#popupShow_" + len).css("top", topValue);

		},

		docMousemovePopupLayer: function() {
			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			if (len < 0) {
				return;
			}
			$(document).mousemove(function(e) {
				if (!popupLayParam.bDrag) {
					return false;
				}
				var event = e || window.event;
				var iL = event.clientX - popupLayParam.disX;
				var iT = event.clientY - popupLayParam.disY;

				var maxL = document.documentElement.clientWidth - $("#popupShow_" + len).outerWidth();
				var maxT = document.documentElement.clientHeight - $("#popupShow_" + len).outerHeight();

				//iL = iL < 0 ? 0 : iL;
				//iL = iL > maxL ? maxL : iL;
				//iT = iT < 0 ? 0 : iT;
				//iT = iT > maxT ? maxT : iT;

				$("#popupShow_" + len).css("margin-top", 0);
				$("#popupShow_" + len).css("margin-left", 0);
				$("#popupShow_" + len).css("left", iL);
				$("#popupShow_" + len).css("top", iT);
				return false;
			});
		},

		docMouseupPopupLayer: function() {
			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			if (len < 0) {
				return;
			}
			$(document).mouseup(function() {
				popupLayParam.bDrag = false;
				if ($("#popupTitle_" + len)[0] == null) {
					return;
				}
				$("#popupTitle_" + len)[0].releaseCapture && $("#popupTitle_" + len)[0].releaseCapture();
			});
		},

		titleMousedownPopupLayer: function() {
			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			if (len < 0) {
				return;
			}
			$("#popupTitle_" + len).mousedown(function(e) {
				var event = e || window.event;
				popupLayParam.bDrag = true;
				popupLayParam.disX = event.clientX - $("#popupShow_" + len).offset().left;
				popupLayParam.disY = event.clientY - $("#popupShow_" + len).offset().top;

				this.setCapture && this.setCapture();
				return false;
			});
		},

		winBlurPopupLayer: function() {
			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			if (len < 0) {
				return;
			}
			$(window).blur(function() {
				popupLayParam.bDrag = false;
				if ($("#popupTitle_" + len)[0] == null) {
					return;
				}
				$("#popupTitle_" + len)[0].releaseCapture && $("#popupTitle_" + len)[0].releaseCapture();
			});
		},

		cancelMousedown: function() {
			var len = $("div[userDefinedAttr='popupLayerBg']").length;
			if (len < 0) {
				return;
			}
			$("#cancelImg_" + len).mousedown(function(event) {
				event.stopPropagation();
			});
		}
	};

	return {
		popupEnumType: popupEnumType,
		popupEnumBtn: popupEnumBtn,
		popupCommon: popupCommon
	}
});