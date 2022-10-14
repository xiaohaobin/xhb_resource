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

//充电：电网到设备前沿线
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


//充电：设备--电池1
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
				1500,
				function(){
					$(".fdgl_liu_jian_3").stop().css({
						"top": "45%",
						"left": "43.33%",
						"transform":" rotate(270deg)",
						"display": "none"
					});
					setTimeout(runAnimateFn_3,500);
				}
			);
		}
	);
}

//充电：设备--电池2
function runAnimateFn_2_1(){
	$(".fdgl_liu_jian_2_1").css({'display':'block'});
	$(".fdgl_liu_jian_2_1").animate(
		{left:'80%'},
		3000,
		'linear',
		function(){
			
			$(".fdgl_liu_jian_2_1").stop().css({
				"left": "43.5%",
				"display": "none"
			});
			
			setTimeout(runAnimateFn_2_1,500);
		}
	);
}

//充电：设备--电池3
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
				{left:'80%'},
				1500,
				function(){
					$(".fdgl_liu_jian_4").stop().css({
						"top": "47%",
						"left": "43.33%",
						"transform":" rotate(90deg)",
						"display": "none"
					});
					setTimeout(runAnimateFn_4,500);
				}
			);
		}
	);
}
//充電動畫
function runAnimateCD(){
	runAnimateFn_1();
	runAnimateFn_2();
	
	runAnimateFn_3();
	runAnimateFn_2_1();
	runAnimateFn_4();
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
		1500,
		'linear',
		function(){
			
			$(".fdgl_liu_jian_7").stop().css({
				"top": "11.07%",
				"transform": "rotate(90deg)",
				"left":"43.38%"
			})
			.animate(
				{top:"45.07%"},
				1500,//箭头下从
				function(){
					$(".fdgl_liu_jian_7").stop().css({
						"top": "46.07%",
						"transform": "rotate(180deg)",
						"left": "43%"
					})
					.animate(
						{left:'32%'},
						1000,
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
									setTimeout(runAnimateFn_7,500);
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
		{left:'32%'},
		4000,
		'linear',
		function(){
			$(".fdgl_liu_jian_8").stop().css({
				"top": "47.07%",
				"transform": "rotate(90deg)",
				"left": "31.6%"
			})
			.animate(
				{top:'80%'},
				2500,
				function(){
					$(".fdgl_liu_jian_8").stop().css({
						"transform": "rotate(180deg)",
						"top": "46.07%",
						"left": "80%"
					});
					setTimeout(runAnimateFn_8,500);
				}
			);
		}
	);	
}

function runAnimateFn_9(){
	$(".fdgl_liu_jian_9").animate(
		{left:'43.9%'},
		1500,
		'linear',
		function(){
			
			$(".fdgl_liu_jian_9").stop().css({
				"top": "83.07%",
				"transform": "rotate(270deg)",
				"left":"43.365%"
			})
			.animate(
				{top:"45.07%"},
				1500,//箭头下从
				function(){
					$(".fdgl_liu_jian_9").stop().css({
						"top": "46.07%",
						"transform": "rotate(180deg)",
						"left": "43%"
					})
					.animate(
						{left:'32%'},
						1000,
						function(){
							$(".fdgl_liu_jian_9").stop().css({
								"top": "47.07%",
								"transform": "rotate(90deg)",
								"left": "31.6%"
							})
							.animate(
								{top:'80%'},
								2500,
								function(){
									
									$(".fdgl_liu_jian_9").stop().css({
										"transform": "rotate(180deg)",
										"top": "84.1%",
										"left": "80%"
									});
									setTimeout(runAnimateFn_9,500);
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
function runAnimateFD(){
	runAnimateFn_5();
	runAnimateFn_6();
	
	runAnimateFn_7();
	runAnimateFn_8();
	runAnimateFn_9();
}
