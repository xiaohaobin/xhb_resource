var deviceDetail = new Vue({
        el: '#deviceDetail',
        data: {
            zhiTypes:[detailLang.batch_sun_room,detailLang.batch_pergola,detailLang.batch_simple,detailLang.batch_glazed_tile,detailLang.batch_royal,detailLang.batch_yuejia,detailLang.batch_huijia,detailLang.batch_wangyu],
            inverterInfo:"",
            incomeDts:"",
            newincomeDts:"",
            collector:{},
            cillectorArr:[],
            inverter:"",
            inverterArr:[],
            tdrillArr:[], // 充电桩
            tdrillTotal:'',//总条数
            tdrillPageTotal:'',//总页数
            max:"",
            maxArr:"",
            storage:"",
            storageArr:[],
            machine:"",
            machineArr:[],
            pcs:"",
            pcsArr:"",
            hps:"",
            hpsArr:"",
            acMachine:"",
            acMachineArr:"",
            tlx:"",
            tlxArr:"",
            charge:"",
            chargeArr:"",
            meter:"",
            meterArr:[],
            pid:{},
            pidArr:[],
            chargeSatusTxt:"",
            paggAll:"",
            lat:undefined,
            lng:undefined,
            localtime:'',//当天时间
            ischangePlant:true,
            warrantyCard:'',
            firstbol:false,
            liDisabled:false,//限制事件控件li被多次点击
            userJson:'',
            usernewJson:'',
            plantJson:'',
            plantnewJson:'',
            plantoldJson:'',
            langjson:{"zh_cn":"中文","en":"English","fr":"Français","ja":"中文","日本語":"In Italiano","ho":"Nederland","tk":"Türkçe","pl":"Polish","gk":"Greek"},
            thisdeviceSn:"",
            errlogNth:'',
            ErrLog:"",
            nthPlant:0,
            numPanelManagement:0,
            panelListTotal:0,
            panelListData:'',
            panelListJson:[],
            newpanelListData:'',
            panelListDatanth:0,
            serviceLogData:'',
            servicelogSelect:1,
            servicelogInput:'',
            langs:$.cookie('lang'),
            plantNth:{
                nth1:0,
                nth2:0,
                nth3:0,
                nth4:0,
                nth5:0,
                nth6:0,
                nth7:0,
                nth8:0,
                nth9:0,
                nth10:0,
                nth11:0
            },
            addPanelbol:false,
            dateNths:1,
            liList:[],
            ParamArr:{
                plantName:[sessionStorage.getItem('plantName')],
                plantId:[plantId],
                serverId:[serverId]
            },
            errpages:0,
            errcurr:0,
            errind:0,
            isCharge:false, //是否选择充电桩
            chargeChild:0, // 默认选择第一个（充电电量）
            chooseTime:0,//对应选择时 日 月 年 （0 1 2 3）
            qianColor:["#666666","#F7B500","#32C5FF","#FA6400","#0EC439","#0091FF","#6DD400","#E02020","#09b9a2"],//枪状态颜色
            gumName:['A','B','C','D','E'],
            //modelList:["不在线","拒绝充电","可用电桩","急停按下","正在充电","准备充电","充电完成","电桩故障","正在预约"],
        	modelList:[detailLang.cdz_not_online,detailLang.cdz_Refuse_to_charge,detailLang.available_electric_piles
	        		,detailLang.cdz_emergency_button,detailLang.cdz_charging,detailLang.cdz_preparing
	        		,detailLang.cdz_Complete_charging,detailLang.malfunction,detailLang.cdz_Schedule_charging],
        },
        computed:{
        	plantCountry(){
        		return this.plantnewJson.country=='中国' ? 'China' : this.plantnewJson.country
        	},
        	plantTimezone(){
        		return this.plantnewJson.country=='中国'||this.plantnewJson.country=='China' ? '8' : this.plantnewJson.timezone;
        	}
        },
        created: function () {
            let _this=this;
            _this.inverterTow(pageId);
            setTimeout(function() {
                _this.getErrLog(1, _this.getDateText(new Date()), _this.getDateText(new Date()), _this.thisdeviceSn, "", true);
            },2)
            setTimeout(function(){
                _this.clicktimeType(".dateSelectUl1",0);
                //时间上一天、下一天
                _this.datatimeSet(".dateControlBox1","newCurtime1");
                _this.datatimeSet(".dateControlBox2"
                    ,"newCurtime2");
            },4)
        },
        mounted:function(){
            let _this=this;
            this.localtime=this.getDateText(mydate);
            this.intitime();//初始时间
            layui.use('laydate', function() {
                //时间
                laydate = layui.laydate;
                laydate.render({
                    elem: '.Curdatetime' //指定元素
                    , calendar: true
                    , max: 0
                    ,done: function(value, date){
                        _this.clicktimeType(".dateSelectUl2",0);
                    }
                });
                laydate.render({
                    elem: '.Curday' //指定元素
                    , calendar: true
                    , type: 'month'
                    , max: 0
                    ,done: function(value, date){
                        $(".Curday").val(value);
                        _this.clicktimeDay(".dateSelectUl2",1);
                    }
                });
                laydate.render({
                    elem: '.Curmonth' //指定元素
                    , calendar: true
                    , type: 'year'
                    , max: 0
                    ,done: function(value, date){
                        $(".Curmonth").val(value);
                        _this.clicktimeMonth(".dateSelectUl2",2);
                    }
                });
                laydate.render({
                    elem: '.Curyear' //指定元素
                    , calendar: true
                    , type: 'year'
                    , max: 0
                    ,done: function(value, date){
                        $(".Curyear").val(value);
                        _this.clicktimeYear(".dateSelectUl2",3);
                    }
                });
                laydate.render({
                    elem: '#val_addDate_creatPlant' //指定元素
                    ,max:0
                    ,calendar: true
                });
                laydate.render({
                    elem: '#falseData' //指定元素
                    ,trigger: 'click'
                    ,calendar: true
                    , max: 0
                    ,range: true
                    ,done: function(value, stdate,ovdate){
                        var obool=false;
                        if(ovdate.year-stdate.year<2){
                            if(ovdate.year-stdate.year==1){
                                if(ovdate.month-stdate.month<-5){
                                    if(ovdate.month-stdate.month==-6){
                                        if(ovdate.date>stdate.date){
                                            obool=true;
                                        }
                                    }
                                }else{
                                    obool=true;
                                }
                            }else{
                                if(ovdate.month-stdate.month<=6){
                                    if(ovdate.month-stdate.month==6){
                                        if(ovdate.date>stdate.date){
                                            obool=true;
                                        }
                                    }
                                }else{
                                    obool=true;
                                }
                            }
                        }else{
                            obool=true;
                        }
                        if(obool){
                            layer.msg(detailLang.new_time_6months);//查询时间范围不能超过6个月
                            return false;
                        }
                        _this.getErrLog(1,value.slice(0,10),value.slice(13,23),_this.thisdeviceSn,"",true);
                    }
                });
            })
            var scroll01,scroll02,scroll03;
            layui.use('carousel', function(){
                var carousel = layui.carousel;
                //建造实例
                scroll01=carousel.render({
                    elem: '#scroll01'
                    ,width: '100%' //设置容器宽度
                    ,height:'94px'
                    ,arrow: 'none'
                    ,interval:5000
                });
                scroll02=carousel.render({
                    elem: '#scroll02'
                    ,width: '100%' //设置容器宽度
                    ,height:'94px'
                    ,arrow: 'none'
                    ,interval:5000
                });
                scroll03=carousel.render({
                    elem: '#scroll03'
                    ,width: '100%' //设置容器宽度
                    ,height:'94px'
                    ,arrow: 'none'
                    ,interval:5000
                });
                _this.scroollmouse($("#scroll01"),scroll01);
                _this.scroollmouse($("#scroll02"),scroll02);
                _this.scroollmouse($("#scroll03"),scroll03);
            });

            $("#getMapSelect").bind('change',function(){
                _this.changeShowMap()
            })

            $("#serchSelect").bind('keyup',function(){//按键点击后
                _this.set_debounce(function(){
                		_this.searchPlantName();
                },1000)
            })
            //免责声明
	        $(document).on('change','label.cha>input[type="checkbox"]',function(){
				var label=$(this).parent();
				for(var i=0;i<label.length;i++){
					if($(this).is(':checked')){
						label.eq(i).addClass('sel');
						$('.all-bottom-btn>.all-bottom-btn1:nth-child(1)').css({'background-color':'#0ec439','color':'#fff'})
					}else if($(this).removeAttr('checked')){
						label.eq(i).removeClass('sel');
						$('.all-bottom-btn>.all-bottom-btn1:nth-child(1)').css({'background-color':'#f2f2f2','color':'#222'})
					}
				}
			})
            //table切换
            $(".deviceNav li").click(function(){
                $(this).addClass("selected").siblings("li").removeClass("selected");
                pageId=1;
                var index=$(this).index();
                $(".lyltableLIsts").hide();
                $(".lyltableLIsts"+(index+1)).show();
            })
            
            //hover小提示
            layui.use('layer',function(){
            	var layer = layui.layer;
            	$(document).on({
					mouseover: function(){
						var overTips = $(this).text();
						layer.tips('<div>'+overTips+'</div>',$(this), {
								  tips: [2, 'white'],
								  time: 0
							});
				    }, 
				    mouseout: function(){ 
				    	layer.tips()
				    }
				},".alias");
            	$(document).on({
					mouseover: function(){
						var overTips = $(this).text();
						layer.tips('<div>'+overTips+'</div>',$(this), {
								  tips: [2, 'white'],
								  time: 0
							});
				    }, 
				    mouseout: function(){ 
				    	layer.tips()
				    }
				},".SN");
            })
            
            layui.use('form', function() {
                var form = layui.form;
                form.render();
                //导出
                form.on('select(export_data)', function (data) {
                    $("#dateType").val(data.value);
                    $("#exportForm").submit();
                });
                form.on('checkbox(brandModel)', function (data) {
                    _this.plantnewJson.brandModel[data.value]=!_this.plantnewJson.brandModel[data.value]
                });
                form.on('checkbox(brandNum)', function (data) {
                    _this.plantnewJson.brandNum[data.value].bool=!_this.plantnewJson.brandNum[data.value].bool;
                });
                form.on('checkbox(supportType)', function (data) {
                    if(data.value==8){
                        _this.plantnewJson.supportType[data.value].bool=!_this.plantnewJson.supportType[data.value].bool
                    }else{
                        _this.plantnewJson.supportType[data.value]=!_this.plantnewJson.supportType[data.value]
                    }

                });
            })
            $(".laynewadd .radioblank").click(function(){
                $(this).addClass("radioActive").siblings().removeClass("radioActive");
                $(this).siblings('.dianya').val($(this).index()-1);
            })
            $(".showMore").click(function(){
                $(this).hide().siblings().show();
            })
            $('#sel_country_creatPlant').change(function(){
                var data= $(this).val();
                $.each(countryMap, function(key,val){
                    if(key.toLowerCase()==data.toLowerCase()){
                        $("#sel_timezone_creatPlant").val(val);
                        $("#sel_timezone_creatPlant option").each(function(){
                            var timezone = $.trim($(this).val());
                            var countryTimezone = val;
                            if(timezone == countryTimezone){
                                _this.plantnewJson.timezone=timezone;
                            }
                        });
                    }
                });
            });
        },
        methods:{
        	
        	/**
        	 * 延迟加载器
        	 * @param {Function} fn 回调函数
        	 * @param {Number} wait 时间（毫秒）
        	 * */
        	set_debounce:function(fn, wait) { //fn指的是函数，wait指的是时间数值（秒）
        		//设定默认的延迟时间
        		wait = wait || 500;
        		//清除定时器
        		keyTimer && clearTimeout(keyTimer);
        		//定时器执行
        		keyTimer = setTimeout(fn, wait);
        	},
        	searchPlantName:function(){
        		var _this = this;
        		$.ajax({
                    url:rootPath+'/deviceManage/searchLikeDIPlant',
                    data:{accountName:'',plantName:$("#serchSelect").val()},
                    success:function(data){
                        _this.liList=data;
                        $("#serchUiList").show();
                        $(document).one("click", function(e){
                            $("#serchUiList").hide();
                            e.stopPropagation();
                        });
                    }
                });
        	},
            //点击光伏发电信息
	        generElect(){
	          var _this=this;
	          _this.isCharge = false;
	          _this.clicktimeType(".dateSelectUl1",0);
	        },
	        //点击充电桩数据
	        chargeData(){
            var _this=this;
            // 默认选择日
            _this.chooseTime = 1
            
		    $(".dateSelectUl1").find("li").eq(1).addClass("cur").siblings("li").removeClass("cur");
            $(".dateSelectUl").next(".calendarSelect").find("input").eq(1).show().siblings("input").hide();
		    // 默认打开充电电量/费用
		    _this.isCharge = true
            _this.chargeChild = 0
            _this.getChargeData();
	        },
            //点击充电电量/费用
	        cost(){
		        this.chargeChild = 0;
                this.getChargeData();
	        },
	        //点击自发自用
	        self(){
		        this.chargeChild = 1;
                this.getChargeData();
	        },
            //请求充电桩下的数据并显示
            getChargeData(){
            var _this = this
            var requestType = _this.chargeChild == 0 ? 0 : 1;
            var type = _this.chooseTime;
            var year = $(".calendarSelect input").eq(type).val();
            var Paramdata={cmd:"d_record",siteId:plantId,date:year,type : type-1,requestType};
            $.ajax({
                url: ODMPARAMS.chargerURL+'/ocpp/tcharg/tdrill',
                type:'post',
                dataType:'json',
                data:Paramdata,
                success:function(data){
                    var odatas=[];
                    var money = []; //保存金额
                    var energy = []; //保存发电量
                    var consume = []; //保存自发自用
                    var arr = [];//存x轴
                    var list = data.data
                    list.forEach(item=>{
                        arr.push(item.t.toString())
                        money.push(item.money)
                        energy.push(item.energy)
                        consume.push(item.rate)
                    })
                    arr.reverse()
                    money.reverse()
                    energy.reverse()
                    consume.reverse()
                    var unit1="kWh";
                    var unit2=data.symbol;
                    var unit3="%";
                    var series1=[{
                                name: detailLang.cdz_Charge,
                                type: 'column',
                                unit:unit1,
                                data: energy
                            },{
                                name:  detailLang.lzq_charging_fee,
                                type: 'spline',
                                unit:unit2,
                                data: money,
                                yAxis: 1
                    }];

                    var series2=[{
                                name:  detailLang.cdz_Spontaneous_use,
                                type: 'areaspline',
                                unit:unit3,
                                data: consume,
                                yAxis: 1
                    }];   

                    var series = _this.chargeChild == 0 ? series1 : series2
                    if(_this.chargeChild == 0){
                        _this.highchartsFour("ChadisChart",series1,(year==""?new Date().getFullYear():year)+detailLang.year,arr);
                    }else{
                        _this.highchartsSelf("ChadisChart",series2,(year==""?new Date().getFullYear():year)+detailLang.year,arr);
                    }
            }
            })
            },
            //点击（充电量/费用 ）触发的图形
	        highchartsFour: function (_id,series,year,arr) {
                let _this=this;
                var chart = Highcharts.chart(_id, {
                    colors: ['#03cb8c', '#F7B500', '#01c8b3', '#0dcf8d'],
                    title:{
                        text:detailLang.cdz_Charge+'(kWh)',
                        align:'left',
                        style:{
                            "color": "#666666", "fontSize": "14px"
                        },
                        y:24
                    },
                    chart:{
                        marginTop:60,
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                    	categories:arr
                    },
                    yAxis: [
                        {
                        min: 0,
                        title: {
                            text: ''
                        },
                        labels: {
                            format: '{value}'
                        }
                    }, {
                        title: {
                            text: detailLang.lzq_charging_fee+'(￥)'
                        },
                        labels: {
                            format: '{value}'
                        },
                        opposite: true
                    }
                ],
                    
                    tooltip: {
                        headerFormat:'<span>{point.key}</span><br/>',
                        pointFormat: '{series.name}: <b>{point.y:.2f}</b> {series.userOptions.unit}',
                    },
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        // y: 20,
                        floating: false,
                        borderWidth: 0,
                        itemStyle : {
                            'fontSize' : '14px'
                        }
                    },
                    lang: {
						noData: detailLang.no_data//暂无数据 
					},
					noData: { 
						style: { 
						fontWeight: '400', 
						fontSize: '16px', 
						} 
					},
                    series:series
                })
            },
             //点击自发自用触发的图形
	        highchartsSelf: function (_id,series,year,arr) {
                let _this=this;
                var chart = Highcharts.chart(_id, {
                //主要是通过 plotOptions 来设置区域显示
                plotOptions: { 
                    area:{ 
                        color:'#0055cc'
                    },
                    //设置区域的透明度 fillOpacity: num 最大为1
                    series: {
                        fillOpacity: 0.1
                    }
                },
                    colors: ['#03cb8c', '#F7B500', '#01c8b3', '#0dcf8d'],
                    title:{
                        text:detailLang.cdz_Spontaneous_use+':%',
                        align:'left',
                        style:{
                            "color": "#666666", "fontSize": "14px"
                        },
                        y:24
                    },
                    chart:{
                        marginTop:60,
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                    	categories:arr
                    },
                    yAxis: [{
                        min: 0,
                        title: {
                            text: ''
                        },
                        labels: {
                            format: '{value}'
                        }
                    }, {
                        title: {
                            text: '',
                        },
                        
                    }],
                    
                    tooltip: {
                        headerFormat:'<span>{point.key}</span><br/>',
                        pointFormat: '{series.name}: <b>{point.y:.2f}</b> {series.userOptions.unit}',
                    },
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        floating: false,
                        borderWidth: 0,
                        itemStyle : {
                            'fontSize' : '14px'
                        }
                    },
                    lang: {
						noData: detailLang.no_data//暂无数据 
					},
					noData: { 
						style: { 
						fontWeight: '400', 
						fontSize: '16px', 
						} 
					},
                    series:series
                })
            },
        	creatPlantFocus(city){
        		var thisval=city;
        		$.each($("#cityListUl li"),function(i,d){
        			if(thisval=="" || $(d).text().indexOf(thisval)!="-1"){
        				$(d).show()
        			}else{
        				$(d).hide()
        			}
        		})
        		$("#cityListUl").show()
        	},
        	creatPlantBlur:function(){
        		setTimeout(function(){$("#cityListUl").hide()},200)
        	},
        	fanbools:function(){
        		var dontims=[
        			{"startTime":"2020.3.08 00:00","endTime":"2020.11.01 00:00"},
        			{"startTime":"2021.3.14 00:00","endTime":"2021.11.07 00:00"},
        			{"startTime":"2022.3.13 00:00","endTime":"2022.11.06 00:00"},
        			{"startTime":"2023.3.12 00:00","endTime":"2023.11.05 00:00"},
        			{"startTime":"2024.3.10 00:00","endTime":"2024.11.03 00:00"},
        			{"startTime":"2025.3.09 00:00","endTime":"2025.11.02 00:00"},
        			{"startTime":"2026.3.08 00:00","endTime":"2026.11.01 00:00"},
        			{"startTime":"2027.3.14 00:00","endTime":"2027.11.07 00:00"},
        			{"startTime":"2028.3.12 00:00","endTime":"2028.11.05 00:00"},
        			{"startTime":"2029.3.11 00:00","endTime":"2029.11.04 00:00"},
        			{"startTime":"2030.3.10 00:00","endTime":"2030.11.03 00:00"},
        		]
        		var oboos=false;
        		$.each(dontims,function(i,d){
        			if(new Date().getTime()>new Date(d.startTime).getTime() && new Date().getTime()<new Date(d.endTime).getTime())oboos=true;
        		})
        		return oboos
        	},
            getCont:function(ptName,ptId,svId){
                let _this=this;
                var ov=ptName;
                _this.liDisabled = false;
                $("#serchSelect").val(ov);
                $("#serchUiList").hide();
                if(_this.ParamArr.plantName.length >= 8){
                	return dialogTips(detailLang.add_up_to_power_stations);
                }
                for (var i = 0; i <_this.ParamArr.plantName.length; i++) {
                    if (_this.ParamArr.plantName[i].indexOf(ov) >= 0) {
                        return;
                    }
                }
                _this.ParamArr.plantName.push(ptName);
                _this.ParamArr.serverId.push(svId);
                _this.ParamArr.plantId.push(ptId);
                var type="",URL="";
                var typename=$(".dateSelectUl .cur").text();
                if(typename==detailLang.time_tow){
                    type=0;
                    _this.plantContrast(type,_this.ParamArr,'day');
                }
                if(typename==detailLang.date_sunday){
                    type=1;
                    _this.plantContrast(type,_this.ParamArr,'month');
                }
                if(typename==detailLang.month){
                    type=2;
                    _this.plantContrast(type,_this.ParamArr,'year');
                }
                if(typename==detailLang.year){
                    type=3;
                    _this.plantContrast(type,_this.ParamArr,'total_5');
                }
            },
            plantContrast:function(type,ParamArr,param){//当日发电量
                var _this=this;
            	if(_this.liDisabled){
            		return false;
            	}
            	_this.liDisabled = true;
                _this.chooseTime = type
                $(".dateSelectUl").find("li").eq(type).addClass("cur").siblings("li").removeClass("cur");
                $(".dateSelectUl").find("li").eq(type).addClass("").siblings("li").addClass("timeSet");
                $(".dateSelectUl").next(".calendarSelect").addClass("timeSet");
                $(".dateSelectUl").next(".calendarSelect").find("input").eq(type).attr("disabled","disabled");
                $(".dateSelectUl").next(".calendarSelect").find("input").eq(type).show().siblings("input").hide();
                var year = $(".calendarSelect input").eq(type).val();
                var Paramdata="";
                var dataArr = [];
                var ajaxNth=0;
                var requestType = _this.chargeChild == 0 ? 0 : 1
                // 请求充电桩数据
                if(_this.isCharge){
                    _this.getChargeData();
                }else{
                    $.each(_this.ParamArr.serverId,function(v,json){
                    Paramdata={serverId:_this.ParamArr.serverId[v],plantId:_this.ParamArr.plantId[v],date:year,param:param};
                    var parName=_this.ParamArr.plantName[v];
                    var odatajson={name:"",type:"",data:[]};
                    dataArr.push(odatajson);
                    var arr = [];
                    $.ajax({
                        url: rootPath+'/deviceManage/getDevicesChartData',
                        type:'post',
                        dataType:'json',
                        data:Paramdata,
                        success:function(data){
                        	var odatas=[];
                            if(type==0){
                                dataArr[v].name=parName;
                                dataArr[v].type="area";
                                $.each(data.day,function(k,datas){
                                    if(k<120){
                                        if(k%12<2){
                                            arr.push("0"+parseInt(k/12)+":0"+k%12*5)
                                        }else{
                                            arr.push("0"+parseInt(k/12)+":"+k%12*5)
                                        }

                                    }else{
                                        if(k%12<2){
                                            arr.push(parseInt(k/12)+":0"+k%12*5)
                                        }else{
                                            arr.push(parseInt(k/12)+":"+k%12*5)
                                        }
                                    }
                                    dataArr[v].data.push(datas);
                                })
                            }else if(type==1){
                                dataArr[v].name=parName;
                                dataArr[v].type="column";
                                $.each(data.month,function(k,datas){
                                    $.each(datas,function(j,z) {
                                        arr.push(j);
                                        dataArr[v].data.push(z);
                                    })
                                })
                            }else if(type==2){
                                dataArr[v].name=parName;
                                dataArr[v].type="column";
                                $.each(data.year,function(k,datas){
                                    $.each(datas,function(j,z) {
                                        arr.push(j);
                                        dataArr[v].data.push(z);
                                    })
                                })
                            }else if(type==3){
                                dataArr[v].name=parName;
                                dataArr[v].type="column";
                                $.each(data.total,function(k,datas){
                                    arr.push(k);
                                    dataArr[v].data.push(datas);
                                })
                            }
                            ajaxNth++;
                            if(ajaxNth==_this.ParamArr.serverId.length){
                                _this.highchartsshow(dataArr,arr,type);
                            }
                            var clickTimer = null;
                            clickTimer = setTimeout(function(){
                            	_this.liDisabled = false;
                            	$(".dateSelectUl").find("li").removeClass("timeSet");
                            	$(".dateSelectUl").next(".calendarSelect").removeClass("timeSet");
                            	$(".dateSelectUl").next(".calendarSelect").find("input").eq(type).removeAttr("disabled")
                            	clearTimeout();
                            },8000)
                        }
                    })
                })
                _this.dateNths=1;
                }
            },
            timeLimit:function(obj,type){
            	let _this = this;
            	var clickTimer = null;
            	$(obj).find("li").eq(type).addClass("").siblings("li").addClass("timeSet");
                $(obj).next(".calendarSelect").addClass("timeSet");
                $(obj).next(".calendarSelect").find("input").eq(type).attr("disabled","disabled");
                clickTimer = setTimeout(function(){
                	_this.liDisabled = false;
                	$(obj).find("li").removeClass("timeSet");
                	$(obj).next(".calendarSelect").removeClass("timeSet");
                	$(obj).next(".calendarSelect").find("input").eq(type).removeAttr("disabled")
                	clearTimeout();
                },8000)
            },
            highchartsshow:function(dataArr,childData,type){
                
            	if(type!=0){
	                $.each(dataArr,function(k,datas){
	                    $.each(datas.data,function(j,jsons){
	                        if(jsons==null)dataArr[k].data[j]=0
	                    })
	                })
            	}else{
	            	var oArr=true,oChild=true;
	            	var ostart=0,oend=dataArr[0].data.length-1;
	            	var datasLength=[];
	            	var startJson=[],endJson=[];
	            	$.each(dataArr,function(i,d){
		                for(var i=0;i<dataArr[0].data.length;i++){
		                    if(dataArr[0].data[i]!=null && dataArr[0].data[i]!=0 && oArr){
		                    	oArr=false;
		                    	ostart=i;
		                    }
		                }
		                startJson.push(ostart)
		                for(var i=dataArr[0].data.length-1;i>=0;i--){
		                    if(dataArr[0].data[i]!=null && dataArr[0].data[i]!=0 && oChild){
		                    	oChild=false;
		                    	oend=i;
		                    }
		                }
		                endJson.push(oend)
	            	})
	            	ostart=Math.min.apply(null,startJson)
	            	oend=Math.max.apply(null,endJson)
	            	$.each(dataArr,function(i,d){
	                	dataArr[i].data=dataArr[i].data.slice(ostart,oend)
	            	})
	                childData=childData.slice(ostart,oend)
            	}
                $('.ChadisChart').highcharts({
                    credits: {//禁用版权信息
                        enabled:false
                    },
                    chart: {
                        zoomType: 'xy',
                        type: 'spline',
                        backgroundColor: 'none',
                        marginBottom: 65// 底部边距
                    },
                    colors: ['#03cb8c', '#F7B500', '#01c8b3', '#0dcf8d'],
                    title: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        gridLineColor: '#f2f2f2',//网格线
                        lineColor: '#f2f2f2',//x轴的颜色
                        tickColor: '#f2f2f2',//刻度的颜色
                        minTickInterval:type==0?30:0,
                        categories: childData,
                        labels: {
                            style: {
                                color: '#888888',
                                fontSize:'12px'
                            }
                        }
                    },
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        headerFormat: '<small style="color:#182653">{point.key}</small><table style="color:#182653">',
                        pointFormat: '<tr><td style="white-space:nowrap">{series.name}: </td>' +
                            '<td style="text-align: right"><b>{point.y:.2f}</b></td></tr>',//保留两位小数点
                        footerFormat: '</table>',
                        valueDecimals: 2
                    },
                    yAxis: [{
                        min: 0,
                        title: {
                            text: type==0?'(W)':'(KWh)'
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: '#888888',
                                fontSize:'12px'
                            }
                        },
                        gridLineColor: '#f2f2f2'//网格线
                    }],
                    plotOptions: {
                        series: {
                            animation: {
                                duration: 2000,
                                easing: 'easeOutBounce'
                            },
                            fillOpacity: 0.08,
                            borderRadius: 3,
                            lineWidth:2,
                            marker: { enabled: false } //关掉实心点
                        }
                    },
                    series:dataArr,
                    noData: {
                        style: {
                            fontSize: '12px',
                            color: '#666666'
                        }
                    }
                });
            },
            scroollmouse:function(_id,sccrollName){
                var startX;
                _id.on("mousedown", function (e) {
                    startX = e.pageX;//开始坐标X
                    $(this).on('mouseout', function (e) {
                        return false;
                    });
                });
                _id.on('mouseup', function (e) {
                    var endX = e.pageX;//结束坐标X
                    e.stopPropagation();//停止DOM事件逐层往上传播
                    if (endX - startX > 30) {
                        sccrollName.slide("sub");
                    }
                    else if (startX - endX > 30) {
                        sccrollName.slide("add");
                    }
                    startX=undefined;
                });
            },
            showSign:function(obj,text){//提示，文本省略提示完整信息
                layui.use('layer', function() {
                    var layer = layui.layer;
                    layer.tips(text, $(obj),{time:5000});
                })
            },
            radioactives:function(active,text){
                var _this=this;
                _this.plantnewJson.active=text;
            },
            //进入充电桩详情页面
		  	replyFour:function (url,deviceSn,deviceType,serverId,dCode,deviceNth,modelText,qNum,nominal_power,installDate){
				var plantName =  sessionStorage.getItem('plantName')
		  		if(deviceType==null||deviceType==""||deviceType==undefined||deviceType=="null"||deviceType=="undefined"){
		    		deviceType=1;
		    	}
		    	if(serverId==null||serverId==""||serverId==undefined||serverId=="null"||serverId=="undefined"){
		    		return;
		    	}		    	
		    	if(installDate.length>10)
		    		installDate = installDate.substr(0,10);
		    	
		    	openWindow(url,{deviceSn:deviceSn,deviceType:deviceType,serverId:serverId,dCode:userId,deviceNth:deviceNth,modelText:modelText,qNum:qNum
		    		,nominal_power:nominal_power,installDate:installDate,plantName:plantName});
		  	},
		  	/* 充电桩 */
            //设置
            clickSetCdz:function(deviceSN){
	
		  layer.open({
				type: 2,
				title:detailLang.setting,
				area: ['auto', 'auto'],
				content:ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setChargingPile?type=OSS&lang='+(LANG!='ft'?LANG:"hk")+'&ChargingPileSn='+deviceSN+'&jobId='+JOBID,
				btn: [detailLang.cancel],
			 	  success:function(){
			 		    $(".layui-layer[type=iframe]").addClass("btn-grayBox")
						$(".layui-layer-content>iframe").css({"height": parseInt($(".btn-grayBox").css("height"))*1-42+'px'})
						//$("#setDevice .bottonBg .buttonNO").css({"visibility": "hidden"})//隐藏取消按钮		
				  }
	 	    });
			event.stopPropagation();
			},
			//编辑
            clickEditCdz:function(sn,name){
				var el = event.currentTarget;
                $("#val_sn_plantEditInv").val(sn);
                $("#val_alias_plantEditInv").val(name);
                $("#errMsg_plantEditInv").text('');
				dialogContent({
					title:detailLang.edit+'('+sn+')',
					content:$('#dialog_plant_editInv'),
					onBtn:0,
					btns:{'i18n_confirm':function(){
						$("#errMsg_plantEditInv").text('');
						var name = $.trim($("#val_alias_plantEditInv").val());
						$.ajax({
							url:ODMPARAMS.chargerURL+'/ocpp/tcharg/tdrill',
							data:{lan:"0",cmd:"d_rename",chargeId:sn,name:name},
							beforeSend : function(){
								dialogLoading(2,-1);
							},
							complete:function(){
								dialogLoadingClose();
							},
							success:function(data){
								if(data.code==0){
									dialogClose();
									dialogMsg(getI18n('operat_susccess'));
									$(el).parent().parent().find('.name').text(name);
								}else{
									dialogMsg(getI18n('operat_err'));
								} 
							},
							error:function(XMLHttpRequest, textStatus, errorThrown){
								if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
									dialogTips(getI18n('timeout'));
							}
						});
					},'i18n_cancel':dialogClose}
				})
				$("#val_alias_plantEditInv").focus();
				event.stopPropagation();
			},
			// 解绑
			clickUnboundCdz:function(sn,userId){
				   var that = this
				   var data = {"cmd": "deleteCharge","chargeId":sn,"sn":sn,"prefix":"","userId":userId,"url":""}
				    dialogMsg(
				    '('+sn+')'+'—'+detailLang.username+'('+userId+')，'+detailLang.sure_unbound+'？', function () {
		                $.ajax({
		                	url: "https://energy.growatt.com/room/",
		                    timeout: 1000 * 18,
		                    contentType:"application/json",
		                    data: JSON.stringify(data),
		                    beforeSend: function () {
		                        dialogLoading(1, -1);
		                    },
		                    complete: function () {
		                 	   dialogLoadingClose();
		                    },
		                    success: function (data) {
		                        dialogClose();
		                        if (data.code == 0) {
		                            dialogMsg(getI18n('operat_susccess'));
		                            that.tdrillList(1)
		                        } else {
		                            dialogMsg(getI18n('operat_err'));
		                        }
		                    },
		                    error: function (XMLHttpRequest, textStatus, errorThrown) {
		                        dialogLoadingClose();
		                        if (!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
		                            dialogTips(getI18n('timeout'));
		                    }
		                });
		            });
			},
			// 解锁
			clickUnlockCdz:function(SN,qNth){
				$(".qianEditDialogs .qian").hide();
				for(var i=0;i<qNth;i++){
					$(".qianEditDialogs .qian").eq(i).show();
				}
				$.ajax({
					url:ODMPARAMS.chargerURL+'/ocpp/tcharg/tcharge',
					timeout:1000*18,
					type:"post",
					data:{
					    "cmd":"unlock_all",
					    "chargeId":SN
					  },
					beforeSend : function(){
						dialogLoading(1,-1);
					},
					complete:function(){
						dialogLoadingClose();
					},
					success:function(data){
						if(data.data.length>0){
							$(".qianEditDialogs input").eq(i).removeAttr("checked")
							$.each(data.data,function(i,d){
								if(d.status=="locked"){
									$(".qianEditDialogs .qian").eq(i).show();
								}else{
									//$(".qianEditDialogs input").eq(i).attr("checked",true)
									//$(".qianEditDialogs .qian").eq(i).show();
								}
							})
						}else{
							$(".qianEditDialogs input").removeAttr("checked")
						}
						layui.form.render();
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
							dialogTips(getI18n('timeout'));
					}
				});
				dialogContent({
					title:detailLang.Unlock,
					content:$(".qianEditDialogs"),
					onBtn:0,
					btns:{'i18n_confirm':function(){
						let connectorAlls='';
						$.each($(".qianEditDialogs .qian"),function(i,d){
							if($(d).find(".layui-form-checkbox").hasClass("layui-form-checked")){
								if(connectorAlls.length==0){
								connectorAlls+=(i+1)+'';
								}
								else {
								connectorAlls+=','+(i+1)
								}
							}
						})
						if(connectorAlls.length==0){
							dialogTips('请勾选解锁')
							return false
						}
						$.ajax({
							url:ODMPARAMS.chargerURL+'/ocpp/tcharg/tcharge',
							timeout:1000*18,
							type:"post",
							data:{
							    "cmd":"unlock",
							    "chargeId":SN,
							    "connectorAll":connectorAlls,
							    "lan":"0"
							},
							beforeSend : function(){
								dialogLoading(1,-1);
							},
							complete:function(){
								dialogLoadingClose();
							},
							success:function(data){
								if(data.code==0){
								    dialogTips(getI18n(data.data));
									dialogClose();
								}else{
									dialogMsg(data.data);
								}
								
							},
							error:function(XMLHttpRequest, textStatus, errorThrown){
								if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
									dialogTips(getI18n('timeout'));
							}
						});
					},'i18n_cancel':dialogClose}
				});
			},
			//删除充电桩
            clickDelCdz:function(chargeId){
                var that = this
                var list = []
                list.push(chargeId)
				dialogMsg(detailLang.sure_delete+'?',function(){
					$.ajax({
						url:'chargerManage/del',
						timeout:1000*18,
            			data:{deviceSn:JSON.stringify(list)},
						beforeSend : function(){
							dialogLoading(1, -1);
						},
						complete:function(){
							dialogLoadingClose();
						},
						success:function(data){
							dialogClose();
							if(data.code==0){
								dialogMsg(detailLang.successfully_deleted);
								that.tdrillList(1)
							}else{
								dialogMsg(getI18n('operat_err'));
								dialogTips(getI18n('timeout'));
							} 
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							dialogLoadingClose();
							if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
								dialogTips(getI18n('timeout'));
						}
					});
				});
				event.stopPropagation();
			},
            reply:function(url,deviceSn,deviceType){
            	var type=deviceType;
            	if (type == 16)
            		type = 1;
                else if (type == 18)
                	type = 6;
                else if (type == 170)
                	type = 7;
                else if (type == 171)
                	type = 8;
                else if (type == 22)
                	type = 9;
                window.open(rootPath+url+"?deviceSn="+deviceSn+"&deviceType="+type+"&serverId="+serverId+"&dCode="+usercode+"&deviceNth="+deviceType,"_blank");
            },
            inverterTow:function(){
                let _this=this;
                var thislang;
                if($.cookie("lang")=="cn"){
                    thislang="cn"
                }else{
                    thislang=$.cookie("lang");
                }
                if(location.search.split('&')[0].slice(7)=='Aftersales'){
                	$.ajax({
                		url: rootPath+'/deviceManage/afterSalePlantDetails',
                        headers:{"oss.userName":userName},
                        type:'post',
                        async:false,
                        dataType:'json',
                        data:{serverId:serverId,plantId:plantId},
                        success:function(data){
                            if(data){
                                _this.incomeDts=data.obj;
                                _this.newincomeDts=JSON.parse(JSON.stringify(_this.incomeDts));
                            }
                        }
                	})
                }else if(location.search.split('&')[0].slice(7)=='distributor'){
					$.ajax({
                        url: ODMPARAMS.getServerProtocol(serverUrl)+'/pubData.do?op=plantDetails',
                        headers:{"oss.userName":userName},
                        type:'post',
                        async:false,
                        dataType:'json',
                        data:{plantId:plantId,code:code,type:type,lang:thislang},
                        success:function(data){
                            if(data){
                                _this.incomeDts=data.obj;
                                _this.newincomeDts=JSON.parse(JSON.stringify(_this.incomeDts));
                            }
                        }
                    });
                }
                setTimeout(function(){
                    $.ajax({
                        url: rootPath+'/deviceManage/powerStationInformation',
                        type:'post',
                        async:false,
                        dataType:'json',
                        data:{serverId:serverId,plantId:plantId},
                        success:function(data){
                            _this.inverterInfo=data;
                            _this.inverterInfo.createDate=_this.inverterInfo.createDate!=undefined?ODMPARAMS.convertDate(_this.inverterInfo.createDate):_this.inverterInfo.createDate;
                            if(toView=='true'){
                            	chartsName=data.plantName;
                            }else{
                            	chartsName=getChangeNameRule(data.plantName);
                            }
                        }
                    });
                },2)
                setTimeout(function(){
                    _this.inverterList(1);
                    _this.collectorList(1);
                    _this.storageList(1);
                    _this.machineList(1);
					_this.meterList(1);
					_this.tdrillList(1);
					_this.pidList(1);
                },6)
            },
            getDateText:function(time){//2018-5-22
                var d=new Date(time);
                return d.getFullYear()+'-'+addZero(d.getMonth()+1)+'-'+addZero(d.getDate());
            },
            panelListClick:function(index){
                $(".panel-dialog-con tbody tr").removeClass("eidts");
                $(".panel-dialog-con tbody tr").eq(index).addClass("eidts");
                this.addPanelbol=false;
            },
            updataPanel:function(index){
                let _this=this;
                if(this.newpanelListData[index].vendorInformation=="" || this.newpanelListData[index].panelModel=="" || this.newpanelListData[index].lengths=="" || this.newpanelListData[index].widths=="" || this.newpanelListData[index].panelNth=="" || this.newpanelListData[index].voltage=="" || this.newpanelListData[index].current=="" || this.newpanelListData[index].mppVoltage=="" || this.newpanelListData[index].mppCurrent=="" || this.newpanelListData[index].voltageCoefficient=="" || this.newpanelListData[index].currentCoefficient==""){
                    return layer.msg(detailLang.please_enter_full_information);
                }
                if(_this.isNumber(this.newpanelListData[index].lengths) || _this.isNumber(this.newpanelListData[index].widths) || _this.isNumber(this.newpanelListData[index].panelNth) || _this.isNumber(this.newpanelListData[index].voltage) || _this.isNumber(this.newpanelListData[index].current) || _this.isNumber(this.newpanelListData[index].mppVoltage) || _this.isNumber(this.newpanelListData[index].mppCurrent) || _this.isNumber(this.newpanelListData[index].voltageCoefficient) || _this.isNumber(this.newpanelListData[index].currentCoefficient) ){
                    return layer.msg(detailLang.Please_enter_the_correct_content);
                }
                $(".panel-dialog-con tbody tr").eq(index).removeClass("eidts");
                // return false;
                if(_this.addPanelbol){
                    $.ajax({
                        url: rootPath+'/deviceManage/addPanelManagement',
                        headers:{"oss.userName":userName},
                        type:'post',
                        async:false,
                        dataType:'json',
                        data:_this.newpanelListData[index],
                        success:function(data){
                            _this.newpanelListData[index].id=data.obj;
                            _this.numPanelManagement=parseInt(_this.numPanelManagement)+parseInt(_this.newpanelListData[index].panelNth);
                        }
                    });
                    return false;
                }
                $.ajax({
                    url: rootPath+'/deviceManage/updatePanelManagement',
                    headers:{"oss.userName":userName},
                    type:'post',
                    async:false,
                    dataType:'json',
                    data:_this.newpanelListData[index],
                    success:function(data){
                        _this.numPanelManagement=parseInt(_this.numPanelManagement)+parseInt(_this.newpanelListData[index].panelNth)-parseInt(_this.panelListData[index].panelNth);
                        var _obj = JSON.stringify(_this.newpanelListData);
                        _this.panelListData = JSON.parse(_obj);
                    }
                });
                _this.addPanelbol=false;
            },
            isNumber:function(obj) {
                var t1 = /^\d+(\.\d+)?$/; //非负浮点数
                var t2 = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
                if(t1.test(obj) || t2.test(obj)) {
                    return false;
                } else {
                    return true;
                }
            },
            delectPanel:function(index){
                let _this=this;
                $(".panel-dialog-con tbody tr").eq(index).removeClass("eidts");
                if(_this.addPanelbol  || !_this.newpanelListData[index].id){
                    _this.newpanelListData.splice(index,1);
                    _this.panelListData.splice(index,1);
                    return false;
                }
                $.ajax({
                    url: rootPath+'/deviceManage/deletePanelManagement',
                    headers:{"oss.userName":userName},
                    type:'post',
                    async:false,
                    dataType:'json',
                    data:{id:_this.newpanelListData[index].id},
                    success:function(data){
                        if(data){
                            _this.numPanelManagement=parseInt(_this.numPanelManagement)-parseInt(_this.newpanelListData[index].panelNth);
                            _this.newpanelListData.splice(index,1);
                            _this.panelListData.splice(index,1);
                        }
                    }
                });
            },
            userData:function(pageNth){
                var _this=this;
                $.ajax({
                    url: rootPath+'/deviceManage/userManage/editTowPage',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{access:0,serverId:serverId,userId:_this.incomeDts.user.id},
                    success:function(data){
                    	if(data.obj){
                    		 _this.userJson=data.obj;
                             var _obj = JSON.stringify(data.obj);
                             _this.usernewJson = JSON.parse(_obj);
                    	}
                       
                    }
                })
            },
            getErrLog:function(page,startDate,endDate,deviceSn,iCode,bool){
                var _this=this;
                $.ajax({
                    url: ODMPARAMS.getServerProtocol(serverUrl)+'/ossC/error/all',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{currPage:page==undefined ? 1: page,pageSize:30,codeType:codeType,pId:plantId,code:code,start:ODMPARAMS.volteDate(startDate),end:ODMPARAMS.volteDate(endDate),sn:deviceSn,plantName:_this.inverterInfo.plantName,lang:LANG},
                    beforeSend : function(){	//发送数据前，提示加载中
                        dialogLoading(1, -1);
                    },
                    complete:function(){//加载完成
                        dialogLoadingClose();
                    },
                    success : function(data){//data为com.growatt.oss.dto.AjaxDto 格式//可查看Controller处的规范
                        _this.ErrLog=[];
                        if(data.datas.length>0){
                            _this.errpages = parseFloat(data.pages); //总页数
                            _this.errcurr = parseFloat(data.currPage);//当前页
                            _this.errind = parseFloat(data.ind);//当前页
                            _this.errlogNth=parseFloat(data.count);
                            $.each(data.datas, function (k, pager) {
                                // offset = pager.offset;
                                // if (parseInt(pager.pages) > pages) _this.errlogNth = pager.pages;
                                _this.ErrLog=_this.ErrLog.concat(data.datas[k]);
                            })
                            _this.gererrPage()
                        }
                    }
                });
               /* <%--$.ajax({--%>
                    <%--dataType:"json",--%>
                    <%--headers:{"oss.userName":userName},--%>
                    <%--type : "POST",--%>
                    <%--url : "rootPath/diagnosisManage/deviceFaultListTow",--%>
                    <%--data : {page: page, startDate:ODMPARAMS.volteDate(startDate),endDate:ODMPARAMS.volteDate(endDate),deviceSn:deviceSn,iCode:iCode,plantId:plantId},--%>
                    <%--beforeSend : function(){	//发送数据前，提示加载中--%>
                        <%--dialogLoading(1, -1);--%>
                    <%--},--%>
                    <%--complete:function(){//加载完成--%>
                        <%--dialogLoadingClose();--%>
                    <%--},--%>
                    <%--success : function(data){//data为com.growatt.oss.dto.AjaxDto 格式//可查看Controller处的规范--%>
                        <%--_this.ErrLog=[];--%>
                        <%--if(data.result==1){--%>
                            <%--if(data.obj.pagers.length>0){--%>
                                <%--var pages = 0; //总页数--%>
                                <%--var offset = 1;//当前页--%>
                                <%--$.each(data.obj.pagers, function (k, pager) {--%>
                                    <%--offset = pager.offset;--%>
                                    <%--if (parseInt(pager.pages) > pages) _this.errlogNth = pager.pages;--%>
                                    <%--_this.ErrLog=_this.ErrLog.concat(pager.datas);--%>
                                <%--})--%>
                            <%--}--%>
                        <%--}--%>
                    <%--}--%>
                <%--});--%>*/
            },
            // 导出充电桩数据
            exportPlie:function(){ 	
              var _this=this;
              var type = _this.chooseTime - 1
              var date = $(".calendarSelect input").eq(type+1).val(); 
              var requestType = _this.chargeChild == 0 ? 0 : 1
                params = {
                    cmd: "d_export_record",
				    siteId: plantId,
				    type: type,
				    date: date,
				    requestType: requestType,
				    lan:LANG=='en'?1:0
                };
                $.ajax({
                    url:ODMPARAMS.chargerURL+'/ocpp/tcharg/tdrill',
                    timeout: 1000 * 60,
                    data: params,
                    beforeSend: function () {
                        dialogLoading(detailLang.export_waiting, -1);
                    },
                    complete: function () {
                        dialogLoadingClose();
                    },
                    success: function (data) {
                        if(data.code==0){
                        	var url = data.data
                        	// 返回下载链接
                        	window.open(ODMPARAMS.chargerURL+url);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
                            dialogTips(getI18n('timeout'));
                    }
                });
            },
            exportDeviceFaultPlant:function(){
                let _this=this;
                params = {
                    serverId: serverId,
                    plantId: plantId,
                    type: this.dateNths,
                    fileName: "Power_station_report"
                };
                $.ajax({
                    url: rootPath+'/deviceManage/exportPlantEnergy',
                    timeout: 1000 * 60,
                    data: params,
                    beforeSend: function () {
                        dialogLoading(detailLang.export_waiting, -1);
                    },
                    complete: function () {
                        dialogLoadingClose();
                    },
                    success: function (data) {
                        if (data.result == 1) {
                            $("#form_exportPlantEnergy input[name=type]").val(params.type);
                            $("#form_exportPlantEnergy input[name=date]").val(_this.changeExportEnergyDate());
                            $("#form_exportPlantEnergy input[name=fileName]").val(params.fileName + '_' +_this.changeExportEnergyDate());
                            $("#form_exportPlantEnergy").attr('action', ODMPARAMS.getServerProtocol(data.msg) + '/pubData.do?op=exportPlantEnergyData');
                            $("#form_exportPlantEnergy").submit();
                        } else {
                            $("#errMsg_exportPlantEnergy").text(data.msg);
                        }

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
                            dialogTips(getI18n('timeout'));
                    }
                });
                //var _this=this;
                //var indess=1;
                //for(var i=0;i<$(".dateSelectUl li").length;i++){
                //    if($(".dateSelectUl li").eq(i).hasClass("cur")){
                //        indess=i+1;
                //    }
                //}
                //var newdate=$(".calendarSelect .dataTime").eq(indess-1).val();
                //window.open("http://"+serverUrl+"/pubData.do?op=exportPlantEnergyData&type="+indess+"&&plantId="+plantId+"&date="+newdate+"&lang="+langs);
            },
            changeExportEnergyDate:function() {
                var type = this.dateNths;
                var date = $(".Curdatetime").val();
                var text = date;
                if (type == 2) {
                    text = $(".Curday").val();
                } else if (type == 3) {
                    text = $(".Curyear").val();
                }
                return text;
            },
            gererrPage:function(){
                let _this=this;
                layui.use('laypage', function() {
                    var laypage = layui.laypage;
                    laypage.render({
                        elem: 'errlogPage' //注意，这里的 test1 是 ID，不用加 # 号
                        ,count: _this.errlogNth //数据总数，从服务端得到
                        ,limit:30
                        , jump: function (obj, first) {
                            if(!first)
                                _this.getErrLog(obj.curr,$("#falseData").val().slice(0,10),$("#falseData").val().slice(13,23),_this.thisdeviceSn,"")
                        }
                    });
                })
            },
            plantData:function(){
                var _this=this;
                $.ajax({
                    url: rootPath+'/deviceManage/plantManage/editTowPage',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{access:0,serverId:serverId,plantId:plantId},
                    success:function(data){
                        var _obj = JSON.stringify(data.obj);
                        _this.plantnewJson = JSON.parse(_obj);
                        mobileCity=_this.plantnewJson.city;
                        var oldbrand=[];
                        if(_this.plantnewJson.brand==undefined || _this.plantnewJson.brand==""){
                            for(var i=0;i<3;i++){
                                oldbrand[i]=""
                            }
                            _this.plantnewJson.brand=oldbrand;
                        }else{
                            if(JSON.stringify(_this.plantnewJson.brand).indexOf("[")=="-1"){
                                for(var i=0;i<3;i++){
                                    if(i==_this.plantnewJson.brandModel){
                                        oldbrand[i]=_this.plantnewJson.brand;
                                    }else{
                                        oldbrand[i]=""
                                    }
                                }
                                _this.plantnewJson.brand=oldbrand
                            }else{
                                _this.plantnewJson.brand=JSON.parse(_this.plantnewJson.brand);
                            }
                        }
                        if(_this.plantnewJson.brandModel==undefined || _this.plantnewJson.brandModel==""){
                            _this.plantnewJson.brandModel=[false,false,false];
                        }else{
                            if(JSON.stringify(_this.plantnewJson.brandModel).indexOf("[")=="-1"){
                                var oldbrandModel=[];
                                for(var i=0;i<_this.plantnewJson.brand.length;i++){
                                    if(i==_this.plantnewJson.brandModel){
                                        oldbrandModel[i]=true;
                                    }else{
                                        oldbrandModel[i]=false;
                                    }
                                }
                                _this.plantnewJson.brandModel=oldbrandModel
                            }else{
                                _this.plantnewJson.brandModel=JSON.parse(_this.plantnewJson.brandModel);
                            }
                        }
                        var oldsupportType=[false,false,false,false,false,false,false,false,{bool:false,texts:''}]
                        if(_this.plantnewJson.supportType==undefined ||_this.plantnewJson.supportType=="null" || _this.plantnewJson.supportType==""){
                            _this.plantnewJson.supportType=oldsupportType
                        }else{
                            if(_this.plantnewJson.supportType.indexOf("[")=="-1"){
                                for(var i=0;i<oldsupportType.length;i++){
                                    if(parseInt(_this.plantnewJson.supportType)=='NaN'){
                                        oldsupportType[8].vals=_this.plantnewJson.supportType;
                                        oldsupportType[8].bool=true;
                                    }else if(_this.plantnewJson.supportType==i){
                                        oldsupportType[i]=true;
                                    }
                                }
                                _this.plantnewJson.supportType=oldsupportType;
                            }else{
                                _this.plantnewJson.supportType=JSON.parse(_this.plantnewJson.supportType);
                            }
                        }
                        if(_this.plantnewJson.brandNum==undefined)_this.plantnewJson.brandNum="";
                        var brandNum=[{bool:false,valW:"",valK:""},{bool:false,valW:"",valK:""},{bool:false,valW:"",valK:""},{bool:false,valW:"",valK:""}];
                        if(_this.plantnewJson.brandNum=="" || _this.plantnewJson.brandNum.indexOf("[")=="-1"){
                            if(_this.plantnewJson.brandNum.indexOf(",")!="-1" && _this.plantnewJson.brandNum.split(",")[0]!="null"){
                                brandNum[_this.plantnewJson.brandNum.split(",")[0]].bool=true;
                                brandNum[_this.plantnewJson.brandNum.split(",")[0]].valW=_this.plantnewJson.brandNum.split(",")[1];
                                brandNum[_this.plantnewJson.brandNum.split(",")[0]].valK=_this.plantnewJson.brandNum.split(",")[2];
                            }
                            _this.plantnewJson.brandNum=brandNum;
                        }else{
                            _this.plantnewJson.brandNum=JSON.parse(_this.plantnewJson.brandNum);
                        }
                        _this.plantJson=_this.plantnewJson;
                        $(".countryVal").val(capitalize(_this.plantJson.country));
                        $(".countryText").text(capitalize(_this.plantJson.country));
                        _this.plantJson.addDate=ODMPARAMS.convertDate(_this.plantJson.addDate);
                        if(_this.plantnewJson.direction1=='null')
                            _this.plantnewJson.direction1='0,0,0';
                        if(_this.plantnewJson.direction2=='null')
                            _this.plantnewJson.direction2='0,0,0';
                        if(_this.plantnewJson.direction3=='null')
                            _this.plantnewJson.direction3='0,0,0';
                        if(_this.plantnewJson.direction4=='null')
                            _this.plantnewJson.direction4='0,0,0';
                        $(".plantLook1 input").eq(0).val((_this.plantnewJson.direction1).split(',')[0]);
                        $(".plantLook1 input").eq(1).val((_this.plantnewJson.direction1).split(',')[1]);
                        $(".plantLook1 input").eq(2).val((_this.plantnewJson.direction1).split(',')[2]);
                        $(".plantLook2 input").eq(0).val((_this.plantnewJson.direction2).split(',')[0]);
                        $(".plantLook2 input").eq(1).val((_this.plantnewJson.direction2).split(',')[1]);
                        $(".plantLook2 input").eq(2).val((_this.plantnewJson.direction2).split(',')[2]);
                        $(".plantLook3 input").eq(0).val((_this.plantnewJson.direction3).split(',')[0]);
                        $(".plantLook3 input").eq(1).val((_this.plantnewJson.direction3).split(',')[1]);
                        $(".plantLook3 input").eq(2).val((_this.plantnewJson.direction3).split(',')[2]);
                        $(".plantLook4 input").eq(0).val((_this.plantnewJson.direction4).split(',')[0]);
                        $(".plantLook4 input").eq(1).val((_this.plantnewJson.direction4).split(',')[1]);
                        $(".plantLook4 input").eq(2).val((_this.plantnewJson.direction4).split(',')[2]);
                        if(_this.plantnewJson.factoryJson!='' && _this.plantnewJson.factoryJson!=null && _this.plantnewJson.factoryJson!="null"){
                            _this.plantnewJson.factoryJson=JSON.parse(_this.plantnewJson.factoryJson);
                            $.each(_this.plantnewJson.factoryJson,function(k,factoryJson){
                                $(".plant-table tbody tr").eq(k).find("input").eq(0).val(factoryJson.factory);
                                $(".plant-table tbody tr").eq(k).find("input").eq(1).val(factoryJson.norm);
                                $(".plant-table tbody tr").eq(k).find("input").eq(2).val(factoryJson.SN);
                                $.each(factoryJson.nth,function(j,nthjson){
                                    $(".plant-table tbody tr").eq(k).find("input").eq(3*j+3).val(nthjson.road);
                                    $(".plant-table tbody tr").eq(k).find("input").eq(3*j+4).val(nthjson.strings);
                                    $(".plant-table tbody tr").eq(k).find("input").eq(3*j+5).val(nthjson.piece);
                                })
                                $(".plant-table tbody tr").eq(k).find("input").eq(51).val(factoryJson.description);
                            })
                        }
                    }
                })
            },
            serviceLog:function(type,condition){
                dialogContent({
                    title:detailLang.tips,
                    content:$(".service-dialog"),
                    onBtn:0,
                });
                this.serviceLogsData(type,condition);
            },
            servicelogSerch:function(){
                let _this=this;
                if($(".service-dialog li").eq(0).hasClass("active")){
                    _this.serviceLogsData(_this.servicelogSelect,_this.servicelogInput)
                }else{
                    _this.serviceOhterLog(_this.servicelogSelect,_this.servicelogInput,langs)
                }
            },
            serviceLogsData:function(type,condition){
                $(".service-dialog li").eq(0).addClass("active");
                $(".service-dialog li").eq(1).removeClass("active");
                var _this=this;
                $.ajax({
                    url: rootPath+'/serviceHall/problemRecord',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{plantId:plantId,serverId:serverId,type:type,condition:condition},
                    success:function(data){
                        _this.serviceLogData=data.obj.datas;
                    }
                })
            },
            serviceOhterLog:function(type,condition,lang){
                $(".service-dialog li").eq(1).addClass("active");
                $(".service-dialog li").eq(0).removeClass("active");
                var _this=this;
                $.ajax({
                    url: rootPath+'/serviceHall/customerComplaintRecord',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{plantId:plantId,serverId:serverId,type:type,condition:condition,lang:lang},
                    success:function(data){
                        _this.serviceLogData=data.obj.datas;
                    }
                })
            },
            inverterList:function(pageNth){
                var thislang;
                if($.cookie("lang")=="cn"){
                    thislang="cn"
                }else{
                    thislang=$.cookie("lang");
                }
                var _this=this;
                pageId=pageNth;
                $.ajax({
                    url: rootPath+'/deviceManage/theInverterList',
                    type:'post',
                    async:false,
                    dataType:'json',
                    data:{serverId:serverId,currPage:pageId,pageSize:10,lang:thislang,plantId:plantId},
                    success:function(data){
                    	if(data != '' && data != undefined && data != null){
							_this.inverter=data;
                            _this.inverterArr = data.datas;
                    	}
                    }
                });
            },
            collectorList:function(pageNth){
                $(".deviceNav li").eq(1).show();
                var _this=this;
                pageId=pageNth;
                $.ajax({
                    url: ODMPARAMS.getServerProtocol(serverUrl)+'/pubData.do?op=getPlantDeviceDatalogOss',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{plantId:plantId,toPageNum:pageId},
                    success:function(data){
                        if(data.result==1 && data.obj.dataLogList!=undefined){
                            _this.collector=data.obj;
                            _this.cillectorArr=data.obj.dataLogList;
                        }
                    }
                })
            },
            /* maxList:function(pageNth){
                $(".deviceNav li").eq(2).show();
                var _this=this;
                pageId=pageNth;
                $.ajax({
                    url: ODMPARAMS.getServerProtocol(serverUrl)+'/pubData.do?op=getPlantDeviceMaxOss',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{plantId:plantId,toPageNum:pageId},
                    success:function(data){
                        if(data.result==1){
                            _this.max=data.obj;
                            _this.maxArr=data.obj.plantMax_maxList;
                            setTimeout(function(){
                                $('#maxTbody tr').tipso({
                                    useTitle : false,
                                    background:'#0ec439',
                                    width:tipswidth
                                });
                            },20)
                        }
                    }
                })
            }, */
            storageList:function(pageNth){
                $(".deviceNav li").eq(2).show();
                var thislang;
                if($.cookie("lang")=="cn"){
                    thislang="cn"
                }else{
                    thislang=$.cookie("lang");
                }
                var _this=this;
                pageId=pageNth;
                $.ajax({
                    url: rootPath+'/deviceManage/theStoragesList',
                    type:'post',
                    async:false,
                    dataType:'json',
                    data:{serverId:serverId,currPage:pageId,pageSize:10,lang:thislang,plantId:plantId},
                    success:function(data){
                    	if(data != '' && data != undefined && data != null){
                    		_this.storage=data;
                            _this.storageArr=data.datas;
                    	}

                    }
                });
            },
           
            machineList:function(pageNth){
                $(".deviceNav li").eq(3).show();
                var thislang;
                if($.cookie("lang")=="cn"){
                    thislang="cn"
                }else{
                    thislang=$.cookie("lang");
                }
                var _this=this;
                pageId=pageNth;
                $.ajax({
                    url: rootPath+'/deviceManage/theMIXsList',
                    type:'post',
                    async:false,
                    dataType:'json',
                    data:{serverId:serverId,currPage:pageId,pageSize:10,lang:thislang,plantId:plantId},
                    success:function(data){
                    	if(data != '' && data != undefined && data != null){
							_this.machine=data;
                            _this.machineArr=data.datas;
                    	}
                    }
                });
            },
            /*<%--  pcsList:function(pageNth){
                $(".deviceNav li").eq(5).show();
                var _this=this;
                pageId=pageNth;
                $.ajax({
                    url: ODMPARAMS.getServerProtocol(serverUrl)+'/pubData.do?op=getPlantDevicePcsOss',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{plantId:plantId,toPageNum:pageId},
                    success:function(data){
                        if(data.result==1){
                            _this.pcs=data.obj;
                            _this.pcsArr=data.obj.plantPcs_pcsList;
                        }
                    }
                })
            },
            hpsList:function(pageNth){
                $(".deviceNav li").eq(6).show();
                var _this=this;
                pageId=pageNth;
                $.ajax({
                    url: ODMPARAMS.getServerProtocol(serverUrl)+'/pubData.do?op=getPlantDeviceHpsOss',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{plantId:plantId,toPageNum:pageId},
                    success:function(data){
                        if(data.result==1){
                            _this.hps=data.obj;
                            _this.hpsArr=data.obj.plantHps_hpsList;
                        }
                    }
                })
            },
            acMachineList:function(pageNth){
                $(".deviceNav li").eq(7).show();
                var _this=this;
                pageId=pageNth;
                $.ajax({
                    url: ODMPARAMS.getServerProtocol(serverUrl)+'/pubData.do?op=getPlantDeviceSpaOss',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{plantId:plantId,toPageNum:pageId},
                    success:function(data){
                        if(data.result==1){
                            _this.acMachine=data.obj;
                            _this.acMachineArr=data.obj.plantSpa_spaList;
                        }
                    }
                })
            },
            tlxList:function(pageNth){
                $(".deviceNav li").eq(8).show();
                var _this=this;
                pageId=pageNth;
                $.ajax({
                    url: ODMPARAMS.getServerProtocol(serverUrl)+'/pubData.do?op=getPlantDeviceTlxOss',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{plantId:plantId,toPageNum:pageId},
                    success:function(data){
                        if(data.result==1){
                            _this.tlx=data.obj;
                            _this.tlxArr=data.obj.plantTlx_tlxList;
                        }
                    }
                })
            },  --%>*/
            meterList:function(pageNth){
                $(".deviceNav li").eq(4).show();
                var thislang;
                if($.cookie("lang")=="cn"){
                    thislang="cn"
                }else{
                    thislang=$.cookie("lang");
                }
                var _this=this;
                pageId=pageNth;
                $.ajax({
                    url: ODMPARAMS.getServerProtocol(serverUrl)+'/ossC/getMeterListOss',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{lang:thislang,pageSize:10,plantId:plantId,currPage:pageId},
                    success:function(data){
                            _this.meterArr = data.datas;
                            _this.meter = data;
                    }
                })
            },
            // 获取充电桩列表数据
            tdrillList:function(pageNth){
                var _this=this;
                var currPage = pageNth;
                var pageSize = 20;
                $.ajax({
                	url:ODMPARAMS.chargerURL+'/ocpp/tcharg/tdrill',
                    type:'post',
                    dataType:'json',
                    data:{cmd:'d_chargeAll',siteId:plantId,page:currPage,pageSize},//"326878" plantId
                    success:function(data){
                        if(data.code==0 && data.data.list){
                            _this.tdrillArr = data.data.list;
                            _this.tdrillArr.forEach(item=>{
                            	var uid = item.userId
              				    if(uid && uid.length>5){   
              				        var str = uid.substring(0,5) // SHINEvivalab2 如前五位是SHINE 则取vivalab2
              				        if(str === "SHINE"){
              				        	uid = uid.substring(5,uid.length)
              					    }
              				    }                            	
                            	item.userId = uid
                           		if(item.type == "交流"){
                           			item.type = detailLang.communicate_with
                           		}else if(item.type == "直流"){
                           			item.type = detailLang.direct_current
                           		}
                                var staList = []
                                for(var i in item.status){
                                   var last = i.substr(i.length-1,1)//status_*的位数
                                   var value = item.status[i]//status_*的值 
                                   var obj = {}
                                   obj.i = _this.gumName[last-1] //换成枪号显示
                                   obj.num = _this.modelList[value] //换成对应的枪状态
                                   obj.color = _this.qianColor[value] //换成对应的枪状态
                      			   staList.push(obj)
                                }
                                item.staList = staList
                            })
                            var totalnum  = data.data.totalRecord;
                            // 根据总条数得出总页数
                            _this.tdrillPageTotal = totalnum > 0 ? ((totalnum < 20) ? 1 : ((totalnum % 20) ? (parseInt(totalnum / 20) + 1) : (totalnum / 20))) : 0
                            _this.tdrillTotal = totalnum;
                        }
                    }
                })
            },   
            popWrapShow: function(){
                dialogUrl(detailLang.edit_plant, rootPath+'/deviceManage/plantManage/editPage2', {
                    serverId: serverId,
                    plantId: plantId,
                    access: 0
                }, {width: '1100px', height: '625px'});
            },
            addDevice: function(){
                dialogUrl(detailLang.add_device, rootPath+'/deviceManage/deviceManage/addDevicePageTow', {}, {
                    width: '810px',
                    height: '400px'
                });
            },
            openPlantDetails:function(){
                let _this=this;
                if($(".changeMorePlant i").attr("class")=="up"){
                    $(".changeConter").show();
                    $(".changeMorePlant i").attr("class","down")
                }
                $("body,html").scrollTop(445);
                if(!_this.firstbol){
                    _this.userData();
                    _this.plantData();
                    _this.numPanel();
                    _this.changeShowMap();
                    _this.firstbol=true;
                }
            },
            changePlantDetails:function(){
                let _this=this;
                if(!_this.firstbol){
                    _this.userData();
                    _this.plantData();
                    _this.numPanel();
                    _this.changeShowMap();
                    _this.firstbol=true;
                }
                if($(".changeMorePlant i").attr("class")!="up"){
                    $(".changeConter").slideUp(500);
                    $(".changeMorePlant i").attr("class","up")
                }else{
                    $(".changeConter").slideDown(500);
                    $(".changeMorePlant i").attr("class","down");
                }
                if(_this.ischangePlant){
                    _this.ischangePlant=false;
                }
                setTimeout(function(){
	                $.ajax({
						url:rootPath+"/common/searchCitys",
						data:{all:1,country:$("#sel_country_creatPlant").val()},
						type:"post",
						success:function(data){
							searchJson=data;
							var ohtml="";
							$.each(data,function(i,d){
								ohtml+='<li data-value="'+d.city+'">'+d.cityShow+'</li>'
							})
							$("#cityListUl").html(ohtml)
						}
					})
                },2000)
            },
            numPanel:function(){
                let _this=this;
                $.ajax({
                    url: rootPath+'/deviceManage/numPanelManagement',
                    headers:{"oss.userName":userName},
                    type:'post',
                    async:false,
                    dataType:'json',
                    data:{plantId:plantId},
                    success:function(data){
                        if(data){
                            _this.numPanelManagement=data.obj
                        }
                    }
                });
            },
            editPlant:function(){
                $(".changeConter").addClass("edit");
                layui.form.render();
            },
            noEditPlant:function(){
                $(".changeConter").removeClass("edit");
                let _obj = JSON.stringify(this.userJson);
                this.usernewJson = JSON.parse(_obj);
                let objplant = JSON.stringify(this.plantJson);
                this.plantnewJson = JSON.parse(objplant);
                let objincomeDts = JSON.stringify(this.incomeDts);
                this.newincomeDts=JSON.parse(objincomeDts);
            },
            yesEditPlant:function(){
                let _this=this;
                let objincomeDts = JSON.stringify(this.newincomeDts);
                this.incomeDts=JSON.parse(objincomeDts);
                if($(".dianya").eq(0).val()=='0'){
                    _this.plantnewJson.voltRank='380'
                }else if($(".dianya").eq(0).val()=='1'){
                    _this.plantnewJson.voltRank='220'
                }else{
                    _this.plantnewJson.voltRank=$(".laynewadd").eq(0).find(".radioblank").find("input").val()
                }
                if(!_this.plantnewJson.supportType[8].bool)_this.plantnewJson.supportType[8].texts="";
                _this.plantnewJson.direction1=$(".plantLook1 input").eq(0).val()+','+$(".plantLook1 input").eq(1).val()+','+$(".plantLook1 input").eq(2).val();
                _this.plantnewJson.direction2=$(".plantLook2 input").eq(0).val()+','+$(".plantLook2 input").eq(1).val()+','+$(".plantLook2 input").eq(2).val();
                _this.plantnewJson.direction3=$(".plantLook3 input").eq(0).val()+','+$(".plantLook3 input").eq(1).val()+','+$(".plantLook3 input").eq(2).val();
                _this.plantnewJson.direction4=$(".plantLook4 input").eq(0).val()+','+$(".plantLook4 input").eq(1).val()+','+$(".plantLook4 input").eq(2).val();
                for(var i=0;i<_this.plantnewJson.brandModel.length;i++){
                    if(!_this.plantnewJson.brandModel[i]){
                        _this.plantnewJson.brand[i]=""
                    }
                }
                for(var i=0;i<_this.plantnewJson.brandNum.length;i++){
                    if(!_this.plantnewJson.brandNum[i].bool){
                        _this.plantnewJson.brandNum[i].valW=""
                        _this.plantnewJson.brandNum[i].valK=""
                    }
                }
                var onjson=[
                    {"factory":'',"norm":'',"SN":'',"description":'',"nth":[
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                        ]
                    },
                    {"factory":'',"norm":'',"SN":'',"description":'',"nth":[
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                        ]
                    },
                    {"factory":'',"norm":'',"SN":'',"description":'',"nth":[
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                            {"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},{"road":'',"strings":'',"piece":''},
                        ]
                    }
                ];
                var onjsonair=false;
                var injsonair=true;
                var oninputair=false;
                var ininputair=true;
                $.each($(".plant-table tbody tr"),function(k,factoryJson){
                    onjson[k].factory=$(".plant-table tbody tr").eq(k).find("input").eq(0).val();
                    onjson[k].norm=$(".plant-table tbody tr").eq(k).find("input").eq(1).val();
                    onjson[k].SN=$(".plant-table tbody tr").eq(k).find("input").eq(2).val();
                    onjson[k].description=$(".plant-table tbody tr").eq(k).find("input").eq(51).val();
                    if($.trim(onjson[k].factory)!="" && $.trim(onjson[k].norm)!="" && $.trim(onjson[k].SN)!="" && $.trim(onjson[k].description)!=""){
                        onjsonair=true;
                    }else if($.trim(onjson[k].factory)!=""){
                        if($.trim(onjson[k].norm)=="" || $.trim(onjson[k].SN)=="" || $.trim(onjson[k].description)==""){
                            injsonair=false
                        }
                    }else if($.trim(onjson[k].factory)==""){
                        if($.trim(onjson[k].norm)!="" || $.trim(onjson[k].SN)!="" || $.trim(onjson[k].description)!=""){
                            injsonair=false
                        }
                    }
                    for(var j=0;j<16;j++){
                        onjson[k].nth[j].road=$(".plant-table tbody tr").eq(k).find("input").eq(3*j+3).val();
                        onjson[k].nth[j].strings=$(".plant-table tbody tr").eq(k).find("input").eq(3*j+4).val();
                        onjson[k].nth[j].piece=$(".plant-table tbody tr").eq(k).find("input").eq(3*j+5).val();
                        if(onjsonair){
                            if($.trim(onjson[k].nth[j].road)!="" && $.trim(onjson[k].nth[j].strings)!="" && $.trim(onjson[k].nth[j].piece)!=""){
                                oninputair=true;
                            }else if($.trim(onjson[k].nth[j].road)!=""){
                                if($.trim(onjson[k].nth[j].strings)=="" || $.trim(onjson[k].nth[j].piece)==""){
                                    ininputair=false
                                }
                            }else if($.trim(onjson[k].nth[j].road)==""){
                                if($.trim(onjson[k].nth[j].strings)!="" || $.trim(onjson[k].nth[j].piece)!=""){
                                    ininputair=false
                                }
                            }
                        }
                    }
                })
                _this.plantnewJson.factoryJson=JSON.stringify(onjson);
                _this.plantnewJson.cover=$(".dianya").eq(1).val();
                if(_this.plantnewJson.cover=='0'){
                    _this.plantnewJson.coverRemark=''
                }else{
                    _this.plantnewJson.coverRemark=$(".coverRemark").val()
                }
                if(_this.plantnewJson.cover==undefined)_this.plantnewJson.cover=0;
                if(ODMPARAMS.plantRequired){
                    if($.trim(_this.plantnewJson.dealer)==""){
                        dialogTips(detailLang.plantDetails1);//请填写经销商信息
                        return false;
                    }
                    if($.trim(_this.plantnewJson.installer)==""){
                        dialogTips(detailLang.plantDetails2);//请填写安装商信息
                        return false;
                    }
                    if($.trim(_this.plantnewJson.voltRank)==""){
                        dialogTips(detailLang.plantDetails3);//请填写电压等级
                        return false;
                    }
                    let brandbool=false;
                    for(var i=0;i<_this.plantJson.brandModel.length;i++){
                        if(_this.plantJson.brandModel[i]){
                            if($.trim(_this.plantJson.brand[i])!=""){
                                for(var j=0;j<_this.plantJson.brandNum.length;j++){
                                    if(_this.plantJson.brandNum[j].bool){
                                        if( $.trim(_this.plantJson.brandNum[j].valK)!="" && $.trim(_this.plantJson.brandNum[j].valW)!=""){
                                            brandbool=true;
                                        }else{
                                            dialogTips(detailLang.plantDetails4);//请填写完整的组件型号及数量
                                            return false;
                                        }
                                    }
                                }
                            }else{
                                dialogTips(detailLang.plantDetails4);//请填写完整的组件型号及数量
                                return false;
                            }
                        }
                    }
                    if(!brandbool){
                        dialogTips(detailLang.plantDetails4);//请填写完整的组件型号及数量
                        return false;
                    }
                    var supportTypebool=false;
                    for(var i=0;i<_this.plantJson.supportType.length;i++){
                        if(i<8){
                            if(_this.plantJson.supportType[i]){
                                supportTypebool=true;
                            }
                        }else{
                            if(_this.plantJson.supportType[i].bool){
                                if($.trim(_this.plantJson.supportType[i].texts)!=""){
                                    supportTypebool=true;
                                }else{
                                    supportTypebool=false;
                                }
                            }
                        }
                    }
                    if(!supportTypebool){
                        dialogTips(detailLang.plantDetails5);//请填写完整的支架类型
                        return false;
                    }
                    var directionbool=false;
                    var directionbooljson=[false,false,false,false];
                    if($.trim(_this.plantnewJson.direction1.split(",")[0])!="" && $.trim(_this.plantnewJson.direction1.split(",")[1])!="" && $.trim(_this.plantnewJson.direction1.split(",")[2])!=""){
                        directionbooljson[0]=true;
                    }
                    if($.trim(_this.plantnewJson.direction2.split(",")[0])!="" && $.trim(_this.plantnewJson.direction2.split(",")[1])!="" && $.trim(_this.plantnewJson.direction2.split(",")[2])!=""){
                        directionbooljson[1]=true;
                    }
                    if($.trim(_this.plantnewJson.direction3.split(",")[0])!="" && $.trim(_this.plantnewJson.direction3.split(",")[1])!="" && $.trim(_this.plantnewJson.direction3.split(",")[2])!=""){
                        directionbooljson[2]=true;
                    }
                    if($.trim(_this.plantnewJson.direction4.split(",")[0])!="" && $.trim(_this.plantnewJson.direction4.split(",")[1])!="" && $.trim(_this.plantnewJson.direction4.split(",")[2])!=""){
                        directionbooljson[3]=true;
                    }
                    function finddirection(data){
                        var obool=true;
                        if ($.trim(data.split(",")[0])!= "") {
                            if ($.trim(data.split(",")[1]) == "" || $.trim(data.split(",")[2]) == "") {
                                obool=false;
                            }
                        }
                        if ($.trim(data.split(",")[0])== "") {
                            if ($.trim(data.split(",")[1]) != "" || $.trim(data.split(",")[2]) != ""){
                                obool=false;
                            }
                        }
                        return obool;
                    }
                    if(!finddirection(_this.plantnewJson.direction1)){
                        dialogTips(detailLang.plantDetails6);//请填写完整的电站朝向，倾角
                        return false;
                    }
                    if(!finddirection(_this.plantnewJson.direction2)){
                        dialogTips(detailLang.plantDetails6);//请填写完整的电站朝向，倾角
                        return false;
                    }
                    if(!finddirection(_this.plantnewJson.direction3)){
                        dialogTips(detailLang.plantDetails6);//请填写完整的电站朝向，倾角
                        return false;
                    }
                    if(!finddirection(_this.plantnewJson.direction4)){
                        dialogTips(detailLang.plantDetails6);//请填写完整的电站朝向，倾角
                        return false;
                    }
                    for(var i=0;i<directionbooljson.length;i++){
                        if(directionbooljson[i]){
                            directionbool=true;
                        }
                    }
                    if(!directionbool){
                        dialogTips(detailLang.plantDetails6);//请填写完整的电站朝向，倾角
                        return false;
                    }
                    if(_this.plantnewJson.coverRemark)
                    if(_this.plantnewJson.cover=="1"){
                        if($.trim(_this.plantnewJson.coverRemark)==""){
                            dialogTips(detailLang.plantDetails7);//请填写遮挡说明
                            return false;
                        }
                    }
                    if(!onjsonair || !injsonair || !oninputair || !ininputair){
                        dialogTips(detailLang.plantDetails9);//请填写逆变器参数
                        return false;
                    }
                }
                if(!_this.validTel(_this.newincomeDts.plantInfoBean.phoneNum) && $.trim(_this.newincomeDts.plantInfoBean.phoneNum)!=""){
                    dialogTips(detailLang.plantDetails8);//电话号码格式不规范
                    return false;
                }
                if(!validEmail(this.usernewJson.email)){
                    dialogTips($("#val_plant_email"),detailLang.email_err)
                    return;
                }
                var plantName = $.trim($("#val_plantName_creatPlant").val());
                var addDate = ODMPARAMS.volteDate($.trim($("#val_addDate_creatPlant").val()));
                var designPower = parseInt($.trim($("#val_designPower_creatPlant").val())*1000);
                var alias = $.trim($("#val_alias_creatPlant").val());
                var designCompany = $.trim($("#val_designCompany_creatPlant").val());
                var country = $.trim($("#sel_country_creatPlant").val());
                var city = $.trim($("#val_city_creatPlant").val());
                var timezone = $.trim($("#sel_timezone_creatPlant").val());
                var plantType = $.trim($("#sel_plantType_creatPlant").val());
                var wd = $.trim($("#val_wd_creatPlant").val());
                var jd = $.trim($("#val_jd_creatPlant").val());
                var zjsy = $.trim($("#val_zjsy_creatPlant").val());
                var zjsy_uint = $.trim($("#sel_zjsy_uint_creatPlant").val());
                var coal = $.trim($("#val_coal_creatPlant").val());
                var co2 = $.trim($("#val_co2_creatPlant").val());
                var so2 = $.trim($("#val_so2_creatPlant").val());
                if(LANG=='cn'){
                	 var oaddres;
                	if(oldY[0]==wd && oldY[1]==jd){
        				oaddres=[oldX[0],oldX[1]]
        			}else{
        				oaddres=bd09togcj02(jd,wd);
        			}
                    jd=oaddres[0];
                    wd=oaddres[1];
                }
                if(country=='China'||country=='中国')timezone = 8;
                if(wd==22.599999755938214){
                    wd=22.6
                }
                if(jd==113.90000014216038){
                    jd=113.9
                }
           		var errArr=[];
           		var cityBol=false;
           		$.each(searchJson,function(i,d){
           			if(city==d.city){
           				cityBol=true;
           			}
           		})
           		if((!cityBol && city==mobileCity) || $.trim(city)==""){
           			cityBol=true;
           		}
           		
           		if(plantName.length==0)
           			errArr=[$("#val_plantName_creatPlant"),detailLang.not_empty];
           		else if(addDate.length==0)
           			errArr=[$("#val_addDate_creatPlant"),detailLang.not_empty];
           		else if(designPower.length==0 || isNaN(designPower))
           			errArr=[$("#val_designPower_creatPlant"),detailLang.param_err];
           		else if(country.length==0)
           			errArr=[$("#sel_country_creatPlant"),detailLang.not_empty];
           		else if(!cityBol)
           			errArr=[$("#val_city_creatPlant"),detailLang.please_select_search_city];
           		
           		if(errArr.length!=0){
           			dialogTips(errArr[0],errArr[1]);
           			return false;
           		}
           		$(".changeConter").removeClass("edit");
                let _obj = JSON.stringify(this.usernewJson);
                this.userJson = JSON.parse(_obj);
                let objplant = JSON.stringify(this.plantnewJson);
                this.plantJson = JSON.parse(objplant);
                this.usernewJson.serverId=serverId;
                this.usernewJson.isResetPwd=0;
                this.usernewJson.isSendPweToEmail=0;
                _this.resetUser();
                _this.plantJson.addDate=$.trim($("#val_addDate_creatPlant").val());
                _this.plantnewJson.addDate=$.trim($("#val_addDate_creatPlant").val());
           		
                $("#form_creatNormalPlant").ajaxSubmit({
                    url:rootPath+'/deviceManage/plantManage/edit',
                    timeout:1000*120,
                    data : {serverId:serverId,userName:_this.userJson.userName,plantId:plantId,plantName:plantName,addDate:addDate,designPower:designPower,alias:alias,
                        designCompany:designCompany,country:country,city:city,timezone:timezone, plantType: plantType, wd:wd,jd:jd,zjsy:zjsy,zjsy_uint:zjsy_uint,coal:coal,co2:co2,so2:so2,dealer:_this.plantnewJson.dealer,
                        installer:_this.plantnewJson.installer,voltRank:_this.plantnewJson.voltRank,brand:JSON.stringify(_this.plantnewJson.brand),brandModel:JSON.stringify(_this.plantnewJson.brandModel),brandNum:JSON.stringify(_this.plantnewJson.brandNum),supportType:JSON.stringify(_this.plantnewJson.supportType),
                        direction1:_this.plantnewJson.direction1,direction2:_this.plantnewJson.direction2,direction3:_this.plantnewJson.direction3,direction4:_this.plantnewJson.direction4,factoryJson:_this.plantnewJson.factoryJson,cover:_this.plantnewJson.cover,coverRemark:_this.plantnewJson.coverRemark,phoneNum:_this.newincomeDts.plantInfoBean.phoneNum,remark:_this.newincomeDts.plantInfoBean.remark
                    },
                    // data : {serverId:serverId,userName:_this.userJson.AccountName,plantId:plantId,plantName:plantName,addDate:addDate,designPower:designPower,alias:alias,
                    //     designCompany:designCompany,country:country,city:city,timezone:timezone, plantType: plantType, wd:wd,jd:jd,zjsy:zjsy,zjsy_uint:zjsy_uint,coal:coal,co2:co2,so2:so2
                    // },
                    beforeSend : function(){
                        dialogLoading(2,-1);
                    },
                    complete:function(){
                        dialogLoadingClose();
                    },
                    success : function(data){
                        dialogTips(getI18n("save_success"));
                        $("#val_wd_creatPlantP").text($.trim($("#val_wd_creatPlant").val()));
                        $("#val_jd_creatPlantP").text($.trim($("#val_jd_creatPlant").val()));
                        $(".countryText").text(capitalize(country));
                        $(".timeZone").text(timezone);
                    },
                    error:function(XMLHttpRequest, textStatus, errorThrown){
                        if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
                            dialogTips(getI18n('timeout'));
                    }
                });
            },
            validTel:function(str){
                var reg=/^\+?[0-9]{8,16}$/;
                return reg.test(str);
            },
            validEmail:function(str){//邮箱验证
                var reg = /^[a-zA-Z\d]+([a-zA-Z\d_\.]*)@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
                return reg.test(str);
            },
            warrantyCardFun:function(deviceSn,event){
                let _this=this;
                $.ajax({
                    url: rootPath+'/supplySystem/equipmentWarrantyCard',
                    type:'post',
                    dataType:'json',
                    data:{deviceSn: deviceSn},
                    success:function(data){
                        _this.warrantyCard=JSON.parse(JSON.stringify(data.obj));
                    }
                });
                dialogContent({
                    title:detailLang.warranty_card,
                    content:$(".warrantyCard-dialog"),
                });
                event.stopPropagation();
            },
            /* 逆变器 */
            //设置
            clickSetInv:function(deviceSN,type){
            	if(location.search.split('&')[0].slice(7)=='Aftersales'){
            		/*<%--if(type==6)//max
	            		dialogUrl(detailLang.setMax,'deviceManage/inverterManage/setMaxPage',{access:1,serverId:serverId,deviceSn:deviceSN},{width:'650px',height:'590px'});
	            	else if (type == 9) {
	                    dialogUrl(detailLang.set_inverter,'deviceManage/inverterManage/setTlxPage',{access:1,serverId:serverId,deviceSn:deviceSN},{width:'650px',height:'590px'});
	            	} else
	            		dialogUrl(detailLang.set_inverter,'deviceManage/inverterManage/setPage',{access:1,serverId:serverId,deviceSn:deviceSN},{width:'650px',height:'590px'});--%>*/
	            	
	            	if(type==18)//max
	            		layerUrl=ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setMax?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&maxSn='+deviceSN+'&jobId='+JOBID,layerTitle=detailLang.setMax;
	            	else if (type == 22) {
	            		layerUrl=ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setTlx?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&tlxSn='+deviceSN+'&jobId='+JOBID,layerTitle=detailLang.set_inverter;
	            	} else{
	            		layerUrl=ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setInverter?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&invSn='+deviceSN+'&jobId='+JOBID,layerTitle=detailLang.set_inverter;
	            	}
	            	layer.open({
	            	  type: 2,
	            	  title:layerTitle,
	            	  area: '500px',
	            	  content: layerUrl,
	            	  btn: [detailLang.cancel]
	            	  ,yes: function(index, layero){
	            	     //按钮【按钮一】的回调
	            		   layer.close(index);
	            	  },
	            	  success:function(){
	            		  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
	            			$(".layui-layer-content>iframe").css({"height":function(){
	            				return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
	            			}}) 
	            	  }
	            	}); 
            	}else if(location.search.split('&')[0].slice(7)=='distributor'){
            		dialogContent({
            			title:detailLang.hr_Disclaimer,
            			content:$('#dialog-mzsm'),
            			btns:{'i18n_confirm':function(){
            				var checkAgree=$('label.cha>input[type="checkbox"]');
            				if(checkAgree.is(':checked')){
            					dialogClose();
            					checkAgree.removeAttr('checked');
            					/*<%--if(type==6)//max
            	            		dialogUrl(detailLang.setMax,'deviceManage/inverterManage/setMaxPage',{access:1,serverId:serverId,deviceSn:deviceSN},{width:'650px',height:'590px'});
            	            	else if (type == 9) {
            	                    dialogUrl(detailLang.set_inverter,'deviceManage/inverterManage/setTlxPage',{access:1,serverId:serverId,deviceSn:deviceSN},{width:'650px',height:'590px'});
            	            	} else
            	            		dialogUrl(detailLang.set_inverter,'deviceManage/inverterManage/setPage',{access:1,serverId:serverId,deviceSn:deviceSN},{width:'650px',height:'590px'});--%>*/
            	            	
            	            	if(type==18)//max
            	            		layerUrl=ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setMax?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&maxSn='+deviceSN+'&jobId='+JOBID,layerTitle=detailLang.setMax;
            	            	else if (type == 22) {
            	            		layerUrl=ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setTlx?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&tlxSn='+deviceSN+'&jobId='+JOBID,layerTitle=detailLang.set_inverter;
            	            	} else{
            	            		layerUrl=ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setInverter?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&invSn='+deviceSN+'&jobId='+JOBID,layerTitle=detailLang.set_inverter;
            	            	}
            	            	layer.open({
            	            	  type: 2,
            	            	  title:layerTitle,
            	            	  area: '500px',
            	            	  content: layerUrl,
            	            	  btn: [detailLang.cancel]
            	            	  ,yes: function(index, layero){
            	            	     //按钮【按钮一】的回调
            	            		   layer.close(index);
            	            	  },
            	            	  success:function(){
            	            		  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
            	            			$(".layui-layer-content>iframe").css({"height":function(){
            	            				return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
            	            			}}) 
            	            	  }
            	            	}); 
            				}else{
            					dialogTips(detailLang.hr_Please_check_and_agree_first,3000)
            				}
            				},'i18n_cancel':function(){dialogClose();}},
            				success:function(){
            					if($('label.cha').hasClass('sel')){
            						$('label.cha').removeClass('sel');
            						$('.all-bottom-btn>.all-bottom-btn1:nth-child(1)').css({'background-color':'#f2f2f2','color':'#222'})
            					}
            				}
            		})
            	}
            	
            	event.stopPropagation();
            },
            
            //编辑
            clickEditInv:function(sn,deviceType){
            	var _this = this;
            	var el = event.currentTarget;
            	$("#val_sn_plantEditInv").val(sn);
            	$("#val_alias_plantEditInv").val($(el).parent().parent().find('.alias').text());
            	$("#errMsg_plantEditInv").text('');
				
            	dialogContent({
            		title:detailLang.edit+'('+sn+')',
            		content:$('#dialog_plant_editInv'),
            		onBtn:0,
            		btns:{'i18n_confirm':function(){
            			$("#errMsg_plantEditInv").text('');
            			var alias = $.trim($("#val_alias_plantEditInv").val());
            				
            			$.ajax({
            				url:rootPath+'/afterSalesMaintain/inverterManage/asmEditInvNew',
            				data:{serverId:serverId,deviceSN:sn,alias:alias,deviceType:deviceType},
            				beforeSend : function(){
            					dialogLoading(2,-1);
            				},
            				complete:function(){
            					dialogLoadingClose();
            				},
            				success:function(data){
            					if(data.result==1){
            						dialogClose();
            						dialogMsg(getI18n('operat_susccess'));
            						$(el).parent().parent().find('.alias').text(alias);
            						_this.inverterList(1);
            					}else if(data.result==0){
            						$("#errMsg_plantEditInv").text(data.msg);
            					}else{
            						dialogMsg(getI18n('operat_err'));
            					} 
            				},
            				error:function(XMLHttpRequest, textStatus, errorThrown){
            					if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
            						dialogTips(getI18n('timeout'));
            				}
            			});
            		},'i18n_cancel':dialogClose}
            	})
            	$("#val_alias_plantEditInv").focus();
            	event.stopPropagation();
            },
            
            //删除
            clickDelInv:function(sn,deviceType){
            	var el = event.currentTarget;
            	var _this = this;
            	var el = event.currentTarget;
				
            	dialogMsg(detailLang.sure_delete+'?',function(){
            		$.ajax({
            			url:rootPath+'/afterSalesMaintain/inverterManage/asmDelInvNew',
            			timeout:1000*18,
            			data:{serverId:serverId,deviceSN:sn,deviceType:deviceType},
            			beforeSend : function(){
            				dialogLoading(2,-1);
            			},
            			complete:function(){
            				dialogLoadingClose();
            			},
            			success:function(data){
            				dialogClose();
            				if(data.result==1){
            					dialogMsg(detailLang.successfully_deleted);
            					$(el).parent().parent().remove()
            					/* _this.inverterArr = []; */
								var time = setTimeout(function(){
									_this.inverterList(1);
								},2000)
            				}else{
            					dialogMsg(getI18n('operat_err'));
            					dialogTips(getI18n('timeout'));
            				} 
            			},
            			error:function(XMLHttpRequest, textStatus, errorThrown){
            				dialogLoadingClose();
            				if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
            					dialogTips(getI18n('timeout'));
            			}
            		});
            	});
            	event.stopPropagation();
            },
            
          	/* 采集器 */
          	clickSetSel:function(e){
          		var el = e.currentTarget;
          		el.nextElementSibling.style.display='block';
          	},
            //设置
        	clickSetDatalog:function(deviceSN,deviceType,lost){
        		$(".RF_sel").hide();
				if(location.search.split('&')[0].slice(7)=='Aftersales'){
					layer.open({
		        		  type: 2,
		        		  title:detailLang.set_datalog,
		        		  area: '500px',
		        		  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setDatalog?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&datalogSn='+deviceSN+'&jobId='+JOBID,
		        		  btn: [detailLang.cancel]
		        		  ,yes: function(index, layero){
		        		     //按钮【按钮一】的回调
		        			   layer.close(index);
		        		  },
		        		  success:function(){
		        			  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
		        				$(".layui-layer-content>iframe").css({"height":function(){
		        					return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
		        				}}) 
		        		  }
		        		}); 
            	}else if(location.search.split('&')[0].slice(7)=='distributor'){
            		dialogContent({
            			title:detailLang.hr_Disclaimer,
            			content:$('#dialog-mzsm'),
            			btns:{'i18n_confirm':function(){
            				var checkAgree=$('label.cha>input[type="checkbox"]');
            				if(checkAgree.is(':checked')){
            					dialogClose();
            					checkAgree.removeAttr('checked');
            					layer.open({
            		        		  type: 2,
            		        		  title:detailLang.set_datalog,
            		        		  area: '500px',
            		        		  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setDatalog?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&datalogSn='+deviceSN+'&jobId='+JOBID,
            		        		  btn: [detailLang.cancel]
            		        		  ,yes: function(index, layero){
            		        		     //按钮【按钮一】的回调
            		        			   layer.close(index);
            		        		  },
            		        		  success:function(){
            		        			  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
            		        				$(".layui-layer-content>iframe").css({"height":function(){
            		        					return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
            		        				}}) 
            		        		  }
            		        		});  
            				}else{
            					dialogTips(detailLang.hr_Please_check_and_agree_first,3000)
            				}
            				},'i18n_cancel':function(){dialogClose();}},
            				success:function(){
            					if($('label.cha').hasClass('sel')){
            						$('label.cha').removeClass('sel');
            						$('.all-bottom-btn>.all-bottom-btn1:nth-child(1)').css({'background-color':'#f2f2f2','color':'#222'})
            					}
            				}
            		})
            	}
        		
        		event.stopPropagation();
        		//dialogUrl('<spring:message code="set_datalog" />','deviceManage/datalogManage/setPage',{access:1,serverId:serverId,deviceSn:deviceSN},{width:'650px',height:'490px'});
        	},
        	//rf设置
        	clickSetRF:function(sn){
        		$(".RF_sel").hide();
        		layer.open({
        			  type: 2,
        			  title:detailLang.hr_RFStick_equipment,
        			  content: location.protocol+'//'+serverUrl+'/commonDeviceSetC/deviceRFList?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&datalogSn='+sn+'&jobId='+JOBID,
        			  area:'1000px',
        			  success:function(){
        				  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
        				  $(".btn-grayBox .layui-layer-btn").css('left','85%!important')
        					$(".layui-layer-content>iframe").css({"height":function(){
        						return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
        					}}) 
        			  	}
        			});     
        			event.stopPropagation();
        	},
        	//rf配对
        	clickPairRF:function(sn){
        		$(".RF_sel").hide();
        		layer.open({
        			  type: 2,
        			  title:detailLang.hr_Pair_RFStick,
        			  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/pairRF?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&datalogSn='+sn+'&jobId='+JOBID,
        			  area:'500px',
        			  btn: [detailLang.cancel],
        			  yes:function(index, layero){
        				  layer.close(index);
        			  },
        			  success:function(id,dialog){
        				  $(id).addClass('RFtype')
        				  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
        					$(".layui-layer-content>iframe").css({"height":function(){
        						return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
        					}}) 
        			  }
        			});     
        			event.stopPropagation();
        	},
        	//采集器配置
        	clickMasterSet:function(sn){
        		$(".RF_sel").hide();
        		if(location.search.split('&')[0].slice(7)=='Aftersales'){
        			layer.open({
  	       			  type: 2,
  	       			  title:detailLang.collector_configuration,
  	       			  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/datalogMasterSet?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&datalogSn='+sn+'&jobId='+JOBID,
  	       			  btn: [detailLang.cancel],
  	       			  yes:function(index, layero){
  	       				  layer.close(index);
  	       			  },
  	       			  success:function(id,dialog){
  	       				  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
  	       				  $(".layui-layer[type=iframe]").addClass("btn-masterSet")
  	       					$(".layui-layer-content>iframe").css({"height":function(){
  	       						return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
  	       					}}) 
  	       			  }
  	       			}); 
            	}else if(location.search.split('&')[0].slice(7)=='distributor'){
            		dialogContent({
            			title:detailLang.hr_Disclaimer,
            			content:$('#dialog-mzsm'),
            			btns:{'i18n_confirm':function(){
            				var checkAgree=$('label.cha>input[type="checkbox"]');
            				if(checkAgree.is(':checked')){
            					dialogClose();
            					checkAgree.removeAttr('checked');
            					layer.open({
            		       			  type: 2,
            		       			  title:detailLang.collector_configuration,
            		       			  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/datalogMasterSet?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&datalogSn='+sn+'&jobId='+JOBID,
            		       			  btn: [detailLang.cancel],
            		       			  yes:function(index, layero){
            		       				  layer.close(index);
            		       			  },
            		       			  success:function(id,dialog){
            		       				  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
            		       				  $(".layui-layer[type=iframe]").addClass("btn-masterSet")
            		       					$(".layui-layer-content>iframe").css({"height":function(){
            		       						return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
            		       					}}) 
            		       			  }
            		       		});  
            				}else{
            					dialogTips(detailLang.hr_Please_check_and_agree_first,3000)
            				}
            				},'i18n_cancel':function(){dialogClose();}},
            				success:function(){
            					if($('label.cha').hasClass('sel')){
            						$('label.cha').removeClass('sel');
            						$('.all-bottom-btn>.all-bottom-btn1:nth-child(1)').css({'background-color':'#f2f2f2','color':'#222'})
            					}
            				}
            		})
            	}
	       		event.stopPropagation();
        	},
        	//编辑
        	clickEditDatalog:function(sn){
        		var el = event.currentTarget;
        		var _this = this;
        		$("#val_sn_plantEditInv").val(sn);
        		$("#val_alias_plantEditInv").val($(el).parent().parent().find('.alias').text());
        		$("#errMsg_plantEditInv").text('');
        		dialogContent({
        			title:detailLang.edit+'('+sn+')',
        			content:$('#dialog_plant_editInv'),
        			onBtn:0,
        			btns:{'i18n_confirm':function(){
        				$("#errMsg_plantEditInv").text('');
        				var alias = $.trim($("#val_alias_plantEditInv").val());
        					
        				$.ajax({
        					url:rootPath+'/afterSalesMaintain/datalogManage/asmEditDatalog',
        					data:{serverId:serverId,deviceSN:sn,alias:alias},
        					beforeSend : function(){
        						dialogLoading(2,-1);
        					},
        					complete:function(){
        						dialogLoadingClose();
        					},
        					success:function(data){
        						if(data.result==1){
        							dialogClose();
        							dialogMsg(getI18n('operat_susccess'));
        							$(el).parent().parent().find('.alias').text(alias);
        							_this.collectorList(1);
        						}else if(data.result==0){
        							$("#errMsg_plantEditInv").text(data.msg);
        						}else{
        							dialogMsg(getI18n('operat_err'));
        						} 
        					},
        					error:function(XMLHttpRequest, textStatus, errorThrown){
        						if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
        							dialogTips(getI18n('timeout'));
        					}
        				});
        			},'i18n_cancel':dialogClose}
        		})
        		$("#val_alias_plantEditInv").focus();
        		event.stopPropagation();
        	},
            //删除 
            clickDelDatalog:function(sn){
            	var el = event.currentTarget;
            	var _this = this;
        		dialogMsg(detailLang.sure_delete+"?<br/>("+detailLang.delete_user_datalog_retain_information+")",function(){
        			$.ajax({
        				url:rootPath+'/afterSalesMaintain/datalogManage/asmDelDatalog',
        				timeout:1000*18,
        				data:{serverId:serverId,deviceSN:sn},
        				beforeSend : function(){
        					dialogLoading(2,-1);
        				},
        				complete:function(){
        					dialogLoadingClose();
        				},
        				success:function(data){
        					dialogClose();
        					_this.cillectorArr = [];
        					if(data.result==1){
        						dialogMsg(detailLang.successfully_deleted);
        						/* $(el).parent().parent().find('.accountName,.plantName').text('');
        						$(el).css('visibility','hidden'); */
        						$(el).parent().parent().remove()
        						_this.collectorList(1);
        					}else{
        						dialogMsg(getI18n('operat_err'));
        						dialogTips(getI18n('timeout'));
        					} 
        				},
        				error:function(XMLHttpRequest, textStatus, errorThrown){
        					dialogLoadingClose();
        					if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
        						dialogTips(getI18n('timeout'));
        				}
        			});
        		});
        		event.stopPropagation();
        	},
        	/* 储能机 */
        	//设置
        	clickSetStorage:function(deviceSN){
				if(location.search.split('&')[0].slice(7)=='Aftersales'){
					layer.open({
		        		  type: 2,
		        		  title:detailLang.set_storage,
		        		  area: '500px',
		        		  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setStorage?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&storageSn='+deviceSN+'&jobId='+JOBID,
		        		  btn: [detailLang.cancel]
		        		  ,yes: function(index, layero){
		        		     //按钮【按钮一】的回调
		        			   layer.close(index);
		        		  },
		        		  success:function(){
		        			  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
		        				$(".layui-layer-content>iframe").css({"height":function(){
		        					return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
		        				}}) 
		        		  }
		        	}); 
            	}else if(location.search.split('&')[0].slice(7)=='distributor'){
            		dialogContent({
            			title:detailLang.hr_Disclaimer,
            			content:$('#dialog-mzsm'),
            			btns:{'i18n_confirm':function(){
            				var checkAgree=$('label.cha>input[type="checkbox"]');
            				if(checkAgree.is(':checked')){
            					dialogClose();
            					checkAgree.removeAttr('checked');
            					layer.open({
            		        		  type: 2,
            		        		  title:detailLang.set_storage,
            		        		  area: '500px',
            		        		  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setStorage?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&storageSn='+deviceSN+'&jobId='+JOBID,
            		        		  btn: [detailLang.cancel]
            		        		  ,yes: function(index, layero){
            		        		     //按钮【按钮一】的回调
            		        			   layer.close(index);
            		        		  },
            		        		  success:function(){
            		        			  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
            		        				$(".layui-layer-content>iframe").css({"height":function(){
            		        					return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
            		        				}}) 
            		        		  }
            		        	}); 
            				}else{
            					dialogTips(detailLang.hr_Please_check_and_agree_first,3000)
            				}
            				},'i18n_cancel':function(){dialogClose();}},
            				success:function(){
            					if($('label.cha').hasClass('sel')){
            						$('label.cha').removeClass('sel');
            						$('.all-bottom-btn>.all-bottom-btn1:nth-child(1)').css({'background-color':'#f2f2f2','color':'#222'})
            					}
            				}
            			})
            	}
        		//dialogUrl('<spring:message code="set_storage"></spring:message></span>','deviceManage/storageManage/setPage',{access:1,serverId:serverId,deviceSn:deviceSN},{width:'650px',height:'660px'});
        		
        		event.stopPropagation();
        	},
        	//编辑
        	clickEditStorage:function(sn){
        		var el = event.currentTarget;
        		var _this = this;
        		$("#val_sn_plantEditInv").val(sn);
        		$("#val_alias_plantEditInv").val($(el).parent().parent().find('.alias').text());
        		$("#errMsg_plantEditInv").text('');
        		dialogContent({
        			title:detailLang.edit+'('+sn+')',
        			content:$('#dialog_plant_editInv'),
        			onBtn:0,
        			btns:{'i18n_confirm':function(){
        				$("#errMsg_plantEditInv").text('');
        				var alias = $.trim($("#val_alias_plantEditInv").val());
        					
        				$.ajax({
        					url:rootPath+'/afterSalesMaintain/storageManage/asmEditStorage',
        					data:{serverId:serverId,deviceSN:sn,alias:alias},
        					beforeSend : function(){
        						dialogLoading(2,-1);
        					},
        					complete:function(){
        						dialogLoadingClose();
        					},
        					success:function(data){
        						if(data.result==1){
        							dialogClose();
        							dialogMsg(getI18n('operat_susccess'));
        							$(el).parent().parent().find('.alias').text(alias);
        							_this.storageList(1);
        						}else if(data.result==0){
        							$("#errMsg_plantEditInv").text(data.msg);
        						}else{
        							dialogMsg(getI18n('operat_err'));
        						} 
        					},
        					error:function(XMLHttpRequest, textStatus, errorThrown){
        						if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
        							dialogTips(getI18n('timeout'));
        					}
        				});
        			},'i18n_cancel':dialogClose}
        		})
        		$("#val_alias_editStorage").focus();
        		event.stopPropagation();
        	},
        	//删除
        	clickDelStorage:function(sn){
        		var el = event.currentTarget;
        		var _this = this;
        		dialogMsg(detailLang.sure_delete+'?',function(){
        			$.ajax({
        				url:rootPath+'/afterSalesMaintain/storageManage/asmDelStorageNew',
        				timeout:1000*18,
        				data:{serverId:serverId,deviceSN:sn},
        				beforeSend : function(){
        					dialogLoading(2,-1);
        				},
        				complete:function(){
        					dialogLoadingClose();
        				},
        				success:function(data){
        					dialogClose();
        					if(data.result==1){
        						dialogMsg(detailLang.successfully_deleted);
        						$(el).parent().parent().remove()
        						_this.storageList(1);
        					}else{
        						dialogMsg(getI18n('operat_err'));
        						dialogTips(getI18n('timeout'));
        					} 
        				},
        				error:function(XMLHttpRequest, textStatus, errorThrown){
        					dialogLoadingClose();
        					if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
        						dialogTips(getI18n('timeout'));
        				}
        			});
        		});
        		event.stopPropagation();
        	},
            /* 混储一体机 */
            //设置
        	clickSetMIX:function(deviceSN){
        		//if(type==5)//MIX
        		//	dialogUrl('<spring:message code="auth_set_mix"></spring:message>','deviceManage/mixManage/setPage',{access:1,serverId:serverId,deviceSn:deviceSN},{width:'650px',height:'650px'});
        		/* if(type==5){
        		var serverList='${services}';
        		var serverUrl='';
        		$.each(JSON.parse(serverList),function(i,d){
        			if(d.serverId==serverId){
        				serverUrl=d.serverUrl;
        			}
        		}) */
				if(location.search.split('&')[0].slice(7)=='Aftersales'){
					layer.open({
		        		  type: 2,
		        		  title:detailLang.auth_set_mix,
		        		  area: '500px',
		        		  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setMix?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&mixSn='+deviceSN+'&jobId='+JOBID,
		        		  btn: [detailLang.cancel]
		        		  ,yes: function(index, layero){
		        		     //按钮【按钮一】的回调
		        			   layer.close(index);
		        		  },
		        		  success:function(){
		        			  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
		        				$(".layui-layer-content>iframe").css({"height":function(){
		        					return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
		        				}}) 
		        		  }
		        		}); 
            	}else if(location.search.split('&')[0].slice(7)=='distributor'){
            		dialogContent({
            			title:detailLang.hr_Disclaimer,
            			content:$('#dialog-mzsm'),
            			btns:{'i18n_confirm':function(){
            				var checkAgree=$('label.cha>input[type="checkbox"]');
            				if(checkAgree.is(':checked')){
            					dialogClose();
            					checkAgree.removeAttr('checked');
            					layer.open({
            		        		  type: 2,
            		        		  title:detailLang.auth_set_mix,
            		        		  area: '500px',
            		        		  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setMix?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&mixSn='+deviceSN+'&jobId='+JOBID,
            		        		  btn: [detailLang.cancel]
            		        		  ,yes: function(index, layero){
            		        		     //按钮【按钮一】的回调
            		        			   layer.close(index);
            		        		  },
            		        		  success:function(){
            		        			  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
            		        				$(".layui-layer-content>iframe").css({"height":function(){
            		        					return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
            		        				}}) 
            		        		  }
            		        		}); 
            				}else{
            					dialogTips(detailLang.hr_Please_check_and_agree_first,3000)
            				}
            				},'i18n_cancel':function(){dialogClose();}},
            				success:function(){
            					if($('label.cha').hasClass('sel')){
            						$('label.cha').removeClass('sel');
            						$('.all-bottom-btn>.all-bottom-btn1:nth-child(1)').css({'background-color':'#f2f2f2','color':'#222'})
            					}
            				}
            		})
            	}
        		
        		/* } */
        		event.stopPropagation();
        	},
        	//编辑
        	clickEditMIX:function(sn,deviceType){
        		var _this = this;
        		var el = event.currentTarget;
        		$("#val_sn_plantEditInv").val(sn);
        		$("#val_alias_plantEditInv").val($(el).parent().parent().find('.alias').text());
        		$("#errMsg_plantEditInv").text('');
        		dialogContent({
        			title:detailLang.edit+'('+sn+')',
        			content:$('#dialog_plant_editInv'),
        			onBtn:0,
        			btns:{'i18n_confirm':function(){
        				$("#errMsg_plantEditInv").text('');
        				var alias = $.trim($("#val_alias_plantEditInv").val());
        					
        				$.ajax({
        					url:rootPath+'/afterSalesMaintain/mixManage/asmEditMIX',
        					data:{serverId:serverId,deviceSN:sn,alias:alias,deviceType:deviceType},
        					beforeSend : function(){
        						dialogLoading(2,-1);
        					},
        					complete:function(){
        						dialogLoadingClose();
        					},
        					success:function(data){
        						if(data.result==1){
        							dialogClose();
        							dialogMsg(getI18n('operat_susccess'));
        							$(el).parent().parent().find('.alias').text(alias);
        							_this.machineList(1);
        						}else if(data.result==0){
        							$("#errMsg_plantEditInv").text(data.msg);
        						}else{
        							dialogMsg(getI18n('operat_err'));
        						} 
        					},
        					error:function(XMLHttpRequest, textStatus, errorThrown){
        						if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
        							dialogTips(getI18n('timeout'));
        					}
        				});
        			},'i18n_cancel':dialogClose}
        		})
        		$("#val_alias_plantEditInv").focus();
        		event.stopPropagation();
        	},
        	//删除
        	clickDelMIX:function(sn){
        		var el = event.currentTarget;
        		var _this = this;
        		dialogMsg(detailLang.sure_delete+'?',function(){
        			$.ajax({
        				url:rootPath+'/afterSalesMaintain/mixManage/asmDelMIXNew',
        				timeout:1000*18,
        				data:{serverId:serverId,deviceSN:sn},
        				beforeSend : function(){
        					dialogLoading(2,-1);
        				},
        				complete:function(){
        					dialogLoadingClose();
        				},
        				success:function(data){
        					dialogClose();
        					if(data.result==1){
        						dialogMsg(detailLang.successfully_deleted);
        						$(el).parent().parent().remove()
        						_this.machineList(1);
        					}else{
        						dialogMsg(getI18n('operat_err'));
        						dialogTips(getI18n('timeout'));
        					} 
        				},
        				error:function(XMLHttpRequest, textStatus, errorThrown){
        					dialogLoadingClose();
        					if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
        						dialogTips(getI18n('timeout'));
        				}
        			});
        		});
        		event.stopPropagation();
        	},
        	/* 智能电表 */
        	//编辑
        	clickEditMETER:function(sn,address,selfDeviceType){
        		var _this = this;
        		var el = event.currentTarget;
        		$("#val_sn_plantEditInv").val(sn);
        		$("#val_alias_plantEditInv").val($(el).parent().parent().find('.alias').text());
        		$("#errMsg_plantEditInv").text('');
        		dialogContent({
        			title:detailLang.edit+'('+sn+')',
        			content:$('#dialog_plant_editInv'),
        			onBtn:0,
        			btns:{'i18n_confirm':function(){
        				$("#errMsg_plantEditInv").text('');
        				var alias = $.trim($("#val_alias_plantEditInv").val());
        					
        				$.ajax({
        					url:rootPath+'/afterSalesMaintain/meterManage/asmEditMETERNew',
        					data:{serverId:serverId,deviceSN:sn,alias:alias,address:address,selfDeviceType:selfDeviceType},
        					beforeSend : function(){
        						dialogLoading(2,-1);
        					},
        					complete:function(){
        						dialogLoadingClose();
        					},
        					success:function(data){
        						if(data.result==1){
        							dialogClose();
        							dialogMsg(getI18n('operat_susccess'));
        							$(el).parent().parent().find('.alias').text(alias);
        							_this.meterList(1);
        						}else if(data.result==0){
        							$("#errMsg_plantEditInv").text(data.msg);
        						}else{
        							dialogMsg(getI18n('operat_err'));
        						} 
        					},
        					error:function(XMLHttpRequest, textStatus, errorThrown){
        						if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
        							dialogTips(getI18n('timeout'));
        					}
        				});
        			},'i18n_cancel':dialogClose}
        		})
        		$("#val_alias_plantEditInv").focus();
        		event.stopPropagation();
        	},
        	//删除
        	clickDelMETER:function(sn,address,selfdeviceType){
        		var _this = this;
        		var el = event.currentTarget;
        		dialogMsg(detailLang.sure_delete+'?',function(){
        			$.ajax({
        				url:rootPath+'/afterSalesMaintain/meterManage/asmDelMETER',
        				timeout:1000*18,
        				data:{serverId:serverId,deviceSN:sn,address:address,selfDeviceType:selfdeviceType},
        				beforeSend : function(){
        					dialogLoading(2,-1);
        				},
        				complete:function(){
        					dialogLoadingClose();
        				},
        				success:function(data){
        					dialogClose();
        					if(data.result==1){
        						dialogMsg(detailLang.successfully_deleted);
        						$(el).parent().parent().remove()
        						_this.meterList(1);
        					}else{
        						dialogMsg(getI18n('operat_err'));
        						dialogTips(getI18n('timeout'));
        					} 
        				},
        				error:function(XMLHttpRequest, textStatus, errorThrown){
        					dialogLoadingClose();
        					if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
        						dialogTips(getI18n('timeout'));
        				}
        			});
        		});
        	},
        	
        	/* 外置PID箱 */	
        	//设置
        	clickSetPid:function(deviceSN,deviceType,lost){
				if(location.search.split('&')[0].slice(7)=='Aftersales'){
					layer.open({
		        		  type: 2,
		        		  title:detailLang.fhh_Setting_up_an_external_PID_box,//设置外置PID
		        		  area: '500px',
		        		  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setPid?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&pidSn='+deviceSN+'&jobId='+JOBID,
		        		  btn: [detailLang.cancel]
		        		  ,yes: function(index, layero){
		        		     //按钮【按钮一】的回调
		        			   layer.close(index);
		        		  },
		        		  success:function(){
		        			  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
		        				$(".layui-layer-content>iframe").css({"height":function(){
		        					return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
		        				}}) 
		        		  }
		        		}); 
            	}else if(location.search.split('&')[0].slice(7)=='distributor'){
            		dialogContent({
            			title:detailLang.hr_Disclaimer,
            			content:$('#dialog-mzsm'),
            			btns:{'i18n_confirm':function(){
            				var checkAgree=$('label.cha>input[type="checkbox"]');
            				if(checkAgree.is(':checked')){
            					dialogClose();   
            					checkAgree.removeAttr('checked');
            					layer.open({
            		        		  type: 2,
            		        		  title:detailLang.fhh_Setting_up_an_external_PID_box,//设置外置PID
            		        		  area: '500px',
            		        		  content: ODMPARAMS.getServerProtocol(serverUrl)+'/commonDeviceSetC/setPid?type=OSS&lang='+(LANG!="ft"?LANG:"hk")+'&pidSn='+deviceSN+'&jobId='+JOBID,
            		        		  btn: [detailLang.cancel]
            		        		  ,yes: function(index, layero){
            		        			   layer.close(index);
            		        		  },
            		        		  success:function(){
            		        			  $(".layui-layer[type=iframe]").addClass("btn-grayBox")
            		        				$(".layui-layer-content>iframe").css({"height":function(){
            		        					return parseInt($(".btn-grayBox").css("height"))*1-38+'px'
            		        				}}) 
            		        		  }
            		        		});  
            				}else{
            					dialogTips(detailLang.hr_Please_check_and_agree_first,3000)
            				}
            				},'i18n_cancel':function(){dialogClose();}},
            				success:function(){
            					if($('label.cha').hasClass('sel')){
            						$('label.cha').removeClass('sel');
            						$('.all-bottom-btn>.all-bottom-btn1:nth-child(1)').css({'background-color':'#f2f2f2','color':'#222'})
            					}
            				}
            		})
            	}
        		event.stopPropagation();
        	},
        	//编辑
        	clickEditPid:function(sn,type){
        		var el = event.currentTarget;
        		var _this = this;
        		$("#val_sn_plantEditInv").val(sn);
        		$("#val_alias_plantEditInv").val($(el).parent().parent().find('.alias').text());
        		$("#errMsg_plantEditInv").text('');
        		dialogContent({
        			title:detailLang.edit+'('+sn+')',
        			content:$('#dialog_plant_editInv'),
        			onBtn:0,
        			btns:{'i18n_confirm':function(){
        				$("#errMsg_plantEditInv").text('');
        				var alias = $.trim($("#val_alias_plantEditInv").val());
        				$.ajax({
        					url:rootPath+'/afterSalesMaintain/pidManage/asmEditPID',
        					data:{serverId:serverId,deviceSN:sn,alias:alias,deviceType:type},
        					beforeSend : function(){
        						dialogLoading(2,-1);
        					},
        					complete:function(){
        						dialogLoadingClose();
        					},
        					success:function(data){
        						if(data.result==1){
        							dialogClose();
        							dialogMsg(getI18n('operat_susccess'));
        							$(el).parent().parent().find('.alias').text(alias);
        							_this.collectorList(1);
        						}else if(data.result==0){
        							$("#errMsg_plantEditInv").text(data.msg);
        						}else{
        							dialogMsg(getI18n('operat_err'));
        						} 
        					},
        					error:function(XMLHttpRequest, textStatus, errorThrown){
        						if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
        							dialogTips(getI18n('timeout'));
        					}
        				});
        			},'i18n_cancel':dialogClose}
        		})
        		$("#val_alias_plantEditInv").focus();
        		event.stopPropagation();
        	},
            //删除 
            clickDelPid:function(sn){
            	var el = event.currentTarget;
            	var _this = this;
        		dialogMsg(detailLang.sure_delete+"?<br/>("+ detailLang.fhh_Delete_the_relationship_between +")",function(){
        			$.ajax({
        				url:rootPath+'/deviceManage/asmDelPIDNew',
        				timeout:1000*18,
        				data:{serverId:serverId,deviceSN:sn},
        				beforeSend : function(){
        					dialogLoading(2,-1);
        				},
        				complete:function(){
        					dialogLoadingClose();
        				},
        				success:function(data){
        					dialogClose();
        					_this.cillectorArr = [];
        					if(data.result==1){
        						dialogMsg(detailLang.successfully_deleted);
        						$(el).parent().parent().remove()
        						_this.collectorList(1);
        					}else{
        						dialogMsg(getI18n('operat_err'));
        						dialogTips(getI18n('timeout'));
        					} 
        				},
        				error:function(XMLHttpRequest, textStatus, errorThrown){
        					dialogLoadingClose();
        					if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
        						dialogTips(getI18n('timeout'));
        				}
        			});
        		});
        		event.stopPropagation();
        	},
        	
        	//tl-xh us状态显示（pto）
        	showPtoStatus:function(status,ptoStatus,selfDeviceType){
				if(status=='0'){
					if(selfDeviceType=='2'){
						if(ptoStatus=='1')
							return '<span class="dgjColor">'+detailLang.hj_status_Standby_manual_shutdown+'</span>';
						else if(ptoStatus=='2')
							return '<span class="dgjColor">'+detailLang.hj_status_Standby_PTO+'</span>';
						else
							return '<span class="dgjColor">'+detailLang.hj_status_common_standby+'</span>';
					}else{
						return '<span class="dgjColor">'+detailLang.hj_status_wait+'</span>';
					}
				}else if(status=='-1'){
					return '<span>'+detailLang.hj_status_offline+'</span>';
				}else if(status=='3'){
					return '<span class="wclColor">'+detailLang.hj_status_malfunction+'</span>';
				}else{
					return '<span class="zzclColor">'+detailLang.hj_status_online+'</span>';
				}
			},
        	
            showPanel:function(index){
                let _this=this;
                this.panelList(1,true);
                layui.use('laypage', function(){
                    var laypage = layui.laypage;
                    initPager('panelPage',_this.panelListJson.pages,index ? index :_this.panelListJson.currPage,function(obj, first){
                        _this.panelListDatanth=(obj.curr-1)*10;
                        _this.panelList(obj.curr)
                    });
                });
            },
            panelList:function(page,bol){
                let _this=this;
                $.ajax({
                    url: rootPath+'/deviceManage/listPanelManagement',
                    headers:{"oss.userName":userName},
                    type:'post',
                    async:false,
                    dataType:'json',
                    data:{plantId:plantId,page:page},
                    success:function(data){
                        if(data){
                            _this.panelListTotal=data.obj.total;
                            _this.panelListData=data.obj.datas;
                            _this.panelListJson=data.obj;
                            var _obj = JSON.stringify(data.obj.datas);
                            _this.newpanelListData = JSON.parse(_obj);
                            if(bol)setTimeout(
                                function(){
                                    dialogContent({
                                        title:detailLang.panel_management,
                                        content:$(".panel-dialog"),
                                        onBtn:0
                                    });
                                },50)
                        }
                    }
                });
            },
            addPaneldata:function(){
                let _this=this;
                var thisdata={vendorInformation:"",panelModel:"",lengths:"",widths:"",panelNth:"",voltage:"",current:"",mppVoltage:"",mppCurrent:"",voltageCoefficient:"",currentCoefficient:"",plantId:plantId}
                _this.panelListData.push(thisdata);
                _this.newpanelListData.push(thisdata);
                $(".panel-dialog-con tbody tr").removeClass("eidts");
                setTimeout(function(){$(".panel-dialog tr").eq($(".panel-dialog tr").length-1).addClass("eidts");},20);
                _this.addPanelbol=true;
            },
            resetUser:function(){
                let _this=this;
                $.ajax({
                    url: rootPath+'/deviceManage/userManage/edit',
                    type:'post',
                    dataType:'json',
                    data:_this.usernewJson,
                    success:function(data){
                    }
                });
            },
            resetPassword:function(){
                let _this=this;
                dialogContent({
                    title:detailLang.tips,
                    content:$(".ispassword-dialog"),
                    onBtn:0,
                    width:200,
                    btns:{'i18n_confirm':function(){
                            _this.usernewJson.serverId=serverId;
                            _this.usernewJson.isResetPwd=1;
                            _this.usernewJson.isSendPweToEmail=0;
                            $.ajax({
                                url: rootPath+'/deviceManage/userManage/edit',
                                type:'post',
                                dataType:'json',
                                data:_this.usernewJson,
                                success:function(data){
                                }
                            });
                            dialogClose();
                        },'i18n_cancel':dialogClose}
                });
            },
            intitime:function(){
                $(".Curdatetime").val(ODMPARAMS.convertDate(this.localtime));
                $(".Curday").val(ODMPARAMS.convertDate(mydate.getFullYear()+'-'+addZero(mydate.getMonth()+1)));
                $(".Curmonth").val(mydate.getFullYear());
                $(".Curyear").val(mydate.getFullYear());
            },
            tableListShow:function(_this,tableList){//列表展开关闭
                if($("#"+_this).children("i").hasClass("up")){
                    $("#"+_this).find("em").text(detailLang.collapse);//收起
                    $("#"+_this).children("i").removeClass("up").addClass("down");
                    $("."+tableList).css("height","auto");
                }else{
                    $("#"+_this).find("em").text(detailLang.expand);//展开
                    $("#"+_this).children("i").removeClass("down").addClass("up");
                    $("."+tableList).css("height",0);
                }
            },
            clicktimeType:function(obj,type){//当日发电量
                let _this=this;
                if(_this.liDisabled){
            		return false;
            	}
            	_this.liDisabled = true;
				_this.timeLimit(obj,type);
                $(obj).find("li").eq(type).addClass("cur").siblings("li").removeClass("cur");
                $(obj).next(".calendarSelect").find("input").eq(type).show().siblings("input").hide();
//                 $(obj).find("li").eq(type).addClass("").siblings("li").addClass("timeSet");
//                 $(obj).next(".calendarSelect").addClass("timeSet");
//                 $(obj).next(".calendarSelect").find("input").eq(type).attr("disabled","disabled");
                var year = $(".Curdatetime").val();
                for(var i=0;i<_this.ParamArr.serverId.length;i++){
                    $.ajax({
                        url: rootPath+'/deviceManage/getDevicesChartData',
                        type:'post',
                        dataType:'json',
                        data:{serverId:serverId,date:year,plantId:plantId,param:"day"},
                        success:function(data){
                        	var dataArr = [];
                            var arr = [];
                            $.each(data.day,function(k,datas){
                                if(k<120){
                                    if(k%12<2){
                                        arr.push("0"+parseInt(k/12)+":0"+k%12*5)
                                    }else{
                                        arr.push("0"+parseInt(k/12)+":"+k%12*5)
                                    }

                                }else{
                                    if(k%12<2){
                                        arr.push(parseInt(k/12)+":0"+k%12*5)
                                    }else{
                                        arr.push(parseInt(k/12)+":"+k%12*5)
                                    }
                                }
                                //arr.push(k)
                                dataArr.push(datas);
                            })
                            _this.ComparisonChart(dataArr,arr);
                        }
                    })
                }
                _this.dateNths=1;
            },
            clicktimeDay:function(obj,type){//日
                let _this=this;
                if(_this.liDisabled){
            		return false;
            	}
            	_this.liDisabled = true;
            	_this.timeLimit(obj,type);
                $(obj).find("li").eq(type).addClass("cur").siblings("li").removeClass("cur");
                $(obj).next(".calendarSelect").find("input").eq(type).show().siblings("input").hide();
                var now   = new Date();
                var year = $(".Curday").val();
                if(_this.isCharge){
                _this.getChargeData()
                }else{
                $.ajax({
                    url: rootPath+'/deviceManage/getDevicesChartData',
                    type:'post',
                    dataType:'json',
                    data:{serverId:serverId,date:year,plantId:plantId,param:"month"},
                    success:function(data){
                        var dataArr = [];
                        var arr = [];
                        $.each(data.month[year],function(k,datas){
                            arr.push(k)
                            dataArr.push(datas);
                        })
                        _this.ComparisonChartTow(dataArr,arr);
                    }
                })
                 }
                _this.dateNths=type;
            },
            clicktimeMonth:function(obj,type){//月
                let _this=this;
                if(_this.liDisabled){
            		return false;
            	}
            	_this.liDisabled = true;
                _this.timeLimit(obj,type);
                $(obj).find("li").eq(type).addClass("cur").siblings("li").removeClass("cur");
                $(obj).next(".calendarSelect").find("input").eq(type).show().siblings("input").hide();
                var now   = new Date();
                var year  = $(".Curmonth").val();
                if(_this.isCharge){
                _this.getChargeData()
                }else{
                $.ajax({
                    url: rootPath+'/deviceManage/getDevicesChartData',
                    type:'post',
                    dataType:'json',
                    data:{serverId:serverId,date:year,plantId:plantId,param:"year"},
                    success:function(data){
                        var dataArr = [];
                        var arr = [];
                        $.each(data.year[year],function(k,datas){
                            arr.push(k)
                            dataArr.push(datas);
                        })
                        _this.ComparisonChartTow(dataArr,arr);
                    }
                })
                }
                _this.dateNths=type;
            },
            clicktimeYear:function(obj,type){//月
                let _this=this;
                if(_this.liDisabled){
            		return false;
            	}
            	_this.liDisabled = true;
                _this.timeLimit(obj,type);
                $(obj).find("li").eq(type).addClass("cur").siblings("li").removeClass("cur");
                $(obj).next(".calendarSelect").find("input").eq(type).show().siblings("input").hide();
                var now   = new Date();
                var year  = $(".Curyear").val();
                if(_this.isCharge){
                _this.getChargeData()
                }else{
                $.ajax({
                    url: rootPath+'/deviceManage/getDevicesChartData',
                    type:'post',
                    dataType:'json',
                    data:{serverId:serverId,date:year,plantId:plantId,param:"total_5"},
                    success:function(data){
                        var dataArr = [];
                        var arr = [];
                        $.each(data.total,function(k,datas){
                            arr.push(k)
                            dataArr.push(datas);
                        })
                        _this.ComparisonChartTow(dataArr,arr);
                    }
                })
                }
                _this.dateNths=type;
            },
            add_zero:function(temp){
                if(temp<10) return "0"+temp;
                else return temp;
            },
            datatimeSet:function(objClass,newCurtime){
                let _this=this;
                var newCurtime=null;
                $(objClass).find(".prevDay").on("click",function(){
                    var timeType=$(objClass).find('li.cur').text();
                    if(timeType==getI18n("time_tow")){
                        var curtime=ODMPARAMS.volteDate($(objClass).find(".Curdatetime").val());
                        newCurtime=_this.getDateText(new Date(curtime).setDate(new Date(curtime).getDate()-1));
                        $(objClass).find(".Curdatetime").val(ODMPARAMS.convertDate(newCurtime));
                        // _this.clicktimeType(".dateSelectUl2",0);
                        _this.plantContrast(0,_this.ParamArr,'day')
                    }
                    if(timeType==getI18n("date_sunday")){
                        var curtime=ODMPARAMS.volteDate($(objClass).find(".Curday").val());
                        newCurtime=_this.getDateText2(new Date(curtime).setMonth(new Date(curtime).getMonth()-1));
                        $(objClass).find(".Curday").val(ODMPARAMS.convertDate(newCurtime));
                        // _this.clicktimeDay(".dateSelectUl2",1);
                        _this.plantContrast(1,_this.ParamArr,'month')
                    }
                    if(timeType==getI18n("month")){
                        var curtime=$(objClass).find(".Curmonth").val();
                        newCurtime=_this.getDateText3(new Date(curtime).setFullYear(new Date(curtime).getFullYear()-1));
                        $(objClass).find(".Curmonth").val(newCurtime);
                        // _this.clicktimeMonth(".dateSelectUl2",2);
                        _this.plantContrast(2,_this.ParamArr,'year')
                    }
                    if(timeType==getI18n("year")){
                        var curtime=$(objClass).find(".Curyear").val();
                        newCurtime=_this.getDateText3(new Date(curtime).setFullYear(new Date(curtime).getFullYear()-1));
                        $(objClass).find(".Curyear").val(newCurtime);
                        // _this.clicktimeYear(".dateSelectUl2",3);
                        _this.plantContrast(3,_this.ParamArr,'total_5')
                    }

                })

                $(objClass).find(".NextDay").on("click",function(){
                    var timeType=$(objClass).find('li.cur').text();
                    if(timeType==getI18n("time_tow")){
                        var curtime=ODMPARAMS.volteDate($(objClass).find(".Curdatetime").val());
                        newCurtime=_this.getDateText(new Date(curtime).setDate(new Date(curtime).getDate()+1));
                        $(objClass).find(".Curdatetime").val(ODMPARAMS.convertDate(newCurtime));
                        _this.clicktimeType(".dateSelectUl",0);
                    }
                    if(timeType==getI18n("date_sunday")){
                        var curtime=ODMPARAMS.volteDate($(objClass).find(".Curday").val());
                        newCurtime=_this.getDateText2(new Date(curtime).setMonth(new Date(curtime).getMonth()+1));
                        $(objClass).find(".Curday").val(ODMPARAMS.convertDate(newCurtime));
                        if(_this.isCharge){
                            _this.getChargeData()
                        }else{
                            _this.clicktimeDay(".dateSelectUl",1);
                        }  
                    }
                    if(timeType==getI18n("month")){
                        var curtime=$(objClass).find(".Curmonth").val();
                        newCurtime=_this.getDateText3(new Date(curtime).setFullYear(new Date(curtime).getFullYear()+1));
                        $(objClass).find(".Curmonth").val(newCurtime);
                        if(_this.isCharge){
                            _this.getChargeData()
                        }else{
                            _this.clicktimeMonth(".dateSelectUl",2);
                        }    
                    }
                    if(timeType==getI18n("year")){
                        var curtime=$(objClass).find(".Curyear").val();
                        newCurtime=_this.getDateText3(new Date(curtime).setFullYear(new Date(curtime).getFullYear()+1));
                        $(objClass).find(".Curyear").val(newCurtime);
                        if(_this.isCharge){
                            _this.getChargeData()
                        }else{
                            _this.clicktimeMonth(".dateSelectUl",3);
                        }  
                    }
                })
            },
            getDateText:function(time){//2018-5-22
                var d=new Date(time);
                return d.getFullYear()+'-'+addZero(d.getMonth()+1)+'-'+addZero(d.getDate());
            },
            getDateText2:function(time){//2018-5-22
                var d=new Date(time);
                return d.getFullYear()+'-'+addZero(d.getMonth()+1);
            },
            getDateText3:function(time){//2018-5-22
                var d=new Date(time);
                return d.getFullYear();
            },
            ComparisonChart:function(dataArr,childData){
            	var oArr=true,oChild=true;
            	var ostart=0,oend=dataArr.length-1;
            	var datasLength=[];
                for(var i=0;i<dataArr.length;i++){
                    if(dataArr[i]!=null && dataArr[i]!=0 && oArr){
                    	oArr=false;
                    	ostart=i;
                    }
                }
                for(var i=dataArr.length-1;i>=0;i--){
                    if(dataArr[i]!=null && dataArr[i]!=0 && oChild){
                    	oChild=false;
                    	oend=i;
                    }
                }
                dataArr=dataArr.slice(ostart,oend)
                childData=childData.slice(ostart,oend)
                var arr=[],childs=[];
                $.each(dataArr,function(i,d){
                	if(d!=null){
                		arr.push(d)
                		childs.push(childData[i])
                	}
                })
                dataArr=arr;
                childData=childs;
                $('.ChadisChart').highcharts({
                    credits: {//禁用版权信息
                        enabled:false
                    },
                    chart: {
                        zoomType: 'xy',
                        type: 'spline',
                        backgroundColor: 'none',
                        marginBottom: 65// 底部边距
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        gridLineColor: '#f2f2f2',//网格线
                        lineColor: '#f2f2f2',//x轴的颜色
                        tickColor: '#f2f2f2',//刻度的颜色
                        minTickInterval:30,
                        categories: childData,
                        labels: {
                            style: {
                                color: '#888888',
                                fontSize:'12px'
                            }
                        }
                    },
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        headerFormat: '<small style="color:#182653">{point.key}</small><table style="color:#182653">',
                        pointFormat: '<tr><td style="white-space:nowrap">{series.name}: </td>' +
                            '<td style="text-align: right"><b>{point.y:.2f}</b></td></tr>',//保留两位小数点
                        footerFormat: '</table>',
                        valueDecimals: 2
                    },
                    yAxis: [{
                        min: 0,
                        title: {
                            text: '(W)'
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: '#888888',
                                fontSize:'12px'
                            }
                        },
                        gridLineColor: '#f2f2f2'//网格线
                    }],
                    plotOptions: {
                        series: {
                            animation: {
                                duration: 2000,
                                easing: 'easeOutBounce'
                            },
                            fillOpacity: 0.08,
                            borderRadius: 3,
                            lineWidth:2,
                            marker: { enabled: false } //关掉实心点
                        }
                    },
                    /* series: [{
                        name:"发电量（kWh）",
                        data: dataArr,
                        color: '#0ec50f',
                    }] */
                    series: [{
                        name:chartsName,
                        data: dataArr,
                        type:"area",
                        color: '#0ec50f',
                    }],
                    noData: {
                        style: {
                            fontSize: '12px',
                            color: '#666666'
                        }
                    }
                });
            },
            ComparisonChartTow:function(dataArr,arr){//日、月、年、数据
                $('.ChadisChart').highcharts({
                    credits: {//禁用版权信息
                        enabled:false
                    },
                    chart: {
                        zoomType: 'xy',
                        type: 'column',
                        backgroundColor: 'none',
                        marginBottom: 65// 底部边距
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        gridLineColor: '#f2f2f2',//网格线
                        lineColor: '#f2f2f2',//x轴的颜色
                        tickColor: '#f2f2f2',//刻度的颜色
                        categories: arr,
                        labels: {
                            style: {
                                color: '#888888',
                                fontSize:'12px'
                            }
                        }
                    },
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        headerFormat: '<small style="color:#182653">{point.key}</small><table style="color:#182653">',
                        pointFormat: '<tr><td style="white-space:nowrap;">{series.name}: </td>' +
                            '<td style="text-align: right"><b>{point.y:.2f}</b></td></tr>',//保留两位小数点
                        footerFormat: '</table>',
                        valueDecimals: 2
                    },
                    yAxis: [{
                        min: 0,
                        title: {
                            text: null
                        },
                        labels: {
                            format: '{value}',
                            style: {
                                color: '#888888',
                                fontSize:'12px'
                            }
                        },
                        gridLineColor: '#f2f2f2'//网格线
                    }],
                    plotOptions: {
                        series: {
                            animation: {
                                duration: 2000,
                                easing: 'easeOutBounce'
                            },
                            fillOpacity: 0.08,
                            borderRadius: 3,
                            lineWidth:4,
                            marker: { enabled: false } //关掉实心点
                        }
                    },
                    series: [{
                        name:chartsName,
                        data: dataArr,
                        color: '#0ec50f',
                    }]
                });
            },
            ChadisChart:function(){
                $('.ChadisChart').highcharts({
                    credits: {//禁用版权信息
                        enabled:false
                    },
                    chart: {
                        zoomType: 'xy',
                        type: 'column',
                        backgroundColor: 'none',
                        marginBottom: 65// 底部边距
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        gridLineWidth: 1,
                        gridLineColor: '#f2f2f2',//网格线
                        lineColor: '#f2f2f2',//x轴的颜色
                        tickColor: '#f2f2f2',//刻度的颜色
                        categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                        labels: {
                            style: {
                                color: '#888888',
                                fontSize:'12px'
                            }
                        }
                    },
                    tooltip: {
                        shared: true,
                        useHTML: true,
                        headerFormat: '<small style="color:#182653">{point.key}</small><table style="color:#182653">',
                        pointFormat: '<tr><td style="white-space:nowrap;">{series.name}: </td>' +
                            '<td style="text-align: right"><b>{point.y:.2f}kWh</b></td></tr>',//保留两位小数点
                        footerFormat: '</table>',
                        valueDecimals: 2
                    },
                    yAxis: [{
                        min: 0,
                        title: {
                            text: '单位(kWh)'
                        },
                        labels: {
                            format: '{value}kWh',
                            style: {
                                color: '#888888',
                                fontSize:'12px'
                            }
                        },
                        gridLineColor: '#f2f2f2'//网格线
                    }],
                    plotOptions: {
                        series: {
                            animation: {
                                duration: 2000,
                                easing: 'easeOutBounce'
                            },
                            fillOpacity: 0.08,
                            borderRadius: 3,
                            lineWidth:4,
                            marker: { enabled: false } //关掉实心点
                        }
                    },
                    series: [{
                        // name:getI18n('power_generation_tow')+"（kWh）",
                        name:chartsName,
                        data: [22,23,19,52,26,38,46,22,23,19,52,26,38,46,23,19,52,26,38,46,22,23,19,52,26,38,46,23,19,52],
                        color: '#0ec50f',
                    }]
                });
            },
            addZero:function(num){
                if(num<10)
                    num='0'+num;
                return num+'';
            },
            getDateText:function(time){//2018-5-22
                var d=new Date(time);
                return d.getFullYear()+'-'+addZero(d.getMonth()+1)+'-'+addZero(d.getDate());
            },
            getDateText2:function(time){//2018-5-22
                var d=new Date(time);
                return d.getFullYear()+'-'+addZero(d.getMonth()+1);
            },
            getDateText3:function(time){//2018-5-22
                var d=new Date(time);
                return d.getFullYear();
            },
            searchInByAlias:function(){//逆變器
                var datalogSN = $("#checkInverterSNOrAlias").val();
                $.ajax({
                    url: ODMPARAMS.getServerProtocol(serverUrl)+'/pubData.do?op=getPlantDeviceInverterOss',
                    headers:{"oss.userName":userName},
                    type:'post',
                    dataType:'json',
                    data:{plantId:plantId,toPageNum:pageId,datalogSN:datalogSN},
                    success:function(data){
                        if(data.result==1){
                            $("#inverterRefreshData").empty();
                            var string="";
                            $.each(data.obj.plantInverter_inverterList, function(i, item) {
                                string+='<tr ondblclick="reply("/deviceManage/inverterDetailsOSS",'+item.serialNum,1+',"'+serverId+'","'+usercode+'")">';
                                string+='<td>'+((data.obj.plantInverter_TotalPageNum-1)*20+(i+1))+'</td>';
                                string+='<td>'+item.serialNum+'</td>';
                                string+='<td>'+item.alias+'</td>';
                                string+='<td>'+item.dataLogSn+'</td>';
                                string+='<td>'+item.statusText=='datalog.status.lost'?'lost':'normal'+'</td>';
                                string+='<td>'+item.nominalPower+'</td>';
                                string+='<td>'+item.power+'</td>';
                                string+='<td>'+item.eToday+'</td>';
                                string+='<td>'+item.energyMonthText+'</td>';
                                string+='<td>'+item.eTotal+'</td>';
                                string+='<td>'+item.lastUpdateTimeText+'</td>';
                                string+='</tr>';
                            });
                            $("#inverterRefreshData").append(string);
                        }
                    }
                });
            },
            getTypeText:function(type) {
                if (type == 18)
                    return 'MAX/MID';
                else if (type == 96)
                    return detailLang.storage;
                else if (type == 17)
                    return 'MIX';
                else if (type == 170)
                    return detailLang.ginlong;
                else if (type == 171)
                    return detailLang.crystal_fuyuan_inverter;
                else if (type == 22)
                    return 'MIN/MIC';
                else if (type == 176)
                    return 'EybondInv';
                else if (type == 177)
                    return 'IgenInv';
                else
                    return detailLang.inverter;
            },
            initialize:function(idname){
                // let _this=this;
                // if(typeof google=='undefined'){
                //     window.setTimeout(function(){_this.initialize()},3000)
                //     return;
                // }
                // var lat=_this.plantJson.lat;
                // var lng=_this.plantJson.lng;
                // if(!isNaN(lat) && !isNaN(lng) && lat!='' && lng!=''){
                // }else{
                //     lat = ODMPARAMS.lat?ODMPARAMS.lat: 22.6;
                //     lng =ODMPARAMS.lng?ODMPARAMS.lng: 113.9;
                // }
                // let myCenter=new google.maps.LatLng(lat,lng)
                // var mapProp = {
                //     center:myCenter,
                //     zoom:13,
                //     scaleControl:false,
                //     mapTypeId:google.maps.MapTypeId.ROADMAP
                // };
                // //var map=new google.maps.Map(document.getElementById("plantMap"),mapProp);
                // var map=new google.maps.Map(document.getElementById("plantMap"),mapProp);
                // //创建标记点
                // var marker=new google.maps.Marker({
                //     position:myCenter,
                //     animation:google.maps.Animation.BOUNCE,
                //     draggable: true
                // });
                // marker.setMap(map);
                //在标记上显示信息窗口
     //            var infowindow = new google.maps.InfoWindow({
     //                content:detailLang.shenzhen
     //            });
     //            google.maps.event.addListener(marker, 'dragend', function(MouseEvent) {
     //            	geocoder = new google.maps.Geocoder();
     //                var lat = parseFloat(marker.getPosition().lat());
     //                var lng = parseFloat(marker.getPosition().lng());
     //                var latlng = new google.maps.LatLng(lat, lng);
     //                geocodePosition(marker.getPosition());
     //                $("#val_wd_creatPlant").val(marker.getPosition().lat());
     //                $("#val_jd_creatPlant").val(marker.getPosition().lng());
     //            });
     //            $("#val_wd_creatPlant,#val_jd_creatPlant").blur(function(){
     //    			map.setCenter(new google.maps.LatLng($("#val_wd_creatPlant").val(),$("#val_jd_creatPlant").val()));
     //    			marker.setPosition(new google.maps.LatLng($("#val_wd_creatPlant").val(),$("#val_jd_creatPlant").val()));
     //    		})
     //    		$("#cityListUl").on("click","li",function(){
     //    			$("#val_city_creatPlant").val($(this).attr("data-value"))
     //    			$("#val_wd_creatPlant").val(searchJson[$(this).index()].lat)
     //    			$("#val_jd_creatPlant").val(searchJson[$(this).index()].lng);
     //    			map.setCenter(new google.maps.LatLng($("#val_wd_creatPlant").val(),$("#val_jd_creatPlant").val()));
     //    			marker.setPosition(new google.maps.LatLng($("#val_wd_creatPlant").val(),$("#val_jd_creatPlant").val()));
     //    			if($("#sel_country_creatPlant").val()=="" || $("#sel_country_creatPlant").val()=="Other"){
					// 	$("#sel_country_creatPlant").val(searchJson[$(this).index()].country)
					// 	$("#sel_country_creatPlant").siblings(".select-input").val(searchJson[$(this).index()].country)
					// 	$("#sel_timezone_creatPlant").val(countryMap[searchJson[$(this).index()].country]);
					// 	$("#sel_timezone_creatPlant").siblings(".select-input").val("GMT"+(countryMap[searchJson[$(this).index()].country]>0?"+"+countryMap[searchJson[$(this).index()].country]:countryMap[searchJson[$(this).index()].country]));	
					// }
     //    		})
        		$('#sel_country_creatPlant').change(function(){
        			var data= $(this).val();
        			$.each(countryMap, function(key,val){
        				if(key.toLowerCase()==data.toLowerCase()){
        					if(data=="UnitedStates" && _this.fanbools()){
        						$("#sel_timezone_creatPlant option[value=-11]").text("UTC -11（SST）")
        						$("#sel_timezone_creatPlant option[value=-10]").text("UTC -10（HST）")
        						$("#sel_timezone_creatPlant option[value=-9]").text("UTC -9（HDT）")
        						$("#sel_timezone_creatPlant option[value=-8]").text("UTC -8（AKDT）")
        						$("#sel_timezone_creatPlant option[value=-7]").text("UTC -7（PDT、MST）")
        						$("#sel_timezone_creatPlant option[value=-6]").text("UTC -6（MDT）")
        						$("#sel_timezone_creatPlant option[value=-5]").text("UTC -5（CDT）")
        						$("#sel_timezone_creatPlant option[value=-4]").text("UTC -4（AST、EDT）")
        					}else if(data=="UnitedStates" && !_this.fanbools()){
        						$("#sel_timezone_creatPlant option[value=-11]").text("UTC -11")
        						$("#sel_timezone_creatPlant option[value=-10]").text("UTC -10（HST）")
        						$("#sel_timezone_creatPlant option[value=-9]").text("UTC -9（AKST）")
        						$("#sel_timezone_creatPlant option[value=-8]").text("UTC -8（PST）")
        						$("#sel_timezone_creatPlant option[value=-7]").text("UTC -7（MST）")
        						$("#sel_timezone_creatPlant option[value=-6]").text("UTC -6（CST）")
        						$("#sel_timezone_creatPlant option[value=-5]").text("UTC -5（EST）")
        						$("#sel_timezone_creatPlant option[value=-4]").text("UTC -4")
        					}else{
        						$("#sel_timezone_creatPlant option[value=-11]").text("UTC -11")
        						$("#sel_timezone_creatPlant option[value=-10]").text("UTC -10")
        						$("#sel_timezone_creatPlant option[value=-9]").text("UTC -9")
        						$("#sel_timezone_creatPlant option[value=-8]").text("UTC -8")
        						$("#sel_timezone_creatPlant option[value=-7]").text("UTC -7")
        						$("#sel_timezone_creatPlant option[value=-6]").text("UTC -6")
        						$("#sel_timezone_creatPlant option[value=-5]").text("UTC -5")
        						$("#sel_timezone_creatPlant option[value=-4]").text("UTC -4")
        					}
							
							}
							});
							});
     //    					$("#val_city_creatPlant").val("") 
     //    					$("#val_address_creatPlant").val("")
        					
     //    					$("#sel_timezone_creatPlant").val(val);
     //    					$("#val_wd_creatPlant").val(cityPositon[data].lat);
     //    					$("#val_jd_creatPlant").val(cityPositon[data].lng);
				 // $("#val_wd_creatPlant").val(lat);
	    //         $("#val_wd_creatPlantP").text(lat);
	    //         $("#val_jd_creatPlant").val(lng);
	    //         $("#val_jd_creatPlantP").text(lng);

                // if(!isNaN(lat) && !isNaN(lng) && lat!='' && lng!=''){
                // }else{
                //     lat = ODMPARAMS.lat?ODMPARAMS.lat: 22.6;
                //     lng =ODMPARAMS.lng?ODMPARAMS.lng: 113.9;
                // }
                // let myCenter=new google.maps.LatLng(lat,lng)
                // var mapProp = {
                //     center:myCenter,
                //     zoom:13,
                //     scaleControl:false,
                //     mapTypeId:google.maps.MapTypeId.ROADMAP
                // };
                // //var map=new google.maps.Map(document.getElementById("plantMap"),mapProp);
                // var map=new google.maps.Map(document.getElementById("plantMap"),mapProp);
                //创建标记点
                // var marker=new google.maps.Marker({
                //     position:myCenter,
                //     animation:google.maps.Animation.BOUNCE,
                //     draggable: true
                // });
                // marker.setMap(map);
                // //在标记上显示信息窗口
                // var infowindow = new google.maps.InfoWindow({
                //     content:detailLang.shenzhen
                // });
     //            google.maps.event.addListener(marker, 'dragend', function(MouseEvent) {
     //            	geocoder = new google.maps.Geocoder();
     //                var lat = parseFloat(marker.getPosition().lat());
     //                var lng = parseFloat(marker.getPosition().lng());
     //                var latlng = new google.maps.LatLng(lat, lng);
     //                geocodePosition(marker.getPosition());
     //                $("#val_wd_creatPlant").val(marker.getPosition().lat());
					//  $("#val_wd_creatPlantP").text(marker.getPosition().lat());
     //                $("#val_jd_creatPlant").val(marker.getPosition().lng());
					// $("#val_jd_creatPlantP").text(marker.getPosition().lng());
     //            });
          //       $("#val_wd_creatPlant,#val_jd_creatPlant").blur(function(){
        		// 	map.setCenter(new google.maps.LatLng($("#val_wd_creatPlant").val(),$("#val_jd_creatPlant").val()));
        		// 	marker.setPosition(new google.maps.LatLng($("#val_wd_creatPlant").val(),$("#val_jd_creatPlant").val()));
        		// })
     //    		$("#cityListUl").on("click","li",function(){
     //    			$("#val_city_creatPlant").val($(this).attr("data-value"))
     //    			$("#val_wd_creatPlant").val(searchJson[$(this).index()].lat)
     //    			$("#val_jd_creatPlant").val(searchJson[$(this).index()].lng);
					// /*$("#val_wd_creatPlantP").text(searchJson[$(this).index()].lat)
     //    			$("#val_jd_creatPlantP").text(searchJson[$(this).index()].lng);*/
					
     //    			map.setCenter(new google.maps.LatLng($("#val_wd_creatPlant").val(),$("#val_jd_creatPlant").val()));
     //    			marker.setPosition(new google.maps.LatLng($("#val_wd_creatPlant").val(),$("#val_jd_creatPlant").val()));
     //    			if($("#sel_country_creatPlant").val()=="" || $("#sel_country_creatPlant").val()=="Other"){
					// 	$("#sel_country_creatPlant").val(searchJson[$(this).index()].country)
					// 	$("#sel_country_creatPlant").siblings(".select-input").val(searchJson[$(this).index()].country)
					// 	$("#sel_timezone_creatPlant").val(countryMap[searchJson[$(this).index()].country]);
					// 	$("#sel_timezone_creatPlant").siblings(".select-input").val("GMT"+(countryMap[searchJson[$(this).index()].country]>0?"+"+countryMap[searchJson[$(this).index()].country]:countryMap[searchJson[$(this).index()].country]));	
					// }
     //    		})
        		// $('#sel_country_creatPlant').change(function(){
        			// var data= $(this).val();
        			// $.each(countryMap, function(key,val){
        				// if(key.toLowerCase()==data.toLowerCase()){
        					// if(data=="UnitedStates" && _this.fanbools()){
        					// 	$("#sel_timezone_creatPlant option[value=-11]").text("UTC -11（SST）")
        					// 	$("#sel_timezone_creatPlant option[value=-10]").text("UTC -10（HST）")
        					// 	$("#sel_timezone_creatPlant option[value=-9]").text("UTC -9（HDT）")
        					// 	$("#sel_timezone_creatPlant option[value=-8]").text("UTC -8（AKDT）")
        					// 	$("#sel_timezone_creatPlant option[value=-7]").text("UTC -7（PDT、MST）")
        					// 	$("#sel_timezone_creatPlant option[value=-6]").text("UTC -6（MDT）")
        					// 	$("#sel_timezone_creatPlant option[value=-5]").text("UTC -5（CDT）")
        					// 	$("#sel_timezone_creatPlant option[value=-4]").text("UTC -4（AST、EDT）")
        					// }else if(data=="UnitedStates" && !_this.fanbools()){
        					// 	$("#sel_timezone_creatPlant option[value=-11]").text("UTC -11")
        					// 	$("#sel_timezone_creatPlant option[value=-10]").text("UTC -10（HST）")
        					// 	$("#sel_timezone_creatPlant option[value=-9]").text("UTC -9（AKST）")
        					// 	$("#sel_timezone_creatPlant option[value=-8]").text("UTC -8（PST）")
        					// 	$("#sel_timezone_creatPlant option[value=-7]").text("UTC -7（MST）")
        					// 	$("#sel_timezone_creatPlant option[value=-6]").text("UTC -6（CST）")
        					// 	$("#sel_timezone_creatPlant option[value=-5]").text("UTC -5（EST）")
        					// 	$("#sel_timezone_creatPlant option[value=-4]").text("UTC -4")
        					// }else{
        					// 	$("#sel_timezone_creatPlant option[value=-11]").text("UTC -11")
        					// 	$("#sel_timezone_creatPlant option[value=-10]").text("UTC -10")
        					// 	$("#sel_timezone_creatPlant option[value=-9]").text("UTC -9")
        					// 	$("#sel_timezone_creatPlant option[value=-8]").text("UTC -8")
        					// 	$("#sel_timezone_creatPlant option[value=-7]").text("UTC -7")
        					// 	$("#sel_timezone_creatPlant option[value=-6]").text("UTC -6")
        					// 	$("#sel_timezone_creatPlant option[value=-5]").text("UTC -5")
        					// 	$("#sel_timezone_creatPlant option[value=-4]").text("UTC -4")
        					// }
        					// $("#val_city_creatPlant").val("") 
        					// $("#val_address_creatPlant").val("")
        					
        					// $("#sel_timezone_creatPlant").val(val);
        					// $("#val_wd_creatPlant").val(cityPositon[data].lat);
        					// $("#val_jd_creatPlant").val(cityPositon[data].lng);
						/*	$("#val_wd_creatPlantP").text(cityPositon[data].lat);
        					$("#val_jd_creatPlantP").text(cityPositon[data].lng);*/
        					// map.setCenter(new google.maps.LatLng($("#val_wd_creatPlant").val(),$("#val_jd_creatPlant").val()));
        					// marker.setPosition(new google.maps.LatLng($("#val_wd_creatPlant").val(),$("#val_jd_creatPlant").val()));
        					
        					// $("#sel_timezone_creatPlant option").each(function(){
        					// 	var timezone = $.trim($(this).val());
        					// 	var countryTimezone = val;
        					// 	if(timezone == countryTimezone){
        					// 		$("#sel_timezone_creatPlant").parent().find("input").val($.trim($(this).text()))
        					// 	}
        					// });
        					
        					// $.ajax({
        					// 	url:rootPath + "/common/searchCitys",
        					// 	data:{all:1,country:data},
        					// 	type:"post",
        					// 	success:function(data){
        					// 		searchJson=data;
        					// 		var ohtml="";
        					// 		$.each(data,function(i,d){
        					// 			ohtml+='<li data-value="'+d.city+'">'+d.cityShow+'</li>'
        					// 		})
        					// 		$("#cityListUl").html(ohtml)
        					// 	}
        					// })
        				// }
        			// });
        		// });
            },
           
          
			//....................
        }
    })

