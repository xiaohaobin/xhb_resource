/**
 * @author 肖浩彬
 * @description android蓝牙的 NJS API，android可使用
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
//蓝牙信息相关
window.Bluetooth = function() {
	this.init();
	
	this.invoke = plus.android.invoke;
	
	this.btFindReceiver = null; //蓝牙搜索广播接收器
	
	this.btSocket = null;
	
	var foundList = []; //搜索到周围的蓝牙列表
	
	this.btInStream = null;
	
	this.btOutStream = null;
	
	//函数
	this.options = {
		/**
		 * 监听蓝牙状态回调
		 * @param {String} state
		 */
		listenBTStatusCallback: function(state) {},
		/**
		 * 搜索到新的蓝牙设备回调
		 * @param {Device} newDevice
		 */
		discoveryDeviceCallback: function(newDevice) {
			//			plus.nativeUI.alert("名称：" + newDevice.name + "，地址： " + newDevice.address);
			foundList.push(newDevice);
		},
		/**
		 * 蓝牙搜索完成回调
		 */
		discoveryFinishedCallback: function() {
//			plus.nativeUI.alert(JSON.stringify(foundList));
			plus.nativeUI.toast("搜索完成.");
			return foundList;
		},
		/**
		 * 接收到数据回调
		 * @param {Array} dataByteArr
		 */
		readDataCallback: function(dataByteArr) {},
		/**
		 * 蓝牙连接中断回调
		 * @param {Exception} e
		 */
		connExceptionCallback: function(e) {}
	};
	
	//状态
	this.state = {
		bluetoothEnable: false, //蓝牙是否开启
		bluetoothState: "", //当前蓝牙状态
		discoveryDeviceState: false, //是否正在搜索蓝牙设备
		readThreadState: false, //数据读取线程状态
	};
}

/**  * 初始化  */
Bluetooth.prototype.init = function() {
	this.main = plus.android.runtimeMainActivity();
	this.BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter"); //蓝牙适配器BluetoothAdapter对象
	this.BAdapter = new this.BluetoothAdapter.getDefaultAdapter(); //蓝牙适配器BluetoothAdapter管理对象

	this.BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice"); //BluetoothDevice用于指代某个蓝牙设备，通常表示对方设备
	this.BDevice = new this.BluetoothDevice();
	
	
	var UUID = plus.android.importClass("java.util.UUID");
	//连接串口设备的 UUID
	this.myUuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
//	this.myUuid = UUID.fromString("00001124-0000-1000-8000-00805F9B34FB");
//	this.myUuid = UUID.fromString("00001125-0000-1000-8000-00805F9B34FB");
}

/**  
 * * 判断蓝牙状态，并且弹出提示打开
 * @return {String} 
 * */
Bluetooth.prototype.getAddress = function() {
	return this.BAdapter.getAddress();
}

/**  
 * * 获取蓝牙名称
 * @return {String} 
 * */
Bluetooth.prototype.getName = function() {
	return this.BAdapter.getName();
}

/**  
 * * 监听蓝牙是否打开的状态，并弹出弹框提示
 * @return {String} 
 * */
Bluetooth.prototype.eventState = function() {
	//	var resultDiv = document.getElementById('output');
	var receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
		onReceive: function(context, intent) { //实现onReceiver回调函数
			plus.android.importClass(intent);
			console.log(intent.getAction());
			//			this.main.unregisterReceiver(receiver);
		}
	});
	var IntentFilter = plus.android.importClass('android.content.IntentFilter');
	var filter = new IntentFilter();
	filter.addAction(this.BAdapter.ACTION_STATE_CHANGED); //监听蓝牙开关
	this.main.registerReceiver(receiver, filter); //注册监听
	if(!this.BAdapter.isEnabled()) {
		this.BAdapter.enable(); //启动蓝牙
	} else {
		this.BAdapter.disable();
	}
}

//打开蓝牙功能
Bluetooth.prototype.open = function() {
	this.BAdapter.enable();
}

//关闭蓝牙功能
Bluetooth.prototype.close = function() {
	this.BAdapter.disable();
}

//开始搜索周围的蓝牙设备； 
Bluetooth.prototype.startDiscovery = function() {
	this.BAdapter.startDiscovery();
	if(this.BAdapter.isDiscovering()) {
		plus.nativeUI.toast("正在搜索周围的蓝牙设备...");
	} else {
		plus.nativeUI.alert("蓝牙搜索功能调用失败...");
	}
}

