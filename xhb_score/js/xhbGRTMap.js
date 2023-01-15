/**
 * GCJ-02: 国测局坐标系，火星坐标 ：==========》 腾讯，高德，谷歌（境内）
 * WGS-84: 地心坐标系，GPS原始坐标系    navigator.geolocation.getCurrentPosition()获取，===================》注意：境外百度地图，境外谷歌地图（使用的）
 * WGS-84 exactly:
 * BD-09: 百度地图坐标系，由GCJ-02进一步偏移得到
 * Web mercator(墨卡托):
 * 其他
 * CGCS2000:国家大地坐标系  ======》天地图
 */
const coordTrans = {
    PI: 3.14159265358979324,
    x_pi: 3.14159265358979324 * 3000.0 / 180.0,
    delta: function (lat, lon) {
        // Krasovsky 1940
        //
        // a = 6378245.0, 1/f = 298.3
        // b = a * (1 - f)
        // ee = (a^2 - b^2) / a^2;
        var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
        var dLat = this.transformLat(lon - 105.0, lat - 35.0);
        var dLon = this.transformLon(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * this.PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
        return {'lat': dLat, 'lng': dLon};
    },

    //WGS-84 to GCJ-02
    gcj_encrypt: function (wgsLat, wgsLon) {
        if (this.outOfChina(wgsLat, wgsLon))
            return {'lat': wgsLat, 'lng': wgsLon};

        var d = this.delta(wgsLat, wgsLon);
        return {'lat': wgsLat + d.lat, 'lng': wgsLon + d.lng};
    },
    //GCJ-02 to WGS-84
    gcj_decrypt: function (gcjLat, gcjLon) {
        if (this.outOfChina(gcjLat, gcjLon))
            return {'lat': gcjLat, 'lng': gcjLon};

        var d = this.delta(gcjLat, gcjLon);
        return {'lat': gcjLat - d.lat, 'lng': gcjLon - d.lng};
    },
    //GCJ-02 to WGS-84 exactly
    gcj_decrypt_exact: function (gcjLat, gcjLon) {
        var initDelta = 0.01;
        var threshold = 0.000000001;
        var dLat = initDelta, dLon = initDelta;
        var mLat = gcjLat - dLat, mLon = gcjLon - dLon;
        var pLat = gcjLat + dLat, pLon = gcjLon + dLon;
        var wgsLat, wgsLon, i = 0;
        while (1) {
            wgsLat = (mLat + pLat) / 2;
            wgsLon = (mLon + pLon) / 2;
            var tmp = this.gcj_encrypt(wgsLat, wgsLon)
            dLat = tmp.lat - gcjLat;
            dLon = tmp.lng - gcjLon;
            if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
                break;

            if (dLat > 0) pLat = wgsLat; else mLat = wgsLat;
            if (dLon > 0) pLon = wgsLon; else mLon = wgsLon;

            if (++i > 10000) break;
        }
        ////console.log(i);
        return {'lat': wgsLat, 'lng': wgsLon};
    },
    //GCJ-02 to BD-09
    bd_encrypt: function (gcjLat, gcjLon) {
        var x = gcjLon, y = gcjLat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
        var bdLon = z * Math.cos(theta) + 0.0065;
        var bdLat = z * Math.sin(theta) + 0.006;
        return {'lat': bdLat, 'lng': bdLon};
    },
    //BD-09 to GCJ-02
    bd_decrypt: function (bdLat, bdLon) {
        var x = bdLon - 0.0065, y = bdLat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
        var gcjLon = z * Math.cos(theta);
        var gcjLat = z * Math.sin(theta);
        return {'lat': gcjLat, 'lng': gcjLon};
    },
    //WGS-84 to Web mercator
    //mercatorLat -> y mercatorLon -> x
    mercator_encrypt: function (wgsLat, wgsLon) {
        var x = wgsLon * 20037508.34 / 180.;
        var y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);
        y = y * 20037508.34 / 180.;
        return {'lat': y, 'lng': x};
        /*
        if ((Math.abs(wgsLon) > 180 || Math.abs(wgsLat) > 90))
            return null;
        var x = 6378137.0 * wgsLon * 0.017453292519943295;
        var a = wgsLat * 0.017453292519943295;
        var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
        return {'lat' : y, 'lng' : x};
        //*/
    },
    // Web mercator to WGS-84
    // mercatorLat -> y mercatorLon -> x
    mercator_decrypt: function (mercatorLat, mercatorLon) {
        var x = mercatorLon / 20037508.34 * 180.;
        var y = mercatorLat / 20037508.34 * 180.;
        y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.)) - this.PI / 2);
        return {'lat': y, 'lng': x};
        /*
        if (Math.abs(mercatorLon) < 180 && Math.abs(mercatorLat) < 90)
            return null;
        if ((Math.abs(mercatorLon) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892))
            return null;
        var a = mercatorLon / 6378137.0 * 57.295779513082323;
        var x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0);
        var y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323;
        return {'lat' : y, 'lng' : x};
        //*/
    },
    // two point's distance
    distance: function (latA, lonA, latB, lonB) {
        var earthR = 6371000.;
        var x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);
        var y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
        var s = x + y;
        if (s > 1) s = 1;
        if (s < -1) s = -1;
        var alpha = Math.acos(s);
        var distance = alpha * earthR;
        return distance;
    },
    outOfChina: function (lat, lon) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    },
    transformLat: function (x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon: function (x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    }
};




 /**
  * jsonp请求
  * @param {Object} options 
  * {
  *    url: "" 请求地址,
  *    data: {} 请求参数
  * success：成功时候执行的函数
  * }
  * @returns {JSON} 
  */ 
    function jsonp(options) {
        const script = document.createElement('script');
        let substitute01 = Math.random().toString();
        substitute01 = substitute01.replace('.', '_');
        let substitute02 = Math.random().toString();
        substitute02 = substitute02.replace('.', '_');
        const function_name = `fun${substitute01}_${substitute02}`;
        let params = '';
        //遍历对象
        for (const key in options.data) {
            params += '&' + key + '=' + options.data[key];
        }
        //这里还必须叫callback，否则后台的jsonp方法不识别
        script.src = `${options.url}?callback=${function_name}` + params;
        //挂载到window对象上
        console.log(function_name);
        window[function_name] = options.success;
        //把scipt加入到文档流中
        const body = document.querySelector('body');
        body.appendChild(script);
        script.addEventListener('load', () => body.removeChild(script))
    }


