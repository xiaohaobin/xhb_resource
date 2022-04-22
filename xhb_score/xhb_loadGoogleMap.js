

//根據當前ip獲取地理信息
function getLatLogByLocalhost(fn){
	var latLng = {lat:22.581783, lng:113.962135};
	if(!navigator.geolocation){
		fn && fn(latLng);
	}else{
		navigator.geolocation.getCurrentPosition(
			function(pos){
				var latitude = pos.coords.latitude;
				var longitude = pos.coords.longitude;
				latLng = {lat:latitude, lng:longitude};
				fn && fn(latLng);
			},
			function(){
				fn && fn(latLng);
			},
			{timeout:10000}
		);
	}
		
}

//異步加載脚本
function loadScript(arr, i, callback){
	var _this = this;
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

/**
 * 加载谷歌地图
 * @param {Number} lat 纬度
 * @param {Number} lng 经度
 * @param {String} idVal 地图容器id值
 * @param {Object || false} oAddressInput 地址输入dom对象 
 * @param {Boolean} isStillMarker 是否静态marker
 * */
function loadGoogleMap(lat, lng, idVal, oAddressInput ,isStillMarker) {
	var _this = this;
	this.gMapKey = "AIzaSyATaepX6-wvfIawz6ZSblNd-Qv7ao3lujo";//谷歌秘钥
	
	this.lat = lat;
	this.lng = lng;
	this.idVal = idVal;
	this.oAddressInput = oAddressInput;
	this.isStillMarker = isStillMarker;
	
	this.isChina = true;
	
	this.postal_code = "";//郵編
	this.detailsAddress = "";//详细地址
	this.city = "";//主要城市
	this.country = "";//国家
	this.provice = "";//省
	
	this.map = null;
	this.infowindow = null;//信息窗口
	
	
	this.geocoder = null;//地理编码解析对象
	
	this.marker = null;//标注
	//谷歌地图主流国家语言代码
	this.languageList = [
		{code:'zh',txt:'中文'},
		{code:'zh-HK',txt:'中文（香港）'},
		{code:'zh-TW',txt:'中文（台湾）'},
		{code:'ja',txt:'日语'},
		{code:'en',txt:'英语'},
		{code:'cs',txt:'捷克语'},
		{code:'da',txt:'丹麦语'},
		{code:'fi',txt:'芬兰语'},
		{code:'fr',txt:'法语'},
		{code:'fil',txt:'菲律宾语'},
		{code:'ar',txt:'阿拉伯语'},
		{code:'de',txt:'德语'},
		{code:'el',txt:'希腊语'},
		{code:'hu',txt:'匈牙利语'},
		{code:'it',txt:'意大利语'},
		{code:'ko',txt:'韩语'},
		{code:'no',txt:'挪威语'},
		{code:'pl',txt:'波兰语'},
		{code:'pt',txt:'葡萄牙语'},
		{code:'ru',txt:'俄语'},
		{code:'es',txt:'西班牙语'},
		{code:'sv',txt:'瑞典语'},
		{code:'th',txt:'泰语'},
		{code:'tr',txt:'土耳其语'},
		{code:'vi',txt:'越南语'},
	];
	this.drawingManager = null;//地图绘制工具
	
	this.xhbLoadGMap({lat:this.lat,lng:this.lng},this.idVal);
}



/**
 * 读取cookie
 * @param {String} name 设置的键
 * */
loadGoogleMap.prototype.get_cookie = function(name) {
	var arr,
		reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) return unescape(arr[2]);
	else return null;
}

//加载地图初始化
loadGoogleMap.prototype.xhbLoadGMap = function(latLng,idVal,fn){
	var _this = this;
	var tt = Date.parse(new Date());
	
	var lang = this.get_cookie('lang');
	if(lang){
		if(lang == 'cn' || lang == 'ft'){//中文和繁體			
			this.isChina = true;
			
		}else{//谷歌
			this.isChina = false;
		} 
	}else{//默认中文
		this.isChina = true;
	}	
	// var language = this.isChina ? '&language=zh' : '&language=en';
	var language = '&language=en';
	// var lib = '&libraries=drawing';
	var lib = '&libraries=places,drawing';
	var scriptArr = [location.protocol+'//maps.googleapis.com/maps/api/js?key='+ this.gMapKey +'&t='+tt +language + lib];
	if(window.google){
		
		//window加载完毕之后才加载
		google.maps.event.addDomListener(
			window, 'load', 
			_this.renderGoogleMap(_this.lat, _this.lng, _this.idVal,function(){
				//加载标注
				_this.addMarker(_this.isStillMarker);
			})
		);
		
	}else{		
		loadScript(scriptArr,0, function () {
			
			//window加载完毕之后才加载
			google.maps.event.addDomListener(
				window, 'load', 
				_this.renderGoogleMap(_this.lat, _this.lng, _this.idVal,function(){
					//加载标注
					_this.addMarker(_this.isStillMarker);
				})
			);
		});
	}
}


