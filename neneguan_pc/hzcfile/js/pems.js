$(function(){
	//页面背景图
	autoH();
	function autoH(){
		var wh=$(window).height();
		var wW=$(window).width();
		$(".bodyH").height(wh);
		$(".TimeArea").css("visibility",wW<1280? "hidden":"visible");//小屏幕把时间功能隐藏
	}
	$(window).resize(function(){
		autoH();
	})

	//顶部导航栏
	Topmenu();
	function Topmenu(){
		var Navcolumn=$(".Navcolumn");
		Navcolumn.hover(function(){
			$(this).find(".DorpNav").stop(true,true).slideDown();
			$(this).find(".flicker").stop(true,true).show();
		},function(){
			$(this).find(".DorpNav").stop(true,true).slideUp();
			$(this).find(".flicker").stop(true,true).hide();
		})
		//个人资料
		var datambtn=$(".UserInfo_name");
		var datam=$(".UserInfo_operate");
		datambtn.hover(function(){
			$(this).addClass("cur");
			datam.stop(true,true).slideDown(300);
		},function(){
			$(this).removeClass("cur");
			datam.stop(true,true).slideUp(300);
		})
		//收起导航栏按钮
		var Pem_header_menubtn=$(".MainNavbtn");
		Pem_header_menubtn.click(function(){
//			$(this).toggleClass("curmenu");
//			$(".header").animate({"margin-top":$(this).hasClass("curmenu")? "-6.4vh":"0"},500);
//			if($(this).hasClass("curmenu")){
//				setTimeout(function(){ $(".TimeArea").hide()},1000);
//				setTimeout(function(){ $(".Navcolumn").hide()},1000);
//			}else{
//				$(".TimeArea").show();
//				$(".Navcolumn").show()
//			}
			
			$(this).toggleClass("curmenu");
			$(".header").animate({
				"margin-top": $(this).hasClass("curmenu") ? "-8.4vh" : "0"
			}, 500);
			if($(this).hasClass("curmenu")) {
				setTimeout(function() {
					$(".TimeArea").hide();
				}, 1000);
				setTimeout(function() {
					$(".Navcolumn").hide();
				}, 1000);
				$(".section").addClass("top-0");
			} else {
				$(".TimeArea").show();
				$(".Navcolumn").show();
				$(".section").removeClass("top-0");
			}
			
		});
	}
	//换皮肤
	skinFn();
	//新闻公告自动切换
	$(".NewsMsglists").slide({mainCell:"ul",autoPage:true,effect:"top",autoPlay:true,vis:1});
	
	//给皮肤图片加上选中样式
	var SKIN=$("body").css("backgroundImage");
	var LEN=SKIN.length-2
	var SKINSLICE =SKIN.slice(-13,LEN);
	//console.log(SKINSLICE);
	if (SKINSLICE=="Pem_bg1.png")$(".skin ul li").eq(1).addClass("used").siblings().removeClass("used");
	if (SKINSLICE=="Pem_bg2.png")$(".skin ul li").eq(0).addClass("used").siblings().removeClass("used");
})
// =============================以上是所有页面都有调用到===============================================//


// =============================部分需要调用的js===============================================//
//系统时间、日期
function getCurDate(){
 var d = new Date();
 var week;
 switch (d.getDay()){
 case 1: week="星期一"; break;
 case 2: week="星期二"; break;
 case 3: week="星期三"; break;
 case 4: week="星期四"; break;
 case 5: week="星期五"; break;
 case 6: week="星期六"; break;
 default: week="星期天";
 }
 var years = d.getFullYear();
 var month = add_zero(d.getMonth()+1);
 var days = add_zero(d.getDate());
 var hours = add_zero(d.getHours());
 var minutes = add_zero(d.getMinutes());
 var seconds=add_zero(d.getSeconds());
 var str1=years+"-"+month+"-"+days;//年份
 var str2=hours+":"+minutes+":"+seconds;//时间

$(".TimeArea .division").text(str2);
$(".TimeArea .years span").text(str1);
$(".TimeArea .years p").text(week);
}

function add_zero(temp){//单数补零
 if(temp<10) return "0"+temp;
 else return temp;
}
setInterval("getCurDate()",1000);

