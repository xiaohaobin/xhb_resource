



//初始化判断时候我的设备超过4个
myDevCountFn();

//电能趋势模拟数据
var PowerTrends_YData = [{
		name: '光伏产出',
		color: "#00ff0a",
		data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 106.4, 129.2, 144.0, 176.0, 135.6]
	}, {
		name: '用户消耗',
		color: "#ff5c0a",
		data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 106.4, 129.2, 144.0, 176.0, 135.6]
	}, {
		name: '电网取电',
		color: "#f4d500",
		data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 106.4, 129.2, 144.0, 176.0, 135.6]
	}, {
		name: '来自电池',
		color: "#2ba4ff",
		data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 106.4, 129.2, 144.0, 176.0, 135.6]
	}];
	
var PowerTrends_XData = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
loadPowerTrendsChart(PowerTrends_XData,PowerTrends_YData);


//异常图表数据
/* unuserlChart("lowerPower",60,"#d0b830",0);
 unuserlChart("equipmentFailure",60,"#ff5656",0);
 unuserlChart("noBalanced",60,"#a776f7",0);
 unuserlChart("equipmentOutLine",60,"#c0bfc2",0);*/



//峰谷数据模拟
var fenggu_x = ['00:00','02:00','04:00','06:00','08:00','10:00','12:00'];
var fenggu_Y = [{
			type: 'column',
			name: '平',
			color: "#00ff0a",
			data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
		}, {
			type: 'column',
			name: '谷',
			color: "#2ba4ff",
			data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4]
		}];
//loadFengguChart(fenggu_x,fenggu_Y);


var fgx_data = [];
var fgy_data = [{
	type: 'column',
	name: '用电',
	data: [],
	color: '#25d028',
	maxPointWidth: 30
}];

loadFengguChart2(fgx_data,fgy_data);

	
/**
 * 异常环形图
 * @param {String} container 图表选择器的id值
 * @param {Number} percentNum 该异常类型数据图表占比（省略百分号，数字类型）
 * @param {String} mainColor 该异常类型的主体颜色
 * @param {Number} nCount 该异常类型的实际次数
 * */
function unuserlChart(container,percentNum,mainColor,nCount){
	var confing = {
       chart: {
              type: 'solidgauge',
              backgroundColor: 'none',
              marginBottom: -3,
              marginTop: -3
          },
          credits: {//禁用版权信息
            enabled:false
          },
          title: {text: null},
          pane: {
              startAngle: 210,//开始度数
              endAngle: 570,//结束度数，两者相差360
              background: [{ // Track for Move
                  outerRadius: '112%',
                  innerRadius: '89%',
                  backgroundColor: '#104867',
                  borderWidth: 0
              }]
          },
          yAxis: {
              min: 0,
              max: 100,
              lineWidth: 0,
              tickPositions: []
          },
          plotOptions: {
              solidgauge: {
                  borderWidth: '2px',
                  dataLabels: {
                      enabled: false
                  },
                  linecap: 'round',
                  stickyTracking: false
              }
          },
		  tooltip:{enabled:false},
          series: [{
              name: "",
              borderColor:mainColor,
              data: [{
                  color: Highcharts.getOptions().colors[0],
                  radius: '100%',
                  innerRadius: '100%',
                  y: percentNum //数据
              }]
          }]
       
    };
	Highcharts.chart(container,confing);
	var _span = $('<span class="doughnutChart_span">'+ nCount +'</span>');
	_span.css("color",mainColor);
	$("#"+container).append(_span);
	
}

systemMainChart("rongliangChart",25,"#5e93ff","#0443af");
systemMainChart("gonglvChart",75,"#11d693","#008759");
/**
 * 系统环形图
 * @param {String} container 图表选择器的id值
 * @param {Number} percentNum 该类型数据图表占比（省略百分号，数字类型）
 * @param {String} mainColor 该类型的主体颜色
 * * @param {String} secondColor 该类型的第二颜色
 * */
function systemMainChart(container,percentNum,mainColor,secondColor){
	if(window.screen.width <= 1440){
		var bW = '5px';
	}else{
		var bW = '8px';
	}
	var confing = {
       chart: {
              type: 'solidgauge',
              backgroundColor: 'none',
              marginBottom: -1,
              marginTop: -1
          },
          credits: {//禁用版权信息
            enabled:false
          },
          title: {text: null},
          pane: {
              startAngle: 210,//开始度数
              endAngle: 570,//结束度数，两者相差360
              background: [{ // Track for Move
                  outerRadius: '112%',
                  innerRadius: '89%',
                  backgroundColor: secondColor,
                  borderWidth: 0
              }]
          },
          yAxis: {
              min: 0,
              max: 100,
              lineWidth: 0,
              tickPositions: []
          },
          plotOptions: {
              solidgauge: {
                  borderWidth: bW,
                  dataLabels: {
                      enabled: false
                  },
                  linecap: 'round',
                  stickyTracking: false
              }
          },
		  tooltip:{enabled:false},
          series: [{
              name: "",
              borderColor:mainColor,
              data: [{
                  color: Highcharts.getOptions().colors[0],
                  radius: '100%',
                  innerRadius: '100%',
                  y: percentNum //数据
              }]
          }]
       
    };
	Highcharts.chart(container,confing);
	var _span = $('<span class="doughnutChart_span_2">'+ percentNum +'%</span>');
	_span.css("color",mainColor);
	$("#"+container).append(_span);
	
}

/**
 * 加载电量趋势图表
 * param {Array} XData X轴数据
 * param {Array} YData Y轴数据
 * */