/**
 * 调用谷歌地图
 * @param {Number} lat 纬度数字
 * @param {Number} lng 经度数字
 * */
loadGoogleMap.prototype.renderGoogleMap = function(lat, lng, idVal,fn){
	var _this = this;
	this.infowindow = new google.maps.InfoWindow({
		content: "Search...",
		size: new google.maps.Size(50,50)
	});//信息窗口
	this.geocoder = new google.maps.Geocoder();//地理编码解析对象
	
	var mainPoint = new google.maps.LatLng(lat, lng);
	var mapOptions = {
		center: mainPoint, //中心点
		zoom: 17,
		draggable: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	
	};
	this.map = new google.maps.Map(document.getElementById(idVal), mapOptions);
	
	
	if(this.oAddressInput){
		//失去焦点事件
		this.oAddressInput.onblur = function(){
			if(this.value == "") return false;
			console.log("ssss")
			//获取地理位置信息和更新标注信息
			_this.getGEOInfoByAddr(this.value,function(){
				
			});
		}
	}
	
	fn && fn();
}

//选择地图90度
loadGoogleMap.prototype.rotate90 = function(){
	var _this = this;
	console.log(this.map.getTilt(),"this.map.getTilt")
	if (this.map.getTilt() !== 0) {
	    window.setInterval(function(){
			const heading = _this.map.getHeading() || 0;
			
			_this.map.setHeading(heading + 90);
		}, 3000);
	}
	
	
}

//谷歌地图地址信息获取address_components 的国，省，城市，邮编
loadGoogleMap.prototype.addressComponentsFn = function(address_components){
	var addr = {
		city:"",
		provice:"",
		country:"",
		postal_code:""
	};
	for(var i=0;i<address_components.length;i++){
	
		getTheData(address_components[i]);
	}
	
	function getTheData(item){
		if( item.types.includes("postal_code") ){
			addr.postal_code = item.long_name;
		}
		if( item.types.includes("country") ){
			addr.country = item.long_name;
		}
		if( item.types.includes("administrative_area_level_1") ){
			addr.provice = item.long_name;
		}
		if( item.types.includes("locality") ){
			addr.city = item.long_name;
		}
		
	}
	
	return addr;
}

/**
 * 模糊检索，地址建议列表组件
 * @param {Object} dom 输入框dom节点
 */
loadGoogleMap.prototype.placeSugSearch = function(dom){
	var _this = this;
	// var input = document.getElementById('pac-input')
	var searchBox = new google.maps.places.SearchBox(dom)
	
	searchBox.addListener("places_changed",function(){
		var places = searchBox.getPlaces();
		console.log(places,"ppp");
		
		//更新函数相关参数信息
		var mainAddr = _this.addressComponentsFn(places[0].address_components);
		_this.city = mainAddr.city;
		_this.provice = mainAddr.provice;
		_this.country = mainAddr.country;
		_this.postal_code = mainAddr.postal_code;
		_this.detailsAddress = places[0].formatted_address;
		_this.lat = places[0].geometry.location.lat();
		_this.lng = places[0].geometry.location.lng();
		_this.coordinates = _this.lat + ',' + _this.lng,
		
		_this.infowindow.setContent(_this.detailsAddress);
		_this.infowindow.open(_this.map, _this.marker);
		if(_this.oAddressInput){
			_this.oAddressInput.value = _this.detailsAddress;
		}
		var mainPoint = new google.maps.LatLng(_this.lat, _this.lng);
		_this.map.setCenter(mainPoint);
		// 
	});
	
	
	this.map.addListener("bounds_changed", () => {
	    searchBox.setBounds(this.map.getBounds());
	});
}




