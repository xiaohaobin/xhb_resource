/**
 * @author 肖浩彬
 * @description android的wifi的 NJS API，android可使用
 * @depend 依赖IDE HBuilder 的app开发环境
 * */

/**
 * 对象拓展函数,如果为数组，数组为哈希数组才有效
 * @param {Boolean} deep 是否深拷贝
 * @param {Object||Array} target 目标对象或者数组
 * @param {Object||Array} options 要并集的对象或者数组
 * */
function _extend(deep, target, options) {
	for(name in options) {
		copy = options[name];
		if(deep && copy instanceof Array) {
			target[name] = $.extend(deep, [], copy);
		} else if(deep && copy instanceof Object) {
			target[name] = $.extend(deep, {}, copy);
		} else {
			target[name] = options[name];
		}
	}
	return target;
}

/**  * 此文件仅支持android  */

	window.WIFI = function() {
		this.init();
	}

	/**  * 初始化  */
	WIFI.prototype.init = function() {
		var Context = plus.android.importClass("android.content.Context");//
		plus.android.importClass("android.net.wifi.WifiManager");//
		plus.android.importClass("java.util.List");//
		plus.android.importClass("java.util.ArrayList");//
		plus.android.importClass("android.net.wifi.ScanResult");
		plus.android.importClass("android.net.wifi.WifiInfo");//
		plus.android.importClass("java.util.BitSet");

		this.WifiConfiguration = plus.android.importClass("android.net.wifi.WifiConfiguration");
		this.wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);//

	}

	

	/**  
	 * * 获取wifi列表 
	 * @return {String} wifi列表
	 * */
	WIFI.prototype.getAllList = function() {
		return this.wifis = this.wifiManager.getScanResults();
	}

	/**
	 * 获取之前连接过的wifi列表
	 *@return [{object}] 	
	 *@prop SSID 网络名称
	 *@prop BSSID 基本服务集标识
	 * .......
	 * */
	WIFI.prototype.aGetConfiguredNetworks = function(){
		var resultList = this.wifiManager.getConfiguredNetworks();
		len = resultList.size(),
		aRes = [];

		for(var i = 0; i < len; i++) {
			aRes.push({
				"SSID": resultList.get(i).plusGetAttribute('SSID').replace('\"','').replace('"',''),
				"BSSID": resultList.get(i).plusGetAttribute('BSSID'),//基本服务集标识
				
				"FQDN": resultList.get(i).plusGetAttribute('FQDN'),
				"REALM": resultList.get(i).plusGetAttribute('REALM'),
				"PRIO": resultList.get(i).plusGetAttribute('PRIO'),
				"KeyMgmt": resultList.get(i).plusGetAttribute('KeyMgmt'),
				"Protocols": resultList.get(i).plusGetAttribute('Protocols'),//协议
				"AuthAlgorithms": resultList.get(i).plusGetAttribute('AuthAlgorithms'),
				"PariwiseCiphers": resultList.get(i).plusGetAttribute('PariwiseCiphers'),
				"GroupCiphers": resultList.get(i).plusGetAttribute('GroupCiphers'),
				"PSK": resultList.get(i).plusGetAttribute('PSK'),
				
				"Enterprise config": resultList.get(i).plusGetAttribute('Enterprise config'),
				"IP config": resultList.get(i).plusGetAttribute('IP config'),
				"IP assignment": resultList.get(i).plusGetAttribute('IP assignment'),
				"Proxy settings": resultList.get(i).plusGetAttribute('Proxy settings'),
				"triggeiedLow": resultList.get(i).plusGetAttribute('triggeiedLow'),
				"triggeiedBad": resultList.get(i).plusGetAttribute('triggeiedBad'),
				"triggeiedNotHigh": resultList.get(i).plusGetAttribute('triggeiedNotHigh'),
				"ticksLow": resultList.get(i).plusGetAttribute('ticksLow'),
				"ticksBad": resultList.get(i).plusGetAttribute('ticksBad'),
				"ticksNotHigh": resultList.get(i).plusGetAttribute('ticksNotHigh'),
				"triggeredJoin": resultList.get(i).plusGetAttribute('triggeredJoin'),
				"autoJoinBailedDueToLowRssi": resultList.get(i).plusGetAttribute('autoJoinBailedDueToLowRssi'),
				"autoJoinUseAggressiveJoinAttemptThreshold": resultList.get(i).plusGetAttribute('autoJoinUseAggressiveJoinAttemptThreshold')
				
			});
		}
		return aRes;
	}
	//获取之前连接过的wifi列表,返回源数据
	WIFI.prototype.getConfiguredNetworks = function(){
		return this.wifiManager.getConfiguredNetworks();
	}
	
	//断开当前wifi网络连接
	WIFI.prototype.disconnect = function(){
		return this.wifiManager.disconnect();
	}
	
	//获取DHCP 的信息
	WIFI.prototype.getDhcpInfo = function(){
		return this.wifiManager.getDhcpInfo();
	}
	
	
	
	/**
	 **获取wifi列表
	 *@return [{object}] 
	 *@prop SSID 网络名称
	 *@prop BSSID 基本服务集标识
	 *@prop level 等级，主要来判断网络连接的优先数。
	 *@prop capabilities 网络接入的性能，这里主要是来判断网络的加密方式等
	 *@prop frequency  频率，每一个频道交互的MHz 数
	 *@prop distance 距离
	 *@prop timestamp 时间戳
	 * */
	
	WIFI.prototype.aGetAllList = function(){
		var resultList = this.wifiManager.getScanResults();
		len = resultList.size(),
		aRes = [];

		for(var i = 0; i < len; i++) {
			aRes.push({
				"SSID": resultList.get(i).plusGetAttribute('SSID'),
				"BSSID": resultList.get(i).plusGetAttribute('BSSID'), //基本服务集标识
				"level": resultList.get(i).plusGetAttribute('level'),
				"capabilities": resultList.get(i).plusGetAttribute('capabilities'),
				"frequency": resultList.get(i).plusGetAttribute('frequency'),
				"timestamp": resultList.get(i).plusGetAttribute('timestamp'),
				"distance": resultList.get(i).plusGetAttribute('distance'),
				"distanceSd": resultList.get(i).plusGetAttribute('distanceSd')
			});
		}
		return aRes;
	}

	
	
	/**  
	 * * 校验ssid 返回的是有此ssid的wifi个数 
	 * * @param {Object} ssid wifi名  */
	WIFI.prototype.checkSsid = function(ssid) {
		var list = this.wifiManager.getScanResults();
		var len = list.size();
		var num = 0;
		for(var i = 0; i < len; i++) {
			var tmp = list.get(i);

			if(tmp.plusGetAttribute('SSID') == ssid) {
				num++;
			}
		}
		return num;
	}

	/**  
	 * * 
	 * 移除已经存在的ssid  
	 * * @param {Object} ssid wifi名  
	 * */
	WIFI.prototype.removeExsits = function(ssid) {
		var list = this.wifiManager.getConfiguredNetworks();
		//获取到已经配置过的wifi列表
		var len = list.size();
		var wifiInfo = this.getNow();
		var tSsid = '"' + ssid + '"';
		for(var i = 0; i < len; i++) {
			var tmp = list.get(i);
			var tmpSsid = tmp.plusGetAttribute('SSID');
			if(tmpSsid == tSsid) {
				this.disConnect(wifiInfo.getNetworkId());
				this.wifiManager.removeNetwork(tmp.plusGetAttribute('networkId'));
			}
		}
	}

	/**  
	 * * 连接已有的wifi 会自动校验  * 
	 * @param {Object} netWorkId wifi的id  
	 * */
	WIFI.prototype.connectOld = function(netWorkId) {
		var now = this.getNow();
		if(now.getNetworkId() != netWorkId) { //当前连接的不是将要连接的 
			this.wifiManager.enableNetwork(netWorkId, true);
		}
	}

	/**  
	 * * 取消连接  
	 * * @param {Object} 
	 * netWorkId wifi的id 
	 * */
	WIFI.prototype.disConnect = function(netWorkId) {
		var now = this.getNow();
		if(now.getNetworkId() == netWorkId) {
			//当前连接的是需要取消的 则取消   
			this.wifiManager.disableNetwork(netWorkId);
			this.wifiManager.disconnect();
		}
	}

	/**  
	 * * 
	 * 获取当前连接的wifi 
	 * @return {Object} 返回数组对象
	 * @property {String} name wifi信息属性
	 * @property {String} value wifi信息属性值
	 * */
	WIFI.prototype.getNow = function() {
		var body = document.getElementsByTagName("body")[0];
		var div = document.createElement("div");
		div.innerHTML = this.wifiManager.getConnectionInfo();
		body.appendChild(div);
		var sHtml = div.innerHTML;
		body.removeChild(div);
		return strToObj(sHtml);
	}
	/**  
	 * 获取wifi链接的状态码*
	 * */
	WIFI.prototype.getWifiState = function() {
		return this.wifiManager.getWifiState();
	}

	/**  
	 * 获取wifi的mac地址*
	 * */
	WIFI.prototype.getWifiMAC = function() {
		return this.wifiManager.getConnectionInfo().getMacAddress();
	}
	
	//获取BSSID属性
	WIFI.prototype.getBSSID = function() {
		return this.wifiManager.getConnectionInfo().getBSSID();
	}
	
	/**
	 * 获取SSID 是否被隐藏
	 * @return {Boolean}
	 * */
	WIFI.prototype.getHiddenSSID = function() {
		return this.wifiManager.getConnectionInfo().getHiddenSSID();
	}
	
	/**
	 * 获取连接wifi的ip地址
	 * @return {String}
	 * */
	WIFI.prototype.getIpAddress = function() {
		return intToIp(this.wifiManager.getConnectionInfo().getIpAddress());
		function intToIp(i){
		  	return  (i & "0xFF" ) + "." +         
			        ((i >> 8 ) & "0xFF") + "." +         
			        ((i >> 16 ) & "0xFF") + "." +         
			        ( i >> 24 & "0xFF") ;    
		}
	}
	
	/**
	 * 获取连接的速度
	 * @return {Number}
	 * */
	WIFI.prototype.getLinkSpeed = function() {
		return this.wifiManager.getConnectionInfo().getLinkSpeed();
	}
	
	//获取wifi连接的rssi信号强度
	WIFI.prototype.getRssi = function() {
		return this.wifiManager.getConnectionInfo().getRssi();
	}
	
	//获取链接wifi的ssid
	WIFI.prototype.getSSID = function() {
		return this.wifiManager.getConnectionInfo().getSSID();
	}
	
	
	/**  
	 * * 添加新的wifi并连接 
	 * * @param {Object} ssid wifi名  
	 * * @param {Object} pwd 密码  
	 * */
	WIFI.prototype.connectNew = function(ssid, pwd) {
		var WifiConfiguration = this.WifiConfiguration;
		var wcf = new WifiConfiguration();

		wcf.plusGetAttribute('allowedAuthAlgorithms').set(WifiConfiguration.AuthAlgorithm.OPEN);
		wcf.plusGetAttribute('allowedGroupCiphers').set(WifiConfiguration.GroupCipher.TKIP);
		wcf.plusGetAttribute('allowedKeyManagement').set(WifiConfiguration.KeyMgmt.WPA_PSK);
		wcf.plusGetAttribute('allowedPairwiseCiphers').set(WifiConfiguration.PairwiseCipher.TKIP);
		wcf.plusGetAttribute('allowedGroupCiphers').set(WifiConfiguration.GroupCipher.CCMP);
		wcf.plusGetAttribute('allowedPairwiseCiphers').set(WifiConfiguration.PairwiseCipher.CCMP);

		wcf.plusSetAttribute('status', WifiConfiguration.Status.ENABLED);
		wcf.plusSetAttribute('SSID', '"' + ssid + '"');
		wcf.plusSetAttribute('preSharedKey', '"' + pwd + '"');
		wcf.plusSetAttribute('hiddenSSID', true);

		var wcgID = this.wifiManager.addNetwork(wcf);
		var b = this.wifiManager.enableNetwork(wcgID, true);
	}

	/** 
	 * * 
	 * 改变连接的wifi  
	 * * @param {Object} index wifi列表的索引 
	 * */
	WIFI.prototype.change = function(index) {
		// 索引大于配置好的网络索引返回    
		if(index > this.wifis.size()) {
			return;
		}
		// 连接配置好的指定ID的网络    
		this.wifiManager.enableNetwork(
			this.wifis.get(index).plusGetAttribute('networkId'),
			true
		);
	}
	
	/**
	 * 查看以前是否也配置过这个网络
	 * @param {String} sSID SSID名称
	 * @return {Object} 返回配置列表（该SSID的信息）
	 * 已经验证
	 */
	WIFI.prototype.isExsitsAndroid = function(sSID){
		console.log("查看以前是否也配置过这个网络" + sSID);
		var existingConfigs = this.wifiManager.getConfiguredNetworks();
	    if(existingConfigs.size() != 0) {
	        for(var i = 0; i < existingConfigs.size(); i++) {
	            if(existingConfigs.get(i).plusGetAttribute('SSID') == ("\"" + sSID + "\"")) {
	                console.log("该制定的ssid存在于配置中:" + sSID);
	                return existingConfigs.get(i);
	            }
	        }
	    }
	    console.log("该ssid没有配置过")
	    return null;
	}
	
	/**  * 获取wifi是否打开  */
	WIFI.prototype.isWifiEnabled = function() {
		return this.wifiManager.isWifiEnabled();
	}

	/**  * 打开wifi  */
	WIFI.prototype.open = function() {
		console.log('open函数已执行');
		this.wifiManager.setWifiEnabled(true);
	}

	/**  * 关闭wifi  */
	WIFI.prototype.close = function() {
		this.wifiManager.setWifiEnabled(false);
	}

	/**  * 兼容版的wifi设置 只提供跳转wifi设置界面  */
	window.C_WIFI = function() {
		this.main = plus.android.runtimeMainActivity();
		var Intent = plus.android.importClass("android.content.Intent");
		var Settings = plus.android.importClass('android.provider.Settings');
		this.wifiIntent = new Intent(Settings.ACTION_SETTINGS);
	}
	/**  * 跳转wifi界面  */
	C_WIFI.prototype.goWifi = function() {
		this.main.startActivity(this.wifiIntent);
	}


