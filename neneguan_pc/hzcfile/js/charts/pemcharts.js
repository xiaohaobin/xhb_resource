$(function(){
   
// 实时监控-电流趋势
 

// 时段监控-用电组成电表（饼型图形）
// 时段监控-用电组成电表-饼型图形1
$('.Timeinterval_charts1').highcharts({
    credits: {//禁用版权信息
        enabled:false
    },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'none',
        marginBottom: 120,// 底部边距
    },
    title: {
        text: null
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                distance:-50,//数据在里面的距离
                format: '<b>{point.y}元</b>',
                style: {
                    color:'#112e5b',
                    fontSize:'12px'
                },
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        type: 'pie',
        data: [
            {
                name: '实际费电',
                y: 30,
                color:'#3e90e3',
                // sliced: true,//突出某一块
                // selected: true
            },
            {
                name: '预计费电',
                y: 25.8,
                color:'#d6bb06'
            },
            {
                name: '节约费电',
                y: 12.8,
                color:'#15dc22'
            }
        ]
    }]
});
//  时段监控-用电组成电表-饼型图形二
$('.Timeinterval_charts2').highcharts({
    credits: {//禁用版权信息
        enabled:false
    },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'none',
        marginBottom: 120,// 底部边距
    },
    title: {
        text: null
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                distance:-50,//数据在里面的距离
                format: '<b>{point.y}元</b>',
                style: {
                    color:'#112e5b',
                    fontSize:'12px'
                },
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        type: 'pie',
        data: [
            {
                name: '实际费电',
                y: 30,
                color:'#3e90e3',
                // sliced: true,//突出某一块
                // selected: true
            },
            {
                name: '预计费电',
                y: 25.8,
                color:'#d6bb06'
            },
            {
                name: '节约费电',
                y: 12.8,
                color:'#15dc22'
            }
        ]
    }]
});
//  时段监控-用电组成电表-饼型图形三
$('.Timeinterval_charts3').highcharts({
    credits: {//禁用版权信息
        enabled:false
    },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'none',
        marginBottom: 120,// 底部边距
    },
    title: {
        text: null
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                distance:-50,//数据在里面的距离
                format: '<b>{point.y}元</b>',
                style: {
                    color:'#112e5b',
                    fontSize:'12px'
                },
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        type: 'pie',
        data: [
            {
                name: '实际费电',
                y: 30,
                color:'#3e90e3',
                // sliced: true,//突出某一块
                // selected: true
            },
            {
                name: '预计费电',
                y: 25.8,
                color:'#d6bb06'
            },
            {
                name: '节约费电',
                y: 12.8,
                color:'#15dc22'
            }
        ]
    }]
});
//  时段监控-用电组成电表-饼型图形四
$('.Timeinterval_charts4').highcharts({
    credits: {//禁用版权信息
        enabled:false
    },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'none',
        marginBottom: 120,// 底部边距
    },
    title: {
        text: null
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                distance:-50,//数据在里面的距离
                format: '<b>{point.y}元</b>',
                style: {
                    color:'#112e5b',
                    fontSize:'12px'
                },
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        type: 'pie',
        data: [
            {
                name: '实际费电',
                y: 30,
                color:'#3e90e3',
                // sliced: true,//突出某一块
                // selected: true
            },
            {
                name: '预计费电',
                y: 25.8,
                color:'#d6bb06'
            },
            {
                name: '节约费电',
                y: 12.8,
                color:'#15dc22'
            }
        ]
    }]
});