/**
 * 自定义动态添加标注到地图中（适用于多标注）
 * @param {type} option 
 * @param {Object} option [position] 经纬度对象 {lat:23,lvg:144}
 * @param {Object} option [image] 谷歌地图图片对象，如下配置 image
 * 
 const image = {
   url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
   size: new google.maps.Size(20, 32),
   origin: new google.maps.Point(0, 0),
   anchor: new google.maps.Point(0, 32),
 };
 * @param {String} option [title] 标准标题 
 * @param {Number} option [zIndex]标注层级
 */
loadGoogleMap.prototype.diyMarker = function(option){
	var _this = this;
	var defaults = {
		position: option.lanlng || { lat: _this.lat, lng: _this.lng },
		map:_this.map,
		icon: option.image || null,
		// shape: shape,
		title: option.title || '',
		zIndex:option.zIndex || 1,
	};
	var opts = $.extend({}, defaults, option);
	new google.maps.Marker(opts);
}

/**
 * 添加标注
 * @param {Boolean} mapIsStill 标注是否静态
 */
loadGoogleMap.prototype.addMarker = function(mapIsStill,lat,lng){
	var _this = this;
	if(lat === undefined && lng === undefined){
		lat = this.lat;
		lng = this.lng;
	}
	
	var myCenter = new google.maps.LatLng(lat, lng);
	this.marker = new google.maps.Marker({
		position: myCenter,
		draggable: !mapIsStill,
		// title:"Hello World!"
	});
	this.marker.setMap(this.map);
	
	//初始化标注地理位置相关信息
	this.getInfoByLatLng(myCenter,function(info){
		_this.setMarkerAddress(info);
	});
	
	//谷歌拖拽
	// 添加拖动事件监听器
	google.maps.event.addListener(_this.marker, 'dragstart', function() {
		_this.updateMarkerAddress('searching...');
	});
				
	
				
	google.maps.event.addListener(_this.marker, 'dragend', function(p,c) {
		//根据经纬度解析出地理位置相关数据
		_this.getInfoByLatLng( _this.marker.getPosition(),function(info){
			_this.setMarkerAddress(info);
		});
	});
}

/**
 * 根据经纬度解析出地理位置相关数据
 * @param {Object} myCenter 经纬度对象
 */
loadGoogleMap.prototype.getInfoByLatLng = function(myCenter,fn){
	var _this = this;
	this.geocoder.geocode(
		{
		   latLng: myCenter
		}, 
		function(responses) {
			   if(responses && responses.length > 0) {
									
					var info = getGoogleAllAddr(responses);
					
					_this.lat = info.lat;
					_this.lng = info.lng;
					_this.postal_code = info.postal_code;
					_this.detailsAddress = info.detailsAddress;
					_this.country = info.country;
					_this.provice = info.provice;
					_this.city = info.city;
										
					fn && fn(info);
					
			   } 
			   else {
					
					fn && fn(false);
			   }
		}
	);
	
	//获取谷歌地址
	function getGoogleAllAddr(aData){
		// console.log(aData,"getGoogleAllAddr")
		var list = [];
		for(var i=0;i<aData.length;i++){
			list.push( aData[i].address_components.length );
		}
		//js 返回數組中值最大的索引 
		var sort = list.indexOf(Math.max(...list));
		
		_addrssInfo = aData[sort];
		console.log(_addrssInfo,"11")
		// if(_addrssInfo.address_components.length > 1)
		
		var mainAddr = _this.addressComponentsFn(_addrssInfo.address_components);
		// console.log(_addrssInfo.address_components,"mainmain")
		var obj = {
			lat:_addrssInfo.geometry.location.lat(),
			lng:_addrssInfo.geometry.location.lng(),
			coordinates:_addrssInfo.geometry.location.lat() + ',' + _addrssInfo.geometry.location.lng(),
			detailsAddress:aData[sort].formatted_address,
			// postal_code:_addrssInfo.address_components[_addrssInfo.address_components.length-1].long_name,			
			// country:_addrssInfo.address_components.length > 1 ? _addrssInfo.address_components[_addrssInfo.address_components.length-2].long_name : "",
			// provice:_addrssInfo.address_components.length > 2 ? _addrssInfo.address_components[_addrssInfo.address_components.length-3].long_name : "",
			// city:_addrssInfo.address_components.length > 3 ? _addrssInfo.address_components[_addrssInfo.address_components.length-4].long_name : ""
			postal_code:mainAddr.postal_code,
			country:mainAddr.country,
			provice:mainAddr.provice,
			city:mainAddr.city,
			
		}
		
		return obj;
	}
}