function loadPowerTrendsChart(XData,YData){
	var confing = {		
		credits: { //禁用版权信息
			enabled: false
		},
		chart: {
			type: 'column',
			backgroundColor: 'none'
		},
		title: {
			text: '',
			style: {
				color: '#ffffff',
				fontSize: '16px'
			}
		},
		xAxis: {
			categories:XData,
			lineColor: '#266b8f', //x轴的颜色
			tickColor: '#21e0f4', //刻度的颜色
			labels: {
				style: {
					color: '#bbbbbb',
					fontSize: '12px'
				}
			},
			crosshair: true
		},
		yAxis: {
			labels: {
				format: '{value}kWh',
				style: {
					color: '#ffffff',
					fontSize: '12px'
				}
			},
			gridLineColor: '#266b8f', //网格线
			gridLineDashStyle: 'longdash', //网格线线条样式
			title: 'null'
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			},
			series: {
				borderRadius: 5, //柱形图圆角
				marker: {
					enabled: true,
					/*数据点是否显示*/
					radius: 4,
					/*数据点大小px*/
				}
			}
		},
		legend: {
			itemDistance: 50, //series的间距
			itemStyle: {
				color: '#bbbbbb',
			},
			itemHoverStyle: {
				color: '#bbbbbb'
			}
		},
		series: YData
	};
	
	$('.Chart1').highcharts(confing);
}

/**
 * 加载峰谷图表
 * param {Array} XData X轴数据
 * param {Array} YData Y轴数据
 * */
function loadFengguChart(XData,YData){
	var confing = {		
		credits: { //禁用版权信息
			enabled: false
		},
		chart: {
			//type: 'column',
			backgroundColor: 'none'
		},
		title: {
			text: '',
			style: {
				color: '#ffffff',
				fontSize: '16px'
			}
		},
		xAxis: {
			categories:XData,
			lineColor: '#266b8f', //x轴的颜色
			tickColor: '#21e0f4', //刻度的颜色
			labels: {
				style: {
					color: '#bbbbbb',
					fontSize: '12px'
				}
			},
			crosshair: true
		},
		yAxis: {
			labels: {
				format: '{value}kWh',
				style: {
					color: '#ffffff',
					fontSize: '12px'
				}
			},
			gridLineColor: '#266b8f', //网格线
			gridLineDashStyle: 'longdash', //网格线线条样式
			title: 'null'
		},
		tooltip: {
			headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
			footerFormat: '</table>',
			shared: true,
			useHTML: true
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			},
			series: {
				borderRadius: 5, //柱形图圆角
				marker: {
					enabled: true,
					/*数据点是否显示*/
					radius: 4,
					/*数据点大小px*/
				}
			}
		},
		legend: {
			itemDistance: 50, //series的间距
			itemStyle: {
				color: '#bbbbbb',
			},
			itemHoverStyle: {
				color: '#bbbbbb'
			}
		},
		series: YData
	};
	
	$('.Environmental_con').highcharts(confing);
}


/**
 * 加载峰谷图表
 * param {Array} XData X轴数据
 * param {Array} YData Y轴数据
 * */
function loadFengguChart2(XData,YData){
	var confing = {
			credits: { //禁用版权信息
				enabled: false
			},
			chart: {
				zoomType: 'xy',
				backgroundColor: 'none',
				marginBottom: 65 // 底部边距
			},
			title: {
				text: ''
			},
			tooltip: {
				shared: true,
				useHTML: true,
				headerFormat: '<small>{point.key}</small><table>',
				pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
					'<td style="text-align: right"><b>{point.y:.1f}kWh</b></td></tr>',
				footerFormat: '</table>',
				valueDecimals: 2
			},
			xAxis: {
				lineColor: '#266b8f', //x轴的颜色
				tickColor: '#21e0f4', //刻度的颜色
				categories: XData,
				labels: {
					style: {
						color: '#dddddd',
						fontSize: '12px'
					}
				}
			},
			yAxis: [{
				labels: {
					format: '{value}kW',
					style: {
						color: '#dddddd',
						fontSize: '12px'
					}
				},
				gridLineColor: '#266b8f', //网格线
				gridLineDashStyle: 'longdash', //网格线线条样式
				title: {
					text: ''
				}
			}, {
				title: {
					text: null
				},
				gridLineColor: '#266b8f', //网格线
				gridLineDashStyle: 'longdash', //网格线线条样式
				max: 100,
				min: 0,
				opposite: true,
				labels: {
					format: "{value}",
					style: {
						color: '#dddddd',
						fontSize: '12px'
					}
				}
			}],
			plotOptions: {
				series: {
					borderRadius: 2, //柱形图圆角
					marker: {
						enabled: true,
						/*数据点是否显示*/
						radius: 2,
						/*数据点大小px*/
					},
					stacking: 'normal', //柱形竖着排
					animation: {
						duration: 2000,
						easing: 'easeOutBounce'
					},
					fillOpacity: 0.2, //柱形透明度
					borderColor: '' //柱形边框色
				},
			},
			legend: {
				itemDistance: 60, //series的间距
				itemStyle: {
					color: '#bbbbbb',
				},
				itemHoverStyle: {
					color: '#bbbbbb'
				}
			},
			series: YData
		};

		
	
	$('.Environmental_con').highcharts(confing);
}

//判断我的设备个数
function myDevCountFn(){
	var len = $(".Pen_Ranking .myDeviceItem").length;
	if(len > 4){
		$('.myDev_dir_btn').removeClass("hide");
	}else{
		$('.myDev_dir_btn').addClass("hide");
	}
}