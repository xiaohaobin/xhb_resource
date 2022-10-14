
var mainApp = new Vue({
	el:"#mainApp",
	data:{
		leftData:{
			list:[
				{"txt":"本月单位面积消耗",val:2514.25,unit:"kWh/m²",colorClassName:"sys_blue_c",computerTxt:"单位建筑面积",computerVal:""},
				{"txt":"本月用电量",val:2514.25,unit:"kWh",colorClassName:"sys_blue_c"},
				{"txt":"今日用电量",val:214.25,unit:"kWh",colorClassName:"sys_blue_c"},
				{"txt":"本月费用",val:214.25,unit:"元",colorClassName:"sys_yellow_c"},
			]
		},
		rightData:{
			list:[
				{"txt":"当月发电量",val:2514.25,unit:"kWh",colorClassName:"sys_blue_c"},
				{"txt":"累计发电量",val:214.25,unit:"kWh",colorClassName:"sys_blue_c"},
				{"txt":"今日发电量",val:214.25,unit:"kWh",colorClassName:"sys_blue_c"},
				{"txt":"本月收益",val:214.25,unit:"元",colorClassName:""},
			]
		},
		currBuildIngData:{id:1,txt:"宿舍D",ydl:100,power:25,},//當前所選的建築數據
		buildingDataList:[
			{id:1,txt:"宿舍D",ydl:100,power:25,normalSrc:"hzcfile/images/nyfb/normal/dormitory_D.png",ref:"dormitory_D"},
			{id:2,txt:"宿舍C",ydl:200,power:15,normalSrc:"hzcfile/images/nyfb/normal/dormitory_C.png",ref:"dormitory_C"},
			{id:3,txt:"食堂",ydl:200,power:15,normalSrc:"hzcfile/images/nyfb/normal/canteen.png",ref:"canteen"},
			{id:4,txt:"宿舍B",ydl:100,power:25,normalSrc:"hzcfile/images/nyfb/normal/dormitory_B.png",ref:"dormitory_B"},
			{id:5,txt:"宿舍A",ydl:200,power:15,normalSrc:"hzcfile/images/nyfb/normal/dormitory_A.png",ref:"dormitory_A"},
			{id:6,txt:"生产研发楼",ydl:100,power:25,normalSrc:"hzcfile/images/nyfb/normal/R_D_building.png",ref:"R_D_building"},
			{id:7,txt:"厂房",ydl:2000,power:150,normalSrc:"hzcfile/images/nyfb/normal/factory.png",ref:"factory"},
		],
		tips:null,
	},
	created:function(){
		
	},
	mounted:function(){
		var _this = this;
		$(document).ready(function(){
			
			$('.buildIngItem').on("click",function(){
				
				var jq_this = $(this);
				_this.initImgSrc(function(){
					var curr_url = jq_this.find("img").attr("src");
					jq_this.find("img").attr("src",curr_url.replace("normal","active"));
				})
				var imgId = $(this).attr("data-img-id")*1;
				_this.switchBuilding(imgId,$(this));
				
				 
			});
			
			//绑定点击事件
		});
	},
	methods:{
		/**
		 * 切换选择建筑数据
		 * @@param {Number} id 建筑对应id
		 * @@param {Object} jqOb jq对象
		 */
		switchBuilding:function(id,jqObj){			
			var _this = this;
			for(var i=0;i<_this.buildingDataList.length;i++){
				if(_this.buildingDataList[i].id == id){
					_this.currBuildIngData = _this.buildingDataList[i];					
					break;
				}
			}
			
			var html = '<div class="text-l" >'+
				'<div>区域：'+ this.currBuildIngData.txt +' </div>'+
				'<div>用电量：'+ this.currBuildIngData.ydl +' kWh</div>'+
			  '</div>';
			_this.tips = layer.tips(
				html,
			   jqObj,
			   {
				 tips: [jqObj.attr("tip-num")*1, "#036a75"],
				 time: 0
			   }
			 );
		},
		//初始化图片正常状态
		initImgSrc:function(fn){
			$(".buildIngItem img").each(function(){
				var url = $(this).attr("src");
				$(this).attr("src",url.replace("active","normal"));
			});
			fn && fn();
		},
		//消耗输入框失去焦点算法
		getConsume:function(){
			var _this = this;
			_this.leftData.list[0].val = (_this.currBuildIngData.ydl / _this.leftData.list[0].computerVal).toFixed(2) * 1;//消耗
		},
		
	}
});