//判断设置窗口信息
loadGoogleMap.prototype.setMarkerAddress = function(info){
	if(info){
		this.updateMarkerAddress(info.detailsAddress);	
		if(this.oAddressInput){
			this.oAddressInput.value = info.detailsAddress;
		}
	}else{
		this.updateMarkerAddress('Unable to determine the address at this location.');
	}
}

//更新信息窗口信息
loadGoogleMap.prototype.updateMarkerAddress = function(address){
	this.infowindow.setContent(address);
	this.infowindow.open(this.map, this.marker);
	if(this.oAddressInput){
		this.oAddressInput.value = address;
	}
}

//动态更新标注位置和窗口信息
loadGoogleMap.prototype.updateMarkerWindow = function(addr, lat, lng){
	var _this = this;
	var mainPoint = new google.maps.LatLng(lat, lng);
	
	
	this.map.setCenter(mainPoint);
	this.marker.setPosition(mainPoint);
	
	//根据经纬度查
	this.getInfoByLatLng(mainPoint,function(){
		
	});
	
	this.updateMarkerAddress(addr);
	
	this.lat = lat;
	this.lng = lng;
}

//生成卫星地图图片地址
loadGoogleMap.prototype.getStaticMapImage = function(lat,lng){
	lat = lat || this.lat;
	lng = lng || this.lng;
	var imgUrl = '//maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lng + '&maptype=satellite&zoom=19&scale=2&size=640x640&format=jpg-baseline&key=' + this.gMapKey;	
	return imgUrl;
}

//根据地址模糊查询地理位置信息
loadGoogleMap.prototype.getGEOInfoByAddr = function(keyword,fn){
	var _this = this;
		this.geocoder.geocode({ address: keyword })
			  .then((result) => {
							
				const { results } = result;
					
				_this.map.setCenter(results[0].geometry.location);
				_this.marker.setPosition(results[0].geometry.location);
				
				_this.updateMarkerAddress(keyword);
				
				//重新根据获取的经纬度，更新函数内正确的信息
				// console.log(results[0].geometry.location.lat(),"lat")
				var myCenter = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
				_this.getInfoByLatLng(myCenter);
				fn && fn(results);
			  })
			  .catch((e) => {
				alert("Geocode was not successful for the following reason: " + e);
		});
}



//地图绘制工具(谷歌地图加载api必须添加 libraries=drawing 参数)
loadGoogleMap.prototype.initDrawingManager = function(){
    this.drawingManager = new google.maps.drawing.DrawingManager({
		drawingMode: google.maps.drawing.OverlayType.MARKER,
		drawingControl: true,
		drawingControlOptions: {
		  position: google.maps.ControlPosition.TOP_CENTER,
		  drawingModes: [
			google.maps.drawing.OverlayType.MARKER,
			google.maps.drawing.OverlayType.CIRCLE,
			google.maps.drawing.OverlayType.POLYGON,
			google.maps.drawing.OverlayType.POLYLINE,
			google.maps.drawing.OverlayType.RECTANGLE,
		  ],
		},
		markerOptions: {
		  icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
		},
		circleOptions: {
		  fillColor: "#ffff00",
		  fillOpacity: 0.5,
		  strokeWeight: 5,
		  clickable: false,
		  editable: true,
		  zIndex: 1,
		},
    });

    this.drawingManager.setMap(this.map);
}