/**
 * @param {Object} obj 
 * {
 *    url: "" 请求地址,
 *    methods: "get/post" 请求方法,
 *    data: {} 请求参数
 * }
 * @returns {JSON} 
 */ 
const promiseAjax = function (obj) {
    //返回promise对象
    return new Promise((res, rej) => {
        let xhr = null
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            //兼容ie5、ie6
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
		
		
        // 监听请求状态变化
        xhr.onreadystatechange = function () {
            try {
 
                if (xhr.readyState == 4 && xhr.status == 200) {
					var resData = typeof this.responseText == "object" ? this.responseText : JSON.parse(this.responseText);
					
					res(resData)
                } else {
                    if (xhr.status == 404) throw '404,未找到页面'
                }
            } catch (e) {
				
                rej(e)
            }
        }
 
        if (obj.methods != undefined && obj.methods != '') {
            var method = String(obj.methods).toUpperCase;
            if (method == 'GET') {
                let data = '?'
                for (let key in obj.data) {
                    data += key + '=' + obj.data[key] + '&'
                }
                data.substring(data.length - 1)
                obj.data = data
            }
        } else {
            throw new Error("请求方式不能为空！")
        }
 
        xhr.open(obj.methods, obj.url, true) //发起请求
		// xhr.setRequestHeader("Accept","text/plain");
		// xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        //发送请求
        method == 'GET' ? xhr.send() : xhr.send(obj.data);
		
    })
}

