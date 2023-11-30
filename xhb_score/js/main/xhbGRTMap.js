const serverGoogleMapKey = "AIzaSyATaepX6-wvfIawz6ZSblNd-Qv7ao3lujo";//server 系统秘钥
const ossGoogleMapKey = "AIzaSyAJZ1r52F_6CqhNX7InHBVk8I247yJB7vM";//OSS 系统秘钥
const atessGoogleMapKey = "AIzaSyAaBd71WKWCbF5Ta4EuCrmTqICWyiJ7-Pg";//atess 充电桩系统
const otherGoogleMapKey = "AIzaSyDTQQAXrXIcPb7H-tkpo2OjfqSHBIll-uM";//其他项目

//固定谷歌百度地图秘钥
const googleMapKey = serverGoogleMapKey;
const baiduMapKey = "96lMxQLD48gcNh7d6LnQZFS5S48GNk8d";//growatt
const gaodeMapKey = "5964d1bc26d0e26f918cf1dbb0728dd0";//高德地图秘钥
const gaodeJsCode = "b65883329b0f0e26aeed95d9f059c62b";//高德的地图安全密钥，和秘钥一起使用

const sanctionCountryList = ['伊朗','叙利亚','Iran','Syria'];
const gaodeNodataText = '高德地图只支持国内使用，查询国外地图数据请使用谷歌地图';
const notSupportText = '暂不支持，请重新选择';
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

    /**
	 * WGS-84 坐标系转 GCJ-02坐标系
	 * @param {Number} wgsLat 纬度
	 * @param {Number} wgsLon 经度
	 * 
	 */
    gcj_encrypt: function (wgsLat, wgsLon) {
        if (this.outOfChina(wgsLat, wgsLon))
            return {'lat': wgsLat, 'lng': wgsLon};

        var d = this.delta(wgsLat, wgsLon);
        return {'lat': wgsLat + d.lat, 'lng': wgsLon + d.lng};
    },
    /**
     * GCJ-02坐标系转 WGS-84 坐标系
     * @param {Number} gcjLat 纬度
     * @param {Number} gcjLon 经度
     */
    gcj_decrypt: function (gcjLat, gcjLon) {
        if (this.outOfChina(gcjLat, gcjLon))
            return {'lat': gcjLat, 'lng': gcjLon};

        var d = this.delta(gcjLat, gcjLon);
        return {'lat': gcjLat - d.lat, 'lng': gcjLon - d.lng};
    },
    //GCJ-02 to WGS-84 exactly
	/**
	 * GCJ-02坐标系转 WGS-84 坐标系 exactly
	 * @param {Number} gcjLat 纬度
	 * @param {Number} gcjLon 经度
	 */
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
        ////////console.log(i);
        return {'lat': wgsLat, 'lng': wgsLon};
    },
    //GCJ-02 to BD-09
	/**
	 * GCJ-02坐标系转 BD-09 坐标系 
	 * @param {Number} gcjLat 纬度
	 * @param {Number} gcjLon 经度
	 */
    bd_encrypt: function (gcjLat, gcjLon) {
        var x = gcjLon, y = gcjLat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
        var bdLon = z * Math.cos(theta) + 0.0065;
        var bdLat = z * Math.sin(theta) + 0.006;
        return {'lat': bdLat, 'lng': bdLon};
    },
    //BD-09 to GCJ-02
	/**
	 * BD-09坐标系转 GCJ-02 坐标系 
	 * @param {Number} gcjLat 纬度
	 * @param {Number} gcjLon 经度
	 */
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
	/**
	 * WGS-84 坐标系转 墨卡托 坐标系 
	 * @param {Number} wgsLat 纬度
	 * @param {Number} wgsLon 经度
	 */
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
	/**
	 *  墨卡托坐标系转 WGS-84 坐标系 
	 * @param {Number} mercatorLat 纬度
	 * @param {Number} mercatorLon 经度
	 */
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
        if (lon < 72.004 || lon > 137.8347){
			return true;
		}            
        if (lat < 0.8293 || lat > 55.8271){
			 return true;
		}        
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
    },
	/**
	 * 百度（bd-09II），谷歌（GCJ-02）坐标转化 WGS-84体系
	 * @param {Object} latLng 经纬度对象,百度地图为bd-09II体系，谷歌地图为GCJ-02体系
	 * @param {String} mapType 地图类型（google，baidu）
	 * @@return {Object} 返回WGS-84体系经纬度
	 */
	getWGS84:function(latLng,mapType){
		if(mapType == "google" || mapType == "gaode" || mapType == 'Tencent'){
			return this.gcj_decrypt(latLng['lat'],latLng['lng'])
		}else if(mapType == "baidu"){
			var gcj = this.bd_decrypt(latLng['lat'],latLng['lng']);
			return this.gcj_decrypt(gcj.lat,gcj.lng);	
		}else{
			return latLng
		}
	}
};

//创建中国地图边界线数组
function CreateChinaMapLine() {
    var pts = [];
    pt1 = new BMap.Point(124.326919, 39.841287);
    pts.push(pt1);
    pt2 = new BMap.Point(124.630475, 40.230192);
    pts.push(pt2);
    pt3 = new BMap.Point(124.980023, 40.420289);
    pts.push(pt3);
    pt4 = new BMap.Point(125.053612, 40.458947);
    pts.push(pt4);
    pt5 = new BMap.Point(125.028316, 40.520401);
    pts.push(pt5);
    pt6 = new BMap.Point(125.331871, 40.63438);
    pts.push(pt6);
    pt7 = new BMap.Point(125.456053, 40.61861);
    pts.push(pt7);
    pt8 = new BMap.Point(126.042467, 40.901897);
    pts.push(pt8);
    pt9 = new BMap.Point(126.888743, 41.73411);
    pts.push(pt9);
    pt10 = new BMap.Point(127.367072, 41.437131);

    pts.push(pt10);
    pt11 = new BMap.Point(128.148958, 41.347076);
    pts.push(pt11);
    pt12 = new BMap.Point(128.323732, 41.568524);
    pts.push(pt12);
    pt13 = new BMap.Point(128.112163, 41.961089);
    pts.push(pt13);
    pt14 = new BMap.Point(128.995233, 41.99541);
    pts.push(pt14);
    pt15 = new BMap.Point(129.418371, 42.378521);
    pts.push(pt15);
    pt16 = new BMap.Point(129.841509, 42.41943);
    pts.push(pt16);
    pt17 = new BMap.Point(130.080674, 42.90824);
    pts.push(pt17);
    pt18 = new BMap.Point(130.65099, 42.364879);
    pts.push(pt18);
    pt19 = new BMap.Point(130.503812, 42.637157);
    pts.push(pt19);
    pt20 = new BMap.Point(131.147717, 42.867653);
    pts.push(pt20);

    pt21 = new BMap.Point(131.313293, 43.366337);
    pts.push(pt21);
    pt22 = new BMap.Point(131.386882, 43.967324);
    pts.push(pt22);
    pt23 = new BMap.Point(131.202909, 44.798523);
    pts.push(pt23);
    pt24 = new BMap.Point(131.938801, 45.190155);
    pts.push(pt24);
    pt25 = new BMap.Point(133.024241, 44.916296);
    pts.push(pt25);
    pt26 = new BMap.Point(134.385641, 47.183241);
    pts.push(pt26);
    pt27 = new BMap.Point(134.845574, 47.670159);
    pts.push(pt27);
    pt28 = new BMap.Point(134.73519, 48.066299);
    pts.push(pt28);
    pt29 = new BMap.Point(135.250314, 48.434915);
    pts.push(pt29);
    pt30 = new BMap.Point(133.079433, 48.115602);
    pts.push(pt30);

    pt31 = new BMap.Point(132.453925, 47.76948);
    pts.push(pt31);
    pt32 = new BMap.Point(131.221306, 47.707427);
    pts.push(pt32);
    pt33 = new BMap.Point(130.85336, 48.078629);
    pts.push(pt33);
    pt34 = new BMap.Point(130.908552, 48.825163);
    pts.push(pt34);
    pt35 = new BMap.Point(128.093766, 49.632427);
    pts.push(pt35);
    pt36 = new BMap.Point(125.830898, 53.063643);
    pts.push(pt36);
    pt37 = new BMap.Point(123.420852, 53.60326);
    pts.push(pt37);
    pt38 = new BMap.Point(120.661258, 53.240599);
    pts.push(pt38);
    pt39 = new BMap.Point(119.906969, 52.584436);
    pts.push(pt39);
    pt40 = new BMap.Point(120.698052, 52.494695);
    pts.push(pt40);

    pt41 = new BMap.Point(120.734847, 52.05456);
    pts.push(pt41);
    pt42 = new BMap.Point(119.023898, 50.296998);
    pts.push(pt42);
    pt43 = new BMap.Point(119.263063, 50.143545);
    pts.push(pt43);
    pt44 = new BMap.Point(117.956855, 49.560675);
    pts.push(pt44);
    pt45 = new BMap.Point(116.889812, 49.858941);
    pts.push(pt45);
    pt46 = new BMap.Point(115.47322, 48.078629);
    pts.push(pt46);
    pt47 = new BMap.Point(115.988344, 47.607987);
    pts.push(pt47);
    pt48 = new BMap.Point(116.797825, 47.76948);
    pts.push(pt48);
    pt49 = new BMap.Point(117.349744, 47.520821);
    pts.push(pt49);
    pt50 = new BMap.Point(117.901663, 47.905734);
    pts.push(pt50);

    pt51 = new BMap.Point(118.508774, 47.893363);
    pts.push(pt51);
    pt52 = new BMap.Point(118.545569, 47.86861);
    pts.push(pt52);
    pt53 = new BMap.Point(119.888571, 46.843488);
    pts.push(pt53);
    pt54 = new BMap.Point(119.796585, 46.590415);
    pts.push(pt54);
    pt55 = new BMap.Point(119.005501, 46.717101);
    pts.push(pt55);
    pt56 = new BMap.Point(117.791279, 46.526961);
    pts.push(pt56);
    pt57 = new BMap.Point(117.404936, 46.310656);
    pts.push(pt57);
    pt58 = new BMap.Point(116.797825, 46.323404);
    pts.push(pt58);
    pt59 = new BMap.Point(116.282701, 45.798295);
    pts.push(pt59);
    pt60 = new BMap.Point(114.700534, 45.384961);
    pts.push(pt60);

    pt61 = new BMap.Point(113.670285, 44.759212);
    pts.push(pt61);
    pt62 = new BMap.Point(112.161707, 45.04687);
    pts.push(pt62);
    pt63 = new BMap.Point(111.444212, 44.298587);
    pts.push(pt63);
    pt64 = new BMap.Point(111.959336, 43.767669);
    pts.push(pt64);
    pt65 = new BMap.Point(110.082812, 42.569199);
    pts.push(pt65);
    pt66 = new BMap.Point(107.543985, 42.39216);
    pts.push(pt66);
    pt67 = new BMap.Point(105.115542, 41.609961);
    pts.push(pt67);
    pt68 = new BMap.Point(100.405834, 42.596391);
    pts.push(pt68);
    pt69 = new BMap.Point(96.560799, 42.772848);
    pts.push(pt69);
    pt70 = new BMap.Point(91.188788, 45.203163);
    pts.push(pt70);

    pt71 = new BMap.Point(89.992964, 47.893363);
    pts.push(pt71);
    pt72 = new BMap.Point(87.969261, 49.115857);
    pts.push(pt72);
    pt73 = new BMap.Point(86.847026, 49.055436);
    pts.push(pt73);
    pt74 = new BMap.Point(85.724791, 48.201769);
    pts.push(pt74);
    pt75 = new BMap.Point(85.301653, 47.05766);
    pts.push(pt75);
    pt76 = new BMap.Point(83.167567, 47.23339);
    pts.push(pt76);
    pt77 = new BMap.Point(82.284497, 45.52739);
    pts.push(pt77);
    pt78 = new BMap.Point(82.652442, 45.177144);
    pts.push(pt78);
    pt79 = new BMap.Point(81.769372, 45.346053);
    pts.push(pt79);
    pt80 = new BMap.Point(79.911245, 44.890145);
    pts.push(pt80);

    pt81 = new BMap.Point(80.702329, 43.20505);
    pts.push(pt81);
    pt82 = new BMap.Point(80.003232, 42.077702);
    pts.push(pt82);
    pt83 = new BMap.Point(77.096459, 41.05527);
    pts.push(pt83);
    pt84 = new BMap.Point(76.158197, 40.369298);
    pts.push(pt84);
    pt85 = new BMap.Point(75.753456, 40.594072);
    pts.push(pt85);
    pt86 = new BMap.Point(74.925578, 40.48178);
    pts.push(pt86);
    pt87 = new BMap.Point(73.803343, 39.605094);
    pts.push(pt87);
    pt88 = new BMap.Point(73.637767, 39.291284);
    pts.push(pt88);
    pt89 = new BMap.Point(73.913726, 38.457149);
    pts.push(pt89);
    pt90 = new BMap.Point(74.612824, 38.500536);
    pts.push(pt90);

    pt91 = new BMap.Point(74.999167, 37.31988);
    pts.push(pt91);
    pt92 = new BMap.Point(77.924337, 35.325072);
    pts.push(pt92);
    pt93 = new BMap.Point(78.273886, 34.598061);
    pts.push(pt93);
    pt94 = new BMap.Point(79.101764, 34.293224);
    pts.push(pt94);
    pt95 = new BMap.Point(78.770613, 33.987267);
    pts.push(pt95);
    pt96 = new BMap.Point(79.230545, 32.472038);
    pts.push(pt96);
    pt97 = new BMap.Point(78.880997, 32.59672);
    pts.push(pt97);
    pt98 = new BMap.Point(78.421064, 32.425237);
    pts.push(pt98);
    pt99 = new BMap.Point(78.844202, 31.18404);
    pts.push(pt99);
    pt100 = new BMap.Point(81.180659, 29.990271);
    pts.push(pt100);

    pt101 = new BMap.Point(81.71418, 30.34198);
    pts.push(pt101);
    pt102 = new BMap.Point(86.092737, 27.935542);
    pts.push(pt102);
    pt103 = new BMap.Point(88.760345, 27.951881);
    pts.push(pt103);
    pt104 = new BMap.Point(88.99951, 27.197728);
    pts.push(pt104);
    pt105 = new BMap.Point(89.845786, 28.098817);
    pts.push(pt105);
    pt106 = new BMap.Point(91.538337, 27.772017);
    pts.push(pt106);
    pt107 = new BMap.Point(92.108653, 26.769165);
    pts.push(pt107);
    pt108 = new BMap.Point(93.893191, 26.851709);
    pts.push(pt108);
    pt109 = new BMap.Point(95.916893, 28.115131);
    pts.push(pt109);
    pt110 = new BMap.Point(97.223102, 27.690161);
    pts.push(pt110);

    pt111 = new BMap.Point(97.609445, 28.375809);
    pts.push(pt111);
    pt112 = new BMap.Point(98.363734, 27.427807);
    pts.push(pt112);
    pt113 = new BMap.Point(98.73168, 26.653501);
    pts.push(pt113);
    pt114 = new BMap.Point(97.646239, 24.702995);
    pts.push(pt114);
    pt115 = new BMap.Point(97.627842, 23.842845);
    pts.push(pt115);
    pt116 = new BMap.Point(98.658091, 23.944344);
    pts.push(pt116);
    pt117 = new BMap.Point(98.970845, 23.045009);
    pts.push(pt117);
    pt118 = new BMap.Point(99.449174, 22.89168);
    pts.push(pt118);
    pt119 = new BMap.Point(99.21001, 21.96805);
    pts.push(pt119);
    pt120 = new BMap.Point(99.982696, 21.933723);
    pts.push(pt120);

    pt121 = new BMap.Point(100.166669, 21.366121);
    pts.push(pt121);
    pt122 = new BMap.Point(101.086534, 21.589991);
    pts.push(pt122);
    pt123 = new BMap.Point(101.730439, 21.055576);
    pts.push(pt123);
    pt124 = new BMap.Point(101.969604, 21.31441);
    pts.push(pt124);
    pt125 = new BMap.Point(101.804028, 22.190972);
    pts.push(pt125);
    pt126 = new BMap.Point(102.53992, 22.53323);
    pts.push(pt126);
    pt127 = new BMap.Point(103.956512, 22.447745);
    pts.push(pt127);
    pt128 = new BMap.Point(105.465091, 23.130116);
    pts.push(pt128);
    pt129 = new BMap.Point(107.819945, 21.435041);
    pts.push(pt129);
    pt130 = new BMap.Point(108.408658, 20.588528);
    pts.push(pt130);

    pt131 = new BMap.Point(108.243082, 17.791978);
    pts.push(pt131);
    pt132 = new BMap.Point(110.101209, 14.556493);
    pts.push(pt132);
    pt133 = new BMap.Point(109.82525, 10.162358);
    pts.push(pt133);
    pt134 = new BMap.Point(108.151096, 6.074665);
    pts.push(pt134);
    pt135 = new BMap.Point(109.604482, 3.416913);
    pts.push(pt135);
    pt136 = new BMap.Point(113.136763, 3.712694);
    pts.push(pt136);
    pt137 = new BMap.Point(115.362836, 6.737258);
    pts.push(pt137);
    pt138 = new BMap.Point(117.404936, 9.505473);
    pts.push(pt138);
    pt139 = new BMap.Point(119.318255, 14.574413);
    pts.push(pt139);
    pt140 = new BMap.Point(120.164531, 19.12633);
    pts.push(pt140);

    pt141 = new BMap.Point(122.059452, 21.693198);
    pts.push(pt141);
    pt142 = new BMap.Point(122.813741, 24.686186);
    pts.push(pt142);
    pt143 = new BMap.Point(124.230333, 28.457139);
    pts.push(pt143);
    pt144 = new BMap.Point(124.855841, 32.721228);
    pts.push(pt144);
    pt145 = new BMap.Point(124.230333, 36.56674);
    pts.push(pt145);
    pt146 = new BMap.Point(124.487895, 39.59086);
    pts.push(pt146);

    return pts;
}