// 滚动动画
function scrollanimate(){
	window.scrollReveal = new scrollReveal({
		reset: false,
		move: '50px'
	});
}

//首页中间菜单栏
function centermenu(obj){
	var oul=obj.find(".columnwrap");
	var oli=oul.find("p");
	var ocls=obj.find(".columnwrap").attr("name");
	oli.hover(function(){
		var i=$(this).index();
		oul.attr("class","");
		oul.addClass(ocls+i);
	},function(){
		oul.attr("class","");
		oul.addClass(ocls);
	})
}

// 字体滚动效果
function fontFn(obj,otext,pt){
	var options = {
	useEasing : true, 
	useGrouping : true, 
	separator : pt||"", 
	decimal : '.', 
	prefix : '', 
	suffix : '' 
	};
	var demo = new CountUp(obj, 0, otext, 2, 3, options);
	demo.start();
}


//数字增长动画
function plusNumberFun(obj,start,end,pt){
	var options = {
			useEasing : true, 
			useGrouping : true, 
			separator : pt||"", 
			decimal : '.', 
			prefix : '', 
			suffix : '' 
			};
			var demo = new CountUp(obj, start, end, 2, 0.1, options);
			if (!demo.error) {
			demo.start();
			} else {
			console.error(demo.error);
		}
}

// -- 换皮肤 --
function skinFn(){
	var skintab=$(".skin .skintab");
	var skinbox=$(".skin ul");
	var triangle_up=$(".skin .triangle-up");
	var skinli =$(".skin ul li");
	skintab.on("click",function(){
		skinbox.toggleClass("on");
		triangle_up[skinbox.hasClass("on")?"show":"hide"]();
	})
	skinli.on("click",function(){
		switchSkin( this.id );
		skinbox.removeClass("on");
		triangle_up[skinbox.hasClass("on")?"show":"hide"]();
		$(this).addClass("used").siblings().removeClass("used");
	})
    var cookie_skin = $.cookie( "MyCssSkin");
    if (cookie_skin) {
        switchSkin( cookie_skin );
    }
}
function switchSkin(skinName){
    $("#cssfile").attr("href","../hzcfile/css/"+ skinName +".css"); //设置不同皮肤
    $.cookie( "MyCssSkin" ,  skinName , { path: '/', expires: 365});//有效期一年
}
// ==================首页_end========================//

//时、日、月、年切换
function LayDateTab(){
	var oTimeTab=$(".TimeTab span");
	oTimeTab.on("click",function(){
		$(this).addClass("cur").siblings().removeClass("cur");
		//$(".TimeSearchbox input").val("");
	})
}

/**
 * 
 * 获取当前静态所有时间
 * @param {String} oTime 时间格式参数
 *  'y-m-d' ==> 年月日
	 'y-m' ==> 年月
	 'm-d' ==> 月日
	 'h-m-s' ==> 时分秒
	 'h-m' ==> 时分
	 'm-s' ==> 分秒
	 'y' ==>年
	 'w' ==>星期
	 'd' ==>日
	 '' ==>年月日 时分秒
 * */