// 时段监控-用电组成电表（柱型图形）
$('.series_data_chart').highcharts({
    credits: {//禁用版权信息
          enabled:false
        },
        chart: {
            type: 'column',
            backgroundColor: 'none',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 0,
                depth: 50,
                viewDistance:20,
            }
        },
         xAxis: {
            categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,],
           gridLineColor:false,
           labels: {
              style: {
                  color: '#bbbbbb',
                  fontSize:'13px'
              }
            },     
        },
         tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}A</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },
        title: {
            text: ''
        },
        yAxis: {
            gridLineColor: '#26749e',//网格线
            title:'null',
            labels: {
                format: '{value}kWh',
                style: {
                    color: '#bbbbbb',
                    fontSize:'13px'
                }
            },
        },
        plotOptions: {
            column: {
                depth:20
            }
        },
        legend: {
            enabled: false//关闭底部按钮
        },
        series: [{
            type: 'column',
            name:'节约费电',
            color:'#15dc22',
            data: [ 176, 135, 148, 216, 194, 95, 54 ,29, 71.5, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54 ,29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54]
        },{
            type: 'spline',//线
            name: '实际用电',
            data: [176, 135, 148, 216, 194, 95, 54 ,29, 71.5, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54 ,29, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
            color:'#2ba4ff',
             marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'//线头小圆形
            }
        },{
            type: 'spline',//线
            name: '预计用电',
            data: [76, 35, 48, 26, 94, 95, 54 ,29, 71, 106, 29, 44, 76, 35, 48, 26, 94, 95, 54 ,29, 71, 106, 29, 14, 76, 35, 48, 16, 94, 95, 54],
            color:'#d6bb06',
             marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'//线头小圆形
            }
        }]

 });


// 发电监控-充放设置
 $('.Discharge_chart').highcharts({
         credits: {//禁用版权信息
          enabled:false
        },
        chart: {
            zoomType: 'xy',
             backgroundColor: 'none',
              marginBottom: 65// 底部边距
        },
        title: {
            text: ''
        },
        xAxis: {
            gridLineDashStyle: 'longdash',//网格线线条样式
            gridLineWidth: 1,//网格线叠层
            gridZIndex: 4,
            gridLineColor: '#266b8f',//网格线
            lineColor: '#266b8f',//x轴的颜色
            tickColor: '#21e0f4',//刻度的颜色
            categories: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
             labels: {
              style: {
                  color: '#ffffff',
                  fontSize:'12px'
              }
            }      
        },
        tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}%</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },
        yAxis: [{
            labels: {
                format: '{value}%',
                style: {
                    color: '#ffffff',
                    fontSize:'12px'
                }
            },
            gridLineColor: '#266b8f',//网格线
            gridLineDashStyle: 'longdash',//网格线线条样式
             title: {
                text: '单位（%）',
                style: {
                  color: '#ffffff',
                  fontSize:'12px'
              }
            }
        }],
        plotOptions: {
            series: {
                stacking: 'normal',
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'//效果
                },
                marker: {
                    fillColor: '',//标点颜色
                    lineWidth: 2,
                    lineColor: '#FFFFFF' // 标点边框颜色
                },
                fillOpacity: 0.7//透明度
            }
        },
        legend: {
             enabled: false
        },
        series: [{
            type: 'area',
            name:"充电",
            data: [31, 21.67, 31, 11, 13, 31, 12, 13, 16, 31,44,28],
            color:'#2f83e4'
        }, {
            type: 'area',
            name:"放电",
            data: [31, 12, 31, 14, 22,13, 28, 27, 61, 14,8,46],
            color:'#4bb158'
        }]
    });
    

// 智能分析-用电质量
// 智能分析-用电质量-三相电流不平衡
 $('.PowQuality_item_chart1').highcharts({
    credits: {//禁用版权信息
          enabled:false
        },
    chart: {
        backgroundColor: 'none',
    },
    title: {
        text: ''
    },
   xAxis: {
        lineColor: '#266b8f',//x轴的颜色
        tickColor: '#21e0f4',//刻度的颜色
        categories: ["2012","2013","2014","2015","2016","2017"],
         labels: {
          style: {
              color: '#dddddd',
              fontSize:'12px'
          }
        }      
    },
    yAxis: {
        title:'null',//左边value
        labels: {
                format: '{value} A',//y轴数据单位
                style: {
                    color: '#ffffff',
                    fontSize:'12px'
                }
            },
        gridLineColor: '#266b8f',//网格线
        gridLineDashStyle: 'longdash',//网格线线条样式
    },
     plotOptions: {
            series: {
                stacking: 'normal',
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'//效果
                },
                marker: {
                    fillColor: '',//标点颜色
                    lineWidth: 2,
                    lineColor: '#FFFFFF' // 标点边框颜色
                },
            }
        },
    tooltip: {
            shared: true,
            useHTML: true,
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}A</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled: false//关闭底部按钮
    },
    series: [{
        name: '电流',
        data: [129, 594, 105, 248, 89, 118],
        color:"#22ff5c"
    }]
 })

