define([], function() {
	var zPageView = {
		
		pageid:0,
		
		init: function(params) {			
			this._init();
		},

		_init: function() {
			this.registerEvent();
			this.initView();
			this.show();
		},
		
		/*
		 * TODO 注册事件
		 *  格式如下：
		 * 		"click #id":"functionName"
		 */
		registerEvent:function(){
			var events=this.events;
			var t = this;
			if(!Horse.validate.objIsNull(events)){				
				for (var e in events) {
					var typeTarget = e.split(" ");
					if (typeTarget && typeTarget.length == 2) {
						var type = typeTarget[0];
						var target = typeTarget[1];
						$(target).on(type, $.proxy(t[events[e]], this));
					}
				}
			}
		},

		/*
		 * TODO 页面加载的时候执行（无需考虑登陆态）
		 * 可以做初始化页面（如头部信息等功能）
		 * @method zPageView.onInitView
		 */
		initView: function() {
			if (Horse.validate.isFunction(this.onInitView)) {
				this.onInitView();
			}
		},

		/*
		 * TODO 页面加载的时候执行
		 * @method zPageView.onShow
		 */
		show: function() {
			if (Horse.validate.isFunction(this.onShow)) {
				this.onShow();
			}
		},
		
		extend:function(obj){
			var objEx= Horse.util.extend(this, obj);
			objEx.init();
		},		
		
	};

	return zPageView;
});