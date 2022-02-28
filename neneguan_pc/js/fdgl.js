	//=============================================================================充电动画函数================================================================================================================================
	//充电：面板到电网的动画
function runAnimateFn_1(){				
	$(".fdgl_liu_jian_1").animate(
		{left:'31.55%'},
		2000,
		function(){
			
			$(".fdgl_liu_jian_1").stop().css({
				"transform": "rotate(270deg)",
				"top": "45%"
			})
			.animate(
				{top:'15%'},
				2500,
				function(){
					$(".fdgl_liu_jian_1").stop().css({
						"transform": "rotate(0deg)",
						"top": "46.1%",
						"left":"5%"
					});
					
					setTimeout(runAnimateFn_1,500);
				}
			);
		}
	);
}

//充电：电网到设备和电池
function runAnimateFn_2(){
	$(".fdgl_liu_jian_2").animate(
		{top:'46%'},
		1500,
		function(){
			
			$(".fdgl_liu_jian_2").stop().css({
				"transform": "rotate(0deg)",
				"left": "32%"
			})
			.animate(
				{left:'43.5%'},
				2000,
				function(){
					//再此处分流
					runAnimateFn_3();
					runAnimateFn_4();
					
					$(".fdgl_liu_jian_2").stop().animate(
						{left:'70%'},
						3000,
						function(){
							$(".fdgl_liu_jian_2").stop().css({
								"transform": "rotate(90deg)",
								"top": "47%",
								"left": "70.08%"
							})
							.animate(
								{top:"66%"},
								2500,
								function(){
									$(".fdgl_liu_jian_2").stop().css({
										"transform": "rotate(0deg)",
										"top": "66.1%",
										"left": "70.5%"
									})
									.animate(
										{left:'80%'},
										2500,
										function(){
											$(".fdgl_liu_jian_2").stop().css({
												"top": "15%",
												"left": "31.55%",
												"transform":" rotate(90deg)",														
											});
											
											setTimeout(runAnimateFn_2,500);
										}
									);
								}
							);
						}
					);
					
				}
			);
		}
	);
}

//充电：电网到设备和电池2
function runAnimateFn_3(){
	$(".fdgl_liu_jian_3").css({
		"display":"block"
	}).animate(
		{top:"10%"},
		1500,
		function(){
			$(".fdgl_liu_jian_3").css({
				"transform": "rotate(0deg)",
				"left": "44%"
			})
			.animate(
				{left:'80%'},
				4000,
				function(){
					$(".fdgl_liu_jian_3").stop().css({
						"top": "45%",
						"left": "43.33%",
						"transform":" rotate(270deg)",
						"display": "none"
					});
				}
			);
		}
	);
}

//充电：电网到设备和电池3
function runAnimateFn_4(){
	$(".fdgl_liu_jian_4").css({
		"display":"block"
	}).animate(
		{top:"84.2%"},
		1500,
		function(){
			$(".fdgl_liu_jian_4").css({
				"transform": "rotate(0deg)",
				"left": "44%"
			})
			.animate(
				{left:'70.33%'},
				1500,
				function(){
					$(".fdgl_liu_jian_4").stop().css({
						"top": "83.2%",
						"left": "70.03%",
						"transform":" rotate(270deg)"
					})
					.animate(
						{top:'66.2%'},
						2500,
						function(){
							$(".fdgl_liu_jian_4").stop().css({
								"top": "66.2%",
								"left": "70.5%",
								"transform":" rotate(0deg)"
							})
							.animate(
								{left:'80%'},
								2500,
								function(){
									$(".fdgl_liu_jian_4").stop().css({
										"top": "47%",
										"left": "43.33%",
										"transform":" rotate(90deg)",
										"display": "none"
									});
								}
							);
						}
					);
				}
			);
		}
	);
}
//充電動畫
function runAnimateCD(){
	runAnimateFn_1();
	runAnimateFn_2();
}
// runAnimateCD();