// 智能分析-用电质量-三相电压不平衡
 $('.PowQuality_item_chart2').highcharts({
    credits: {//禁用版权信息
          enabled:false
        },
    chart: {
        backgroundColor: 'none',
    },
    title: {
        text: ''
    },
   xAxis: {
        lineColor: '#266b8f',//x轴的颜色
        tickColor: '#21e0f4',//刻度的颜色
        categories: ["2012","2013","2014","2015","2016","2017"],
         labels: {
          style: {
              color: '#dddddd',
              fontSize:'12px'
          }
        }      
    },
    yAxis: {
        title:'null',//左边value
        labels: {
                format: '{value} V',//y轴数据单位
                style: {
                    color: '#ffffff',
                    fontSize:'12px'
                }
            },
        gridLineColor: '#266b8f',//网格线
        gridLineDashStyle: 'longdash',//网格线线条样式
    },
     plotOptions: {
            series: {
                stacking: 'normal',
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'//效果
                },
                marker: {
                    fillColor: '',//标点颜色
                    lineWidth: 2,
                    lineColor: '#FFFFFF' // 标点边框颜色
                },
            }
        },
    tooltip: {
            shared: true,
            useHTML: true,
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}V</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled: false//关闭底部按钮
    },
    series: [{
        name: '电压',
        data: [129, 594, 105, 248, 89, 118],
        color:"#22ff5c"
    }]
 })

// 智能分析-用电质量-三相电压不平衡
 $('.PowQuality_item_chart3').highcharts({
    credits: {//禁用版权信息
          enabled:false
        },
    chart: {
        backgroundColor: 'none',
    },
    title: {
        text: ''
    },
   xAxis: {
        lineColor: '#266b8f',//x轴的颜色
        tickColor: '#21e0f4',//刻度的颜色
        categories: ["2012","2013","2014","2015","2016","2017"],
         labels: {
          style: {
              color: '#dddddd',
              fontSize:'12px'
          }
        }      
    },
    yAxis: {
        title:'null',//左边value
        labels: {
                format: '{value} V',//y轴数据单位
                style: {
                    color: '#ffffff',
                    fontSize:'12px'
                }
            },
        gridLineColor: '#266b8f',//网格线
        gridLineDashStyle: 'longdash',//网格线线条样式
    },
     plotOptions: {
            series: {
                stacking: 'normal',
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'//效果
                },
                marker: {
                    fillColor: '',//标点颜色
                    lineWidth: 2,
                    lineColor: '#FFFFFF' // 标点边框颜色
                },
            }
        },
    tooltip: {
            shared: true,
            useHTML: true,
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}V</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled: false//关闭底部按钮
    },
    series: [{
        name: '电压',
        data: [129, 594, 105, 248, 89, 118],
        color:"#22ff5c"
    }]
 })

// 智能分析-用电质量-功率因数
 $('.PowQuality_item_chart4').highcharts({
    credits: {//禁用版权信息
          enabled:false
        },
    chart: {
        backgroundColor: 'none',
    },
    title: {
        text: ''
    },
   xAxis: {
        lineColor: '#266b8f',//x轴的颜色
        tickColor: '#21e0f4',//刻度的颜色
        categories: ["2012","2013","2014","2015","2016","2017"],
         labels: {
          style: {
              color: '#dddddd',
              fontSize:'12px'
          }
        }      
    },
    yAxis: {
        title:'null',//左边value
        labels: {
                format: '{value}cosΦ',//y轴数据单位
                style: {
                    color: '#ffffff',
                    fontSize:'12px'
                }
            },
        gridLineColor: '#266b8f',//网格线
        gridLineDashStyle: 'longdash',//网格线线条样式
    },
     plotOptions: {
            series: {
                stacking: 'normal',
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'//效果
                },
                marker: {
                    fillColor: '',//标点颜色
                    lineWidth: 2,
                    lineColor: '#FFFFFF' // 标点边框颜色
                },
            }
        },
    tooltip: {
            shared: true,
            useHTML: true,
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}cosΦ</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled: false//关闭底部按钮
    },
    series: [{
        name: '功率因素',
        data: [129, 594, 105, 248, 89, 118],
        color:"#22ff5c"
    }]
 })