function getOnTime(oTime){
	//获取当前具体时间
	var oDate = new Date();
	var nYear = oDate.getFullYear();
	var nMonth = oDate.getMonth() * 1 + 1;
	if(nMonth < 10) nMonth = "0" + nMonth;
	var nDate = oDate.getDate();
	if(nDate < 10) nDate = "0" + nDate;
	var nHours = oDate.getHours();
	var nMinutes = oDate.getMinutes();
	var nSeconds = oDate.getSeconds();

	(nHours < 10) && (nHours = "0" + nHours);
	(nMinutes < 10) && (nMinutes = "0" + nMinutes);
	(nSeconds < 10) && (nSeconds = "0" + nSeconds);

	switch(true) {
		case(oTime === 'y-m-d'):
			return nYear + "-" + nMonth + "-" + nDate;
			break;
		case(oTime === 'y-m'):
			return nYear + "-" + nMonth;
			break;
		case(oTime === 'm-d'):
			return nMonth + "-" + nDate;
			break;
		case(oTime === 'h-m-s'):
			return nHours + ":" + nMinutes + ":" + nSeconds;
			break;
		case(oTime === 'm-s'):
			return nMinutes + ":" + nSeconds;
			break;
		case(oTime === 'h-m'):
			return nHours + ":" + nMinutes;
			break;
		case(oTime === 'y'):
			return nYear;
			break;
		case(oTime === 'd'):
			return nDate;
			break;
		case(oTime === 'w'):
			return "今天是星期" + "日一二三四五六".charAt(new Date().getDay());
			break;
		case(oTime === 'ZW'):
			return nYear + "年" + nMonth + "月" + nDate + "日  " + nHours + ":" + nMinutes + ":" + nSeconds;
			break;
		default:
			return nYear + "-" + nMonth + "-" + nDate + " " + nHours + ":" + nMinutes + ":" + nSeconds;
	}
}
//====================================================laydate5时间选择器============================================================
//时间表
function LayDatefn(){
	var arr=['YYYY-MM-DD','YYYY-MM-DD','YYYY-MM','YYYY'];
	var ov=$(".TimeTab span.cur").text();
	if(ov=="时")laydate({istime: true, format:arr[0]});
	if(ov=="日")laydate({istime: true, format:arr[1]});
	if(ov=="月")laydate({istime: true, format:arr[2]});
	if(ov=="年")laydate({istime: true, format:arr[3]});
}

//时间选择器切换修改
function LayDatefn_5(selector,nType){
	var mydate = new Date();
	var onYear = mydate.getFullYear();//当前年份
	var onMonth = mydate.getMonth()+1;//当前月
	var onDate = mydate.getDate();//当前日
	var onHours = mydate.getHours();//当前时
	var onMinutes = mydate.getMinutes();//当前分
	var onSeconds = mydate.getSeconds();//当前秒
	

	//年月日
	if(nType == "2"){
		changeLaydateType(selector,"date");
		setTimeout(function(){
			showDIYDate(nType,selector);
		},500);
		
	}
	//年月
	else if(nType == "3"){
		changeLaydateType(selector,"month");
		setTimeout(function(){
			showDIYDate(nType,selector);
		},500);
		
	}
	//年
	else if(nType == "4"){
		changeLaydateType(selector,"year");
		setTimeout(function(){
			$(selector).val(getOnTime('y'));
		},500);
	}
	//时分秒
	else if(nType == "1"){
		changeLaydateType(selector,"date");
		setTimeout(function(){
			//$(selector).val(getOnTime('y-m-d'));
		
		},500);
	}
	//时分秒
	else{
		changeLaydateType(selector,"time");
		setTimeout(function(){
			$(selector).val(getOnTime('h-m-s'));
		},500);
	}
	
//	setTimeout(showDIYDate(nType,selector),500);
}
/**
 * 初始化时间laydate
 * @param {String} selector 日期选择器input的id
 * @param {String} type 类型 包含4“year”，3“month”，2“date”（年月日），5“time”（时分秒），1“datetime”，年月日时分秒
 * */
function initLaydate(selector,nType){
	if(nType == "1"){
		var sType = "date";
		$(selector).val(getOnTime('y-m-d'));
	}else if(nType == "2"){
		var sType = "date";
//		$(selector).val(getOnTime('y-m-d'));
		
	}else if(nType == "3"){
		var sType = "month";
//		$(selector).val(getOnTime('y-m'));
		
	}else if(nType == "4"){
		var sType = "year";
		$(selector).val(getOnTime('y'));
	}else{
		var sType = "time";
//		$(selector).val(getOnTime(''));
	}
	
	laydate.render({
		elem: selector,
		type: sType,
		lang: "cn", //默认为中文，en是英文
		done: function(value) {
			//回调函数
			console.log(value);
		}
	});
	
	showDIYDate(nType,selector);

}

//判断当前元素选择器的id值,startTime返回1，endTime返回0
function getSelectorIdVal(selector){
	if($(selector).attr("id") == "startTime"){
		return 1;
	}else if($(selector).attr("id") == "endTime"){
		return 0;
	}
}

/**
 * 显示自定义时间
 * @param {String} selector 日期选择器input的id
 * @param {String} type 类型 包含4“year”，3“month”，2“date”（年月日），5“time”（时分秒），1“datetime”，年月日时分秒
 * */