//取消搜索操作； 
Bluetooth.prototype.cancelDiscovery = function() {
	this.BAdapter.cancelDiscovery();
	if(!this.BAdapter.isDiscovering()) {
		plus.nativeUI.toast("取消搜索周围的蓝牙设备了");
	} else {
		plus.nativeUI.alert("取消搜索失败...");
	}
}

/**
 * 判断当前是否正在搜索设备
 * @return {Boolean}
 * */
Bluetooth.prototype.isDiscovering = function() {
	return this.BAdapter.isDiscovering();
}

/**
 * 获取已绑定的设备列表
 * @return {Array} 
 * */
Bluetooth.prototype.getBondedDevices = function() {
	var sList = this.BAdapter.getBondedDevices() + "";
	if(sList.indexOf(",") == -1) {
		var arr = [];
		var oneList = sList.replace("[", "").replace("]", "");
		arr.push(oneList)
		return arr;
	} else {
		var moreList = sList.replace(" ", "").replace("[", "").replace("]", "");
		console.log(moreList.length);
		var a = moreList.split(",");
		return a;
	}
}

/**
 * 设置本机蓝牙名称
 * @param {String} name 蓝牙名称
 * */
Bluetooth.prototype.setName = function(name) {
	this.BAdapter.setName(name);
}

/**
 * 根据蓝牙地址获取远程的蓝牙设备
 * @param {String} address 蓝牙地址，如:e4:21:ad:12:cd:1a
 * @return {String}
 * */
Bluetooth.prototype.getRemoteDevice = function(address) {
	return this.BAdapter.getRemoteDevice(address);
}

/**
 * 获取本地蓝牙适配器的状态； 
 * @return {Number}
 * */
Bluetooth.prototype.getState = function() {
	return this.BAdapter.getState();
}

/**
 * 获取扫描周围的蓝牙列表
 * @param {Function} fn 获取扫描周围的蓝牙列表回调函数，参数是已获取的蓝牙列表数组 ，name和address 
 * */