// 智能分析-用电质量-负荷
 $('.PowQuality_item_chart5').highcharts({
    credits: {//禁用版权信息
          enabled:false
        },
    chart: {
        backgroundColor: 'none',
    },
    title: {
        text: ''
    },
   xAxis: {
        lineColor: '#266b8f',//x轴的颜色
        tickColor: '#21e0f4',//刻度的颜色
        categories: ["2012","2013","2014","2015","2016","2017"],
         labels: {
          style: {
              color: '#dddddd',
              fontSize:'12px'
          }
        }      
    },
    yAxis: {
        title:'null',//左边value
        labels: {
                format: '{value}W',//y轴数据单位
                style: {
                    color: '#ffffff',
                    fontSize:'12px'
                }
            },
        gridLineColor: '#266b8f',//网格线
        gridLineDashStyle: 'longdash',//网格线线条样式
    },
     plotOptions: {
            series: {
                stacking: 'normal',
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'//效果
                },
                marker: {
                    fillColor: '',//标点颜色
                    lineWidth: 2,
                    lineColor: '#FFFFFF' // 标点边框颜色
                },
            }
        },
    tooltip: {
            shared: true,
            useHTML: true,
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}W</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled: false//关闭底部按钮
    },
    series: [{
        name: '负荷',
        data: [129, 594, 105, 248, 89, 118],
        color:"#22ff5c"
    }]
 })

// 智能分析-用电质量-负荷
 $('.PowQuality_item_chart6').highcharts({
    credits: {//禁用版权信息
          enabled:false
        },
    chart: {
        backgroundColor: 'none',
    },
    title: {
        text: ''
    },
   xAxis: {
        lineColor: '#266b8f',//x轴的颜色
        tickColor: '#21e0f4',//刻度的颜色
        categories: ["2012","2013","2014","2015","2016","2017"],
         labels: {
          style: {
              color: '#dddddd',
              fontSize:'12px'
          }
        }      
    },
    yAxis: {
        title:'null',//左边value
        labels: {
                format: '{value}W',//y轴数据单位
                style: {
                    color: '#ffffff',
                    fontSize:'12px'
                }
            },
        gridLineColor: '#266b8f',//网格线
        gridLineDashStyle: 'longdash',//网格线线条样式
    },
     plotOptions: {
            series: {
                stacking: 'normal',
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'//效果
                },
                marker: {
                    fillColor: '',//标点颜色
                    lineWidth: 2,
                    lineColor: '#FFFFFF' // 标点边框颜色
                },
            }
        },
    tooltip: {
            shared: true,
            useHTML: true,
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}W</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled: false//关闭底部按钮
    },
    series: [{
        name: '总功率',
        data: [129, 594, 105, 248, 89, 118],
        color:"#22ff5c"
    }]
 })