function showDIYDate(type,selector){
	var oDate = new Date();
	var yesterday = (oDate.getDate() > 1 ? (oDate.getDate() - 1) : oDate.getDate());
	if(yesterday < 10) yesterday = "0" + yesterday;
	
	if(type == "2" ){//日范围
		
		if(getSelectorIdVal(selector) == 1){//开始时间
		
			$(selector).val(getOnTime('y-m') + "-01");
		}else{			
			$(selector).val(getOnTime('y-m') + "-" + yesterday);
		
		}
	}else if(type == "3"){//月范围
		console.log('月范围');
		if(getSelectorIdVal(selector) == 1){//开始时间
			$(selector).val(getOnTime('y') + "-01");
			
		}else{			
			$(selector).val(getOnTime('y-m'));
			
		}
	}
	else if(type == "4"){//年范围
		$(selector).val(getOnTime('y'));
	}
	else if(type == "1"){//时范围
		$(selector).val(getOnTime('y-m-d'));
	}
	
}

/**
 * 修改laydate选择器的类型
 * @param {String} selector 日期选择器input的id
 * @param {String} type 类型 包含“year”，“month”，“date”（年月日），“time”（时分秒），“datetime”，年月日时分秒
 * */
function changeLaydateType(selector,type){
	var p = $(selector).parent();
	var val = selector.replace("#","");
	
	$(selector).remove();
	p.append($('<input type="text" autocomplete="off" laykey="on" class="dateDay laydate-icon" id="'+val+'">'))
	if(type == "1"){
		//重新渲染
		laydate.render({
			elem: selector,
			type: type,
			format:"HH:mm:ss",
			lang: "cn", //默认为中文，en是英文
			done: function(value) {
				//回调函数
				console.log(value);
			}
		});
	}else{
		//重新渲染
		laydate.render({
			elem: selector,
			type: type,
			lang: "cn", //默认为中文，en是英文
			done: function(value) {
				//回调函数
				console.log(value);
			}
		});
	}
	
	
	
}

//====================================================laydate5时间选择器============================================================

function LayDatefn2(){
	var arr=['YYYY-MM-DD','YYYY-MM-DD','YYYY-MM','YYYY'];
	var ov=$(".timeswitfh span.cur").text();
	if(ov=="时")laydate({istime: true, format:arr[0]});
	if(ov=="日")laydate({istime: true, format:arr[1]});
	if(ov=="月")laydate({istime: true, format:arr[2]});
	if(ov=="年")laydate({istime: true, format:arr[3]});
}

/*function LayDatefn2(){
	var arr=['YYYY-MM-DD hh:mm','YYYY-MM-DD','YYYY-MM','YYYY'];
	var ov=$(".timeTab2 span.cur").text();
	if(ov=="时")laydate({istime: true, format:arr[0]});
	if(ov=="日")laydate({istime: true, format:arr[1]});
	if(ov=="月")laydate({istime: true, format:arr[2]});
	if(ov=="年")laydate({istime: true, format:arr[3]});
}*/
//公用的切换内容js（切换后刷新页面不会跳回最初内容）
 function publictab(){
 	var hdtab = $(".hdtab");//切换按钮
 	var hdcon = $(".hdcon");//切换内容框
 	var hdlen=$(".hdtab").length;//获取有几个切换内容区域
	var oHash = window.location.hash;//获取页面url
	var arrUrl = [];//"#1","#2","#3","#4"
	for(var i=0;i<hdlen;i++){ //给url加上伪标签
		arrUrl.push("#"+i);
	}
	//alert(arrUrl);
	for (var i = 0; i < arrUrl.length; i++) {
	    if (oHash == arrUrl[i]) {
	       hdtab.eq(i).addClass("cur").siblings().removeClass("cur");
 		   hdcon.eq(i).show().siblings().hide();
	    }
	    else{
	    	hdtab.click(function(){
				var n = $(this).index();
				$(this).addClass("cur").siblings().removeClass("cur");
 		        hdcon.eq(n).show().siblings().hide();
				window.location.hash = arrUrl[n];
			});
	    }
   }
 }