/**
 * 根据经纬度查询周边特定范围，特定类型地址 信息数据(谷歌地图加载api必须添加 libraries=places 参数)
 * @param {Object} option 
 * @param {Function} fn 回调函数，参数为周边指定地址 
 * * type值有哪些？：
 * accounting
airport
amusement_park
aquarium
art_gallery
atm
bakery
bank
bar
beauty_salon
bicycle_store
book_store
bowling_alley
bus_station
cafe
campground
car_dealer
car_rental
car_repair
car_wash
casino
cemetery
church
city_hall
clothing_store
convenience_store
courthouse
dentist
department_store
doctor
drugstore
electrician
electronics_store
embassy
fire_station
florist
funeral_home
furniture_store
gas_station
gym
hair_care
hardware_store
hindu_temple
home_goods_store
hospital
insurance_agency
jewelry_store
laundry
lawyer
library
light_rail_station
liquor_store
local_government_office
locksmith
lodging
meal_delivery
meal_takeaway
mosque
movie_rental
movie_theater
moving_company
museum
night_club
painter
park
parking
pet_store
pharmacy
physiotherapist
plumber
police
post_office
primary_school
real_estate_agency
restaurant
roofing_contractor
rv_park
school
secondary_school
shoe_store
shopping_mall
spa
stadium
storage
store
subway_station
supermarket
synagogue
taxi_stand
tourist_attraction
train_station
transit_station
travel_agency
university
veterinary_care
zoo
 */
loadGoogleMap.prototype.getPlaceNearbySearch = function(option,fn){
	var _this = this;
	var mainPoint = new google.maps.LatLng(this.lat, this.lng);
	var defaults = {
		location:mainPoint,
		radius:500,//默认500
		type: "store",//查询商店类型
	};
	var opts = $.extend({}, defaults, option);
	
   var service = new google.maps.places.PlacesService(this.map);
   service.nearbySearch(
       opts,
       (results, status, pagination) => {
         if (status !== "OK" || !results){
			 alert("周边没有找到指定类型的地址");
			 return;
		 }
		// console.log(results,"rrr")
         fn && fn(results);
       }
    );
}

//百度坐标转高德（传入经度、纬度）
function bd_decrypt(bd_lng, bd_lat) {
	var X_PI = Math.PI * 3000.0 / 180.0;
	var x = bd_lng - 0.0065;
	var y = bd_lat - 0.006;
	var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
	var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
	var gg_lng = z * Math.cos(theta);
	var gg_lat = z * Math.sin(theta);
	return {
		lng: gg_lng,
		lat: gg_lat
	}
}
//高德坐标转百度（传入经度、纬度）
function bd_encrypt(gg_lng, gg_lat) {
	var X_PI = Math.PI * 3000.0 / 180.0;
	var x = gg_lng,
		y = gg_lat;
	var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
	var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
	var bd_lng = z * Math.cos(theta) + 0.0065;
	var bd_lat = z * Math.sin(theta) + 0.006;
	return {
		bd_lat: bd_lat,
		bd_lng: bd_lng
	}
};

/**
 * 加载百度地图
 * @param {Number} lat 纬度
 * @param {Number} lng 经度
 * @param {String} idVal 地图容器id值
 * @param {Object || false} oAddressInput 地址输入dom对象 
 * @param {Boolean} isStillMarker 是否静态marker
 * */
function loadBaiduMap(lat, lng, idVal,oAddressInput ,isStillMarker){
	var _this = this;
	this.gMapKey = "FW1UxGEREGXZikFRUR4ZDVa0uScNTWs6";//谷歌秘钥
	
	this.lat = lat;
	this.lng = lng;
	this.idVal = idVal;
	this.oAddressInput = oAddressInput;
	this.isStillMarker = isStillMarker;
	this.mapControl = null;//地图插件构造函数对象
	
	this.isChina = true;
	
	this.postal_code = "";//郵編
	this.detailsAddress = "";//详细地址
	this.city = "";//主要城市
	this.country = "";//国家
	this.provice = "";//省
	
	this.map = null;
	this.infowindow = null;//信息窗口
	
	
	this.geocoder = null;//地理编码解析对象
	
	this.marker = null;//标注
	//初始化百度地图搜索控件
	this.localSearch = null;
	
	this.xhbLoadGMap({lat:this.lat,lng:this.lng},this.idVal);
}

//百度加载秘钥
loadBaiduMap.prototype.xhbLoadGMap = function(latLng,idVal,fn){
	var _this = this;
	var tt = Date.parse(new Date());
	
	var scriptArr = [location.protocol+'//api.map.baidu.com/getscript?v=2.0&ak='+ this.gMapKey +'&services=&t='+tt];
	
	if(window.BMap){
	
		_this.renderMap(_this.lat, _this.lng, _this.idVal,function(){
			
		})	
	}else{
		loadScript(scriptArr,0, function () {
			_this.renderMap(_this.lat, _this.lng, _this.idVal,function(){
				
			})	
		});
			
	}
	
}