//发电监控/放电设置
$('.Benchmarking_chart').highcharts({
     credits: {//禁用版权信息
      enabled:false
    },
    chart: {
        zoomType: 'xy',
         backgroundColor: 'none',
          marginBottom: 65// 底部边距
    },
    title: {
        text: ''
    },
    xAxis: {
        gridLineDashStyle: 'longdash',//网格线线条样式
        gridLineWidth: 1,//网格线叠层
        gridZIndex: 4,
        gridLineColor: '#266b8f',//网格线
        lineColor: '#266b8f',//x轴的颜色
        tickColor: '#21e0f4',//刻度的颜色
        categories: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
         labels: {
          style: {
              color: '#ffffff',
              fontSize:'12px'
          }
        }      
    },
    tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '<small>{point.key}</small><table>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
        '<td style="text-align: right"><b>{point.y}t</b></td></tr>',
        footerFormat: '</table>',
        valueDecimals: 2
    },
    yAxis: [{
        labels: {
            format: '{value}',
            style: {
                color: '#ffffff',
                fontSize:'12px'
            }
        },
        gridLineColor: '#266b8f',//网格线
        gridLineDashStyle: 'longdash',//网格线线条样式
         title: {
            text: '单位（t）',
            style: {
              color: '#ffffff',
              fontSize:'12px'
          }
        }
    }],
    plotOptions: {
        series: {
            stacking: 'normal',
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'//效果
            },
            marker: {
                fillColor: '',//标点颜色
                lineWidth: 2,
                lineColor: '#FFFFFF' // 标点边框颜色
            },
            fillOpacity: 0.2//透明度
        }
    },
    legend: {
         enabled: false
    },
    series: [{
        type: 'area',
        name:"折算标准煤",
        data: [11, 21.67, 31, 11, 13, 31, 12, 13, 16, 31,44,8],
        color:'#a075ff'
    }, {
        type: 'area',
        name:"实物消耗",
        data: [11, 12, 31, 14, 22,13, 28, 27, 61, 14,8,16],
        color:'#f56577'
    }]
});
    


//智能分析-告警分析
 $('.Alarm_analysis_chart').highcharts({
     credits: {//禁用版权信息
      enabled:false
    },
    chart: {
        zoomType: 'xy',
         backgroundColor: 'none',
          marginBottom: 65,// 底部边距
          marginRight: 45,
    },
    title: {
        text: ''
    },
     tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '<small>{point.key}月份</small><table>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
        '<td style="text-align: right"><b>{point.y}次</b></td></tr>',
        footerFormat: '</table>',
        valueDecimals: 2
    },
    xAxis: {
        lineColor: '#266b8f',//x轴的颜色
        tickColor: '#21e0f4',//刻度的颜色
        categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
         labels: {
          style: {
              color: '#dddddd',
              fontSize:'12px'
          }
        }      
    },
    yAxis: [{
        labels: {
            format: '{value}次',
            style: {
                color: '#dddddd',
                fontSize:'12px'
            }
        },
        gridLineColor: '#266b8f',//网格线
        title:'null'
    }],
    plotOptions: {
        series: {
            stacking: 'normal',
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            },
            fillOpacity: 0.2,//透明度
            //borderRadius: 1//柱形图圆角
        }
    },
    legend: {
        itemDistance: 60,//series的间距
        itemMarginBottom: -20,
        itemStyle: {
            color: '#bbbbbb',
        },itemHoverStyle: {
            color: '#bbbbbb'
        }
    },
    series: [{
        type: 'column',
        name: '采集中断告警',
        data: [25, 31, 11, 31, 31, 11, 11, 31, 41, 21, 11, 31,25, 31, 11, 31, 31, 11, 11, 31, 41, 21, 11, 31,11, 11, 31, 41, 21, 11, 31],
        color:'#22c42f'
    }, {
        type: 'column',
        name: '实时数据超限报警',
        data: [25, 31, 11, 31, 31, 11, 11, 31, 41, 21, 11, 31,25, 31, 11, 31, 31, 11, 11, 31, 41, 21, 11, 31,11, 11, 31, 41, 21, 11, 31],
         color:'#2f75e4'
    }, {
        type: 'column',
        name: '日用电报警',
        data: [25, 31, 11, 31, 31, 11, 11, 31, 41, 21, 11, 31,25, 31, 11, 31, 31, 11, 11, 31, 41, 21, 11, 31,11, 11, 31, 41, 21, 11, 31],
        color:'#ffcf3f'
    }, {
        type: 'column',
        name: '月用电报警',
        data: [25, 31, 11, 31, 31, 11, 11, 31, 41, 21, 11, 31,25, 31, 11, 31, 31, 11, 11, 31, 41, 21, 11, 31,11, 11, 31, 41, 21, 11, 31],
        color:'#ee3c48'
    }, {
        type: 'column',
        name: '年用电报警',
        data: [25, 31, 11, 31, 31, 11, 11, 31, 41, 21, 11, 31,25, 31, 11, 31, 31, 11, 11, 31, 41, 21, 11, 31,11, 11, 31, 41, 21, 11, 31],
        color:'#2fdde4'
    }]
});