//新闻公告列表
 function DRopnewslist(obj){
 	$(obj).stop(true,true).slideToggle();
 	$(document).one("click", function(){
         $(obj).hide();
     });
 	event.stopPropagation();
 }

//弹框拖动效果
 $.fn.extend({ SliderObject: function (objMoved) {
     var mouseDownPosiX;
     var mouseDownPosiY;
     var InitPositionX;
     var InitPositionY;
     var obj = $(objMoved) == undefined ? $(this) : $(objMoved);
     $(this).mousedown(function (e) {
         //当鼠标按下时捕获鼠标位置以及对象的当前位置
         mouseDownPosiX = e.pageX;
         mouseDownPosiY = e.pageY;

         InitPositionX = obj.css("left").replace("px", "");
         InitPositionY = obj.css("top").replace("px", "");
         obj.mousemove(function (e) {
             //if ($(this).is(":focus")) {
                 var tempX = parseInt(e.pageX) - parseInt(mouseDownPosiX) + parseInt(InitPositionX);
                 var tempY = parseInt(e.pageY) - parseInt(mouseDownPosiY) + parseInt(InitPositionY);
                 obj.css("left", tempX + "px").css("top", tempY + "px");
             //};
             //当鼠标弹起或者离开元素时，将鼠标弹起置为false，不移动对象
         }).mouseup(function () {
             obj.unbind("mousemove");
         }).mouseleave(function () {
             obj.unbind("mousemove");
         });
     })
 }
 });

 //数据对比如果有cur不允许跳转
 function Defauljump(obj,i){
	var urlArr=['../analysis/datacompare','../analysis/datacompare2']
	$(obj).hasClass("cur")?$(obj).attr("href","javascript:void(0)"):$(obj).attr("href",urlArr[i]);
}
 
 
 
/*====================table====================== */
//自适应table
 function AdaptiveW(target,grid){
	 
	 var grid=grid ||10;
	 var len=$("th","."+target).length; //table的列数
	 var zsyw=Math.floor(100/len)+"%"; //宽度小于grid按百分比算
 	if(len<grid||len==grid){
 		$("."+target).css("width","100%");
 		$("thead th,tbody td","."+target).css("width",zsyw);
 		$("thead,tbody tr","."+target).css({
 			"display":"table",
 			"width":"100%",
 			"table-layout":"fixed",
 		});
 		$("thead th span,tbody td span","."+target).css("width","100%");
 		$("."+target).addClass("noboder");
 	}else{
 		$("."+target).css("width","auto");
 		$("thead th,tbody td","."+target).css("width","auto");
 		$("thead th span,tbody td span","."+target).css("width","160px");
 		$("."+target).removeClass("noboder");
 		fixedcol(target);
 	}
 }

 //冻结列
 function fixedcol(target){
 	$("."+target).scroll(function(){
 		var sclL=$("."+target).scrollLeft();//获取滚动的距离
 		var sctr=$("thead tr:first,tbody tr","."+target);
 	    sctr.each(function(i){
 			if(sclL!=0){
 				$(this).children().eq(0).css({
 	 				"position":"relative",
 	 				"top":"0px",
 	 				"left":sclL-1,
 	 				"background":"#01273c",
 	 				"z-index": 9999
 	 			});
 				$(this).children("th").eq(0).css({"background":"#0094e8"});	
 			}else{
 				$(this).children().eq(0).css({
 	 				"position":"static",
 	 				"top":0,
 	 				"left":0,
 	 				"z-index": "auto",
 	 				"background":"none"
 	 			});
 			}
 		});
 	})
 }
 
/**
 * 显示局部隐藏的文本内容
 * @param {String} selector 需要内容溢出省略的选择器
 * */
function showAllTxt(selector){
	var text_overflow = {
	    "overflow":"hidden",
	    "textOverflow":"ellipsis",
	    "whiteSpace":"nowrap",
	    "cursor": "pointer"
	};
	$(selector).css(text_overflow).on("mouseover",function(e){
		console.log(e.target);
		var target = e.target;
        var containerLength = $(target).width();
        var textLength = target.scrollWidth;
        var text = $(target).html();
        if (textLength > containerLength) {
            $(target).attr( "title", text);
        } else {
            $(target).removeAttr( "title");
        }
	});
	
}