
/**
 * 依赖插件
 * jquery.js
 * jquery.xhb.plugin.js
 * layer.js
 * laydate.js
 * mui.js
 * Validform.js
 * layui.js
 * =======================================================================================================================================
 * 函数目录
 * 
 * openLayerFn    自定义html内容layer弹窗
 * openLayerFn2   layer的iframe弹出层
 * layerSucc      统一操作成功弹出层
 * sysAlert       layer的alert弹出层
 * diy_layerTipFn  layer的tip气泡弹出层
 * delConfirmFn    删除二次确认弹出层
 * layerClose     关闭所有弹出层
 * backRanDate2   根据laydate范围时间返两个开始结束时间
 * comLaydate     laydate日期选择器
 * mui_datePicker_fn  mui日期选择器
 * cloneObjectFn   对象拷贝
 * layui_table_callBack  layui_table加载数据回调函数使用,(分页工具国际化),tableParentId表格父元素id
 * layuiTableConfing，layuiTableConfing2  layui-table配置
 * ajaxFn         普通ajax请求
 * ajaxFn_file    文件表单上传ajax请求
 * noMoreClick    禁用用户连续点击按钮 obj 按钮jq对象
 * disabledEmoji  移动端禁用输入特殊表情
 * isEmoji        移动端特殊表情正则验证
 * ios_or_android  判断终端是ios还是安卓
 * enterKeyEvent   监听页面enter键操作
 * noCopy          禁止复制粘贴
 * sys_copy_fn     系统复制某一段内容
 * diy_ValidformFn   自定义Validform插件提示语
 * input_ShowTitle_vaild   配合Validform插件，针对带有placeholder的input，添加title，并且添加公共的正则验证字段
 * formClearCom   针对所有input和textarea清除所有表单记忆功能
 * echart_axisLabel_formatter   echart图表x坐标轴刻度名称过长处理
 * echartOption     echart配置
 * echart_resize_fn   根据屏幕窗口变化，echart图表对应变化,myChart图表对象
 * echart_nodata_todo2    eChart图表 判断数组或者对象是否有数据
 * com_conversion     通用单位转换
 * getDayNum          根据字符串年月格式（yyyy-mm），返回该月份的天数
 * getMinuteFn        获取一天的分钟数组（每五分钟）
 * get_5m_1day        获取1天5分钟粒度时间数组
 * getNearYear_5      获取近五年年份数组数据
 * getYestordayTxt    获取指定日期的前一天,一月，一年
 * getFullCanvasDataURL   将多个canvas画布组成的图表合成为一个完整的canvas,并获取完整的dataURl（获取某个id元素下的canvas 的base64）
 * svg_to_base64      将svg转化为base64
 * drawCircle     用canvas画环形图进度条
 * drawCircle_noLoop   用canvas画环形图并标注百分比
 * isNullArr    判断数据数组是否都为空
 * backItem_isShow   返回数组对象中isShow为true的数组item
 * chose_searchList   工商业电站系统，自定义下拉菜单：一级模糊搜索+下拉菜单方法：模糊搜索
 * chose_switchParamShow_checkbox    工商业电站系统，自定义下拉菜单：一级模糊搜索+下拉菜单方法：模糊索索切换参数显示,复选
 * chose_switchParamShow_radio       工商业电站系统，自定义下拉菜单：一级模糊搜索+下拉菜单方法：模糊索索切换参数显示,单选
 * getCheckedItem        工商业电站系统，自定义下拉菜单：获取被勾选的模糊下拉菜单选项值（针对系统多选下拉列表和多级别下拉列表）
 * minNumNotice    勾选最少一个提示
 * isIE   是否IE浏览器
 * getRunTimeType  判断浏览器类型，返回对应字符
 * addFileSelect    为容器添加文件选择事件, 容器通常是一个按钮
 * */