//=============================================================================取电动画函数================================================================================================================================
	//取电：面板到负载的动画
function runAnimateFn_5(){				
	$(".fdgl_liu_jian_5").animate(
		{left:'31.55%'},
		2000,
		function(){
			
			$(".fdgl_liu_jian_5").stop().css({
				"transform": "rotate(90deg)",
				"top": "47%"
			})
			.animate(
				{top:'80%'},
				2500,
				function(){
					$(".fdgl_liu_jian_5").stop().css({
						"transform": "rotate(0deg)",
						"top": "46.1%",
						"left":"5%"
					});
					
					setTimeout(runAnimateFn_5,500);
				}
			);
		}
	);
}

	//取电：电网到负载的动画
function runAnimateFn_6(){				
	$(".fdgl_liu_jian_6").animate(
		{top:'80%'},
		2500,
		function(){
			
			$(".fdgl_liu_jian_6").stop().css({
				"top": "15%",
				"left": "31.55%"
			});
			setTimeout(runAnimateFn_6,500);
		}
	);
}

//取电：电池1到负载
function runAnimateFn_7(){				
	$(".fdgl_liu_jian_7").animate(
		{left:'43.9%'},
		5000,
		'linear',
		function(){
			
			$(".fdgl_liu_jian_7").stop().css({
				"top": "11.07%",
				"transform": "rotate(90deg)",
				"left":"43.38%"
			})
			.animate(
				{top:"45.07%"},
				2500,//箭头下从
				function(){
					$(".fdgl_liu_jian_7").stop().css({
						"top": "46.07%",
						"transform": "rotate(180deg)",
						"left": "43%"
					})
					.animate(
						{left:'32%'},
						2000,
						function(){
							$(".fdgl_liu_jian_7").stop().css({
								"top": "47.07%",
								"transform": "rotate(90deg)",
								"left": "31.6%"
							})
							.animate(
								{top:'80%'},
								2500,
								function(){
									
									$(".fdgl_liu_jian_7").stop().css({
										"transform": "rotate(180deg)",
										"top": "10.07%",
										"left": "80%"
									});
									setTimeout(runAnimateFn_789,500);
								}
							);
						}
					);
				}
			);
		}
	);
}

//取电：电池2到负载1
function runAnimateFn_8(){
	$(".fdgl_liu_jian_8").animate(
		{left:'70.5%'},
		1000,
		function(){
			$(".fdgl_liu_jian_8").stop().css({
				"transform": "rotate(270deg)",
				"top": "65.07%",
				"left": "70.08%"
			})
			.animate(
				{top:"47.07%"},
				2000,
				function(){
					$(".fdgl_liu_jian_8").stop().css({
						"transform": "rotate(180deg)",
						"top": "46.07%",
						"left": "69.58%"
					})
					.animate(
						{left:'43.9%'},
						4500,
						function(){
							$(".fdgl_liu_jian_8").stop().css({
								"transform": "rotate(180deg)",
								"top": "66.07%",										
								"left": "80%"
							});
						}
					);
				}
			);
		}
	);	
}

function runAnimateFn_9(){
	$(".fdgl_liu_jian_9").animate(
		{left:'70.5%'},
		1000,
		function(){
			$(".fdgl_liu_jian_9").stop().css({
				"transform": "rotate(90deg)",
				"top": "67.2%",
				"left": "70.08%"
				
			})
			.animate(
				{top:"83%"},
				2000,
				function(){
					$(".fdgl_liu_jian_9").stop().css({
						"transform": "rotate(180deg)",
						"top": "84.2%",
						"left": "69.58%"
					})
					.animate(
						{left:'43.9%'},
						2000,
						function(){
							$(".fdgl_liu_jian_9").stop().css({
								"transform": "rotate(270deg)",
								"top": "83%",
								"left":"43.365%"
							})
							.animate(
								{top:"47%"},
								2500,
								function(){
									$(".fdgl_liu_jian_9").stop().css({
										"transform": "rotate(180deg)",
										"top": "66.07%",										
										"left": "80%"
									});
								}
							);
						}
					);
				}
			);
		}
	);	
}