Bluetooth.prototype.discoveryNewDevice = function(fn) {
	if(this.btFindReceiver != null) {
		try {
			this.main.unregisterReceiver(this.btFindReceiver);
		} catch(e) {
			console.error(e);
			alert("错误类型：" + e);
		}
		this.btFindReceiver = null;
		this.BAdapter.cancelDiscovery();
	}
	var Build = plus.android.importClass("android.os.Build");

	//6.0以后的如果需要利用本机查找周围的wifi和蓝牙设备, 申请权限
	if(Build.VERSION.SDK_INT >= 6.0) {

	}
	var _BluetoothDevice = this.BluetoothDevice;
	var _option = this.options;
	var _BluetoothAdapter = this.BluetoothAdapter;
	var _BAdapter = this.BAdapter;

	this.btFindReceiver = plus.android.implements("io.dcloud.android.content.BroadcastReceiver", {
		"onReceive": function(context, intent) {
			plus.android.importClass(context);
			plus.android.importClass(intent);
			var action = intent.getAction();

			if(_BluetoothDevice.ACTION_FOUND == action) { // 找到设备
				var device = intent.getParcelableExtra(_BluetoothDevice.EXTRA_DEVICE);
				var newDevice = {
					"name": plus.android.invoke(device, "getName"),
					"address": plus.android.invoke(device, "getAddress")
				}
				_option.discoveryDeviceCallback && _option.discoveryDeviceCallback(newDevice);
				plus.nativeUI.showWaiting("搜索中...");
			}
			if(_BluetoothAdapter.ACTION_DISCOVERY_FINISHED == action) { // 搜索完成
				_BAdapter.cancelDiscovery();
				if(_option.discoveryFinishedCallback){
					var aList = _option.discoveryFinishedCallback();
				}				
				plus.nativeUI.closeWaiting();
				fn(aList);
			}
		}
	});
	var IntentFilter = plus.android.importClass('android.content.IntentFilter');
	var filter = new IntentFilter();
	filter.addAction(this.BluetoothDevice.ACTION_FOUND);
	filter.addAction(this.BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
	this.main.registerReceiver(this.btFindReceiver, filter);
	this.BAdapter.startDiscovery(); //开启搜索
	this.state.discoveryDeviceState = true;
}

/**
 * 获取已经配对的设备
 * @return {Array} connetedDevices
 */
Bluetooth.prototype.getPairedDevices = function(){
	var pairedDevices = [];

	//蓝牙连接android原生对象，是一个set集合
	var pairedDevicesAndroid = null;
	if(this.BAdapter != null && this.BAdapter.isEnabled()) {
		pairedDevicesAndroid = this.BAdapter.getBondedDevices();
	} else {
		plus.nativeUI.alert("蓝牙未开启");
	}

	if(!pairedDevicesAndroid) {
		return pairedDevices;
	}

	//遍历连接设备的set集合，转换为js数组
	var it = plus.android.invoke(pairedDevicesAndroid, "iterator");
	while(plus.android.invoke(it, "hasNext")) {
		var device = plus.android.invoke(it, "next");
		pairedDevices.push({
			"name": plus.android.invoke(device, "getName"),
			"address": plus.android.invoke(device, "getAddress")
		});
	}
	return pairedDevices;
}

/**
 * 根据蓝牙地址，连接设备
 * @param {Stirng} address 要连接的蓝牙地址
 * @return {Boolean}
 */
Bluetooth.prototype.connDevice = function(address){
	plus.nativeUI.showWaiting("连接中...");
	var InputStream = plus.android.importClass("java.io.InputStream");
	var OutputStream = plus.android.importClass("java.io.OutputStream");
	var BluetoothSocket = plus.android.importClass("android.bluetooth.BluetoothSocket");
	
	this.BAdapter.cancelDiscovery();
	if(this.btSocket != null) {
		this.closeBtSocket();
	}
	this.state.readThreadState = false;

	try {
		var device = this.invoke(this.BAdapter, "getRemoteDevice", address);
		this.btSocket = this.invoke(device, "createRfcommSocketToServiceRecord", this.myUuid);
	} catch(e) {
		console.error(e);
		plus.nativeUI.alert("连接失败，获取Socket失败！报错类型："+e);
		return false;
	}
	try {
		this.invoke(this.btSocket, "connect");
		this.readData(); //读数据
		plus.nativeUI.closeWaiting();
		plus.nativeUI.toast("连接成功");		
	} catch(e) {
		console.error(e);
		plus.nativeUI.closeWaiting();
		plus.nativeUI.alert("连接失败，报错："+e);
		try {
			this.btSocket.close();
			this.btSocket = null;
		} catch(e1) {
			console.error(e1);
			plus.nativeUI.alert("报错类型："+e1)
		}
		return false;
	}
	return true;
}

/**
 * 断开连接设备
 */
Bluetooth.prototype.closeBtSocket = function(){
	this.state.readThreadState = false;
	if(!this.btSocket) {
		return;
	}
	try {
		this.btSocket.close();
	} catch(e) {
		console.error(e);
		alert("报错类型："+e);
		this.btSocket = null;
	}
}

/**
 * 读取数据
 * @param {Object} activity
 * @param {Function} callback
 * @return {Boolean}
 */
Bluetooth.prototype.readData = function(){
	var _btOutStream = this.btOutStream;
	var _state = this.state;
	var _options = this.options;
	var _invoke = this.invoke;
	var _btInStream = this.btInStream;
	var setIntervalId = 0;
	
	if(!this.btSocket) {
		plus.nativeUI.alert("请先连接蓝牙设备！");
		return false;
	}
	try {
		this.btInStream = this.invoke(this.btSocket, "getInputStream");
		this.btOutStream = this.invoke(this.btSocket, "getOutputStream");
	} catch(e) {
		console.error(e);
		plus.nativeUI.alert("创建输入输出流失败！");
		this.closeBtSocket();
		return false;
	}
	var setTimeCount = 0;
	read();
	this.state.readThreadState = true;
	return true;

	/**
	 * 模拟java多线程读取数据
	 */
	function read() {
		clearInterval(setIntervalId);
		setIntervalId = setInterval(function() {
			setTimeCount++;
			if(_state.readThreadState) {
				var t = new Date().getTime();
				//心跳检测
				if(setTimeCount % 20 == 0) {
					try {
						_btOutStream.write([0b00]);
					} catch(e) {
						_state.readThreadState = false;
						_options.connExceptionCallback && _options.connExceptionCallback(e);
					}
				}
				var dataArr = [];
				while(_invoke(_btInStream, "available") !== 0) {
					var data = _invoke(_btInStream, "read");
					dataArr.push(data);
					var ct = new Date().getTime();
					if(ct - t > 20) {
						break;
					}
				}
				if(dataArr.length > 0) {
					_options.readDataCallback && _options.readDataCallback(dataArr);
				}
			}
		}, 100);
	}
}

/**
 * 发送数据
 * @param {String} dataStr 要发送的数据
 */
Bluetooth.prototype.sendData = function(dataStr){	
	if(!this.btOutStream) {
		plus.nativeUI.alert("创建输出流失败！");
		return;
	}
	var bytes = this.invoke(dataStr, 'getBytes', 'gbk');
	try {
		this.btOutStream.write(bytes);
	} catch(e) {
		return false;
	}
	plus.nativeUI.toast("发送了数据：" + dataStr);
	return true;
}