var oComFn = {
	/**
	 * 根据laydate范围时间返两个开始结束时间
	 * @param {String} time 范围时间，可以是空字符串(yyyy-mm-dd;yyyy;yyyy-mm;yyyy-mm-dd hh:mm:ss)
	 * @param {String} sign 分割范围时间的标识分隔符
	 * @param {Number} timeLen 开始时间或者结束时间的总长度
	 * @param {Boolean} b 范围时间为空的情况下，是否返回当前时间的标识
	 * @returns {Array} arr[0]开始时间；arr[1]结束时间   
	 * */
	backRanDate2: function(time, sign, timeLen, b) {
		var startDate, endDate;
		var sSort = time.indexOf(sign);
		if (timeLen === 10) { //年月日						
			if (time == "" && b) { //返回当前时间
				startDate = $.getOnTime('y-m-d');
				endDate = $.getOnTime('y-m-d');
			} else if (time != "") { //返回截取时间
				startDate = time.slice(0, 10);
				endDate = time.slice(sSort + 2);
			}

		} else if (timeLen === 4) { //年
			if (time == "" && b) { //返回当前时间
				startDate = $.getOnTime('y');
				endDate = $.getOnTime('y');
			} else if (time != "") { //返回截取时间
				startDate = time.slice(0, 4);
				endDate = time.slice(sSort + 2);
			}
		} else if (timeLen === 7) { //年月
			if (time == "" && b) { //返回当前时间
				startDate = $.getOnTime('y-m');
				endDate = $.getOnTime('y-m');
			} else if (time != "") { //返回截取时间
				startDate = time.slice(0, 7);
				endDate = time.slice(sSort + 2);
			}
		} else if (timeLen === 8) { //时分秒
			if (time == "" && b) { //返回当前时间
				startDate = $.getOnTime('h-m-s');
				endDate = $.getOnTime('h-m-s');
			} else if (time != "") { //返回截取时间
				startDate = time.slice(0, 8);
				endDate = time.slice(sSort + 2);
			}
		} else if (timeLen === 19) { //年月日时分秒
			if (time == "" && b) { //返回当前时间
				startDate = $.getOnTime('');
				endDate = $.getOnTime('');
			} else if (time != "") { //返回截取时间
				startDate = time.slice(0, 19);
				endDate = time.slice(sSort + 2);
			}
		}
		if (!b && time == "") {
			startDate = "";
			endDate = "";
		}
		return [startDate, endDate];
	},
	/**
	 * 自定义html内容layer弹窗
	 * @param {Object} obj 容器对象
	 * @param {String} sTitle 标题
	 * @param {Array} aBtn 按钮数组 
	 * @param {Function} btn1Fn 按钮1点击回调函数
	 * @param {Function} btn2Fn 按钮2点击回调函数
	 * @param {Function} succFn 弹窗打开成功回调函数
	 * @param {Array} aArea 弹窗宽高，不传就自适应
	 * */
	openLayerFn: function(obj, sTitle, aBtn, btn1Fn, btn2Fn, succFn, aArea) {
		layer.open({
			type: 1, //Page层类型
			//area: ['34%', 'auto'], //高宽
			area: aArea || ['auto', 'auto'], //高宽
			title: sTitle,
			shade: 0.6, //遮罩透明度
			maxmin: true, //允许全屏最小化
			anim: 5, //0-6的动画形式，-1不开启
			// offset:['center', 'center'], 
			content: obj,
			btn: aBtn,
			//btn: ['取消', '保存'],
			btn1: function(index, layero) {
				// console.log('取消');
				layer.closeAll();
				btn1Fn(index, layero);
			},
			btn2: function(index, layero) {
				// layer.closeAll();
				console.log('保存');
				btn2Fn(index, layero);
				return false;
			},
			success: function(index, layero) {
				succFn(index, layero);
				console.log('succ')
			}
		});
	},
	/**
	 * layer的iframe弹出层
	 * @param {String} url 页面地址
	 * @param {String} sTitle 标题
	 * @param {Array} aBtn 按钮数组 
	 * @param {Function} btn1Fn 按钮1点击回调函数
	 * @param {Function} btn2Fn 按钮2点击回调函数
	 * @param {Function} succFn 弹窗打开成功回调函数
	 * @param {Array} aArea 弹窗宽高，不传就自适应
	 * */
	openLayerFn2: function(url, sTitle, aBtn, btn1Fn, btn2Fn, succFn, aArea, endFn) {
		layer.open({
			type: 2, //Page层类型
			//area: ['34%', 'auto'], //高宽
			area: aArea, //高宽
			title: sTitle,
			shade: 0.6, //遮罩透明度
			maxmin: true, //允许全屏最小化
			anim: 5, //0-6的动画形式，-1不开启
			// offset:['center', 'center'], 
			content: url,
			btn: aBtn,
			//btn: ['取消', '保存'],
			btn1: function(index, layero) {
				// console.log('取消');
				// layer.closeAll();
				btn1Fn(index, layero);
			},
			btn2: function(index, layero) {
				// layer.closeAll();
				console.log('保存');
				btn2Fn(index, layero);
				return false;
			},
			success: function(index, layero) {
				succFn(index, layero);
				console.log('succ')
			},
			end: function(a, b) {
				endFn(a, b);
			}
		});
	},
	/**
	 * laydate日期选择器
	 * @param {String} selector 选择器id值
	 * @param {String} sType 选择器类型值 
	 * @param {Function} fn 返回函数 
	 * @param {String} isR 范围时间选择器分隔符 
	 * */
	comLaydate: function(selector, sType, fn, isR) {
		if (sType == "date") {
			var v = $.getOnTime('y-m-d');
		} else if (sType == "month") {
			var v = $.getOnTime('y-m');
		} else if (sType == "year") {
			var v = $.getOnTime('y');
		} else if (sType == "datetime") {
			var v = $.getOnTime('y-m-d') + " " + $.getOnTime('h-m-s');
		} else {
			var v = $.getOnTime('h-m-s');
		}
		if (isR) {
			laydate.render({
				elem: selector,
				type: sType,
				lang: "en", //默认为中文，en是英文
				max: 0, //设置一个默认最大值 ,0表示当天，-1表示最大昨天，以此类催
				trigger: 'click',
				theme: "#00c2ff",
				range: isR,
				done: function(value) {
					fn && fn(value);
				}
			});
		} else {
			laydate.render({
				elem: selector,
				type: sType,
				lang: "en", //默认为中文，en是英文
				max: 0, //设置一个默认最大值 ,0表示当天，-1表示最大昨天，以此类催
				trigger: 'click',
				theme: "#00c2ff",
				value: v,
				done: function(value) {
					fn && fn(value);
				}
			});
		}
	},
	/**
	 * mui日期选择器
	 * @param {String} id 日期选择器id 
	 * @param {Object} options 日期选择器配置，定义日期选择器类型和相关参数
	 * */
	mui_datePicker_fn: function(id, options) {
		document.getElementById(id).addEventListener("tap", function() {
			var _self = this;
			if (_self.picker) {
				_self.picker.show(function(rs) {
					// console.log('选择结果: ' + rs.text);
					_self.picker.dispose();
					_self.picker = null;
					_self.value = rs.text;
				});
			} else {

				_self.picker = new mui.DtPicker(options);
				_self.picker.show(function(rs) {
					// console.log('选择结果: ' + rs.text);
					_self.picker.dispose();
					_self.picker = null;
					_self.value = rs.text;
				});
			}
		}, false);
	},
	//对象拷贝
	cloneObjectFn: function(obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	//layui_table加载数据回调函数使用,(分页工具国际化),tableParentId表格父元素id
	layui_table_callBack: function(tableParentId) {
		var _this = this;
		//针对所有layui列单元新增title(子内容为纯文本的)
		_this.layuiTdAddTitle();

		if (tableParentId) {
			var divBox = document.getElementById(tableParentId);
			if (divBox.getElementsByClassName("layui-laypage-skip")[0]) {
				if (divBox.getElementsByClassName("layui-laypage-skip")[0].childNodes) {
					if (isIE()) {
						divBox.getElementsByClassName("layui-laypage-skip")[0].childNodes[0].removeNode(true);
						divBox.getElementsByClassName("layui-laypage-skip")[0].childNodes[1].removeNode(true);
					} else {
						divBox.getElementsByClassName("layui-laypage-skip")[0].childNodes[0].remove();
						divBox.getElementsByClassName("layui-laypage-skip")[0].childNodes[1].remove();
					}

				}
			}
			if (localStorage.getItem("setLang")) {
				if (localStorage.getItem("setLang") == "cn") {
					$("#" + tableParentId + " .layui-laypage-skip input").before($('<span> 到第  </span>'));
					$("#" + tableParentId + " .layui-laypage-skip input").after($('<span> 页  </span>'));
					$("#" + tableParentId + " .layui-laypage-skip button").text("确定");
				} else {
					$("#" + tableParentId + " .layui-laypage-skip input").before($('<span> To  </span>'));
					$("#" + tableParentId + " .layui-laypage-skip input").after($('<span> Page  </span>'));
					$("#" + tableParentId + " .layui-laypage-skip button").text("Sure");
				}

			} else { //默认中文
				$("#" + tableParentId + " .layui-laypage-skip input").before($('<span> 到第  </span>'));
				$("#" + tableParentId + " .layui-laypage-skip input").after($('<span> 页  </span>'));
				$("#" + tableParentId + " .layui-laypage-skip button").text("确定");
			}
			$("#" + tableParentId + " .layui-laypage-limits select").addClass("sys_select");
		} else {
			if (document.getElementsByClassName("layui-laypage-skip")[0]) {
				if (document.getElementsByClassName("layui-laypage-skip")[0].childNodes) {
					if (isIE()) {
						document.getElementsByClassName("layui-laypage-skip")[0].childNodes[0].removeNode(true);
						document.getElementsByClassName("layui-laypage-skip")[0].childNodes[1].removeNode(true);
					} else {
						document.getElementsByClassName("layui-laypage-skip")[0].childNodes[0].remove();
						document.getElementsByClassName("layui-laypage-skip")[0].childNodes[1].remove();
					}

				}
			}
			if (localStorage.getItem("setLang")) {
				if (localStorage.getItem("setLang") == "cn") {
					$(".layui-laypage-skip input").before($('<span> 到第  </span>'));
					$(".layui-laypage-skip input").after($('<span> 页  </span>'));
					$(".layui-laypage-skip button").text("确定");
				} else {
					$(".layui-laypage-skip input").before($('<span> To  </span>'));
					$(".layui-laypage-skip input").after($('<span> Page  </span>'));
					$(".layui-laypage-skip button").text("Sure");
				}

			} else { //默认中文
				$(".layui-laypage-skip input").before($('<span> 到第  </span>'));
				$(".layui-laypage-skip input").after($('<span> 页  </span>'));
				$(".layui-laypage-skip button").text("确定");
			}
			$(".layui-laypage-limits select").addClass("sys_select");
		}

	},
	//针对所有layui列单元新增title(子内容为纯文本的)
	layuiTdAddTitle: function() {
		$(".layui-table-cell").each(function() {
			if ($(this).find("div").length || $(this).find("p").length || $(this).find("ul").length ||
				$(this).find("a").length || $(this).find("b").length || $(this).find("span").length ||
				$(this).find("em").length || $(this).find("input").length || $(this).find("select").length ||
				$(this).find("button").length || $(this).find("dl").length || $(this).find("i").length) {

			} else {
				$(this).attr("title", $(this).text());
			}
		});
	},
	//layui table配置
	layuiTableConfing: {
		elem: '#lay_table',
		height: 350,
		//		    url: '', //数据接口
		page: true, //开启分页
		method: "post",
		//		    where:{},//接口的其它参数
		//		    contentType: 'application/json',
		//		    headers: {token: 'sasasas'},
		parseData: function(data, a, b) { //请求到的数据清洗转化为插件认可的
			//		    	console.log(data,a,b,1111);
			var response = (typeof data == "object" ? data : JSON.parse(data));
			var base_no = response.obj.currPage * response.obj.pageSize - response.obj.pageSize; //页码序号基数
			for (var i = 0; i < response.obj.datas.length; i++) {
				response.obj.datas[i].NO = (i + 1 + base_no);
			}

			var obj = {
				code: 0,
				msg: "",
				count: response.obj.count,
				data: response.obj.datas
			};
			console.log(obj, "obj");
			return obj;
		},
		request: { //用于对分页请求的参数：page、limit重新设定名称，如：
			pageName: 'currPage', //页码的参数名称，默认：page
			limitName: 'pageSize' //每页数据量的参数名，默认：limit
		},
		limit: 10, //默认一页6条
		limits: [10, 20],
		done: function(res, curr, count) { //

		},

		text: {
			none: "暂无数据", //默认：无数据。注：该属性为 layui 2.2.5 开始新增
			// none:nodataHtml()
		},
		cols: [],
	},
	layuiTableConfing2: {
		elem: '#lay_table',
		data: [],
		page: false,
		cols: [],
		done: function(res, curr, count) { //数据渲染完的回调
			//针对所有layui列单元新增title(子内容为纯文本的)
			// oComFn.layuiTdAddTitle();
		},
		text: {
			none: "暂无数据", //默认：无数据。注：该属性为 layui 2.2.5 开始新增
		},
	},
	//统一操作成功弹出层
	layerSucc: function(fn) {
		layer.msg("操作成功", {
			time: 1500
		}, function() { //"操作成功"
			fn && fn();
		});
	},
	/**
	 * 动态添加加载进度条组件
	 * 依赖：mui.css,common.css,jquery.js
	 * @param {Strin} loadingTxt 进度条加载提示
	 */
	addDiyProgress(loadingTxt){
		if($('.mui-backdrop-diy').length){
			$('.mui-backdrop-diy').removeClass("hide");
		}else{
			var load_txt = loadingTxt || 'Loading';
			var html = `<div class="mui-backdrop mui-backdrop-diy flex_center_middle">
					<div class="mui-progressbar-box text-c w_90">
						<p style="color: #fff;" class="com_loading">`+ load_txt +`</p>
						<p class="mui-progressbar mui-progressbar-infinite"></p>
					</div>				
				</div>`;
			$("body").append($(html));
		}
		
	},
	//关闭自定义进度加载条
	delDiyProgress(){
		$('.mui-backdrop-diy').addClass("hide");
	}
	/**
	 * 普通ajax请求
	 * @param {String} murl 请求地址
	 * @param {Object} mdata 请求数据
	 * @param {String} method 请求类型
	 * @param {Function} successFn 请求成功的回调函数
	 * @param {Boolean} noLoading 是否不加载条
	 * */
	layerLoad: null,
	ajaxFn: function(murl, mdata, method, successFn, noLoading) {
		var _this = this;
		$.ajax({
			type: method,
			url: murl,
			dataType: "json", //后台数据返回格式
			// contentType:"application/json",//发送到后台的数据格式
			data: mdata || {},
			// data:JSON.stringify(mdata) || {},
			async: true,
			timeout: 1000 * 60,
			beforeSend: function() {
				if(noLoading === undefined){
					if(mui){
						_this.addDiyProgress();
					}else{
						_this.layerLoad = layer.load(1);
					}
					
				}
				
			},
			error: function(data) {				
				console.log(data);
				if(noLoading === undefined){
					if(mui){
						_this.delDiyProgress();
					}else{
						layer.close(_this.layerLoad);
					}
					
				}
			},
			success: function(data) {
				var data = (typeof data == "object" ? data : JSON.parse(data));
				
				if(noLoading === undefined){
					if(mui){
						_this.delDiyProgress();
					}else{
						layer.close(_this.layerLoad);
					}
					
				}
				
				successFn(data);
	
			},
	
		});
	},
	/**
	 * 文件表单上传的  ajax请求
	 * @param {String} murl 请求地址
	 * @param {Object} mdata 请求数据
	 * @param {String} method 请求类型
	 * @param {Function} successFn 请求成功的回调函数
	 * @param {Boolean} noLoading 是否不加载条
	 * */
	ajaxFn_file: function(murl, mdata, method, successFn,noLoading) {
		var _this = this;
		$.ajax({
			type: method,
			url: murl,
			//				dataType: "json",
			data: mdata || {},
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			timeout: 1000 * 60,
			beforeSend: function() {
				if(noLoading === undefined){
					if(mui){
						_this.addDiyProgress();
					}else{
						_this.layerLoad = layer.load(1);
					}
					
				}
				
			},
			error: function(data) {				
				console.log(data);
				if(noLoading === undefined){
					if(mui){
						_this.delDiyProgress();
					}else{
						layer.close(_this.layerLoad);
					}
					
				}
			},
			success: function(data) {
				var data = (typeof data == "object" ? data : JSON.parse(data));
				
				if(noLoading === undefined){
					if(mui){
						_this.delDiyProgress();
					}else{
						layer.close(_this.layerLoad);
					}
					
				}
				
				successFn(data);
				
			},
		});
	},
	//layer的alert弹出层
	sysAlert: function(msg, fn) {
		var o = layer.alert(
			msg, {
				title: "提示",
				btn: ["确定"]
			},
			function() {
				layer.close(o);
				fn && fn();
			}
		);
	},
	
	//自定义tip气泡谈层
	diy_layerTipFn: function(obj, msg, color, nFangxiang) {
		if (nFangxiang == undefined) { //默认下方向
			var n = 3;
		} else {
			var n = nFangxiang;
		}
		var tip = null;
		obj.off('mouseenter');
		obj.off('mouseleave');
		obj.on('mouseenter', function() {
			tip = layer.tips(
				msg,
				obj, {
					tips: [n, color],
					time: 0
				});
		});

		obj.on('mouseleave', function() {
			layer.close(tip);
		});
	},
	//删除二次确认弹出层
	delConfirmFn: function(fn1, fn2) {
		var index = layer.confirm(
			"确认删除吗？", {
				title: "提示",
				btn: ["确定", "取消"]
			},
			function(a, b) {
				fn1(a, b);
			},
			function(a, b) {
				fn2(a, b);
			}
		);
		return index;
	},
	//关闭所有layer碳层
	layerClose: function(fn) {
		layer.closeAll();
		fn && fn();
	},
	//禁用用户连续点击按钮 obj 按钮jq对象
	noMoreClick: function(obj) {
		var nowTime = new Date().getTime();
		var clickTime = obj.attr("ctime");
		if (clickTime != 'undefined' && (nowTime - clickTime < 5000)) {
			$.isMoblie(
				function() {
					mui.alert('操作过于频繁，稍后再试');
				},
				function() {
					layer.alert('操作过于频繁，稍后再试');
				}
			);

			return false;
		} else {
			return true;
		}
	},
	/**
	 * 移动端禁用输入特殊表情
	 * @param {String} selector 节点选择器
	 * */
	disabledEmoji: function(selector) {
		var _this = this;
		if (_this.ios_or_android() == 'ios') {
			//			 alert(11120);
			$(selector).on("keyup", function() {
				var param = $(this).val();
				var regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g;
				$(this).val(param.replace(regRule, ""));
				//	                layer.alert($(this).val());
			})
		} else {
			$(selector).on("input", function() {
				var param = $(this).val();
				var regRule = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g;
				$(this).val(param.replace(regRule, ""));
			})
		}
	},
	//移动端特殊表情正则验证
	isEmoji: function(val) {
		var iconRule2 =
			/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
		var b = iconRule2.test(val);
		return b; //true,有表情
	},
	//判断终端是ios还是安卓
	ios_or_android: function() {
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

		if (isAndroid) {
			return 'and';
		} else {
			return 'ios';
		}
	},
	//监听页面enter键操作
	enterKeyEvent: function(fn) {
		$("body").on("keydown", function(event) {
			if (event.keyCode == 13) {
				fn && fn();
			}
		});
	},
	//禁止复制粘贴
	noCopy: function() {
		document.oncontextmenu = new Function("event.returnValue=false");
		document.onselectstart = new Function("event.returnValue=false");
	},
	/**
	 * 系统复制某一段内容
	 * @param {String} str 某一段要被复制的内容
	 * @param {Function} fn 回调函数，携带参数为被复制的值
	 * */
	sys_copy_fn: function(str, fn) {
		var oInput = document.createElement('input');
		oInput.value = str;
		document.body.appendChild(oInput);
		oInput.select(); // 选择对象			
		document.execCommand("Copy"); // 执行浏览器复制命令
		oInput.remove();
		layer.msg("复制成功");
		fn && fn(str);
	},
	/**
	 * 自定义Validform插件提示语
	 * @param {String} selector form表单选择器（id或者class）
	 * @param {Function} callback 回调函数 参数1为序列化之后的表单数据（json），参数2为表单valid对象 
	 * 配合样式* 
		.Validform_checktip.Validform_wrong{
			color: red;
			background: url(../img/error.png) no-repeat center left;
			background-size:16px 16px;
			padding-left: 18px;
			position: absolute;
			left: 0;
		}
		.v_form_1 .Validform_checktip.Validform_wrong{
			left:auto;
			right: 0;
			top: 35px;
		}
		.Validform_checktip.Validform_right{display: none;}
	 * */
	diy_ValidformFn: function(selector, callback) {
		$(function() {
			$(selector).Validform({
				tiptype: function(msg, o, cssctl) {
					//msg：提示信息;
					//o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
					//cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
					if (!o.obj.is("form")) { //验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
						$(selector).find(".Validform_checktip").remove();
						o.obj.after($("<div class='Validform_checktip'></div>"));
						var objtip = o.obj.siblings(".Validform_checktip");
						cssctl(objtip, o.type);
						objtip.text(msg);
					}
				},
				tipSweep: true,
				ajaxPost: true,
				beforeSubmit: function(curform) {
					//请求后台
					var sFormdata = $(selector).serialize().replace(/\+/g, " ");
					console.log(sFormdata, "初次序列化");
					var oParam = $.serializeToObj(sFormdata);
					callback(oParam, curform);

					//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
					//这里明确return false的话表单将不会提交;	
					return false;
				},
			});
		});
	},
	//配合Validform插件，针对带有placeholder的input，添加title，并且添加公共的正则验证字段
	input_ShowTitle_vaild: function() {
		$("input").each(function() {
			if ($(this).attr("placeholder")) {
				$(this).attr("title", $(this).attr("placeholder"));
			}
			if ($(this).attr("nullmsg")) { //设置公共正则：不能为空
				$(this).attr("nullmsg", "不能为空");
			}

			if ($(this).attr("datatype") && $(this).attr("datatype") == "n") { //设置公共正则：请输入正整数
				$(this).attr("errormsg", "请输入正整数");
			}

			if ($(this).attr("datatype") && $(this).attr("datatype") == "*2-18" && $(this).attr("recheck") == undefined) { //设置公共正则：请输入2-18个字符
				$(this).attr("errormsg", "请输入2-18个字符");
			}
			if ($(this).attr("datatype") && $(this).attr("datatype") == "*2-30") { //设置公共正则：请输入2-30个字符
				$(this).attr("errormsg", "请输入2-30个字符");
			}
			if ($(this).attr("datatype") && $(this).attr("datatype") == "*2-100") { //设置公共正则：请输入2-100个字符
				$(this).attr("errormsg", "请输入2-100个字符");
			}
			if ($(this).attr("datatype") && $(this).attr("datatype") == "e") { //设置公共正则：请输入正确的邮箱格式字符
				$(this).attr("errormsg", "请输入正确的邮箱格式字符");
			}
			if ($(this).attr("datatype") && $(this).attr("datatype") == "url") { //设置公共正则：请输入正确的域名
				$(this).attr("errormsg", "请输入正确的域名");
			}
		});
	},
	//针对所有input和textarea清除所有表单记忆功能
	formClearCom: function() {
		$("input,textarea").attr("autocomplete", "off");
	},
	/**
	 * echart图表x坐标轴刻度名称过长处理
	 * @param {Number} num 坐标轴名称每行显示个数
	 * @param {String} params 坐标轴名称字段
	 * */
	echart_axisLabel_formatter: function(num, params) {
		var newParamsName = ""; // 最终拼接成的字符串
		var paramsNameNumber = params.length; // 实际标签的个数
		var provideNumber = num; // 每行能显示的字的个数
		var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
		/**
		 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
		 */
		// 条件等同于rowNumber>1
		if (paramsNameNumber > provideNumber) {
			/** 循环每一行,p表示行 */
			for (var p = 0; p < rowNumber; p++) {
				var tempStr = ""; // 表示每一次截取的字符串
				var start = p * provideNumber; // 开始截取的位置
				var end = start + provideNumber; // 结束截取的位置
				// 此处特殊处理最后一行的索引值
				if (p == rowNumber - 1) {
					// 最后一次不换行
					tempStr = params.substring(start, paramsNameNumber);
				} else {
					// 每一次拼接字符串并换行
					tempStr = params.substring(start, end) + "\n";
				}
				newParamsName += tempStr; // 最终拼成的字符串
			}

		} else {
			// 将旧标签的值赋给新标签
			newParamsName = params;
		}
		//将最终的字符串返回
		return newParamsName;
	},
	//echart配置
	echartOption: {
		backgroundColor: "#000",
		color: comChartColorList,
		xAxis: {
			type: 'category',
			// data: [],
			axisLabel: {
				textStyle: {
					color: '#B3CAFA'
				},
				formatter: function(params) {
					return params.split(' ')[0]
				}
			}
		},
		yAxis: [{
				type: 'value',
				name: '',
				interval: 50,
				axisLabel: {
					formatter: '{value}h',
					textStyle: {
						color: '#B3CAFA'
					}
				},
				min: 0,
				max: 24,
				splitLine: { //网格线
					lineStyle: {
						type: 'dashed', //设置网格线类型 dotted：虚线   solid:实线
						color: '#383f4d'
					},
					show: true //隐藏或显示
				},
			},
			{
				type: 'value',
				name: '',
				axisLabel: {
					formatter: '{value}%',
					textStyle: {
						color: '#B3CAFA'
					}
				},
				min: 0,
				max: 100
			}
		],
		tooltip: {
			backgroundColor: "rgba(255, 255, 255, 0.7)",
			padding: 10,
			textStyle: {
				color: "#000"
			},
			borderColor: "#000",
			trigger: 'axis',
			formatter: function(p, p2) {
				var xAxisName = "";
				var tem = "";
				for (var i = 0; i < p.length; i++) {
					xAxisName = '<div>' + p[i].axisValue + '</div>';
					tem += '<div><span class="mr_5" style="color:' + p[i].color + '">\u25CF</span><span>' + p[i].seriesName +
						': </span><b>' + (p[i].value).toFixed(2) + '</b></div>'
				}
				return xAxisName + tem;
			}
			//			trigger:'item',
			//			formatter: '时间: {b0}<br />' + 
			//						'<span style="color:#5FFB95">\u25CF</span>{a0}: <b>{c0}W</b><br />' + 
			//						'<span style="color:#EBD96F">\u25CF</span>{a1}: <b>{c1}W</b>',
		},
		legend: {
			show: true,
			textStyle: {
				color: '#B3CAFA'
			},
			left: 'center',
			top: '2%',
			align: 'left',
			orient: 'horizontal',
			inactiveColor: "#44464f",
		},
		series: [],
	},
	//根据屏幕窗口变化，echart图表对应变化,myChart图表对象
	echart_resize_fn: function(myChart) {
		window.onresize = myChart.resize;
	},
	/**
	 * 通用单位转换
	 * W,kW,MW,GW
	 * Wh,kWh,MWh,GWh
	 * g,kg,t,kt
	 * J,kJ,MJ,GJ
	 * J/m²,kJ/m²,MJ/m²,GJ/m²
	 * var,Kvar,Mvar,Gvar(无功发电量单位)
	 * */
	com_conversion: function(numb, sUnit) {
		var aUnit = [
			["W", "kW", "MW", "GW"],
			["Wh", "kWh", "MWh", "GWh"],
			["g", "kg", "t", "kt"],
			["J", "kJ", "MJ", "GJ"],
			["J/m²", "kJ/m²", "MJ/m²", "GJ/m²"],
			["var", "Kvar", "Mvar", "Gvar"],
		];
		var sort_1, sort_2;
		for (var i = 0; i < aUnit.length; i++) {
			for (var j = 0; j < aUnit[i].length; j++) {
				if (sUnit == aUnit[i][j]) {
					sort_1 = i;
					sort_2 = j;
				}
			}
		}

		return a(sort_2, sort_1);

		function a(sort_2, sort_1) {
			var onnumber = {};
			if (typeof numb == "string") {
				numb = numb * 1;
			}

			if (sort_2 == 0) {
				if (numb >= 1000) {
					if ((numb / 1000) >= 1000) {
						if (numb / 1000 / 1000 >= 1000) {
							onnumber.val = ((numb / 1000) / 1000 / 1000).toFixed(1);
							onnumber.unit = aUnit[sort_1][sort_2 + 3];
						} else {
							onnumber.val = (numb / 1000 / 1000).toFixed(1);
							onnumber.unit = aUnit[sort_1][sort_2 + 2];
						}
					} else {
						onnumber.val = (numb / 1000).toFixed(1);
						onnumber.unit = aUnit[sort_1][sort_2 + 1];
					}
				} else {
					onnumber.val = numb.toFixed(1);
					onnumber.unit = aUnit[sort_1][sort_2];
				}
				return onnumber;
			} else if (sort_2 == 1) {
				if (numb >= 1000) {
					if ((numb / 1000) >= 1000) {
						onnumber.val = (numb / 1000 / 1000).toFixed(1);
						onnumber.unit = aUnit[sort_1][sort_2 + 2];
					} else {
						onnumber.val = (numb / 1000).toFixed(1);
						onnumber.unit = aUnit[sort_1][sort_2 + 1];
					}
				} else {
					onnumber.val = numb.toFixed(1);
					onnumber.unit = aUnit[sort_1][sort_2];
				}
				return onnumber;
			} else if (sort_2 == 2) {
				if (numb >= 1000) {
					onnumber.val = (numb / 1000).toFixed(1);
					onnumber.unit = aUnit[sort_1][sort_2 + 1];
				} else {
					onnumber.val = numb.toFixed(1);
					onnumber.unit = aUnit[sort_1][sort_2];
				}
				return onnumber;
			} else {
				onnumber.val = numb.toFixed(1);
				onnumber.unit = aUnit[sort_1][sort_2];
				return onnumber;
			}
		}
	},
	/**
	 * 根据字符串年月格式（yyyy-mm），返回该月份的天数
	 * @param {String} ss 年月
	 * @param {Boolean} b 是否要返回数组标识
	 * @return {Array || Number}
	 * */
	getDayNum: function(ss, b) {
		var t = ss.indexOf("-");
		var year = ss.slice(0, t) * 1;
		var month = ss.slice(t + 1) * 1;
		var nday = $.getDaysInMonth(year, month);
		if (b) {
			var arr = [];
			for (var i = 0; i < nday; i++) {
				arr.push(i + 1);
			}
			return arr;
		} else {
			return nday;
		}

	},
	//获取一天的分钟数组（每五分钟）
	getMinuteFn: function() {
		var arr = $.getDateArr(
			"2019-8-12 00:00:00",
			"2019-8-12 23:59:59",
			5
		);
		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr[i].slice(11, 16);
		}
		return arr;
	},
	//获取1天5分钟粒度时间数组
	get_5m_1day: function() {
		var aList = this.getMinuteFn(5);
		aList.unshift("00:00");
		return aList;
	},
	/**
	 * 获取近五年年份数组数据
	 * @param {Number} nYear 
	 * @return {Array}
	 * */
	getNearYear_5: function(nYear) {
		var year_5 = [];
		for (var i = 0; i < 5; i++) {
			year_5.push(nYear * 1 - i);
		}
		return year_5.reverse();
	},
	/**
	 * 获取指定日期的前一天,一月，一年
	 * @param {String} str "yyyy-mm-dd","yyyy-mm","yyyy"这种格式
	 * @param {String} n "0","1","2",对应三种类型时间
	 * */
	getYestordayTxt: function(str, n) {
		return $.desAnyTime(n, str);
	},
	/**
	 * 将多个canvas画布组成的图表合成为一个完整的canvas,并获取完整的dataURl（获取某个id元素下的canvas 的base64）
	 * @param divId divId 包含整个画布的divId
	 * @returns {String} widthXheight@dataURL 例： 
	 * */
	getFullCanvasDataURL: function(divId) {
		//将第一个画布作为基准。
		var baseCanvas = $("#" + divId).find("canvas").first()[0];
		if (!baseCanvas) {
			return false;
		};
		var width = baseCanvas.width;
		var height = baseCanvas.height;
		var ctx = baseCanvas.getContext("2d");
		//遍历，将后续的画布添加到在第一个上
		$("#" + divId).find("canvas").each(function(i, canvasObj) {
			if (i > 0) {
				var canvasTmp = $(canvasObj)[0];
				ctx.drawImage(canvasTmp, 0, 0, width, height);
			}
		});
		//获取base64位的url
		return baseCanvas.toDataURL();
	},
	/**
	 * 将svg转化为base64
	 * selector 选择器 js
	 * */
	svg_to_base64: function(selector) {
		var mySvg = document.querySelector(selector);
		svgCon = mySvg.outerHTML;

		//svg转base64;
		href = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgCon)));
		return href;
	},
	/**
	 * 用canvas画环形图进度条
	 * @param {Object} _options 
	 * @param {Number} _options.angle 圆环百分比值，如百分之五十，则是0.5（保留一位小数） 
	 * @param {Number} _options.lineWidth 圆环边缘宽度，单位像素
	 * @param {String} _options.id 实现圆环的canvas的id的值
	 * @param {String} _options.color 圆环边缘颜色
	 * */
	drawCircle: function(_options) {
		var options = _options || {};
		//获取或定义options对象;   
		options.angle = options.angle || 1;
		//定义默认角度1为360度(角度范围 0-1);  

		options.color = options.color || '#fff';
		//定义默认颜色（包括字体和边框颜色）;   
		options.lineWidth = options.lineWidth || 10;
		//定义默认圆描边的宽度;   
		options.lineCap = options.lineCap || 'square';
		//定义描边的样式，默认为直角边，round 为圆角   
		var oBoxOne = document.getElementById(options.id);
		var sCenter = oBoxOne.width / 2;
		//获取canvas元素的中心点;    
		var ctx = oBoxOne.getContext('2d');
		var nBegin = Math.PI / 2;
		//定义起始角度;    
		var nEnd = Math.PI * 2;
		//定义结束角度;   
		var grd = ctx.createLinearGradient(0, 0, oBoxOne.width, 0); //grd定义为描边渐变样式;   
		grd.addColorStop(0, 'red');
		grd.addColorStop(0.5, 'yellow');
		grd.addColorStop(1, 'green');
		ctx.textAlign = 'center';
		//定义字体居中;    
		ctx.font = 'normal normal bold 20px Arial';
		//定义字体加粗大小字体样式;    
		ctx.fillStyle = options.color == 'grd' ? grd : options.color;
		//判断文字填充样式为颜色，还是渐变色;  

		ctx.fillText((options.angle * 100) + '%', sCenter, sCenter);

		//设置填充文字;   
		ctx.strokeStyle = grd;
		//设置描边样式为渐变色;   
		ctx.strokeText((options.angle * 100) + '%', sCenter, sCenter); //设置描边文字(即镂空文字);


		ctx.lineCap = options.lineCap;
		ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
		ctx.lineWidth = options.lineWidth;
		ctx.beginPath();
		//设置起始路径，这段绘制360度背景;   
		ctx.strokeStyle = '#D8D8D8';
		ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
		ctx.stroke();
		var imd = ctx.getImageData(0, 0, 240, 240);
		var t = 0;
		var timer = null;

		function draw(current) {
			//该函数实现角度绘制;     
			if (current == 1) {
				t = 0;
			}
			ctx.putImageData(imd, 0, 0);
			ctx.beginPath();
			ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
			ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, (nEnd * current) - nBegin, false);
			ctx.stroke();
		}


		function loadCanvas(angle) { //该函数循环绘制指定角度，实现加载动画;      

			timer = setInterval(function() {
				if (t > angle) {
					draw(options.angle);
					// clearInterval(timer);  
				} else {
					draw(t);
					t += 0.02;
				}
			}, 20);
		}
		loadCanvas(options.angle);
		//载入百度比角度  0-1 范围;   
	},
	/**
	 * 用canvas画环形图并标注百分比
	 * @param {Object} _options 
	 * @param {Number} _options.angle 圆环百分比值，如百分之五十，则是0.5（保留一位小数） 
	 * @param {Number} _options.lineWidth 圆环边缘宽度，单位像素
	 * @param {String} _options.id 实现圆环的canvas的id的值
	 * @param {String} _options.color 圆环边缘颜色
	 * */
	drawCircle_noLoop: function(_options) {
		var options = _options || {};
		//获取或定义options对象;   
		options.angle = options.angle || 1;
		//定义默认角度1为360度(角度范围 0-1);  

		options.color = options.color || '#fff';
		//定义默认颜色（包括字体和边框颜色）;   
		options.lineWidth = options.lineWidth || 10;
		//定义默认圆描边的宽度;   
		options.lineCap = options.lineCap || 'square';
		//定义描边的样式，默认为直角边，round 为圆角   
		var oBoxOne = document.getElementById(options.id);
		var sCenter = oBoxOne.width / 2;
		//获取canvas元素的中心点;    
		var ctx = oBoxOne.getContext('2d');
		var nBegin = Math.PI / 2;
		//定义起始角度;    
		var nEnd = Math.PI * 2;
		//定义结束角度;   
		var grd = ctx.createLinearGradient(0, 0, oBoxOne.width, 0); //grd定义为描边渐变样式;   
		grd.addColorStop(0, 'red');
		grd.addColorStop(0.5, 'yellow');
		grd.addColorStop(1, 'green');
		ctx.textAlign = 'center';
		//定义字体居中;    
		ctx.font = 'normal normal bold 20px Arial';
		//定义字体加粗大小字体样式;    
		ctx.fillStyle = options.color == 'grd' ? grd : options.color;
		//判断文字填充样式为颜色，还是渐变色;  

		ctx.fillText((options.angle * 100) + '%', sCenter, sCenter);

		//设置填充文字;   
		ctx.strokeStyle = grd;
		//设置描边样式为渐变色;   
		ctx.strokeText((options.angle * 100) + '%', sCenter, sCenter); //设置描边文字(即镂空文字);


		ctx.lineCap = options.lineCap;
		ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
		ctx.lineWidth = options.lineWidth;
		ctx.beginPath();
		//设置起始路径，这段绘制360度背景;   
		ctx.strokeStyle = '#D8D8D8';
		ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
		ctx.stroke();
		var imd = ctx.getImageData(0, 0, 240, 240);
		var t = 0;
		var timer = null;

		function draw(current) {

			console.log(current);
			//该函数实现角度绘制;     

			ctx.putImageData(imd, 0, 0);
			ctx.beginPath();
			ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
			ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, (nEnd * current) - nBegin, false);
			ctx.stroke();
		}


		function loadCanvas(angle) { //该函数循环绘制指定角度，实现加载动画;      

			timer = setInterval(function() {
				if (t >= angle) {
					draw(options.angle);
					clearInterval(timer);
					//						console.log(t);
				} else {
					draw(t);
					t += 0.02;
				}
			}, 20);
		}
		loadCanvas(options.angle);
	},
	/**
	 * eChart图表 判断数组或者对象是否有数据
	 * @param {Array || Object} data 图表数据，数组或对象类型 
	 * @param {Number} n 1,标识为数组，2标识为对象
	 * @param {String} chartId 标识echart图表id值
	 * @param {Boolean} true代表无数据
	 * */
	echart_nodata_todo2: function(data, n, chartId) {
		var _this = this;
		var isNodata = true;
		if (n == 1) { //数组
			if (data.length === 0) {
				isNodata = true;
			} else {
				isNodata = false;
			}
		} else if (n == 2) { //对象
			var count = 0;
			var count2 = 0;
			for (var k in data) {
				count += 1;
				if (data[k].length < 1) {
					count2 += 1;
				}
			}
			if (count2 < count) { //尚有数据
				isNodata = true;
				//判断是否数组都为空null
				for (var k2 in data) {
					if (_this.isNullArr(data[k2]) === false) { //只要有一个为false，就证明数据还有
						isNodata = false;
						break;
					}
				}
			} else { //无数据			
				isNodata = true;
			}
		}
		$("#" + chartId).css("position", "relative").find(".echart_ondata_box").remove();
		var echart_ondata_box = $('<div class="echart_ondata_box flex_center_middle"></div>');
		echart_ondata_box.append($('<div>暂无数据</div>'));
		if (isNodata) {
			$("#" + chartId).append(echart_ondata_box);
			return true;
		} else {
			$("#" + chartId).find(".echart_ondata_box").remove();
			return false;
		}

	},
	//判断数据数组是否都为空
	isNullArr: function(arr) {
		var isNull = true;
		for (var i = 0; i < arr.length; i++) {
			if (typeof arr[i] == "object") {
				if (arr[i]) {
					isNull = false;
					break;
				}
			} else if (typeof arr[i] == "string") {
				if (arr[i] != "null") {
					isNull = false;
					break;
				}
			} else if (typeof arr[i] == "number") {
				isNull = false;
			}

		}
		return isNull;
	},
	/**
	 * 返回数组对象中isShow为true的数组item
	 * @returns {Array}
	 * */
	backItem_isShow: function(arr) {
		var list = [];
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].isShow) {
				list.push(arr[i]);
			}
		}
		return list;
	},
	/**
	 * 工商业电站系统，自定义下拉菜单
	 * 一级模糊搜索+下拉菜单方法：模糊搜索
	 * @param {Array} mainList 主要数组数据
	 * @param {String} className 主要组件父元素类class
	 * */
	chose_searchList: function(mainList, className) {
		var _this = this;
		setTimeout(function() {
			var val = $("." + className).find(".sys_chose_select_input").val();
			val = val.toUpperCase(); //转为大写
			for (var i = 0; i < mainList.length; i++) {
				if (val == "") {
					mainList[i].isListShow = true;
				} else {
					var n = mainList[i].name.toUpperCase().indexOf(val);
					if (n > -1) {
						mainList[i].isListShow = true;
					} else {
						mainList[i].isListShow = false;
					}
				}
			}
		}, 500);
	},
	/**
	 * 工商业电站系统，自定义下拉菜单
	 * 一级模糊搜索+下拉菜单方法：模糊索索切换参数显示,复选
	 * @param {Object} v 单击选择的Item
	 * @param {Array} list 主要数组list
	 * @param {Function} fn 回调函数，携带参数，v,list;可传可不传
	 * @param {String} list所在控件父元素的class类名；如果使用，fn参数必须传，该参数传递可显示控件所选item的name,多个name之间“,”拼接
	 * */
	chose_switchParamShow_checkbox: function(v, list, fn, pClassName) {
		var _this = this;
		v.isShow = !v.isShow;
		var aItem = _this.getCheckedItem(list);
		if (aItem.length === 0) {
			v.isShow = true;
			_this.minNumNotice();
		}

		if (fn && pClassName) {
			if (v.name) {
				var aItem = _this.getCheckedItem(list);
				var aName = [];
				for (var i = 0; i < aItem.length; i++) {
					aName.push(aItem[i].name);
				}
				$("." + pClassName).find(".sys_chose_select_input").val("").attr("placeholder", aName.join()).attr("title", aName
					.join());
			}
		}

		fn && fn(v, list);
	},
	/**
	 * 工商业电站系统，自定义下拉菜单
	 * 一级模糊搜索+下拉菜单方法：模糊索索切换参数显示,单选
	 * @param {Object} v 单击选择的Item
	 * @param {Array} list 主要数组list
	 * @param {Function} fn 回调函数，携带参数，v,list;可传可不传
	 * @param {String} list所在控件父元素的class类名；如果使用，fn参数必须传，该参数传递可显示控件所选item的name
	 * */
	chose_switchParamShow_radio: function(v, list, fn, pClassName) {
		for (var i = 0; i < list.length; i++) {
			list[i].isShow = false;
		}
		v.isShow = true;

		if (fn && pClassName) {
			if (v.name) $("." + pClassName).find(".sys_chose_select_input").val("").attr("placeholder", v.name).attr("title",
				v.name);
		}
		fn && fn(v, list);
	},
	/**
	 * 工商业电站系统，自定义下拉菜单
	 * 获取被勾选的模糊下拉菜单选项值（针对系统多选下拉列表和多级别下拉列表）
	 * @param {Array} mainData 主要数组list
	 * @return {Array}
	 * */
	getCheckedItem: function(mainData) {
		var item = [];
		for (var i = 0; i < mainData.length; i++) {
			if (mainData[i].children) {
				for (var k = 0; k < mainData[i].children.length; k++) {
					if (mainData[i].children[k].isShow) {
						item.push(mainData[i].children[k]);
					}
				}
			} else {
				if (mainData[i].isParent) {

				} else {
					if (mainData[i].isShow) {
						item.push(mainData[i]);
					}
				}
			}
		}
		return item;
	},
	//勾选最少一个提示
	minNumNotice: function(fn) {
		layer.msg("起码勾选一个"); //起码勾选一个
		fn && fn();
	},
	//判断是否当前浏览器为IE
	isIE: function() {
		if (!!window.ActiveXObject || "ActiveXObject" in window)
			return true;
		else
			return false;
	},
	//判断浏览器类型
	getRunTimeType: function() {
		var _isIE = this.isIE();
		if (_isIE) {
			var ieVer = this.IEVersion();
			if (ieVer == -1) {
				return "Edge"; //ie的Edge模式:Edge
			} else {
				return ieVer; //IE7,IE8,IE9,IE10,IE11
			}
		} else {
			var notIE = this.BrowserType();
			return notIE; //FF,火狐；Opera，Opera;Safari,Safari;Chrome,谷歌；
		}
	},
	//判断是否是IE浏览器，包括Edge浏览器
	IEVersion: function() {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
		var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
		if (isIE) {
			var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			reIE.test(userAgent);
			var fIEVersion = parseFloat(RegExp["$1"]);
			if (fIEVersion == 7) {
				return "IE7";
			} else if (fIEVersion == 8) {
				return "IE8";
			} else if (fIEVersion == 9) {
				return "IE9";
			} else if (fIEVersion == 10) {
				return "IE10";
			} else if (fIEVersion == 11) {
				return "IE11";
			} else {
				return "0"
			} //IE版本过低
		} else if (isEdge) {
			return "Edge";
		} else {
			return "-1"; //非IE
		}
	},
	//判断当前浏览类型
	BrowserType: function() {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
		var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
		var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
		var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
		var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
		var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
		var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

		if (isIE) {
			var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
			reIE.test(userAgent);
			var fIEVersion = parseFloat(RegExp["$1"]);
			if (fIEVersion == 7) {
				return "IE7";
			} else if (fIEVersion == 8) {
				return "IE8";
			} else if (fIEVersion == 9) {
				return "IE9";
			} else if (fIEVersion == 10) {
				return "IE10";
			} else if (fIEVersion == 11) {
				return "IE11";
			} else {
				return "0"
			} //IE版本过低
		} //isIE end

		if (isFF) {
			return "FF";
		}
		if (isOpera) {
			return "Opera";
		}
		if (isSafari) {
			return "Safari";
		}
		if (isChrome) {
			return "Chrome";
		}
		if (isEdge) {
			return "Edge";
		}
	},
	/**
	 * 为容器添加文件选择事件, 容器通常是一个按钮
	 * @param {Object} container 点击按钮Dom节点
	 * @param {Function} onselect 选择文件确定之后的回调函数 
	 * @param {Function} oncancel 选择取消之后的回调函数 
	 * @param {Object} fileOption 上传文件文件表单的属性配置，例如multiple，accept等属性
	 */
	addFileSelect:function(container, onselect, oncancel, fileOption){
		container.addEventListener('click', function() {
			container.innerText = "上传中....";
			var input = document.createElement('input');
			input.type = 'file';
			if (fileOption) { //文件配置
				if (fileOption.multiple) {
					input.multiple = "multiple";
				}
				if (fileOption.accept) {
					input.accept = fileOption.accept;
				}
			}
			input.click();
			input.addEventListener("change", function() {
				console.log("change");
				console.log(input.files, "change");
				onselect && onselect(input.files);
			});
			container.addEventListener('focus', function() {
				console.log(input.value); // 大概先于onchange事件100ms执行, 所以一定是空串
		
				var loop_count = 0; // 轮询次数
				// 轮询
				(function loop() {
					// console.log(input.files,"focus");
					if (input.value !== '') {
						// 不需要change事件
						// onselect === null || onselect === void 0 ? void 0 : onselect(input);
					} else if (++loop_count >= 10) {
						// 基于轮询次数的判断
						oncancel === null || oncancel === void 0 ? void 0 : oncancel(input.files);
					} else {
						// 暂时无法判断, 继续轮询
						setTimeout(loop, 20);
					}
		
					;
				})();
			}, {
				once: true
			});
		});
		
	},
};

