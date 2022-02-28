/**
 * @author xiaohaobin
 * @date 2019-03-15
 * @description 首页功能模块
 * */

(function($, window, document, undefined) {
	$.extend({
	
		/**
		 * 点击子列表菜单的时候，父菜单对应显示该有的样式
		 * 
		 * */
		showParentLiStyle:function(nIndex){
			$(".NavMenuBox>li:nth-child("+ (nIndex+1) +")").addClass("activeLi").siblings("li").removeClass("activeLi");
		},
		//获取当前server的天气，温度和风力
		getCurrWeather:function(){			
			
			$.ajax({
				  type: 'POST',
				  url: "",
				  data:{},
				  contentType:"application/json",
				  dataType:'json',
				  success:function(data){
					  $(".weatherInfo").text(data.weather);
						$(".temperature").text(data.temperature);
						$(".wind").text(data.winddirection + "风" + data.windpower);
				  }
			});
			
		},
		//获取当前时间，（年月日时分秒，星期）
		getCurrDate:function(){			
			
			$.ajax({
				  type: 'POST',
				  url: "",
				  data:{},
				  contentType:"application/json",
				  dataType:'json',
				  success:function(data){
					  $(".ctime").text(data.ctime);
						$(".cdate").text(data.cdate);
						$(".cweek").text(data.cweek);
						
						$.initCurrTimes(data.cDate,data.cTime);
						
						//每一秒时间推移，并且更新时间
						$.updateTime($(".cdate"),$(".ctime"),$(".cweek"));
				  }
			});
			
		},
		//获取到服务器递增中转时间
		nT:0,
		oTimer:null,
		/**
		 * 根据初始化服务器时间和日期
		 * @param {String} cDate 年月日时间字符串
		 * @param {String} cTime 时分秒时间字符串
		 * */
		initCurrTimes:function(cDate,cTime){
			if(!cDate || cDate == undefined || !cTime || cTime == undefined){//没有参数则获取本地时间戳
				var allTime = $.getCurrTimestamp();
				$.nT = allTime;
			}else{
				var allTime = cDate + " " + cTime;
				$.nT = $.backDateNum(allTime);
			}
					
		},
		
		/**
		 * 每一秒时间推移，并且更新时间
		 * @param {Object} cTime 时分秒时间选择器jq对象
		 * @param {Object} cDate 年月日日期选择器jq对象
		 * @param {Object} cWeek 星期选择器jq对象
		 * */
		updateTime:function(cDate,cTime,cWeek){
			
			$.oTimer = setInterval(function(){
				$.nT++;//每秒递增的数字
//				$.nT+=100;
				currTime = $.timestampToTime($.nT, "yyyy-MM-dd h:m:s");
//				console.log(currTime.slice(0,10),"截取两端时间",currTime.slice(10,currTime.length));
				nIndex = currTime.indexOf(" ");
				cTime.text(currTime.slice(nIndex,currTime.length));//计算时分秒
				cDate.text(currTime.slice(0,nIndex));//计算年月日
				cWeek.text($.getWeeDay(currTime.slice(0,nIndex)));//计算周几
//				console.log($.nT,currTime);
			},1000);
		},
		//退出接口
		userLogout:function(){
			$("._logout").on("click",function(){
				localStorage.removeItem("activeSystem");
				localStorage.removeItem("activeNav");
				setTimeout(function(){
					window.location.href="../user/exit";
				},100);
				
			});
			
		},
		//跳转到个人资料和系统设置
		location_userInfo:function(){
			$("._userInfo,.UserInfo_setup").on("click",function(){
				
				var oSystemInfo = {
					url:"../user/person",
					name:"系统设置"
				};
				localStorage.setItem("activeSystem",JSON.stringify(oSystemInfo));
				
				setTimeout(function(){
					window.location.href = "../user/person";
				},100);
				$(".toggleIndexBtn").addClass("hide");
			});
		},
		//左边菜单折叠
		leftNavFold:function(){
			$(".toggleArrow").on("click",function(event){
				if(!$(".leftArrowBox ").hasClass("arrow")){
					$(".section").addClass("left-0");			
		//			$(".NavigationBar").addClass("hideNev");
					$(".NavigationBar").hide();
					$(".leftArrowBox ").addClass("arrow");
					
					return;
				}else{			
					$(".section").removeClass("left-0");
		//			$(".NavigationBar").removeClass("hideNev");
					$(".NavigationBar").show();
					$(".leftArrowBox ").removeClass("arrow");
				}
			});
		},
		//跳转查看系统信息
		location_notice:function(){
			$("body").on("click",".NewsMsg_tt,.Dropnews li",function(){
				
				
				var oSystemInfo = {
					url:"../emonitor/message",
					name:"系统信息"
				};
				localStorage.setItem("activeSystem",JSON.stringify(oSystemInfo));
				
				setTimeout(function(){
					window.location.href = "../emonitor/message";
				},100);
				
			});
		},
		//jsp版本，初始化菜单样式
		initNavStyle:function(){
			//先判断系统相关信息是否存在
			if(localStorage.getItem("activeSystem")){
				var _activeSystem = JSON.parse(localStorage.getItem("activeSystem"));
				$(".cNav").text(_activeSystem.name);
				$(".NavMenuBox>li").removeClass('activeLi');
				return false;
			}
			
			if(localStorage.getItem("activeNav")){
				var oUrlInfo = JSON.parse(localStorage.getItem("activeNav"));
				$.showParentLiStyle(oUrlInfo.sort);
				$(".cNav").text(oUrlInfo.name);
				$(".toggleIndexBtn").addClass('hide');
			}else{
				$(".mainPage").addClass("activeLi").siblings("li").removeClass("activeLi");
				$(".cNav").text("总览");
				$(".toggleIndexBtn").removeClass('hide');
			}
		}
	});
})(jQuery, window, document);