function runAnimateFn_789(){
	runAnimateFn_7();
	runAnimateFn_8();
	runAnimateFn_9();
}

//充電動畫
function runAnimateFD(){
	runAnimateFn_789();
	runAnimateFn_5();
	runAnimateFn_6();
}

$(function(){
	//点击运行模式
	$(".runModelBox").on("click",function(){
		var b = $(".runModelListBox").hasClass("hide");
		if(b){
			var imgUrl = 'hzcfile/images/fdgl/jt_up.png';
			var sBottom = $(".runModelBox").css("bottom");
			var nBottom = sBottom.replace('px','') * 1;
			var nHeight = $(".runModelBtn").height();
			
			$(".runModelListBox").removeClass("hide").css({'bottom':(nHeight + nBottom +1) + 'px'});
			$(".runModelJTImg").attr("src",imgUrl);
			return;
		}else{
			var imgUrl = 'hzcfile/images/fdgl/jt_down.png';
			$(".runModelListBox").addClass("hide");
			$(".runModelJTImg").attr("src",imgUrl);
		}
	});
	
	//编辑模式
	$(".fdgl_edit_btn").on("click",function(){
		//fdgl_edit
		layer.open({
		  type: 1 //Page层类型
		  ,area: ['640px', '630px']//高宽
		  ,title: '<i class="dcl"></i><span>修改模式</span><i class="dcr"></i>'
		  ,shade: 0.8 //遮罩透明度
		  ,maxmin: true //允许全屏最小化
		  ,anim: 5 //0-6的动画形式，-1不开启
		  ,content:$("#fdgl_edit")
		  ,btn: ['确认', '取消']
		  ,yes: function(index, layero){
			  // hpsConfigRequest(InverterID);
			//layer.closeAll();
			console.log("确认..")
		  },btn1: function(index, layero){    
				  
		  }         
		});
	});
	
	//点击切换修改模式中的Tab
	$(".fdgl_tabList ul li").on("click",function(){
		var ind = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".fdgl_tabContent").eq(ind).addClass("active").siblings().removeClass("active");
	});
});

var mainApp = new Vue({
	el:"#mainApp",
	data:{
		devList:[
			{sn:'ECFOA22008',id:1,curr:false},
			{sn:'ECFOA22008',id:2,curr:false},
			{sn:'ECFOA22008',id:3,curr:true}
		],
		fgpList:[//峰谷平list
			{txt:'峰期1时间段：',id:'hps_feng_time_1_start_hour'},
			{txt:'峰期2时间段：',id:'hps_feng_time_2_start_hour'},
			{txt:'峰期3时间段：',id:'hps_feng_time_3_start_hour'},
			{txt:'峰期4时间段：',id:'hps_feng_time_4_start_hour'},
			{txt:'峰期5时间段：',id:'hps_feng_time_5_start_hour'},
			
			{txt:'平期1时间段：',id:'hps_ping_time_1_start_hour'},
			{txt:'平期2时间段：',id:'hps_ping_time_2_start_hour'},
			{txt:'平期3时间段：',id:'hps_ping_time_3_start_hour'},
			{txt:'平期4时间段：',id:'hps_ping_time_4_start_hour'},
			{txt:'平期5时间段：',id:'hps_ping_time_5_start_hour'},
			
			{txt:'谷期1时间段：',id:'hps_gu_time_1_start_hour'},
			{txt:'谷期2时间段：',id:'hps_gu_time_2_start_hour'},
			{txt:'谷期3时间段：',id:'hps_gu_time_3_start_hour'},
			{txt:'谷期4时间段：',id:'hps_gu_time_4_start_hour'},
			{txt:'谷期5时间段：',id:'hps_gu_time_5_start_hour'},
		]
	},
	created:function(){
		
	},
	mounted:function(){
		
	},
	methods:{
		
	}
});