(function($, window, document, undefined) {
	/**
	 * 初始化growatt脚本组件函数
	 * 
	 * @param {*} options 
	 */
	// $.fn.growatt_init_fn = function(){
	// 	//选项卡操作
	// 	$(".sys_tab_box").growatt_tab_fn();
	// }
	
	
	$.fn.growatt_date_input_fn = function(options){
		
	}
	
	//系统选项卡
	$.fn.growatt_tab_fn = function(options){
		var defaults = {
			// rowCount: '3' // 默认显示行数
		};
		var opts = $.extend({}, defaults, options);
		var obj = $(this);
		obj.find(".sys_tab_box_list>li").off().on("click",function(){
			var index = $(this).index();
			$(this).addClass("curr").siblings("li").removeClass("curr");
			obj.find(".sys_tab_box_content>div").eq(index).addClass("curr").siblings("div").removeClass("curr");
		});
	}
	
	$.fn.growatt_accord_fn = function(options){
		var defaults = {
			// rowCount: '3' // 默认显示行数
		};
		var opts = $.extend({}, defaults, options);
		var obj = $(this);
		obj.find(".sys_accord_list_title").off().on("click",function(){
			var index = $(this).parent().index();
			$(this).parent().addClass("curr").siblings("li").removeClass("curr");
			//obj.find(".sys_tab_box_content>div").eq(index).addClass("curr").siblings("div").removeClass("curr");
		});
	}
	
	/**
	 * 增减量日期(只针对年月日，年月，年时间类型)
	 * @param {*} options
	 * @property {Function} options.prevBtnFn 时间减量事件回调函数
	 * @property {Function} options.nextBtnFn 时间增量事件回调函数
	 * @property {Function} options.done 确定日期事件回调函数
	 * @property {String} options.elem 日期input选择器，最好id
	 * @property {String} options.lang 语言环境
	 * @property {String} options.value 初始化日期选择器的初始值
	 * @property {String} options.type 日期类型（year，month，date，time，datetime）
	 * @property {String} options.theme 主题颜色
	 */
	$.fn.growatt_dateInput_calculate = function(options){
		var defaults = {
			prevBtnFn:function(){},
			nextBtnFn:function(){},
			done:function(a,b){},
			// elem:".dateInputBox>.sys_input",//日期选择器字符串，最好是id
			lang:"cn",
			value:$.getOnTime("y-m-d"),
			type:"date",//
			theme:"#0EC439",
		};
		var opts = $.extend({}, defaults, options);
		var obj = $(this);
		if(laydate && typeof laydate == "object"){
			var selector = ".dateInputBox>.sys_input";
			if(obj.attr("id")){
				selector = "#" + obj.attr("id");
			}
			
			laydate.render({
				elem:selector,
				// elem:opts.elem,
				type:opts.type,//选择器类型（year，month，date，time，datetime）
				range:false,
				value:opts.value,
				min:"1900-01-01",
				max:"2099-12-31",
				trigger:"click",
				zIndex:999999999,
				theme:opts.theme,
				lang:opts.lang,
				calendar:true,
				done:function(a,b){
					//console.log(a,b)
					opts.done(a,b);
				}
			});
			var dateType = "0";
			if(opts.type == "date"){
				dateType = "0";
			}else if(opts.type == "month"){
				dateType = "1";
			}else if(opts.type == "year"){
				dateType = "2";
			}
			obj.prev(".prevLeft").off().on("click",function(){
				var newDate = $.desAnyTime(dateType,obj.val());
				obj.val(newDate);
				opts.prevBtnFn(newDate);
			});
			obj.next(".nextRight").off().on("click",function(){
				var newDate = $.addAnyTime(dateType,obj.val(),true);//true 最大递增不可超过当前日期
				obj.val(newDate);
				opts.nextBtnFn(newDate);
			});
		}
		else{
			alert("请引入laydate日期插件才能使用");
			return;
		}
	}
	
	$.extend({
		//初始化growatt.ui.js组件插件
		growatt_init_fn:function(){
			//选项卡操作
			$(".sys_tab_box").growatt_tab_fn();
			$(".sys_accord_box").growatt_accord_fn();
			
			//点击选择图片
			$(".sys_upload_image_box .sys_upload_imgBox").on("click",function(){
				layer.load(2, {time: 2*1000});
				$(this).prev("[type=file]").click();
			});
		},
		growatt_lang:"en",//语言环境
		// growatt_alert::function(msg,fn){
		// 	var _this = this;
		// 	var o = layer.alert(
		// 			msg,
		// 			{title:_this.lang.hr_hint, btn:[_this.lang.determine]},
		// 			function(){
		// 				layer.close(o);
		// 				fn && fn();
		// 			}
		// 	);
		// },
	});
})(jQuery, window, document);

$(function(){
	$.growatt_init_fn();
})