/**
 * 调用地图
 * @param {Number} lat 纬度数字
 * @param {Number} lng 经度数字
 * */
loadBaiduMap.prototype.renderMap = function(lat, lng, idVal,fn){
	var _this = this;	
	
	this.map = new BMap.Map(idVal);
	this.map.enableScrollWheelZoom(true); //默认关闭鼠标缩放。重新设置true
	
	//初始化百度地图搜索控件
	this.localSearch = new BMap.LocalSearch(this.map);
	
	//初始化百度地图控件
	this.mapControl = new baiduMap();
	this.geocoder = new BMap.Geocoder();
	
	this.map.addControl(this.mapControl.navigationControl());
	
	//GPS经纬度转化为百度经纬度
	this.mapControl.transfrom(lng, lat, function(p) {
		//添加标注
		_this.marker = _this.mapControl.createMarker({
			lng: p.lng,
			lat: p.lat
		});
		_this.map.addOverlay(_this.marker);
		if(!_this.isStillMarker){
			_this.marker.enableDragging(); //设置可拖拽
		}
		_this.map.centerAndZoom(_this.marker.getPosition(), 17); //定中心
		
		//地址解析
		_this.getInfoByLatLng(_this.marker.getPosition(), function(rs){
			_this.marker.setLabel( _this._setLabel(_this.detailsAddress) );
			//_this.marker.getLabel().setContent(_this.detailsAddress);
			if(_this.oAddressInput){
				_this.oAddressInput.value = _this.detailsAddress;
			}
		});
		
		//监听标注拖拽
		_this.marker.addEventListener("dragstart", function(e) { //拖动事件
//			console.log(e,"eeee",e.pointN)
			// this.getLabel().setContent("搜索中...");
			
		});
		//监听标注拖拽
		_this.marker.addEventListener("dragend", function(e) { //拖动事件
		
			var pt = e.point;
			_this.map.centerAndZoom(pt,17); //定中心
			var that = this;
			//地址解析
			_this.getInfoByLatLng(pt, function(rs){
				that.getLabel().setContent(_this.detailsAddress);
				//_this.marker.setLabel( _this._setLabel(_this.detailsAddress) );
				if(_this.oAddressInput){
					_this.oAddressInput.value = _this.detailsAddress;
				}
			});
			
			
		});
	});
	
	
	
	if(this.oAddressInput){
		//失去焦点事件
		this.oAddressInput.onblur = function(){
			if(this.value == "") retrun;
			//获取地理位置信息和更新标注信息
			_this.localSearchFn(this.value,function(){
				
			});
		}
	}
	
	fn && fn();
}

//根据关键词查询地理位置信息
loadBaiduMap.prototype.localSearchFn = function(keyword){
	var _this = this;
	this.localSearch.setSearchCompleteCallback(function (searchResult) {
		var poi = searchResult.getPoi(0);			
		
		// console.log(poi,"poi");
		_this.marker.setPosition(poi.point);
		_this.map.centerAndZoom(poi.point, 17); //定中心
				
		_this.marker.getLabel().setContent(keyword);
		
		
		//根据获取到的经纬度重新更新信息
		_this.getInfoByLatLng(poi.point,function(){
			
		});
		
	});
	this.localSearch.search(keyword);
}

/**
 * 根据经纬度解析出地理位置相关数据
 * @param {Object} myCenter 经纬度对象
 */
loadBaiduMap.prototype.getInfoByLatLng = function(myCenter,fn){
	var _this = this;
	this.geocoder.getLocation(myCenter, function(rs) {
		console.log(rs,"111")
		
		var addComp = rs.addressComponents;
		_this.city = addComp.city;//主要城市
		//_this.country = "";//国家
		_this.provice = addComp.province;//省
		_this.detailsAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
		
		// mapData.baidu.city = rs.addressComponents.city;
		var GPS_point = bd_decrypt(rs.point.lng, rs.point.lat);
		_this.lat = GPS_point.lat;
		_this.lng = GPS_point.lng;
		
		fn(rs);
	});
	
}