/**
 **处理wifi返回参数，返回数组对象
 * @param {String} 手机所连接的wifi信息数据
 * @return {Object} 返回数组对象
 * @property {String} name wifi信息属性
 * @property {String} value wifi信息属性值
 * */

function strToObj(str) {
	var totalLen = str.length;
	var arr = [{
			"name": "SSID"
		},
		{
			"name": "BSSID"
		},
		{
			"name": "MAC"
		},
		{
			"name": "Supplicant state"
		},
		{
			"name": "RSSI"
		},
		{
			"name": "Link speed"
		},
		{
			"name": "Frequency"
		},
		{
			"name": "Net ID"
		},
		{
			"name": "Metered hint"
		},
		{
			"name": "score"
		}
	];
	var aIndex = [];
	for(var i in arr) {
		arr[i].min = (str.indexOf(arr[i].name)) + (arr[i].name.length);
		aIndex.push(str.indexOf(arr[i].name));
	}
	aIndex.push(totalLen);
	aIndex.splice(0, 1);
	for(var key in arr) {
		arr[key].max = aIndex[key];
	}
	for(var k in arr) {
		arr[k].value = str.substring(arr[k].min + 1, arr[k].max);
	}
	var aRes = [];
	for(var j in arr) {
		aRes.push({
			"name": arr[j].name,
			"value": arr[j].value.replace(",", "")
		})
	}
	return aRes;
}