// 发电监监控-光伏监控-Photovoltaic_chart1
$('.Photovoltaic_chart1').highcharts({
        credits: {//禁用版权信息
          enabled:false
        },
        chart: {
            type: 'column',
            backgroundColor: 'none',
            marginBottom: 80,// 底部边距
        },
        title: {
            text: null,
            style: {
                    color: '#ffffff',
                    fontSize:'16px'
                }
        },
        xAxis: {
            categories: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月'
            ],
            lineColor: '#266b8f',//x轴的颜色
            tickColor: '#21e0f4',//刻度的颜色
            labels: {
              style: {
                  color: '#ffffff',
                  fontSize:'12px'
              }
            },     
            crosshair: true
        },
        yAxis: {
            labels: {
                format: '{value}kWh',
                style: {
                    color: '#ffffff',
                    fontSize:'12px'
                }
            },
            gridLineColor: '#266b8f',//网格线
            gridLineDashStyle: 'longdash',//网格线线条样式
            title:'null'
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}份</span><table>',
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
                borderRadius: 5//柱形图圆角
            }
        },
        legend: {
            itemDistance: 50,//series的间距
            itemStyle: {
                color: '#bbbbbb',
            },itemHoverStyle: {
                color: '#bbbbbb'
            }
        },
        series: [{
            name: '光伏产出',
            color:"#50ff60",
            data: [49.9, 71.5, 106.4, 129.2, 135.6, 144.0, 176.0, 135.6]
        }, {
            name: '用电消耗',
            color:"#eace2e",
            data: [83.6, 78.8, 98.5, 93.4, 135.6, 106.0, 84.5, 105.0]
        }, {
            name: '电网取电',
            color:"#c36767",
            data: [48.9, 38.8, 39.3, 135.6, 41.4, 47.0, 48.3, 59.0]
        }, {
            name: '来自电池',
            color:"#4b9add",
            data: [42.4, 33.2, 34.5, 135.6, 39.7, 52.6, 75.5, 57.4]
        }]
    });

// 发电监监控-光伏监控-Photovoltaic_chart2
$('.Photovoltaic_chart2').highcharts({
        credits: {//禁用版权信息
          enabled:false
        },
        chart: {
            type: 'column',
             backgroundColor: 'none',
             marginBottom: 80,// 底部边距
        },
        title: {
            text: null,
            style: {
                    color: '#ffffff',
                    fontSize:'16px'
                }
        },
        xAxis: {
            categories: [
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月'
            ],
            lineColor: '#266b8f',//x轴的颜色
            tickColor: '#21e0f4',//刻度的颜色
            labels: {
              style: {
                  color: '#ffffff',
                  fontSize:'12px'
              }
            },     
            crosshair: true
        },
        yAxis: {
            labels: {
                format: '{value}kWh',
                style: {
                    color: '#ffffff',
                    fontSize:'12px'
                }
            },
            gridLineColor: '#266b8f',//网格线
            gridLineDashStyle: 'longdash',//网格线线条样式
            title:'null'
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}份</span><table>',
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
                borderRadius: 5//柱形图圆角
            }
        },
        legend: {
            itemDistance: 50,//series的间距
            itemStyle: {
                color: '#bbbbbb',
            },itemHoverStyle: {
                color: '#bbbbbb'
            }
        },
        series: [{
            name: '充电',
            color:"#50ff60",
            data: [49.9, 71.5, 106.4, 129.2, 135.6, 144.0, 176.0, 135.6]
        }, {
            name: '放电',
            color:"#eace2e",
            data: [83.6, 78.8, 98.5, 93.4, 135.6, 106.0, 84.5, 105.0]
        }]
    });