//根據當前ip獲取地理信息
 function getLatLogByLocalhost(fn){
	var latLng = {lat:22.581783001, lng:113.962135001};
	if(!navigator.geolocation){		
		fn && fn(latLng);
		// alert("!navigator")
	}else{
		navigator.geolocation.getCurrentPosition(
			function(pos){
				var latitude = pos.coords.latitude;
				var longitude = pos.coords.longitude;
				latLng = {lat:latitude, lng:longitude};
				fn && fn(latLng);
				// alert("navigator fn1")
			},
			function(){
				fn && fn(latLng);
				// alert("navigator fn2")
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




;
(function(undefined) {
	"use strict"
	var _global;


	
	//主要函数体之一
	function baiduMap() {}

	//构建方法
	
	/**
	 * 缩放工具
	 * @return {Object} 返回缩放工具对象
	 * */
	baiduMap.prototype.navigationControl = function() {
		 var n = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            offset: new BMap.Size(10, 150),
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            showZoomInfo: true,
            enableGeolocation: true
        });
        return n;
        //使用方法：map.addControl(bdMap.navigationControl());，以下工具类的方法一样
	}
	/**
	 * 定位工具
	 * @param {Function} succFn 定位成功的回调函数，参数是定位的地址和经纬度对象
	 * @param {Function} errFn 定位失败的回调函数，参数是定位失败的信息
	 * @return {Object} 返回定位工具对象
	 * */
	baiduMap.prototype.geolocationControl = function(succFn,errFn) {
		var g = new BMap.GeolocationControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT,
            offset: new BMap.Size(10, 80),
            showAddressBar: true,
            enableGeolocation: true
        });
        //定位成功事件
        g.addEventListener("locationSuccess", function (e) {          
			/**
			 * @param {Object} e.addressComponent 地址
			 * @param {Object} e.point 经纬度
			 * */
            succFn(e.addressComponent,e.point);

        });
        //定位失败事件
        g.addEventListener("locationError", function (e) {
        	errFn(e.message);
        });
        return g;
	}
	
	/**
	 * 比例尺工具
	 * @return {Object} 返回比例尺工具对象
	 * */
	baiduMap.prototype.scaleControl = function(){
		var s = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            offset: new BMap.Size(10, 10),
        });
        return s;
	}
	
	/**
	 * 切换地图类型
	 * @return {Object} 返回地图类型对象
	 * */
	baiduMap.prototype.mapTypeControl = function(){
		var opts6 = {
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            type: BMAP_MAPTYPE_CONTROL_MAP
        }
        var maptype = new BMap.MapTypeControl(opts6);
        return maptype;
	}
	
	/**
	 * 负责切换至全景地图的控件(浏览器要装Adobe Flash Play控件)
	 * @return {Object}
	 * */
	baiduMap.prototype.panoramaControl = function(){
		var p = new BMap.PanoramaControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
        });
        return p;
	}
	
	/**
	 * 删除指定经纬度标注
	 * @param {Number} longitude 要删除的标注的经度
	 * @param {Number} latitude 要删除的标注的维度
	 * */
	baiduMap.prototype.removeMarker = function(longitude, latitude){
		var allOverlay = map.getOverlays();
        for (var i = 0; i < allOverlay.length; i++) {
            if (allOverlay[i].toString() == "[object Marker]") {
                if (allOverlay[i].getPosition().lng == longitude && allOverlay[i].getPosition().lat == latitude) {
                    map.removeOverlay(allOverlay[i]);
                }
            }
        }
	}
	
	/**
	 * GPS经纬度转换百度经纬度
	 * @param {Number} curLongitude 要转换的经度
	 * @param {Number} curLatitude 要转换的纬度
	 * @param {Function} fn 转换后的回调函数    参数是转换后的百度经纬度对象
	 * */
	baiduMap.prototype.transfrom = function(curLongitude, curLatitude, fn){
		//将获取的坐标转换为百度坐标
        var ggPoint = new BMap.Point(curLongitude, curLatitude);
        //坐标转换完之后的回调函数
        var translateCallback = function (data) {
            if (data.status === 0) fn(data.points[0]);
			// if (data.status === 0) fn( {lat:curLatitude,lng:curLongitude} );
        }
        var convertor = new BMap.Convertor();
        var pointArr = [];
        pointArr.push(ggPoint);
        convertor.translate(pointArr, 1, 5, translateCallback);
   
		
	}
	
	/**
	 * 获取两点之间的距离
	 * @param {Number} start_lng 开始标注的经度
	 * @param {Number} start_lat 开始标注的纬度
	 * @param {Number} end_lng 结束标注的经度
	 * @param {Number} end_lat 结束标注的纬度
	 * @return {Number}
	 * */
	baiduMap.prototype.getDistence = function(start_lng, start_lat, end_lng, end_lat){
		var start_point = new BMap.Point(start_lng * 1, start_lat * 1);
        var end_point = new BMap.Point(end_lng * 1, end_lat * 1);
        return Math.ceil(map.getDistance(start_point, end_point));
	}
	
	/**
	 * marker设置地图label(基于jq的插件开发机制)
	 * @param {Object} option 设置地图label的参数
	 * @param {string} option.content label标签内容
     * @param {[number,number]} option.offset label标签相对marker标注的偏移值
	 * @param {object} option.style label样式对象
	 * @return {Object} lable对象
	 * * @example
	 * mapControl.setLabel({
		content:"这是标注的label",
		offset:[15, -15],
		style:{
			border: "solid 1px gray",
			padding:'2px 5px',
			borderRadius:'3px',
		}
	})
	 * */
	baiduMap.prototype.setLabel = function(option){
		var _this = this;
		var defaults = {
			content:"这是标注的label",
			offset:[15, -15],
			style:{
				border: "solid 1px gray",
				padding:'2px 5px',
				borderRadius:'3px',
			}
		};
		var opts =  Object.assign({}, defaults, option);
		
        var lbl = new BMap.Label(
            opts.content, {
                offset: new BMap.Size(opts.offset[0], opts.offset[1])
            }
        );
        lbl.setStyle(opts.style);
        return lbl;
	}

	

	/**
	 * 自定义icon创建标注，返回标注对象(基于jq的插件开发机制)
	 * @param {Object} option 自定义icon创建标注的参数
	 * @param {object} option.Icon 不设置，默认百度原始图标对象
	 * @param {number} option.lng 要创建的标注经度
	 * @param {number} option.lat 要创建的标注经度	
	 * @return {Object} 
	 * */
	baiduMap.prototype.createMarker = function(option){
		var _this = this;
		//参数输入示例
		var defaults = {
			Icon:_this.setIcon(),
			lng:113.95403656908,
			lat:22.549744538467
		};
		var opts =  Object.assign({}, defaults, option);
		var point = new BMap.Point(opts.lng,opts.lat)
        var Marker = new BMap.Marker(point, {
            icon: opts.Icon
        });
        return Marker;
	}
	
	/**
	 * 自定义百度地图icon，返回icon对象(基于jq的插件开发机制)
	 * @param {Object} option 自定义百度地图icon的参数
	 * @param {String} option.imgUrl 图片icon地址
	 * @param {number} option.width 图片的原始宽度
	 * @param {number} option.height 图片的原始高度
	 * @return {Object}
	 * */
	baiduMap.prototype.setIcon = function(option){
		//参数输入示例
		var defaults = {
			imgUrl:"http://api0.map.bdimg.com/images/marker_red_sprite.png",
			width:39,//img的原始宽度
			height:25//img的原始高度
		};
		var opts =  Object.assign({}, defaults, option);
		var icon = new BMap.Icon(opts.imgUrl, new BMap.Size(opts.width, opts.height));
		return icon;
	}
	
	/**
	 * 自定义窗口，返回窗口对象(基于jq的插件开发机制)
	 * @param {Object} option 自定义窗口的配置参数对象
	 * @param {String} option.content 信息窗口的主要内容
	 * @param {number} option.width 信息窗口的原始宽度
	 * @param {number} option.height 信息窗口的原始高度
	 * @param {string} option.title 信息窗口标题
	 * @return {object} 信息窗口对象
	 * */
	baiduMap.prototype.setWindow = function(option){
		var defaults = {
			content:"这特么是信息窗口内容！....",
			width : 200,     // 信息窗口宽度
			height: 200,     // 信息窗口高度
			title : "信息窗口标题" , // title信息窗口标题
		};
		var opts =  Object.assign({}, defaults, option);
		var infoWindow = new BMap.InfoWindow(
				opts.content, {
				width : opts.width,     // 信息窗口宽度
				height: opts.height,     // 信息窗口高度
				title : opts.title // 信息窗口标题
		});  
		return infoWindow;
	}
	
	/**
	 * 自定义右键菜单(基于jq的插件开发机制)
	 * @param {Object} option 自定义右键菜单的配置参数
	 * @param {Array} option.ContextMenu 右键菜单数据数组
	 * @param {String} option.ContextMenu[sort].text 右键菜单名称
	 * @param {Function} option.ContextMenu[sort].callback 右键菜单名称
	 * @param {Object} 右键菜单对象
	 * */
	baiduMap.prototype.setContextMenu = function(option){
		var defaults = {
			ContextMenu:[
				{
					text:"打印",
					callback:function(e,k,m){
						//console.log(e,k,m);
					}
				},
				{
					text:"删除",
					callback:function(e,k,m){
						map.removeOverlay(m);
						//console.log("del");
					}
				}
			]
		};
		var opts =  Object.assign({}, defaults, option);
		var Menu = new BMap.ContextMenu();
		for(var k in opts.ContextMenu){
			Menu.addItem(
				new BMap.MenuItem(opts.ContextMenu[k].text,opts.ContextMenu[k].callback)
			);
		}
		return Menu;
	}
	
	
	
	/**
	 * 加载百度地图
	 * options
	 *  * 注意：初始化，更新，的经纬度必须为WGS84系
	 * @param {Number} options.lat 纬度
	 * @param {Number} options.lng 经度
	 * @param {String} options.idVal 地图容器id值
	 * @param {Object || false} options.oAddressInput 地址输入dom对象 
	 * @param {Boolean} options.isStillMarker 是否静态marker
	 * @param {Boolean} options.isModuleLoad 是否页面已经加载地图api
	 * @param {Function} options.callback 初始化地图成功回调函数 
	 * @param {Boolean} options.isPlaceSugSearch 主输入框是否使用建议列表功能
	 * */
	 function loadBaiduMap(options){
		var _this = this;
		this.gMapKey = "FW1UxGEREGXZikFRUR4ZDVa0uScNTWs6";//百度秘钥
		var defaultOptions = {
			lat:22.581783,
			lng:113.962135,
			idVal:"baiduMap",
			oAddressInput:false,
			isStillMarker:false,
			isModuleLoad:false,
			isPlaceSugSearch:false,
			callback:function(){
				
			}
		};
		const _options = Object.assign({}, defaultOptions, options);
		
		this.callback = _options.callback;
		this.lat = _options.lat;
		this.lng = _options.lng;
		this.idVal = _options.idVal;
		this.oAddressInput = _options.oAddressInput;
		this.isStillMarker = _options.isStillMarker;
		this.isPlaceSugSearch = _options.isPlaceSugSearch;
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
		this.placeSugSearchMarker = null;//模糊搜索建议列表定义的marker
		
		//初始化百度地图搜索控件
		this.localSearch = null;
		
		if(_options.isModuleLoad){//已加载地图api
			_this.renderMap(_this.lat, _this.lng, _this.idVal,function(){
				
			})	
		}else{
			this.xhbLoadGMap({lat:this.lat,lng:this.lng},this.idVal);
		}
		
		
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
		
		//GPS经纬度转化为百度经纬度(WGS-84转百度)
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
			
			_this.callback();
		});
		
		
		
		if(this.oAddressInput){
			if(this.isPlaceSugSearch){
				this.placeSugSearch(this.oAddressInput,true);
			}else{
				//失去焦点事件
				this.oAddressInput.onblur = function(){
					if(this.value == "") return false;
					//console.log("ssss")
					//获取地理位置信息和更新标注信息
					_this.getGEOInfoByAddr(this.value,function(){
						
					});
				}
			}
			
		}
		
		fn && fn();
	}
	
	//根据关键词查询地理位置信息
	loadBaiduMap.prototype.localSearchFn = function(keyword){
		var _this = this;
		this.localSearch.setSearchCompleteCallback(function (searchResult) {
			console.log(searchResult,"searchResult")
			var poi = searchResult.getPoi(0);			
			
			// //console.log(poi,"poi");
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
	 * 根据经纬度解析出地理位置相关数据（经纬度为百度体系）
	 * @param {Object} myCenter 经纬度对象
	 */
	loadBaiduMap.prototype.getInfoByLatLng = function(myCenter,fn){
		var _this = this;
		// //console.log("百度.........",myCenter,myCenter.lat)
		this.geocoder.getLocation(myCenter, function(rs) {
			
			var addComp = rs.addressComponents;
			_this.city = addComp.city;//主要城市
			//_this.country = "";//国家
			_this.provice = addComp.province;//省
			_this.detailsAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
			
			// mapData.baidu.city = rs.addressComponents.city;
			// var GPS_point = getWGS84({lat:rs.point.lat,lng:rs.point.lng},"baidu");
			_this.lat = myCenter.lat;
			_this.lng = myCenter.lng;
			
			fn(rs);
		});
		
	}
	
	/**
	 * 动态更新主要标注位置和窗口信息，经纬度必须是WGS84坐标体系
	 * @param {String} addr 设置的地址信息
	 * @param {Number} lat 纬度
	 * @param {Number} lng 经度
	 */
	loadBaiduMap.prototype.updateMarkerWindow = function(addr, lat, lng){
		var _this = this;	
		_this.lat = lat;
		_this.lng = lng;
				
		this.mapControl.transfrom(lng, lat, function(p) {
			
			var oPoint = new BMap.Point(p.lng, p.lat);
			
			_this.marker.setPosition(oPoint);
			_this.map.centerAndZoom(oPoint, 17); //定中心
			
			//根据经纬度解析出地理位置相关数据
			_this.getInfoByLatLng(oPoint,function(rs){
				if(_this.oAddressInput){
					_this.oAddressInput.value = addr || _this.detailsAddress;
				}
				
				_this.marker.getLabel().setContent(addr || _this.detailsAddress);
			});
		})		
		
	}
	
	//设置label
	loadBaiduMap.prototype._setLabel = function(txt) {
	
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
	 * @param {Function} fn 返回限制的地区名 下的地理信息列表
	 */
	loadBaiduMap.prototype.getPlaceSuggestionList = function(query,region,fn){
		var _this = this;
		
		jsonp({
			url:"https://api.map.baidu.com/place/v2/suggestion",
			data:{
			  ak: this.gMapKey,
			  query:query,
			  region:region,
			  city_limit:true,//是否限制在region区域中寻找
			  output:'json'
			},
			success:function(res){
				fn && fn(res);
				console.log("jsonp",res)
			}
		});
		
	} 
	
	/**
	 * 初始化当前城市
	 * 回调函数参数：
	 * center: {lng: 114.06455184, lat: 22.54845664}
		code: 340
		level: 5
		name: "深圳市"
	 */ 
	loadBaiduMap.prototype.initLocalCity = function(fn){
	    var _this = this;
	    var myCity = new BMap.LocalCity();
	    myCity.get(function(result){
	       fn && fn(result);
	    });
	},
	/**
	 * 输入关键字搜索，根据关键字更新地图并获取信息
	 * @@param {Object} map 地图实例
	 * @@param {Object} thisValue 地理位置相关信息集合
	 * @@param {Object} centerPoint 标注对象，默认当前主要标注
	 */ 
	loadBaiduMap.prototype.searchByKey = function(map,thisValue,centerPoint){
	   var _this = this;		
		
		var thisDistrict = thisValue.district;
		var thisStreet = thisValue.street;
		var thisStreetNumber = thisValue.streetNumber;
		var thisBusiness = thisValue.business;
		//更新主要信息1
		_this.provice = thisValue.province;
		_this.city = thisValue.city;
		_this.detailsAddress = _this.provice + _this.city + thisDistrict + thisStreet + thisStreetNumber + thisBusiness;
		
	   var localSearch = new BMap.LocalSearch(map);
		// 启用根据结果自动调整地图层级，当指定了搜索结果所展现的地图时有效
	   localSearch.enableAutoViewport();
	   localSearch.search(_this.detailsAddress);
	   localSearch.setSearchCompleteCallback(function (searchResult) {
		   if(searchResult && searchResult.getPoi(0)){
			   var poi = searchResult.getPoi(0);
			   if(poi.point){
				   map.centerAndZoom(poi.point,17);
				   centerPoint.setPosition(poi.point);		
					//更新主要信息2		 
				   _this.lat = poi.point.lat;
				   _this.lng = poi.point.lng;
				   if(_this.oAddressInput){
				   	_this.oAddressInput.value = _this.detailsAddress;
				   }
				   centerPoint.getLabel().setContent(_this.detailsAddress);
			   }
		   }
	   });
	}
	
	/**
	 * 模糊检索，地址建议列表组件
	 * @param {Object} dom 输入框dom节点
	 * @param {Boolean} isMainInput 是否主要input
	 * */
	loadBaiduMap.prototype.placeSugSearch = function(dom,isMainInput){
		var _this = this;
		//建立一个自动完成的对象，keyword出现下拉选择
		var ac = new BMap.Autocomplete({    
		    "input" : dom.getAttribute('id'),
		    "location" : this.map
		});
		ac.addEventListener("onconfirm", function(e,a) {
		    
		    var thisValue = e.item.value;
			if(isMainInput){
				 _this.searchByKey(_this.map,thisValue,_this.marker);
			}
			else{				
				_this.addPlaceSugSearchMarker(thisValue);
			}
		});
	}
	
	//动态新增模糊检索自动完成地址对应的标注
	loadBaiduMap.prototype.addPlaceSugSearchMarker = function(thisValue){
		var _this = this;
		var thisDistrict = thisValue.district;
		var thisStreet = thisValue.street;
		var thisStreetNumber = thisValue.streetNumber;
		var thisBusiness = thisValue.business;
		
		var provice = thisValue.province;
		var city = thisValue.city;
		var detailsAddress = provice + city + thisDistrict + thisStreet + thisStreetNumber + thisBusiness;
		
		var localSearch = new BMap.LocalSearch(this.map);
		// 启用根据结果自动调整地图层级，当指定了搜索结果所展现的地图时有效
		localSearch.enableAutoViewport();
		localSearch.search(detailsAddress);
		localSearch.setSearchCompleteCallback(function (searchResult) {
				   if(searchResult && searchResult.getPoi(0)){
					   var poi = searchResult.getPoi(0);
					   if(poi.point){
						   _this.map.centerAndZoom(poi.point,17);
						   if(_this.placeSugSearchMarker){
							   _this.placeSugSearchMarker.setPosition(poi.point);
							   _this.placeSugSearchMarker.getLabel().setContent(detailsAddress);
						   }
						   else{
							   _this.placeSugSearchMarker = _this.mapControl.createMarker({
									lng: poi.point.lng,
									lat: poi.point.lat
							   });
							   _this.map.addOverlay(_this.placeSugSearchMarker);
							   _this.placeSugSearchMarker.setLabel( _this._setLabel(detailsAddress) );
						   }
					   }
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
		
		jsonp({
			url:"https://api.map.baidu.com/place/v2/search",
			data:{
			  ak: this.gMapKey,
			  query:query,
			  tag:tag || '',
			  region:region,
			  city_limit:true,//是否限制在region区域中寻找
			  output:'json'
			},
			success:function(res){
				fn && fn(res);
				console.log("jsonp",res)
			}
		});
	} 
	
	//百度地图获取IP地址经纬度 
	loadBaiduMap.prototype.getipaddress = function(fn){		
		
		jsonp({
			url:"https://api.map.baidu.com/location/ip",
			data:{
			 ak: this.gMapKey,
			 coor: "WGS84ll",//WGS84ll 谷歌体系    bd0911百度体系
			 // coor: "BD0911",
			},
			success:function(res){
				fn && fn(res);
				// console.log("jsonp",res)
			}
		});
	}
	/**
	 * 百度地图提供的坐标体系转化函数
	 *  from : 参数说明
	 * 1：GPS标准坐标；
	 * 2：搜狗地图坐标；
	 * 3：火星坐标（gcj02），即高德地图、腾讯地图和MapABC等地图使用的坐标；
	 * 4：3中列举的地图坐标对应的墨卡托平面坐标;
	 * 5：百度地图采用的经纬度坐标（bd09ll）；
	 * 6：百度地图采用的墨卡托平面坐标（bd09mc）;
	 * 7：图吧地图坐标；
	 * 8：51地图坐标；
	 * 
	 * * to : 参数说明
	 * 3：火星坐标（gcj02），即高德地图、腾讯地图及MapABC等地图使用的坐标；
	 * 5：百度地图采用的经纬度坐标（bd09ll）；
	 * 6：百度地图采用的墨卡托平面坐标（bd09mc）；
	 * 如：from = 1 , to =  5 是从 wgs84 坐标转 Bd09ll
	 * @@param {Array} pointsArr 经纬度数组对象，如：[{lat:23,lng:114}]，长度最多为10
	 * @@param {Number} from 当前的坐标体系状态码 
	 * @@param {Number} to 转化后的坐标体系状态码 
	 * @@param {Function} fn 回调函数  ，携带参数为转化后的经纬度坐标数组
	 */
	loadBaiduMap.prototype.coordinateTrans = function(pointsArr,from,to,fn){
		var _this = this;
		window.coordinateTransTimer = null;
		if(!window.BMap){
			window.coordinateTransTimer = setTimeout(function(){
				_this.coordinateTrans(pointsArr,from,to,fn);
			},800);
			return;
		}else{
			clearTimeout(window.coordinateTransTimer);
		}
		
		var converMap = {
			i:0,
			groups:[],
			arr:[],
			init:function(points){
				// //console.log("初始化点：",points);
				var total = 0;
				var groupCount = 0;
				if (points.length % 10 > 0) {
					groupCount = (points.length / 10) + 1;
				}else {
					groupCount = (points.length / 10);
				}
				for(var i=0;i<groupCount;i++){
					var pos = [];
					for(var j=0;j<10;j++){
						if(total<points.length){
							var point = new BMap.Point(points[(i * 10) + j].lng,points[(i * 10) + j].lat);
							pos.push(point);
						}
						total++;
					}
					converMap.groups.push(pos);
				}
			},
			/**
			 * 
			 */
			start:function(cb){
				if(converMap.i<converMap.groups.length){
					var pos = converMap.groups[converMap.i];
					if(pos.length>0){
						var convertor = new BMap.Convertor();
						
						convertor.translate(pos, from, to, function(data){
							for (var i = 0; i < data.points.length; i++) {
								converMap.arr.push( data.points[i] );
							}
							converMap.i++;
							//递归
							converMap.start(cb);
						});
					}else{
						converMap.i++;
						//递归
						converMap.start(cb);
					}
				}else{
					// //console.log("转换结果：",converMap.arr);
					cb(converMap.arr)
				}
			}
		};
		
		converMap.init( pointsArr );
		// 执行转换，并返回转换结果  arrP2
		converMap.start(function(arrP2){
		    //conver result
		 
			fn && fn( arrP2 )
		});
	}
	
	//获取当前存储的经纬度，返回WGS84体系坐标
	loadBaiduMap.prototype.getCurrCoordByWGS84 = function(lat,lng){
		lat = lat || this.lat;
		lng = lng || this.lng;
		return getWGS84({lat:lat,lng:lng},"baidu")
	}
	
	
	
	/**
	 * 加载谷歌地图
	 * options
	 * 注意：初始化，更新，的经纬度必须为WGS84系
	 * @param {Number} options.lat 纬度
	 * @param {Number} options.lng 经度
	 * @param {String} options.idVal 地图容器id值
	 * @param {Object || false} options.oAddressInput 地址输入dom对象 
	 * @param {Boolean} options.isStillMarker 是否静态marker
	 * @param {Boolean} options.isModuleLoad 是否页面已经加载地图api
	 * @param {String} options.lang 设置语言，默认英文
	 * @param {Function} options.callback 初始化地图成功回调函数 
	 * @param {Boolean} options.isPlaceSugSearch 主输入框是否使用建议列表功能
	 * */
	function loadGoogleMap(options) {
		var _this = this;
		this.gMapKey = "AIzaSyATaepX6-wvfIawz6ZSblNd-Qv7ao3lujo";//谷歌秘钥
		var defaultOptions = {
			lat:22.581783,
			lng:113.962135,
			idVal:"googoleMap",
			oAddressInput:false,
			isStillMarker:false,//主要标注是否静态
			isModuleLoad:false,//是否模块化引入
			lang:'en',
			isPlaceSugSearch:false,
			callback:function(){
				
			}
		};
		const _options = Object.assign({}, defaultOptions, options);
		
		//WGS-84坐標转GCJ-02
		var GCJ02 = coordTrans.gcj_encrypt(_options.lat,_options.lng);
		_options.lat = GCJ02.lat;
		_options.lng = GCJ02.lng;
		
		this.callback = _options.callback;
		this.lat = _options.lat;
		this.lng = _options.lng;
		this.idVal = _options.idVal;
		this.oAddressInput = _options.oAddressInput;
		this.isStillMarker = _options.isStillMarker;
		this.isPlaceSugSearch = _options.isPlaceSugSearch;
		this.lang = _options.lang;
		
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
		this.placeSugSearchMarker = null;//模糊搜索建议列表定义的marker
		/**
		 * 谷歌地图主流国家语言代码
		 * @param code ，谷歌地图对应language标识
		 * @param ServerKey server系统对应的语言标识
		 * @param OSSKey oss系统对应的语言标识
		 */
		this.languageList = [
			{code:'zh-CN',txt:'中文',ServerKey:'cn',OSSKey:'cn',text:'中文'},
			{code:'zh-HK',txt:'中文（香港）' ,ServerKey:'hk',OSSKey:'ft',text:'繁體中文'},
			{code:'ja',txt:'日语',ServerKey:'ja',OSSKey:'',text:'日本語'},
			{code:'en',txt:'英语',ServerKey:'',OSSKey:'en',text:'English'},
			{code:'cs',txt:'捷克语',ServerKey:'jk',OSSKey:'jk',text:'Česky'},
			{code:'da',txt:'丹麦语',ServerKey:'',OSSKey:'',text:''},
			{code:'fi',txt:'芬兰语',ServerKey:'',OSSKey:'',text:''},
			{code:'fr',txt:'法语',ServerKey:'',OSSKey:'',text:''},
			{code:'fil',txt:'菲律宾语',ServerKey:'',OSSKey:'',text:''},
			{code:'ar',txt:'阿拉伯语',ServerKey:'',OSSKey:'',text:''},
			{code:'de',txt:'德语',ServerKey:'gm',OSSKey:'gm',text:'German'},
			{code:'el',txt:'希腊语',ServerKey:'gk',OSSKey:'',text:'Greek'},
			{code:'hu',txt:'匈牙利语',ServerKey:'',OSSKey:'',text:''},
			{code:'it',txt:'意大利语',ServerKey:'it',OSSKey:'it',text:'Italiano'},
			{code:'ko',txt:'韩语',ServerKey:'kr',OSSKey:'',text:'한국어'},
			{code:'no',txt:'挪威语',ServerKey:'',OSSKey:'',text:''},
			{code:'pl',txt:'波兰语',ServerKey:'pl',OSSKey:'pl',text:'Polish'},
			{code:'pt',txt:'葡萄牙语',ServerKey:'pt',OSSKey:'pt',text:'Português'},
			{code:'ru',txt:'俄语',ServerKey:'',OSSKey:'',text:''},
			{code:'es',txt:'西班牙语',ServerKey:'sp',OSSKey:'',text:'Español'},
			{code:'sv',txt:'瑞典语',ServerKey:'',OSSKey:'',text:''},
			{code:'th',txt:'泰语',ServerKey:'th',OSSKey:'',text:'ไทย'},
			{code:'tr',txt:'土耳其语',ServerKey:'tk',OSSKey:'',text:'Türkçe'},
			{code:'vi',txt:'越南语',ServerKey:'vn',OSSKey:'',text:'Vietnamese'},
			{code:'ro',txt:'罗马尼亚语',ServerKey:'lmny',OSSKey:'',text:'Română'},
			{code:'nl',txt:'荷兰语',ServerKey:'ho',OSSKey:'',text:'Nederland'}
		];
		this.drawingManager = null;//地图绘制工具
		if(_options.isModuleLoad){//已加载地图api
			this.renderGoogleMap(this.lat, this.lng, this.idVal,function(){
				//加载标注
				_this.addMarker(_this.isStillMarker);
			})
		}else{
			this.xhbLoadGMap({lat:this.lat,lng:this.lng},this.idVal)
		}
	
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
		// if(lang){
		// 	if(lang == 'cn' || lang == 'ft'){//中文和繁體			
		// 		this.isChina = true;			
		// 	}else{//谷歌
		// 		this.isChina = false;
		// 	} 
		// }else{//默认英文
		// 	this.isChina = false;
		// }	
		// var language = this.isChina ? '&language=zh' : '&language=en';
		var language = '&language='+ this.lang;
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
	 * 指定marker动态创建infoWindow
	 * @param {String} txt 信息窗口内容
	 * @param {Object} marker 标注
	 */
	loadGoogleMap.prototype.createInfoWindow = function(txt,marker){
		
		const infoWindow = new google.maps.InfoWindow();
		infoWindow.setContent(txt);
		infoWindow.open(this.map, marker);
	}
	
	/**
	 * 调用谷歌地图
	 * @param {Number} lat 纬度数字
	 * @param {Number} lng 经度数字
	 * */
	loadGoogleMap.prototype.renderGoogleMap = function(lat, lng, idVal,fn){
		// //console.log("googleMap lat, lng,",lat, lng)
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
			if(this.isPlaceSugSearch){
				this.placeSugSearch(this.oAddressInput,true);
			}else{
				//失去焦点事件
				this.oAddressInput.onblur = function(){
					if(this.value == "") return false;
					//console.log("ssss")
					//获取地理位置信息和更新标注信息
					_this.getGEOInfoByAddr(this.value,function(){
						
					});
				}
			}
			
		}
	
		
		fn && fn();
	}
	
	//选择地图90度
	loadGoogleMap.prototype.rotate90 = function(){
		var _this = this;
		// //console.log(this.map.getTilt(),"this.map.getTilt")
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
	 * @param {Boolean} isMainInput 是否主要input
	 */
	loadGoogleMap.prototype.placeSugSearch = function(dom,isMainInput){
		var _this = this;
		var searchBox = new google.maps.places.SearchBox(dom)
		
		searchBox.addListener("places_changed",function(){
			var places = searchBox.getPlaces();
			
			dom.value = places[0].name;
			dom.setAttribute('place-id',places[0].place_id);
			
			
			var mainPoint = places[0].geometry.location;
			if(isMainInput){
				_this.marker.setPosition(mainPoint);
				_this.infowindow.setContent(places[0].name);
			}else{
				//非主要input使用模糊检索功能
				//删除标注
				if(_this.placeSugSearchMarker) _this.placeSugSearchMarker.setMap(null);
				
				_this.placeSugSearchMarker = _this.diyMarker({
					icon:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
					position: {lat:mainPoint.lat(), lng: mainPoint.lng()},
					title: places[0].name,
					zIndex:100,
				});		
			}
			
			_this.map.setCenter(mainPoint);
			
			
			
		});
		
		
		this.map.addListener("bounds_changed", () => {
		    searchBox.setBounds(this.map.getBounds());
		});
	}
	
	/**
	 * 根据模糊检索搜索到的地点的place_id，查询对应place_id相关地理信息，常和上面定义的placeSugSearch函数联用
	 * @@param {Object} dom 随便一个DOM节点
	 * @@param {String} placeId 地址id
	 * @@param {Function} fn  
	 */
	loadGoogleMap.prototype.getAddrDetailsInfoByPlaceId = function(dom,placeId,fn){
		var service = new google.maps.places.PlacesService(dom);
		service.getDetails({placeId:placeId},function(PlaceResult, PlacesServiceStatus){
			// console.log(PlaceResult, PlacesServiceStatus,"PlaceResult, PlacesServiceStatus")
		   fn && fn(PlaceResult, PlacesServiceStatus)
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
	 * @@return {Object} 返回标注对象
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
			// label:"自定义标注label"
		};
		var opts =  Object.assign({}, defaults, option);
		var m = new google.maps.Marker(opts);
		this.createInfoWindow(opts.title,m);
		return m;
	}
	
	/**
	 * 添加标注
	 * @param {Boolean} mapIsStill 标注是否静态
	 */
	loadGoogleMap.prototype.addMarker = function(mapIsStill,lat,lng){
		
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		style.setAttribute("type","text/css");
		console.log("head",head)
		style.innerHTML = '.gm-ui-hover-effect{display: none !important;}';
		head.appendChild(style);
		
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
		
		//执行回调函数
		this.callback();
	}
	
	/**
	 * 根据经纬度解析出地理位置相关数据
	 * @param {Object} myCenter 经纬度对象
	 */
	loadGoogleMap.prototype.getInfoByLatLng = function(myCenter,fn){
		var _this = this;
		//console.log(myCenter.lat(),myCenter.lng(),"解析位置的时候传参")
		this.geocoder.geocode(
			{
			   latLng: myCenter
			}, 
			function(responses) {
				   if(responses && responses.length > 0) {
										
						var info = getGoogleAllAddr(responses,myCenter);
						
						// var WGS84 = coordTrans.gcj_decrypt(info.lat,info.lng);
						// //console.log(WGS84,"解析位置的时候转化为WGS84")
						_this.lat = myCenter.lat();
						_this.lng = myCenter.lng();
						
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
		function getGoogleAllAddr(aData,myCenter){
			// //console.log(aData,"getGoogleAllAddr")
			var list = [];
			for(var i=0;i<aData.length;i++){
				list.push( aData[i].address_components.length );
			}
			//js 返回數組中值最大的索引 
			var sort = list.indexOf(Math.max(...list));
			
			var _addrssInfo = aData[sort];
			// //console.log(_addrssInfo,"1111111111111111111111")
			// if(_addrssInfo.address_components.length > 1)
			
			var mainAddr = _this.addressComponentsFn(_addrssInfo.address_components);
			// //console.log(_addrssInfo.address_components,"mainmain")
			var obj = {
				lat: myCenter.lat(),
				lng: myCenter.lng(),
				coordinates:myCenter.lat() + ',' + myCenter.lng(),
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
		//WGS-84坐標转GCJ-02
		var GCJ02 = coordTrans.gcj_encrypt(lat,lng);
		lat = GCJ02.lat;
		lng = GCJ02.lng;
		
		var mainPoint = new google.maps.LatLng(lat, lng);
		
		
		this.map.setCenter(mainPoint);
		this.marker.setPosition(mainPoint);
		
		//根据经纬度查
		this.getInfoByLatLng(mainPoint,function(){
			_this.updateMarkerAddress(addr || _this.detailsAddress );
		});
		
		
		
		// this.lat = lat;
		// this.lng = lng;
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
		// console.log(_this.detailsAddress,keyword);
		if(keyword == _this.detailsAddress) return;
			this.geocoder.geocode({ address: keyword })
				  .then((result) => {
					console.log(result,"resultresult")			
					const { results } = result;
						
					_this.map.setCenter(results[0].geometry.location);
					_this.marker.setPosition(results[0].geometry.location);
					
					_this.updateMarkerAddress(keyword);
					
					//重新根据获取的经纬度，更新函数内正确的信息
					// //console.log(results[0].geometry.location.lat(),"lat")
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
		var opts =  Object.assign({}, defaults, option);
		
	   var service = new google.maps.places.PlacesService(this.map);
	   service.nearbySearch(
	       opts,
	       (results, status, pagination) => {
	         if (status !== "OK" || !results){
				 alert("周边没有找到指定类型的地址");
				 return;
			 }
			
	         fn && fn(results);
	       }
	    );
	}
	//获取当前存储的经纬度，返回WGS84体系坐标
	loadGoogleMap.prototype.getCurrCoordByWGS84 = function(lat,lng){
		lat = lat || this.lat;
		lng = lng || this.lng;
		return getWGS84({lat:lat,lng:lng},"google")
	}
	
	//百度（bd-09II），谷歌（GCJ-02）坐标转化 WGS-84体系
	 function getWGS84(latLng,mapType){
		if(mapType == "google"){
			return coordTrans.gcj_decrypt(latLng['lat'],latLng['lng'])
		}else if(mapType == "baidu"){
			var gcj = coordTrans.bd_decrypt(latLng['lat'],latLng['lng']);
			return coordTrans.gcj_decrypt(gcj.lat,gcj.lng);	
		}else{
			return latLng
		}
	}
	
	//暴露主題函數,脚手架開發，使用require引入，需要配置module
	var XHBMap = {
		coordTrans,//坐标体系转化，测距等相关功能集合
		baiduMap,//百度地图控件相关，构造函数
		loadBaiduMap,//加载百度地图主要构造函数
		loadGoogleMap,//加载谷歌地图主要构造函数
		getWGS84,//根据经纬度和地图类型，获取转化成WGS-84的地理坐标
		getLatLogByLocalhost,//获取当前IP对应的wgs-84地理坐标，常规用于地图初始化
		loadScript,//动态加载脚本到页面
		promiseAjax,//promise 异步请求
		jsonp,//jsonp请求
	};
	// 最后将插件对象暴露给全局对象
	_global = (function() {
		return this || (0, eval)('this');
	}());
	if(typeof module !== "undefined" && module.exports) {
		module.exports = XHBMap;
	} else if(typeof define === "function" && define.amd) {
		define(function() {
			return XHBMap;
		});
	} else {
		!('XHBMap' in _global) && (_global.XHBMap = XHBMap);
	}
}());