//动态更新标注位置和窗口信息
loadBaiduMap.prototype.updateMarkerWindow = function(addr, lat, lng){
	var _this = this;
	this.lat = lat;
	this.lng = lng;
	//高德谷歌转百度
	var GPS_point = bd_decrypt(lng, lat);
	lat = GPS_point.lat;
	lng = GPS_point.lng;
	
	var oPoint = new BMap.Point(lng, lat);
	
	
	this.marker.setPosition(oPoint);
	this.map.centerAndZoom(oPoint, 17); //定中心
	if(_this.oAddressInput){
		_this.oAddressInput.value = addr;
	}
	
	this.marker.getLabel().setContent(addr);
	
	// console.log(GPS_point,"GPS_point");
	//根据经纬度解析出地理位置相关数据
	this.getInfoByLatLng(oPoint,function(rs){
		
	})
		
}

//设置label
loadBaiduMap.prototype._setLabel = function(txt) {
	console.log('',txt)
	//标注添加label
	var label = this.mapControl.setLabel({
		content: txt || "搜索中...",
		offset: [15, -15],
		style: {
			border: "1px solid gray",
			padding: "2px 5px",
			borderRadius: "3px"
		}
	});

	return label;
}


//生成卫星地图图片地址
loadBaiduMap.prototype.getStaticMapImage = function(lat,lng){
	lat = lat || this.lat;
	lng = lng || this.lng;
	var imgUrl = '//api.map.baidu.com/staticimage/v2?ak=' + this.gMapKey + '&center=' + lng + ',' + lat + '&width=1000&height=1000&zoom=17';
	return imgUrl;
}

/**
 * 地点输入提示服务
 * @param {String} query 要模糊查询的地点
 * @param {String} region 限制的地区名 必须城市名称
 */
loadBaiduMap.prototype.getPlaceSuggestionList = function(query,region,fn){
	var _this = this;
	
	 $.ajax({
	  type: 'GET',
	  async: false,
	  url: '//api.map.baidu.com/place/v2/suggestion',
	  data:{
		  ak: this.gMapKey,
		  query:query,
		  region:region,
		  city_limit:true,//是否限制在region区域中寻找
		  output:'json'
	  },
	  dataType: 'jsonp',
	  jsonp: 'callback',
	  jsonpCallback: 'flightHandler',  // 默认为jQuery自动生成的随机函数名
	  success: function (json) {
		  fn && fn(json);
		console.log(json,"rrr");
	  },
	  error: function () {
		alert('fail');
	  }
	});
} 

/**
 * 根据标签地点检索
 * @param {String} query 要模糊查询的地点
 * @param {String} region 限制的地区名 必须城市名称
 */
loadBaiduMap.prototype.searchDataByTag = function(query,region,tag,fn){
	var _this = this;
	
	 $.ajax({
	  type: 'GET',
	  async: false,
	  url: '//api.map.baidu.com/place/v2/search',
	  data:{
		  ak: this.gMapKey,
		  query:query,
		  tag:tag || '',
		  region:region,
		  city_limit:true,//是否限制在region区域中寻找
		  output:'json'
	  },
	  dataType: 'jsonp',
	  jsonp: 'callback',
	  jsonpCallback: 'flightHandler',  // 默认为jQuery自动生成的随机函数名
	  success: function (json) {
		  fn && fn(json);
		console.log(json,"rrr");
	  },
	  error: function () {
		alert('fail');
	  }
	});
} 

//百度地图获取IP地址经纬度 
loadBaiduMap.prototype.getipaddress = function(fn){
	var url = "//api.map.baidu.com/location/ip";
	var data = {
		ak: this.gMapKey,
		coor: "WGS84ll",//WGS84ll 谷歌体系    bd0911百度体系
		
	};
	
	
	 $.ajax({
	  type: 'GET',
	  async: false,
	  url: url,
	  data:data,
	  dataType: 'jsonp',
	  jsonp: 'callback',
	  jsonpCallback: 'flightHandler',  // 默认为jQuery自动生成的随机函数名
	  success: function (json) {
		  fn && fn(json);
		console.log(json,"rrr");
	  },
	  error: function () {
		alert('fail');
	  }
	});
}