function loadScript(arr, i, callback){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    /*if else 这几句话必须要写到这位置处，不能放最后，因为if中js加载中script.readyState存在好几种状态，
     只有状态改变‘readystatechange’事件才会触发，但现在浏览器加载速度很快，当解析到该事件时JS有可能已经加载完，
     所以事件根本不会触发，所以要写到前面*/
    if(script.readystate){//兼容IE
        script.onreadystatechange = function() {//状态改变事件才触发
            if(script.readyState == 'loaded' || script.readyState == 'complete'){
                if(i==arr.length-1){
                    callback();
                }else{
                    loadScript(arr,i+1,callback);
                }
                script.onreadystatechange = null;
            }
        }
    }else{
        script.onload = function(e){
            if(i==arr.length-1){
                callback();
            }else{
                loadScript(arr,i+1,callback);
            }
        }
    }
    script.src = arr[i];
    document.body.appendChild(script);
}
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
function gcj02tobd09(lng, lat) {
    var lat = +lat;
    var lng = +lng;
    var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    var bd_lng = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat]
};
function bd09togcj02(bd_lon, bd_lat) {
    var bd_lon = +bd_lon;
    var bd_lat = +bd_lat;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
};
var geocoder;
function getGoogleCity(aData){
	var ocity="";
	$.each(aData[0].address_components,function(i,d){
		if(d.types[0]=="locality")ocity=d.long_name
	})
	if(ocity==""){
		$.each(aData[0].address_components,function(i,d){
    		if(d.types[0]=="administrative_area_level_2")ocity=d.long_name
    	})
	}
	if(ocity==""){
		$.each(aData[0].address_components,function(i,d){
    		if(d.types[0]=="administrative_area_level_1")ocity=d.long_name
    	})
	}
	return ocity;
}
function getGoogleCountry(aData){
	var ocity="";
	$.each(aData[0].address_components,function(i,d){
		if(d.types[0]=="country")ocity=d.long_name
	})
	if(ocity!=""){
		$.each(window.country,function(k,v){
			if(ocity.toUpperCase().indexOf(capitalize(v).toUpperCase())!="-1")ocity=v
		});
	}
	return ocity;
}
function geocodePosition(pos) {
    geocoder.geocode({
        latLng: pos
    }, function(responses) {
        if(responses && responses.length > 0) {
            var cityInfo = getGoogleCity(responses);
            if(!ODMPARAMS.screenMap){
                $("#val_city_creatPlant").val(cityInfo)
                mobileCity=cityInfo.replace("市","");
                deviceDetail.plantnewJson.country=getGoogleCountry(responses)
            }
            $.ajax({
					url:rootPath+"/common/searchCitys",
					data:{all:1,country:$("#sel_country_creatPlant").val()},
					type:"post",
					success:function(data){
						searchJson=data;
						var ohtml="";
						$.each(data,function(i,d){
							ohtml+='<li data-value="'+d.city+'">'+d.cityShow+'</li>'
						})
						$("#cityListUl").html(ohtml)
					}
				})
        }
    });
}

	//用户名、电站名明文处理