//发电监控-调度统计
 $('.Scheduling_chart').highcharts({
         credits: {//禁用版权信息
          enabled:false
        },
        chart: {
            zoomType: 'xy',
             backgroundColor: 'none',
        },
        title: {
            text: ''
        },
         tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}A</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },
        xAxis: {
            lineColor: '#266b8f',//x轴的颜色
            tickColor: '#21e0f4',//刻度的颜色
            categories: ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00'],
             labels: {
              style: {
                  color: '#dddddd',
                  fontSize:'12px'
              }
            },
            gridLineWidth: 1,//y轴的网格线
            gridLineColor: '#266b8f',//网格线
            gridLineDashStyle: 'longdash',//网格线线条样式
        },
        yAxis: [{
            labels: {
                format: '{value}A',
                style: {
                    color: '#dddddd',
                    fontSize:'12px'
                }
            },
            gridLineColor: '#266b8f',//网格线
            gridLineDashStyle: 'longdash',//网格线线条样式
            title: {
                text: '单位（A）',
                style: {
                  color: '#dddddd',
                  fontSize:'12px'
              }
            }
        }],
        plotOptions: {
            series: {
                stacking: 'normal',
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'
                },
                 fillOpacity: 0.2
            }
        },
         legend: {
             enabled: false
        },
        series: [{
            type: 'area',
            name: '光伏发电',
            data: [31, 21.67, 31, 111, 13,31, 12, 13, 16, 31,22,33],
            color:'#57ff4b'
        }, {
            type: 'area',
            name: '电网',
            data: [31, 12, 31, 14, 22,13, 28, 27, 61, 14,22,33],
             color:'#ea876c'
        }, {
            type: 'area',
            name: '用电',
            data: [31, 21, 27, 24, 22,32, 18, 77, 54, 44,12,13],
             color:'#ffff16'
        }, {
            type: 'area',
            name: '调度',
            data: [37, 21, 27, 34, 22,32, 58, 77, 54, 44,32,53],
             color:'#ae84ff'
        }]
    });

//发电监控-电池管理
 $('.Battery_chart').highcharts({
         credits: {//禁用版权信息
          enabled:false
        },
        chart: {
            zoomType: 'xy',
             backgroundColor: 'none',
        },
        title: {
            text: ''
        },
         tooltip: {
            shared: true,
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
            '<td style="text-align: right"><b>{point.y}%</b></td></tr>',
            footerFormat: '</table>',
            valueDecimals: 2
        },
        xAxis: {
            lineColor: '#266b8f',//x轴的颜色
            tickColor: '#21e0f4',//刻度的颜色
            categories: ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00'],
             labels: {
              style: {
                  color: '#dddddd',
                  fontSize:'12px'
              }
            },
        },
        yAxis: [{
            labels: {
                format: '{value}A',
                style: {
                    color: '#dddddd',
                    fontSize:'12px'
                }
            },
            gridLineColor: '#266b8f',//网格线
            gridLineDashStyle: 'longdash',//网格线线条样式
            title: {
                text: null,
            }
        }],
        plotOptions: {
            series: {
                stacking: 'normal',
                animation: {
                    duration: 2000,
                    easing: 'easeOutBounce'
                },
                 fillOpacity: 0.2
            }
        },
         legend: {
             enabled: false
        },
        series: [{
            type: 'area',
            name: '实时SOC',
            data: [31, 21.67, 31, 111, 13,31, 12, 13],
            color:'#20ff5a'
        }]
    });