/**
 * 百度地图 web server服务--地理编码解析，根据经纬度和对应类型，获取对应数据
 * @param {Object} option 
 * @param {String} option[coordtype] 坐标的类型，目前支持的坐标类型包括：bd09ll（百度经纬度坐标）、bd09mc（百度米制坐标）、gcj02ll（国测局经纬度坐标，仅限中国）、wgs84ll（ GPS经纬度） 坐标系说明
 * @param {String} option[output] 输出格式为json或者xml
 * @param {Object} option[location] 根据经纬度坐标获取地址 ,纬度+经度{lat,lng}
 */
function getLatLngInfoByBDWebServer(option,fn){
	option.location = option.location.lat + ',' + option.location.lng;
	var defaults = {
		ak:"zkUzSPYaHb7Uhr5ofn32GuPrSCZGjbnW",
		output:"json",
		coordtype:"wgs84ll",
		location:'',//lat+','+lng
	};
	var opts =  Object.assign({}, defaults, option);
	//console.log(opts,"opts")
	jsonp({
		url:"https://api.map.baidu.com/reverse_geocoding/v3",
		data:opts,
		success:function(res){
			//console.log(res)
			fn && fn(res.result);			
		}
	});
}

/**
 * 高德地图 web server服务--地理编码解析，根据经纬度和对应类型，获取对应数据
 * @param {Object} option 
 * @param {String} option[coordtype] 坐标的类型，目前支持的坐标类型包括：bd09ll（百度经纬度坐标）、bd09mc（百度米制坐标）、gcj02ll（国测局经纬度坐标，仅限中国）、wgs84ll（ GPS经纬度） 坐标系说明
 * @param {String} option[output] 输出格式为json或者xml
 * @param {Object} option[location] 根据经纬度坐标获取地址 ,纬度+经度{lat,lng}
 */
