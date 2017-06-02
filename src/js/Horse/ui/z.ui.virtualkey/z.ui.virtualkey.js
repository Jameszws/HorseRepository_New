/*
 * TODO 虚拟键
 *auth：张文书
 *date：2016-07-29
 */
define(['text!virtualKeyTempl'], function(virtualKeyTempl) {
	var virtualKeyPlugIn = function() {
		this.defaultParams = {
			containerId: "", //容器ID
			isPopShow: false, //是否弹出
			showWidth: "240px", //虚拟键盘宽度
			virtualkeyClickCallback: null //点击虚拟键回调函数
		};
	};

	virtualKeyPlugIn.prototype = {
		constructor: virtualKeyPlugIn,

		init: function(params) {
			this.options = Horse.util.coverObject(this.defaultParams, params);
			this._init();
		},

		_init: function() {
			this.renderTempl();
		},

		/*
		 * TODO 渲染模板
		 */
		renderTempl: function() {
			var tmpHtml = virtualKeyTempl;
			$("#" + this.options.containerId).html(tmpHtml);
			$("#" + this.options.containerId).show();
			$("#virtualKeyboard").css("width", this.options.showWidth);
			this.registerEvent();
		},

		/*
		 * TODO 注册事件
		 */
		registerEvent: function() {
			var t = this;
			var events = {
				"click #virtualKeyboard>ul>li.vk_item": "click_number"
			};
			for (var e in events) {
				var typeTarget = e.split(" ");
				if (typeTarget && typeTarget.length == 2) {
					var type = typeTarget[0];
					var target = typeTarget[1];
					$(target).on(type, $.proxy(t[events[e]], this));
				}
			}
		},

		click_number: function(currentEl) {
			currentEl.stopPropagation();
			var currentTarget = $(currentEl.currentTarget);
			var attrid = currentTarget.attr("attrId");
			Horse.validate.isFunction(this.options.virtualkeyClickCallback) && this.options.virtualkeyClickCallback(attrid);
		}

	};

	return virtualKeyPlugIn;

});