function getChangeNameRule(stationName) {
    let length = stationName.length
    let asterisk = "***"
    if (length == 1) {
        return stationName + asterisk
    }
    if (length == 2) {
        return stationName.substring(0, 1) + asterisk + stationName.substring(1);
    }
    if (length == 3) {
        return stationName.substring(0, 1) + stationName.substring(1, 2) + asterisk + stationName.substring(2);
    }
    let reg = /[^\u4e00-\u9fa5]/
    if (!reg.test(stationName)) {
        if (length > 6) {
            for (let i = 6; i < length; i++) {
                asterisk += "*"
            }
        }
        return stationName.substring(0, 1) + stationName.substring(1, 2) + asterisk + stationName.substring(length - 1);
    }
    if (length > 7) {
        for (let i = 7; i < length; i++) {
            asterisk += "*"
        }
    }
    //英文、其它以及混合规则3+***+1
    return stationName.substring(0, 1) + stationName.substring(1, 2) + stationName.substring(2, 3) + asterisk + stationName.substring(length - 1);
}

//打开历史故障弹窗
function openHisDialog(sn){
	checkedIds = []
	$(".cleanBtn").hide()
	hisDialogSn = sn
	rmSign = 0
	$("#tbl_his_record").html("");
	initPager('creatPage',1,0,function (obj){});
	checkTbodyNoData($("#tbl_his_record"), $("#tbl_his_record").parent().find("thead td").size());
	layui.form.render();
	dialogContent({
		title:detailLang.kjkh_Historical_failure_records,//历史故障记录
		content:$('.dialog_his_record'),
		onBtn:0,
	})
}
//获取历史故障记录
function showRecord(){
	checkedIds = []
	coverList = []
	getHisRecord(1)
}
//打开弹窗获取历史故障数据
function getHisRecord(pages){
	var url = ODMPARAMS.getServerProtocol(serverUrl)+'/ossC/getHistoricalFaultList';
	var deviceSn = hisDialogSn;
	var ohtmls='';
	var list = [];
	$.ajax({
		url:url,
		timeout:1000*18,
		type:"post",
		data:{deviceSn:deviceSn},
		beforeSend : function(){
			dialogLoading(1,-1);
		},
		complete:function(){
			dialogLoadingClose();
		},
		success:function(data){
			if(data.result==1){
				var ohtmls='';
				$.each(data.obj,function(i,d){
					var obj = {}
					obj.id = i;
					obj.num = detailLang.kjkh_historical_failure + (i+1);
					obj.value = d;
					obj.showDefault = false;
					coverList.push(obj);
				})
				// 前端分页 首次取前10条
				if(data.obj.length > 0 && data.obj.length < 10){
					list = coverList.slice(0,data.obj.length)
				}else if(data.obj.length > 10){
					list = coverList.slice(0,10)
				}
				var totalPage = pagerCount(data.obj.length,10)//计算总页数 
				$.each(list,function(i,d){
					ohtmls+='<tr style="cursor:pointer">'
					ohtmls+='<td><img onclick="checkBoxImgClick(this)" src="<%=request.getContextPath()%>/resources/images/yuan.png" id="'+ d.id + '"' + 'num="' + i + '"' + 'class="checkBoxImg check-one"/></td>'
					ohtmls+='<td>'+ getV(d.num) +'</td>'
					ohtmls+='<td><span class="desc">'+ d.value +'</span></td>'
					ohtmls+='</tr>'
				})
				$("#tbl_his_record").html('');
			    $("#tbl_his_record").append(ohtmls);
			    checkTbodyNoData($("#tbl_his_record"), $("#tbl_his_record").parent().find("thead td").size());
				layui.form.render();
				initPager('creatPage',totalPage, 1,
					function (obj){
						//该事件为点击页码时的事件
				        getHisRecordList(obj.curr,10,coverList,totalPage);
				});
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
				dialogTips(getI18n('timeout'));
		}
	});
}
//手动分页 截取需要展示在当前页的数据即可
function getHisRecordList(page,pageSize,list,totalPage){
	var currentPage = page;//当前页数
	var num = list.length
    currentPage_=currentPage;
    var startRow = (page - 1) * pageSize;
    var endRow = currentPage * pageSize;
    endRow = (endRow > num)? num : endRow;
    //截取数据
    var currList = list.slice(startRow,endRow)
    $("#tbl_his_record").html("");
	var ohtmls='';
	$.each(currList,function(i,d){
		var showdefault = '<td><span class="desc">'+ d.value +'</span></td>'
		if(d.showDefault){
			showdefault = '<td><span>'+ d.value +'</span></td>'
		}
		ohtmls+='<tr style="cursor:pointer">'
		ohtmls+='<td><img onclick="checkBoxImgClick(this)" src="'+rootPath +'/resources/images/yuan.png" id="'+ d.id + '"' + 'num="' + i + '"' + 'class="checkBoxImg check-one"/></td>'
		ohtmls+='<td>'+ getV(d.num) +'</td>'
		ohtmls+= showdefault
		ohtmls+='</tr>'
	})
	$("#tbl_his_record").html('');
	$("#tbl_his_record").append(ohtmls);
    checkTbodyNoData($("#tbl_his_record"), $("#tbl_his_record").parent().find("thead td").size());
    //翻页记住之前选中的
	if(checkedIds.length!=0){
		$.each(checkedIds, function(i,v) {
			$("table.all-table #tbl_his_record tr td img.checkBoxImg[id='"+v.id+"']").addClass("isChecked").attr("src",rootPath+"/resources/images/password.png");
		});
	}
	layui.form.render();
	initPager('creatPage',totalPage, page,
		function (obj){
		getHisRecordList(obj.curr,pageSize,list,totalPage);
    });
}
function pagerCount(count ,pageSize){
	 if(count>0){
        try {
            var _pagerCount=count % pageSize == 0 ? count / pageSize : count / pageSize + 1;
            var c=_pagerCount.toFixed(0);//小数取整
            _pagerCount=c>_pagerCount?c-1:c;//过滤四舍五入
            return _pagerCount;          
        } catch (error) {
            return 0;
        }
	  }else{
	     return 0;
	  }
} 
//清除选中
function cleanAll(){ 
	$("#tbl_his_record .isChecked").attr('src',rootPath+'/resources/images/yuan.png');
	$("#tbl_his_record .isChecked").removeClass('isChecked');
	$("#tbl_his_record tr").css("background", "#fff");
	checkedIds = []
	$(".cleanBtn").hide()
}
//选择表格
function checkBoxImgClick(_this){
       if($(_this).hasClass('isChecked')){
           for(var i=0; i<checkedIds.length; i++){
               if($(_this).attr("id") == checkedIds[i].id){
                   checkedIds.splice(i, 1);
                   break;
               }
           }
           $(_this).attr('src',rootPath+'/resources/images/yuan.png');
           $(_this).removeClass('isChecked');
           $(_this).parents('tr').css("background", "#fff");
       }else{
    	   // 未显示故障信息的 最多只能选择5条
    	   var hadShow = coverList.find(function(item){
    		   if(item.showDefault){
    			   return item
    		   }
    	   })
    	   var hadSel  = [];//已显示
           var j = 0;
    	   for(let i in coverList){
    		   if(coverList[i].showDefault){
    			   hadSel[j++] = coverList[i]
    		   }
    	   }
    	   var limit = checkedIds.length - hadSel.length
           if(limit > 4){
        	   dialogTips(detailLang.kjkh_Select_up_to_5_historical);//一次最多选择5个历史故障
        	   return
           }
    	   var obj = {id:$(_this).attr("id"),num:$(_this).attr("num")}
           checkedIds.push(obj);
           $(_this).attr('src',rootPath+'/resources/images/password.png');
           $(_this).addClass('isChecked');
           $(_this).parents('tr').css("background", "#e9f8ee");
           
       }
       if(checkedIds.length>0){
    	   $(".cleanBtn").show()
       }else{
    	   $(".cleanBtn").hide()
       }
       event.stopPropagation();
}
//导出历史故障
function clickExportData_his(){
	var url = ODMPARAMS.getServerProtocol(serverUrl)+'/ossC/getHistoricalFaultList';
	var deviceSn = hisDialogSn;
	var numList = []
	$.each(coverList,function(i,d){
		if(d.showDefault){
			var num = Number.parseInt(d.id)+1
			numList.push(num)	
		}
	})
	if(numList.length == 0){
		dialogTips(detailLang.no_data);//暂无数据
		return
	}
	var faultNumbers = numList.join(',')
	$( "#form_downfile" ).attr( 'action' ,url);
    $("#form_downfile input[name=deviceSn]").val(deviceSn);
    $("#form_downfile input[name=rmSign]").val(rmSign);
    $("#form_downfile").submit();
    rmSign = -1
}
//读取选种故障
function showDefault(){
	if(checkedIds.length == 0){
		dialogTips(detailLang.kjkh_Check_at_least_one);//至少勾选一条
		return
	}
	getHistoricalFaultList();
}
//读取数据
function getHistoricalFaultList(){
    var url = ODMPARAMS.getServerProtocol(serverUrl)+'/ossC/getAllHsitoricalFaultData';
	var deviceSn = hisDialogSn;
	var ohtmls='';
	var list = [];
	var numList = [];
	$.each(checkedIds,function(i,d){
		if(!coverList[d.id].showDefault){
			numList.push(+d.id+1)	
		}
	})
	var faultNumbers = numList.join(',');
	$.ajax({
		url: url,
		timeout:3000000*18,
		type:"post",
		data:{deviceSn:deviceSn,rmSign:rmSign,faultNumbers:faultNumbers},
		beforeSend : function(){
			dialogLoading(1,-1);
		},
		complete:function(){
			dialogLoadingClose();
		},
		success:function(data){
			if(data.result==1){
				rmSign = -1
				dialogTips(detailLang.kjkh_read_successfully);//读取成功
				$("#tbl_his_record .isChecked").parents('tr').find('span').removeClass("desc").addClass("showDesc");//选中的显示出来
				$.each(checkedIds,function(i,d){
					coverList[d.id].showDefault = true
				})
			}else{
				dialogTips(detailLang.new_Read_failed);//读取失败
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			if(!checkLoginSession(XMLHttpRequest, textStatus, errorThrown))
				dialogTips(getI18n('timeout'));
		}
	});
}