function getLatLngInfoByGDWebServer(option,fn){
	option.location = option.location.lng + ',' + option.location.lat;
	var defaults = {
		key:"74534047360c79e9a712cf1590fed66b",
		output:"json",
		// coordtype:"wgs84ll",
		location:'',//lat+','+lng
	};
	var opts =  Object.assign({}, defaults, option);
	jsonp({
		url:"https://restapi.amap.com/v3/geocode/regeo",
		data:opts,
		success:function(res){
			//console.log(res)
			if(res.regeocode.addressComponent.country.length === 0){//境外数据，无法查询			
				res.info = 'error';
			}
			fn && fn(res);			
		}
	});
}


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
        ////console.log(function_name);
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
						//////console.log(e,k,m);
					}
				},
				{
					text:"删除",
					callback:function(e,k,m){
						map.removeOverlay(m);
						//////console.log("del");
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
	 * @param {String} options.mapKey 默认地图key  YZGqwefkjNGUhGSmBkkARKy8FXzXz0Bq
	 * */
	 function loadBaiduMap(options){
		var _this = this;
		var defaultOptions = {
			lat:22.581783,
			lng:113.962135,
			idVal:"baiduMap",
			oAddressInput:false,
			isStillMarker:false,
			isModuleLoad:false,
			isPlaceSugSearch:false,
			mapKey:baiduMapKey,
			callback:function(){
				
			}
		};
		const _options = Object.assign({}, defaultOptions, options);
		
		//初次经纬度和地址
		this.firstLat = _options.lat;
		this.firstLng = _options.lng;
		this.firstAddr = '';
		
		this.callback = _options.callback;
		this.lat = _options.lat;
		this.lng = _options.lng;
		
		
		
		this.mapKey = _options.mapKey;
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
		this.oAutocomplete = null;//百度地图结果提示、自动完成类
		this.placeSugSearchMarker = null;//模糊搜索建议列表定义的marker
		
		//标注聚合器对象
		this.markerClusterer = null;
		this.clustererMarkerList = [];//标注聚合器所存储marker的数组
		
		//初始化百度地图搜索控件
		this.localSearch = null;
		this.BMapLib = null;//百度判断是否中国插件对象
		
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
		
		var scriptArr = [location.protocol+'//api.map.baidu.com/getscript?v=2.0&ak='+ this.mapKey +'&services=&t='+tt];
		
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
				_this.firstAddr = _this.detailsAddress;				
			});
			
		
			//监听标注拖拽
			_this.marker.addEventListener("dragend", function(e) { //拖动事件
			
				var pt = e.point;
				_this.map.centerAndZoom(pt,17); //定中心
				var that = this;
				//地址解析
				_this.getInfoByLatLng(pt, function(rs){
					
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
					var val = this.value;
					if(val == "") return false;
					////console.log("ssss")
					//获取地理位置信息和更新标注信息
					_this.sanctionCountry(val,function(b){
						////console.log(b,"bbbbbbb")
						if(!b){
							//获取地理位置信息和更新标注信息
							_this.localSearchFn(val,function(){
								
							});
						}
					});
					
				}
			}
			
		}
		
		fn && fn();
	}
	
	//更新标注的label
	loadBaiduMap.prototype.updateMarkerLabelContent = function(text){
		var _this = this;
		if(text) _this.detailsAddress = text;
		if(_this.marker.getLabel()){
			_this.marker.getLabel().setContent(_this.detailsAddress);
		}
		else{
			_this.marker.setLabel(_this._setLabel(_this.detailsAddress));
		}
		if(_this.oAddressInput){
			_this.oAddressInput.value = _this.detailsAddress;
		}
		if(this.oAutocomplete) this.oAutocomplete.hide();
	}
	
	//使用百度地图聚合器之前需引用其他插件
	loadBaiduMap.prototype.initMarkerClusterer = function(locations,titles,clickCallback,MC){
		var _this = this;
		loadScript(['https://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js'],0, function () {
			_this.initMarkerClusterer2(locations,titles,clickCallback,MC);
		});
	}
	/**
	 * 设置多个标注聚合功能
	 * @param {Array} locations marker数组对象，其内包含对象经度纬度如：{ lat: -31.56391, lng: 147.154312 }
	 * @param {Array} titles  locations点对应的各个label标题，用信息窗口弹出展示
	 * @param {Function} clickCallback 点击标注回调函数 参数返回索引，事件对象，以及marker标注
	 * @param {Object} MC 模块化引入js脚本 
	 * */
	loadBaiduMap.prototype.initMarkerClusterer2 = function(locations,titles,clickCallback,MC){
		var _this = this;
		this.coordinateTrans(
			locations,
			1,5,
			function(arr){
				const markers = arr.map(function(position, i){			
					
					//添加标注
					const marker = _this.mapControl.createMarker({
						lng: position.lng,
						lat: position.lat
					});
					marker.setLabel( _this._setLabel(titles[i]) );
					
					marker.addEventListener("click", (a,b) => {
						clickCallback && clickCallback(i,a,marker)
						// marker.setLabel( _this._setLabel(titles[i]) );
					});
					
					_this.clustererMarkerList.push( marker );
					return marker;
				});
				
				
			
				const point = new BMap.Point(arr[0].lng, arr[0].lat);
				
				_this.map.centerAndZoom(point,2); //定中心
				
				if(window.BMapLib){
					_this.markerClusterer = new BMapLib.MarkerClusterer(
						_this.map, 
						{
							markers: markers,
							// 最小的聚合数量，小于该数量的不能成为一个聚合，默认为2
							minClusterSize: 2,
							// styles: [{
							// 	url: 'https://cdn.growatt.com/shinephone-miniprogram/web/device-storage-SPF.png',
							// 	size: new BMap.Size(42, 42)
							// }]
						}
					
					);
					// return this.markerClusterer;
				}
				else{
					if(MC){
						_this.markerClusterer = new MC.MarkerClusterer(
							_this.map, 
							{
								markers: markers,
								// 最小的聚合数量，小于该数量的不能成为一个聚合，默认为2
								minClusterSize: 2,
								// styles: [{
								// 	url: 'https://cdn.growatt.com/shinephone-miniprogram/web/device-storage-SPF.png',
								// 	size: new BMap.Size(42, 42)
								// }]
							}
					
						);
						// return this.markerClusterer;
					}else{
						alert("请引入百度地图标注聚合功能插件脚本才能使用标注聚合功能");
					}
				}
				
			}
		);
	
	}
	
	/**
	 * 动态添加多个标注到原本标注器之中
	 * @param {Array} locations marker数组对象，其内包含对象经度纬度如：{ lat: -31.56391, lng: 147.154312 }
	 * @param {Array} titles  locations点对应的各个label标题，用信息窗口弹出展示
	 * @param {Function} clickCallback 点击标注回调函数
	 * */
	loadBaiduMap.prototype.addMarkerClusterer = function(locations,titles,clickCallback){
		if(!this.markerClusterer){
			return alert("请先使用 initMarkerClusterer 函数初始化标注聚合器功能");
		}
		var _this = this;
		this.coordinateTrans(
			locations,
			1,5,
			function(arr){
				const markers = arr.map(function(position, i){
					//添加标注
					const marker = _this.mapControl.createMarker({
						lng: position.lng,
						lat: position.lat
					});
					marker.setLabel( _this._setLabel(titles[i]) );
					
					marker.addEventListener("click", (a,b) => {
						clickCallback && clickCallback(i,a)
						// marker.setLabel( _this._setLabel(titles[i]) );
					});
					
					_this.clustererMarkerList.push( marker );
					return marker;
				});
				_this.markerClusterer.addMarkers(markers);
				
				const point = new BMap.Point(arr[0].lng, arr[0].lat);
				
				_this.map.centerAndZoom(point,2); //定中心
			}
		);
		
	}
	
	
	/**
	 * 动态更新聚合器内标注信息（先清空，再重建）
	 * @param {Array} locations marker数组对象，其内包含对象经度纬度如：{ lat: -31.56391, lng: 147.154312 }
	 * @param {Array} titles  locations点对应的各个label标题，用信息窗口弹出展示
	 * @param {Function} clickCallback 点击标注回调函数
	 * */
	loadBaiduMap.prototype.updateMarkerClusterer = function(locations,titles,clickCallback){
		this.markerClusterer.clearMarkers();
		this.clustererMarkerList = [];
		this.addMarkerClusterer(locations,titles,clickCallback);
	}
	
	//根据sort索引，删除聚合器存储的某一个marker
	loadBaiduMap.prototype.delMarkerClusterer = function(sort){	
		if(this.clustererMarkerList.length && this.markerClusterer){
			this.markerClusterer.removeMarker(this.clustererMarkerList[sort]);
			this.clustererMarkerList.splice(sort,1);
		} 
		
	}
	
	
	
	//根据关键词查询地理位置信息
	loadBaiduMap.prototype.localSearchFn = function(keyword){
		if(keyword == this.detailsAddress) return;
		var _this = this;
		// this.getPoint(keyword,function(searchResult){
		// 	console.log("searchResult",searchResult);
		// 	var point = new BMap.Point(searchResult.lnglat.lng,searchResult.lnglat.lat);
		// 	_this.getInfoByLatLng(point,function(){
		// 		_this.updateMarkerLabelContent(keyword);
		// 	});
		// });
		this.localSearch.setSearchCompleteCallback(function (searchResult) {
			
			var poi = searchResult.getPoi(0);			
			// console.log(keyword,searchResult,"searchResult",poi)
			
			// _this.marker.setPosition(poi.point);
			// _this.map.centerAndZoom(poi.point, 17); //定中心
					
			// _this.marker.getLabel().setContent(keyword);
			
			//根据获取到的经纬度重新更新信息
			_this.getInfoByLatLng(poi.point,function(){
				_this.updateMarkerLabelContent(keyword);
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
		//console.log("百度.........",myCenter,myCenter.lat)
		this.geocoder.getLocation(myCenter, function(rs,d) {
			if(!rs && !d){
				return _this.getInfoByLatLng(myCenter,fn);
			}
			//console.log(rs,d,"dddd")
			//制裁国家方法
			_this.sanctionCountry(rs.address,function(b){
				if(b) return;
				var addComp = rs.addressComponents;
				_this.city = addComp.city;//主要城市
				
				
				_this.provice = addComp.province;//省
				_this.detailsAddress = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
				
				
				//根据经纬度和详细地址,设置国家和详情地址
				var b = _this.setChinaAreaByLnglat(
					myCenter,_this.detailsAddress
				);
				_this.lat = myCenter.lat;
				_this.lng = myCenter.lng;
				
				_this.map.centerAndZoom(myCenter,17);
				_this.marker.setPosition(myCenter);
				_this.updateMarkerLabelContent(_this.detailsAddress);
			
				fn(rs);
				
			});
			
			
		});
		
	}
	
	//根据经纬度和详细地址,设置国家和详情地址
	loadBaiduMap.prototype.setChinaAreaByLnglat = function(lnglat,address){
		var _this = this;
		var isChina = this.isBaiduPointOnChina(lnglat.lng,lnglat.lat);
		_this.country = isChina ? '中国' : "";
		if(address == ""){
			_this.detailsAddress = isChina ? '中国境内' : "未知区域";
		} 
		return isChina
	}
	
	
	/**
	 * 动态更新主要标注位置和窗口信息，经纬度必须是WGS84坐标体系
	 * @param {String} addr 设置的地址信息
	 * @param {Number} lat 纬度
	 * @param {Number} lng 经度
	 */
	loadBaiduMap.prototype.updateMarkerWindow = function(addr, lat, lng){
		var _this = this;	
		if(!this.marker || !this.geocoder){
			window.updateMarkerWindow_fn_timer = setTimeout(function(){
				_this.updateMarkerWindow(addr, lat, lng);
			},1000);			
		}
		else{
			window.clearTimeout(window.updateMarkerWindow_fn_timer);
			_this.lat = lat;
			_this.lng = lng;
					
			this.mapControl.transfrom(lng, lat, function(p) {
				
				var oPoint = new BMap.Point(p.lng, p.lat);
				
				
				//根据经纬度解析出地理位置相关数据
				_this.getInfoByLatLng(oPoint,function(rs){
					_this.updateMarkerLabelContent(addr || _this.detailsAddress);
					
				});
			});		
		}
			
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
		var imgUrl = 'https://api.map.baidu.com/staticimage/v2?ak=' + this.mapKey + '&center=' + lng + ',' + lat + '&width=1000&height=1000&zoom=17';
		return imgUrl;
	}
	
	/**
	 * 制裁国家方法
	 * @param {String} data 包含制裁国家的字段
	 */
	loadBaiduMap.prototype.sanctionCountry = function(data,fn){
		
		var _this = this;
		var hasSanction = false;
		for(var i=0;i<sanctionCountryList.length;i++){
			if(data.indexOf(sanctionCountryList[i]) >= 0){
				hasSanction = true;
			}	
		}
		
		if(hasSanction){
			//获取关键字的位置
			this.getLnglatByAddress(data,function(result){				
				if (result.info == 'OK') {
				  // result中对应详细地理坐标信息
					var lnglat = result.lnglat;
					var isChina = _this.isBaiduPointOnChina(lnglat.lng,lnglat.lat);
					// var isOutOfChina = coordTrans.outOfChina(lnglat.lat,lnglat.lng);
					
					if(!isChina){//制裁国家为外国					
						_this.updateMarkerWindow(_this.firstAddr,_this.firstLat,_this.firstLng);
						if(window.layer){				
							layer.msg(notSupportText);
						}else{
							alert(notSupportText)
						}	
						
					}
					fn && fn(!isChina);										
				}
				else{
					console.error('地址解析失败');
					fn && fn(false);
				}
			});
		}
		else{
			fn && fn(false);
		}
		
	}
	
	//根据关键字查询位置经纬度
	loadBaiduMap.prototype.getLnglatByAddress = function(keyword,fn){
		//console.log("要查询的字段：" + keyword)
		var _this = this;
		
		
		this.localSearch.search(keyword);
		this.localSearch.setSearchCompleteCallback(function (searchResult,p) {
			
			// window.LocalSearch = searchResult;
			var poi = searchResult.getPoi(0);		
			// var poi = searchResult.getPoi(p);		
			
			if(poi && poi.point){
				var result = {lnglat:poi.point,info:"OK"};
			}else{
				var result = {lnglat:poi,info:"error"};
			}
			fn && fn( result );
			
		});
		
	}
	

	/**
	 * 地点输入提示服务
	 * @param {Object} options 要模糊查询的地点 {query[关键字],region[限制城市],tag,city_limit[是否限制在region区域中寻找],output[输出格式，默认json]}
	 * @param {String} options[query] 关键字
	 * @param {String} options[region] 限制城市
	 * @param {Boolean} options[city_limit] 是否限制在region区域中寻找
	 * @param {String} options[output] 输出格式，默认json
	 * @param {Function} fn 回调函数，参数是查询结果
	 */
	loadBaiduMap.prototype.getPlaceSuggestionList = function(options,fn){
		var _this = this;
		
		var defaultOptions = {
			// ak: this.mapKey,
			ak:'zkUzSPYaHb7Uhr5ofn32GuPrSCZGjbnW',
			query:'',
			region:'',
			city_limit:false,//是否限制在region区域中寻找
			output:'json'
		};
		const _options = Object.assign({}, defaultOptions, options);
		
		jsonp({
			url:"https://api.map.baidu.com/place/v2/suggestion",
			data:_options,
			success:function(res){
				fn && fn(res);
				////console.log("jsonp",res)
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
	    if(window.baiduMap_searchByKey_loadCount === undefined) window.baiduMap_searchByKey_loadCount = 0;
		if(this.oAutocomplete) this.oAutocomplete.hide();
		//////console.log(thisValue,centerPoint,"thisValue,centerPoint")
		var thisDistrict = thisValue.district;
		var thisStreet = thisValue.street;
		var thisStreetNumber = thisValue.streetNumber;
		var thisBusiness = thisValue.business;
		//更新主要信息1
		_this.provice = thisValue.province;
		_this.city = thisValue.city;
		// _this.detailsAddress = _this.provice + _this.city + thisDistrict + thisStreet + thisStreetNumber + thisBusiness;
		
	   var localSearch = new BMap.LocalSearch(map);
		// 启用根据结果自动调整地图层级，当指定了搜索结果所展现的地图时有效
	   localSearch.enableAutoViewport();
	   localSearch.search(thisValue.business);
	  //console.log(thisValue.business,"thisValue.business")
	   localSearch.setSearchCompleteCallback(function (searchResult) {
		   // //console.log(searchResult,"searchResult")
		   if(searchResult && searchResult.getPoi(0)){
			   var poi = searchResult.getPoi(0);
			   if(poi.point){
				  var isChina = _this.isBaiduPointOnChina(poi.point.lng,poi.point.lat);
				  var title = (poi.address == poi.title) ? '' : "【"+ poi.title +"】";
				  _this.detailsAddress = title + poi.address;
				  if(!isChina){
					  _this.sanctionCountry(_this.detailsAddress,function(b){
						  if(!b) resultToDo();
					  });
				  }
				  else{
					  resultToDo();
				  } 
				   //最终更新关键数据
				   function resultToDo(){
					   map.centerAndZoom(poi.point,17);
					   centerPoint.setPosition(poi.point);	
					   
					   //根据经纬度和详细地址获取是否中国区域
					   var bb = _this.setChinaAreaByLnglat(poi.point,_this.detailsAddress);
					 
					   _this.lat = poi.point.lat;
					   _this.lng = poi.point.lng;
					   
					   if(_this.oAddressInput){
					   	_this.oAddressInput.value = _this.detailsAddress;
					   }
					    if(_this.oAutocomplete) _this.oAutocomplete.hide();
					   centerPoint.getLabel().setContent(_this.detailsAddress);
					   			
					   window.baiduMap_searchByKey = null;
					   window.clearTimeout(window.baiduMap_searchByKey);
					   _this.map.enableDragging();
					   _this.marker.enableDragging();
					   _this.oAddressInput.removeAttribute('disabled');
				   }
				  
				   
			   }
			   
		   }
		   else{
			   // //console.log(searchResult,"searchResult")
			   _this.oAddressInput.value = '百度地图搜索关键字位置中，请勿操作......';
			    if(_this.oAutocomplete) _this.oAutocomplete.hide();
			   _this.map.disableDragging();
			   _this.marker.disableDragging();
			   _this.oAddressInput.setAttribute("disabled","disabled");
			   
			  window.baiduMap_searchByKey_loadCount++;
			  if(window.baiduMap_searchByKey_loadCount === 3){
				  window.baiduMap_searchByKey_loadCount = 0;
				  window.baiduMap_searchByKey = null;
				  window.clearTimeout(window.baiduMap_searchByKey);
				  
				  //web 服务查询中
				  _this.getPlaceSuggestionList(
				  // _this.searchDataByTag(
					{query:thisValue.business,city_limit:true,region:thisValue.city},
					function(res){
						_this.map.enableDragging();
						_this.marker.enableDragging();
						_this.oAddressInput.removeAttribute('disabled');
						
					  // //console.log("web 服务查询",res)
					  var r = res.results || res.result;
					  if(r.length){
						  var point = new BMap.Point(r[0].location.lng, r[0].location.lat);
						  _this.getInfoByLatLng(point,function(addr){
							  _this.updateMarkerLabelContent(r[0].address);
						  });
					  }else{
						  console.error("无法精准定位,请使用百度地图web 服务进行查询，查询字段:"+ thisValue.business,res);
						  _this.oAddressInput.value = _this.detailsAddress;
					  }
					  if(_this.oAutocomplete) _this.oAutocomplete.hide();
				  });
				  return;
			  }
			 
			   //百度地图精准定位不到
			   window.baiduMap_searchByKey = window.setTimeout(function(){
				   _this.searchByKey(map,thisValue,centerPoint);
				   
			   },500);
		   }
	   });
	}
	
	//
	
	//根据关键字返回对应经纬度对象
	loadBaiduMap.prototype.getPoint = function(keyword,fn){
		this.geocoder.getPoint(keyword,function(p){
			if(p){
				var result = {lnglat:p,info:"OK"};
			}else{
				var result = {info:"error"};
			}
			//console.log("pp",p,keyword);
			fn && fn( result );
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
		this.oAutocomplete = new BMap.Autocomplete({    
		    "input" : dom.getAttribute('id'),
		    "location" : this.map,
			// onSearchComplete:function(res){
			// 	//console.log("onSearchComplete",res)
			// }
		});
		this.oAutocomplete.addEventListener("onconfirm", function(e,a) {
		   //console.log(e,a,"e,a")
		    var thisValue = e.item.value;
			if(isMainInput){				
				_this.searchByKey(_this.map,thisValue,_this.marker);
				 
			}			
			else{				
				_this.addPlaceSugSearchMarker(thisValue);
			}
		});
		this.oAutocomplete.hide();
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
	 * @param {Object} options 要模糊查询的地点 {query[关键字],region[限制城市],tag,city_limit[是否限制在region区域中寻找],output[输出格式，默认json]}
	 * @param {String} options[query] 关键字
	 * @param {String} options[region] 限制城市
	 * @param {Boolean} options[city_limit] 是否限制在region区域中寻找
	 * @param {String} options[tag] 地址标签
	 * @param {String} options[output] 输出格式，默认json
	 * @param {Function} fn 回调函数，参数是查询结果
	 */
	loadBaiduMap.prototype.searchDataByTag = function(options,fn){
		var _this = this;		
		var defaultOptions = {
			// ak: this.mapKey,
			ak:'zkUzSPYaHb7Uhr5ofn32GuPrSCZGjbnW',
			query:options.query || '',
			tag:'',
			region:'',
			city_limit:false,//是否限制在region区域中寻找
			output:'json'
		};
		const _options = Object.assign({}, defaultOptions, options);
		jsonp({
			url:"https://api.map.baidu.com/place/v2/search",
			data:_options,
			success:function(res){
				fn && fn(res);
				////console.log("jsonp",res)
			}
		});
	} 
	
	//百度地图获取IP地址经纬度 
	loadBaiduMap.prototype.getipaddress = function(fn){		
		
		jsonp({
			url:"https://api.map.baidu.com/location/ip",
			data:{
			 ak: this.mapKey,
			 coor: "WGS84ll",//WGS84ll 谷歌体系    bd0911百度体系
			 // coor: "BD0911",
			},
			success:function(res){
				fn && fn(res);
				// ////console.log("jsonp",res)
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
				// //////console.log("初始化点：",points);
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
					// //////console.log("转换结果：",converMap.arr);
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
		return coordTrans.getWGS84({lat:lat,lng:lng},"baidu")
	}
	
	//此js用于辅助百度地图操作，主要判断坐标位置是否在某个圆、矩形之内还是之外 
	loadBaiduMap.prototype.getOnChina = function(){
		//此js用于辅助百度地图操作，主要判断坐标位置是否在某个圆、矩形之内还是之外
		
		var BMapLib = window.BMapLib = BMapLib || {}; 
		//(function () {
		    var a = 6370996.81;
		    var b = BMapLib.GeoUtils = function () { };
		    b.isPointInRect = function (f, g) {
		        if (!(f instanceof BMap.Point) || !(g instanceof BMap.Bounds)) {
		            return false
		        }
		        var e = g.getSouthWest();
		        var h = g.getNorthEast();
		        return (f.lng >= e.lng && f.lng <= h.lng && f.lat >= e.lat && f.lat <= h.lat)
		    };
		    b.isPointInCircle = function (e, h) {
		        if (!(e instanceof BMap.Point) || !(h instanceof BMap.Circle)) {
		            return false
		        }
		        var i = h.getCenter();
		        var g = h.getRadius();
		        var f = b.getDistance(e, i);
		        if (f <= g) {
		            return true
		        } else {
		            return false
		        }
		    };
		    b.isPointOnPolyline = function (f, h) {
		        if (!(f instanceof BMap.Point) || !(h instanceof BMap.Polyline)) {
		            return false
		        }
		        var e = h.getBounds();
		        if (!this.isPointInRect(f, e)) {
		            return false
		        }
		        var m = h.getPath();
		        for (var k = 0; k < m.length - 1; k++) {
		            var l = m[k];
		            var j = m[k + 1];
		            if (f.lng >= Math.min(l.lng, j.lng) && f.lng <= Math.max(l.lng, j.lng) && f.lat >= Math.min(l.lat, j.lat) && f.lat <= Math.max(l.lat, j.lat)) {
		                var g = (l.lng - f.lng) * (j.lat - f.lat) - (j.lng - f.lng) * (l.lat - f.lat);
		                if (g < 2e-10 && g > -2e-10) {
		                    return true
		                }
		            }
		        }
		        return false
		    };
		    b.isPointInPolygon = function (o, l) {
		        if (!(o instanceof BMap.Point) || !(l instanceof BMap.Polygon)) {
		            return false
		        }
		        var k = l.getBounds();
		        if (!this.isPointInRect(o, k)) {
		            return false
		        }
		        var t = l.getPath();
		        var h = t.length;
		        var n = true;
		        var j = 0;
		        var g = 2e-10;
		        var s, q;
		        var e = o;
		        s = t[0];
		        for (var f = 1; f <= h; ++f) {
		            if (e.equals(s)) {
		                return n
		            }
		            q = t[f % h];
		            if (e.lat < Math.min(s.lat, q.lat) || e.lat > Math.max(s.lat, q.lat)) {
		                s = q;
		                continue
		            }
		            if (e.lat > Math.min(s.lat, q.lat) && e.lat < Math.max(s.lat, q.lat)) {
		                if (e.lng <= Math.max(s.lng, q.lng)) {
		                    if (s.lat == q.lat && e.lng >= Math.min(s.lng, q.lng)) {
		                        return n
		                    }
		                    if (s.lng == q.lng) {
		                        if (s.lng == e.lng) {
		                            return n
		                        } else {
		                            ++j
		                        }
		                    } else {
		                        var r = (e.lat - s.lat) * (q.lng - s.lng) / (q.lat - s.lat) + s.lng;
		                        if (Math.abs(e.lng - r) < g) {
		                            return n
		                        }
		                        if (e.lng < r) {
		                            ++j
		                        }
		                    }
		                }
		            } else {
		                if (e.lat == q.lat && e.lng <= q.lng) {
		                    var m = t[(f + 1) % h];
		                    if (e.lat >= Math.min(s.lat, m.lat) && e.lat <= Math.max(s.lat, m.lat)) {
		                        ++j
		                    } else {
		                        j += 2
		                    }
		                }
		            }
		            s = q
		        }
		        if (j % 2 == 0) {
		            return false
		        } else {
		            return true
		        }
		    };
		    b.degreeToRad = function (e) {
		        return Math.PI * e / 180
		    };
		    b.radToDegree = function (e) {
		        return (180 * e) / Math.PI
		    };
		    function d(g, f, e) {
		        if (f != null) {
		            g = Math.max(g, f)
		        }
		        if (e != null) {
		            g = Math.min(g, e)
		        }
		        return g
		    }
		    function c(g, f, e) {
		        while (g > e) {
		            g -= e - f
		        }
		        while (g < f) {
		            g += e - f
		        }
		        return g
		    }
		    b.getDistance = function (j, h) {
		        if (!(j instanceof BMap.Point) || !(h instanceof BMap.Point)) {
		            return 0
		        }
		        j.lng = c(j.lng, -180, 180);
		        j.lat = d(j.lat, -74, 74);
		        h.lng = c(h.lng, -180, 180);
		        h.lat = d(h.lat, -74, 74);
		        var f, e, i, g;
		        f = b.degreeToRad(j.lng);
		        i = b.degreeToRad(j.lat);
		        e = b.degreeToRad(h.lng);
		        g = b.degreeToRad(h.lat);
		        return a * Math.acos((Math.sin(i) * Math.sin(g) + Math.cos(i) * Math.cos(g) * Math.cos(e - f)))
		    };
		    b.getPolylineDistance = function (f) {
		        if (f instanceof BMap.Polyline || f instanceof Array) {
		            var l;
		            if (f instanceof BMap.Polyline) {
		                l = f.getPath()
		            } else {
		                l = f
		            }
		            if (l.length < 2) {
		                return 0
		            }
		            var j = 0;
		            for (var h = 0; h < l.length - 1; h++) {
		                var k = l[h];
		                var g = l[h + 1];
		                var e = b.getDistance(k, g);
		                j += e
		            }
		            return j
		        } else {
		            return 0
		        }
		    };
		    b.getPolygonArea = function (t) {
		        if (!(t instanceof BMap.Polygon) && !(t instanceof Array)) {
		            return 0
		        }
		        var R;
		        if (t instanceof BMap.Polygon) {
		            R = t.getPath()
		        } else {
		            R = t
		        }
		        if (R.length < 3) {
		            return 0
		        }
		        var w = 0;
		        var D = 0;
		        var C = 0;
		        var L = 0;
		        var J = 0;
		        var F = 0;
		        var E = 0;
		        var S = 0;
		        var H = 0;
		        var p = 0;
		        var T = 0;
		        var I = 0;
		        var q = 0;
		        var e = 0;
		        var M = 0;
		        var v = 0;
		        var K = 0;
		        var N = 0;
		        var s = 0;
		        var O = 0;
		        var l = 0;
		        var g = 0;
		        var z = 0;
		        var Q = 0;
		        var G = 0;
		        var j = 0;
		        var A = 0;
		        var o = 0;
		        var m = 0;
		        var y = 0;
		        var x = 0;
		        var h = 0;
		        var k = 0;
		        var f = 0;
		        var n = a;
		        var B = R.length;
		        for (var P = 0; P < B; P++) {
		            if (P == 0) {
		                D = R[B - 1].lng * Math.PI / 180;
		                C = R[B - 1].lat * Math.PI / 180;
		                L = R[0].lng * Math.PI / 180;
		                J = R[0].lat * Math.PI / 180;
		                F = R[1].lng * Math.PI / 180;
		                E = R[1].lat * Math.PI / 180
		            } else {
		                if (P == B - 1) {
		                    D = R[B - 2].lng * Math.PI / 180;
		                    C = R[B - 2].lat * Math.PI / 180;
		                    L = R[B - 1].lng * Math.PI / 180;
		                    J = R[B - 1].lat * Math.PI / 180;
		                    F = R[0].lng * Math.PI / 180;
		                    E = R[0].lat * Math.PI / 180
		                } else {
		                    D = R[P - 1].lng * Math.PI / 180;
		                    C = R[P - 1].lat * Math.PI / 180;
		                    L = R[P].lng * Math.PI / 180;
		                    J = R[P].lat * Math.PI / 180;
		                    F = R[P + 1].lng * Math.PI / 180;
		                    E = R[P + 1].lat * Math.PI / 180
		                }
		            }
		            S = Math.cos(J) * Math.cos(L);
		            H = Math.cos(J) * Math.sin(L);
		            p = Math.sin(J);
		            T = Math.cos(C) * Math.cos(D);
		            I = Math.cos(C) * Math.sin(D);
		            q = Math.sin(C);
		            e = Math.cos(E) * Math.cos(F);
		            M = Math.cos(E) * Math.sin(F);
		            v = Math.sin(E);
		            K = (S * S + H * H + p * p) / (S * T + H * I + p * q);
		            N = (S * S + H * H + p * p) / (S * e + H * M + p * v);
		            s = K * T - S;
		            O = K * I - H;
		            l = K * q - p;
		            g = N * e - S;
		            z = N * M - H;
		            Q = N * v - p;
		            m = (g * s + z * O + Q * l) / (Math.sqrt(g * g + z * z + Q * Q) * Math.sqrt(s * s + O * O + l * l));
		            m = Math.acos(m);
		            G = z * l - Q * O;
		            j = 0 - (g * l - Q * s);
		            A = g * O - z * s;
		            if (S != 0) {
		                o = G / S
		            } else {
		                if (H != 0) {
		                    o = j / H
		                } else {
		                    o = A / p
		                }
		            }
		            if (o > 0) {
		                y += m;
		                k++
		            } else {
		                x += m;
		                h++
		            }
		        }
		        var u, r;
		        u = y + (2 * Math.PI * h - x);
		        r = (2 * Math.PI * k - y) + x;
		        if (y > x) {
		            if ((u - (B - 2) * Math.PI) < 1) {
		                f = u
		            } else {
		                f = r
		            }
		        } else {
		            if ((r - (B - 2) * Math.PI) < 1) {
		                f = r
		            } else {
		                f = u
		            }
		        }
		        w = (f - (B - 2) * Math.PI) * n * n;
		        return w
		    }
		//})();
		 
		 return BMapLib;
		
	}
	
	//判断是否经纬度在国内
	loadBaiduMap.prototype.isBaiduPointOnChina = function(lng, lat){
		var pts=CreateChinaMapLine();
		var ply = new BMap.Polygon(pts);
	
		var pt = new BMap.Point(lng, lat);
		if(!this.BMapLib){
			this.BMapLib = this.getOnChina();
		}
		
		var result = this.BMapLib.GeoUtils.isPointInPolygon(pt, ply);
		return result;//true中国内，否国外
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
	 * @param {String} options.mapKey 秘钥  //"AIzaSyDTQQAXrXIcPb7H-tkpo2OjfqSHBIll-uM";//默认key 为谷歌账号 其他项目
	 * */
	function loadGoogleMap(options) {
		var _this = this;
		
		var defaultOptions = {
			lat:22.581783,
			lng:113.962135,
			idVal:"googoleMap",
			oAddressInput:false,
			isStillMarker:false,//主要标注是否静态
			isModuleLoad:false,//是否模块化引入
			lang:'en',
			isPlaceSugSearch:false,
			mapKey:googleMapKey,//默认key 
			callback:function(){
				
			}
		};
		const _options = Object.assign({}, defaultOptions, options);
		//初次经纬度和地址
		this.firstLat = _options.lat;
		this.firstLng = _options.lng;
		this.firstAddr = '';
		
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
		this.mapKey = _options.mapKey;
		
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
		//标注聚合器对象
		this.markerClusterer = null;
		this.clustererMarkerList = [];//标注聚合器所存储marker的数组
		
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
	 * 制裁国家方法
	 * @param {String} data 包含制裁国家的字段
	 */
	loadGoogleMap.prototype.sanctionCountry = function(data,fn){
		var _this = this;
		var hasSanction = false;
		for(var i=0;i<sanctionCountryList.length;i++){
			if(data.indexOf(sanctionCountryList[i]) >= 0){
				hasSanction = true;
			}	
		}
		
		if(hasSanction){
			//获取关键字的位置
			this.getLnglatByAddress(data,function(result){				
				if (result.info == 'OK') {
				  // result中对应详细地理坐标信息
					console.log('getLnglatByAddress callback',)
					var isOutOfChina = coordTrans.outOfChina(result.lnglat.lat,result.lnglat.lng);
					// ////console.log("国外",isOutOfChina)
					if(isOutOfChina){//制裁国家为外国					
						_this.updateMarkerWindow(_this.firstAddr,_this.firstLat,_this.firstLng);
						if(window.layer){				
							layer.msg("Currently not supported, please select again");
						}else{
							alert("Currently not supported, please select again")
						}	
						
					}
					fn && fn(isOutOfChina);										
				}
				else{
					console.error('地址解析失败');
					fn && fn(false);
				}
			});
		}
		else{
			fn && fn(false);
		}
	}
	
	//根据地址模糊查询地理位置信息
	loadGoogleMap.prototype.getLnglatByAddress = function(keyword,fn){
		var _this = this;
		// ////console.log("验证制裁国家")
		this.geocoder.geocode({ address: keyword })
			  .then((result) => {
					
				const { results } = result;
				// console.log(results,"resultresult")		
				var point = results[0].geometry.location;
				if(point){
					var result = {lnglat:{lat:point.lat(),lng:point.lng()},info:"OK"};
				}else{
					var result = {info:"error"};
				}	
			
				fn && fn(result);
			  })
			  .catch((e) => {
			
		});
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
	
		var language = '&language='+ this.lang;
		// var lib = '&libraries=drawing';
		var lib = '&libraries=places,drawing';
		var scriptArr = ['https://maps.googleapis.com/maps/api/js?key='+ this.mapKey +'&t='+tt +language + lib];
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
	 * 设置多个标注聚合功能
	 * @param {Array} locations marker数组对象，其内包含对象经度纬度如：{ lat: -31.56391, lng: 147.154312 }
	 * @param {Array} titles  locations点对应的各个label标题，用信息窗口弹出展示
	 * @param {Function} clickCallback 点击标注回调函数,参数返回索引，事件对象，以及marker标注
	 * @param {Object} MC 模块化引入js脚本 xhb.google.markerclusterer 输出的函数变量 
	 * */
	loadGoogleMap.prototype.initMarkerClusterer = function(locations,titles,clickCallback,MC){
		var _this = this;
		
		const markers = locations.map(function(item, i){
			
			var position = coordTrans.gcj_encrypt(item.lat,item.lng);//WGS-84===>GCJ-02
			const marker = new google.maps.Marker({
			  position,
			  // label,
			});
			const _infoWindow = new google.maps.InfoWindow({
				content: "",
				disableAutoPan: true,
			});
			
			_infoWindow.setContent(titles[i]);
			_infoWindow.open(_this.map, marker);
		  
			marker.addListener("click", (a,b) => {
				clickCallback && clickCallback(i,a,marker)
			});
			
			_this.clustererMarkerList.push( marker );
			return marker;
		});
		  
		var pt = new google.maps.LatLng(locations[0].lat, locations[0].lng);
		this.map.setCenter(pt); 
		this.map.setZoom(2);
		if(window.markerClusterer){
			this.markerClusterer = new markerClusterer.MarkerClusterer({ markers:markers, map:this.map });
			return this.markerClusterer;
		}
		else{
			if(MC){
				this.markerClusterer = new MC.MarkerClusterer({ markers:markers, map:this.map });
				return this.markerClusterer;
			}else{
				alert("请引入谷歌地图标注聚合功能插件脚本才能使用标注聚合功能");
			}
		}
	}
	
	/**
	 * 动态添加多个标注到原本标注器之中
	 * @param {Array} locations marker数组对象，其内包含对象经度纬度如：{ lat: -31.56391, lng: 147.154312 }
	 * @param {Array} titles  locations点对应的各个label标题，用信息窗口弹出展示
	 * @param {Function} clickCallback 点击标注回调函数
	 * */
	loadGoogleMap.prototype.addMarkerClusterer = function(locations,titles,clickCallback){
		if(!this.markerClusterer){
			return alert("请先使用 initMarkerClusterer 函数初始化标注聚合器功能");
		}
		var _this = this;
		const markers = locations.map(function(item, i){
			var position = coordTrans.gcj_encrypt(item.lat,item.lng);//WGS-84===>GCJ-02
			const marker = new google.maps.Marker({
			  position,
			  // label,
			});
			const _infoWindow = new google.maps.InfoWindow({
				content: "",
				disableAutoPan: true,
			});
			
			_infoWindow.setContent(titles[i]);
			_infoWindow.open(_this.map, marker);
		  
			marker.addListener("click", (a,b) => {
				clickCallback && clickCallback(i,a)
			});
			
			_this.clustererMarkerList.push( marker );
			return marker;
		});
		this.markerClusterer.addMarkers(markers);
		
		var pt = new google.maps.LatLng(locations[0].lat, locations[0].lng);
		this.map.setCenter(pt); 
		this.map.setZoom(2);
	}
	
	
	/**
	 * 动态更新聚合器内标注信息（先清空，再重建）
	 * @param {Array} locations marker数组对象，其内包含对象经度纬度如：{ lat: -31.56391, lng: 147.154312 }
	 * @param {Array} titles  locations点对应的各个label标题，用信息窗口弹出展示
	 * @param {Function} clickCallback 点击标注回调函数
	 * */
	loadGoogleMap.prototype.updateMarkerClusterer = function(locations,titles,clickCallback){
		this.markerClusterer.clearMarkers();
		this.clustererMarkerList = [];
		this.addMarkerClusterer(locations,titles,clickCallback);
	}
	
	/**
	 * 根据sort索引，删除聚合器存储的某一个marker
	 * @param {Number} sort 根据数组索引，删除存储在实例化地图对象中的clustererMarkerList数组某个标注
	 */
	loadGoogleMap.prototype.delMarkerClusterer = function(sort){	
		if(this.clustererMarkerList.length && this.markerClusterer){
			this.markerClusterer.removeMarker(this.clustererMarkerList[sort]);
			this.clustererMarkerList.splice(sort,1);
		} 
		
	}
	
	/**
	 * 调用谷歌地图
	 * @param {Number} lat 纬度数字
	 * @param {Number} lng 经度数字
	 * */
	loadGoogleMap.prototype.renderGoogleMap = function(lat, lng, idVal,fn){
		// //////console.log("googleMap lat, lng,",lat, lng)
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
			scaleControl:true,//比例尺
		};
		this.map = new google.maps.Map(document.getElementById(idVal), mapOptions);
		google.maps.event.trigger(this.map, 'resize');
		
		if(this.oAddressInput){
			if(this.isPlaceSugSearch){
				this.placeSugSearch(this.oAddressInput,true);
			}else{
				//失去焦点事件
				this.oAddressInput.onblur = function(){
					var val = this.value;
					if(val == "") return false;
					//////console.log("ssss")
					_this.sanctionCountry(val,function(b){
						if(!b){
							//获取地理位置信息和更新标注信息
							_this.getGEOInfoByAddr(val,function(){
								
							});
						}
					});
					
				}
			}
			
		}
	
		
		fn && fn();
	}
	
	
	//选择地图90度
	loadGoogleMap.prototype.rotate90 = function(){
		var _this = this;
		// //////console.log(this.map.getTilt(),"this.map.getTilt")
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
		
		searchBox.addListener("places_changed",function(a,b){
			var places = searchBox.getPlaces();
			
			//console.log(places,"places")
			var searchAddr = places[0].name;
			var formatted_address = places[0].formatted_address;
			dom.value = searchAddr;
			dom.setAttribute('place-id',places[0].place_id);
			
			
			var mainPoint = places[0].geometry.location;
			if(isMainInput){
				//根据经纬度解析出地理位置相关数据
				_this.getInfoByLatLng( mainPoint,function(info){
					////console.log(info,"inininininini")
					_this.detailsAddress = "【"+ searchAddr +"】" + formatted_address;
					info.detailsAddress = _this.detailsAddress;
					_this.setMarkerAddress(info);
					_this.marker.setPosition(mainPoint);
				});
				// _this.sanctionCountry(places[0].name,function(b){
				// 	if(!b){
				// 		 _this.marker.setPosition(mainPoint);
				// 		 _this.infowindow.setContent(places[0].name);
				// 	}
				// });
				
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
			// ////console.log(PlaceResult, PlacesServiceStatus,"PlaceResult, PlacesServiceStatus")
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
		// ////console.log("head",head)
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
			_this.firstAddr = info.detailsAddress;
		});
		
		//谷歌拖拽
		// 添加拖动事件监听器
		google.maps.event.addListener(_this.marker, 'dragstart', function() {
			_this.updateMarkerAddress('searching...');
		});
					
		
					
		google.maps.event.addListener(_this.marker, 'dragend', function(p,c) {
			//根据经纬度解析出地理位置相关数据
			_this.getInfoByLatLng( _this.marker.getPosition(),function(info){
				// ////console.log(info,"inininininini")
				_this.map.setCenter(_this.marker.getPosition());
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
		var ChinaList = [
			"中国","china","China","中國","中华人民共和国","中華人民共和國","zhongguo","zhonghuarenmingongheguo",
		];
		
		this.geocoder.geocode(
			{
			   latLng: myCenter
			}, 
			function(responses) {
				   if(responses && responses.length > 0) {
					   _this.lat = myCenter.lat();
					   _this.lng = myCenter.lng();
					   var info = getGoogleAllAddr(responses,myCenter);
					   
					   function addressToDo(info){
					   
							_this.postal_code = info.postal_code;
							_this.detailsAddress = info.detailsAddress;
							_this.country = info.country;
							_this.provice = info.provice;
							_this.city = info.city;
							fn && fn(info);					
					   
					   }
					   
					   var c = info.country.toLowerCase();
					   if(ChinaList.includes(c)){
						   addressToDo(info)
					   }
					   else{
						   //用高德地理编码解析是否国内
							getLatLngInfoByGDWebServer(
								{location:{lat:myCenter.lat(),lng:myCenter.lng()}},
								function(gdRes){
									if(gdRes.info == "OK"){//中国境内
										//console.log("中国境内");
										var addressInfo = gdRes.regeocode.addressComponent;
										info.detailsAddress = gdRes.regeocode.formatted_address;
										info.country = addressInfo.country;
										info.provice = addressInfo.province;
										info.city = addressInfo.city.length === 0 ? addressInfo.province : addressInfo.city;
										addressToDo(info);
									}
									else{//境外
										//console.log("境外");
										addressToDo(info)
									}
								}
							);	
					   }
						
				   } 
				   else {
						
						fn && fn(false);
				   }
			}
		);
		
		//获取谷歌地址
		function getGoogleAllAddr(aData,myCenter){
			// console.log(aData,"getGoogleAllAddr")
			var list = [];
			for(var i=0;i<aData.length;i++){
				list.push( aData[i].address_components.length );
			}
			//js 返回數組中值最大的索引 
			var sort = list.indexOf(Math.max(...list));
			
			var _addrssInfo = aData[sort];
		// console.log(_addrssInfo,"1111111111111111111111")
			// if(_addrssInfo.address_components.length > 1)
			
			var mainAddr = _this.addressComponentsFn(_addrssInfo.address_components);
			// //////console.log(_addrssInfo.address_components,"mainmain")
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
			};
			obj.city = (obj.city == '' ? obj.provice : obj.city);//针对中国直辖市处理
			
			return obj;
		}
	}
	
	//判断设置窗口信息
	loadGoogleMap.prototype.setMarkerAddress = function(info){
		var _this = this;
		if(info){			
			//判定制裁国家信息
			this.sanctionCountry(info.detailsAddress,function(b){
				if(!b) _this.updateMarkerAddress(info.detailsAddress);	
			});	
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
		if(!this.marker || !this.geocoder){
			window.updateMarkerWindow_fn_timer = setTimeout(function(){
				_this.updateMarkerWindow(addr, lat, lng);
			},1000);			
		}
		else{
			window.clearTimeout(window.updateMarkerWindow_fn_timer);
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
		}
		
		
		
	}
	
	//生成卫星地图图片地址
	loadGoogleMap.prototype.getStaticMapImage = function(lat,lng){
		lat = lat || this.lat;
		lng = lng || this.lng;
		var imgUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=' + lat + ',' + lng + '&maptype=satellite&zoom=19&scale=2&size=640x640&format=jpg-baseline&key=' + this.mapKey;	
		return imgUrl;
	}
	
	//根据地址模糊查询地理位置信息
	loadGoogleMap.prototype.getGEOInfoByAddr = function(keyword,fn){
		var _this = this;
		// ////console.log(_this.detailsAddress,keyword);
		if(keyword == _this.detailsAddress) return;
			this.geocoder.geocode({ address: keyword })
				  .then((result) => {
					//////console.log(result,"resultresult")			
					const { results } = result;
						
					_this.map.setCenter(results[0].geometry.location);
					_this.marker.setPosition(results[0].geometry.location);
					
					_this.updateMarkerAddress(keyword);
					
					//重新根据获取的经纬度，更新函数内正确的信息
					// //////console.log(results[0].geometry.location.lat(),"lat")
					var myCenter = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
					_this.getInfoByLatLng(myCenter);
					fn && fn(results);
				  })
				  .catch((e) => {
					//  ////console.log( "Geocode was not successful for the following reason: " + e);
					// alert("Geocode was not successful for the following reason: " + e);
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
		return coordTrans.getWGS84({lat:lat,lng:lng},"google")
	}
	
	
	/**
	 * 加载高德地图
	 * options
	 * 注意：初始化，更新，的经纬度必须为WGS84系
	 * @param {Number} options.lat 纬度
	 * @param {Number} options.lng 经度
	 * @param {String} options.idVal 地图容器id值
	 * @param {Object || false} options.oAddressInput 地址输入dom对象 
	 * @param {Boolean} options.isModuleLoad 是否页面已经加载地图api
	 * @param {Boolean} options.isStillMarker 是否静态marker
	 * @param {Function} options.callback 初始化地图成功回调函数 
	 * @param {Boolean} options.isPlaceSugSearch 主输入框是否使用建议列表功能
	 * @param {String} options.lang 设置语言，默认中文，可选值：en，zh_en, zh_cn
	 * @param {String} options.mapKey 秘钥  
	 * @param {String} options.jsCode 安全秘钥 
	 * */
	function loadGaodeMap(options) {
		var _this = this;
		if(options.mapKey && !options.jsCode || (!options.mapKey && options.jsCode) ){
			alert("高德地图秘钥,和对应的安全密钥必须一同传参才可使用");
			return;
		}
		var defaultOptions = {
			lat:22.581783,
			lng:113.962135,
			idVal:"gaodeMap",
			isModuleLoad:false,
			oAddressInput:false,
			isStillMarker:false,//主要标注是否静态
			isPlaceSugSearch:false,
			mapKey:gaodeMapKey,//默认key 
			jsCode:gaodeJsCode,//安全秘钥，必须和key对应使用
			lang:'zh_cn',
			plugin:[//默认加载插件
				'AMap.ToolBar',//工具条，控制地图的缩放、平移等
				'AMap.CustomLayer',// 自定义地图图层，在JSAPI提供的标准类型均无法满足需求的情况下，允许开发者通过canvas、svg等绘图手段绘制自己想要的图层及效果
				'AMap.Scale',//比例尺，显示当前地图中心的比例尺
				'AMap.MapType',//图层切换，用于几个常用图层切换显示
				'AMap.Geolocation',//定位，提供了获取用户当前准确位置、所在城市的方法
				'AMap.Autocomplete',//输入提示，提供了根据关键字获得提示信息的功能
				'AMap.PlaceSearch',//地点搜索服务，提供了关键字搜索、周边搜索、范围内搜索等功能
				'AMap.MarkerClusterer',//标注聚合器
			],//
			callback:function(){
				
			}
		};
		const _options = Object.assign({}, defaultOptions, options);
		//初次经纬度和地址
		this.firstLat = _options.lat;
		this.firstLng = _options.lng;
		this.firstAddr = '';
		
		//WGS-84坐標转GCJ-02
		var GCJ02 = coordTrans.gcj_encrypt(_options.lat,_options.lng);
		_options.lat = GCJ02.lat;
		_options.lng = GCJ02.lng;
		
		this.callback = _options.callback;
		this.lat = _options.lat;
		this.lng = _options.lng;
		
		
		
		this.idVal = _options.idVal;
		this.lang = _options.lang;
		this.isModuleLoad = _options.isModuleLoad;
		this.oAddressInput = _options.oAddressInput;
		this.isStillMarker = _options.isStillMarker;
		this.isPlaceSugSearch = _options.isPlaceSugSearch;	
		this.mapKey = _options.mapKey;
		this.jsCode = _options.jsCode;
		this.plugin = _options.plugin;
		
		this.isChina = true;
		
		this.postal_code = "";//郵編
		this.detailsAddress = "";//详细地址
		this.city = "";//主要城市
		this.country = "";//国家
		this.provice = "";//省
		
		this.map = null;
		this.infowindow = null;//信息窗口
		
		
		this.geocoder = null;//地理编码解析对象
		this.autocomplete = null;
		this.placeSearch = null;
		
		this.marker = null;//标注
		this.placeSugSearchMarker = null;//模糊搜索建议列表定义的marker
		//标注聚合器对象
		this.markerClusterer = null;
		this.clustererMarkerList = [];//标注聚合器所存储marker的数组	
		
		//针对label设置全局style
		var head = document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		style.innerHTML = ".amap-marker-label{border-radius: 3px;border: 1px solid #c9c9c9;}";
		head.append(style);
		//安全秘钥，必须设置
		window._AMapSecurityConfig = {
		    // serviceHost:'http://20.60.5.235:8848/_AMapService',  
		    // 例如 ：serviceHost:'http://1.1.1.1:80/_AMapService',
			securityJsCode:_this.jsCode,
		}
		
		if(_options.isModuleLoad){//已加载地图api
			_this.renderMap(_this.lat, _this.lng, _this.idVal,function(){
				_this.callback()
			})	
		}else{
			this.xhbLoadGMap({lat:this.lat,lng:this.lng},this.idVal,function(){
				
			});
		}
	}
	
	//
	loadGaodeMap.prototype.xhbLoadGMap = function(latLng,idVal,fn){
		var _this = this;
		var tt = Date.parse(new Date());
		// var plugin = '&plugin=' + this.plugin.join();
		var plugin = '';
		var scriptArr = [location.protocol+ '//webapi.amap.com/maps?v=1.4.15&key='+ this.mapKey + plugin];
		
		if(window.AMap){
				
			_this.renderMap(_this.lat, _this.lng, _this.idVal,function(){
				_this.callback()
			})	
		}else{
			
			loadScript(scriptArr,0, function () {
				_this.renderMap(_this.lat, _this.lng, _this.idVal,function(){
					_this.callback()
				})	
			});
				
		}
		
	}
		
	/**
	 * 调用地图
	 * @param {Number} lat 纬度数字
	 * @param {Number} lng 经度数字
	 * */
	loadGaodeMap.prototype.renderMap = function(lat, lng, idVal,fn){
		var _this = this;
		this.map = new AMap.Map(idVal,{
			center:[lng,lat],
			zoom:17,
			dragEnable : true,
			// mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
			viewMode: '2D',  //设置地图模式
			lang:this.lang,  //设置地图语言类型
		});
		
						
		this.map.on('complete', function(){
		    // 地图图块加载完成后触发
			//加载默认插件
			AMap.plugin(
				[					
					'AMap.ToolBar',//工具条，控制地图的缩放、平移等
					'AMap.CustomLayer',// 自定义地图图层，在JSAPI提供的标准类型均无法满足需求的情况下，允许开发者通过canvas、svg等绘图手段绘制自己想要的图层及效果
					'AMap.Scale',//比例尺，显示当前地图中心的比例尺
					'AMap.MapType',//图层切换，用于几个常用图层切换显示
					'AMap.Geolocation',//定位，提供了获取用户当前准确位置、所在城市的方法
					'AMap.Autocomplete',//输入提示，提供了根据关键字获得提示信息的功能
					'AMap.PlaceSearch',//地点搜索服务，提供了关键字搜索、周边搜索、范围内搜索等功能
					'AMap.Geocoder',
				],function(){//异步同时加载多个插件
					var toolbar = new AMap.ToolBar();
					var Scale = new AMap.Scale();
					var MapType = new AMap.MapType();
					// var Geolocation = new AMap.Geolocation();
					_this.map.addControl(toolbar);
					_this.map.addControl(Scale);
					// _this.map.addControl(MapType);
				    // _this.map.addControl(Geolocation);
					
					//地理编码
					_this.geocoder = new AMap.Geocoder({
						// city: "010", //城市设为北京，默认：“全国”
						// radius: 1000 //范围，默认：500
					});
					
					//设置默认marker
					_this.setDefaultMarker(lng,lat,function(){
						var mainPoint = new AMap.LngLat(lng, lat);//标准写法，经度在前，纬度在后
						//根据经纬度获取地理位置
						_this.getInfoByLatLng(mainPoint,function(regeocode){
							_this.updateMarkerAddress(_this.detailsAddress);
						});
					});
			  
			});
			
			if(_this.oAddressInput){
				if(_this.isPlaceSugSearch){
					_this.placeSugSearch(_this.oAddressInput,true);
				}else{
					//失去焦点事件
					_this.oAddressInput.onblur = function(){
						var val = this.value;
						if(val == "") return false;
						//获取地理位置信息和更新标注信息
						_this.sanctionCountry(val,function(b){
							if(!b){
								//获取地理位置信息和更新标注信息
								_this.getGEOInfoByAddr(val);
							}
						});
						
					}
				}				
			}
			
			fn && fn();
		});
		
	}
	
	
	/**
	 * 获取即将要设置聚合标注的marker
	 * @param {Array} locations marker数组对象，其内包含对象经度纬度如：{ lat: -31.56391, lng: 147.154312 }
	 * @param {Array} titles  locations点对应的各个label标题，用信息窗口弹出展示
	 * @param {Function} clickCallback 点击标注回调函数 ,参数返回索引，事件对象，以及marker标注
	 * */
	loadGaodeMap.prototype.getLocationListToMarkerClusterer = function(locations,titles,clickCallback){
		var _this = this;
		
		const markers = locations.map(function(item, i){
			var marker = _this.addMarker( {lat:item.lat,lng:item.lng} );
			
			marker.setLabel(
				_this.setLabel(titles[i])
			);
			
			marker.on("click", (a,b) => {
				clickCallback && clickCallback(i,a,marker)
			});
			
			_this.clustererMarkerList.push( marker );
			return marker;
		});
		return markers;
	}
	
	
	/**
	 * 设置多个标注聚合功能
	 * @param {Array} locations marker数组对象，其内包含对象经度纬度如：{ lat: -31.56391, lng: 147.154312 }
	 * @param {Array} titles  locations点对应的各个label标题，用信息窗口弹出展示
	 * @param {Function} clickCallback 点击标注回调函数 ,参数返回索引，事件对象，以及marker标注
	 * @param {Object} option 自定义聚合标注器其他配置，可参考官网配置
	 * */
	loadGaodeMap.prototype.initMarkerClusterer = function(locations,titles,clickCallback,option){
		var _this = this;		
		
		const markers = this.getLocationListToMarkerClusterer(locations,titles,function(i,a,marker){
			clickCallback && clickCallback(i,a,marker)
		});  
	
		var pt = new AMap.LngLat(locations[0].lng, locations[0].lat);//标准写法，经度在前，纬度在后
		this.map.setCenter(pt); 
		this.map.setZoom(2);
		
		this.map.plugin(["AMap.MarkerClusterer"],function() {
		    _this.markerClusterer = new AMap.MarkerClusterer(_this.map,markers,option || undefined);
		});
		 
		 return this.markerClusterer;
		
	}
	
	/**
	 * 动态添加多个标注到原本标注器之中
	 * @param {Array} locations marker数组对象，其内包含对象经度纬度如：{ lat: -31.56391, lng: 147.154312 }
	 * @param {Array} titles  locations点对应的各个label标题，用信息窗口弹出展示
	 * @param {Function} clickCallback 点击标注回调函数
	 * */
	loadGaodeMap.prototype.addMarkerClusterer = function(locations,titles,clickCallback){
		if(!this.markerClusterer){
			return alert("请先使用 initMarkerClusterer 函数初始化标注聚合器功能");
		}
		var _this = this;
		
		const markers = this.getLocationListToMarkerClusterer(locations,titles,function(i,a,marker){
			clickCallback && clickCallback(i,a,marker)
		});  
		
		this.markerClusterer.addMarkers(markers);
		
		var pt = new AMap.LngLat(locations[0].lng, locations[0].lat);//标准写法，经度在前，纬度在后
		this.map.setCenter(pt); 
		this.map.setZoom(2);
	}
	
	
	/**
	 * 动态更新聚合器内标注信息（先清空，再重建）
	 * @param {Array} locations marker数组对象，其内包含对象经度纬度如：{ lat: -31.56391, lng: 147.154312 }
	 * @param {Array} titles  locations点对应的各个label标题，用信息窗口弹出展示
	 * @param {Function} clickCallback 点击标注回调函数
	 * */
	loadGaodeMap.prototype.updateMarkerClusterer = function(locations,titles,clickCallback){
		
		if(!this.markerClusterer){
			return alert("请先使用 initMarkerClusterer 函数初始化标注聚合器功能");
		}
		var _this = this;	
		this.clustererMarkerList = [];
		const markers = this.getLocationListToMarkerClusterer(locations,titles,function(i,a,marker){
			clickCallback && clickCallback(i,a,marker)
		});  
		
		this.markerClusterer.setMarkers(markers);
	}
	
	/**
	 * 根据sort索引，删除聚合器存储的某一个marker
	 * @param {Number} sort 根据数组索引，删除存储在实例化地图对象中的clustererMarkerList数组某个标注
	 */
	loadGaodeMap.prototype.delMarkerClusterer = function(sort){	
		
		if(this.clustererMarkerList.length && this.markerClusterer){
			
			this.markerClusterer.removeMarker(this.clustererMarkerList[sort]);
			this.clustererMarkerList.splice(sort,1);
		} 
		
	}
	
	
	/**
	 * 返回所传递经纬度，或者当前主要marker的经纬度的 WGS84体系坐标；经纬度参数非必选
	 * @@param {Number} lat 
	 * @@param {Number} lng 
	 */
	loadGaodeMap.prototype.getCurrCoordByWGS84 = function(lat,lng){
		lat = lat || this.lat;
		lng = lng || this.lng;
		return coordTrans.getWGS84({lat:lat,lng:lng},"gaode")
	}
	

	/**
	 * 根据经纬度，或者当前主要marker的经纬度，生成静态地图图片；经纬度参数非必选
	 * @@param {Number} lat 
	 * @@param {Number} lng 
	 */
	loadGaodeMap.prototype.getStaticMapImage = function(lat,lng){
		var markerLocation = this.marker.getPosition();
		lat = lat || this.lat;
		lng = lng || this.lng;				
		var imgUrl = 'https://restapi.amap.com/v3/staticmap?key=74534047360c79e9a712cf1590fed66b&location=' + lng + ',' + lat + '&size=1000*1000&zoom=17&markers=mid,0xFF0000,A:' + lng + ',' + lat;
		return imgUrl;
	}
	
	
	
	//设置label
	loadGaodeMap.prototype.setLabel = function(txt){
		var lbl = {
			offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
			content:"<div style='padding:2px 5px;'>"+ txt +"</div>",
			direction: 'top' ,//设置文本标注方位
		};
		return lbl;
	}
	
	
	
	
	/**
	 * 地理编码正向解析，关键字查询对应经纬度
	 * @@param {String} keyword 关键字
	 * @@param {Function} fn 参数是解析到的数据 
	 */
	loadGaodeMap.prototype.getLnglatByAddress = function(keyword,fn){
		var _this = this;
		//////console.log("验证是否制裁国家")
		this.geocoder.getLocation(keyword, function(status, result) {		
		    if (status === 'complete' && result.info === 'OK') {		      
				fn && fn(result);
		    }
			else{
				var result = {
					info:"error"
				};
				fn && fn(result);
			}
		});		
	}
	
	//根据地址模糊查询地理位置信息
	loadGaodeMap.prototype.getGEOInfoByAddr = function(keyword,fn){
		var _this = this;
		
		if(keyword == _this.detailsAddress) return;
		this.geocoder.getLocation(keyword, function(status, result) {
			// ////console.log(status, result,"根据地址模糊查询地理位置信息");
		    if (status === 'complete' && result.info === 'OK') {
		      // result中对应详细地理坐标信息
				var res = result.geocodes[0];
				_this.map.setCenter(res.location);
				_this.marker.setPosition(res.location);
				
				_this.updateMarkerAddress(keyword);
				
				//重新根据获取的经纬度，更新函数内正确的信息
				
				_this.getInfoByLatLng(res.location);
				fn && fn(results);
		    }
		})		
	}
	
	/**
	 * 模糊检索，地址建议列表组件
	 * @param {Object} dom 输入框dom节点
	 * @param {Boolean} isMainInput 是否主要input
	 * */
	loadGaodeMap.prototype.placeSugSearch = function(dom,isMainInput){
		var _this = this;
		//建立一个自动完成的对象，keyword出现下拉选择
	
		this.autocomplete = new AMap.Autocomplete({    
		    "input" : dom.getAttribute('id'),
		    // "location" : this.map
		});
		
		this.placeSearch = new AMap.PlaceSearch({		
		    map:this.map
		});
		
		AMap.event.addListener(this.autocomplete, 'select', function(e){
			//console.log(e,"eee")
		    //TODO 针对选中的poi实现自己的功能
		   
				if(isMainInput){
					
					 var center = e.poi.location;
					 _this.map.setCenter(center);
					 _this.marker.setPosition(center);
					 _this.getInfoByLatLng(center,function(){
						 _this.detailsAddress = "【"+ e.poi.name +"】"  + _this.detailsAddress;
						_this.updateMarkerAddress(_this.detailsAddress) ;
					 });
				}
				else{				
					 _this.placeSearch.search(e.poi.name);
				}
		});
		
	}
	
	/**
	 * * 根据经纬度设置marker，经纬度必须为WGS84系
	 * @param {Object} lnglat 经纬度对象 为WGS84系 属性lat，lng
	 * @param {Object} options 自定义marker配置
	 */
	loadGaodeMap.prototype.addMarker = function(lnglat,options){
		//WGS-84坐標转GCJ-02
		var GCJ02 = coordTrans.gcj_encrypt(lnglat.lat,lnglat.lng);
		if(options) options.position = [GCJ02.lng,GCJ02.lat];
		var marker = new AMap.Marker(options || {
		    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
		    position: [GCJ02.lng,GCJ02.lat]
		});
		this.map.add(marker);
		return marker;
	}
	
	//设置默认marker
	loadGaodeMap.prototype.setDefaultMarker = function(lng,lat,fn){
		var _this = this;
		_this.marker = new AMap.Marker({
		    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
		    position: [lng,lat]
		});
		// ////console.log(_this.marker,"_this.marker")
		
		if(!_this.isStillMarker){
			_this.marker.setDraggable(true);
			_this.marker.setClickable(true);
		}
		_this.marker.setLabel(
			_this.setLabel('加载中...')
		);
		
		
		
		_this.marker.on("dragend",function(p){
			// ////console.log(p,"拖拽了",_this.marker.getPosition())
			//根据经纬度获取地理位置
			var markerPosition = _this.marker.getPosition();
			_this.getInfoByLatLng(markerPosition,function(){
				_this.updateMarkerAddress(_this.detailsAddress);
				_this.map.setCenter(markerPosition);
			});
		});
		
		_this.map.add(_this.marker);
		fn && fn();
		return _this.marker;
	}
	
	//逆向地理编码：根据经纬度返回对应经纬度地址
	/**
	 * 根据经纬度解析出地理位置相关数据（经纬度为百度体系）
	 * @param {Object} myCenter 经纬度对象
	 */
	loadGaodeMap.prototype.getInfoByLatLng = function(myCenter,fn){
		var _this = this;
		var lnglat = [myCenter.lng,myCenter.lat];
		
		this.geocoder.getAddress(myCenter, function(status, result) {
			
			if(status == "no_data"){
				////console.log(_this.firstAddr,"_this.firstAddr")
				window.layer ? window.layer.alert(gaodeNodataText) : alert(gaodeNodataText);
				_this.updateMarkerWindow(_this.firstAddr,_this.firstLat,_this.firstLng);
				return;
			}
			// ////console.log(status, result,"status, result");
		    if (status === 'complete' && result.info === 'OK') {
		        // result为对应的地理位置详细信息
				// ////console.log("gaode",result);
				//制裁国家方法
				_this.sanctionCountry(result.regeocode.formattedAddress,function(b){
					if(b) return;
					var addComp = result.regeocode.addressComponent;
					_this.city = addComp.city;//主要城市
					_this.country = addComp.country;//国家
					_this.provice = addComp.province;//省
					_this.detailsAddress = result.regeocode.formattedAddress;
					
				
					_this.lat = myCenter.lat;
					_this.lng = myCenter.lng;
					
					fn && fn(result.regeocode);						
				});
				
		    }
		});
		
	}
	
	/**
	 * 制裁国家方法
	 * @param {String} data 包含制裁国家的字段
	 */
	loadGaodeMap.prototype.sanctionCountry = function(data,fn){		
		var _this = this;
		var hasSanction = false;
		for(var i=0;i<sanctionCountryList.length;i++){
			if(data.indexOf(sanctionCountryList[i]) >= 0){
				hasSanction = true;
			}	
		}
		
		if(hasSanction){
			//获取关键字的位置
			this.getLnglatByAddress(data,function(result){				
				if (result.info == 'OK') {
				  // result中对应详细地理坐标信息
					var res = result.geocodes[0];
					var isOutOfChina = coordTrans.outOfChina(res.location.lat,res.location.lng);
					
					if(isOutOfChina){//制裁国家为外国					
						_this.updateMarkerWindow(_this.firstAddr,_this.firstLat,_this.firstLng);
						if(window.layer){				
							layer.msg(notSupportText);
						}else{
							alert(notSupportText)
						}	
						
					}
					fn && fn(isOutOfChina);										
				}
				else{
					console.error('地址解析失败');
					fn && fn(false);
				}
			});
		}
		else{
			fn && fn(false);
		}
		
		
	}
	
	/**
	 * 动态更新主要标注位置和窗口信息，经纬度必须是WGS84坐标体系
	 * @param {String} addr 设置的地址信息
	 * @param {Number} lat 纬度
	 * @param {Number} lng 经度
	 */
	loadGaodeMap.prototype.updateMarkerWindow = function(addr, lat, lng){
		////console.log(addr, lat, lng,this.marker,this.geocoder);
		var _this = this;
		if(!this.marker || !this.geocoder){
			window.updateMarkerWindow_fn_timer = setTimeout(function(){
				_this.updateMarkerWindow(addr, lat, lng);
			},1000);			
		}
		else{
			window.clearTimeout(window.updateMarkerWindow_fn_timer);
			//WGS-84坐標转GCJ-02
			var GCJ02 = coordTrans.gcj_encrypt(lat,lng);
			lat = GCJ02.lat;
			lng = GCJ02.lng;
			
			
			var mainPoint = new AMap.LngLat(lng, lat);//标准写法，经度在前，纬度在后
			
			
			this.map.setCenter(mainPoint);
			this.marker.setPosition(mainPoint);
			//根据经纬度查
			this.getInfoByLatLng(mainPoint,function(){
				_this.updateMarkerAddress(addr || _this.detailsAddress );
			});
		}
		
	}
	
	//更新marker地址信息
	loadGaodeMap.prototype.updateMarkerAddress = function(address){
		var _this = this;
		_this.marker.setLabel(
			_this.setLabel(address)
		);
		
		if(this.oAddressInput){
			this.oAddressInput.value = address;
		}
	}
	
	
	//销毁地图，并清空地图容器
	loadGaodeMap.prototype.destroy = function(map){
		map ? map.destroy() : this.map.destroy();
	}
	
	
	
	
	//暴露主題函數,脚手架開發，使用require引入，需要配置module
	var XHBMap = {
		coordTrans,//坐标体系转化，测距等相关功能集合
		baiduMap,//百度地图控件相关，构造函数
		loadBaiduMap,//加载百度地图主要构造函数
		loadGoogleMap,//加载谷歌地图主要构造函数
		loadGaodeMap,//加载高德地图主要构造函数
		getLatLogByLocalhost,//获取当前IP对应的wgs-84地理坐标，常规用于地图初始化
		loadScript,//动态加载脚本到页面
		promiseAjax,//promise 异步请求
		jsonp,//jsonp请求
		sanctionCountryList,//制裁国家数据
		getLatLngInfoByBDWebServer,//百度地图 web server服务--地理编码解析，根据经纬度和对应类型，获取对应数据
		getLatLngInfoByGDWebServer,//高德地图 web server服务--地理编码解析，根据经纬度和对应类型，获取对应数据
		// markerClusterer,//谷歌地图，标注聚合功能
		// MarkerClusterer,//谷歌地图，标注聚合功能
		// Cluster,//谷歌地图，标记群集与此群集关联的标记群集,多个聚合组合成 大聚合
		// ClusterIcon,//定义谷歌大聚合的配置和ui
		
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