//只能分析-数据对比-同比
$('.Data_compare_chart1').highcharts({
        credits: {//禁用版权信息
          enabled:false
        },
        chart: {
            zoomType: 'xy',
            backgroundColor: 'none'
        },
        title: {text: null},
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            crosshair: true,
            gridLineWidth: 1,//y轴的网格线
            gridLineColor: '#266b8f',//网格线
            gridLineDashStyle: 'longdash',//网格线线条样式
            lineColor: '#266b8f',//x轴的颜色
            tickColor: '#21e0f4',//刻度的颜色
            labels: {
              style: {
                  color: '#ffffff',
                  fontSize:'12px'
              }
            },
        }],
        yAxis: [{ // Primary yAxis  左边y轴坐标
            labels: {
                format: '{value}KWh',
                style: {
                  color: '#ffffff',
                  fontSize:'12px'
                }
            },
            gridLineColor: '#266b8f',//x轴网格线颜色
            title: {
                text: null,
            }
        }, { // Secondary yAxis 右边y轴坐标
            title: {
                text: null,
            },
            gridLineColor: '#266b8f',//x轴网格线颜色
            labels: {
                format: '{value}%',
                style: {
                  color: '#ffffff',
                  fontSize:'12px'
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            series: {
                borderRadius: 5//柱形图圆角
            }
        },
        legend: {
            itemDistance: 120,//series的间距
            itemStyle: {
                color: '#bbbbbb',
            },itemHoverStyle: {
                color: '#bbbbbb'
            }
        },
        series: [{
            name: '今年',
            type: 'column',
            yAxis: 1,//加上ly轴两边单位才能显示
            color:"#22c42f",
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            tooltip: {
                valueSuffix: 'KWh'
            }
        },{
            name: '去年',
            type: 'column',
            yAxis: 1,//加上ly轴两边单位才能显示
            color:"#2f75e4",
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            tooltip: {
                valueSuffix: 'KWh'
            }
        }, {
            name: '同比增长率',
            type: 'spline',
            color:'#00ffff',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            tooltip: {
                valueSuffix: '%'
            }
        }]
    });

//只能分析-数据对比-同比
$('.Data_compare_chart2').highcharts({
     credits: {//禁用版权信息
      enabled:false
    },
    chart: {
        zoomType: 'xy',
         backgroundColor: 'none',
          marginBottom: 35// 底部边距
    },
    title: {
        text: ''
    },
    xAxis: {
        gridLineDashStyle: 'longdash',//网格线线条样式
        gridLineWidth: 1,//网格线叠层
        gridZIndex: 4,
        gridLineColor: '#266b8f',//网格线
        lineColor: '#266b8f',//x轴的颜色
        tickColor: '#21e0f4',//刻度的颜色
        categories: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
         labels: {
          style: {
              color: '#ffffff',
              fontSize:'12px'
          }
        }      
    },
    tooltip: {
        shared: true,
        useHTML: true,
        headerFormat: '<small>{point.key}</small><table>',
        pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
        '<td style="text-align: right"><b>{point.y}t</b></td></tr>',
        footerFormat: '</table>',
        valueDecimals: 2
    },
    yAxis: [{
        labels: {
            format: '{value}',
            style: {
                color: '#ffffff',
                fontSize:'12px'
            }
        },
        gridLineColor: '#266b8f',//网格线
        gridLineDashStyle: 'longdash',//网格线线条样式
         title: {
            text: '单位（t）',
            style: {
              color: '#ffffff',
              fontSize:'12px'
          }
        }
    }],
    plotOptions: {
        series: {
            stacking: 'normal',
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'//效果
            },
            marker: {
                fillColor: '',//标点颜色
                lineWidth: 2,
                lineColor: '#FFFFFF' // 标点边框颜色
            },
            fillOpacity: 0.4//透明度
        }
    },
    legend: {
         enabled: false
    },
    series: [{
        type: 'area',
        name:"空调",
        data: [11, 21.67, 31, 11, 13, 31, 12, 13, 16, 31,44,8],
        color:'#75bfff'
    }, {
        type: 'area',
        name:"供暖",
        data: [11, 12, 31, 14, 22,13, 28, 27, 61, 14,8,16],
        color:'#eee335'
    }]
});

//只能分析-数据对比-同比饼状图
$('.Data_compare_Data_pie').highcharts({
        credits: {//禁用版权信息
          enabled:false
        },
        chart: {
            type: 'pie',
            backgroundColor: 'none',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}%',
                     style: {
                        color:'#dddddd',
                        fontSize:'32px'
                    },
                },
                
            }
        },
        series: [{
            type: 'pie',
            name: '',
            data: [
            {
                name: '空调',
                y: 30,
                color:'#3e90e3',
                sliced: true,//突出某一块
                selected: true
            },
            {
                name: '供暖',
                y: 70,
                color:'#d6bb06'
            },
            ]
        }]
    });
 
})

 